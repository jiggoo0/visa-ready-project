// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import Widget from '@/components/Widget'; // ✅ Widget แสดงทุกหน้า

/* =============================
   Font
============================= */
const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // ✅ ปรับให้โหลดเร็วขึ้น
});

/* =============================
   Metadata (SEO)
============================= */
export const metadata: Metadata = {
  title: {
    default: 'Visa-Ready: เอกสารวีซ่าพร้อมยื่น | Flight & Hotel Itinerary',
    template: '%s | Visa-Ready',
  },
  description:
    'สร้างตั๋วเครื่องบินและโรงแรมสำหรับการยื่นวีซ่าเชงเก้น ญี่ปุ่น สหรัฐอเมริกา และประเทศอื่น ๆ ได้อย่างรวดเร็ว แม่นยำ และน่าเชื่อถือ',
  keywords: [
    'วีซ่า',
    'เชงเก้น',
    'ตั๋วเครื่องบิน',
    'จองโรงแรม',
    'Visa application documents',
    'Itinerary',
  ],
  openGraph: {
    title: 'Visa-Ready: เอกสารวีซ่าพร้อมยื่น',
    description: 'สร้างเอกสารสำหรับการยื่นวีซ่าที่เชื่อถือได้',
    url: 'https://visa-ready-docs.vercel.app/', // TODO: เปลี่ยนเป็น URL จริง
    siteName: 'Visa-Ready',
    locale: 'th_TH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visa-Ready: เอกสารวีซ่าพร้อมยื่น',
    description: 'สร้างเอกสารสำหรับการยื่นวีซ่าที่เชื่อถือได้',
    site: '@VisaReady', // TODO: เพิ่ม Twitter handle จริง
  },
};

/* =============================
   Root Layout
============================= */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th" className="scroll-smooth">
      <body
        className={`${inter.className} antialiased text-gray-800 bg-gray-50 min-h-screen flex flex-col`}
      >
        {/* ✅ เนื้อหาของแต่ละหน้า */}
        <main className="flex-grow">{children}</main>

        {/* ✅ Widget แสดงทุกหน้า */}
        <Widget />
      </body>
    </html>
  );
}