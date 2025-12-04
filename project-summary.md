# 📑 Project Summary Report
_Generated on Thu Dec  4 12:27:24 +07 2025_


## ⚙️ Environment Variables
⚠️ `.env` not found. Cannot include environment context.

## 📁 Folder Overview (Max Depth: 3)

### app
app
├── checkout
│   └── page.tsx
├── contact
│   └── page.tsx
├── dual-package-preview
│   └── page.tsx
├── faq
│   └── page.tsx
├── flight-doc-preview
│   └── page.tsx
├── globals.css
├── hotel-doc-preview
│   └── page.tsx
├── how-to
│   └── page.tsx
├── layout.tsx
├── letter-service
│   └── page.tsx
├── page.tsx
├── pricing
│   └── page.tsx
├── samples
│   └── page.tsx
├── services
│   └── page.tsx
└── visa-doc-preview
    └── page.tsx

13 directories, 15 files

### components
components
├── About.tsx
├── FAQItem.tsx
├── Footer.tsx
├── Header.tsx
├── Hero.tsx
├── PDFPreview.tsx
├── PricingCard.tsx
├── Review.tsx
└── ServiceCard.tsx

1 directory, 9 files

### lib
lib
├── generateTicket.ts
├── helpers.ts
├── pdfGenerator.ts
└── supabaseClient.ts

1 directory, 4 files

### public
public
├── favicon.ico
└── images

2 directories, 1 file

### scripts
scripts
└── project-summary.sh

1 directory, 1 file

## 👀 Code Preview & Coverage (JS/TS)

### `./app/services/page.tsx`

```js
// app/services/page.tsx
'use client';

import React from 'react';
// ใช้ Absolute Imports สำหรับคอมโพเนนต์
import ServiceCard from '@/components/ServiceCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// นำเข้าไอคอนที่จำเป็นสำหรับบัตรบริการ
import { Plane, Hotel, PlaneTakeoff, BookOpenCheck } from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

// Type สำหรับ Icon Component (LucideIcon)
type LucideIconType = ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;

// ข้อมูลจำลองสำหรับบริการ
interface ServiceItem {
    id: number;
    title: string;
    description: string;
    icon: LucideIconType;
    linkHref: string;
    priceText: string;
    isPopular: boolean;
}

const servicesData: ServiceItem[] = [
    {

```


### `./app/samples/page.tsx`

```js
'use client';

import React from 'react';
import Link from 'next/link';
import { Plane, Building2, CheckCircle2, FileText, Download } from 'lucide-react';
// 💡 เพิ่มการ Import Header และ Footer
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// ตัวอย่างข้อมูลเอกสารแสดงในหน้า Samples
const SampleData = [
  {
    type: 'ตั๋วเครื่องบินจำลอง',
    description:
      'ตัวอย่างไฟล์ PDF แสดงการจองเที่ยวบิน (Flight Itinerary) เพื่อยื่นวีซ่าเชงเก้นหรือประเทศอื่น ๆ',
    icon: Plane,
    link: '/flight-doc-preview',
    isNew: true
  },
  {
    type: 'เอกสารโรงแรมจำลอง',
    description:
      'ตัวอย่างเอกสารยืนยันการจองที่พัก (Hotel Booking) แสดงชื่อผู้สมัครและช่วงวันเข้าพัก',
    icon: Building2,
    link: '/visa-doc-preview',
    isNew: false
  },
  {
    type: 'แพ็กเกจคู่ (ตั๋ว+โรงแรม)',
    description: 'ตัวอย่างเอกสารชุดสมบูรณ์ที่พร้อมยื่นในรูปแบบ PDF ที่รัดกุม',

```


### `./app/how-to/page.tsx`

```js
'use client';

import React from 'react';
// 💡 แก้ไข: เพิ่มการ Import Link จาก next/link
import Link from 'next/link'; 
import { FileText, Check, Lightbulb, Clock, Download } from 'lucide-react';

// 💡 เพิ่มการ Import Header และ Footer
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// ใช้ typeof จาก Component เพื่อนิยาม Type ของ Icon
type LucideIconType = typeof FileText;

interface Step {
    icon: LucideIconType;
    title: string;
    description: string;
}

const STEPS: Step[] = [
    {
        icon: Lightbulb,
        title: '1. เตรียมข้อมูลพื้นฐาน (Initial Data Prep)',
        description:
            'รวบรวมข้อมูลสำคัญ เช่น ชื่อ-นามสกุลผู้เดินทาง วันที่เดินทางไป-กลับ เมืองต้นทางและปลายทาง (สำหรับตั๋วเครื่องบิน) และชื่อโรงแรมที่ยืนยันแล้ว (สำหรับเอกสารที่พัก)',
    },
    {
        icon: FileText,
        title: '2. เลือกประเภทเอกสารที่ต้องการ (Select Document Type)',

```


### `./app/pricing/page.tsx`

```js
// app/pricing/page.tsx (อัปเดตเฉพาะส่วนที่เกี่ยวข้อง)
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PricingCard from '@/components/PricingCard';

// ... (Imports และ Types อื่น ๆ)

// 💡 โครงสร้างข้อมูลใหม่ที่สมมติว่าทำให้เกิด Error นี้
interface FeatureItem {
    name: string;
    isAvailable: boolean;
}

interface PricingPlan {
    title: string;
    description: string;
    price: string;
    features: FeatureItem[]; // ใช้ Object Array ตาม Error Message
    linkHref: string;
    buttonText: string;
    isRecommended?: boolean;
}

const pricingData: PricingPlan[] = [
    {
        title: "Flight Starter",
        description: "สำหรับผู้ที่ต้องการเพียงเอกสารตั๋วเครื่องบินจำลองเท่านั้น",
        price: "฿ 299",
        features: [

```


### `./app/faq/page.tsx`

```js
import React from 'react';
import Link from 'next/link';

// 💡 เพิ่มการ Import Header และ Footer
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// 💡 ใช้ Absolute Import สำหรับ FAQItem
import FAQItem from '@/components/FAQItem';

const faqData = [
  {
    question: "เอกสารนี้ใช้ยื่นวีซ่าได้จริงไหม?",
    answer: "เอกสารของเราเป็น 'เอกสารจำลอง' (Mock/Demo Document) ที่ออกแบบมาให้มีรูปแบบคล้ายกับการจองจริง ซึ่งใช้สำหรับแสดงหลักฐานการเดินทางและการเข้าพักตามข้อกำหนดของสถานทูตในการยื่นคำร้องขอวีซ่าเท่านั้น **ไม่รับประกันการอนุมัติวีซ่า** และไม่สามารถใช้เพื่อการเดินทางจริงได้",
  },
  {
    question: "ฉันสามารถใช้เอกสารนี้เดินทางจริงได้หรือไม่?",
    answer: "ไม่ได้! โดยเด็ดขาด เอกสารนี้มี Watermark และข้อความกำกับชัดเจนว่าเป็น 'FOR VISA ONLY - NOT A REAL BOOKING' หากนำไปใช้เพื่อการเดินทางจริงอาจส่งผลให้ถูกปฏิเสธการเดินทางและมีปัญหาทางกฎหมายได้",
  },
  {
    question: "เอกสารรองรับวีซ่าประเทศไหนบ้าง?",
    answer: "เราออกแบบให้เอกสารเป็นไปตามมาตรฐานสากลที่ใช้ได้กับวีซ่าเกือบทุกประเภท เช่น Schengen, UK, US, Canada, Japan และอื่น ๆ โดยหลักการแล้ว สถานทูตส่วนใหญ่ต้องการแค่หลักฐานแสดงแผนการเดินทางเท่านั้น",
  },
  {
    question: "ใช้เวลานานเท่าไหร่ในการสร้างเอกสาร?",
    answer: "หลังจากที่คุณชำระเงินและให้ข้อมูลครบถ้วน ทีมงานของเราจะดำเนินการสร้างและจัดส่งไฟล์ PDF ให้คุณทางอีเมลภายใน **1-2 ชั่วโมง** (ในช่วงเวลาทำการ) หรือไม่เกิน 4 ชั่วโมงในกรณีที่มีคำสั่งซื้อหนาแน่น",
  },
  {
    question: "ถ้าข้อมูลผิดพลาด สามารถแก้ไขได้หรือไม่?",
    answer: "ได้ครับ! ทุกแพ็กเกจมีการรับประกันการแก้ไขข้อมูลฟรีตามจำนวนครั้งที่ระบุในตารางราคา กรุณาตรวจสอบข้อมูลให้ถี่ถ้วนก่อนส่ง เพื่อลดความล่าช้าในการสร้างเอกสาร",

```


### `./app/contact/page.tsx`

```js
// app/contact/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Send, CheckCircle2, AlertTriangle, Phone, MapPin } from 'lucide-react';

// 💡 แก้ไข: ใช้ declare const เพื่อบอกให้ TypeScript รู้จักฟังก์ชัน Global ของ Firebase
// ซึ่งจะช่วยให้ Build Process ผ่านไปได้โดยไม่มี Type Error เรื่อง Module Not Found
declare const initializeApp: (config: any) => any;
declare const getAuth: (app: any) => any;
declare const signInAnonymously: (auth: any) => any;
declare const onAuthStateChanged: (auth: any, callback: (user: any) => void) => void;
declare const getFirestore: (app: any) => any;
declare const collection: (db: any, path: string) => any;
declare const addDoc: (collectionRef: any, data: any) => Promise<void>;
declare const setLogLevel: (level: 'debug' | 'error' | 'silent') => void;

// 💡 Component Imports (Absolute Paths)
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Global variables (mocked/provided by environment)
declare const __app_id: string | undefined;
declare const __firebase_config: string | undefined;
declare const __initial_auth_token: string | undefined;

// --- Firebase Initialization and Submission Logic ---
let db: any;
let auth: any;
let userId: string | null = null;

```


### `./app/layout.tsx`

```js
import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

// กำหนดและโหลด Font Inter
const inter = Inter({ subsets: ['latin'] });

// กำหนด Metadata สำหรับเว็บไซต์ (SEO)
export const metadata: Metadata = {
  title: {
    default: 'Visa-Ready: เอกสารวีซ่าพร้อมยื่น | Flight & Hotel Itinerary',
    template: '%s | Visa-Ready',
  },
  description: 'สร้างตั๋วเครื่องบินและโรงแรมจำลองสำหรับการยื่นวีซ่าเชงเก้น ญี่ปุ่น หรือประเทศอื่น ๆ ได้อย่างรวดเร็ว แม่นยำ และน่าเชื่อถือ',
  keywords: ['วีซ่า', 'เชงเก้น', 'ตั๋วเครื่องบินจำลอง', 'จองโรงแรมจำลอง', 'Visa application documents', 'Itinerary'],
  openGraph: {
    title: 'Visa-Ready: เอกสารวีซ่าพร้อมยื่น',
    description: 'สร้างเอกสารสำหรับการยื่นวีซ่าที่เชื่อถือได้',
    url: 'https://visaready.com', // เปลี่ยนเป็น URL จริง
    siteName: 'Visa-Ready',
    locale: 'th_TH',
    type: 'website',
  },
};

// Root Layout Component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;

```


### `./app/page.tsx`

```js
// app/page.tsx
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import Review from '@/components/Review';
import About from '@/components/About';

import { Plane, Hotel, PlaneTakeoff, type LucideProps } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

// Type สำหรับ Icon Component
type LucideIconType = ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;

// ข้อมูลจำลองสำหรับส่วน Services ในหน้า Homepage
interface ServiceItem {
    id: number;
    title: string;
    description: string;
    icon: LucideIconType;
    linkHref: string; // สำคัญ: ต้องกำหนดค่าที่นี่เพื่อป้องกัน Runtime Error
    priceText: string;
    isPopular: boolean;
}

const homeServicesData: ServiceItem[] = [
    {
        id: 1,
        title: "ตั๋วเครื่องบินจำลอง (Flight Itinerary)",

```


### `./app/checkout/page.tsx`

```js
'use client';

import React, { useState, useEffect, Suspense } from 'react'; // 💡 เพิ่ม Suspense
import { useSearchParams } from 'next/navigation';
import { Plane, Hotel, CheckCircle2, CreditCard, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// ข้อมูลแผนบริการและราคา
const PricingData = {
    flight: { name: 'ตั๋วเครื่องบินเดี่ยว', price: 590, icon: Plane },
    hotel: { name: 'โรงแรมเดี่ยว', price: 490, icon: Hotel },
    bundle: { name: 'แพ็กเกจคู่ (ตั๋ว+โรงแรม)', price: 990, icon: CheckCircle2 },
};

// ข้อมูลสำหรับ Service (ใช้ในกรณีที่ลิงก์มาจาก /services โดยไม่มี plan)
const ServiceData = {
    flight: PricingData.flight,
    hotel: PricingData.hotel,
};

// ประเภทข้อมูลที่ใช้แสดงในหน้าสรุป
interface ItemDetail {
    name: string;
    price: number;
    icon: React.ElementType;
}

// 1. คอมโพเนนต์ที่ใช้ Client Hook (useSearchParams) ซึ่งจะต้องอยู่ภายใน Suspense
function CheckoutLogic() {
    // 🟢 useSearchParams ถูกเรียกภายในคอมโพเนนต์ที่อยู่ภายใต้ Suspense

```


### `./app/visa-doc-preview/page.tsx`

```js
// app/visa-doc-preview/page.tsx
'use client';

import React from 'react';
// 💡 เพิ่มการ Import Header และ Footer
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Interface ยังคงอยู่เพื่อใช้สำหรับการกำหนด Type (Type Checking) ภายใน
interface VisaDocPreviewProps {
  hotelName?: string;
  address?: string;
  phone?: string;
  email?: string;
  vatId?: string;
  bookingRef?: string;
  status?: string;
  guestName?: string;
  passport?: string;
  contact?: string;
  guests?: string;
  bookingDate?: string;
  checkin?: string;
  checkout?: string;
  nights?: string;
  roomType?: string;
  totalPrice?: string;
  paymentStatus?: string;
  cancellationPolicy?: string;
  issuedDate?: string;

```


### `./app/flight-doc-preview/page.tsx`

```js
// app/flight-doc-preview/page.tsx
'use client';

import React from 'react';
// ใช้ Absolute Imports สำหรับคอมโพเนนต์
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Interface definitions ยังคงอยู่เพื่อใช้ในการกำหนด Type ของตัวแปรภายใน
interface FlightInfo {
  flightNumber: string;
  from: string;
  to: string;
  fromAirport?: string;
  toAirport?: string;
  duration?: string;
  date?: string;
  departureTime?: string;
  terminal?: string;
  gate?: string;
  seat?: string;
}

// 💡 แก้ไข: ลบ Type Annotation "FlightDocPreviewProps" ออกจาก Default Export
export default function FlightDocPreviewPage() {
  
  // 💡 ย้ายการกำหนดค่าเริ่มต้นและตัวแปรไปไว้ในฟังก์ชันแทน props
  const passengerName = 'SAITOUR RUNWONGKAN';
  const bookingCode = 'RTZ7B5';
  const status = 'CONFIRMED (For Visa Application)';

```


### `./app/dual-package-preview/page.tsx`

```js
'use client';

import React from 'react';
// 💡 เพิ่มการ Import Header และ Footer
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type FlightDocumentFragmentProps = {
  type: 'outbound' | 'return';
};

const FlightDocumentFragment = ({ type }: FlightDocumentFragmentProps) => {
  const isOutbound = type === 'outbound';
  const mainColor = isOutbound ? 'text-green-700' : 'text-red-700';
  const data = isOutbound
    ? { title: 'ขาไป (Outbound Flight)', flight: 'TG 930', from: 'BKK', to: 'FRA', date: '26 Jan 2026' }
    : { title: 'ขากลับ (Return Flight)', flight: 'TG 931', from: 'FRA', to: 'BKK', date: '10 Feb 2026' };

  return (
    <div className="p-4 md:p-6">
      <h3 className={`text-lg font-bold mb-3 ${mainColor} border-b pb-1`}>{data.title}</h3>
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
        <div>
          <div className="uppercase font-semibold text-gray-500">Flight</div>
          <div className={`font-black text-lg ${mainColor}`}>{data.flight}</div>
        </div>
        <div>
          <div className="uppercase font-semibold text-gray-500">Date</div>
          <div className="font-bold">{data.date}</div>
        </div>

```


### `./app/hotel-doc-preview/page.tsx`

```js
// app/hotel-doc-preview/page.tsx
'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Interface ยังคงอยู่เพื่อใช้สำหรับการกำหนด Type (Type Checking) ภายใน
interface VisaDocPreviewProps {
  hotelName?: string;
  address?: string;
  phone?: string;
  email?: string;
  vatId?: string;
  bookingRef?: string;
  status?: string;
  guestName?: string;
  passport?: string;
  contact?: string;
  guests?: string;
  bookingDate?: string;
  checkin?: string;
  checkout?: string;
  nights?: string;
  roomType?: string;
  totalPrice?: string;
  paymentStatus?: string;
  cancellationPolicy?: string;
  issuedDate?: string;
}

```


### `./app/letter-service/page.tsx`

```js
'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, FileText, Send } from 'lucide-react';

export default function LetterServicePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <Mail className="w-12 h-12 text-blue-600 mx-auto mb-3" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">บริการเขียนจดหมายแนะนำตัวยื่นวีซ่า (Cover Letter)</h1>
            <p className="text-lg text-gray-600">สร้างจดหมายที่ชัดเจนและเป็นทางการเพื่อสนับสนุนคำร้องขอวีซ่าของคุณ</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-2xl border border-blue-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Input/Form Section (Placeholder) */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-red-500" />
                  ข้อมูลสำหรับเขียนจดหมาย
                </h2>
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">

```


### `./components/Header.tsx`

```js
// components/Header.tsx
'use client';

import Link from 'next/link';
import { Plane, Menu, X, DollarSign } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const navLinks = [
  { label: 'บริการ', href: '/services' },
  { label: 'ราคา', href: '/pricing' },
  { label: 'วิธีการ', href: '/how-to' },
  { label: 'ตัวอย่าง', href: '/samples' },
  { label: 'คำถามที่พบบ่อย', href: '/faq' },
  { label: 'ติดต่อ', href: '/contact' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);


```


### `./components/Footer.tsx`

```js
// components/Footer.tsx
import Link from 'next/link';
import { Plane, Facebook, Twitter, Instagram } from 'lucide-react';

const footerLinks = [
  {
    title: 'บริการของเรา',
    links: [
      { label: 'สร้างตั๋วเครื่องบินจำลอง', href: '/services#flight' },
      { label: 'สร้างการจองโรงแรมจำลอง', href: '/services#hotel' },
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

```


### `./components/ServiceCard.tsx`

```js
// components/ServiceCard.tsx
import React from 'react';
import Link from 'next/link';
import { ArrowRight, type LucideProps } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

// Type สำหรับ Icon Component จาก Lucide
type LucideIconType = ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;

interface ServiceCardProps {
    title: string;
    description: string;
    icon: LucideIconType;
    linkHref: string; 
    priceText: string;
    isPopular?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
    title, 
    description, 
    icon: Icon, 
    linkHref, 
    priceText,
    isPopular = false,
}) => {
    // ใช้ Fallback URL หาก linkHref เป็น undefined หรือเป็นค่า falsy
    const effectiveLinkHref = linkHref || '/services'; 
    
    // แจ้งเตือนใน Console หาก Prop สำคัญขาดหายไป (เพื่อช่วย Debug ข้อมูลต้นทาง)

```


### `./components/PricingCard.tsx`

```js
// components/PricingCard.tsx
import React from 'react';
import Link from 'next/link';
import { CheckCircle, type LucideProps } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

// Type สำหรับ Icon Component จาก Lucide
type LucideIconType = ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;

interface PricingCardProps {
    title: string;
    description: string;
    price: string;
    features: string[];
    linkHref: string; 
    buttonText: string;
    isRecommended?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ 
    title, 
    description, 
    price, 
    features, 
    linkHref, 
    buttonText,
    isRecommended = false,
}) => {
    // ใช้ Fallback URL หาก linkHref เป็น undefined หรือเป็นค่า falsy
    const effectiveLinkHref = linkHref || '/checkout'; 

```


### `./components/FAQItem.tsx`

```js
// components/FAQItem.tsx
'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
}

export default function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-md">
      <button
        onClick={toggleOpen}
        className="flex justify-between items-center w-full p-5 text-left bg-white hover:bg-gray-50 transition duration-150"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-semibold text-gray-800">{question}</span>
        <ChevronDown 
          className={`w-6 h-6 text-primary-green transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}
        />
      </button>
      
      <div

```


### `./components/PDFPreview.tsx`

```js
'use client';

import React, { useState, useEffect } from 'react';
import { generateDocumentPDF } from '../lib/pdfGenerator';
import { AlertTriangle, FileText, Download } from 'lucide-react';

interface DocumentData {
  type: 'FLIGHT' | 'HOTEL';
  title: string;
  applicantName: string;
  details: string[];
}

interface PDFPreviewProps {
  data: DocumentData;
}

export default function PDFPreview({ data }: PDFPreviewProps) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // รันเฉพาะฝั่ง Client
    if (typeof window === 'undefined') return;

    const createPdf = async () => {
      setIsLoading(true);
      setError(null);
      setPdfUrl(null);

```


### `./components/Hero.tsx`

```js
// components/Hero.tsx
import Link from 'next/link';
import { Plane, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="text-center py-20 md:py-32 bg-bg-light border-b border-gray-200">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
          สร้างตั๋วเครื่องบินและโรงแรม
          <span className="text-primary-green"> สำหรับยื่นวีซ่า</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          เอกสารจำลองคุณภาพสูง ออกแบบมาโดยเฉพาะเพื่อวัตถุประสงค์ในการยื่นคำร้องขอวีซ่า
          (Schengen, UK, US และอื่น ๆ) ด้วยความน่าเชื่อถือระดับมืออาชีพ
        </p>

        {/* CTA */}
        <Link
          href="/services"
          className="inline-flex items-center justify-center text-lg btn-secondary shadow-2xl transition duration-300"
        >
          <Plane className="w-5 h-5 mr-2" />
          สร้างเอกสารของคุณทันที!
          <ArrowRight className="w-5 h-5 ml-2" />
        </Link>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border-l-4 border-accent-gold text-gray-800 p-4 mt-8 rounded-lg shadow-inner max-w-xs mx-auto">

```


### `./components/About.tsx`

```js
// components/About.tsx
'use client';

import React from 'react';
import { ShieldCheck, Calendar, FileText, type LucideIcon } from 'lucide-react';

/* =============================
   Types
============================= */
interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

/* =============================
   Data
============================= */
const FEATURES: FeatureItem[] = [
  {
    icon: ShieldCheck,
    title: 'ความน่าเชื่อถือสูง',
    description:
      'เอกสารของเราถูกออกแบบตามรูปแบบมาตรฐานสากลที่สถานทูตเชงเก้นยอมรับ ทำให้มั่นใจได้ในขั้นตอนการยื่นคำร้อง',
  },
  {
    icon: Calendar,
    title: 'วันเวลาที่ยืดหยุ่น',
    description:
      'สามารถระบุวันที่เดินทางที่ต้องการได้อย่างแม่นยำ ทำให้แผนการเดินทางของคุณสอดคล้องกับแผนการยื่นวีซ่า',

```


### `./components/Review.tsx`

```js
// components/Review.tsx
import React from 'react';
import { Quote, Star } from 'lucide-react';

// Props Structure matching the usage in app/page.tsx
interface ReviewProps {
  text: string;
  author: string;
  rating: number; // Expected to be 1 to 5
  visaType?: string; // Optional field, not currently used in app/page.tsx but good for expansion
}

const Review: React.FC<ReviewProps> = ({ text, author, rating, visaType }) => {
  // Ensure rating is between 0 and 5
  const normalizedRating = Math.max(0, Math.min(5, rating));

  return (
    // This is the individual review card component.
    // ใช้ Tailwind classes เพื่อความสวยงามและ responsive
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform border-t-4 border-blue-500/80 flex flex-col h-full">
      <Quote className="w-8 h-8 text-blue-600 mb-4" />
      
      {/* Review Text */}
      <p className="text-gray-700 italic mb-6 flex-grow leading-relaxed">
        "{text}"
      </p>
      
      <div className="mt-auto">
        {/* Rating Stars */}
        <div className="flex text-yellow-500 mb-2">

```


### `./lib/supabaseClient.ts`

```js
// lib/supabaseClient.ts

/**
 * NOTE: This is a MOCK implementation for the Website Builder.
 * In a real Next.js application, you would configure Supabase or Firebase
 * using environment variables and server-side logic for security.
 */

interface ContactData {
  name: string;
  email: string;
  message: string;
}

/**
 * Simulates submitting a contact message to a backend service.
 * @param data Contact data (name, email, message)
 */
export async function submitContactMessage(data: ContactData): Promise<{ success: boolean; error: string | null }> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800)); 

  console.log("MOCK: Submitting contact message...", data);

  if (!data.name || !data.email || !data.message) {
    return { success: false, error: 'All fields are required.' };
  }
  
  // Simulate successful submission
  if (data.email.includes('error')) {

```


### `./lib/generateTicket.ts`

```js
// lib/generateTicket.ts
// จำลองการใช้งาน PDF-lib หรือไลบรารีที่คล้ายกัน
// 💡 แก้ไข: เพิ่ม RotationTypes เข้ามาในการ Import
import { PDFDocument, rgb, StandardFonts, RotationTypes } from 'pdf-lib';

// 🚨 ลบ Type Mock ที่ขัดแย้งกับ Library ออก หรือ Comment ไว้
/*
// **แก้ไข:** เปลี่ยน Enum เป็น Literal Type Union เพื่อให้ง่ายต่อการใช้งานใน Object Literal
type RotationType = 'Degrees' | 'Radians';

interface Rotation {
    // ใช้ Type Union ที่กำหนดไว้
    type: RotationType; 
    angle: number;
}
*/

// ข้อมูลจำลองสำหรับตั๋ว (ควรจะมาจาก props ที่รับเข้ามา)
interface FlightData {
    passengerName: string;
    origin: string;
    destination: string;
    departureDate: string;
    flightNumber: string;
    bookingReference: string;
    issuer: string;
}

// ฟังก์ชันหลักในการสร้าง PDF Document
export async function generateFlightItinerary(data: FlightData): Promise<Uint8Array> {

```


### `./lib/helpers.ts`

```js
// lib/helpers.ts

/**
 * Basic email format validation
 * @param email 
 * @returns boolean
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Format date string for easy display on UI
 * @param dateString Date in ISO format (e.g., 2024-05-30T10:00:00.000Z)
 * @returns string (e.g., 30 พ.ค. 2567)
 */
export function formatDateForDisplay(dateString: string): string {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    // ใช้ 'th-TH' เพื่อให้ได้รูปแบบวันที่ภาษาไทย
    return date.toLocaleDateString('th-TH', options); 
  } catch (e) {
    console.error("Invalid date string:", dateString);

```


### `./lib/pdfGenerator.ts`

```js
import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib';

export interface DocumentData {
  type: 'FLIGHT' | 'HOTEL';
  title: string;
  applicantName: string;
  details: string[]; // List of key-value details
}

/**
 * Generates a PDF with a watermark and sample content for visa application purposes.
 * @param data Document data to populate the PDF.
 * @returns Base64 encoded PDF string
 */
export async function generateDocumentPDF(data: DocumentData): Promise<string> {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();

  // Embed a standard font (Helvetica). สำหรับ production อาจพิจารณาฟอนต์ที่รองรับภาษาไทย
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Add a single page
  const page = pdfDoc.addPage([600, 800]);
  const { width, height } = page.getSize();
  const fontSize = 12;

  // --- Watermark (Security / Disclaimer) ---
  const watermarkText = 'FOR VISA ONLY - NOT A REAL BOOKING';
  page.drawText(watermarkText, {
    x: width / 2 - 250,

```


---
> **Total JS/TS files:** 27
> **Files previewed:** 27
> **Files with Role/Auth checks:** 0
> **Files using Absolute Imports:** 0

## 🗄️ JSON Schema Summary

> **JSON parse coverage:** **100 %**

## 📄 CSV Preview Summary

> **CSV readable coverage:** **100 %**

## 🤖 AI Prompt Instructions & Context

> 📌 **Context:** Use the project files, JSON/CSV previews, and **unmasked** .env values to understand the environment, data structures, and code style. Focus on the code samples provided above.

> ✏️ **Suggested prompt template for AI:**

---
You are an expert AI coding assistant. Your task is to analyze the provided Project Summary Report and offer actionable insights.

**Primary Goal:** Improve code quality, security, and project consistency based on the context.

**Analysis Instructions:**
1.  **Environment (ENV):** Suggest config updates or potential security improvements based on the **available** .env keys (even masked ones indicate a secret).
2.  **Code (JS/TS):**
    * Identify files where Role/Auth checks or Absolute Imports are missing (low coverage areas).
    * Provide refactor recommendations for the previewed code samples.
3.  **Data (JSON/CSV):**
    * For invalid JSON files, suggest possible structural fixes.
    * Analyze CSV previews for consistency (headers, data types).
4.  **Overall:** Provide deployment or performance recommendations.

**Output Format:**
1.  **Recommendations List:** (Prioritized)
2.  **Annotated Code Blocks:** (Use Markdown `suggestion` blocks)
3.  **Coverage Review Table:** (Based on the final summary)
---

## 📊 Overall AI Coverage Estimate

| Metric | Total | Covered | Coverage % | Weight |
| :--- | :---: | :---: | :---: | :---: |
| **Code Preview** | 27 | 27 | 100% | 2 |
| **Role/Auth Checks** | 27 | 0 | 0% | 3 |
| **Absolute Imports** | 27 | 0 | 0% | 1 |
| **Valid JSON** | 0 | 0 | 100% | 2 |
| **Readable CSV** | 0 | 0 | 100% | 1 |


> 🔹 **Overall AI Project Coverage Estimate (Weighted Average):** **5555 %**

## 🗺️ Project Roadmap Notes

> ✏️ เพิ่มรายละเอียดเป้าหมาย ฟีเจอร์ หรือแผนงานต่อไปที่นี่เพื่อให้ AI ได้รับทราบและสามารถให้คำแนะนำที่สอดคล้องกับอนาคตของโปรเจกต์
