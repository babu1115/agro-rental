"use client"

import { useState } from "react"
import { X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

const FAQ_RESPONSES: { [key: string]: string } = {
  "how to rent":
    'To rent equipment, go to "Explore Equipments", select the equipment you want, choose rental duration, and complete the booking process.',
  "rental rates":
    "Our rental rates vary by equipment. Most equipments are available on daily, weekly, and monthly basis. Check the specific equipment details for exact pricing.",
  "labour hiring":
    'You can hire skilled workers from the "Explore Labour" section. Select workers based on their skills and availability, then book them for your required duration.',
  support:
    'We provide 24/7 customer support. You can contact us through the "Contact Us" page or use this chatbot for quick assistance.',
  payment:
    'Payments are processed securely after booking confirmation. You can track your transactions in the "Past Transaction" page.',
  location:
    "We currently serve 5+ states across India. Check the equipment and labour listings to see service availability in your area.",
  cancellation:
    "Bookings can be cancelled up to 24 hours before the rental period starts. Cancellation charges may apply based on our policy.",
  "equipment maintenance":
    "All our equipment is regularly maintained and serviced. If you face any issues during rental, contact our support team immediately.",
}

export default function ChatBot({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! Welcome to AGRO RENT support. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    for (const [key, response] of Object.entries(FAQ_RESPONSES)) {
      if (lowerMessage.includes(key)) {
        return response
      }
    }

    return "I can help you with questions about equipment rental, labour hiring, payments, support, and more. Feel free to ask!"
  }

  const handleSend = () => {
    if (!input.trim()) return

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newUserMessage])

    const botResponse = generateResponse(input)
    const newBotMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: botResponse,
      sender: "bot",
      timestamp: new Date(),
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, newBotMessage])
    }, 500)

    setInput("")
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-96 flex flex-col shadow-xl z-40">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between rounded-t-lg">
        <h3 className="font-bold">AGRO RENT Support</h3>
        <button onClick={onClose} className="hover:bg-primary/80 p-1 rounded">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                msg.sender === "user"
                  ? "bg-primary text-primary-foreground rounded-br-none"
                  : "bg-muted text-muted-foreground rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-border p-3 flex gap-2 rounded-b-lg">
        <Input
          placeholder="Type your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 text-sm"
        />
        <Button size="icon" onClick={handleSend} className="bg-primary hover:bg-primary/90">
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  )
}
