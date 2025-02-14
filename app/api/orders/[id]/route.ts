import { NextResponse } from "next/server"

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { id } = params
  const { status } = await req.json()

  // In a real application, you would update the order in your database here
  // For this example, we'll just return a success response
  return NextResponse.json({ message: `Order ${id} updated to ${status}` })
}

