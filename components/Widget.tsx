// components/Widget.tsx
'use client';

import { useState } from 'react';
import { Plane, Facebook, Mail, MessageSquare } from 'lucide-react';

export default function Widget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle contact widget"
        className="w-14 h-14 flex items-center justify-center rounded-full bg-brand-green text-white shadow-lg hover:bg-emerald-700 transition-transform duration-200 focus-visible:ring-2 focus-visible:ring-brand-gold"
      >
        <Plane className="w-6 h-6" />
      </button>

      {/* Expandable Menu */}
      <div
        className={`mt-4 space-y-3 flex flex-col items-end transition-all duration-300 transform ${
          open
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
        }`}
      >
        <a
          href="https://www.facebook.com/profile.php?id=61584701997780"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center px-4 py-2 rounded-lg bg-white shadow-md text-gray-700 hover:text-brand-green transition-colors"
        >
          <Facebook className="w-5 h-5 mr-2 text-blue-600" />
          Facebook
        </a>

        <a
          href="https://lin.ee/UKkHyTL"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center px-4 py-2 rounded-lg bg-white shadow-md text-gray-700 hover:text-brand-green transition-colors"
        >
          <MessageSquare className="w-5 h-5 mr-2 text-green-500" />
          Line <span className="ml-1 text-sm text-gray-500">@722zmmxy</span>
        </a>

        <a
          href="mailto:support@visaready.com"
          className="flex items-center px-4 py-2 rounded-lg bg-white shadow-md text-gray-700 hover:text-brand-green transition-colors"
        >
          <Mail className="w-5 h-5 mr-2 text-red-500" />
          Email Support
        </a>

        <a
          href="/services"
          className="flex items-center px-4 py-2 rounded-lg bg-brand-green text-white shadow-md hover:bg-emerald-700 transition-colors font-semibold"
        >
          🚀 สร้างเอกสารทันที
        </a>
      </div>
    </div>
  );
}