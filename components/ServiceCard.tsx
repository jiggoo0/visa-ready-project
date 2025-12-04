'use client';

import React, { type ForwardRefExoticComponent, type RefAttributes } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Zap,
  Tag,
  type LucideProps,
} from 'lucide-react';
import { getCheckoutLink } from '@/utils/getCheckoutLink';

/* =============================
   Types
============================= */
type LucideIconType = ForwardRefExoticComponent<
  Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
>;

interface PriceOptions {
  normal: string;
  promo?: string;
  urgent?: string;
}

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIconType;
  linkHref: string; 
  priceText: string | PriceOptions;
  isPopular?: boolean;
}

/* =============================
   Component
============================= */
const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon: Icon,
  linkHref,
  priceText,
  isPopular = false,
}) => {
  const effectiveLinkHref = getCheckoutLink(linkHref);

  const primaryGreen = 'text-emerald-600';
  const primaryGreenBg = 'bg-emerald-600';
  const primaryGreenBorder = 'border-emerald-600';

  const hasPromo =
    typeof priceText === 'object' && (priceText as PriceOptions).promo !== undefined;
  const hasUrgent =
    typeof priceText === 'object' && (priceText as PriceOptions).urgent !== undefined;

  return (
    <Link
      href={effectiveLinkHref}
      className={`
        group relative block h-full p-6 md:p-8 rounded-xl transition-all duration-300
        shadow-lg hover:shadow-2xl hover:scale-[1.03] transform
        ${isPopular
          ? `bg-gradient-to-br from-emerald-50 to-white border-4 ${primaryGreenBorder}`
          : 'bg-white border border-gray-200 hover:border-gray-400'}
      `}
    >
      {/* Popular Badge */}
      {isPopular && (
        <span
          className={`absolute top-4 right-4 px-3 py-1 text-xs font-bold ${primaryGreenBg} text-white rounded-full shadow-md transform rotate-2`}
        >
          ⭐ แนะนำยอดนิยม
        </span>
      )}

      {/* Urgent Badge */}
      {hasUrgent && (
        <span className="absolute top-4 left-4 flex items-center px-3 py-1 text-xs font-bold bg-red-600 text-white rounded-full shadow-md">
          <Zap className="w-3 h-3 mr-1" /> เร่งด่วน
        </span>
      )}

      {/* Icon and Title */}
      <div className="flex items-start mb-6">
        <div className="p-4 rounded-full bg-emerald-100 shadow-inner">
          <Icon className={`w-8 h-8 ${primaryGreen}`} />
        </div>
        <div className="ml-4 pt-1">
          <h3 className="text-xl md:text-2xl font-extrabold text-gray-900">{title}</h3>
        </div>
      </div>

      {/* Description */}
      <p className="mb-6 text-base text-gray-600 leading-relaxed min-h-[50px]">{description}</p>

      {/* Price and Action */}
      <div className="pt-4 border-t border-gray-200 space-y-3">
        {typeof priceText === 'string' ? (
          <span className={`text-3xl font-extrabold ${primaryGreen}`}>{priceText}</span>
        ) : (
          <>
            <div className="text-2xl font-bold">ราคาเริ่มต้น:</div>

            <div className="flex justify-between items-center text-lg font-semibold text-gray-700">
              <span>ปกติ:</span>
              <span className={primaryGreen}>{(priceText as PriceOptions).normal}</span>
            </div>

            {hasPromo && (
              <div className="flex justify-between items-center text-lg font-semibold text-gray-700">
                <span className="flex items-center text-emerald-700">
                  <Tag className="w-4 h-4 mr-2" />
                  โปรโมชั่น:
                </span>
                <span className="text-emerald-700 font-extrabold">{(priceText as PriceOptions).promo}</span>
              </div>
            )}

            {hasUrgent && (
              <div className="flex justify-between items-center text-lg font-semibold text-gray-700">
                <span className="text-red-600">เร่งด่วน:</span>
                <span className="text-red-600 font-extrabold">{(priceText as PriceOptions).urgent}</span>
              </div>
            )}
          </>
        )}

        {/* Action Link */}
        <div className={`flex items-center ${primaryGreen} font-bold mt-4 pt-2 group-hover:underline`}>
          ดำเนินการสั่งซื้อ
          <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;