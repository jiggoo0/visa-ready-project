// components/About.tsx
'use client';

import React from 'react';
import { ShieldCheck, Calendar, FileText, type LucideIcon } from 'lucide-react';

/* =============================
   Types
============================= */
interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

/* =============================
   Data
============================= */
const FEATURES: FeatureItem[] = [
  {
    icon: ShieldCheck,
    title: 'ความน่าเชื่อถือสูง',
    description:
      'เอกสารของเราถูกออกแบบตามมาตรฐานที่สถานทูตยอมรับ ทำให้มั่นใจได้ในขั้นตอนการยื่นคำร้อง',
  },
  {
    icon: Calendar,
    title: 'วันเวลาที่ยืดหยุ่น',
    description:
      'สามารถกำหนดวันเดินทางที่ต้องการได้อย่างแม่นยำ เพื่อให้สอดคล้องกับแผนการยื่นวีซ่าของคุณ',
  },
  {
    icon: FileText,
    title: 'รองรับหลายภาษา',
    description:
      'เอกสารสามารถออกได้ทั้งภาษาไทย ภาษาอังกฤษ และภาษาหลักอื่น ๆ เพื่อความสะดวกในการตรวจสอบ',
  },
];

/* =============================
   Feature Card Component
============================= */
const FeatureCard: React.FC<FeatureItem> = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-start p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="p-3 rounded-md bg-gray-100 mb-4">
      <Icon className="w-6 h-6 text-brand-green" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
  </div>
);

/* =============================
   About Section
============================= */
export default function About() {
  return (
    <section className="py-20 bg-neutral-light">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <header className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            เกี่ยวกับ VisaReady Docs Generator
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            เครื่องมือที่ช่วยลดความยุ่งยากในการเตรียมเอกสารประกอบการยื่นวีซ่า
            พร้อมมาตรฐานที่สถานทูตยอมรับ
          </p>
        </header>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-xs">
            *เอกสารจาก VisaReady Docs ใช้สำหรับการยื่นวีซ่าเท่านั้น 
            ไม่สามารถใช้เป็นตั๋วเครื่องบินหรือการจองโรงแรมจริงได้
          </p>
        </div>
      </div>
    </section>
  );
}