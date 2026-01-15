import { create } from "zustand"

export type Mode = "tutor" | "research" | "exam"

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export interface Chat {
  id: string
  title: string
  mode: Mode
  messages: Message[]
  createdAt: Date
  updatedAt: Date
  archived?: boolean
}

interface AppState {
  chats: Chat[]
  currentChatId: string | null
  sidebarCollapsed: boolean
  settingsOpen: boolean
  settingsTab: string
  currentMode: Mode

  // Actions
  setCurrentChatId: (id: string | null) => void
  setSidebarCollapsed: (collapsed: boolean) => void
  setSettingsOpen: (open: boolean) => void
  setSettingsTab: (tab: string) => void
  setCurrentMode: (mode: Mode) => void
  createNewChat: () => void
  addMessage: (chatId: string, message: Omit<Message, "id" | "timestamp">) => void
  deleteChat: (id: string) => void
  renameChat: (id: string, title: string) => void
  archiveChat: (id: string) => void
  deleteAllChats: () => void
}

export const useAppStore = create<AppState>((set, get) => ({
  chats: [
    {
      id: "1",
      title: "Introduction to Calculus",
      mode: "tutor",
      messages: [
        { id: "1", role: "user", content: "Can you explain derivatives?", timestamp: new Date() },
        {
          id: "2",
          role: "assistant",
          content: "A derivative measures the rate of change of a function...",
          timestamp: new Date(),
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      title: "Research on AI Ethics",
      mode: "research",
      messages: [],
      createdAt: new Date(Date.now() - 86400000),
      updatedAt: new Date(Date.now() - 86400000),
    },
    {
      id: "3",
      title: "Physics Exam Practice",
      mode: "exam",
      messages: [],
      createdAt: new Date(Date.now() - 172800000),
      updatedAt: new Date(Date.now() - 172800000),
    },
  ],
  currentChatId: null,
  sidebarCollapsed: false,
  settingsOpen: false,
  settingsTab: "general",
  currentMode: "tutor",

  setCurrentChatId: (id) => set({ currentChatId: id }),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  setSettingsOpen: (open) => set({ settingsOpen: open }),
  setSettingsTab: (tab) => set({ settingsTab: tab }),
  setCurrentMode: (mode) => set({ currentMode: mode }),

  createNewChat: () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: "New Chat",
      mode: get().currentMode,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    set((state) => ({
      chats: [newChat, ...state.chats],
      currentChatId: newChat.id,
    }))
  },

  addMessage: (chatId, message) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    }
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [...chat.messages, newMessage],
              updatedAt: new Date(),
              title:
                chat.messages.length === 0 && message.role === "user"
                  ? message.content.slice(0, 30) + "..."
                  : chat.title,
            }
          : chat,
      ),
    }))
  },

  deleteChat: (id) =>
    set((state) => ({
      chats: state.chats.filter((chat) => chat.id !== id),
      currentChatId: state.currentChatId === id ? null : state.currentChatId,
    })),

  renameChat: (id, title) =>
    set((state) => ({
      chats: state.chats.map((chat) => (chat.id === id ? { ...chat, title } : chat)),
    })),

  archiveChat: (id) =>
    set((state) => ({
      chats: state.chats.map((chat) => (chat.id === id ? { ...chat, archived: true } : chat)),
    })),

  deleteAllChats: () => set({ chats: [], currentChatId: null }),
}))
