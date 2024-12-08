import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, MoreHorizontal, AlignLeft, Hash, Link2, List } from 'lucide-react';
import { ShortInput } from "./form-input/short";
import { LongInput } from "./form-input/long";
import { NumberInput } from "./form-input/number";
import { UrlInput } from "./form-input/url";
import { SelectInput } from "./form-input/select";
import Shortansicon from "../../../../public/Short answerIcons.png"
import Image from "next/image";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  type?: "short" | "long" | "select" | "number" | "url";
  className?: string;
}

export function InputField({
  type = "short",
  className,
  ...props
}: InputFieldProps) {
  // Map of input types to their respective icons
  const typeIcons = {
    short: <Image alt="" src={Shortansicon} width={16} height={16}/>,
    long: <AlignLeft className="h-4 w-4 text-gray-600" />, // You can customize this if needed
    select: <List className="h-4 w-4 text-gray-600" />,
    number: <Hash className="h-4 w-4 text-gray-600" />,
    url: <Link2 className="h-4 w-4 text-gray-600" />,
  };

  // Function to render the appropriate input field
  const renderInput = () => {
    switch (type) {
      case "long":
        return <LongInput {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} />;
      case "select":
        return <SelectInput />;
      case "number":
        return <NumberInput {...props} />;
      case "url":
        return <UrlInput {...props} />;
      default:
        return <ShortInput {...props} />;
    }
  };

  return (
    <div className={cn("w-full bg-white gap-[8px] flex flex-col border border-[#E1E4E8] rounded-lg p-4", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <input
            type="text"
            className="text-sm font-medium bg-transparent border-0 focus:outline-none placeholder:text-gray-600"
            placeholder="Write a question"
          />
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <div className="flex items-center">
          {typeIcons[type]}
          <ChevronDown className="h-4 w-4 text-gray-600" />
          </div>
          <MoreHorizontal className="h-4 w-4 text-gray-600" />
        </div>
      </div>
      {renderInput()}
    </div>
  );
}
