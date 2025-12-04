import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

// โหลด Font Inter
const inter = Inter({ subsets: ['latin'] });

// กำหนด Metadata สำหรับ SEO
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
    url: 'https://visaready.com', // TODO: เปลี่ยนเป็น URL จริง
    siteName: 'Visa-Ready',
    locale: 'th_TH',
    type: 'website',
  },
};

// Root Layout Component
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th" className="scroll-smooth">
      <body className={`${inter.className} antialiased text-gray-800`}>
        {/* เนื้อหาของแต่ละหน้า Page จะถูก Render ภายใน Body */}
        {children}
      </body>
    </html>
  );
}