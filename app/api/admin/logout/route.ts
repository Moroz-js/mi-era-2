import { NextRequest, NextResponse } from 'next/server';
import { deleteSession } from '@/lib/admin/session';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('admin_session')?.value;

    if (sessionToken) {
      // Delete session from database
      await deleteSession(sessionToken);
    }

    // Clear cookie
    cookieStore.delete('admin_session');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admin logout error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
