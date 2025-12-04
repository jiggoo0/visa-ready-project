'use client';

import React from 'react';
import ServiceCard from '@/components/ServiceCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { servicesData } from '@/data/servicesData';
import { getCheckoutLink } from '@/utils/getCheckoutLink';
import Link from 'next/link';

const ServicesPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 pt-8">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              แพ็กเกจเอกสารยื่นวีซ่าที่เชื่อถือได้
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              เลือกบริการที่เหมาะสมกับความต้องการยื่นวีซ่าของคุณ
              ทุกเอกสารออกแบบมาเพื่อผ่านการตรวจสอบของสถานทูต
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {servicesData.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                icon={service.icon}
                linkHref={getCheckoutLink(service.linkHref)}
                priceText={service.priceText}
                isPopular={service.isPopular}
              />
            ))}
          </div>

          <div className="mt-20 p-8 bg-blue-50 border-l-4 border-blue-600 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-blue-800 mb-2">
              คำแนะนำพิเศษสำหรับยื่นวีซ่าเชงเก้น
            </h2>
            <p className="text-blue-700 text-lg">
              สำหรับผู้ที่ยื่นวีซ่าเชงเก้น (Schengen Visa) เราแนะนำให้ใช้{' '}
              <strong className="text-blue-900">แพ็กเกจคู่ Flight + Hotel</strong> 
              เพื่อแสดงหลักฐานความตั้งใจในการเดินทางและที่พักอย่างครบถ้วน ซึ่งเป็นข้อกำหนดสำคัญของสถานทูต
            </p>
            <div className="mt-4">
              <Link 
                href="/pricing"
                className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 transition underline"
              >
                ดูรายละเอียดแพ็กเกจเพิ่มเติมที่หน้า "ราคาสินค้า"
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServicesPage;