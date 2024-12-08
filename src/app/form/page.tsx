"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { QuestionTypeDropdown } from "./components/drowpdown";
import { InputField } from "./components/input-field";
import { ArrowUpRight } from "lucide-react";
import { SquarePen, Check } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface Question {
  id: string;
  type: string;
  text: string;
}

export default function Page() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState<string>("");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAddQuestion = (type: string) => {
    setQuestions([...questions, { id: `question-${Date.now()}`, type, text: "" }]);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setQuestions((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleQuestionTextChange = (id: string, newText: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q.id === id ? { ...q, text: newText } : q))
    );
  };

  const handleQuestionTypeChange = (id: string, newType: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q.id === id ? { ...q, type: newType } : q))
    );
  };

  // Preview button state
  const isPreviewEnabled = questions.length > 0;

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      <div className="container mx-auto border border-[#E1E4E8] max-w-[640px]">
        <div className="bg-white rounded-lg min-h-screen flex flex-col">
          {/* Header */}
          <div className="px-6 flex justify-between items-center border-b w-full">
            <div className="w-full">
              <div className="py-[17px] flex items-center gap-4 justify-between">
                <input
                  type="text"
                  placeholder="Untitled"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={`text-base font-semibold outline-none bg-transparent${
                    title ? "text-black" : ""
                  }`}
                />
                <Button
                  className={`flex items-center justify-center px-[16px] gap-[2px] rounded-[12px] py-[6px] text-[14px] font-semibold border ${
                    isPreviewEnabled
                      ? "bg-white text-black font-semibold border-[#E1E4E8]"
                      : "bg-white text-[#959DA5] border-[#959DA5] cursor-not-allowed"
                  }`}
                  disabled={!isPreviewEnabled}
                >
                  <p>Preview</p>
                  <ArrowUpRight className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 px-6 py-6">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext items={questions} strategy={verticalListSortingStrategy}>
                <div className="space-y-4">
                  {questions.map((question) => (
                    <InputField
                      key={question.id}
                      id={question.id}
                      type={question.type}
                      questionText={question.text}
                      onQuestionTextChange={(newText) =>
                        handleQuestionTextChange(question.id, newText)
                      }
                      onQuestionTypeChange={(newType) =>
                        handleQuestionTypeChange(question.id, newType)
                      }
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>

            <div className="flex justify-center mt-4">
              <QuestionTypeDropdown onSelect={handleAddQuestion} className="" />
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-[16px] border-t bg-[#F6F8FAE5] flex justify-between items-center">
            <Button
              className={`"flex gap-1 items-center rounded-[12px] border border-[#959DA5] bg-white py-[6px] px-[16px]" ${
                isPreviewEnabled
                  ? "bg-white text-black border-[#E1E4E8] text-[14px]"
                  : "bg-white text-[#959DA5] border-[#E1E4E8] cursor-not-allowed text-[14px]"
              }`}
              disabled={!isPreviewEnabled}
            >
              <SquarePen className="w-[5px] h-[5px]" /> Save as draft
            </Button>
            <Button className={`" rounded-[12px] flex items-center gap-1 text-white bg-[#00AA45] text-[14px] py-[6px] px-[16px]" ${isPreviewEnabled
                  ? "opacity-100"
                  : "opacity-50"
              }`}
              disabled={!isPreviewEnabled}>
            <Check className="w-[10] h-[6] text-white" />
              Publish
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
