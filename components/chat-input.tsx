"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Paperclip, Image, FileText, ArrowUp } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

interface ChatInputProps {
  onSend: (message: string) => void
  placeholder?: string
  className?: string
  isLoading?: boolean
  disabled?: boolean
}

export function ChatInput({ onSend, placeholder = "Ask PegaSus anything...", className, isLoading = false, disabled = false }: ChatInputProps) {
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !isLoading && !disabled) {
      onSend(message.trim())
      setMessage("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn("w-full", className)}>
      <div className="rounded-xl border border-border bg-card shadow-sm focus-within:border-primary focus-within:shadow-md transition-all">
        {/* Main Input Row */}
        <div className="flex items-center px-4 py-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={placeholder}
            disabled={isLoading || disabled}
            className="flex-1 bg-transparent px-3 py-2 text-sm focus:outline-none placeholder:text-muted-foreground text-foreground dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <Button
            type="submit"
            size="icon"
            className="h-9 w-9 rounded-full bg-primary hover:bg-primary/90 shrink-0 ml-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!message.trim() || isLoading || disabled}
          >
            {isLoading ? (
              <Spinner className="h-5 w-5 text-white" />
            ) : (
              <ArrowUp className="h-5 w-5 text-white" />
            )}
          </Button>
        </div>
        {/* Attachment Actions Row */}
        <div className="flex items-center gap-2 px-4 pb-3 border-t border-border/50">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 text-xs text-muted-foreground hover:text-foreground dark:text-gray-300 dark:hover:text-white"
          >
            <Paperclip className="h-4 w-4 mr-2" />
            File
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 text-xs text-muted-foreground hover:text-foreground dark:text-gray-300 dark:hover:text-white"
          >
            <Image className="h-4 w-4 mr-2" />
            Image
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 text-xs text-muted-foreground hover:text-foreground dark:text-gray-300 dark:hover:text-white"
          >
            <FileText className="h-4 w-4 mr-2" />
            Document
          </Button>
        </div>
      </div>
    </form>
  )
}
