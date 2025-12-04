// components/ServiceCard.tsx
import React from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, Tag, type LucideProps } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

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
  /** รองรับทั้งราคาเดียว หรือหลายระดับ */
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
  const effectiveLinkHref = linkHref || '/services';

  if (!linkHref) {
    console.warn(
      `ServiceCard Warning: Missing 'linkHref' for card "${title}". Using fallback '/services'.`
    );
  }

  const hasPromo =
    typeof priceText === 'object' && (priceText as PriceOptions).promo !== undefined;
  const hasUrgent =
    typeof priceText === 'object' && (priceText as PriceOptions).urgent !== undefined;

  return (
    <Link
      href={effectiveLinkHref}
      className={`
        group relative block h-full p-6 md:p-8 rounded-lg shadow-md transition-transform duration-200
        hover:scale-[1.02]
        ${isPopular
          ? 'bg-gradient-to-br from-emerald-50 to-white border-2 border-brand-green'
          : 'bg-white border border-gray-200 hover:border-brand-green'}
      `}
    >
      {/* Popular Badge */}
      {isPopular && (
        <span className="absolute top-4 right-4 px-3 py-1 text-xs font-semibold bg-brand-green text-white rounded-md shadow-sm">
          ⭐ แนะนำ
        </span>
      )}

      {/* Urgent Badge */}
      {hasUrgent && (
        <span className="absolute top-4 left-4 flex items-center px-2 py-1 text-xs font-semibold bg-red-500 text-white rounded-md shadow-sm">
          <Zap className="w-3 h-3 mr-1" /> เร่งด่วน
        </span>
      )}

      {/* Icon and Title */}
      <div className="flex items-start mb-6">
        <div className="p-3 rounded-md bg-gray-100 shadow-sm">
          <Icon className="w-7 h-7 text-brand-green" />
        </div>
        <div className="ml-4">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900">{title}</h3>
        </div>
      </div>

      {/* Description */}
      <p className="mb-6 text-base text-gray-600 leading-relaxed">{description}</p>

      {/* Price and Action */}
      <div className="pt-4 border-t border-gray-200 space-y-2">
        {typeof priceText === 'string' ? (
          <span className="text-xl font-extrabold text-brand-green">{priceText}</span>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-700">
                ปกติ:{' '}
                <span className="text-brand-green">{(priceText as PriceOptions).normal}</span>
              </span>
            </div>
            {hasPromo && (
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-700">
                  โปรโมชั่น:{' '}
                  <span className="text-emerald-600">{(priceText as PriceOptions).promo}</span>
                </span>
                <Tag className="w-4 h-4 text-emerald-600 ml-2" />
              </div>
            )}
            {hasUrgent && (
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-700">
                  เร่งด่วน:{' '}
                  <span className="text-red-600">{(priceText as PriceOptions).urgent}</span>
                </span>
              </div>
            )}
          </>
        )}

        <div className="flex items-center text-brand-green font-semibold mt-3">
          เริ่มต้นใช้งาน
          <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;