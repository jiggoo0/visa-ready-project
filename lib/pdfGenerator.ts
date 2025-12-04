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
    y: height / 2,
    size: 50,
    font,
    color: rgb(0.9, 0.2, 0.2),
    opacity: 0.1,
    rotate: degrees(45), // ใช้ degrees แทน radians
  });

  // --- Header ---
  page.drawText(`VISA READY DEMO DOCUMENT: ${data.title.toUpperCase()}`, {
    x: 50,
    y: height - 50,
    size: 20,
    font,
    color: rgb(0.1, 0.1, 0.1),
  });

  // --- Applicant Info ---
  let yPosition = height - 100;
  page.drawText(`Applicant: ${data.applicantName}`, {
    x: 50,
    y: yPosition,
    size: fontSize + 4,
    font,
    color: rgb(0.2, 0.2, 0.2),
  });

  yPosition -= 30;

  // --- Details ---
  data.details.forEach((detail, index) => {
    page.drawText(`- ${detail}`, {
      x: 60,
      y: yPosition - index * 20,
      size: fontSize,
      font,
      color: rgb(0.3, 0.3, 0.3),
    });
  });

  // --- Footer Disclaimer ---
  page.drawText(
    'Disclaimer: This is a DUMMY document for visa application purposes only. ' +
      'It holds no reservation value and cannot be used for actual travel.',
    {
      x: 50,
      y: 50,
      size: 8,
      font,
      color: rgb(0.5, 0.5, 0.5),
    }
  );

  // Save PDF and convert to Base64
  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes).toString('base64');
}