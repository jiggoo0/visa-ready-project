'use client';

import React, { useState, useEffect, Suspense } from 'react'; // 💡 เพิ่ม Suspense
import { useSearchParams } from 'next/navigation';
import { Plane, Hotel, CheckCircle2, CreditCard, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// ข้อมูลแผนบริการและราคา
const PricingData = {
    flight: { name: 'ตั๋วเครื่องบินเดี่ยว', price: 590, icon: Plane },
    hotel: { name: 'โรงแรมเดี่ยว', price: 490, icon: Hotel },
    bundle: { name: 'แพ็กเกจคู่ (ตั๋ว+โรงแรม)', price: 990, icon: CheckCircle2 },
};

// ข้อมูลสำหรับ Service (ใช้ในกรณีที่ลิงก์มาจาก /services โดยไม่มี plan)
const ServiceData = {
    flight: PricingData.flight,
    hotel: PricingData.hotel,
};

// ประเภทข้อมูลที่ใช้แสดงในหน้าสรุป
interface ItemDetail {
    name: string;
    price: number;
    icon: React.ElementType;
}

// 1. คอมโพเนนต์ที่ใช้ Client Hook (useSearchParams) ซึ่งจะต้องอยู่ภายใน Suspense
function CheckoutLogic() {
    // 🟢 useSearchParams ถูกเรียกภายในคอมโพเนนต์ที่อยู่ภายใต้ Suspense
    const searchParams = useSearchParams();
    const planParam = searchParams.get('plan');
    const serviceParam = searchParams.get('service');
    
    const [selectedItem, setSelectedItem] = useState<ItemDetail | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        applicantName: '',
        passportNumber: '',
        travelDates: '',
        contactEmail: '',
    });

    useEffect(() => {
        let item: ItemDetail | null = null;
        // ตรวจสอบ Plan ก่อน (มีความแม่นยำสูงกว่า)
        if (planParam && PricingData[planParam as keyof typeof PricingData]) {
            item = PricingData[planParam as keyof typeof PricingData];
        } 
        // ตรวจสอบ Service หากไม่มี Plan
        else if (serviceParam && ServiceData[serviceParam as keyof typeof ServiceData]) {
            item = ServiceData[serviceParam as keyof typeof ServiceData];
        }
        
        setSelectedItem(item);
    }, [planParam, serviceParam]);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePaymentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        // MOCK PAYMENT AND SUBMISSION LOGIC
        console.log("Submitting Order:", selectedItem, formData);
        
        // Simulate API call delay
        setTimeout(() => {
            setIsLoading(false);
            // 🚨 แก้ไข: เปลี่ยน alert() เป็น console.log/UI message
            console.log('Mock Submission: ข้อมูลถูกส่งสำเร็จ! โปรดรอหน้าการชำระเงินจริง');
            // ในการใช้งานจริง: Redirect ไปหน้า Payment Gateway หรือแสดง UI success message
        }, 1500);
    };

    // หากยังโหลดข้อมูลไม่เสร็จ หรือไม่มีรายการที่เลือก
    if (!selectedItem) {
        return (
            <div className="bg-white p-6 rounded-xl shadow-2xl border-t-8 border-primary-green space-y-8 text-center py-20">
                <Loader2 className="w-10 h-10 text-primary-green animate-spin mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-gray-800">กำลังเตรียมหน้าชำระเงิน...</h1>
                <p className="text-gray-500 mt-4">กรุณาตรวจสอบว่าคุณเลือกบริการจากหน้า <Link href="/pricing" className="text-accent-gold hover:underline">ราคาสินค้า</Link> หรือไม่</p>
                <Link href="/pricing" className="mt-6 inline-flex items-center text-sm font-semibold text-primary-green hover:text-accent-gold transition">
                    <ArrowLeft className="w-4 h-4 mr-1" /> กลับไปเลือกแพ็กเกจ
                </Link>
            </div>
        );
    }

    const ItemIcon = selectedItem.icon;

    return (
        <div className="bg-white p-6 rounded-xl shadow-2xl border-t-8 border-primary-green space-y-8">
                
            {/* 1. Order Summary */}
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4">
                    <CreditCard className="w-6 h-6 mr-2 text-accent-gold" />
                    สรุปรายการที่สั่งซื้อ
                </h2>
                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-3">
                        <ItemIcon className="w-6 h-6 text-primary-green" />
                        <span className="text-lg font-semibold text-gray-700">{selectedItem.name}</span>
                    </div>
                    <span className="text-2xl font-extrabold text-accent-gold">{selectedItem.price.toLocaleString()} THB</span>
                </div>
            </div>

            {/* 2. Document Information Form */}
            <form onSubmit={handlePaymentSubmit} className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
                    รายละเอียดสำหรับสร้างเอกสาร
                </h2>

                <div>
                    <label htmlFor="applicantName" className="block text-sm font-medium text-gray-700 mb-1">ชื่อ-นามสกุล (ตามหน้าพาสปอร์ต)</label>
                    <input
                        type="text"
                        name="applicantName"
                        id="applicantName"
                        value={formData.applicantName}
                        onChange={handleFormChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-primary-green focus:ring-primary-green"
                        placeholder="MR. SOMCHAI JAI DEE"
                    />
                </div>
                
                <div>
                    <label htmlFor="passportNumber" className="block text-sm font-medium text-gray-700 mb-1">หมายเลขพาสปอร์ต (ไม่บังคับ แต่ช่วยเพิ่มความน่าเชื่อถือ)</label>
                    <input
                        type="text"
                        name="passportNumber"
                        id="passportNumber"
                        value={formData.passportNumber}
                        onChange={handleFormChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-primary-green focus:ring-primary-green"
                        placeholder="A12345678"
                    />
                </div>

                <div>
                    <label htmlFor="travelDates" className="block text-sm font-medium text-gray-700 mb-1">วันเดินทาง (ไป - กลับ) หรือ วันเข้าพัก</label>
                    <input
                        type="text"
                        name="travelDates"
                        id="travelDates"
                        value={formData.travelDates}
                        onChange={handleFormChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-primary-green focus:ring-primary-green"
                        placeholder="2026-03-15 ถึง 2026-03-30"
                    />
                </div>
                
                <div>
                    <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">อีเมลติดต่อ (ใช้สำหรับรับไฟล์ PDF)</label>
                    <input
                        type="email"
                        name="contactEmail"
                        id="contactEmail"
                        value={formData.contactEmail}
                        onChange={handleFormChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-primary-green focus:ring-primary-green"
                        placeholder="youremail@domain.com"
                    />
                </div>

                {/* 3. Final Disclaimer and CTA */}
                <div className="bg-yellow-50 border-l-4 border-accent-gold p-4 rounded-lg text-sm text-gray-800">
                    <p className="font-bold mb-1">⚠️ ข้อจำกัดความรับผิดชอบ:</p>
                    <p>ข้าพเจ้ายืนยันว่าเข้าใจและยอมรับว่าเอกสารนี้เป็นเพียง **เอกสารจำลอง** สำหรับยื่นวีซ่าเท่านั้น ไม่สามารถใช้เพื่อการเดินทางจริง และได้ตรวจสอบข้อมูลข้างต้นถูกต้องแล้ว</p>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    // 💡 ปรับ Tailwind class สำหรับปุ่มให้ดูดีและใช้งานได้
                    className="w-full text-xl py-3 disabled:opacity-70 flex items-center justify-center bg-primary-green hover:bg-green-700 text-white font-bold rounded-lg shadow-md transition" 
                >
                    {isLoading ? (
                        <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                    ) : (
                        <CreditCard className="w-6 h-6 mr-2" />
                    )}
                    ดำเนินการชำระเงิน {selectedItem.price.toLocaleString()} บาท
                </button>
                
            </form>
        </div>
    );
}

// 2. Page Component หลัก (Default Export) ที่ห่อหุ้ม logic ด้วย Suspense
export default function CheckoutPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <header className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">ยืนยันคำสั่งซื้อ</h1>
                <p className="text-xl text-gray-600">ขั้นตอนสุดท้ายในการสร้างเอกสารยื่นวีซ่าของคุณ</p>
            </header>

            {/* 3. ห่อคอมโพเนนต์ที่ใช้ Client Hook ด้วย Suspense */}
            <Suspense fallback={
                <div className="bg-white p-6 rounded-xl shadow-2xl border-t-8 border-primary-green space-y-8 text-center py-20">
                    <Loader2 className="w-10 h-10 text-primary-green animate-spin mx-auto mb-4" />
                    <p className="text-xl font-medium text-gray-600">กำลังโหลดข้อมูลการสั่งซื้อและพารามิเตอร์ URL...</p>
                    <Link href="/pricing" className="mt-6 inline-flex items-center text-sm font-semibold text-primary-green hover:text-accent-gold transition">
                        <ArrowLeft className="w-4 h-4 mr-1" /> หากไม่โหลด กรุณากลับไปเลือกแพ็กเกจ
                    </Link>
                </div>
            }>
                <CheckoutLogic />
            </Suspense>
        </div>
    );
}