// lib/supabaseClient.ts

/**
 * NOTE: This is a MOCK implementation for the Website Builder.
 * In a real Next.js application, you would configure Supabase or Firebase
 * using environment variables and server-side logic for security.
 */

interface ContactData {
  name: string;
  email: string;
  message: string;
}

/**
 * Simulates submitting a contact message to a backend service.
 * @param data Contact data (name, email, message)
 */
export async function submitContactMessage(data: ContactData): Promise<{ success: boolean; error: string | null }> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800)); 

  console.log("MOCK: Submitting contact message...", data);

  if (!data.name || !data.email || !data.message) {
    return { success: false, error: 'All fields are required.' };
  }
  
  // Simulate successful submission
  if (data.email.includes('error')) {
    return { success: false, error: 'Simulated database submission failure.' };
  }

  return { success: true, error: null };
}