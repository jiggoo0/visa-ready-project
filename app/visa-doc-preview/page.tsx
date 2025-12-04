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
}

/**
 * เอกสารยืนยันการจองโรงแรม (ตัวอย่างสำหรับยื่นวีซ่า)
 */
// 💡 แก้ไข: ลบ Props และ Type Annotation ออกจาก Signature ของ Default Export
export default function VisaDocPreviewPage() {
    
  // 💡 ย้ายค่าเริ่มต้น (Default values) ทั้งหมดมาไว้ในตัวแปร const ภายในฟังก์ชันแทน
  const hotelName = 'Hotel Sandra Gove';
  const address = 'Am Hauptbahnhof 10, 80335 München, Deutschland (Munich, Germany)';
  const phone = '+49 89 1234 5678';
  const email = 'reservations@sandragove.de';
  const vatId = 'DE123456789';
  const bookingRef = 'SG-4592-DE-2026';
  const status = 'CONFIRMED AND GUARANTEED';
  const guestName = 'MR. ANUCHA THONGDEE';
  const passport = 'A1234567';
  const contact = '+66 8x xxxx xxxx (Thailand)';
  const guests = '1 Adult';
  const bookingDate = '03 December 2025';
  const checkin = '15 January 2026';
  const checkout = '22 January 2026';
  const nights = '7 Nights';
  const roomType = 'Standard Single Room, Non-Smoking';
  const totalPrice = '€ 700.00 EUR';
  const paymentStatus = 'Payment Pending (ชำระ ณ ที่พัก)';
  const cancellationPolicy = 'FREE CANCELLATION until 08 January 2026 (11:59 PM CET).';
  const issuedDate = '04 December 2025';
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow py-8 px-4 flex justify-center">
        <div className="max-w-3xl w-full bg-white border border-gray-300 rounded-lg p-6 shadow-lg">

          {/* Header */}
          <div className="border-b pb-3 mb-6">
            <h1 className="text-xl font-bold">{hotelName} | RESERVATION CONFIRMATION</h1>
            <p className="text-sm">{address}</p>
            <p className="text-sm">Tel: {phone} | Email: {email}</p>
            <p className="text-sm font-semibold">VAT ID (Ust-IdNr): {vatId}</p>
          </div>

          {/* Booking Info */}
          <div className="bg-gray-100 border-2 border-black rounded-md p-4 mb-6">
            <p className="text-sm font-medium">
              <strong>BOOKING REFERENCE:</strong> {bookingRef}
            </p>
            <p className="text-green-700 font-bold uppercase">
              RESERVATION STATUS: {status}
            </p>
          </div>

          {/* Guest Details */}
          <div className="mb-4">
            <h2 className="font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-2">
              GUEST DETAILS
            </h2>
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <th className="text-left pr-4">Full Name</th>
                  <td className="font-semibold">{guestName}</td>
                </tr>
                <tr>
                  <th className="text-left pr-4">Passport Number</th>
                  <td className="font-semibold">{passport}</td>
                </tr>
                <tr>
                  <th className="text-left pr-4">Contact Phone</th>
                  <td>{contact}</td>
                </tr>
                <tr>
                  <th className="text-left pr-4">Number of Guests</th>
                  <td>{guests}</td>
                </tr>
                <tr>
                  <th className="text-left pr-4">Date of Booking</th>
                  <td>{bookingDate}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Stay Details */}
          <div className="mb-4">
            <h2 className="font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-2">
              STAY DETAILS
            </h2>
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <th className="text-left pr-4">Check-in Date</th>
                  <td className="font-semibold">{checkin}</td>
                </tr>
                <tr>
                  <th className="text-left pr-4">Check-out Date</th>
                  <td className="font-semibold">{checkout}</td>
                </tr>
                <tr>
                  <th className="text-left pr-4">Total Nights</th>
                  <td>{nights}</td>
                </tr>
                <tr>
                  <th className="text-left pr-4">Room Type</th>
                  <td>{roomType}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Finance + Cancellation */}
          <div className="mb-4">
            <h2 className="font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-2">
              FINANCIAL & CANCELLATION POLICY
            </h2>
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <th className="text-left pr-4">Total Price</th>
                  <td className="font-semibold">{totalPrice}</td>
                </tr>
                <tr>
                  <th className="text-left pr-4">Payment Status</th>
                  <td>{paymentStatus}</td>
                </tr>
                <tr>
                  <th className="text-left pr-4">Cancellation Policy</th>
                  <td className="font-semibold text-green-700">{cancellationPolicy}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="text-xs text-gray-600 border-t border-gray-300 pt-3 mt-4">
            <p>***Official Document for Visa Purpose***</p>
            <p>This document confirms accommodation for the required visa duration.</p>
            <p>
              Confirmation Issued By: Hotel Reservations Department | Date: {issuedDate}
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
