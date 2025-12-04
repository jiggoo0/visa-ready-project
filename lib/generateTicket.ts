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
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4 size
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // --- Watermark (FOR VISA ONLY) ---
    // ตำแหน่งกลางหน้า
    const watermarkText = "FOR VISA APPLICATION ONLY";
    const fontSize = 72;
    const textWidth = font.widthOfTextAtSize(watermarkText, fontSize);
    
    // ตั้งค่า Watermark
    page.drawText(watermarkText, {
        x: width / 2 - textWidth / 2, // จัดให้อยู่กลางหน้า
        y: height / 2,
        size: fontSize,
        font: font,
        color: rgb(0.9, 0.9, 0.9), // สีเทาอ่อน
        // **แก้ไข:** ใช้ RotationTypes.Radians แทน String Literal
        rotate: { type: RotationTypes.Radians, angle: Math.PI / 4 }, // เอียง 45 องศา (เรเดียน)
    });

    // --- ข้อมูลเอกสาร ---
    let y = height - 50;

    // Header
    page.drawText(data.issuer || "Airline Booking System", { x: 50, y: y, size: 24, font: font, color: rgb(0, 0, 0.5) });
    y -= 30;

    // Title
    page.drawText("Flight Itinerary - Booking Confirmation", { x: 50, y: y, size: 18, font: font, color: rgb(0.1, 0.1, 0.1) });
    y -= 30;

    // Booking Reference
    page.drawText(`Booking Reference: ${data.bookingReference || "VISA123456"}`, { x: 50, y: y, size: 14, font: regularFont });
    y -= 20;

    // Passenger Name
    page.drawText(`Passenger: ${data.passengerName || "MR. VISA APPLICANT / SCHENGEN"}`, { x: 50, y: y, size: 14, font: regularFont });
    y -= 40;

    // Flight Details Header
    page.drawText("--- Flight Details ---", { x: 50, y: y, size: 16, font: font });
    y -= 25;

    // Flight Information Table (Simplified)
    const flightInfo = [
        { label: "Flight No.", value: data.flightNumber || "TG970" },
        { label: "Departure", value: `${data.origin || "BKK"} - ${data.destination || "FRA"}` },
        { label: "Date", value: data.departureDate || "15 DEC 2025" },
        { label: "Status", value: "CONFIRMED (FOR VISA ONLY)" }
    ];
    
    flightInfo.forEach(item => {
        page.drawText(`${item.label}: ${item.value}`, { x: 50, y: y, size: 12, font: regularFont });
        y -= 20;
    });

    y -= 40;

    // Important Notice
    page.drawText("IMPORTANT NOTICE:", { x: 50, y: y, size: 14, font: font, color: rgb(0.7, 0, 0) });
    y -= 20;
    page.drawText("This document is a simulated itinerary created for the purpose of visa application. It does not constitute a valid, paid airline ticket or a guaranteed reservation. Actual ticket purchase is required upon visa approval.", { x: 50, y: y, size: 10, font: regularFont });
    
    // Save the PDF
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
}
