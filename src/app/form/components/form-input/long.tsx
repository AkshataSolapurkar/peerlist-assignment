import React, { useState } from 'react';

export const LongInput: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => {
  const [hasContent, setHasContent] = useState(false);

  return (
    <textarea
      className={`w-full min-h-[100px] bg-[#F6F8FA] rounded-md px-3 py-2 text-sm border-0 focus:outline-none ${
        hasContent ? 'text-black' : 'text-gray-500'
      }`}
      placeholder=""
      onChange={(e) => {
        setHasContent(e.target.value.length > 0);
        if (props.onChange) props.onChange(e);
      }}
      {...props}
    />
  );
};

