"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Sun, Moon, Monitor } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const themes = [
  { id: "light", label: "Light Mode", icon: Sun },
  { id: "dark", label: "Dark Mode", icon: Moon },
  { id: "system", label: "System", icon: Monitor },
]

export function GeneralSettings() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="space-y-8">
      {/* Theme Selection */}
      <div>
        <h4 className="font-medium mb-4">Theme</h4>
        <div className="grid grid-cols-3 gap-3">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-xl border transition-all",
                theme === t.id ? "border-primary bg-primary/10" : "border-border hover:border-primary/50",
              )}
            >
              <t.icon className={cn("h-6 w-6", theme === t.id && "text-primary")} />
              <span className="text-sm">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Language Selection */}
      <div>
        <h4 className="font-medium mb-4">Language & Region</h4>
        <Select defaultValue="en">
          <SelectTrigger className="w-full max-w-xs">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="vi">Tiếng Việt</SelectItem>
            <SelectItem value="zh">中文</SelectItem>
            <SelectItem value="ja">日本語</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground mt-2">
          Your language preference will be synced across all devices.
        </p>
      </div>

      <Button className="mt-6">Save Changes</Button>
    </div>
  )
}
