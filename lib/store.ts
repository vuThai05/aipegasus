import { create } from "zustand"
import { v4 as uuidv4 } from "uuid"

export type Mode = "tutor" | "research" | "exam"

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  isLoading?: boolean
  error?: string
  retryCount?: number
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
  isLoading: boolean
  lastError: string | null

  // Actions
  setCurrentChatId: (id: string | null) => void
  setSidebarCollapsed: (collapsed: boolean) => void
  setSettingsOpen: (open: boolean) => void
  setSettingsTab: (tab: string) => void
  setCurrentMode: (mode: Mode) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  createNewChat: () => void
  addMessage: (chatId: string, message: Omit<Message, "id" | "timestamp">, messageId?: string) => void
  updateMessage: (chatId: string, messageId: string, updates: Partial<Message>) => void
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
  isLoading: false,
  lastError: null,

  setCurrentChatId: (id) => set({ currentChatId: id }),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  setSettingsOpen: (open) => set({ settingsOpen: open }),
  setSettingsTab: (tab) => set({ settingsTab: tab }),
  setCurrentMode: (mode) => set({ currentMode: mode }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ lastError: error }),

  createNewChat: () => {
    const newChat: Chat = {
      id: uuidv4(),
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

  addMessage: (chatId, message, messageId?: string) => {
    const newMessage: Message = {
      ...message,
      id: messageId || uuidv4(),
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

  updateMessage: (chatId, messageId, updates) => {
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: chat.messages.map((msg) =>
                msg.id === messageId ? { ...msg, ...updates } : msg,
              ),
              updatedAt: new Date(),
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
