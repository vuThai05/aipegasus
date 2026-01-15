"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { useAppStore, type Mode } from "@/lib/store"
import { GraduationCap, BookOpen, FileQuestion } from "lucide-react"

const modes: { id: Mode; label: string; icon: React.ElementType }[] = [
  { id: "tutor", label: "Tutor Mode", icon: GraduationCap },
  { id: "research", label: "Research Mode", icon: BookOpen },
  { id: "exam", label: "Exam Practice", icon: FileQuestion },
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
              "flex flex-col items-center justify-center gap-2 p-4 rounded-xl transition-all duration-200 aspect-square",
              isActive
                ? "bg-primary/20 ring-2 ring-primary"
                : "bg-secondary hover:bg-[#505050] dark:hover:bg-[#505050]",
            )}
          >
            <mode.icon className={cn("h-6 w-6", isActive ? "text-primary" : "text-muted-foreground")} />
            <span className={cn("text-sm font-medium text-center", isActive && "text-primary")}>{mode.label}</span>
          </button>
        )
      })}
    </div>
  )
}
