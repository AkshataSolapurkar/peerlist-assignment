"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus, Type, AlignLeft, CircleDot, Link2, Calendar } from 'lucide-react'
import { cn } from "@/lib/utils"

interface QuestionTypeDropdownProps {
  onSelect: (type: string) => void
  className?: string
}

export function QuestionTypeDropdown({ onSelect, className }: QuestionTypeDropdownProps) {
  const questionTypes = [
    { label: "Short answer", icon: Type },
    { label: "Long answer", icon: AlignLeft },
    { label: "Single select", icon: CircleDot },
    { label: "URL", icon: Link2 },
    { label: "Date", icon: Calendar },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn(
            "border-1 text-black bg-white shadow-custom border border-[#E1E4E8] py-[8px] px-[14px] gap-2",
            className
          )}
        >
          <Plus className="h-4 w-4" />
          Add question
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-56">
        {questionTypes.map((type) => (
          <DropdownMenuItem
            key={type.label}
            onClick={() => onSelect(type.label)}
            className="gap-2"
          >
            <type.icon className="h-4 w-4" />
            <span>{type.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

