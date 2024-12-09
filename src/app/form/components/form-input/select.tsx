"use client"
import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Plus, Minus } from 'lucide-react'
import { usePathname } from "next/navigation"

export const SelectInput: React.FC<{
  options: { id: string; text: string }[];
  onOptionsChange: (options: { id: string; text: string }[]) => void;
  selectedValue: string;
  onValueChange: (value: string) => void;
}> = ({ options, onOptionsChange, selectedValue, onValueChange }) => {
  const [hoveredOptionId, setHoveredOptionId] = useState<string | null>(null);
  const pathname = usePathname();
  const isFormPage = pathname === '/form';

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

  const handleDeleteOption = (id: string) => {
    // Prevent deleting if there's only one option
    if (options.length > 1) {
      const newOptions = options.filter(option => option.id !== id);
      onOptionsChange(newOptions);

      // If the deleted option was the selected one, select the first option
      if (selectedValue === id) {
        onValueChange(newOptions[0].id);
      }
    }
  };

  return (
    <div className="space-y-2">
      <RadioGroup
        className="space-y-2"
        value={selectedValue}
        onValueChange={onValueChange}
      >
        {options.map((option, index) => (
          <div 
            key={option.id} 
            className="flex items-center space-x-2 group relative"
            onMouseEnter={() => setHoveredOptionId(option.id)}
            onMouseLeave={() => setHoveredOptionId(null)}
          >
            <RadioGroupItem
              value={option.id}
              id={option.id}
              className={`mt-0.5 ${isFormPage ? 'cursor-not-allowed opacity-50' : ''}`}
              disabled={isFormPage}
            />
            <div className="flex-1 gap-[7px] rounded-[8px] p flex items-center">
              <input
                type="text"
                value={option.text}
                onChange={(e) => handleOptionChange(option.id, e.target.value)}
                placeholder={`Option ${index + 1}`}
                className={`flex-1 bg-white rounded-[12px] px-[8px] border border-[#E1E4E8] py-[6px] shadow-custom-light focus:shadow-custom-heavy hover:shadow-custom-heavy border-[#E1E4E8] border text-sm bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-gray-400 ${
                  option.text ? 'text-black' : 'text-gray-500'
                }`}
              />
              {/* Delete button for all options except the last one */}
              {index !== options.length - 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => handleDeleteOption(option.id)}
                  className="h-full px-2 text-gray-400 hover:text-gray-600 w-[32px] flex justify-center items-center"
                >
                  <Minus className="h-4 w-4 text-black" />
                </Button>
              )}
            </div>

            {/* Last option shows Plus sign */}
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

export default SelectInput;