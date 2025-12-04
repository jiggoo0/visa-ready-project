'use client';

import React from 'react';
// 💡 ใช้ Absolute Imports เพื่อความสะอาดของโค้ด
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import ReviewSlider from '@/components/ReviewSlider';
import About from '@/components/About';

import { servicesData } from '@/data/servicesData'; // ข้อมูลบริการ

/* =============================
   Page Component
============================= */
const HomePage: React.FC = () => {
  // เลือกเฉพาะบริการที่ต้องการแสดงบนหน้าแรก (เช่น 3 รายการแรก)
  const homeServicesData = servicesData.slice(0, 3);

  // กำหนดสีหลัก
  const primaryGreen = 'bg-emerald-600';

  return (
    // กำหนด layout พื้นฐานสำหรับ mobile-first
    <div className="min-h-screen flex flex-col bg-gray-50 font-inter antialiased">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section id="hero" className="bg-white">
          <Hero />
        </section>

        {/* Services Overview Section */}
        <section id="services-overview" className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 text-center tracking-tight">
              บริการเอกสารยื่นวีซ่าที่จำเป็น
            </h2>
            <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
              เลือกแพ็กเกจที่เหมาะสมกับความต้องการของคุณเพื่อเตรียมเอกสารให้พร้อมสำหรับการยื่นวีซ่าอย่างมั่นใจ
            </p>

            {/* Service Cards Grid */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {homeServicesData.map((service) => (
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

            {/* CTA to All Services */}
            <div className="text-center mt-16">
              <a
                href="/services"
                className={`inline-flex items-center px-8 py-3 text-lg font-bold rounded-xl shadow-lg 
                            text-white ${primaryGreen} hover:bg-emerald-700 transition-colors 
                            focus:ring-4 focus:ring-emerald-300 transform hover:scale-[1.02]`}
              >
                ดูบริการและราคาทั้งหมด
              </a>
            </div>
          </div>
        </section>

        {/* Review Section */}
        <section id="reviews" className="py-16 md:py-24 bg-white">
          <ReviewSlider />
        </section>

        {/* About Section */}
        <section id="about" className="py-16 md:py-24 bg-gray-100">
          <About />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;

