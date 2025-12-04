// components/PricingCard.tsx
import React from 'react';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

interface PricingCardProps {
  title: string;
  description: string;
  price: number;
  currency?: 'THB' | 'USD' | 'EUR';
  features: string[];
  linkHref?: string;
  buttonText: string;
  isRecommended?: boolean;
}

const formatPrice = (price: number, currency: string) => {
  switch (currency) {
    case 'USD':
      return `$${price}`;
    case 'EUR':
      return `€${price}`;
    case 'THB':
    default:
      return `฿${price}`;
  }
};

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  description,
  price,
  currency = 'THB',
  features,
  linkHref,
  buttonText,
  isRecommended = false,
}) => {
  const effectiveLinkHref = linkHref || '/checkout';

  return (
    <Link
      href={effectiveLinkHref}
      className={`
        relative block h-full p-6 md:p-8 rounded-xl shadow-md transition-transform duration-200
        hover:scale-[1.02]
        ${isRecommended
          ? 'bg-gradient-to-br from-emerald-50 to-white border-2 border-brand-green'
          : 'bg-white border border-gray-200 hover:border-brand-green'}
      `}
    >
      {/* Recommended Badge */}
      {isRecommended && (
        <span className="absolute top-4 right-4 px-3 py-1 text-xs font-semibold bg-brand-green text-white rounded-md shadow-sm">
          ⭐ แนะนำ
        </span>
      )}

      {/* Title & Description */}
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="mb-6 text-sm text-gray-600 leading-relaxed">{description}</p>

      {/* Price */}
      <div className="mb-6 border-b pb-4 border-gray-200">
        <span className="text-5xl font-extrabold text-brand-green tracking-tight">
          {formatPrice(price, currency)}
        </span>
        <span className="text-base font-medium ml-2 text-gray-500">/ เอกสาร</span>
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="w-5 h-5 flex-shrink-0 mr-2 text-brand-green" />
            <span className="text-sm text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <div
        className={`
          w-full text-center px-6 py-3 border text-base font-semibold rounded-lg shadow-sm transition-colors duration-200
          ${isRecommended
            ? 'bg-brand-green text-white border-brand-green hover:bg-emerald-700'
            : 'bg-white text-brand-green border-brand-green hover:bg-brand-green hover:text-white'}
        `}
      >
        {buttonText}
      </div>
    </Link>
  );
};

export default PricingCard;