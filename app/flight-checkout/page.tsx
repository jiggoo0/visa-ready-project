'use client';

import React, { useState, useMemo } from 'react';
// Import icons from lucide-react. 
import { Plane, Calendar, User, MapPin, Search, MessageSquare, CheckCircle, Clock } from 'lucide-react'; 

/* =================================================================
   INTERFACES
================================================================= */

interface FlightInfo {
  flightNumber: string;
  from: string;
  to: string;
  fromAirport?: string;
  toAirport?: string;
  duration?: string;
  date: string; 
  departureTime?: string;
  terminal?: string;
  gate?: string;
  seat?: string;
}

interface FlightDocPreviewProps {
    passengerName: string;
    bookingCode: string;
    outbound: FlightInfo;
    returnFlight: FlightInfo;
}

// Mock LINE Official Account Link
const LINE_OA_LINK = 'https://line.me/R/ti/p/@mock_visa_doc_service'; 

/* =================================================================
   1. COMMON UI COMPONENTS: Header and Footer
================================================================= */

// Header Component: Professional, modern border bottom
const Header = () => (
  <header className="sticky top-0 z-20 bg-white border-b-4 border-emerald-600 shadow-xl">
    <div className="max-w-7xl mx-auto py-5 px-6 flex justify-between items-center">
      <h1 className="text-3xl font-extrabold text-gray-900 flex items-center tracking-tight">
        <Plane className="w-8 h-8 mr-3 text-emerald-600" /> Visa Document Solutions | <span className="text-2xl ml-2 font-light text-indigo-700">Flight Booking</span>
      </h1>
      <a href="#form" className="hidden sm:inline-block text-base font-semibold text-indigo-600 hover:text-emerald-600 transition p-2 rounded-lg border border-indigo-200">
        Start Customizing →
      </a>
    </div>
  </header>
);

// Footer Component: Deep navy for corporate stability
const Footer = () => (
  <footer className="bg-gray-900 text-white py-8 text-center text-sm mt-12">
    <div className="max-w-7xl mx-auto px-4">
        &copy; 2025 Visa Document Service. All Rights Reserved. | <span className="text-emerald-400">Professional Visa Support Services.</span>
    </div>
  </footer>
);

/* =================================================================
   2. PREVIEW HELPER COMPONENTS
================================================================= */

// Helper component for small details (used in FlightLeg)
const DetailItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="p-2 border border-gray-200 rounded-xl">
        <span className="text-xs text-gray-500 uppercase font-semibold block">{label}</span>
        <span className="text-lg font-bold text-gray-900 mt-1 block">{value}</span>
    </div>
);

// Component to render a single flight leg (Outbound or Return)
const FlightLeg: React.FC<{ flight: FlightInfo; isOutbound: boolean; passengerName: string }> = ({ flight, isOutbound, passengerName }) => {
    const colorClass = isOutbound ? 'text-indigo-700' : 'text-emerald-700';
    const directionBgClass = isOutbound ? 'bg-indigo-700' : 'bg-emerald-600';
    const directionText = isOutbound ? 'OUTBOUND' : 'RETURN';
    const directionIcon = isOutbound ? '→' : '←';

    // Helper to format date for display
    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return 'Invalid Date';
            return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
        } catch (error) {
            return 'Invalid Date';
        }
    }

    return (
      <div className="w-full max-w-3xl mx-auto bg-white border-4 border-indigo-100 rounded-3xl shadow-2xl mb-8 overflow-hidden relative font-sans">
        
        <div className={`p-4 text-white font-extrabold text-lg flex justify-between items-center ${directionBgClass}`}>
            <span className="flex items-center">
                <Plane className="w-5 h-5 mr-2" /> {directionText} FLIGHT
            </span>
            <span className="text-xl tracking-wider">{flight.flightNumber || 'TBC 000'}</span>
        </div>

        {/* Watermark for preview purposes (VisaReady Docs) */}
        <div className="absolute inset-0 z-20 pointer-events-none opacity-15 flex items-center justify-center">
            <div className="text-[140px] font-black text-indigo-500 transform -rotate-45 whitespace-nowrap tracking-wider font-sans">
                VisaReady Docs
            </div>
        </div>

        <div className="p-8 relative z-10">
            {/* Route Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="text-center">
                    <span className={`text-4xl font-extrabold ${colorClass}`}>{flight.from}</span>
                    <p className="text-sm text-gray-500 font-medium mt-1">{flight.fromAirport}</p>
                </div>
                <div className={`text-gray-400 text-6xl font-thin mx-4 transform transition-all`}>
                    {directionIcon}
                </div>
                <div className="text-center">
                    <span className={`text-4xl font-extrabold ${colorClass}`}>{flight.to}</span>
                    <p className="text-sm text-gray-500 font-medium mt-1">{flight.toAirport}</p>
                </div>
            </div>

            <div className="border-t border-b border-dashed border-gray-300 py-6 grid grid-cols-3 gap-4 text-center">
                <div>
                    <span className="text-xs text-gray-500 uppercase font-semibold block">Flight Date</span>
                    <span className="text-xl font-bold text-gray-900 mt-1 block">
                        <Calendar className="w-4 h-4 inline mr-1 text-emerald-500"/> {formatDate(flight.date)}
                    </span>
                </div>
                <div>
                    <span className="text-xs text-gray-500 uppercase font-semibold block">Departure Time</span>
                    <span className="text-xl font-bold text-red-600 mt-1 block">
                        <Clock className="w-4 h-4 inline mr-1 text-red-500"/> {flight.departureTime || 'TBC'}
                    </span>
                </div>
                <div>
                    <span className="text-xs text-gray-500 uppercase font-semibold block">Duration</span>
                    <span className="text-xl font-bold text-gray-900 mt-1 block">{flight.duration || 'TBC'}</span>
                </div>
            </div>

            {/* Secondary Details */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <DetailItem label="Terminal" value={flight.terminal || '-'} />
                <DetailItem label="Gate" value={flight.gate || '-'} />
                <DetailItem label="Seat" value={flight.seat || '22B'} />
                <DetailItem label="Class" value="Economy" />
            </div>
        </div>

        {/* Footer Strip with Barcode/Reference */}
        <div className={`p-4 ${directionBgClass} bg-opacity-10 text-gray-700 flex justify-between items-center rounded-b-3xl relative z-10 border-t border-dashed border-gray-300`}>
            <div className="text-sm font-semibold">
                PASSENGER: <span className="text-indigo-800 font-extrabold">{passengerName.toUpperCase()}</span>
            </div>
            
            {/* Mock Barcode SVG (Realistic) */}
            <svg width="150" height="40" viewBox="0 0 150 40" xmlns="http://www.w3.org/2000/svg" className="w-28 h-8 sm:w-36 sm:h-10 opacity-70">
                <rect x="0" y="0" width="8" height="40" fill="#1e293b" />
                <rect x="12" y="0" width="4" height="40" fill="#1e293b" />
                <rect x="22" y="0" width="10" height="40" fill="#1e293b" />
                <rect x="36" y="0" width="3" height="40" fill="#1e293b" />
                <rect x="42" y="0" width="6" height="40" fill="#1e293b" />
                <rect x="50" y="0" width="12" height="40" fill="#1e293b" />
                <rect x="66" y="0" width="2" height="40" fill="#1e293b" />
                <rect x="70" y="0" width="14" height="40" fill="#1e293b" />
                <rect x="88" y="0" width="4" height="40" fill="#1e293b" />
                <rect x="94" y="0" width="8" height="40" fill="#1e293b" />
                <rect x="104" y="0" width="18" height="40" fill="#1e293b" />
            </svg>
        </div>
      </div>
    );
};


/* =================================================================
   3. PREVIEW DOCUMENT: FlightDocPreview (Official & Realistic E-Ticket)
================================================================= */

const FlightDocPreview: React.FC<FlightDocPreviewProps> = ({ passengerName, bookingCode, outbound, returnFlight }) => {
    const status = 'CONFIRMED AND GUARANTEED';
    const issuedDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    
    return (
        <div className="flex-grow py-4 px-2 sm:px-4 bg-gray-100 relative">
            <header className="max-w-3xl mx-auto mb-10 p-4 bg-white rounded-xl shadow-lg border-b-4 border-emerald-500">
                <h1 className="text-3xl font-extrabold text-indigo-800 text-center flex items-center justify-center">
                    E-TICKET CONFIRMATION
                </h1>
                <p className="text-gray-500 text-center mt-2">
                    Booking Reference: <strong className="text-indigo-700 text-xl font-mono">{bookingCode.toUpperCase()}</strong>
                </p>
                <div className="flex justify-center items-center mt-3">
                    <CheckCircle className="w-5 h-5 mr-2 text-emerald-600"/>
                    <span className="text-lg font-bold text-emerald-700 uppercase">{status}</span>
                </div>
                <p className="text-xs text-gray-400 mt-2 text-center">Document Issued: {issuedDate}</p>
            </header>

            <FlightLeg flight={outbound} isOutbound={true} passengerName={passengerName} />
            <FlightLeg flight={returnFlight} isOutbound={false} passengerName={passengerName} />

            <div className="max-w-3xl mx-auto w-full text-center text-sm text-gray-600 pt-4 border-t border-gray-300 mt-6">
                <div className="text-xs text-red-600 font-extrabold">
                    เอกสารนี้เป็นตัวอย่าง มีลายน้ำ **VisaReady Docs** และไม่สามารถใช้ยื่นจริงได้
                </div>
            </div>
        </div>
    );
};


/* =================================================================
   4. MAIN PAGE COMPONENT: App (Default Export)
================================================================= */

export default function App() { 
    // 💡 ข้อมูลเริ่มต้นที่สมจริงและเป็นทางการ
    const initialFormState = useMemo(() => ({
        passengerName: 'MR. ANUCHA THONGDEE',
        bookingCode: 'RTZ7B5',
        departureDate: '2026-01-26',
        returnDate: '2026-02-10',
        fromCity: 'Bangkok',
        toCity: 'Frankfurt',
    }), []);
    
    const [formData, setFormData] = useState(initialFormState);
    const [isPreviewMode, setIsPreviewMode] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleGeneratePreview = (e: React.FormEvent) => {
        e.preventDefault();
        // Force uppercase for booking code on submit
        setFormData(prev => ({ ...prev, bookingCode: prev.bookingCode.toUpperCase() }));
        setIsPreviewMode(true);
    };

    // Derived State for Outbound Flight
    const outboundFlight: FlightInfo = useMemo(() => ({
        flightNumber: 'TG 930',
        from: 'BKK',
        to: 'FRA',
        fromAirport: `${formData.fromCity} (Suvarnabhumi)`,
        toAirport: `${formData.toCity} Airport`,
        duration: '12h 45m',
        date: formData.departureDate,
        departureTime: '23:55',
        terminal: 'T1',
        gate: 'A23',
        seat: '22B',
    }), [formData]);

    // Derived State for Return Flight
    const returnFlight: FlightInfo = useMemo(() => ({
        flightNumber: 'TG 931',
        from: 'FRA',
        to: 'BKK',
        fromAirport: `${formData.toCity} Airport`,
        toAirport: `${formData.fromCity} (Suvarnabhumi)`,
        duration: '11h 30m',
        date: formData.returnDate,
        departureTime: '13:45',
        terminal: 'T2',
        gate: 'B18',
        seat: '22B',
    }), [formData]);


    return (
        <div className="bg-gray-100 min-h-screen flex flex-col font-inter">
            <Header />
            
            <main className="flex-grow py-8 sm:py-16 px-4 flex justify-center">
                <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-12">
                    
                    {/* 1. Customization Form (Left Column) - Premium Card Design */}
                    <div id="form" className="lg:col-span-1 h-fit p-6 sm:p-10 bg-white rounded-3xl shadow-2xl border-t-8 border-indigo-700 sticky top-4 sm:top-24 transform transition duration-500 hover:shadow-xl">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-8 flex items-center border-b pb-4">
                            <Search className="w-6 h-6 sm:w-7 sm:h-7 mr-3 text-indigo-700" />
                            ปรับแต่งข้อมูลเอกสารการบิน
                        </h2>

                        <form onSubmit={handleGeneratePreview} className="space-y-6">
                            {/* Passenger Name */}
                            <div>
                                <label htmlFor="passengerName" className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                                    <User className="w-4 h-4 mr-2 text-emerald-600"/>
                                    ชื่อ-นามสกุล ผู้เดินทาง (ตาม Passport)
                                </label>
                                <input
                                    id="passengerName"
                                    name="passengerName"
                                    type="text"
                                    value={formData.passengerName}
                                    onChange={handleChange}
                                    className="block w-full rounded-xl border-gray-300 shadow-inner p-4 border focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition duration-200 text-base"
                                    placeholder="MR. SAITOUR RUNWONGKAN"
                                    required
                                />
                            </div>
                            
                            {/* Departure & Return Dates */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="departureDate" className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                                        <Calendar className="w-4 h-4 mr-2 text-emerald-600"/>
                                        วันเดินทางไป (Outbound)
                                    </label>
                                    <input
                                        id="departureDate"
                                        name="departureDate"
                                        type="date"
                                        value={formData.departureDate}
                                        onChange={handleChange}
                                        className="block w-full rounded-xl border-gray-300 shadow-inner p-4 border focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition duration-200 text-base"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="returnDate" className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                                        <Calendar className="w-4 h-4 mr-2 text-emerald-600"/>
                                        วันเดินทางกลับ (Return)
                                    </label>
                                    <input
                                        id="returnDate"
                                        name="returnDate"
                                        type="date"
                                        value={formData.returnDate}
                                        onChange={handleChange}
                                        className="block w-full rounded-xl border-gray-300 shadow-inner p-4 border focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition duration-200 text-base"
                                        required
                                    />
                                </div>
                            </div>

                            {/* From & To Cities */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="fromCity" className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                                        <MapPin className="w-4 h-4 mr-2 text-emerald-600"/>
                                        ต้นทาง (City)
                                    </label>
                                    <input
                                        id="fromCity"
                                        name="fromCity"
                                        type="text"
                                        value={formData.fromCity}
                                        onChange={handleChange}
                                        className="block w-full rounded-xl border-gray-300 shadow-inner p-4 border focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition duration-200 text-base"
                                        placeholder="Bangkok"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="toCity" className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                                        <MapPin className="w-4 h-4 mr-2 text-emerald-600"/>
                                        ปลายทาง (City)
                                    </label>
                                    <input
                                        id="toCity"
                                        name="toCity"
                                        type="text"
                                        value={formData.toCity}
                                        onChange={handleChange}
                                        className="block w-full rounded-xl border-gray-300 shadow-inner p-4 border focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition duration-200 text-base"
                                        placeholder="Frankfurt"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Booking Code (optional customization) */}
                            <div>
                                <label htmlFor="bookingCode" className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                                    <CheckCircle className="w-4 h-4 mr-2 text-emerald-600"/>
                                    Booking Reference (กำหนดเอง)
                                </label>
                                <input
                                    id="bookingCode"
                                    name="bookingCode"
                                    type="text"
                                    value={formData.bookingCode}
                                    onChange={handleChange}
                                    className="block w-full rounded-xl border-gray-300 shadow-inner p-4 border focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition duration-200 text-base font-mono uppercase"
                                    placeholder="RTZ7B5"
                                    maxLength={6}
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full mt-8 flex items-center justify-center px-8 py-4 border border-transparent text-lg font-extrabold rounded-xl shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-300 transform hover:scale-[1.02]"
                            >
                                <Plane className="w-5 h-5 mr-3" />
                                สร้างตัวอย่างเอกสาร (Preview)
                            </button>
                        </form>

                        <div className="mt-10 pt-6 border-t border-gray-200">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">ขั้นตอนการสั่งซื้อจริง</h3>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-start">
                                    <CheckCircle className="w-5 h-5 mt-1 mr-3 text-emerald-500 flex-shrink-0" />
                                    <span>1. ปรับแต่งข้อมูลในฟอร์มให้ถูกต้องตามที่ต้องการ</span>
                                </li>
                                <li className="flex items-start">
                                    <Clock className="w-5 h-5 mt-1 mr-3 text-emerald-500 flex-shrink-0" />
                                    <span>2. กดปุ่ม "สร้างตัวอย่างเอกสาร" เพื่อตรวจสอบความเรียบร้อย</span>
                                </li>
                                <li className="flex items-start">
                                    <MessageSquare className="w-5 h-5 mt-1 mr-3 text-emerald-500 flex-shrink-0" />
                                    <span>3. ติดต่อเจ้าหน้าที่ผ่าน <a href={LINE_OA_LINK} target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-bold hover:underline">LINE Official Account</a> เพื่อยืนยันการสั่งซื้อ</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* 2. Document Preview (Right Column) */}
                    <div className="lg:col-span-2">
                        <div className="p-4 bg-white rounded-xl shadow-2xl mb-8 border-t-8 border-emerald-500">
                            <h2 className="text-2xl font-extrabold text-gray-900 mb-4 flex items-center border-b pb-4">
                                <MessageSquare className="w-6 h-6 mr-3 text-emerald-600" />
                                ตัวอย่าง E-Ticket สำหรับยื่น Visa (Preview)
                            </h2>
                            <p className="text-sm text-gray-500 mb-4">
                                *เอกสารที่แสดงผลด้านล่างนี้คือตัวอย่างที่จำลองขึ้นเพื่อการพิจารณาเท่านั้น
                            </p>
                        </div>
                        
                        {isPreviewMode ? (
                            <FlightDocPreview
                                passengerName={formData.passengerName}
                                bookingCode={formData.bookingCode}
                                outbound={outboundFlight}
                                returnFlight={returnFlight}
                            />
                        ) : (
                            <div className="flex items-center justify-center h-96 bg-white rounded-3xl shadow-xl border border-gray-200 p-8 text-center">
                                <p className="text-xl text-gray-500 font-semibold">
                                    กรุณากรอกข้อมูลและกดปุ่ม <span className='text-indigo-600 font-bold'>"สร้างตัวอย่างเอกสาร"</span> เพื่อดูตัวอย่างเอกสารการบิน
                                </p>
                            </div>
                        )}
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}

