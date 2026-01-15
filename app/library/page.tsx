"use client"

import { Sidebar } from "@/components/sidebar"
import { UserMenu } from "@/components/user-menu"
import { SettingsModal } from "@/components/settings-modal"
import { ImageIcon, Link, FileText } from "lucide-react"

const libraryItems = [
  { type: "image", title: "Calculus Notes Screenshot", date: "2 days ago" },
  { type: "link", title: "Research Paper - AI in Education", date: "3 days ago" },
  { type: "file", title: "Physics Exam Practice.pdf", date: "1 week ago" },
  { type: "image", title: "Chemistry Formula Sheet", date: "1 week ago" },
  { type: "link", title: "MIT OpenCourseWare - Linear Algebra", date: "2 weeks ago" },
]

const getIcon = (type: string) => {
  switch (type) {
    case "image":
      return ImageIcon
    case "link":
      return Link
    case "file":
      return FileText
    default:
      return FileText
  }
}

export default function LibraryPage() {
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
            <h1 className="text-2xl font-semibold">Library</h1>
            <p className="text-muted-foreground">Your stored images, links, and uploaded files</p>

            {/* Library Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {libraryItems.map((item, index) => {
                const Icon = getIcon(item.type)
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-xl bg-card hover:bg-secondary transition-colors cursor-pointer"
                  >
                    <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {libraryItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No items in your library yet</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <SettingsModal />
    </div>
  )
}
