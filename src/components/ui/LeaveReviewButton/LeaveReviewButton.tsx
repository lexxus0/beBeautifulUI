"use client";

import { useState } from "react";
import Modal from "../Modal/modal";
import ReviewForm from "../ReviewForm/ReviewForm";

export default function LeaveReviewButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="
          border border-white
          text-white
          font-sans
          font-normal
          text-[20px]
          leading-[1.2]
          rounded-lg
          px-8 py-4
          w-[292px] h-[56px]
          bg-[linear-gradient(180deg,rgba(45,45,45,0.8)_0%,rgba(148,148,148,0.8)_65.07%,rgba(45,45,45,0.8)_100%)]
        "
      >
        Залишити відгук
      </button>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <ReviewForm />
      </Modal>
    </>
  );
}
