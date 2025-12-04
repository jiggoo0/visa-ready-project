// components/ReviewSlider.tsx
'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import Review from './Review';
import { reviews } from '@/mock/reviews';

export default function ReviewSlider() {
  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          เสียงตอบรับจากลูกค้า
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          ความพึงพอใจจากผู้ใช้จริงที่เลือกใช้บริการ VisaReady Docs
        </p>
      </div>

      {/* Swiper Slider */}
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={32}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        loop
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="pb-12"
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <Review {...review} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}