// src/components/CoverLetterDocument.tsx หรือตามที่คุณจัดเก็บ
import React from 'react';

interface LetterData {
  applicantName: string;
  passportNumber: string;
  address: string;
  phone: string;
  email: string;
  visaType: string;
  destinationCountry: string;
  durationDays: number;
  entryDate: string;
  departureDate: string;
  purpose: string;
  fundingSource: string;
}

interface CoverLetterDocumentProps {
    data: LetterData;
}

const formatDate = (dateString: string) => 
    new Date(dateString + 'T00:00:00').toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' });

const CoverLetterDocument: React.FC<CoverLetterDocumentProps> = ({ data }) => {
    // ข้อมูล Mock สำหรับสถานทูต (กรุณาแก้ไข Address ให้ตรงกับสถานทูตจริง)
    const embassyAddress = `Visa Application Centre
Consulate General of ${data.destinationCountry}
[Embassy Address Line 1: e.g. 100 Sathorn Road]
[Embassy Address Line 2: e.g. Bangkok 10500, Thailand]`;
    
    // วันที่ออกจดหมาย คือ วันที่ปัจจุบัน
    const currentDate = formatDate(new Date().toISOString().split('T')[0]);

    return (
        // 💡 ID นี้ใช้สำหรับการอ้างอิงของ html2pdf (ห้ามเปลี่ยน)
        <div id="cover-letter-content" className="p-8 bg-white shadow-xl font-serif text-gray-800 text-[12pt] leading-relaxed" style={{ width: '210mm', minHeight: '297mm', margin: 'auto', border: '1px solid #ccc' }}>
            
            <p className="text-right mb-10">{currentDate}</p>

            {/* Recipient Address */}
            <div className="mb-8">
                <p className="font-bold">To: The Visa Officer,</p>
                <p className="whitespace-pre-wrap">{embassyAddress}</p>
                <p>Subject: **Application for a ${data.visaType} Visa**</p>
            </div>

            {/* Salutation */}
            <p className="mb-6">Dear Visa Officer,</p>

            {/* Introduction Paragraph */}
            <p className="mb-6 indent-8">
                I am writing this letter to formally request the grant of a **${data.visaType} Visa** for my planned trip to **${data.destinationCountry}** and the Schengen area. My primary purpose for visiting is **${data.purpose}**.
            </p>

            {/* Travel Details Paragraph */}
            <p className="mb-6 indent-8">
                My itinerary is planned for **${data.durationDays} days**, commencing on **${formatDate(data.entryDate)}** and concluding on **${formatDate(data.departureDate)}**. I will be returning to my home country, Thailand, immediately upon the completion of my trip, as I have strong ties and professional commitments here.
            </p>

            {/* Financial and Accommodation Paragraph */}
            <p className="mb-6 indent-8">
                All expenses related to my travel, accommodation, and personal needs during the stay will be fully covered by **${data.fundingSource}**, as evidenced by the attached bank statements and other financial proofs. My accommodation and flight details are confirmed and enclosed.
            </p>
            
            {/* Document Checklist (Crucial for Visa) */}
            <p className="font-bold mt-8 mb-3">LIST OF DOCUMENTS ENCLOSED:</p>
            <ul className="list-disc pl-8 text-sm space-y-1">
                <li>Duly completed and signed Visa Application Form.</li>
                <li>Valid Passport (No. ${data.passportNumber}) and photograph.</li>
                <li>Detailed Flight Reservations (Round-trip ticket).</li>
                <li>Confirmed Hotel Booking Confirmation for the entire stay.</li>
                <li>Travel Medical Insurance (covering minimum required amount).</li>
                <li>Proof of sufficient funds (Bank Statement / Certificate).</li>
                <li>Employment / Business documents (e.g., Leave Approval Letter, Business Registration).</li>
                <li>Copy of Residence Registration (for verification of home ties).</li>
            </ul>

            {/* Closing */}
            <p className="mt-8 mb-2">Thank you for your time and consideration of my application. I look forward to your favorable response.</p>
            <p className="mb-10">Yours faithfully,</p>

            {/* Signature Block */}
            <p className="font-bold mt-12">_________________________</p>
            <p className="font-bold">${data.applicantName.toUpperCase()}</p>
            <p>Passport No: ${data.passportNumber}</p>
            <p>Contact: ${data.phone} | ${data.email}</p>
        </div>
    );
};

export default CoverLetterDocument;
