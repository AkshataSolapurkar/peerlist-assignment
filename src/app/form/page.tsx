"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { QuestionTypeDropdown } from "./components/drowpdown"
import { InputField } from "./components/input-field"
import { ArrowUpRight } from 'lucide-react'

interface Question {
  id: string
  type: string
}

export default function Page() {
  const [questions, setQuestions] = useState<Question[]>([])

  const handleAddQuestion = (type: string) => {
    setQuestions([...questions, { id: Math.random().toString(), type }])
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      <div className="container mx-auto border border-[#E1E4E8] text-[#959DA5] max-w-[640px]">
        <div className="bg-white rounded-lg min-h-screen flex flex-col">
          {/* Header */}
          <div className="px-6 flex justify-between items-center border-b w-full">
            <div className="w-full">
              <div className="py-[17px] flex items-center gap-4 justify-between">
                <h1 className="text-base font-semibold">Untitled Form</h1>
                <Button className="flex items-center justify-center px-[16px] gap-[2px] rounded-[12px] py-[6px] text-[14px] bg-white text-[#959DA5] font-semibold border border-[#959DA5]">
                  <p>Preview</p>
                  <ArrowUpRight className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 px-6 py-6">
            <div className="space-y-4">
              {questions.map((question) => (
                <div
                  key={question.id}
                  className="animate-in slide-in-from-top duration-300"
                >
                  <InputField
                    type={question.type.toLowerCase().includes("short") ? "short" : 
                          question.type.toLowerCase().includes("long") ? "long" :
                          question.type.toLowerCase().includes("select") ? "select" :
                          question.type.toLowerCase().includes("number") ? "number" :
                          question.type.toLowerCase().includes("url") ? "url" : "short"}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-center ">
              <QuestionTypeDropdown 
                onSelect={handleAddQuestion}
                className=""
              />
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t bg-gray-50/50 flex justify-between items-center">
            <Button variant="outline">Save as draft</Button>
            <Button className="bg-[#2563EB] hover:bg-[#1D4ED8]">
              Publish
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

