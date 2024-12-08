import React, { useState } from 'react';
import { Link2 } from 'lucide-react';

export const UrlInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
  const [hasContent, setHasContent] = useState(false);

  return (
    <div className="relative">
      <input
        type="url"
        className={`w-full bg-white px-3 shadow-custom-light focus:shadow-custom-heavy hover:shadow-custom-heavy border-[#E1E4E8] border rounded-md py-2 text-sm focus:outline-none ${
          hasContent ? 'text-black' : 'text-gray-500'
        }`}
        placeholder="Placeholder"
        onChange={(e) => {
          setHasContent(e.target.value.length > 0);
          if (props.onChange) props.onChange(e);
        }}
        {...props}
      />
    </div>
  );
};

