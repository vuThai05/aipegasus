"use client"

import { useState, useMemo } from "react"
import { Sidebar } from "@/components/sidebar"
import { UserMenu } from "@/components/user-menu"
import { SettingsModal } from "@/components/settings-modal"
import { useAppStore, type Mode } from "@/lib/store"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Search, MoreHorizontal, Pencil, Trash2, Share2, Archive } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

const modeFilters: { id: Mode | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "tutor", label: "Tutor" },
  { id: "research", label: "Research" },
  { id: "exam", label: "Exam" },
]

export default function SearchPage() {
  const { chats, setCurrentChatId, deleteChat, renameChat, archiveChat } = useAppStore()
  const [searchQuery, setSearchQuery] = useState("")
  const [modeFilter, setModeFilter] = useState<Mode | "all">("all")
  const [timeFilter, setTimeFilter] = useState("all")
  const [hoveredChat, setHoveredChat] = useState<string | null>(null)
  const [editingChat, setEditingChat] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState("")

  const activeChats = chats.filter((c) => !c.archived)

  const filteredChats = useMemo(() => {
    return activeChats.filter((chat) => {
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesTitle = chat.title.toLowerCase().includes(query)
        const matchesContent = chat.messages.some((m) => m.content.toLowerCase().includes(query))
        if (!matchesTitle && !matchesContent) return false
      }

      // Filter by mode
      if (modeFilter !== "all" && chat.mode !== modeFilter) return false

      // Filter by time
      const now = new Date()
      const chatDate = new Date(chat.createdAt)
      if (timeFilter === "today") {
        const isToday = chatDate.toDateString() === now.toDateString()
        if (!isToday) return false
      } else if (timeFilter === "week") {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        if (chatDate < weekAgo) return false
      } else if (timeFilter === "month") {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        if (chatDate < monthAgo) return false
      }

      return true
    })
  }, [activeChats, searchQuery, modeFilter, timeFilter])

  // Group chats by date
  const groupedChats = useMemo(() => {
    const groups: { [key: string]: typeof filteredChats } = {}
    const now = new Date()

    filteredChats.forEach((chat) => {
      const chatDate = new Date(chat.createdAt)
      const isToday = chatDate.toDateString() === now.toDateString()
      const yesterday = new Date(now)
      yesterday.setDate(yesterday.getDate() - 1)
      const isYesterday = chatDate.toDateString() === yesterday.toDateString()

      let key = "Earlier"
      if (isToday) key = "Today"
      else if (isYesterday) key = "Yesterday"

      if (!groups[key]) groups[key] = []
      groups[key].push(chat)
    })

    return groups
  }, [filteredChats])

  const getModeColor = (mode: Mode) => {
    switch (mode) {
      case "tutor":
        return "bg-blue-500/20 text-blue-400"
      case "research":
        return "bg-green-500/20 text-green-400"
      case "exam":
        return "bg-orange-500/20 text-orange-400"
    }
  }

  const handleRename = (id: string) => {
    if (editTitle.trim()) {
      renameChat(id, editTitle.trim())
    }
    setEditingChat(null)
    setEditTitle("")
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-end p-4">
          <UserMenu />
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Title */}
            <h1 className="text-2xl font-semibold">Search History</h1>

            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search your chat history..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 rounded-xl bg-[#373737] dark:bg-[#373737] bg-secondary border-transparent focus:border-primary"
              />
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              {/* Mode Filter Pills - increased size */}
              <div className="flex items-center gap-2">
                {modeFilters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setModeFilter(filter.id)}
                    className={cn(
                      "px-5 py-2.5 rounded-full text-base font-medium transition-colors",
                      modeFilter === filter.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-[#373737] dark:bg-[#373737] bg-secondary hover:bg-[#505050] dark:hover:bg-[#505050]",
                    )}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-36 h-11 text-base bg-[#373737] dark:bg-[#373737] bg-secondary border-transparent hover:bg-[#505050] dark:hover:bg-[#505050]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Chat History List */}
            <div className="space-y-6">
              {Object.entries(groupedChats).map(([group, groupChats]) => (
                <div key={group}>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">{group}</h3>
                  <div className="space-y-2">
                    {groupChats.map((chat) => (
                      <div
                        key={chat.id}
                        className="relative group"
                        onMouseEnter={() => setHoveredChat(chat.id)}
                        onMouseLeave={() => setHoveredChat(null)}
                      >
                        {editingChat === chat.id ? (
                          <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            onBlur={() => handleRename(chat.id)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleRename(chat.id)
                              if (e.key === "Escape") {
                                setEditingChat(null)
                                setEditTitle("")
                              }
                            }}
                            className="w-full p-4 rounded-xl bg-sidebar-accent text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                            autoFocus
                          />
                        ) : (
                          <div className="flex items-center gap-4 p-4 rounded-xl bg-[#373737] dark:bg-[#373737] bg-secondary hover:bg-[#505050] dark:hover:bg-[#505050] transition-colors">
                            <button
                              onClick={() => {
                                setCurrentChatId(chat.id)
                                window.location.href = "/"
                              }}
                              className="flex-1 min-w-0 text-left"
                            >
                              <p className="font-medium truncate">{chat.title}</p>
                              <p className="text-sm text-muted-foreground truncate">
                                {chat.messages[0]?.content || "No messages"}
                              </p>
                            </button>
                            <span
                              className={cn(
                                "shrink-0 px-2 py-1 rounded-full text-xs font-medium capitalize",
                                getModeColor(chat.mode),
                              )}
                            >
                              {chat.mode}
                            </span>
                            <span className="shrink-0 text-sm text-muted-foreground">
                              {new Date(chat.createdAt).toLocaleDateString()}
                            </span>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className={cn(
                                    "h-8 w-8 shrink-0 hover:bg-[#606060] dark:hover:bg-[#606060] transition-opacity",
                                    hoveredChat === chat.id ? "opacity-100" : "opacity-0",
                                  )}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-40">
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setEditTitle(chat.title)
                                    setEditingChat(chat.id)
                                  }}
                                >
                                  <Pencil className="h-4 w-4 mr-2" />
                                  Rename
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    archiveChat(chat.id)
                                  }}
                                >
                                  <Archive className="h-4 w-4 mr-2" />
                                  Archive
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    // Share functionality
                                  }}
                                >
                                  <Share2 className="h-4 w-4 mr-2" />
                                  Share
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    deleteChat(chat.id)
                                  }}
                                  className="text-destructive"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {filteredChats.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No chats found matching your criteria</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <SettingsModal />
    </div>
  )
}
