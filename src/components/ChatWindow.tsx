"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Mic } from "lucide-react"

type Message = {
  id: string
  text: string
  sender: "user" | "ai"
  timestamp: Date
}

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "👋 Hello!\n\nI'm here to help with your document submission, ask if needed.",
      sender: "ai",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Math.random().toString(36).substring(2, 9),
      text: inputValue,
      sender: "user",
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = generateMockResponse(inputValue)
      const aiMessage: Message = {
        id: Math.random().toString(36).substring(2, 9),
        text: aiResponse,
        sender: "ai",
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000) // Random delay between 1-2 seconds
  }

  const generateMockResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()
    
    if (input.includes("plumb") || input.includes("water") || input.includes("pipe")) {
      return "For plumbing work, you'll typically need: Public Liability Insurance, Professional Indemnity Insurance, your plumbing license, and ABN registration. Do you have these documents ready to upload?"
    }
    
    if (input.includes("electric") || input.includes("electrical")) {
      return "For electrical work, you'll need: Public Liability Insurance, Professional Indemnity Insurance, electrical license, and proof of ABN. Make sure your insurance covers electrical work specifically."
    }
    
    if (input.includes("build") || input.includes("construct") || input.includes("carpenter")) {
      return "For building/construction work, upload: Public Liability Insurance, Workers Compensation (if you have employees), building license or trade certificate, and ABN details. What specific type of building work do you do?"
    }
    
    if (input.includes("insurance") || input.includes("liability")) {
      return "Great! Public Liability Insurance is essential. Make sure it covers your specific trade and has adequate coverage limits. Upload the certificate showing current coverage and policy details."
    }
    
    if (input.includes("license") || input.includes("certification")) {
      return "Perfect! Upload clear photos or scans of your trade licenses and certifications. Make sure they're current and clearly show the license number and expiry date."
    }
    
    if (input.includes("help") || input.includes("don't know") || input.includes("unsure")) {
      return "No worries! I'm here to help. Can you tell me what type of contractor work you do? (e.g., plumbing, electrical, building, landscaping, etc.) I'll guide you through exactly what documents you need."
    }
    
    // Default responses
    const defaultResponses = [
      "That's helpful information! Based on what you've told me, I can guide you on the required documents. What specific trade or service do you provide?",
      "Thanks for that! To give you the most accurate guidance, could you tell me more about your business and the type of work you do?",
      "I understand. Let me help you with the document requirements. What's your main area of work or expertise?",
      "Got it! Each trade has slightly different requirements. What type of contractor services do you offer?"
    ]
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="w-full max-w-[792px] min-h-[500px] lg:h-[calc(100vh-300px)] max-h-[692px] flex flex-col rounded-[16px] border border-[rgba(140,192,228,0.4)] bg-white shadow-[0px_7px_32px_0px_rgba(0,0,0,0.07)]">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-4 ${
                message.sender === "user"
                  ? "bg-[#007AFF] text-white"
                  : "bg-[#F2F2F7] text-[#000000]"
              }`}
            >
              <p className="text-[16px] leading-[1.4] whitespace-pre-wrap">
                {message.text}
              </p>
            </div>
          </div>
        ))}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-[#F2F2F7] text-[#000000] rounded-2xl p-4">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-[#8E8E93] rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[#8E8E93] rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                <div className="w-2 h-2 bg-[#8E8E93] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6">
        <div className="flex items-center gap-3 bg-[#F2F2F7] rounded-2xl p-3">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything"
            className="flex-1 bg-transparent text-[16px] placeholder-[#8E8E93] focus:outline-none"
            disabled={isTyping}
          />
          <button
            className="p-2 text-[#8E8E93] hover:text-[#007AFF] transition-colors"
            disabled={isTyping}
          >
            <Mic className="w-5 h-5" />
          </button>
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="p-2 bg-[#007AFF] text-white rounded-full hover:bg-[#0056D6] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
} 