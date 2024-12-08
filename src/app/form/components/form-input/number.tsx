import React, { useState } from 'react';
import { Hash } from 'lucide-react';

export const NumberInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
  const [hasContent, setHasContent] = useState(false);

  return (
    <div className="relative">
      <input
        type="text"
        className={`w-full bg-[#F6F8FA] rounded-md px-3 py-2 text-sm border-0 focus:outline-none ${
          hasContent ? 'text-black' : 'text-gray-500'
        }`}
        placeholder=""
        onChange={(e) => {
          setHasContent(e.target.value.length > 0);
          if (props.onChange) props.onChange(e);
        }}
        {...props}
      />
    </div>
  );
};

