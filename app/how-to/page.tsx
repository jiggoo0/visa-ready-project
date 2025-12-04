'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, Check, Lightbulb, Clock, Download } from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

// ใช้ typeof จาก Component เพื่อนิยาม Type ของ Icon
type LucideIconType = typeof FileText;

interface Step {
  icon: LucideIconType;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    icon: Lightbulb,
    title: '1. เตรียมข้อมูลพื้นฐาน (Initial Data Prep)',
    description:
      'รวบรวมข้อมูลสำคัญ เช่น ชื่อ-นามสกุลผู้เดินทาง วันที่เดินทางไป-กลับ เมืองต้นทางและปลายทาง (สำหรับตั๋วเครื่องบิน) และชื่อโรงแรมที่ยืนยันแล้ว (สำหรับเอกสารที่พัก)',
  },
  {
    icon: FileText,
    title: '2. เลือกประเภทเอกสารที่ต้องการ (Select Document Type)',
    description:
      'เลือกการสร้างเอกสารเป็น Flight Itinerary, Hotel Booking หรือ Dual Package (รวมตั๋วเครื่องบินและโรงแรม) เพื่อให้สอดคล้องกับความต้องการในการยื่นวีซ่าของคุณ',
  },
  {
    icon: Clock,
    title: '3. ป้อนและตรวจสอบรายละเอียด (Input & Review Details)',
    description:
      'ป้อนข้อมูลที่เตรียมไว้ในขั้นตอนที่ 1 ลงในฟอร์ม ตรวจสอบความถูกต้องของชื่อ วันที่ และรหัสการจอง (Booking Ref.) ให้ครบถ้วนก่อนดำเนินการต่อ',
  },
  {
    icon: Download,
    title: '4. สร้างและดาวน์โหลดเอกสาร (Generate & Download)',
    description:
      'ระบบจะจัดรูปแบบเอกสารตามมาตรฐานการยื่นวีซ่า (เช่น A4, ข้อมูลครบถ้วน) จากนั้นคุณสามารถดาวน์โหลดเอกสารเป็นไฟล์ PDF พร้อมนำไปยื่นวีซ่าได้ทันที',
  },
  {
    icon: Check,
    title: '5. ยื่นคำร้องขอวีซ่า (Submit Visa Application)',
    description:
      'นำเอกสารที่ดาวน์โหลดไปรวมกับเอกสารอื่น ๆ ที่จำเป็น (เช่น Passport, รูปถ่าย, ประกันการเดินทาง) เพื่อยื่นคำร้องขอวีซ่า ณ สถานทูตหรือศูนย์รับคำร้องที่กำหนด',
  },
];

const StepCard: React.FC<Step> = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col md:flex-row p-6 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 border border-gray-100">
    <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
      <div className="w-14 h-14 flex items-center justify-center bg-blue-600 rounded-full text-white shadow-md">
        <Icon className="w-7 h-7" />
      </div>
    </div>

    <div className="flex-grow">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

export default function HowToPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow py-12 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
              ขั้นตอนการสร้างเอกสารยื่นวีซ่า
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              แนวทางการเตรียมเอกสาร Flight & Hotel Confirmation ที่ง่ายและรวดเร็ว
            </p>
          </header>

          {/* Main Steps */}
          <section className="space-y-8">
            {STEPS.map((step, index) => (
              <StepCard key={index} {...step} />
            ))}
          </section>

          {/* Advice Section */}
          <footer className="mt-16 text-center p-6 bg-blue-100/50 rounded-xl border border-blue-200 shadow-md">
            <h3 className="text-lg font-bold text-blue-800 mb-2">💡 ข้อแนะนำเพิ่มเติม</h3>
            <p className="text-sm text-blue-700">
              เอกสารนี้จัดทำเพื่อการยื่นวีซ่าโดยเฉพาะ โปรดตรวจสอบข้อกำหนดของสถานทูตที่คุณจะยื่นคำร้องอีกครั้งก่อนใช้งานจริง
              คุณสามารถดูตัวอย่างเอกสารได้ที่{' '}
              <Link href="/samples" className="font-semibold underline hover:text-blue-900">
                หน้าตัวอย่าง
              </Link>
            </p>
          </footer>
        </div>
      </main>

      <Footer />
    </div>
  );
}