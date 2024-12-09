import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const LongInput: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => {
  const [hasContent, setHasContent] = useState(false);
  const pathname = usePathname();
  const isFormPage = pathname === '/form';

  return (
    <textarea
      className={`
        w-full 
        min-h-[100px] 
        shadow-custom-light 
        focus:shadow-custom-heavy 
        hover:shadow-custom-heavy  
        border-[#E1E4E8] 
        border 
        bg-white 
        rounded-md  
        py-2 
        text-sm 
        px-3 
        focus:outline-none 
        ${hasContent ? 'text-black' : 'text-gray-500'}
        ${isFormPage ? 'cursor-not-allowed opacity-50' : ''}
      `}
      placeholder=""
      onChange={(e) => {
        setHasContent(e.target.value.length > 0);
        if (props.onChange) props.onChange(e);
      }}
      disabled={isFormPage}
      {...props}
    />
  );
};