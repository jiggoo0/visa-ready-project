import { generatePDF, DocumentData } from './pdfGenerator';

// โครงสร้างข้อมูลสำหรับลูกค้า
interface CustomerInfo {
  name: string;
  email: string;
  passport?: string;
  travelDates?: string;
}

// โครงสร้างข้อมูลสำหรับรายการสินค้า
interface OrderItem {
  itemId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  docType: string; // ประเภทของเอกสารที่ต้องสร้าง
}

// โครงสร้างข้อมูลใบสั่งซื้อ
interface Order {
  orderId: string;
  issueDate: string;
  status: 'AWAITING_PAYMENT' | 'PAID' | 'COMPLETED' | 'CANCELLED';
  customer: CustomerInfo;
  items: OrderItem[];
  totalAmount: number;
}

/**
 * สร้าง Order ID แบบง่าย: ORD-YYYYMMDD-HHMMSS-XXX
 */
function generateOrderId(): string {
  const now = new Date();
  const datePart = now.toISOString().slice(0, 10).replace(/-/g, ''); 
  const timePart = now.toTimeString().slice(0, 8).replace(/:/g, ''); 
  const randomPart = Math.floor(Math.random() * 1000).toString().padStart(3, '0'); 
  return `ORD-${datePart}-${timePart}-${randomPart}`;
}

/**
 * ฟังก์ชันหลักในการประมวลผลและสร้างใบสั่งซื้อ
 */
export async function createPurchaseOrder(customer: CustomerInfo, cartItems: OrderItem[]): Promise<Order | null> {
  console.log("Starting purchase order creation...");

  if (cartItems.length === 0) {
    console.error("Cart is empty. Cannot create order.");
    return null;
  }

  const totalAmount = cartItems.reduce((sum, item) => sum + item.total, 0);

  const newOrder: Order = {
    orderId: generateOrderId(),
    issueDate: new Date().toISOString(),
    status: 'AWAITING_PAYMENT',
    customer: customer,
    items: cartItems,
    totalAmount: totalAmount,
  };

  try {
    // 3. จำลองการจัดเก็บข้อมูลในฐานข้อมูล/Service ภายนอก

    // 4. สร้างเอกสารที่เกี่ยวข้อง
    for (const item of cartItems) {
      // ตรวจสอบ docType และแปลงเป็น DocumentData
      const documentType = item.docType.includes('flight') ? 'FLIGHT' : item.docType.includes('hotel') ? 'HOTEL' : 'PACKAGE';
      
      const documentData: DocumentData = {
        type: documentType as 'FLIGHT' | 'HOTEL' | 'PACKAGE',
        title: item.description,
        applicantName: customer.name,
        details: [
          `Service ID: ${item.itemId}`,
          `Price: ${item.unitPrice.toLocaleString()} THB`,
          `Travel Dates: ${customer.travelDates || 'N/A'}`,
          `Passport Number: ${customer.passport || 'N/A'}`
        ]
      };

      // 💡 เรียกใช้ generatePDF จริงๆ และรับ Uint8Array กลับมา
      const pdfBytes = await generatePDF(documentData);
      
      // แปลงเป็น Base64 (ถ้าต้องการใช้ใน Client-side) หรือบันทึก/ส่งต่อ
      const pdfBase64 = Buffer.from(pdfBytes).toString('base64');
      
      console.log(`[Document Gen] PDF Base64 generated for ${item.docType}. Size: ${pdfBase64.length} bytes`);
    }

    console.log(`Successfully created Order ID: ${newOrder.orderId}`);
    
    return newOrder;

  } catch (error) {
    console.error("Error during order processing:", error);
    return null;
  }
}