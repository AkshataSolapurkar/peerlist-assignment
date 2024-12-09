"use client"

import React, { useState, useEffect } from "react"
import { format } from "date-fns"
import { CalendarIcon } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { usePathname } from "next/navigation"

interface NumberInputProps {
  value: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  placeholder?: string
  type: "text" | "date"
}

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  className,
  placeholder,
  type,
}) => {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const pathname = usePathname();
  const isFormPage = pathname === '/form';
  useEffect(() => {
    if (type === "date" && value) {
      setDate(new Date(value))
    }
  }, [type, value])

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    if (onChange && selectedDate) {
      onChange({
        target: { value: format(selectedDate, "MM-dd-yyyy") }
      } as React.ChangeEvent<HTMLInputElement>)
    }
  }

  if (type === "date") {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
              className
            )}
            disabled={isFormPage}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "MM-dd-yyyy") : <span>{placeholder || "Pick a date"}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      className={className}
      placeholder={placeholder}
      disabled={isFormPage}
    />
  )
}

export default NumberInput

