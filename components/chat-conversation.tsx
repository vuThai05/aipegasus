"use client"

import { useEffect, useRef } from "react"
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
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])
  return (
    <div className="p-6 space-y-6">
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

            {message.sources && message.sources.length > 0 && (
              <div className="mt-4 pt-4 border-t border-primary-foreground/20">
                <p className="text-xs font-semibold mb-2 opacity-70">Sources</p>
                <div className="space-y-2">
                  {message.sources.map((source, idx) => (
                    <div key={idx} className="text-xs bg-background/50 p-2 rounded border border-border/50">
                      <p className="opacity-90 line-clamp-2 italic">"{source.text}"</p>
                      {source.link && (
                        <a
                          href={source.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline mt-1 block"
                        >
                          View Source &rarr;
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {message.role === "user" && (
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          )}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}
