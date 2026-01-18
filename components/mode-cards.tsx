"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { useAppStore, type Mode } from "@/lib/store"
import { GraduationCap, BookOpen, FileQuestion } from "lucide-react"

const modes: { id: Mode; label: string; icon: React.ElementType; color: string }[] = [
  { id: "tutor", label: "Tutor", icon: GraduationCap, color: "#0B6E4F" },
  { id: "research", label: "Research", icon: BookOpen, color: "#0063FF" },
  { id: "exam", label: "Practise", icon: FileQuestion, color: "#F26D3D" },
]

export function ModeCards() {
  const { currentMode, setCurrentMode } = useAppStore()

  return (
    <div className="grid grid-cols-3 gap-4 w-full max-w-lg mx-auto">
      {modes.map((mode) => {
        const isActive = currentMode === mode.id
        return (
          <button
            key={mode.id}
            onClick={() => setCurrentMode(mode.id)}
            className={cn(
              "flex flex-col items-center justify-center gap-2 p-4 rounded-xl transition-all duration-200 aspect-square shadow-sm",
              isActive
                ? "ring-2 shadow-md"
                : "bg-secondary hover:bg-sidebar-accent",
            )}
            style={
              isActive
                ? {
                    borderColor: mode.color,
                    borderWidth: "2px",
                    borderStyle: "solid",
                    boxShadow: `0 4px 6px -1px ${mode.color}40, 0 2px 4px -1px ${mode.color}30`,
                  }
                : {}
            }
          >
            <mode.icon
              className={cn("h-6 w-6", isActive ? "" : "text-muted-foreground")}
              style={isActive ? { color: mode.color } : {}}
            />
            <span
              className={cn("text-sm font-medium text-center", isActive ? "" : "text-muted-foreground")}
              style={isActive ? { color: mode.color } : {}}
            >
              {mode.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
