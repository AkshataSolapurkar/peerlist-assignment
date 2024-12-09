import { useState } from "react";
import { usePathname } from "next/navigation";
export const ShortInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
  const [hasContent, setHasContent] = useState(false);
  const pathname = usePathname();
  const isFormPage = pathname === '/form';

  return (
    <input
      type="text"
      className={`
        w-full 
        rounded-[8px] 
        px-3 
        py-2 
        text-sm 
        shadow-custom-light 
        focus:shadow-custom-heavy 
        hover:shadow-custom-heavy 
        focus:outline-none 
        border-[#E1E4E8] 
        border
        ${hasContent ? "bg-white shadow-[0px_3px_3px_-1.5px_#00000008,_0px_1px_1px_-0.5px_#00000008] " : "bg-white border-[#E1E4E8] border text-gray-500"}
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