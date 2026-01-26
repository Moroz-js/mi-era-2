import { cookies } from 'next/headers';
import { validateSession } from './session';

/**
 * Get the current admin session from cookies
 * This function is meant to be used in Server Components
 * @returns The session object if valid, null otherwise
 */
export async function getAdminSession() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('admin_session')?.value;

  if (!sessionToken) {
    return null;
  }

  try {
    const session = await validateSession(sessionToken);
    return session;
  } catch (error) {
    console.error('Error validating session:', error);
    return null;
  }
}
