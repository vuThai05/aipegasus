"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ProfileSettings() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <Label htmlFor="name" className="shrink-0 w-32">
            Name
          </Label>
          <Input id="name" defaultValue="John Doe" className="flex-1" />
        </div>
        <div className="flex items-center justify-between gap-4">
          <Label htmlFor="studentId" className="shrink-0 w-32">
            Student ID
          </Label>
          <Input id="studentId" defaultValue="2024001234" className="flex-1" />
        </div>
        <div className="flex items-center justify-between gap-4">
          <Label htmlFor="university" className="shrink-0 w-32">
            University
          </Label>
          <Input id="university" defaultValue="National Economic University" className="flex-1" />
        </div>
        <div className="flex items-center justify-between gap-4">
          <Label htmlFor="phone" className="shrink-0 w-32">
            Phone Number
          </Label>
          <Input id="phone" defaultValue="+84 912 345 678" className="flex-1" />
        </div>
      </div>

      <div className="flex justify-end">
        <Button className="bg-primary hover:bg-primary/90">Save Changes</Button>
      </div>

      <div className="pt-6 border-t border-border space-y-4">
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start bg-transparent">
            Log out
          </Button>
        </div>

        <div className="space-y-3 pt-4">
          <h4 className="font-medium text-destructive">Delete Account</h4>
          <p className="text-sm text-muted-foreground">
            Deleting your account will permanently remove your account and all associated data. This action cannot be
            undone.
          </p>
          <Button className="bg-[#B90E0A] hover:bg-[#680C07] text-white">Delete Account</Button>
        </div>
      </div>
    </div>
  )
}
