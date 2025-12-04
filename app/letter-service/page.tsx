'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, FileText, Send } from 'lucide-react';

export default function LetterServicePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-10">
            <Mail className="w-12 h-12 text-blue-600 mx-auto mb-3" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              บริการเขียนจดหมายแนะนำตัวยื่นวีซ่า (Cover Letter)
            </h1>
            <p className="text-lg text-gray-600">
              สร้างจดหมายที่ชัดเจนและเป็นทางการเพื่อสนับสนุนคำร้องขอวีซ่าของคุณ
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-white p-8 rounded-xl shadow-2xl border border-blue-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Input/Form Section (Placeholder) */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-red-500" />
                  ข้อมูลสำหรับเขียนจดหมาย
                </h2>
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm font-medium text-yellow-800">
                      ⚠️ ฟอร์มสำหรับกรอกข้อมูลจะปรากฏที่นี่
                    </p>
                    <p className="text-xs text-yellow-700 mt-1">
                      (เช่น ชื่อผู้ยื่น, ที่อยู่, วัตถุประสงค์การเดินทาง, ระยะเวลาที่ขอวีซ่า)
                    </p>
                  </div>

                  <button
                    className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 shadow-md"
                    disabled
                  >
                    <Send className="w-5 h-5 mr-2" />
                    สร้างและดาวน์โหลดจดหมาย (ฟังก์ชันยังไม่เปิดใช้งาน)
                  </button>
                </div>
              </div>

              {/* Description Section */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                  ทำไมต้องมี Cover Letter?
                </h2>
                <ul className="list-disc pl-5 space-y-3 text-gray-700 text-sm">
                  <li>
                    <strong>ความชัดเจน:</strong> อธิบายวัตถุประสงค์ของการเดินทางอย่างเป็นทางการ
                  </li>
                  <li>
                    <strong>ความน่าเชื่อถือ:</strong> แสดงความรับผิดชอบและแผนการเดินทางที่รัดกุม
                  </li>
                  <li>
                    <strong>การอ้างอิง:</strong> ใช้จดหมายอ้างอิงถึงเอกสารประกอบอื่น ๆ เช่น ตั๋วเครื่องบินและโรงแรม
                  </li>
                  <li>
                    <strong>ข้อกำหนด:</strong> สถานทูตบางแห่งถือว่า Cover Letter เป็นเอกสารบังคับ
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}