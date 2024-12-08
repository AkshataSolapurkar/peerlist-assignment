"use client"
import Link from "next/link";
import { useState } from "react";

interface PopupProps {
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ onClose }) => {
  const [formTitle, setFormTitle] = useState("");

  const handleFormTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormTitle(e.target.value);
  };

  const handleNext = () => {
    alert(`Form Title: ${formTitle || "Untitled Form"}`);
    onClose(); // Close the popup
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h3 className="text-xl font-semibold mb-4">Create Form</h3>
        <p className="text-gray-600 mb-4">Do you want to name your form?</p>
        <input
          type="text"
          placeholder="Enter form title (optional)"
          value={formTitle}
          onChange={handleFormTitleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-[#00AA45]"
        />
        <Link
          href='/form'
          className="bg-[#00AA45] text-white w-full py-2 rounded-md hover:bg-[#008837] focus:outline-none"
        >
          Next
        </Link>
        <button
          onClick={onClose}
          className="mt-3 text-sm text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Popup;
