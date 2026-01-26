import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { validateSession } from '@/lib/admin/session';

export default async function AdminRootPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('admin_session')?.value;

  // If no session cookie, redirect to login
  if (!sessionToken) {
    redirect('/admin/login');
  }

  // Validate session
  const session = await validateSession(sessionToken);

  // If session is invalid or expired, redirect to login
  if (!session) {
    redirect('/admin/login');
  }

  // If session is valid, redirect to dashboard
  redirect('/admin/dashboard');
}
