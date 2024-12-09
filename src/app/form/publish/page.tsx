"use client";

import { useState, useEffect } from "react";
import { ShortInput } from "../components/form-input/short";
import { LongInput } from "../components/form-input/long";
import { UrlInput } from "../components/form-input/url";
import { NumberInput } from "../components/form-input/number";
import { toast, Toaster } from "react-hot-toast";

interface Question {
  id: string;
  type: string;
  question: string;
  helpText?: string;
  value?: string | string[];
  options?: { id: string; text: string }[];
}

export default function PublishPage() {
  const [title, setTitle] = useState<string>("Submit Form");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [filledQuestions, setFilledQuestions] = useState<number>(0);
  const [unattemptedQuestions, setUnattemptedQuestions] = useState<string[]>(
    []
  );

  // Validate fields on submit
  const handleSubmit = () => {
    const missingFields = questions
      .filter(
        (question) =>
          !question.value || (Array.isArray(question.value) && !question.value.length)
      )
      .map((question) => question.id);

    if (missingFields.length > 0) {
      setUnattemptedQuestions(missingFields); 
      toast.error("Please fill all the required fields.");
    } else {
      setUnattemptedQuestions([]); 
      toast.success("Form submitted successfully!");
    }
  };

  useEffect(() => {
    const storedFormData = localStorage.getItem("formQuestions");
    const storedTitle = localStorage.getItem("formTitle");

    if (storedFormData) {
      try {
        const parsedQuestions = JSON.parse(storedFormData);
        setQuestions(parsedQuestions);
      } catch (error) {
        console.error("Error parsing form questions:", error);
      }
    }

    if (storedTitle) {
      setTitle(storedTitle);
    }
  }, []);

  const handleInputChange = (id: string, value: string | string[]) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = prevQuestions.map((question) => {
        if (question.id === id) {
          question.value = value;
        }
        return question;
      });

      // Calculate the number of filled questions
      const filled = updatedQuestions.filter(
        (question) =>
          question.value && question.value !== "" && question.value.length > 0
      ).length;
      setFilledQuestions(filled);

      return updatedQuestions;
    });
  };

  const renderInputBasedOnType = (question: Question) => {
    switch (question.type) {
      case "long":
        return (
          <LongInput
            value={question.value as string}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange(question.id, e.target.value)
            }
            className="w-full border focus:outline-none shadow-custom-light hover:shadow-custom-heavy rounded-md p-2"
          />
        );
        case "select":
            return (
              <div className="space-y-2">
                {question.options?.map((option) => (
                  <div key={option.id} className="flex items-center">
                    <input
                      type="radio"
                      id={option.id}
                      name={`select-${question.id}`}
                      checked={question.value === option.id}
                      onChange={() => handleInputChange(question.id, option.id)}
                      className="mr-2 accent-[#00AA45]" // Custom color for the radio button
                    />
                    <label htmlFor={option.id} className="text-gray-700">
                      {option.text || "Option"} {/* Default to "Option" if text is empty */}
                    </label>
                  </div>
                ))}
              </div>
            );
          

      case "date":
        return (
          <NumberInput
            value={question.value as string}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange(question.id, e.target.value)
            }
            className="w-full focus:outline-none shadow-custom-light hover:shadow-custom-heavy border rounded-md p-2"
            placeholder="MM-DD-YYYY"
          />
        );
      case "url":
        return (
          <UrlInput
            value={question.value as string}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange(question.id, e.target.value)
            }
            className="w-full border focus:outline-none shadow-custom-light hover:shadow-custom-heavy rounded-md p-2"
          />
        );
      default:
        return (
          <ShortInput
            value={question.value as string}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange(question.id, e.target.value)
            }
            className="w-full border focus:outline-none shadow-custom-light hover:shadow-custom-heavy rounded-md p-2"
          />
        );
    }
  };

  const progress =
    questions.length > 0 ? (filledQuestions / questions.length) * 100 : 0;

  return (
    <div className="h-screen bg-[#FFFFFF] text-black">
      <div className="container border border-[#E1E4E8] mx-auto max-w-[640px]">
        <div className="bg-white rounded-lg shadow-sm h-screen flex flex-col">
          {/* Header */}
          <div className="px-6 flex justify-between border-b w-full py-4">
            <div className="flex items-center w-full justify-between">
              <h1 className="text-[16px] font-semibold">{title}</h1>
            </div>
            {/* Progress Bar */}
            <div className="w-full">
            <div className="text-[14px] font-normal text-right">Form completeness — {parseInt(progress.toString(), 10)}% </div>
            <div className="bg-gray-200 rounded-full h-1 w-full] mt-2">
              <div
                className="bg-green-500 h-1 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            </div>
            
          </div>

          {/* Content */}
          <div className="flex-1 h-screen scrollbar-none overflow-y-auto p-6">
            {questions.length === 0 ? (
              <div className="text-center text-gray-500 mt-10">
                No questions found. Please create a form first.
              </div>
            ) : (
              <div className="space-y-6 mb-[32px]">
                {questions.map((question) => (
                  <div key={question.id} className="gap-[4px] flex flex-col">
                    <div
                        className={`text-sm font-semibold text-[14px] ${
                          unattemptedQuestions.includes(question.id)
                            ? "text-red-500"
                            : "text-black"
                        }`}
                      >
                        {question.question}
                      </div>
                    {question.helpText && (
                      <div className="text-sm text-gray-500">
                        {question.helpText}
                      </div>
                    )}
                    {renderInputBasedOnType(question)}
                  </div>
                ))}
              </div>
            )}
            <div className="flex justify-end mt-[40px] w-full">
              <button
                className="bg-[#00AA45] text-white py-2 px-6 rounded-md text-sm font-semibold"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
