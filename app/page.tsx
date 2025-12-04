// app/page.tsx
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import ReviewSlider from '@/components/ReviewSlider';
import About from '@/components/About';

import { Plane, Hotel, PlaneTakeoff, type LucideProps } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/* =============================
   Types
============================= */
type LucideIconType = ForwardRefExoticComponent<
  Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
>;

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: LucideIconType;
  linkHref: string;
  priceText: string;
  isPopular: boolean;
}

/* =============================
   Data
============================= */
const homeServicesData: ServiceItem[] = [
  {
    id: 1,
    title: 'ตั๋วเครื่องบิน (Flight Itinerary)',
    description:
      'เอกสารยืนยันการเดินทางสำหรับวีซ่าเชงเก้นและประเทศอื่น ๆ ที่ต้องการหลักฐานการบิน',
    icon: Plane,
    linkHref: '/flight-doc-preview',
    priceText: '฿ 299',
    isPopular: false,
  },
  {
    id: 2,
    title: 'การจองโรงแรม (Hotel Booking)',
    description:
      'สร้างเอกสารการจองที่พักที่น่าเชื่อถือตลอดการเดินทางของคุณ โดยไม่ต้องเสียค่าใช้จ่ายจริง',
    icon: Hotel,
    linkHref: '/visa-doc-preview',
    priceText: '฿ 299',
    isPopular: false,
  },
  {
    id: 3,
    title: 'แพ็กเกจ Flight + Hotel',
    description:
      'ชุดเอกสารที่ครบถ้วนและประหยัดกว่า เหมาะสำหรับการยื่นวีซ่าท่องเที่ยวในยุโรป',
    icon: PlaneTakeoff,
    linkHref: '/visa-doc-preview',
    priceText: '฿ 499',
    isPopular: true,
  },
];

/* =============================
   Page Component
============================= */
const HomePage: React.FC = () => {
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