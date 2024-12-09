"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus, Type, AlignLeft, CircleDot, Link2, Hash, Calendar } from 'lucide-react'
import { cn } from "@/lib/utils"

interface QuestionTypeDropdownProps {
  onSelect: any;
  className?: string
}

export function QuestionTypeDropdown({ onSelect, className }: QuestionTypeDropdownProps) {
  const questionTypes = [
    { label: "Short answer", icon: Type, type: "short" },
    { label: "Long answer", icon: AlignLeft, type: "long" },
    { label: "Single select", icon: CircleDot, type: "select" },
    { label: "URL", icon: Link2, type: "url" },
    { label: "Date", icon: Calendar, type: "date" },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn(
            "border-1 rounded-[12px] text-black bg-white shadow-custom border border-[#E1E4E8] py-[8px] px-[14px] gap-2",
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
            onClick={() => onSelect(type.type)}
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

