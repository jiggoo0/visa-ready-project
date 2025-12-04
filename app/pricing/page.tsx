// app/pricing/page.tsx
'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PricingCard from '@/components/PricingCard';

/* =============================
   Types
============================= */
interface FeatureItem {
  name: string;
  isAvailable: boolean;
}

interface PricingPlan {
  id: number;
  title: string;
  description: string;
  price: number;
  currency?: 'THB' | 'USD' | 'EUR';
  features: FeatureItem[];
  linkHref: string;
  buttonText: string;
  isRecommended?: boolean;
}

/* =============================
   Pricing Data
============================= */
const pricingData: PricingPlan[] = [
  {
    id: 1,
    title: 'Flight Starter',
    description: 'สำหรับผู้ที่ต้องการเพียงเอกสารตั๋วเครื่องบินเท่านั้น',
    price: 1000,
    currency: 'THB',
    features: [
      { name: 'ตั๋วเครื่องบิน', isAvailable: true },
      { name: 'จัดส่งภายใน 48 ชม.', isAvailable: true },
      { name: 'แก้ไขฟรี 1 ครั้ง', isAvailable: true },
      { name: 'เอกสารโรงแรม', isAvailable: false },
    ],
    linkHref: '/flight-doc-preview',
    buttonText: 'เริ่มต้น ฿1,000',
  },
  {
    id: 2,
    title: 'Hotel Booking',
    description: 'เอกสารการจองโรงแรมที่น่าเชื่อถือสำหรับการยื่นวีซ่า',
    price: 1300,
    currency: 'THB',
    features: [
      { name: 'การจองโรงแรม', isAvailable: true },
      { name: 'จัดส่งภายใน 48 ชม.', isAvailable: true },
      { name: 'แก้ไขฟรี 1 ครั้ง', isAvailable: true },
      { name: 'ตั๋วเครื่องบิน', isAvailable: false },
    ],
    linkHref: '/hotel-doc-preview',
    buttonText: 'เริ่มต้น ฿1,300',
  },
  {
    id: 3,
    title: 'Visa Premium Package',
    description: 'แพ็กเกจ Flight + Hotel ที่ครบถ้วนและคุ้มค่าที่สุดสำหรับการยื่นวีซ่า',
    price: 2300,
    currency: 'THB',
    features: [
      { name: 'ตั๋วเครื่องบิน', isAvailable: true },
      { name: 'การจองโรงแรม', isAvailable: true },
      { name: 'จัดส่งภายใน 48 ชม.', isAvailable: true },
      { name: 'แก้ไขฟรี 3 ครั้ง', isAvailable: true },
    ],
    linkHref: '/dual-package-preview',
    buttonText: 'เลือกแพ็กเกจ ฿2,300',
    isRecommended: true,
  },
  {
    id: 4,
    title: 'Cover Letter',
    description: 'จดหมายรับรองการเดินทางเพื่อประกอบการยื่นวีซ่า',
    price: 350,
    currency: 'THB',
    features: [
      { name: 'จดหมายรับรองการเดินทาง', isAvailable: true },
      { name: 'จัดส่งภายใน 24 ชม.', isAvailable: true },
      { name: 'แก้ไขฟรี 1 ครั้ง', isAvailable: true },
    ],
    linkHref: '/letter-service',
    buttonText: 'เริ่มต้น ฿350',
  },
];

/* =============================
   Page Component
============================= */
const PricingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Page Header */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            ราคาและแพ็กเกจ
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            เลือกแผนที่เหมาะกับความต้องการในการยื่นวีซ่าของคุณ
            ทุกแพ็กเกจเน้นความถูกต้องและน่าเชื่อถือ
          </p>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            {pricingData.map((plan) => (
              <PricingCard
                key={plan.id}
                title={plan.title}
                description={plan.description}
                price={plan.price}
                currency={plan.currency}
                features={plan.features}
                linkHref={plan.linkHref}
                buttonText={plan.buttonText}
                isRecommended={plan.isRecommended}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PricingPage;