"use client";

import React, { useState } from 'react';
import { ReviewForm, ReviewSummary } from './index';
// import Modal from '../ui/Modal/Modal';

interface ReviewsExampleProps {
  productId: string;
}

export default function ReviewsExample({ productId }: ReviewsExampleProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="container my-12">
      {/* Review Summary */}
      <ReviewSummary productId={productId} />
      
      {/* Add Review Button */}
      <div className="mb-8">
        <button
          onClick={() => setIsModalOpen(true)}
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
      </div>

      {/* Review Form - Direct display instead of modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="float-right text-gray-500 hover:text-gray-700 mb-4"
            >
              ✕
            </button>
            <ReviewForm 
              productId={productId}
              onSuccess={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
