import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, MoreHorizontal, AlignLeft, Hash, Link2, List, Type, CircleDot, Calendar } from "lucide-react";
import { ShortInput } from "./form-input/short";
import { LongInput } from "./form-input/long";
import { NumberInput } from "./form-input/number";
import { UrlInput } from "./form-input/url";
import { SelectInput } from "./form-input/select";
import { DragHandle } from "./DragHandle";
import Shortansicon from "../../../../public/Short answerIcons.png";
import Image from "next/image";
import select from "../../../../public/select.png"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus } from 'lucide-react';

// Define a more comprehensive interface for form questions
interface FormQuestion {
  id: string;
  type: "short" | "long" | "select" | "date" | "url";
  question: string;
  helpText: string;
  value: string | string[]; // Allows different types of values
  options?: { id: string; text: string }[]; // For select type questions
  onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  id: string;
  type?: "short" | "long" | "select" | "date" | "url";
  className?: string;
  previewMode?: boolean;
  onQuestionTypeChange: (newType: string) => void;
  onQuestionUpdate: (question: FormQuestion) => void;
  initialData?: FormQuestion;
}

export function InputField({
  id,
  type = "short",
  className,
  previewMode = false,
  onQuestionTypeChange,
  onQuestionUpdate,
  initialData,
  ...props
}: InputFieldProps) {
  const [question, setQuestion] = React.useState(initialData?.question || "");
  const [helpText, setHelpText] = React.useState(initialData?.helpText || "");
  const [value, setValue] = React.useState(initialData?.value || "");
  const [options, setOptions] = React.useState(initialData?.options || [
    { id: '1', text: '' },
    { id: '2', text: '' }
  ]);

  const typeIcons = {
    short: <Image alt="" src={Shortansicon} width={16} height={16} />,
    long: <AlignLeft className="h-4 w-4 text-gray-600" />,
    select: <Image alt="" src={select} width={16} height={16} />,
    date: <Calendar className="h-4 w-4 text-gray-600" />,
    url: <Link2 className="h-4 w-4 text-gray-600" />,
  };

  // Update the question data whenever any field changes
  React.useEffect(() => {
    const updatedQuestion: FormQuestion = {
      id,
      type,
      question,
      helpText,
      value,
      options: type === 'select' ? options : undefined
    };
    onQuestionUpdate(updatedQuestion);
  }, [question, helpText, value, type, options]);

  const renderInput = () => {
    if (previewMode) {
      return (
        <div className="text-sm font-medium text-black mt-2">
          {value || "No answer entered yet."}
        </div>
      );
    }

    const handleValueChange = (newValue: string | string[]) => {
      setValue(newValue);
    };

    switch (type) {
      case "long":
        return <LongInput 
          value={value as string}
          onChange={(e) => handleValueChange(e.target.value)}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} 
        />;
      case "select":
        return (
          <SelectInput 
            options={options}
            onOptionsChange={setOptions}
            selectedValue={value as string}
            onValueChange={handleValueChange}
          />
        );
      case "date":
        return <NumberInput 
          value={value}
          onChange={(e) => handleValueChange(e.target.value)}
          {...props} 
        />;
      case "url":
        return <UrlInput 
          value={value}
          onChange={(e) => handleValueChange(e.target.value)}
          {...props} 
        />;
      default:
        return <ShortInput 
          value={value}
          onChange={(e) => handleValueChange(e.target.value)}
          {...props} 
        />;
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
        <div className="flex items-center w-full">
          {previewMode ? (
            <span className="text-sm font-medium text-black">{question || "Write a question"}</span>
          ) : (
            <div className="flex flex-col gap-[4px] w-full">
              <input
                type="text"
                className="text-sm font-medium bg-transparent border-0 focus:outline-none placeholder:text-gray-600 placeholder:text-[14px] text-black"
                placeholder="Write a question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              
              <input
                type="text"
                className="text-sm text-gray-500 bg-transparent border-0 focus:outline-none placeholder:text-gray-400 placeholder:text-[14px]"
                placeholder="Write a help text or caption (leave empty if not needed)"
                value={helpText}
                onChange={(e) => setHelpText(e.target.value)}
              />
            </div>
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
              <DropdownMenuItem onClick={() => onQuestionTypeChange("date")}>
                <Calendar className="mr-2 h-4 w-4" />
                <span>Date</span>
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
