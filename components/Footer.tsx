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
              href="https://www.facebook.com/profile.php?id=61584701997780"
              target="_blank"
              rel="noopener noreferrer"
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
            <a
              href="https://lin.ee/UKkHyTL"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Line Office"
              className="text-gray-400 hover:text-brand-green transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-brand-green rounded flex items-center"
            >
              {/* Line Icon SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-6 h-6"
                fill="currentColor"
              >
                <path d="M256 0C114.84 0 0 104.98 0 234.67c0 65.96 34.47 124.44 89.28 165.43V512l95.55-52.56c24.78 6.81 51.06 10.22 78.17 10.22 141.16 0 256-104.98 256-234.67S397.16 0 256 0zm69.92 314.36c-4.63 13.91-21.94 24.42-45.32 28.56-11.05 2.01-21.5 3.03-31.54 3.03-18.85 0-32.06-3.73-38.61-11.18-6.07-6.86-7.54-16.09-4.36-27.84 2.88-10.87 10.34-22.36 22.86-34.44 15.27-15.09 25.92-25.77 31.42-32.03 3.55-3.97 5.03-6.8 4.42-8.51-.73-2.07-3.04-3.12-6.84-3.12-4.95 0-14.42 2.05-27.39 6.14-12.81 4.02-33.85 11.18-63.5 21.49l-10.87-13.36c28.69-10.37 49.3-17.99 61.14-22.88 22.34-7.48 39.37-11.19 50.73-11.19 24.45 0 36.67 10.57 36.67 31.63 0 6.92-2.05 14.58-6.1 23.87-2.82 6.81-13.38 18.48-31.66 34.97-14.23 13.08-22.59 23.35-25.07 30.84-1.43 4.17-.73 7.38 2.08 9.62 2.41 2.03 6.17 3.03 11.27 3.03 7.53 0 20.12-2.41 37.63-7.23 17.06-4.61 40.42-11.18 70.06-19.7l10.93 13.45c-27.27 8.42-49.48 15.05-66.06 19.86-13.13 3.78-23.49 5.67-31.05 5.67-9.87.01-16.63-2.65-20.34-7.89z" />
              </svg>
            </a>
          </address>
        </div>
      </div>
    </footer>
  );
}