"use client"

import { cn } from "@/lib/utils"
import type { Message } from "@/lib/store"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { PegasusLogo } from "./pegasus-logo"

interface ChatConversationProps {
  messages: Message[]
}

export function ChatConversation({ messages }: ChatConversationProps) {
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
            )}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
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
