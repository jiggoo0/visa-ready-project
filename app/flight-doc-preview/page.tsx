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
  
  const outbound: FlightInfo = {
    flightNumber: 'TG 930',
    from: 'BKK',
    to: 'FRA',
    fromAirport: 'Bangkok (Suvarnabhumi)',
    toAirport: 'Frankfurt Airport',
    duration: '12h 45m',
    date: '26 Jan 2026 (Tue)',
    departureTime: '23:55',
    terminal: 'T1',
    gate: 'A23',
    seat: '22B',
  };
  
  const returnFlight: FlightInfo = {
    flightNumber: 'TG 931',
    from: 'FRA',
    to: 'BKK',
    fromAirport: 'Frankfurt Airport',
    toAirport: 'Bangkok (Suvarnabhumi)',
    duration: '11h 30m',
    date: '10 Feb 2026 (Wed)',
    departureTime: '13:45',
    terminal: 'T2',
    gate: 'B18',
    seat: '22B',
  };
  
  const renderFlight = (flight: FlightInfo, isOutbound: boolean) => {
    const colorClass = isOutbound ? 'text-green-700' : 'text-red-700';

    return (
      <div className="w-full max-w-3xl mx-auto bg-white border border-gray-300 rounded-xl shadow-lg mb-6 overflow-hidden">
        <div className="p-6 rounded-t-xl">
          <h2 className={`text-lg font-extrabold mb-4 ${colorClass} border-b pb-2`}>
            {isOutbound ? 'ขาไป (Outbound Flight)' : 'ขากลับ (Return Flight)'}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-6">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 uppercase font-semibold">Passenger Name</span>
              {/* ใช้ตัวแปรภายใน */}
              <span className="text-xl font-bold text-black">{passengerName}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs text-gray-500 uppercase font-semibold">Flight</span>
              <span className={`text-2xl font-black ${colorClass}`}>{flight.flightNumber}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs text-gray-500 uppercase font-semibold">From / Class</span>
              <span className={`text-xl font-bold ${colorClass}`}>{flight.from}</span>
              <span className="text-xs text-gray-500 font-semibold">{flight.fromAirport} | Economy</span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs text-gray-500 uppercase font-semibold">To / Duration</span>
              <span className={`text-xl font-bold ${colorClass}`}>{flight.to}</span>
              <span className="text-xs text-gray-500 font-semibold">{flight.toAirport} | {flight.duration}</span>
            </div>
          </div>
          
          <div className="border-t border-dashed border-gray-400 my-6"></div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-x-4 gap-y-6">
            <div className="col-span-2">
              <span className="text-xs text-gray-500 uppercase font-semibold">Date</span>
              <span className="text-2xl font-bold">{flight.date}</span>
            </div>

            <div>
              <span className="text-xs text-gray-500 uppercase font-semibold">Departure Time</span>
              <span className="text-2xl font-bold text-red-600">{flight.departureTime}</span>
            </div>

            <div>
              <span className="text-xs text-gray-500 uppercase font-semibold">Terminal / Gate</span>
              <span className="text-2xl font-bold">{flight.terminal} / {flight.gate}</span>
            </div>

            <div>
              <span className="text-xs text-gray-500 uppercase font-semibold">Seat</span>
              <span className={`text-2xl font-bold ${colorClass}`}>{flight.seat}</span>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center rounded-b-xl">
          <div className="mb-4 sm:mb-0">
            <div className="text-xs font-semibold text-gray-600">JP-VISOUL-DOC'S AIRLINES</div>
            <div className="text-xl font-extrabold text-gray-800">{flight.flightNumber} {flight.from} ➜ {flight.to}</div>
            <div className="text-xs text-gray-500 mt-1">Boarding starts at: {flight.departureTime}</div>
          </div>

          <div className="flex flex-col items-center">
            <svg width="150" height="40" viewBox="0 0 150 40" xmlns="http://www.w3.org/2000/svg" className="w-28 h-8 sm:w-36 sm:h-10">
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

            <div className="text-xs mt-1 text-gray-700 font-mono">{flight.flightNumber}-{flight.from}-{flight.to}-{passengerName}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    // 💡 โครงสร้างหลัก: Header, Main Content, Footer
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8 px-4 flex flex-col gap-6">
        {/* Header */}
        <header className="text-center max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800">Flight Confirmation & Boarding Information</h1>
          <p className="text-gray-500">
            Booking Code: <strong className="text-red-500">{bookingCode}</strong>
          </p>
          <p className="text-sm text-gray-700 mt-1">
            Status: <span className="font-bold text-green-700">{status}</span>
          </p>
        </header>

        {/* Outbound / Return */}
        {renderFlight(outbound, true)}
        {renderFlight(returnFlight, false)}

        {/* Important Notes */}
        <div className="max-w-3xl mx-auto w-full p-6 bg-white rounded-xl shadow-lg border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-3 border-b pb-2 text-red-600">
            คำแนะนำที่สำคัญ (Important Advisories)
          </h3>

          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
            <li>Check-in: กรุณาไปถึงสนามบินอย่างน้อย 3 ชั่วโมงก่อนเวลาออกเดินทาง</li>
            <li>Travel Documents: ตรวจสอบความถูกต้องของเอกสารก่อนยื่นวีซ่า</li>
            <li>Baggage Allowance: นโยบายสัมภาระเป็นไปตามข้อกำหนดของสายการบิน</li>
            <li>Flight Changes: ตารางบินอาจเปลี่ยน โปรดตรวจสอบอีกครั้งก่อนเดินทาง</li>
          </ul>
        </div>

        {/* Footer for the document preview */}
        <footer className="max-w-3xl mx-auto w-full text-center text-sm text-gray-600 pt-4 border-t border-gray-300">
          <div className="font-bold text-gray-800">JP-VISOUL-DOC'S AIRLINES — 24/7 Support</div>
          <div className="text-base text-blue-600 font-extrabold mt-1">Hotline: +66 2 123 4567</div>
          <div className="text-xs mt-1">Travel consultant: KJ | Email: info@khobfahtravel.com</div>
        </footer>
      </main>
      
      <Footer />
    </div>
  );
}
