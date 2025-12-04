// lib/helpers.ts

/**
 * Basic email format validation
 * @param email 
 * @returns boolean
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Format date string for easy display on UI
 * @param dateString Date in ISO format (e.g., 2024-05-30T10:00:00.000Z)
 * @returns string (e.g., 30 พ.ค. 2567)
 */
export function formatDateForDisplay(dateString: string): string {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    // ใช้ 'th-TH' เพื่อให้ได้รูปแบบวันที่ภาษาไทย
    return date.toLocaleDateString('th-TH', options); 
  } catch (e) {
    console.error("Invalid date string:", dateString);
    return dateString;
  }
}

/**
 * Function to simulate delay (for testing Loading State)
 * @param ms Milliseconds to wait
 * @returns Promise
 */
export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

