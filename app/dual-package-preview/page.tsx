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
        <div>
          <div className="uppercase font-semibold text-gray-500">From</div>
          <div className={`font-bold ${mainColor}`}>{data.from}</div>
        </div>
        <div>
          <div className="uppercase font-semibold text-gray-500">To</div>
          <div className={`font-bold ${mainColor}`}>{data.to}</div>
        </div>
      </div>
      <div className="text-xs text-gray-500 mt-3 border-t pt-2">
        Passenger: SAITOUR RUNWONGKAN | Booking Code: RTZ7B5
      </div>
    </div>
  );
};

const HotelDocumentFragment = () => (
  <div className="p-4 md:p-6">
    <h3 className="text-lg font-bold mb-3 text-blue-700 border-b pb-1">เอกสารยืนยันการจองโรงแรม</h3>
    <div className="border p-2 mb-3 bg-gray-50 rounded">
      <p className="text-xs font-semibold">
        BOOKING REF: <span className="text-red-600 font-bold">SG-4592-DE-2026</span>
      </p>
      <p className="text-sm font-bold text-green-700 mt-1">STATUS: CONFIRMED</p>
    </div>
    <table className="w-full text-sm border-separate border-spacing-y-1">
      <tbody>
        <tr>
          <th className="text-left w-40">Hotel Name</th>
          <td>Hotel Sandra Gove</td>
        </tr>
        <tr>
          <th className="text-left">Check-in Date</th>
          <td>15 January 2026</td>
        </tr>
        <tr>
          <th className="text-left">Check-out Date</th>
          <td>22 January 2026</td>
        </tr>
        <tr>
          <th className="text-left">Guest Name</th>
          <td>MR. ANUCHA THONGDEE</td>
        </tr>
        <tr>
          <th className="text-left">Policy</th>
          <td className="text-green-700 font-bold">FREE CANCELLATION</td>
        </tr>
        <tr>
          <th className="text-left">Total Price</th>
          <td>€ 700.00 EUR</td>
        </tr>
      </tbody>
    </table>
    <p className="text-xs text-gray-500 mt-3 border-t pt-2">
      Address: Am Hauptbahnhof 10, 80335 München, Germany
    </p>
  </div>
);

export default function DualPackagePreviewPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <Header /> {/* 💡 Header Component */}

      <main className="flex-grow py-8 md:py-10 px-4">
        <header className="text-center max-w-7xl mx-auto w-full mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
            ✅ แพ็กเกจเอกสารชุดสมบูรณ์ (ตั๋วเครื่องบิน + โรงแรม)
          </h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            เอกสารทั้งสองฉบับถูกจัดทำขึ้นตามมาตรฐานการยื่นวีซ่าเชงเก้น เพื่อแสดงการจองที่พักและเที่ยวบินที่สอดคล้องกัน
          </p>
          <div className="mt-4 inline-block px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg font-semibold text-sm">
            ⚠️ หมายเหตุ: การแสดงผลนี้เป็นการรวมตัวอย่างไว้ในหน้าเดียว ในเอกสารจริงจะถูกแยกเป็น 2 ไฟล์ PDF
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {/* Flight Document Fragment */}
          <div className="bg-white border border-gray-300 rounded-xl shadow overflow-hidden">
            <div className="p-4 bg-gray-100 border-b border-gray-300">
              <h2 className="text-xl font-extrabold text-gray-800">1. ตั๋วเครื่องบินจำลอง (Flight Itinerary)</h2>
            </div>
            <div className="divide-y divide-dashed divide-gray-300">
              <FlightDocumentFragment type="outbound" />
              <FlightDocumentFragment type="return" />
            </div>
          </div>

          {/* Hotel Document Fragment */}
          <div className="bg-white border border-gray-300 rounded-xl shadow overflow-hidden">
            <div className="p-4 bg-gray-100 border-b border-gray-300">
              <h2 className="text-xl font-extrabold text-gray-800">2. เอกสารยืนยันการจองโรงแรม (Hotel Booking)</h2>
            </div>
            <HotelDocumentFragment />
          </div>
        </div>

        <footer className="max-w-7xl mx-auto w-full mt-10 text-center text-sm text-gray-600 pt-4 border-t border-gray-200">
          <p>เอกสารชุดนี้เป็นหลักฐานที่น่าเชื่อถือสำหรับการยื่นคำร้องขอวีซ่า</p>
        </footer>
      </main>

      <Footer /> {/* 💡 Footer Component */}
    </div>
  );
}

