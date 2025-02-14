import { NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp, query, where, getDocs, limit } from "firebase/firestore"
import { rateLimit } from "@/lib/rate-limit"

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500, // Max 500 users per second
})

export async function POST(req: Request) {
  try {
    // Rate limiting
    const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1"
    await limiter.check(10, ip) // Max 10 requests per minute per IP

    const { message, email } = await req.json()

    // Check for spam or abuse (simple example)
    const recentMessages = query(
      collection(db, "chatMessages"),
      where("email", "==", email),
      where("timestamp", ">", new Date(Date.now() - 5 * 60 * 1000)), // Last 5 minutes
      limit(10),
    )
    const recentMessagesDocs = await getDocs(recentMessages)
    if (recentMessagesDocs.size >= 10) {
      return NextResponse.json({ error: "Too many messages. Please try again later." }, { status: 429 })
    }

    // Store the message in Firestore
    await addDoc(collection(db, "chatMessages"), {
      message,
      email,
      timestamp: serverTimestamp(),
    })

    // TODO: Implement AI response generation here
    const aiReply = `Thank you for your message. We'll get back to you at ${email} soon.`

    return NextResponse.json({ reply: aiReply })
  } catch (error) {
    console.error("Error processing chat message:", error)
    if (error.status === 429) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 })
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

