สร้าง Web App ด้วย Next.js + Supabase สำหรับระบบคีย์หวย 2 ตัว / 3 ตัว พร้อมฟีเจอร์ครบถ้วนดังนี้:


---

1️⃣ Database Schema (Supabase)

Table: members

id uuid primary key
name text
balance int default 0
created_at timestamp default now()

Table: lotto_entries

id uuid primary key
member_id uuid references members(id)
type text check (type in ('2digit','3digit'))
number text
amount int
created_at timestamp default now()


---

2️⃣ API Routes

POST /api/lotto/add

เพิ่มรายการหวย

Validation:

type = '2digit' หรือ '3digit'

number: 2 ตัว = 00–99, 3 ตัว = 000–999

amount > 0

member_id ต้องมีอยู่ใน members


อัพเดต balance ของ member


GET /api/lotto/list

ดึงรายการทั้งหมด

Optional: filter by date / member / type


GET /api/lotto/summary

สรุปยอดรวม:

ยอดเงินรวมทั้งหมด

ยอดรวมต่อสมาชิก

ยอดรวมต่อเลข

ยอดรวมต่อวัน / เดือน / สัปดาห์





---

3️⃣ UI Components

LottoForm

เลือก member (auto-complete จาก members)

เลือก type (2digit / 3digit)

ใส่ number

ใส่ amount

Submit → POST /api/lotto/add

Confirmation modal ก่อน submit


LottoTable

ตารางแสดงรายการล่าสุด

Filter: date / member / type

Edit / Delete สำหรับ admin


LottoSummary

ยอดรวมทั้งหมด

ยอดรวม per-member

ยอดรวม per-number

Export CSV / Excel



---

4️⃣ Validation & Security

ตรวจเลข, ยอดเงิน, member

ป้องกันกรอกซ้ำ, SQL injection, XSS

Auth สำหรับ admin / staff

จำกัดสิทธิ์แก้ไข / ลบรายการ



---

5️⃣ Project Structure

/app
  /api/lotto
    add.ts
    list.ts
    summary.ts
  /components
    LottoForm.tsx
    LottoTable.tsx
    LottoSummary.tsx
/lib
  supabaseClient.ts
/pages
  index.tsx
.env


---

6️⃣ Extras

Batch entry: ใส่หลายเลขพร้อมกัน

Undo / history log

แจ้งเตือนเมื่อยอดใกล้ปิดรับ

Responsive UI (มือถือ/desktop)



---

7️⃣ Instructions for AI Output

Generate full Next.js project

Include Supabase integration

Include validation, auth, and summary calculations

Provide README with:

วิธี config .env

วิธี run locally

วิธี deploy


