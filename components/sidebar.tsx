"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useAppStore } from "@/lib/store"
import { PegasusLogo } from "./pegasus-logo"
import { Button } from "@/components/ui/button"
import { Search, FolderOpen, Plus, Settings, Menu, MoreHorizontal, Pencil, Trash2, Share2, Archive } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"

const navItems = [
  { href: "/search", icon: Search, label: "Search" },
  { href: "/library", icon: FolderOpen, label: "Library" },
]

export function Sidebar() {
  const pathname = usePathname()
  const {
    chats,
    sidebarCollapsed,
    setSidebarCollapsed,
    setCurrentChatId,
    createNewChat,
    deleteChat,
    renameChat,
    archiveChat,
    setSettingsOpen,
  } = useAppStore()
  const [hoveredChat, setHoveredChat] = useState<string | null>(null)
  const [editingChat, setEditingChat] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState("")

  const activeChats = chats.filter((c) => !c.archived)

  const handleRename = (id: string) => {
    if (editTitle.trim()) {
      renameChat(id, editTitle.trim())
    }
    setEditingChat(null)
    setEditTitle("")
  }

  return (
    <aside
      className={cn(
        "relative flex flex-col h-screen bg-[#373737] dark:bg-[#373737] bg-secondary border-r border-sidebar-border transition-all duration-300 ease-in-out overflow-hidden",
        sidebarCollapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex items-center justify-center p-4 h-16">
        {sidebarCollapsed ? (
          // Collapsed: Logo is clickable to expand
          <button
            onClick={() => setSidebarCollapsed(false)}
            className="flex items-center justify-center transition-transform duration-200 hover:scale-110"
            aria-label="Expand sidebar"
          >
            <PegasusLogo size={28} />
          </button>
        ) : (
          // Expanded: Show hamburger, logo, and title
          <div className="flex items-center justify-between w-full">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(true)}
              className="h-8 w-8 shrink-0 hover:bg-[#505050] dark:hover:bg-[#505050]"
              aria-label="Collapse sidebar"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Link href="/" className="flex items-center gap-2">
              <PegasusLogo size={28} />
              <span className="font-semibold text-primary">PegaSus</span>
            </Link>
            <div className="w-8" /> {/* Spacer for centering */}
          </div>
        )}
      </div>

      {/* Navigation - fade in/out */}
      <nav
        className={cn(
          "px-2 space-y-1 transition-opacity duration-200",
          sidebarCollapsed ? "opacity-100" : "opacity-100",
        )}
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-[#505050] dark:hover:bg-[#505050]",
                sidebarCollapsed && "justify-center",
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!sidebarCollapsed && <span className="transition-opacity duration-200">{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* New Chat Button */}
      <div className="px-2 mt-4">
        <Button
          onClick={() => {
            createNewChat()
          }}
          className={cn("w-full bg-primary hover:bg-primary/90 text-primary-foreground", sidebarCollapsed && "px-0")}
        >
          <Plus className="h-5 w-5" />
          {!sidebarCollapsed && <span className="ml-2">New Chat</span>}
        </Button>
      </div>

      {/* Recent Chats - with fade animation */}
      <div
        className={cn(
          "flex-1 overflow-y-auto px-2 mt-6 transition-opacity duration-200",
          sidebarCollapsed ? "opacity-0 pointer-events-none" : "opacity-100",
        )}
      >
        {!sidebarCollapsed && (
          <>
            <p className="px-3 mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Recent Chats</p>
            <div className="space-y-1">
              {activeChats.map((chat) => (
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
                      className="w-full px-3 py-2 rounded-lg bg-sidebar-accent text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                      autoFocus
                    />
                  ) : (
                    <div className="flex items-center rounded-lg bg-[#4a4a4a] dark:bg-[#4a4a4a] bg-secondary/80 hover:bg-[#505050] dark:hover:bg-[#505050] transition-colors">
                      <Link
                        href="/"
                        onClick={() => setCurrentChatId(chat.id)}
                        className="flex-1 px-3 py-2 text-sm truncate"
                      >
                        {chat.title}
                      </Link>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className={cn(
                              "h-7 w-7 mr-1 shrink-0 hover:bg-[#606060] dark:hover:bg-[#606060] transition-opacity",
                              hoveredChat === chat.id ? "opacity-100" : "opacity-0",
                            )}
                            onClick={(e) => e.preventDefault()}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.preventDefault()
                              setEditTitle(chat.title)
                              setEditingChat(chat.id)
                            }}
                          >
                            <Pencil className="h-4 w-4 mr-2" />
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.preventDefault()
                              archiveChat(chat.id)
                            }}
                          >
                            <Archive className="h-4 w-4 mr-2" />
                            Archive
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.preventDefault()
                              // Share functionality
                            }}
                          >
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.preventDefault()
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
          </>
        )}
      </div>

      {/* Settings */}
      <div className="mt-auto p-2 border-t border-sidebar-border">
        <button
          onClick={() => setSettingsOpen(true)}
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg w-full text-left transition-colors hover:bg-[#505050] dark:hover:bg-[#505050]",
            sidebarCollapsed && "justify-center",
          )}
        >
          <Settings className="h-5 w-5" />
          {!sidebarCollapsed && <span>Settings</span>}
        </button>
      </div>
    </aside>
  )
}
