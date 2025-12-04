'use client';

import React, { useState, useMemo } from 'react';

import { Mail, FileText, Send, User, MapPin, Calendar, Briefcase, ChevronRight, Download } from 'lucide-react';
import CoverLetterDocument from './CoverLetterDocument'; 

/* =================================================================
   INTERFACES & MOCK COMPONENTS
================================================================= */
// Mock Header/Footer 
const Header = () => (
    <header className="sticky top-0 z-20 bg-white border-b-4 border-blue-500 shadow-lg">
        <div className="max-w-7xl mx-auto py-4 px-6">
            <h1 className="text-2xl font-bold text-gray-900">Visa Document Generator</h1>
        </div>
    </header>
);
const Footer = () => (
    <footer className="bg-gray-800 text-white py-4 text-center text-sm">
        &copy; 2025 Visa Document Services
    </footer>
);

// ข้อมูลเริ่มต้นสำหรับฟอร์ม
const initialFormData = {
  applicantName: 'Mr. Pranee Srisai',
  passportNumber: 'L887766',
  address: '123/4 Rama 9 Road, Suan Luang, Bangkok, 10250',
  phone: '+66 81 234 5678',
  email: 'pranee.srisai@email.com',
  visaType: 'Tourist (Schengen C-Type)',
  destinationCountry: 'Germany',
  durationDays: 14,
  entryDate: new Date(new Date().getFullYear() + 1, 1, 1).toISOString().split('T')[0], 
  departureDate: new Date(new Date().getFullYear() + 1, 1, 14).toISOString().split('T')[0], 
  purpose: 'Leisure travel and sightseeing',
  fundingSource: 'Personal savings and income (ระบุว่าออกค่าใช้จ่ายเอง)',
};

// 💡 กำหนด Type สำหรับฟังก์ชัน html2pdf ที่เราคาดหวัง
type Html2PdfFunction = () => {
    set: (options: any) => any;
    from: (element: HTMLElement) => any;
    save: () => void;
};


/* =================================================================
   MAIN PAGE COMPONENT: LetterServicePage
================================================================= */

export default function LetterServicePage() {
  const [formData, setFormData] = useState(initialFormData);
  const [isLetterGenerated, setIsLetterGenerated] = useState(false);
  
  // 💡 State Setter ที่แก้ไขแล้ว
  const [html2pdfFunction, setHtml2PdfModuleFn] = useState<any | null>(null);

  // --- START OF MODIFIED LOGIC (useEffect) ---
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      // 💡 ใช้ Dynamic Import เพื่อโหลด html2pdf.js ในฝั่ง Client
      import('html2pdf.js').then((module) => {
        
        // 💡 เก็บ Object ที่ได้จากการ Import ทั้งหมด (หรือ module.default)
        // เพื่อให้ handleDownloadPDF ไปตรวจหาฟังก์ชันที่ใช้งานได้จริง
        setHtml2PdfModuleFn((module as any).default || module);
        
      }).catch((error) => {
        console.error("Failed to load html2pdf.js:", error);
        setHtml2PdfModuleFn(null);
      });
    }
  }, []);
  // --- END OF MODIFIED LOGIC (useEffect) ---
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newValue = name === 'durationDays' ? parseInt(value) || 0 : value;
    setFormData(prev => ({ ...prev, [name]: newValue }));
  };

  // คำนวณวันที่ออกเดินทางโดยอัตโนมัติ
  useMemo(() => {
    const entry = new Date(formData.entryDate);
    if (!isNaN(entry.getTime()) && formData.durationDays > 0) {
      const departure = new Date(entry);
      departure.setDate(entry.getDate() + formData.durationDays); 
      setFormData(prev => ({ 
        ...prev, 
        departureDate: departure.toISOString().split('T')[0] 
      }));
    }
  }, [formData.entryDate, formData.durationDays]);
  
  // 💡 ฟังก์ชันดาวน์โหลด PDF จริง (ใช้ Module ที่โหลดมา)
  // --- START OF MODIFIED LOGIC (handleDownloadPDF) ---
  const handleDownloadPDF = () => {
    if (!isLetterGenerated) {
        alert('กรุณากด "สร้างเอกสาร (Preview)" ก่อนทำการดาวน์โหลด');
        return;
    }
    
    // 1. ตรวจสอบว่า Module โหลดสำเร็จหรือไม่
    if (!html2pdfFunction) {
        alert('เครื่องมือสร้าง PDF ยังโหลดไม่สมบูรณ์ กรุณารอสักครู่');
        return;
    }

    // 2. ดึง Element ที่มี ID
    const element = document.getElementById('cover-letter-content');
    if (!element) {
        console.error("Error: Target element 'cover-letter-content' not found in DOM.");
        alert('เกิดข้อผิดพลาด: ไม่พบเนื้อหาจดหมายที่จะแปลงเป็น PDF กรุณาลองสร้างเอกสารใหม่อีกครั้ง');
        return; 
    }

    // ตั้งค่า Options สำหรับการแปลง PDF
    const opt = {
        margin: [10, 15, 10, 15], // Top, Left, Bottom, Right margin in mm
        filename: `Cover_Letter_${formData.applicantName.replace(/\s/g, '_')}_${formData.destinationCountry}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, logging: false, dpi: 192, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    let pdfCreator: any = null;

    // 3. 💡 การแก้ไขหลัก: ตรวจสอบทุกรูปแบบที่เป็นไปได้เพื่อหาฟังก์ชัน html2pdf() 
    if (typeof html2pdfFunction === 'function') {
        pdfCreator = html2pdfFunction;
    } else if (html2pdfFunction && typeof html2pdfFunction.default === 'function') {
        pdfCreator = html2pdfFunction.default;
    } else if (html2pdfFunction && typeof html2pdfFunction.html2pdf === 'function') {
        pdfCreator = html2pdfFunction.html2pdf;
    } else if (typeof (window as any).html2pdf === 'function') {
        // Fallback: ตรวจสอบ Global Window (ในกรณีที่ไลบรารีโหลดตัวเองเข้า Global Scope)
        pdfCreator = (window as any).html2pdf;
    }
    
    if (!pdfCreator) {
        // ถ้ายังหาไม่เจอ ให้แจ้ง Error ตามที่คุณเห็น
        alert('ไม่สามารถดาวน์โหลดได้: ไม่พบฟังก์ชันสร้าง PDF');
        return;
    }
    
    try {
      // 4. ใช้งาน Creator Function ที่ค้นพบ
      pdfCreator().set(opt).from(element).save();
    } catch (e) {
      console.error("Error during PDF creation process (Unknown source type or other issue):", e);
      // แจ้งเตือนข้อผิดพลาด Source Type อีกครั้ง หากเกิดในขั้นตอนนี
      alert('เกิดข้อผิดพลาดในการสร้าง PDF: อาจเป็นปัญหา Source Type (โปรดตรวจสอบ Console)');
      return;
    }
    
    // แจ้งเตือนหลังดาวน์โหลด
    alert('ไฟล์ Cover Letter PDF ถูกดาวน์โหลดแล้ว!');
  };
  // --- END OF MODIFIED LOGIC (handleDownloadPDF) ---

  const handleGenerateLetter = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLetterGenerated(true);
    // เมื่อกดสร้างสำเร็จ ให้เลื่อนหน้าจอไปยังส่วน Preview โดยอัตโนมัติ
    setTimeout(() => {
        document.getElementById('letter-preview-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };


  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <Header />

      <main className="flex-grow py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-10 p-4 bg-white rounded-xl shadow-lg">
            <Mail className="w-12 h-12 text-blue-600 mx-auto mb-3" />
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
              บริการเขียนจดหมายแนะนำตัวยื่นวีซ่า (Cover Letter)
            </h1>
            <p className="text-xl text-gray-600">
              เอกสารสำคัญที่ช่วยเสริมความแข็งแกร่งให้กับคำร้องขอวีซ่าของคุณ
            </p>
          </div>

          {/* Main Content: Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* 1. Input/Form Section (Left Column) */}
            <div className="lg:col-span-2 space-y-4">
                <div className="bg-white p-8 rounded-xl shadow-2xl border-t-8 border-red-500" id="cover-letter-form">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 pb-3 flex items-center">
                        <FileText className="w-6 h-6 mr-3 text-red-500" />
                        กรอกข้อมูลสำหรับจดหมายแนะนำตัว
                    </h2>
                
                    <form onSubmit={handleGenerateLetter} className="space-y-6">
                        
                        {/* Applicant Details Group */}
                        <fieldset className="p-5 border border-gray-200 rounded-lg bg-gray-50">
                            <legend className="px-3 text-lg font-bold text-blue-700">ข้อมูลผู้ยื่นคำร้อง (Applicant Details)</legend>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputGroup label="ชื่อ-นามสกุล (ตาม Passport)" name="applicantName" value={formData.applicantName} onChange={handleChange} type="text" icon={User} />
                                <InputGroup label="หมายเลข Passport" name="passportNumber" value={formData.passportNumber} onChange={handleChange} type="text" icon={User} />
                            </div>
                            <InputGroup label="ที่อยู่ปัจจุบัน" name="address" value={formData.address} onChange={handleChange} type="text" icon={MapPin} />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputGroup label="เบอร์โทรศัพท์" name="phone" value={formData.phone} onChange={handleChange} type="tel" icon={Send} />
                                <InputGroup label="อีเมล" name="email" value={formData.email} onChange={handleChange} type="email" icon={Mail} />
                            </div>
                        </fieldset>

                        {/* Travel Details Group */}
                        <fieldset className="p-5 border border-gray-200 rounded-lg bg-gray-50">
                            <legend className="px-3 text-lg font-bold text-blue-700">ข้อมูลการเดินทาง (Travel Plan)</legend>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <InputGroup label="ประเทศปลายทาง" name="destinationCountry" value={formData.destinationCountry} onChange={handleChange} type="text" icon={MapPin} />
                                <InputGroup label="ประเภทวีซ่าที่ขอ (เช่น Tourist)" name="visaType" value={formData.visaType} onChange={handleChange} type="text" icon={Briefcase} />
                            </div>

                            <InputGroup label="วัตถุประสงค์ของการเดินทางโดยละเอียด" name="purpose" value={formData.purpose} onChange={handleChange} type="text" icon={Briefcase} />
                            
                            <div className="grid grid-cols-3 gap-4">
                                <InputGroup label="วันเข้าประเทศ (Entry Date)" name="entryDate" value={formData.entryDate} onChange={handleChange} type="date" icon={Calendar} />
                                <InputGroup label="จำนวนวันที่ต้องการพัก (Nights)" name="durationDays" value={String(formData.durationDays)} onChange={handleChange} type="number" icon={Calendar} min={1} />
                                <InputGroup label="วันออกจากประเทศ (Departure Date)" name="departureDate" value={formData.departureDate} onChange={handleChange} type="date" icon={Calendar} disabled />
                            </div>
                            <div className="mt-2 text-xs text-gray-500 flex items-center">
                                <ChevronRight className="w-3 h-3 mr-1"/> วันที่ออกจากประเทศจะคำนวณจากวันเข้าประเทศและจำนวนวันพักโดยอัตโนมัติ
                            </div>

                            <InputGroup label="แหล่งที่มาของเงินทุน" name="fundingSource" value={formData.fundingSource} onChange={handleChange} type="text" icon={Briefcase} />

                        </fieldset>
                        
                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-xl transition duration-200 shadow-xl text-lg mt-8 transform hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-blue-300"
                        >
                            <Send className="w-6 h-6 mr-3" />
                            {isLetterGenerated ? 'อัปเดตเอกสาร (Preview)' : 'สร้างเอกสาร (Preview)'}
                        </button>
                    </form>
                </div>
                
                {/* 💡 Preview and Download Section */}
                {isLetterGenerated && (
                    <div id="letter-preview-section" className="bg-white p-8 rounded-xl shadow-2xl border-t-8 border-green-500">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 pb-3 flex items-center">
                            <FileText className="w-6 h-6 mr-3 text-green-500" />
                            ตัวอย่างจดหมายแนะนำตัว (Cover Letter Preview)
                        </h2>
                        
                        <div className="mb-4">
                            <button
                                onClick={handleDownloadPDF}
                                className={`flex items-center justify-center font-bold py-3 px-6 rounded-lg transition duration-200 shadow-md ${
                                    html2pdfFunction ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-400 text-gray-700 cursor-wait'
                                }`}
                                disabled={!html2pdfFunction} // ปิดการใช้งานปุ่มจนกว่า Module จะโหลดเสร็จ
                            >
                                <Download className="w-5 h-5 mr-2" />
                                {html2pdfFunction ? 'ดาวน์โหลด PDF ฉบับสมบูรณ์' : 'กำลังโหลดเครื่องมือ PDF...'}
                            </button>
                        </div>

                        {/* 💡 แสดง Cover Letter Document ในกรอบ Preview */}
                        <div className="border border-gray-400 p-4 overflow-y-scroll max-h-[600px] bg-gray-50">
                             <CoverLetterDocument data={formData} />
                        </div>
                    </div>
                )}
            </div>


            {/* 2. Description/Benefit Section (Right Column) */}
            <div className="lg:col-span-1 space-y-8">
                
                <div className="bg-white p-6 rounded-xl shadow-lg border border-green-200 sticky top-24">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 flex items-center">
                        <FileText className="w-5 h-5 mr-2 text-green-500"/>
                        ทำไมต้องมี Cover Letter?
                    </h2>
                    <ul className="list-disc pl-5 space-y-3 text-gray-700 text-base">
                        <li>
                            **ความชัดเจน:** อธิบายวัตถุประสงค์ของการเดินทางอย่างเป็นทางการ
                        </li>
                        <li>
                            **ความน่าเชื่อถือ:** แสดงความรับผิดชอบและแผนการเดินทางที่รัดกุม
                        </li>
                        <li>
                            **การอ้างอิง:** ใช้จดหมายนี้อ้างอิงถึงเอกสารประกอบอื่น ๆ ทั้งหมด
                        </li>
                        <li>
                            **ข้อกำหนดสำคัญ:** สถานทูตส่วนใหญ่ถือว่า Cover Letter เป็นเอกสารสำคัญมาก
                        </li>
                    </ul>
                </div>

                <div className="p-6 bg-red-50 border-l-4 border-red-400 rounded-lg shadow-md">
                    <p className="font-bold text-red-800 mb-2">💡 คำแนะนำสำคัญ</p>
                    <p className="text-sm text-red-700">
                        จดหมายแนะนำตัวที่ดีควรระบุชื่อเอกสารที่แนบมาทั้งหมดอย่างครบถ้วน (Checklist) เพื่อให้เจ้าหน้าที่สามารถตรวจสอบได้ง่ายและรวดเร็ว
                    </p>
                </div>

            </div>
          </div>
        </div>
      </main>

      {/* 💡 ส่วนนี้จะถูก Render แต่ถูกซ่อนไว้ (opacity-0) เพื่อรอการเรียกใช้โดย html2pdf.js เท่านั้น */}
      {/* 💡 สำคัญ: ต้องใส่ id="cover-letter-content" ให้กับ Element ที่ต้องการแปลง */}
      <div 
        id="cover-letter-content" 
        className="fixed top-0 left-0 w-full h-full opacity-0 pointer-events-none -z-10"
      >
          <CoverLetterDocument data={formData} />
      </div>

      <Footer />
    </div>
  );
}

// 💡 Component Helpers for clean Input Group
interface InputGroupProps {
    label: string;
    name: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    type: string;
    icon: React.ElementType;
    disabled?: boolean;
    min?: number;
}

const InputGroup: React.FC<InputGroupProps> = ({ label, name, value, onChange, type, icon: Icon, disabled = false, min }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-1 flex items-center">
            <Icon className="w-4 h-4 mr-2 text-blue-500"/>
            {label}
        </label>
        <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            disabled={disabled}
            min={min}
            className={`block w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition duration-150 text-base ${disabled ? 'bg-gray-200 cursor-not-allowed' : 'bg-white'}`}
            required
        />
    </div>
);
