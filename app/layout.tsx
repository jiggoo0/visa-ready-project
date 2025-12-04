import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import Widget from '@/components/Widget'; // ✅ Widget แสดงทุกหน้า

/* =============================
   Font
============================= */
const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // ปรับให้โหลดเร็วขึ้น
});

/* =============================
   Metadata (SEO)
============================= */
export const metadata: Metadata = {
  // Title Template สำหรับหน้าย่อย
  title: {
    default: 'Visa-Ready: เอกสารวีซ่าพร้อมยื่น | Flight & Hotel Itinerary Generator',
    template: '%s | Visa-Ready',
  },
  // คำอธิบาย
  description:
    'สร้างตั๋วเครื่องบินและโรงแรมสำหรับการยื่นวีซ่าเชงเก้น ญี่ปุ่น สหรัฐอเมริกา และประเทศอื่น ๆ ได้อย่างรวดเร็ว แม่นยำ และน่าเชื่อถือ',
  // Keywords
  keywords: [
    'วีซ่า',
    'เชงเก้น',
    'ตั๋วเครื่องบินปลอม',
    'จองโรงแรมปลอม',
    'Visa application documents',
    'Flight Itinerary',
    'Hotel Itinerary',
    'เอกสารยื่นวีซ่า',
  ],
  // Open Graph (สำหรับ Social Media Sharing)
  openGraph: {
    title: 'Visa-Ready: เอกสารวีซ่าพร้อมยื่น',
    description: 'สร้างเอกสารสำหรับการยื่นวีซ่าที่เชื่อถือได้',
    url: 'https://visa-ready-docs.vercel.app/',
    siteName: 'Visa-Ready Docs',
    locale: 'th_TH',
    type: 'website',
  },
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Visa-Ready: เอกสารวีซ่าพร้อมยื่น',
    description: 'สร้างเอกสารสำหรับการยื่นวีซ่าที่เชื่อถือได้',
    // site: '@VisaReady', // หากมี Twitter handle จริงให้ใส่
  },
};

/* =============================
   Root Layout Component
============================= */
/**
 * RootLayout: โครงสร้างหลักของแอปพลิเคชัน (HTML, Body, Font, Metadata)
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // กำหนดภาษาหลักเป็นไทย
    <html lang="th" className="scroll-smooth">
      <body
        // ใช้ font และกำหนดค่า CSS พื้นฐาน
        className={`${inter.className} antialiased text-gray-800 bg-gray-50 min-h-screen flex flex-col`}
      >
        {/* เนื้อหาของแต่ละหน้า (Page) */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Widget ที่ต้องการให้แสดงบนทุกหน้า เช่น Chat Widget */}
        <Widget />
      </body>
    </html>
  );
}

