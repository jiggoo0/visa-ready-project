// app/contact/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Send, CheckCircle2, AlertTriangle, Phone, MapPin } from 'lucide-react';

// 💡 แก้ไข: ใช้ declare const เพื่อบอกให้ TypeScript รู้จักฟังก์ชัน Global ของ Firebase
// ซึ่งจะช่วยให้ Build Process ผ่านไปได้โดยไม่มี Type Error เรื่อง Module Not Found
declare const initializeApp: (config: any) => any;
declare const getAuth: (app: any) => any;
declare const signInAnonymously: (auth: any) => any;
declare const onAuthStateChanged: (auth: any, callback: (user: any) => void) => void;
declare const getFirestore: (app: any) => any;
declare const collection: (db: any, path: string) => any;
declare const addDoc: (collectionRef: any, data: any) => Promise<void>;
declare const setLogLevel: (level: 'debug' | 'error' | 'silent') => void;

// 💡 Component Imports (Absolute Paths)
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Global variables (mocked/provided by environment)
declare const __app_id: string | undefined;
declare const __firebase_config: string | undefined;
declare const __initial_auth_token: string | undefined;

// --- Firebase Initialization and Submission Logic ---
let db: any;
let auth: any;
let userId: string | null = null;
let isAuthReady = false;

const initializeFirebase = async () => {
  try {
    const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
    const firebaseConfig = typeof __firebase_config !== 'undefined' 
      ? JSON.parse(__firebase_config) 
      : {}; 

    if (Object.keys(firebaseConfig).length === 0) {
      console.error("Firebase config is missing.");
      return;
    }

    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);

    setLogLevel('error');
    
    // Auth Listener
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        userId = user.uid;
      } else {
        // Sign in anonymously if no token is provided or listener fires without a user
        await signInAnonymously(auth);
        userId = auth.currentUser?.uid || crypto.randomUUID();
      }
      isAuthReady = true;
      console.log(`Firebase Auth Ready. User ID: ${userId}`);
    });

  } catch (error) {
    console.error("Error initializing Firebase or signing in:", error);
  }
};

interface ContactMessage {
    name: string;
    email: string;
    message: string;
}

// Function to submit message to Firestore
const submitContactMessageToFirestore = async (data: ContactMessage) => {
  if (!db || !userId) {
    console.error("Database not initialized or user not authenticated.");
    return { success: false, error: "Database not ready." };
  }

  const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
  
  // 💾 Path: /artifacts/{appId}/public/data/contact_messages
  const messagesCollectionRef = collection(db, `artifacts/${appId}/public/data/contact_messages`);

  try {
    await addDoc(messagesCollectionRef, {
      ...data,
      userId: userId, 
      timestamp: new Date().toISOString(),
      status: 'new'
    });
    return { success: true, error: null };
  } catch (error) {
    console.error("Error submitting contact message to Firestore:", error);
    return { success: false, error: (error as Error).message };
  }
};

// Simplified validation function
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// --- Contact Page Component ---
export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Initialize Firebase once
  useEffect(() => {
    // Check if initialization is needed and if the required functions are defined
    if (!db && typeof initializeApp !== 'undefined') {
        initializeFirebase();
    }
  }, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status === 'error') setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('กรุณากรอกข้อมูลให้ครบทุกช่อง');
      setStatus('error');
      return;
    }
    if (!isValidEmail(formData.email)) {
      setErrorMessage('รูปแบบอีเมลไม่ถูกต้อง');
      setStatus('error');
      return;
    }

    if (!isAuthReady) {
        setErrorMessage("ระบบกำลังเตรียมความพร้อมในการเชื่อมต่อ กรุณาลองใหม่อีกครั้งใน 1-2 วินาที");
        setStatus('error');
        return;
    }

    const { success, error } = await submitContactMessageToFirestore(formData);

    if (error) {
      setErrorMessage(`เกิดข้อผิดพลาดในการส่งข้อความ: ${error}`);
      setStatus('error');
    } else {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />

        <main className="flex-grow py-12 md:py-24">
            <div className="container mx-auto px-4 max-w-6xl">
                
                {/* Header */}
                <header className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                        ติดต่อทีมงาน VisaReady Docs
                    </h1>
                    <p className="text-xl text-gray-600">
                        เราพร้อมตอบทุกคำถามเกี่ยวกับเอกสารยื่นวีซ่าและการบริการของเรา
                    </p>
                </header>

                <div className="grid md:grid-cols-2 gap-10">
                    
                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-2xl shadow-xl border-t-8 border-blue-600">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">ส่งข้อความถึงเรา</h2>
                        
                        {/* Status Messages */}
                        {status === 'success' && (
                            <div className="flex items-center bg-green-100 text-green-700 p-4 rounded-xl mb-4 font-medium">
                                <CheckCircle2 className="w-6 h-6 mr-3" />
                                <span>ส่งข้อความสำเร็จ! เราจะตอบกลับทางอีเมลโดยเร็วที่สุด</span>
                            </div>
                        )}
                        {status === 'error' && errorMessage && (
                            <div className="flex items-center bg-red-100 text-red-700 p-4 rounded-xl mb-4 font-medium">
                                <AlertTriangle className="w-6 h-6 mr-3" />
                                <span>เกิดข้อผิดพลาด: {errorMessage}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    ชื่อ-นามสกุล
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    disabled={status === 'loading'}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                                    placeholder="ชื่อเต็มของคุณ"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    อีเมล (ที่ใช้รับเอกสาร)
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={status === 'loading'}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                                    placeholder="email@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                    ข้อความ/สอบถามรายละเอียด
                                </label>
                                <textarea
                                    name="message"
                                    id="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    disabled={status === 'loading'}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                                    placeholder="ฉันต้องการสอบถามเกี่ยวกับ..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full bg-blue-600 text-white px-4 py-2.5 rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition duration-150 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {status === 'loading' ? (
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5 mr-2" />
                                        ส่งข้อความ
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="bg-blue-600 p-8 rounded-2xl shadow-xl text-white flex flex-col justify-between">
                        <h2 className="text-2xl font-bold mb-6 border-b border-white/30 pb-2">ข้อมูลการติดต่อ</h2>
                        <div className="space-y-6 flex-grow">
                            <div className="flex items-center space-x-4">
                                <Mail className="w-6 h-6 text-yellow-400" />
                                <div>
                                    <p className="font-semibold">อีเมลฝ่ายสนับสนุน</p>
                                    <a href="mailto:support@visaready.com" className="hover:underline text-blue-100">support@visaready.com</a>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Phone className="w-6 h-6 text-yellow-400" />
                                <div>
                                    <p className="font-semibold">โทรศัพท์</p>
                                    <p className="text-blue-100">+66 89-xxx-xxxx (จันทร์-ศุกร์, 9:00 - 18:00 น.)</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <MapPin className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="font-semibold">ที่ตั้งสำนักงาน (จำลอง)</p>
                                    <p className="text-sm text-blue-100">VisaReady Co., Ltd. <br/>123/45 ถนนสีลม, เขตบางรัก, กรุงเทพฯ 10500</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 pt-4 border-t border-white/30">
                            <p className="text-sm font-light">เราจะตอบกลับข้อความทั้งหมดภายใน 4 ชั่วโมงทำการ</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <Footer />
    </div>
  );
}
