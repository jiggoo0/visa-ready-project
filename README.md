VisaReady Docs ✈️🏨

ระบบสร้างเอกสารสำหรับการยื่นวีซ่า (Flight Itinerary & Hotel Booking)  
รองรับการใช้งานสำหรับเชงเก้น, ญี่ปุ่น, สหรัฐอเมริกา และประเทศอื่น ๆ  
โปรเจกต์นี้ถูกพัฒนาด้วย Next.js 14, Tailwind CSS, และ Firebase  

---

🚀 Features
- Hero Section: แสดงข้อมูลบริการหลัก
- ServiceCard: การ์ดบริการ (Flight, Hotel, Package)
- PricingCard: การ์ดราคา พร้อม CTA
- ReviewSlider: รีวิวลูกค้า (Swiper.js)
- About Section: ข้อมูลบริษัท
- Contact Page: ฟอร์มติดต่อ + ข้อมูลการติดต่อ
- Footer: ลิงก์บริการ, ข้อมูลบริษัท, Disclaimer, Social Links
- Widget: Floating Contact Widget (Facebook, Line, Email, CTA)

---

📂 Project Structure
`
visa-ready-project/
├── app/
│   ├── page.tsx          # หน้า Home
│   ├── contact/page.tsx  # หน้า Contact
│   └── globals.css       # Global styles
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── ServiceCard.tsx
│   ├── PricingCard.tsx
│   ├── Review.tsx
│   ├── ReviewSlider.tsx
│   ├── About.tsx
│   └── Widget.tsx
├── mock/
│   └── reviews.ts        # ข้อมูลรีวิวจำลอง
├── public/               # Static assets
└── README.md
`

---

⚙️ Installation & Setup

1. Clone Project
`bash
git clone https://github.com/your-username/visa-ready-project.git
cd visa-ready-project
`

2. Install Dependencies
`bash
npm install

หรือ
yarn install
`

3. Run Development Server
`bash
npm run dev
`
เปิดที่ http://localhost:3000

---

🔑 Environment Variables
สร้างไฟล์ .env.local และกำหนดค่า Firebase:

`env
NEXTPUBLICFIREBASEAPIKEY=xxxx
NEXTPUBLICFIREBASEAUTHDOMAIN=xxxx
NEXTPUBLICFIREBASEPROJECTID=xxxx
NEXTPUBLICFIREBASESTORAGEBUCKET=xxxx
NEXTPUBLICFIREBASEMESSAGINGSENDER_ID=xxxx
NEXTPUBLICFIREBASEAPPID=xxxx
`

---

🛠️ Tech Stack
- Next.js 14 – React Framework
- Tailwind CSS – Utility-first CSS
- Lucide Icons – Modern SVG Icons
- Swiper.js – รีวิว Slider
- Firebase – Auth + Firestore

---

📱 Widget
Floating Contact Widget อยู่มุมขวาล่าง  
- Facebook Page: VisaReady Docs  
- Line Office: @722zmmxy  
- Email Support: support@visaready.com  
- CTA: "สร้างเอกสารทันที" → /services

---

⚠️ Disclaimer
เอกสารจาก VisaReady Docs ใช้สำหรับการยื่นคำร้องขอวีซ่าเท่านั้น  
ไม่สามารถใช้แทนตั๋วเครื่องบินหรือการจองโรงแรมจริงได้  
ทุกเอกสารจะมี Watermark:  
FOR VISA ONLY - NOT A REAL BOOKING

---

📄 License
MIT License © 2025 VisaReady Docs
`
