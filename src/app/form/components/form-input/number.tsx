import React, { useState } from 'react';

import { usePathname } from 'next/navigation';
import {Calendar} from "../../../../components/ui/calendar"
import { Popover,PopoverTrigger,PopoverContent } from '@/components/ui/popover';

interface NumberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const NumberInput: React.FC<NumberInputProps> = (props) => {
  const [hasContent, setHasContent] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const pathname = usePathname();
  const isFormPage = pathname === '/form';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasContent(e.target.value.length > 0);
    if (props.onChange) props.onChange(e);
  };

  return (
    <div className="relative w-full flex items-center">

      {isFormPage ? (
        <input
          type="text"
          className="border w-full rounded px-2 py-1 disabled:bg-gray-100 disabled:cursor-not-allowed"
          onChange={handleInputChange}
          disabled={isFormPage}
          {...props}
        />
      ) : (
        <Popover>
          <PopoverTrigger asChild>
            <input
              type="text"
              className="border rounded w-full focus:outline-none px-2 py-1 cursor-pointer"
              placeholder="MM-DD-YYYY"
              value={selectedDate ? selectedDate.toLocaleDateString() : ''}
              readOnly
            />
          </PopoverTrigger>
          <PopoverContent align="start" className="p-2">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => setSelectedDate(date)}
            />
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};
