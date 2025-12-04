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

      try {
        const base64Pdf = await generateDocumentPDF(data);
        setPdfUrl(`data:application/pdf;base64,${base64Pdf}`);
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
    <div className="w-full bg-white rounded-xl shadow-lg border border-gray-200 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 border-b pb-3">
        <h3 className="text-xl font-bold text-gray-800 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-green-600" />
          ตัวอย่างเอกสาร {data.title}
        </h3>

        {pdfUrl && (
          <a
            href={pdfUrl}
            download={`visa_ready_sample_${data.type.toLowerCase()}.pdf`}
            className="flex items-center text-sm font-semibold text-yellow-600 hover:text-green-600 transition"
          >
            <Download className="w-4 h-4 mr-1" />
            ดาวน์โหลดตัวอย่าง
          </a>
        )}
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="h-64 flex flex-col items-center justify-center bg-gray-50 rounded-lg">
          <svg
            className="animate-spin h-8 w-8 text-green-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <p className="mt-3 text-gray-600">กำลังสร้างไฟล์ PDF...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="h-64 flex flex-col items-center justify-center bg-red-50 text-red-700 rounded-lg p-4">
          <AlertTriangle className="w-8 h-8 mb-2" />
          <p className="text-center">{error}</p>
        </div>
      )}

      {/* PDF Preview */}
      {pdfUrl && (
        <iframe
          src={pdfUrl}
          width="100%"
          height="700px"
          title={`PDF Preview of ${data.title}`}
          className="border border-gray-300 rounded-lg"
        />
      )}
    </div>
  );
}