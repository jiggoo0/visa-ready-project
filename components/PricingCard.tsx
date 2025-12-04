'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';

/* =============================
   Types
============================= */
interface FeatureItem {
  name: string;
  isAvailable: boolean;
}

interface PricingCardProps {
  title: string;
  description: string;
  price: number;
  currency?: 'THB' | 'USD' | 'EUR';
  features: FeatureItem[];
  /** 💡 แก้ไข: linkHref ในที่นี้ควรส่งค่า Plan ID (เช่น 'flight', 'bundle') เพื่อใช้สร้างลิงก์ Customization */
  linkHref: string; 
  buttonText: string;
  isRecommended?: boolean;
}

/* =============================
   Helper
============================= */
/**
 * ฟังก์ชันช่วยจัดรูปแบบราคาตามสกุลเงินที่กำหนด
 */
const formatPrice = (price: number, currency: string) => {
  const formattedPrice = price.toLocaleString('th-TH'); // ใช้การจัดรูปแบบท้องถิ่นสำหรับตัวเลข

  switch (currency) {
    case 'USD':
      return `$${formattedPrice}`;
    case 'EUR':
      return `€${formattedPrice}`;
    case 'THB':
    default:
      // แสดงผลเป็น THB โดยใช้สัญลักษณ์ บาทไทย
      return `${formattedPrice} ฿`; 
  }
};

/**
 * 💡 Logic ใหม่: ค้นหาคำหลักของ Plan ID ภายใน String ที่ส่งเข้ามา
 * @param input Plan ID หรือ Path ที่ส่งมาจาก Component แม่
 * @returns Plan ID ที่ถูก Normalize แล้ว (เช่น 'flight', 'hotel', 'bundle') หรือ null
 */
const normalizePlanId = (input: string): 'flight' | 'hotel' | 'bundle' | null => {
    const normalized = input.toLowerCase().trim();

    // ตรวจสอบคำหลักตามลำดับ
    if (normalized.includes('flight')) return 'flight';
    if (normalized.includes('hotel') || normalized.includes('visa')) return 'hotel';
    // การแก้ไขสำหรับ Dual Package
    if (normalized.includes('dual-package') || normalized.includes('bundle')) return 'bundle';

    return null;
};

/**
 * สร้างลิงก์สำหรับหน้า Customization โดยใช้ Plan ID 
 * (เส้นทางใหม่: ไปหน้าปรับแต่งเอกสารแทนหน้าชำระเงินโดยตรง)
 * @param planIdentifier ID ของ Plan ที่ต้องการสั่งซื้อ (เช่น 'flight', 'hotel') หรือ Path เก่า (เช่น /flight-doc-preview)
 * @returns ลิงก์ที่ถูกต้องสำหรับหน้า Customization (เช่น /flight-checkout)
 */
const getCheckoutLink = (planIdentifier: string): string => {
    if (!planIdentifier) return '/pricing'; // Fallback link
    
    const normalizedId = normalizePlanId(planIdentifier);

    // ใช้ ID ที่ถูก Normalize แล้วในการกำหนดเส้นทาง
    switch (normalizedId) {
        case 'flight':
            return '/flight-checkout'; // หน้าปรับแต่งเอกสารเที่ยวบิน
        case 'hotel':
            return '/hotel-checkout';  // หน้าปรับแต่งเอกสารโรงแรม
        case 'bundle':
            return '/dual-package-preview'; // หน้าปรับแต่งแพ็กเกจคู่
        default:
            // Fallback สำหรับกรณีที่ไม่ตรงกับ Plan ใด
            console.error(`Unknown plan identifier: ${planIdentifier}. Falling back to /pricing.`);
            return '/pricing'; 
    }
};


/* =============================
   Component
============================= */
const PricingCard: React.FC<PricingCardProps> = ({
  title,
  description,
  price,
  currency = 'THB',
  features,
  linkHref, // ถูกใช้เป็น Plan ID
  buttonText,
  isRecommended = false,
}) => {
  
  // 💡 การแก้ไขหลัก: สร้างลิงก์ไปยังหน้า Customization ด้วย Plan ID ที่ส่งมา
  const effectiveLinkHref = getCheckoutLink(linkHref);
  
  // กำหนดสีหลักสำหรับ Tailwind CSS
  const primaryGreen = 'text-emerald-600';
  const primaryGreenBg = 'bg-emerald-600';
  const primaryGreenBorder = 'border-emerald-600';
  const accentGold = 'text-yellow-500';

  return (
    <Link
      href={effectiveLinkHref}
      className={`
        relative block h-full p-6 md:p-10 rounded-2xl transition-all duration-300
        shadow-xl hover:shadow-2xl hover:scale-[1.03] transform
        flex flex-col justify-between
        ${isRecommended
          ? `bg-gradient-to-br from-emerald-50 to-white border-4 ${primaryGreenBorder}`
          : 'bg-white border border-gray-200 hover:border-gray-400'}
      `}
    >
      {/* Recommended Badge */}
      {isRecommended && (
        <span 
          className={`absolute top-4 right-4 px-3 py-1 text-xs font-bold ${primaryGreenBg} text-white rounded-full shadow-md transform rotate-2`}
        >
          🏆 แนะนำสูงสุด
        </span>
      )}

      <div>
        {/* Title & Description */}
        <h3 className="text-3xl font-extrabold text-gray-900 mb-2">{title}</h3>
        <p className="mb-6 text-base text-gray-600 leading-relaxed min-h-[40px]">{description}</p>

        {/* Price */}
        <div className="mb-8 border-b pb-4 border-gray-200">
          <span className={`text-6xl font-extrabold ${primaryGreen} tracking-tight`}>
            {formatPrice(price, currency)}
          </span>
          <span className="text-lg font-medium ml-2 text-gray-500">/ เอกสาร</span>
        </div>

        {/* Features */}
        <ul className="space-y-4 mb-10 text-left">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              {feature.isAvailable ? (
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 mr-3 text-emerald-500" />
              ) : (
                <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5 mr-3 text-red-400" />
              )}
              <span
                className={`text-base font-medium ${
                  feature.isAvailable ? 'text-gray-800' : 'text-gray-400 line-through'
                }`}
              >
                {feature.name}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      <div
        className={`
          w-full text-center px-6 py-4 border text-lg font-bold rounded-xl shadow-lg transition-colors duration-200 transform group-hover:shadow-2xl
          flex items-center justify-center
          ${isRecommended
            ? `${primaryGreenBg} text-white border-transparent hover:bg-emerald-700`
            : `bg-white ${primaryGreen} border ${primaryGreenBorder} hover:${primaryGreenBg} hover:text-white`}
        `}
      >
        {buttonText}
        <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </Link>
  );
};

export default PricingCard;

