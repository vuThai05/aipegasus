"use client"

import { cn } from "@/lib/utils"
import type { Message } from "@/lib/store"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { PegasusLogo } from "./pegasus-logo"
import { AlertCircle, RotateCcw } from "lucide-react"

interface ChatConversationProps {
  messages: Message[]
  onRetry?: (messageId: string) => void
}

export function ChatConversation({ messages, onRetry }: ChatConversationProps) {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {messages.map((message) => (
        <div key={message.id} className={cn("flex gap-4", message.role === "user" ? "justify-end" : "justify-start")}>
          {message.role === "assistant" && (
            <div className="shrink-0">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                <PegasusLogo size={20} />
              </div>
            </div>
          )}
          <div
            className={cn(
              "max-w-[70%] rounded-2xl px-4 py-3",
              message.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground",
              message.error && "border border-destructive",
            )}
          >
            {message.isLoading ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Spinner className="h-4 w-4" />
                <span className="text-xs">Thinking...</span>
              </div>
            ) : message.error ? (
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-destructive">
                  <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Error</p>
                    <p className="text-xs mt-1 opacity-90">{message.error}</p>
                  </div>
                </div>
                {onRetry && (message.retryCount || 0) < 3 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onRetry(message.id)}
                    className="mt-2 h-7 text-xs"
                  >
                    <RotateCcw className="h-3 w-3 mr-1.5" />
                    Retry
                  </Button>
                )}
              </div>
            ) : (
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content || ""}</p>
            )}
          </div>
          {message.role === "user" && (
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          )}
        </div>
      ))}
    </div>
  )
}
