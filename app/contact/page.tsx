// app/contact/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import {
  Mail,
  Send,
  CheckCircle2,
  AlertTriangle,
  Phone,
  MapPin,
  Facebook,
  MessageSquare,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

declare const initializeApp: (config: any) => any;
declare const getAuth: (app: any) => any;
declare const signInAnonymously: (auth: any) => any;
declare const onAuthStateChanged: (auth: any, callback: (user: any) => void) => void;
declare const getFirestore: (app: any) => any;
declare const collection: (db: any, path: string) => any;
declare const addDoc: (collectionRef: any, data: any) => Promise<void>;
declare const setLogLevel: (level: 'debug' | 'error' | 'silent') => void;

declare const __app_id: string | undefined;
declare const __firebase_config: string | undefined;

let db: any;
let auth: any;
let userId: string | null = null;
let isAuthReady = false;

const initializeFirebase = async () => {
  try {
    const firebaseConfig =
      typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
    if (Object.keys(firebaseConfig).length === 0) return;

    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    setLogLevel('error');

    onAuthStateChanged(auth, async (user) => {
      if (user) userId = user.uid;
      else {
        await signInAnonymously(auth);
        userId = auth.currentUser?.uid || crypto.randomUUID();
      }
      isAuthReady = true;
    });
  } catch (error) {
    console.error('Firebase init error:', error);
  }
};

interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

const submitContactMessageToFirestore = async (data: ContactMessage) => {
  if (!db || !userId) return { success: false, error: 'Database not ready.' };
  const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
  const messagesCollectionRef = collection(
    db,
    `artifacts/${appId}/public/data/contact_messages`
  );
  try {
    await addDoc(messagesCollectionRef, {
      ...data,
      userId,
      timestamp: new Date().toISOString(),
      status: 'new',
    });
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
};

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!db && typeof initializeApp !== 'undefined') initializeFirebase();
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
      setErrorMessage('ระบบกำลังเตรียมความพร้อม กรุณาลองใหม่อีกครั้ง');
      setStatus('error');
      return;
    }

    const { success, error } = await submitContactMessageToFirestore(formData);
    if (error) {
      setErrorMessage(`เกิดข้อผิดพลาด: ${error}`);
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
          {/* Page Header */}
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              ติดต่อทีมงาน VisaReady Docs
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              เราพร้อมตอบทุกคำถามเกี่ยวกับเอกสารยื่นวีซ่าและการบริการของเรา
            </p>
          </header>

          <div className="flex flex-col md:flex-row gap-10">
            {/* Contact Form */}
            <div className="flex-1 bg-white p-8 rounded-2xl shadow-lg border-t-8 border-green-600 transition hover:shadow-xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">ส่งข้อความถึงเรา</h2>

              {status === 'success' && (
                <div className="flex items-center bg-green-100 text-green-700 p-4 rounded-lg mb-4 font-medium">
                  <CheckCircle2 className="w-6 h-6 mr-3" />
                  <span>ส่งข้อความสำเร็จ! เราจะตอบกลับทางอีเมลโดยเร็วที่สุด</span>
                </div>
              )}
              {status === 'error' && errorMessage && (
                <div className="flex items-center bg-red-100 text-red-700 p-4 rounded-lg mb-4 font-medium">
                  <AlertTriangle className="w-6 h-6 mr-3" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="ชื่อเต็ม"
                  disabled={status === 'loading'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="อีเมล"
                  disabled={status === 'loading'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="ข้อความ/สอบถาม"
                  rows={5}
                  disabled={status === 'loading'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-green-600 text-white px-4 py-3 rounded-lg font-semibold shadow-md hover:bg-green-700 transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <span>กำลังส่ง...</span>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" /> ส่งข้อความ
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="flex-1 bg-green-600 p-8 rounded-2xl shadow-lg text-white flex flex-col justify-between transition hover:shadow-xl">
              <h2 className="text-2xl font-bold mb-6 border-b border-white/30 pb-2">
                ข้อมูลการติดต่อ
              </h2>
              <div className="space-y-6 flex-grow">
                <ContactItem
                  icon={<Facebook className="w-6 h-6 text-yellow-400" />}
                  title="Facebook Page"
                  value="VisaReady Docs"
                  link="https://www.facebook.com/profile.php?id=61584701997780"
                />
                <ContactItem
                  icon={<MessageSquare className="w-6 h-6 text-yellow-400" />}
                  title="Line Office"
                  value="@722zmmxy"
                  link="https://lin.ee/UKkHyTL"
                />
                <ContactItem
                  icon={<Mail className="w-6 h-6 text-yellow-400" />}
                  title="อีเมลฝ่ายสนับสนุน"
                  value="support@visaready.com"
                  link="mailto:support@visaready.com"
                />
                <ContactItem
                  icon={<Phone className="w-6 h-6 text-yellow-400" />}
                  title="โทรศัพท์"
                  value="+66 89-xxx-xxxx"
                  desc="จันทร์-ศุกร์, 9:00 - 18:00 น."
                />
                <ContactItem
                  icon={<MapPin className="w-6 h-6 text-yellow-400" />}
                  title="ที่ตั้งสำนักงาน"
                  value="VisaReady Co., Ltd."
                  desc="123/45 ถนนสีลม, เขตบางรัก, กรุงเทพฯ 10500"
                />
              </div>
              <p className="mt-8 pt-4 border-t border-white/30 text-sm font-light">
                เราจะตอบกลับข้อความทั้งหมดภายใน 4 ชั่วโมงทำการ
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// --- Contact Item Component ---
interface ContactItemProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  desc?: string;
  link?: string;
}

function ContactItem({ icon, title, value, desc, link }: ContactItemProps) {
  return (
    <div className="flex items-start space-x-4">
      {icon}
      <div>
        <p className="font-semibold">{title}</p>
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {value}
          </a>
        ) : (
          <p>{value}</p>
        )}
        {desc && <p className="text-sm">{desc}</p>}
      </div>
    </div>
  );
}