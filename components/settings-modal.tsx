"use client"

import { useAppStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import { X, Settings, User, Info, Database } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GeneralSettings } from "./settings/general-settings"
import { ProfileSettings } from "./settings/profile-settings"
import { AboutSettings } from "./settings/about-settings"
import { DataManagementSettings } from "./settings/data-management-settings"

const settingsTabs = [
  { id: "general", label: "General", icon: Settings },
  { id: "profile", label: "Profile", icon: User },
  { id: "about", label: "About", icon: Info },
  { id: "data", label: "Data Management", icon: Database },
]

export function SettingsModal() {
  const { settingsOpen, setSettingsOpen, settingsTab, setSettingsTab } = useAppStore()

  if (!settingsOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={() => setSettingsOpen(false)} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-3xl max-h-[80vh] bg-card rounded-2xl shadow-2xl overflow-hidden flex">
        {/* Left Navigation */}
        <div className="w-48 bg-sidebar p-4 shrink-0">
          <h2 className="font-semibold mb-4 px-2">Settings</h2>
          <nav className="space-y-1">
            {settingsTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSettingsTab(tab.id)}
                className={cn(
                  "flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm transition-colors",
                  settingsTab === tab.id ? "bg-sidebar-accent text-primary" : "hover:bg-sidebar-accent/50",
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">{settingsTabs.find((t) => t.id === settingsTab)?.label}</h3>
            <Button variant="ghost" size="icon" onClick={() => setSettingsOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {settingsTab === "general" && <GeneralSettings />}
          {settingsTab === "profile" && <ProfileSettings />}
          {settingsTab === "about" && <AboutSettings />}
          {settingsTab === "data" && <DataManagementSettings />}
        </div>
      </div>
    </div>
  )
}
