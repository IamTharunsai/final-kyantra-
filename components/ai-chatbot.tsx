"use client"

import { useState } from "react"
import { Bot, Send, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([])
  const [input, setInput] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    setMessages([...messages, { role: "user", content: input }])
    setInput("")

    try {
      // Send message to backend
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input, email: "nandigam2081@gmail.com" }),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      const data = await response.json()
      setMessages((prevMessages) => [...prevMessages, { role: "assistant", content: data.reply }])
    } catch (error) {
      console.error("Error:", error)
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: "Sorry, there was an error processing your request." },
      ])
    }
  }

  return (
    <>
      <Button className="fixed bottom-4 right-4 rounded-full p-4" onClick={() => setIsOpen(!isOpen)}>
        <Bot size={24} />
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 right-4 w-80"
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>AI Assistant</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X size={18} />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="mb-4 h-60 overflow-y-auto space-y-2">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`p-2 rounded-lg ${
                        message.role === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
                      } inline-block`}
                    >
                      {message.content}
                    </div>
                  ))}
                </div>
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message..." />
                  <Button type="submit" size="icon">
                    <Send size={18} />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

