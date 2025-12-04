// data/servicesData.ts
import { Plane, Hotel, PlaneTakeoff, BookOpenCheck } from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/* =============================
   Types
============================= */
export type LucideIconType = ForwardRefExoticComponent<
  Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
>;

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: LucideIconType;
  linkHref: string;
  priceText: string | { normal: string; promo?: string; urgent?: string };
  isPopular: boolean;
}

/* =============================
   Services Data
============================= */
export const servicesData: ServiceItem[] = [
  {
    id: 1,
    title: 'ตั๋วเครื่องบิน (Flight Itinerary)',
    description:
      'สร้างเอกสารยืนยันการเดินทางสำหรับการยื่นวีซ่าเชงเก้น วีซ่าญี่ปุ่น หรือประเทศอื่น ๆ ที่ต้องการหลักฐานการบิน',
    icon: Plane,
    linkHref: '/flight-doc-preview',
    priceText: {
      normal: '฿ 1,000 (48 ชม.)',
      promo: '฿ 799',
      urgent: '฿ 1,800 (2 ชม.)',
    },
    isPopular: true,
  },
  {
    id: 2,
    title: 'การจองโรงแรม (Hotel Booking)',
    description:
      'สร้างเอกสารการจองที่พักที่น่าเชื่อถือสำหรับการเดินทาง โดยไม่จำเป็นต้องชำระเงินจริง',
    icon: Hotel,
    linkHref: '/hotel-doc-preview',
    priceText: {
      normal: '฿ 1,300 (48 ชม.)',
      promo: '฿ 999',
      urgent: '฿ 2,000 (2 ชม.)',
    },
    isPopular: false,
  },
  {
    id: 3,
    title: 'แพ็กเกจ Flight + Hotel (Dual Package)',
    description:
      'ประหยัดกว่า! รับทั้งตั๋วเครื่องบินและการจองโรงแรมในราคารวม เหมาะสำหรับการยื่นวีซ่าเชงเก้น',
    icon: PlaneTakeoff,
    linkHref: '/dual-package-preview',
    priceText: {
      normal: '฿ 2,300',
      promo: '฿ 1,899',
      urgent: '฿ 3,999',
    },
    isPopular: true,
  },
  {
    id: 4,
    title: 'จดหมายรับรองการเดินทาง (Cover Letter)',
    description:
      'สร้างจดหมายแนะนำตัวและรายละเอียดการเดินทางอย่างเป็นทางการ เพื่อยื่นประกอบเอกสารวีซ่า',
    icon: BookOpenCheck,
    linkHref: '/letter-service',
    priceText: '฿ 350',
    isPopular: false,
  },
];