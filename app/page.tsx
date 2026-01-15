"use client"
import { Button } from "@/components/ui/button"

import { useAppStore } from "@/lib/store"
import { Sidebar } from "@/components/sidebar"
import { UserMenu } from "@/components/user-menu"
import { ChatInput } from "@/components/chat-input"
import { ModeCards } from "@/components/mode-cards"
import { ChatConversation } from "@/components/chat-conversation"
import { SettingsModal } from "@/components/settings-modal"
import { PegasusLogo } from "@/components/pegasus-logo"

export default function HomePage() {
  const { chats, currentChatId, addMessage, createNewChat, setCurrentChatId } = useAppStore()

  const currentChat = chats.find((c) => c.id === currentChatId)

  const handleSend = (message: string) => {
    if (!currentChatId) {
      createNewChat()
    }
    const chatId = currentChatId || chats[0]?.id
    if (chatId) {
      addMessage(chatId, { role: "user", content: message })
      // Simulate AI response
      setTimeout(() => {
        addMessage(chatId, {
          role: "assistant",
          content:
            "This is a simulated response from PegaSus. In a real implementation, this would be connected to an AI model to provide helpful academic assistance.",
        })
      }, 1000)
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-end gap-4 p-4">
          <Button variant="outline">Click me</Button>
          <UserMenu />
        </header>

        {/* Content */}
        {currentChat && currentChat.messages.length > 0 ? (
          // Conversation View
          <div className="flex-1 flex flex-col">
            <ChatConversation messages={currentChat.messages} />
            <div className="p-4 border-t border-border">
              <ChatInput onSend={handleSend} className="max-w-3xl mx-auto" />
            </div>
          </div>
        ) : (
          // Initial Empty State
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <div className="max-w-2xl w-full space-y-8 text-center">
              {/* Welcome Message */}
              <div className="flex items-center justify-center gap-3">
                <PegasusLogo size={40} />
                <h1 className="text-3xl font-semibold">
                  {"Let's start with "}
                  <span className="text-primary">PegaSus</span>
                </h1>
              </div>

              {/* Input Bar */}
              <ChatInput
                onSend={(message) => {
                  if (!currentChatId) {
                    createNewChat()
                  }
                  setTimeout(() => {
                    const newChatId = useAppStore.getState().currentChatId
                    if (newChatId) {
                      addMessage(newChatId, { role: "user", content: message })
                      setTimeout(() => {
                        addMessage(newChatId, {
                          role: "assistant",
                          content: "Hello! I'm PegaSus, your AI study assistant. How can I help you today?",
                        })
                      }, 1000)
                    }
                  }, 100)
                }}
              />

              {/* Mode Selection */}
              <div className="pt-4">
                <ModeCards />
              </div>
            </div>
          </div>
        )}
      </main>

      <SettingsModal />
    </div>
  )
}