// components/Hero.tsx
import Link from 'next/link';
import { Plane, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section
      className="relative w-full h-[55vh] md:h-[65vh] overflow-hidden border-b border-gray-200 bg-center bg-cover"
      style={{ backgroundImage: "url('/images/Hero.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-12 max-w-6xl mx-auto text-white">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
          สร้างเอกสารตั๋วเครื่องบินและโรงแรม
          <span className="block text-brand-gold">
            สำหรับการยื่นวีซ่าอย่างมั่นใจ
          </span>
        </h1>

        <p className="text-base md:text-xl text-gray-100 mb-6 leading-relaxed max-w-2xl">
          เอกสารคุณภาพสูงที่ออกแบบตามมาตรฐานสถานทูต รองรับ Schengen, UK, US และอื่น ๆ
          พร้อมดาวน์โหลดในรูปแบบ PDF ภายในไม่กี่ชั่วโมง
        </p>

        <Link
          href="/services"
          className="inline-flex items-center px-6 py-3 bg-brand-green text-white text-base font-semibold rounded-md shadow-md hover:bg-emerald-700 transition-colors focus-visible:ring-2 focus-visible:ring-brand-gold w-fit"
        >
          <Plane className="w-5 h-5 mr-2" />
          เริ่มสร้างเอกสารของคุณ
          <ArrowRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </section>
  );
}