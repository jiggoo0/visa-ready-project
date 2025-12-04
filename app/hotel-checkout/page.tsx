'use client';

import React, { useState, useMemo } from 'react';
// Using Lucide-React icons
import { Bed, Calendar, User, Mail, Search, MessageSquare, MapPin, CheckSquare, Briefcase, Phone, Globe, XSquare, Clock, Printer } from 'lucide-react';

/* =================================================================
   INTERFACES
================================================================= */

/**
 * @interface HotelDocPreviewProps
 * ข้อมูลสำหรับส่งเข้าคอมโพเนนต์แสดงตัวอย่างเอกสาร
 */
interface HotelDocPreviewProps {
  hotelName: string;
  address: string;
  bookingRef: string;
  guestName: string;
  passport: string;
  checkin: string;
  checkout: string;
}

/* =================================================================
   COMMON UI COMPONENTS: Header and Footer (Professional Look)
================================================================= */

// Header Component: Professional, modern border bottom
const Header = () => (
  <header className="sticky top-0 z-30 bg-white border-b-4 border-teal-500 shadow-xl">
    <div className="max-w-7xl mx-auto py-5 px-6 flex justify-between items-center">
      <h1 className="text-3xl font-extrabold text-gray-900 flex items-center tracking-tight">
        <Bed className="w-8 h-8 mr-3 text-teal-600" /> <span className="hidden sm:inline">Visa Document Solutions |</span> <span className="text-2xl ml-2 font-light text-indigo-700">Hotel Booking Confirmation</span>
      </h1>
      <a href="#form" className="hidden sm:inline-block text-base font-semibold text-indigo-600 hover:text-teal-600 transition p-2 rounded-lg border border-indigo-200">
        Start Customizing →
      </a>
    </div>
  </header>
);

// Footer Component: Deep navy for corporate stability
const Footer = () => (
  <footer className="bg-gray-900 text-white py-8 text-center text-sm mt-12 print:hidden">
    <div className="max-w-7xl mx-auto px-4">
        &copy; 2025 Visa Document Service. All Rights Reserved. | <span className="text-teal-400">Professional Visa Support Services.</span>
    </div>
  </footer>
);

/* =================================================================
   PREVIEW DOCUMENT: HotelDocPreview (Official & Realistic)
   💡 เพิ่มความสมจริงด้วย Watermark และรูปแบบที่ดูเป็นเอกสารทางการ
================================================================= */

const HotelDocPreview: React.FC<HotelDocPreviewProps> = ({ hotelName, address, bookingRef, guestName, passport, checkin, checkout }) => {
    // ข้อมูลที่ตั้งค่าไว้ตายตัว (Mock Data) เพื่อความสมจริง
    const status = 'CONFIRMED AND GUARANTEED';
    const totalPrice = '€ 700.00 EUR (VAT Included)';
    const paymentStatus = 'Payment Pending (ชำระ ณ ที่พัก / Pay at Hotel)';
    const cancellationPolicy = 'FREE CANCELLATION until 08 January 2026 (11:59 PM CET).';
    const nights = "7 Nights";
    const roomType = 'Standard Single Room, Non-Smoking, Breakfast Included';
    const issuedDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    // Helper to format date for display
    const formatDate = (dateString: string) => 
        new Date(dateString + 'T00:00:00').toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });

    // Component Row สำหรับแสดงรายละเอียด
    const DetailRow: React.FC<{ title: string; value: string; icon: React.ReactNode, className?: string }> = ({ title, value, icon, className = '' }) => (
        <div className={`flex items-center py-3 px-4 border-b border-gray-200 last:border-b-0 ${className}`}>
            <span className="text-gray-500 mr-3">{icon}</span>
            <span className="text-sm text-gray-600 font-medium w-1/2">{title}</span>
            <span className="text-base font-extrabold text-gray-900 ml-auto">{value}</span>
        </div>
    );

    return (
        <div className="max-w-3xl w-full bg-white rounded-3xl p-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] relative mx-auto border-4 border-indigo-100 font-serif print:shadow-none print:border-0 print:p-0 print:rounded-none">
            
            {/* 💡 WATERMARK FOR OFFICIAL DRAFT LOOK - ซ่อนเมื่อสั่งพิมพ์ */}
            <div className="absolute inset-0 z-20 pointer-events-none opacity-5 flex items-center justify-center print:hidden">
                <div className="text-[140px] font-black text-indigo-400 transform -rotate-45 whitespace-nowrap tracking-wider font-sans select-none">
                    OFFICIAL DRAFT
                </div>
            </div>

            <div className="relative z-10">
                {/* Header Block: Hotel Identity */}
                <div className="border-b-8 border-indigo-700 pb-5 mb-8">
                    <h1 className="text-4xl font-extrabold text-indigo-900 tracking-wider flex items-center">
                        <Bed className="w-9 h-9 mr-3 text-teal-600" /> {hotelName.toUpperCase()}
                    </h1>
                    <p className="text-sm mt-2 text-gray-700 flex items-center">
                        <MapPin className="w-4 h-4 mr-1 text-teal-500"/>
                        {address}
                    </p>
                    {/* Mock Contact Info */}
                    <div className="flex text-xs text-gray-500 mt-1 space-x-4">
                        <span className="flex items-center"><Phone className="w-3 h-3 mr-1"/> Tel: +49 89 1234 5678</span>
                        <span className="flex items-center"><Mail className="w-3 h-3 mr-1"/> Email: reservations@sandragove.de</span>
                        <span className="flex items-center"><Globe className="w-3 h-3 mr-1"/> Web: sandragove.de</span>
                    </div>
                </div>

                {/* Booking Status and Reference (Highlight Block) */}
                <div className="bg-indigo-50 border-l-8 border-teal-500 rounded-xl p-6 mb-10 shadow-lg print:border-l-4 print:bg-gray-100">
                    <div className="flex items-center justify-between">
                        <p className="text-lg font-bold text-indigo-800">
                            BOOKING REFERENCE:
                        </p>
                         <strong className="text-3xl tracking-widest text-teal-600 font-mono">{bookingRef}</strong>
                    </div>
                    <div className="flex items-center mt-3 border-t border-indigo-200 pt-3">
                        <CheckSquare className="w-6 h-6 mr-3 text-green-600" />
                        <span className="text-xl font-extrabold text-green-700 uppercase">
                            RESERVATION STATUS: {status}
                        </span>
                    </div>
                </div>

                {/* Key Details Section */}
                <div className="border-2 border-gray-200 rounded-xl overflow-hidden mb-10 print:border-gray-500">
                    <h2 className="text-xl font-extrabold text-white bg-indigo-700 p-4 tracking-wider print:bg-gray-700">
                        KEY RESERVATION DETAILS
                    </h2>

                    {/* Guest Details */}
                    <div className="p-4 border-b border-gray-200">
                        <h3 className="text-lg font-bold text-indigo-800 mb-2">GUEST INFORMATION</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <DetailRow title="Full Name" value={guestName} icon={<User className="w-4 h-4"/>} className="border-b md:border-b-0"/>
                            <DetailRow title="Passport Number" value={passport} icon={<Mail className="w-4 h-4"/>}/>
                        </div>
                    </div>

                    {/* Stay Details */}
                    <div className="p-4 border-b border-gray-200">
                        <h3 className="text-lg font-bold text-indigo-800 mb-2">STAY PERIOD & ROOM</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <DetailRow title="Check-in Date" value={formatDate(checkin)} icon={<Calendar className="w-4 h-4 text-green-600"/>} className="font-extrabold text-teal-600 border-b md:border-b-0"/>
                            <DetailRow title="Check-out Date" value={formatDate(checkout)} icon={<Calendar className="w-4 h-4 text-red-600"/>} className="font-extrabold text-red-600"/>
                            <DetailRow title="Total Nights" value={nights} icon={<Clock className="w-4 h-4"/>} className="font-extrabold border-b md:border-b-0"/>
                            <DetailRow title="Room Type" value={roomType} icon={<Briefcase className="w-4 h-4"/>}/>
                        </div>
                    </div>
                </div>

                {/* Finance and Policy (Official Box) */}
                <div className="bg-yellow-50 border-4 border-yellow-300 rounded-xl p-6 shadow-md print:border-2 print:bg-white print:border-gray-400">
                    <h2 className="text-xl font-bold text-yellow-800 mb-4 flex items-center">
                        <Briefcase className="w-6 h-6 mr-3" />
                        FINANCIAL SUMMARY & POLICY
                    </h2>
                    <div className="space-y-2">
                        <div className="flex justify-between font-bold text-lg text-gray-800 py-1 border-b border-yellow-200 print:border-gray-300">
                            <span>Total Estimated Price</span>
                            <span className="text-indigo-800">{totalPrice}</span>
                        </div>
                        <div className="flex justify-between font-semibold text-red-600 py-1 border-b border-yellow-200 print:border-gray-300">
                            <span>Payment Status</span>
                            <span>{paymentStatus}</span>
                        </div>
                        <div className="flex justify-between font-extrabold text-green-700 py-1">
                            <span>Cancellation Policy</span>
                            <span>{cancellationPolicy}</span>
                        </div>
                    </div>
                </div>

                {/* Footer Notes */}
                <div className="text-xs text-gray-600 border-t-2 border-gray-300 pt-5 mt-8 text-center print:border-t print:border-gray-500">
                    <p className="font-extrabold text-indigo-900 text-sm tracking-wide">
                        ** THIS CONFIRMATION IS VALID FOR SCHENGEN VISA APPLICATIONS AND IMMIGRATION CHECKPOINTS. **
                    </p>
                    <p className="mt-2 text-gray-500">
                        Confirmation Issued By: Hotel Reservations Department | Document Generation Date: {issuedDate}
                    </p>
                </div>
            </div>
        </div>
    );
};

/* =================================================================
   MAIN PAGE COMPONENT: HotelCheckoutPage (Modern & Professional UI)
================================================================= */

export default function HotelCheckoutPage() {
    // 💡 ข้อมูลเริ่มต้นที่สมจริง
    const initialFormState = useMemo(() => ({
        guestName: 'MR. ANUCHA THONGDEE',
        passport: 'A1234567',
        checkinDate: '2026-01-15',
        checkoutDate: '2026-01-22',
        hotelName: 'Hotel Sandra Gove',
        bookingCode: 'SG-4592-DE-2026',
    }), []);
    
    const [formData, setFormData] = useState(initialFormState);
    const [isPreviewMode, setIsPreviewMode] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleGeneratePreview = (e: React.FormEvent) => {
        e.preventDefault();
        setIsPreviewMode(true);
    };

    const handlePrint = () => {
        window.print();
    };

    const previewProps: HotelDocPreviewProps = useMemo(() => ({
        hotelName: formData.hotelName || 'Sample Hotel',
        address: 'Am Hauptbahnhof 10, 80335 München, Deutschland (Munich, Germany)',
        bookingRef: formData.bookingCode.toUpperCase() || 'SG-XXXX-DE-2026',
        guestName: formData.guestName.toUpperCase() || 'MR. ANUCHA THONGDEE',
        passport: formData.passport.toUpperCase() || 'A1234567',
        checkin: formData.checkinDate,
        checkout: formData.checkoutDate,
    }), [formData]);


    return (
        <div className="bg-gray-100 min-h-screen flex flex-col font-inter print:bg-white">
            <Header />
            
            <main className="flex-grow py-16 px-4 flex justify-center">
                <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-12">
                    
                    {/* 1. Customization Form (Left Column) - Premium Card Design */}
                    <div id="form" className="lg:col-span-1 h-fit p-10 bg-white rounded-3xl shadow-2xl border-t-8 border-indigo-700 sticky top-24 transform transition duration-500 hover:shadow-xl print:hidden">
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center border-b pb-4">
                            <Search className="w-7 h-7 mr-3 text-indigo-700" />
                            ปรับแต่งข้อมูลเอกสาร
                        </h2>

                        <form onSubmit={handleGeneratePreview} className="space-y-6">
                            {/* Guest Name */}
                            <div>
                                <label htmlFor="guestName" className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                                    <User className="w-4 h-4 mr-2 text-teal-600"/>
                                    ชื่อ-นามสกุล ผู้เข้าพัก
                                </label>
                                <input
                                    id="guestName"
                                    name="guestName"
                                    type="text"
                                    value={formData.guestName}
                                    onChange={handleChange}
                                    className="block w-full rounded-xl border-gray-300 shadow-inner p-4 border focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition duration-200 text-base"
                                    placeholder="MR. ANUCHA THONGDEE (ตาม Passport)"
                                    required
                                />
                            </div>
                            
                            {/* Passport Number */}
                            <div>
                                <label htmlFor="passport" className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                                    <Mail className="w-4 h-4 mr-2 text-teal-600"/>
                                    หมายเลข Passport
                                </label>
                                <input
                                    id="passport"
                                    name="passport"
                                    type="text"
                                    value={formData.passport}
                                    onChange={handleChange}
                                    className="block w-full rounded-xl border-gray-300 shadow-inner p-4 border focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition duration-200 text-base"
                                    placeholder="A1234567"
                                    required
                                />
                            </div>
                            
                            {/* Check-in & Check-out Dates */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="checkinDate" className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                                        <Calendar className="w-4 h-4 mr-2 text-teal-600"/>
                                        วัน Check-in
                                    </label>
                                    <input
                                        id="checkinDate"
                                        name="checkinDate"
                                        type="date"
                                        value={formData.checkinDate}
                                        onChange={handleChange}
                                        className="block w-full rounded-xl border-gray-300 shadow-inner p-4 border focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition duration-200 text-base"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="checkoutDate" className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                                        <XSquare className="w-4 h-4 mr-2 text-teal-600"/>
                                        วัน Check-out
                                    </label>
                                    <input
                                        id="checkoutDate"
                                        name="checkoutDate"
                                        type="date"
                                        value={formData.checkoutDate}
                                        onChange={handleChange}
                                        className="block w-full rounded-xl border-gray-300 shadow-inner p-4 border focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition duration-200 text-base"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Hotel Name */}
                            <div>
                                <label htmlFor="hotelName" className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                                    <Bed className="w-4 h-4 mr-2 text-teal-600"/>
                                    ชื่อโรงแรม (ตัวอย่าง)
                                </label>
                                <input
                                    id="hotelName"
                                    name="hotelName"
                                    type="text"
                                    value={formData.hotelName}
                                    onChange={handleChange}
                                    className="block w-full rounded-xl border-gray-300 shadow-inner p-4 border focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition duration-200 text-base"
                                    placeholder="Hotel Sandra Gove"
                                    required
                                />
                            </div>

                            {/* Booking Code */}
                            <div>
                                <label htmlFor="bookingCode" className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                                    <MapPin className="w-4 h-4 mr-2 text-teal-600"/>
                                    Booking Reference (กำหนดเอง)
                                </label>
                                <input
                                    id="bookingCode"
                                    name="bookingCode"
                                    type="text"
                                    value={formData.bookingCode}
                                    onChange={handleChange}
                                    className="block w-full rounded-xl border-gray-300 shadow-inner p-4 border focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition duration-200 text-base"
                                    placeholder="SG-4592-DE-2026"
                                    maxLength={15}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-xl text-xl font-bold text-white bg-indigo-700 hover:bg-indigo-800 transition transform hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-teal-300 mt-8"
                            >
                                <Search className="w-6 h-6 mr-3" />
                                {isPreviewMode ? 'อัปเดตเอกสารตัวอย่าง' : 'สร้างเอกสารตัวอย่าง (Live Preview)'}
                            </button>
                            
                        </form>
                    </div>

                    {/* 2. Document Preview (Right Column) */}
                    <div className="lg:col-span-2">
                        <div className={`transition-opacity duration-500 ${isPreviewMode ? 'opacity-100' : 'opacity-50'}`}>
                            <div className="flex justify-end mb-4 print:hidden">
                                <button
                                    onClick={handlePrint}
                                    className="flex items-center py-2 px-4 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-700 transition"
                                >
                                    <Printer className="w-5 h-5 mr-2" />
                                    พิมพ์เอกสารนี้
                                </button>
                            </div>
                            <HotelDocPreview {...previewProps} />
                        </div>
                        {!isPreviewMode && (
                            <div className="text-center p-8 bg-white rounded-xl shadow-lg mt-8 lg:mt-0 print:hidden">
                                <MessageSquare className="w-10 h-10 mx-auto text-indigo-500 mb-3" />
                                <p className="text-xl font-semibold text-gray-700">กรุณากรอกข้อมูลและกดปุ่ม **"สร้างเอกสารตัวอย่าง"** เพื่อดูตัวอย่างเอกสารการจองที่สมจริง</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
