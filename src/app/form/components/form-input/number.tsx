import React, { useState } from 'react';
import { Hash } from 'lucide-react';

export const NumberInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
  const [hasContent, setHasContent] = useState(false);

  return (
    <div className="relative">
      <input
        type="text"
        className={`w-full bg-white shadow-custom-light px-3 focus:shadow-custom-heavy hover:shadow-custom-heavy border-[#E1E4E8] border rounded-md py-2 text-sm  focus:outline-none ${
          hasContent ? 'text-black' : 'text-gray-500'
        }`}
        placeholder="MM-DD-YYYY"
        onChange={(e) => {
          setHasContent(e.target.value.length > 0);
          if (props.onChange) props.onChange(e);
        }}
        {...props}
      />
    </div>
  );
};

