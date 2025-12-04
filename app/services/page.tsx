// app/services/page.tsx
'use client';

import React from 'react';
import ServiceCard from '@/components/ServiceCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import { Plane, Hotel, PlaneTakeoff, BookOpenCheck } from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

// Type สำหรับ Icon Component (LucideIcon)
type LucideIconType = ForwardRefExoticComponent<
  Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
>;

// ข้อมูลจำลองสำหรับบริการ
interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: LucideIconType;
  linkHref: string;
  priceText: string;
  isPopular: boolean;
}

const servicesData: ServiceItem[] = [
  {
    id: 1,
    title: 'ตั๋วเครื่องบิน (Flight Itinerary)',
    description:
      'สร้างเอกสารยืนยันการเดินทางสำหรับการยื่นวีซ่าเชงเก้น วีซ่าญี่ปุ่น หรือประเทศอื่น ๆ ที่ต้องการหลักฐานการบิน',
    icon: Plane,
    linkHref: '/flight-doc-preview',
    priceText: '฿ 299',
    isPopular: true,
  },
  {
    id: 2,
    title: 'การจองโรงแรม (Hotel Booking)',
    description:
      'สร้างเอกสารการจองที่พักที่น่าเชื่อถือสำหรับการเดินทาง โดยไม่จำเป็นต้องชำระเงินจริง',
    icon: Hotel,
    linkHref: '/hotel-doc-preview',
    priceText: '฿ 299',
    isPopular: false,
  },
  {
    id: 3,
    title: 'แพ็กเกจ Flight + Hotel (Dual Package)',
    description:
      'ประหยัดกว่า! รับทั้งตั๋วเครื่องบินและการจองโรงแรมในราคารวม เหมาะสำหรับการยื่นวีซ่าเชงเก้น',
    icon: PlaneTakeoff,
    linkHref: '/dual-package-preview',
    priceText: '฿ 499 (ประหยัด ฿ 99)',
    isPopular: true,
  },
  {
    id: 4,
    title: 'จดหมายรับรองการเดินทาง (Cover Letter)',
    description:
      'สร้างจดหมายแนะนำตัวและรายละเอียดการเดินทางอย่างเป็นทางการ เพื่อยื่นประกอบเอกสารวีซ่า',
    icon: BookOpenCheck,
    linkHref: '/letter-service',
    priceText: '฿ 350',
    isPopular: false,
  },
];

const ServicesPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
              บริการเอกสารวีซ่าของเรา
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              เลือกบริการที่เหมาะสมกับความต้องการยื่นวีซ่าของคุณ
              ทุกเอกสารออกแบบมาเพื่อผ่านการตรวจสอบของสถานทูต
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {servicesData.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                icon={service.icon}
                linkHref={service.linkHref}
                priceText={service.priceText}
                isPopular={service.isPopular}
              />
            ))}
          </div>

          {/* Call to Action or Info Box */}
          <div className="mt-20 p-8 bg-blue-50 border-l-4 border-blue-500 rounded-lg shadow-inner">
            <h2 className="text-2xl font-bold text-blue-800 mb-2">
              คำแนะนำเพิ่มเติม
            </h2>
            <p className="text-blue-700">
              สำหรับผู้ที่ยื่นวีซ่าเชงเก้น เราแนะนำ{' '}
              <strong>แพ็กเกจ Flight + Hotel</strong> เพื่อความครบถ้วนของเอกสารที่ต้องใช้แสดงต่อสถานทูต
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServicesPage;