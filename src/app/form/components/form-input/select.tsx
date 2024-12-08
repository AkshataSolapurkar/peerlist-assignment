"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'

export const SelectInput: React.FC = () => {
  const [options, setOptions] = useState([
    { id: '1', text: '' },
    { id: '2', text: '' }
  ])

  const handleAddOption = () => {
    setOptions([...options, { id: String(Date.now()), text: '' }])
  }

  const handleOptionChange = (id: string, value: string) => {
    setOptions(options.map(option => 
      option.id === id ? { ...option, text: value } : option
    ))
  }

  return (
    <div className="space-y-2">
      <RadioGroup className="space-y-2">
        {options.map((option, index) => (
          <div key={option.id} className="flex items-center space-x-2">
            <RadioGroupItem 
              value={option.id} 
              id={option.id} 
              className="mt-0.5"
              disabled
            />
            <div className="flex-1 gap-[7px] rounded-[8px] p flex items-center border border-[#E1E4E8]">
              <input
                type="text"
                value={option.text}
                onChange={(e) => handleOptionChange(option.id, e.target.value)}
                placeholder={`Option ${index + 1}`}
                className={`flex-1 px-[8px] py-[6px] text-sm bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-gray-400 ${
                  option.text ? 'text-black' : 'text-gray-500'
                }`}
              />
            </div>
            {index === options.length - 1 && (
              <Button
                type="button"
                variant="ghost"
                onClick={handleAddOption}
                className="h-full px-2 text-gray-400 hover:text-gray-600"
              >
                <Plus className="h-4 w-4 text-black" />
              </Button>
            )}
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

