"use client";

import { useState } from "react";
import Popup from "@/components/ui/popups";

const PopupButton = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <>
      <button
        onClick={togglePopup}
        className="bg-[#00AA45] text-white px-6 py-3 rounded-md text-lg shadow-md hover:bg-[#008837] focus:outline-none"
      >
        Create a New Form
      </button>

      {isPopupOpen && <Popup onClose={togglePopup} />}
    </>
  );
};

export default PopupButton;
