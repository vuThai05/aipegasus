"use client"

import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Download, Eye, Trash2 } from "lucide-react"

export function DataManagementSettings() {
  const { chats, deleteAllChats } = useAppStore()
  const archivedChats = chats.filter((c) => c.archived)

  return (
    <div className="space-y-6">
      {/* Privacy Banner */}
      <div className="bg-primary/10 rounded-xl p-4">
        <p className="text-sm">
          Your data is private and secure. You have full control over your conversation history and can export or delete
          it at any time.
        </p>
      </div>

      {/* Archived Chats */}
      <div className="space-y-3">
        <h4 className="font-medium">Archived Chats</h4>
        {archivedChats.length > 0 ? (
          <div className="space-y-2">
            {archivedChats.map((chat) => (
              <div key={chat.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <div>
                  <p className="text-sm font-medium">{chat.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {chat.messages.length} messages · {chat.createdAt.toLocaleDateString()}
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No archived chats</p>
        )}
      </div>

      {/* Export Data */}
      <div className="space-y-3">
        <h4 className="font-medium">Export Data</h4>
        <p className="text-sm text-muted-foreground">
          Download all your conversation data for personal or academic use.
        </p>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export All Data
        </Button>
      </div>

      <div className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2 text-destructive">
          <AlertTriangle className="h-5 w-5" />
          <h4 className="font-medium">Delete Chat Data</h4>
        </div>
        <p className="text-sm text-muted-foreground">
          Permanently delete your conversation history. This action cannot be undone.
        </p>

        {/* Warning box matching reference image style */}
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
          <p className="text-sm">
            <span className="font-medium text-destructive">Warning:</span>{" "}
            <span className="text-muted-foreground">
              Deleting your data is permanent and irreversible. All your conversations, uploaded files, and preferences
              will be permanently removed.
            </span>
          </p>
        </div>

        <Button
          onClick={() => {
            if (confirm("Are you sure you want to delete all chat data? This action cannot be undone.")) {
              deleteAllChats()
            }
          }}
          className="bg-[#B90E0A] hover:bg-[#680C07] text-white"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete All Chat Data
        </Button>
      </div>
    </div>
  )
}
