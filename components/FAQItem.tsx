// components/FAQItem.tsx
'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
}

export default function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = `faq-content-${question.replace(/\s+/g, '-')}`;

  return (
    <div className="border border-gray-200 rounded-md shadow-sm bg-white">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full p-5 text-left 
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green 
                   hover:bg-gray-50 transition-colors duration-200"
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        <span className="text-base md:text-lg font-semibold text-gray-900">
          {question}
        </span>
        <ChevronDown
          className={`w-6 h-6 text-brand-green transform transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Answer Section */}
      <div
        id={contentId}
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-5 pb-5 text-gray-700 text-sm md:text-base leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
}