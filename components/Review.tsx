// components/Review.tsx
import React from 'react';
import { Quote, Star } from 'lucide-react';

interface ReviewProps {
  text: string;
  author: string;
  rating: number; // 1–5
  visaType?: string;
}

const Review: React.FC<ReviewProps> = ({ text, author, rating, visaType }) => {
  const normalizedRating = Math.max(0, Math.min(5, rating));

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-200 flex flex-col h-full hover:shadow-lg transition-shadow duration-200">
      {/* Quote Icon */}
      <div className="flex items-center mb-4">
        <Quote className="w-7 h-7 text-brand-green" aria-hidden="true" />
        <span className="ml-2 text-sm text-gray-400">รีวิวจากลูกค้า</span>
      </div>

      {/* Review Text */}
      <p className="text-gray-700 text-base md:text-lg mb-6 flex-grow leading-relaxed italic">
        “{text}”
      </p>

      {/* Footer Section */}
      <div className="mt-auto space-y-3">
        {/* Rating */}
        <div
          className="flex items-center"
          aria-label={`Rating: ${normalizedRating} out of 5`}
        >
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < normalizedRating
                  ? 'text-amber-400 fill-amber-400'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">
            {normalizedRating}/5
          </span>
        </div>

        {/* Author */}
        <p className="font-semibold text-gray-900">{author}</p>
        {visaType && (
          <p className="text-sm text-gray-500">ประเภทวีซ่า: {visaType}</p>
        )}
      </div>
    </div>
  );
};

export default Review;