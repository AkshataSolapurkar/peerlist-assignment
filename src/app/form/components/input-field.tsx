import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, MoreHorizontal, AlignLeft, Hash, Link2, List, Type, CircleDot } from "lucide-react";
import { ShortInput } from "./form-input/short";
import { LongInput } from "./form-input/long";
import { NumberInput } from "./form-input/number";
import { UrlInput } from "./form-input/url";
import { SelectInput } from "./form-input/select";
import { DragHandle } from "./DragHandle";
import Shortansicon from "../../../../public/Short answerIcons.png";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  id: string;
  type?: "short" | "long" | "select" | "number" | "url";
  className?: string;
  previewMode?: boolean;
  onQuestionTypeChange: (newType: string) => void;
}

export function InputField({
  id,
  type = "short",
  className,
  previewMode = false,
  onQuestionTypeChange,
  ...props
}: InputFieldProps) {
  const [question, setQuestion] = React.useState("");

  const typeIcons = {
    short: <Image alt="" src={Shortansicon} width={16} height={16} />,
    long: <AlignLeft className="h-4 w-4 text-gray-600" />,
    select: <List className="h-4 w-4 text-gray-600" />,
    number: <Hash className="h-4 w-4 text-gray-600" />,
    url: <Link2 className="h-4 w-4 text-gray-600" />,
  };

  const renderInput = () => {
    if (previewMode) {
      return (
        <div className="text-sm font-medium text-black mt-2">
          {question || "No question entered yet."}
        </div>
      );
    }

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
    <div
      className={cn(
        "w-full bg-white gap-[8px] hover:bg-[#FAFBFC] hover:cursor-pointer flex flex-col border border-[#E1E4E8] rounded-lg p-4",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {previewMode ? (
            <span className="text-sm font-medium text-black">{question || "Write a question"}</span>
          ) : (
            <input
              type="text"
              className="text-sm font-medium bg-transparent border-0 focus:outline-none placeholder:text-gray-600 placeholder:text-[14px] text-black"
              placeholder="Write a question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          )}
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" className="bg-transparent h-8 w-8 p-0">
                {typeIcons[type]}
                <ChevronDown className="h-4 w-4 text-gray-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onQuestionTypeChange("short")}>
                <Type className="mr-2 h-4 w-4" />
                <span>Short answer</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onQuestionTypeChange("long")}>
                <AlignLeft className="mr-2 h-4 w-4" />
                <span>Long answer</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onQuestionTypeChange("select")}>
                <CircleDot className="mr-2 h-4 w-4" />
                <span>Single select</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onQuestionTypeChange("number")}>
                <Hash className="mr-2 h-4 w-4" />
                <span>Number</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onQuestionTypeChange("url")}>
                <Link2 className="mr-2 h-4 w-4" />
                <span>URL</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DragHandle id={id} />
        </div>
      </div>
      {renderInput()}
    </div>
  );
}
