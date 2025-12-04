import { servicesData } from '@/data/servicesData';

/**
 * สร้าง mapping อัตโนมัติจาก servicesData
 * key = linkHref จาก servicesData
 * value = path สำหรับ checkout/preview
 */
const planMap: Record<string, string> = servicesData.reduce((acc, service) => {
  // ถ้า linkHref มีคำว่า flight → map ไป /flight-checkout
  // ถ้า linkHref มีคำว่า hotel → map ไป /hotel-checkout
  // ถ้า linkHref มีคำว่า dual/package → map ไป /dual-package-preview
  // กรณีอื่น → map ไป checkout ตามชื่อ folder ปัจจุบัน
  let target = '/services'; // default fallback

  const normalized = service.linkHref.toLowerCase();
  if (normalized.includes('flight')) target = '/flight-checkout';
  else if (normalized.includes('hotel') || normalized.includes('visa')) target = '/hotel-checkout';
  else if (normalized.includes('dual') || normalized.includes('bundle')) target = '/dual-package-preview';
  else if (normalized.includes('letter')) target = '/letter-service';

  acc[service.linkHref] = target;
  return acc;
}, {} as Record<string, string>);

/**
 * คืนค่า checkout link จาก linkHref ของ service
 */
export const getCheckoutLink = (linkHref: string) => {
  if (planMap[linkHref]) return planMap[linkHref];

  console.warn(`Unknown plan identifier: ${linkHref}. Falling back to /services.`);
  return '/services';
};