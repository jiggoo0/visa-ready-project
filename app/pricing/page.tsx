// app/pricing/page.tsx
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PricingCard from '@/components/PricingCard';

interface FeatureItem {
  name: string;
  isAvailable: boolean;
}

interface PricingPlan {
  title: string;
  description: string;
  price: number;
  currency?: 'THB' | 'USD' | 'EUR';
  features: FeatureItem[];
  linkHref: string;
  buttonText: string;
  isRecommended?: boolean;
}

const pricingData: PricingPlan[] = [
  {
    title: "Flight Starter",
    description: "สำหรับผู้ที่ต้องการเพียงเอกสารตั๋วเครื่องบินเท่านั้น",
    price: 299,
    currency: "THB",
    features: [
      { name: "ตั๋วเครื่องบิน", isAvailable: true },
      { name: "จัดส่งภายใน 24 ชม.", isAvailable: true },
      { name: "แก้ไขฟรี 1 ครั้ง", isAvailable: true },
      { name: "ไม่รวมเอกสารโรงแรม", isAvailable: false },
    ],
    linkHref: "/flight-doc-preview",
    buttonText: "เริ่มต้น ฿299",
  },
  {
    title: "Visa Premium Package",
    description: "แพ็กเกจ Flight + Hotel ที่ครบถ้วนและคุ้มค่าที่สุดสำหรับการยื่นวีซ่า",
    price: 499,
    currency: "THB",
    features: [
      { name: "ตั๋วเครื่องบิน", isAvailable: true },
      { name: "การจองโรงแรม", isAvailable: true },
      { name: "จัดส่งภายใน 12 ชม.", isAvailable: true },
      { name: "แก้ไขฟรี 3 ครั้ง", isAvailable: true },
    ],
    linkHref: "/visa-doc-preview",
    buttonText: "เลือกแพ็กเกจ ฿499",
    isRecommended: true,
  },
];

const PricingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            ราคาและแพ็กเกจ
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            เลือกแผนที่เหมาะกับความต้องการในการยื่นวีซ่าของคุณ ทุกแพ็กเกจเน้นความถูกต้องและน่าเชื่อถือ
          </p>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
            {pricingData.map((plan, index) => (
              <PricingCard
                key={index}
                title={plan.title}
                description={plan.description}
                price={plan.price}
                currency={plan.currency}
                features={plan.features.map(f => f.name)} // ✅ ปรับ PricingCard ให้รองรับ FeatureItem[] จะดีกว่า
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