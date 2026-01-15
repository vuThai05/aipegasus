"use client"

import { PegasusLogo } from "../pegasus-logo"
import { GraduationCap, BookOpen, FileQuestion, Upload } from "lucide-react"

const features = [
  { icon: GraduationCap, label: "Tutoring support" },
  { icon: BookOpen, label: "Research assistance" },
  { icon: FileQuestion, label: "Exam practice" },
  { icon: Upload, label: "File & image uploads" },
]

export function AboutSettings() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <PegasusLogo size={48} />
        <div>
          <h3 className="font-semibold text-lg">PegaSus</h3>
          <p className="text-sm text-muted-foreground">Version 1.0.0</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed">
        PegaSus is an AI-powered learning assistant designed specifically for students. It helps you understand complex
        concepts, conduct research efficiently, and prepare for exams with personalized practice sessions.
      </p>

      {/* Features */}
      <div>
        <h4 className="font-medium mb-3">Features</h4>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3 text-sm">
              <feature.icon className="h-4 w-4 text-primary" />
              {feature.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-4 border-t border-border space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground">System Administrator</h4>
        <div className="space-y-2 text-sm">
          <p>
            <span className="text-muted-foreground">Organization:</span> National Economic University
          </p>
          <p>
            <span className="text-muted-foreground">Email:</span> 12345678@st.neu.edu.vn
          </p>
          <p>
            <span className="text-muted-foreground">Support:</span> supports.neu.edu.vn
          </p>
        </div>
      </div>
    </div>
  )
}
