'use client';

import React from 'react';
import Link from 'next/link';
import { Plane, Building2, CheckCircle2, FileText, Download } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// ตัวอย่างข้อมูลเอกสารแสดงในหน้า Samples
const SampleData = [
  {
    type: 'ตั๋วเครื่องบิน (Flight Itinerary)',
    description:
      'ตัวอย่างไฟล์ PDF แสดงการจองเที่ยวบินเพื่อใช้ประกอบการยื่นวีซ่าเชงเก้น ญี่ปุ่น หรือประเทศอื่น ๆ',
    icon: Plane,
    link: '/flight-doc-preview',
    isNew: true,
  },
  {
    type: 'เอกสารโรงแรม (Hotel Booking)',
    description:
      'ตัวอย่างเอกสารยืนยันการจองที่พัก แสดงชื่อผู้สมัครและช่วงวันเข้าพัก เพื่อใช้ประกอบการยื่นวีซ่า',
    icon: Building2,
    link: '/visa-doc-preview',
    isNew: false,
  },
  {
    type: 'แพ็กเกจคู่ (ตั๋ว + โรงแรม)',
    description: 'ตัวอย่างเอกสารชุดสมบูรณ์ที่พร้อมยื่นในรูปแบบ PDF ครบถ้วนและน่าเชื่อถือ',
    icon: CheckCircle2,
    link: '/dual-package-preview',
    isNew: false,
  },
];

export default function SamplesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16 md:py-24">
          {/* Header Section */}
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              ตัวอย่างเอกสาร VisaReady
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              ดูตัวอย่างเอกสารที่เราสร้างขึ้น ซึ่งออกแบบตามมาตรฐานสากลเพื่อเพิ่มความน่าเชื่อถือในการยื่นวีซ่าของคุณ
            </p>
          </header>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SampleData.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border-t-4 border-blue-600 flex flex-col justify-between"
                >
                  <div>
                    {/* Title */}
                    <div className="flex items-center mb-3">
                      <Icon className="w-8 h-8 text-blue-600 mr-3" />
                      <h2 className="text-xl font-bold text-gray-800">{item.type}</h2>

                      {item.isNew && (
                        <span className="ml-3 text-xs font-semibold px-2 py-0.5 rounded-full bg-yellow-400 text-gray-900 shadow-sm">
                          ใหม่!
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mb-4">{item.description}</p>
                  </div>

                  {/* Link */}
                  <Link
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center text-sm font-semibold text-blue-600 hover:text-blue-800 transition mt-4"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    ดูตัวอย่างเอกสาร (PDF)
                  </Link>
                </div>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">ยื่นเอกสารอย่างมั่นใจ</h2>
            <p className="text-lg text-gray-600 mb-6">
              เอกสารทั้งหมดจะถูกส่งถึงคุณในรูปแบบ PDF ที่พร้อมพิมพ์ ภายใน 24 ชั่วโมง
            </p>

            <Link
              href="/services"
              className="inline-flex items-center justify-center text-lg px-8 py-3 border border-transparent font-medium rounded-xl shadow-lg text-white bg-blue-600 hover:bg-blue-700 transition duration-150 focus-ring"
            >
              <Download className="w-5 h-5 mr-2" />
              พร้อมสร้างเอกสารจริงแล้วใช่ไหม?
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}