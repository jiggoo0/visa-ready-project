// components/Footer.tsx
import Link from 'next/link';
import { Plane, Facebook, Twitter, Instagram } from 'lucide-react';

const footerLinks = [
  {
    title: 'บริการของเรา',
    links: [
      { label: 'สร้างตั๋วเครื่องบินสำหรับยื่นวีซ่า', href: '/services#flight' },
      { label: 'สร้างการจองโรงแรมสำหรับยื่นวีซ่า', href: '/services#hotel' },
      { label: 'แพ็กเกจคู่', href: '/pricing' },
      { label: 'ตัวอย่างเอกสาร (PDF)', href: '/samples' },
    ],
  },
  {
    title: 'ข้อมูลบริษัท',
    links: [
      { label: 'วิธีการทำงาน', href: '/how-to' },
      { label: 'ราคาสินค้า', href: '/pricing' },
      { label: 'คำถามที่พบบ่อย (FAQ)', href: '/faq' },
      { label: 'ติดต่อเรา', href: '/contact' },
    ],
  },
  {
    title: 'ความช่วยเหลือ',
    links: [
      { label: 'ข้อกำหนดและเงื่อนไข', href: '/terms' },
      { label: 'นโยบายความเป็นส่วนตัว', href: '/privacy' },
      { label: 'แจ้งปัญหา', href: '/contact' },
    ],
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-10 border-b border-gray-700">
          
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <Link
              href="/"
              className="flex items-center space-x-2 text-2xl font-bold text-brand-green focus-visible:ring-2 focus-visible:ring-brand-gold rounded"
            >
              <Plane className="w-6 h-6 text-brand-gold" />
              <span>VisaReady Docs</span>
            </Link>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              เราช่วยคุณสร้างเอกสารสำหรับการยื่นวีซ่าที่ได้มาตรฐาน รวดเร็ว และเป็นส่วนตัว
            </p>
          </div>

          {/* Link Columns */}
          {footerLinks.map((section) => (
            <nav key={section.title} className="col-span-1">
              <h4 className="text-base font-semibold text-white mb-4 border-b border-brand-gold/50 pb-1">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-gray-400 hover:text-brand-green text-sm transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-brand-green rounded"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="py-6 border-b border-gray-700">
          <h5 className="text-sm font-bold text-brand-gold mb-2">
            ⚠️ ข้อจำกัดความรับผิดชอบที่สำคัญ:
          </h5>
          <p className="text-xs text-gray-400 leading-relaxed">
            เอกสารจาก VisaReady Docs ใช้สำหรับการยื่นคำร้องขอวีซ่าเท่านั้น
            ไม่สามารถใช้แทนตั๋วเครื่องบินหรือการจองโรงแรมจริงได้
            และห้ามนำไปใช้เพื่อการเดินทางจริงโดยเด็ดขาด
            ทุกเอกสารจะมี Watermark "FOR VISA ONLY - NOT A REAL BOOKING" อยู่เสมอ
          </p>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center py-6">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            &copy; {currentYear} VisaReady Docs. All rights reserved.
          </p>
          <address className="flex space-x-4 not-italic">
            <a
              href="#"
              aria-label="Facebook"
              className="text-gray-400 hover:text-brand-green transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-brand-green rounded"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="text-gray-400 hover:text-brand-green transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-brand-green rounded"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-gray-400 hover:text-brand-green transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-brand-green rounded"
            >
              <Instagram className="w-6 h-6" />
            </a>
          </address>
        </div>
      </div>
    </footer>
  );
}