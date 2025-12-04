import React from 'react';
import Link from 'next/link';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FAQItem from '@/components/FAQItem';

const faqData = [
  {
    question: 'เอกสารนี้ใช้ยื่นวีซ่าได้จริงไหม?',
    answer:
      'เอกสารของเราเป็นเอกสารที่ออกแบบให้มีรูปแบบคล้ายกับการจองจริง ใช้สำหรับแสดงหลักฐานการเดินทางและการเข้าพักตามข้อกำหนดของสถานทูตในการยื่นคำร้องขอวีซ่าเท่านั้น **ไม่รับประกันการอนุมัติวีซ่า** และไม่สามารถใช้เพื่อการเดินทางจริงได้',
  },
  {
    question: 'ฉันสามารถใช้เอกสารนี้เดินทางจริงได้หรือไม่?',
    answer:
      "ไม่ได้! โดยเด็ดขาด เอกสารนี้มี Watermark และข้อความกำกับชัดเจนว่าเป็น 'FOR VISA ONLY - NOT A REAL BOOKING' หากนำไปใช้เพื่อการเดินทางจริงอาจส่งผลให้ถูกปฏิเสธการเดินทางและมีปัญหาทางกฎหมายได้",
  },
  {
    question: 'เอกสารรองรับวีซ่าประเทศไหนบ้าง?',
    answer:
      'เราออกแบบให้เอกสารเป็นไปตามมาตรฐานสากลที่ใช้ได้กับวีซ่าเกือบทุกประเภท เช่น Schengen, UK, US, Canada, Japan และอื่น ๆ โดยหลักการแล้ว สถานทูตส่วนใหญ่ต้องการแค่หลักฐานแสดงแผนการเดินทางเท่านั้น',
  },
  {
    question: 'ใช้เวลานานเท่าไหร่ในการสร้างเอกสาร?',
    answer:
      'หลังจากที่คุณชำระเงินและให้ข้อมูลครบถ้วน ทีมงานของเราจะดำเนินการสร้างและจัดส่งไฟล์ PDF ให้คุณทางอีเมลภายใน **1-2 ชั่วโมง** (ในช่วงเวลาทำการ) หรือไม่เกิน 4 ชั่วโมงในกรณีที่มีคำสั่งซื้อหนาแน่น',
  },
  {
    question: 'ถ้าข้อมูลผิดพลาด สามารถแก้ไขได้หรือไม่?',
    answer:
      'ได้ครับ! ทุกแพ็กเกจมีการรับประกันการแก้ไขข้อมูลฟรีตามจำนวนครั้งที่ระบุในตารางราคา กรุณาตรวจสอบข้อมูลให้ถี่ถ้วนก่อนส่ง เพื่อลดความล่าช้าในการสร้างเอกสาร',
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow py-12 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header Section */}
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              คำถามที่พบบ่อย (FAQ)
            </h1>
            <p className="text-xl text-gray-600">
              ค้นหาคำตอบสำหรับข้อสงสัยเกี่ยวกับบริการของเราเพื่อความมั่นใจก่อนสั่งซื้อ
            </p>
          </header>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <FAQItem key={index} question={item.question} answer={item.answer} />
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center p-8 bg-blue-50 rounded-2xl shadow-lg border-l-4 border-blue-500">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">มีคำถามเพิ่มเติม?</h2>
            <p className="text-lg text-gray-700 mb-6">
              โปรดติดต่อทีมสนับสนุนลูกค้าสัมพันธ์ของเราโดยตรง เราพร้อมให้ความช่วยเหลืออย่างรวดเร็ว
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold rounded-xl shadow-md text-white bg-blue-600 hover:bg-blue-700 transition duration-150 focus-ring"
            >
              ไปที่หน้าติดต่อเรา
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}