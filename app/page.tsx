// app/page.tsx
'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import ReviewSlider from '@/components/ReviewSlider';
import About from '@/components/About';

import { servicesData } from '@/data/servicesData'; // ✅ ใช้ data จากไฟล์แยก

/* =============================
   Page Component
============================= */
const HomePage: React.FC = () => {
  // เลือกเฉพาะบริการที่ต้องการแสดงบนหน้าแรก (เช่น 3 รายการแรก)
  const homeServicesData = servicesData.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section id="hero" className="bg-white">
          <Hero />
        </section>

        {/* Services Overview Section */}
        <section id="services-overview" className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              บริการเอกสารวีซ่าที่จำเป็น
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

            <div className="text-center mt-12">
              <a
                href="/services"
                className="inline-flex items-center px-6 py-3 text-base font-semibold rounded-md shadow-sm text-white bg-brand-green hover:bg-emerald-700 transition-colors focus-visible:ring-2 focus-visible:ring-brand-gold"
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