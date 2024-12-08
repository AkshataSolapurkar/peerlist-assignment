"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'

export const SelectInput: React.FC<{
  options: { id: string; text: string }[];
  onOptionsChange: (options: { id: string; text: string }[]) => void;
  selectedValue: string;
  onValueChange: (value: string) => void;
}> = ({ options, onOptionsChange, selectedValue, onValueChange }) => {
  const handleAddOption = () => {
    const newOptions = [...options, { id: String(Date.now()), text: '' }];
    onOptionsChange(newOptions);
  };

  const handleOptionChange = (id: string, value: string) => {
    const newOptions = options.map(option =>
      option.id === id ? { ...option, text: value } : option
    );
    onOptionsChange(newOptions);
  };

  return (
    <div className="space-y-2">
      <RadioGroup 
        className="space-y-2"
        value={selectedValue}
        onValueChange={onValueChange}
      >
        {options.map((option, index) => (
          <div key={option.id} className="flex items-center space-x-2">
            <RadioGroupItem
              value={option.id}
              id={option.id}
              className="mt-0.5"
            />
            <div className="flex-1 gap-[7px] rounded-[8px] p flex items-center border border-[#E1E4E8]">
              <input
                type="text"
                value={option.text}
                onChange={(e) => handleOptionChange(option.id, e.target.value)}
                placeholder={`Option ${index + 1}`}
                className={`flex-1 px-[8px] py-[6px] shadow-custom-light focus:shadow-custom-heavy hover:shadow-custom-heavy border-[#E1E4E8] border text-sm bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-gray-400 ${
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
  );
};

