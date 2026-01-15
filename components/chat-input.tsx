"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Paperclip, ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatInputProps {
  onSend: (message: string) => void
  placeholder?: string
  className?: string
}

export function ChatInput({ onSend, placeholder = "Ask PegaSus anything...", className }: ChatInputProps) {
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSend(message.trim())
      setMessage("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn("w-full", className)}>
      <div className="relative flex items-center rounded-full border border-border bg-card px-4 py-2 focus-within:border-primary transition-colors">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground"
        >
          <Paperclip className="h-5 w-5" />
        </Button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent px-3 py-2 text-sm focus:outline-none placeholder:text-muted-foreground"
        />
        <Button
          type="submit"
          size="icon"
          className="h-9 w-9 rounded-full bg-primary hover:bg-primary/90"
          disabled={!message.trim()}
        >
          <ArrowUp className="h-5 w-5 text-white" />
        </Button>
      </div>
    </form>
  )
}
