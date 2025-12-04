'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { generatePDF, DocumentData } from '@/lib/pdfGenerator';
import { AlertTriangle, FileText, Download, Loader2 } from 'lucide-react';

/* =============================
   Color Mapping
============================= */
const primaryGreen = 'emerald-600';
const accentGold = 'yellow-500';

/* =============================
   Component
============================= */
interface PDFPreviewProps {
  data: DocumentData;
}

export default function PDFPreview({ data }: PDFPreviewProps) {
  const [base64Data, setBase64Data] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const pdfUrl = useMemo(() => {
    if (base64Data) return `data:application/pdf;base64,${base64Data}`;
    return null;
  }, [base64Data]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const createPdf = async () => {
      setIsLoading(true);
      setError(null);
      setBase64Data(null);

      try {
        const pdfBytes = await generatePDF(data);

        // แปลง Uint8Array เป็น Base64
        const base64Pdf = btoa(String.fromCharCode(...pdfBytes));
        setBase64Data(base64Pdf);
      } catch (err) {
        console.error('PDF Generation Error:', err);
        setError('ไม่สามารถสร้างไฟล์ PDF ตัวอย่างได้ กรุณาลองใหม่อีกครั้ง');
      } finally {
        setIsLoading(false);
      }
    };

    createPdf();
  }, [data]);

  return (
    <div className="w-full bg-white rounded-xl shadow-2xl border border-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 border-b pb-3 border-gray-200">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center">
          <FileText className={`w-6 h-6 mr-2 text-${primaryGreen}`} />
          ตัวอย่างเอกสาร {data.title}
        </h3>

        {pdfUrl && (
          <a
            href={pdfUrl}
            download={`visa_ready_sample_${data.type.toLowerCase()}_${data.applicantName.replace(/\s/g, '_')}.pdf`}
            className={`flex items-center text-sm font-bold text-${accentGold} hover:text-yellow-600 transition p-2 rounded-lg bg-yellow-50`}
          >
            <Download className="w-4 h-4 mr-1" />
            ดาวน์โหลดตัวอย่าง
          </a>
        )}
      </div>

      {/* Loading / Error */}
      {isLoading && (
        <div className="h-96 flex flex-col items-center justify-center bg-gray-50 rounded-lg">
          <Loader2 className={`animate-spin h-10 w-10 text-${primaryGreen}`} />
          <p className="mt-3 text-lg text-gray-600">กำลังสร้างไฟล์ PDF จำลอง...</p>
        </div>
      )}
      {error && (
        <div className="h-96 flex flex-col items-center justify-center bg-red-50 text-red-700 rounded-lg p-6 border-2 border-red-300">
          <AlertTriangle className="w-10 h-10 mb-3" />
          <p className="text-lg font-semibold text-center">{error}</p>
        </div>
      )}

      {pdfUrl && !isLoading && (
        <iframe
          src={pdfUrl}
          width="100%"
          height="700px"
          title={`PDF Preview of ${data.title}`}
          className="border border-gray-300 rounded-lg shadow-inner"
        />
      )}
    </div>
  );
}