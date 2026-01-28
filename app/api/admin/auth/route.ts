import { NextRequest, NextResponse } from 'next/server';
import { generateSessionToken, createSession } from '@/lib/admin/session';

// Admin credentials from environment variables
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'changeme';

export async function POST(request: NextRequest) {
  console.log('[AUTH] Login request received');
  
  try {
    const body = await request.json();
    const { username, password } = body;
    
    console.log('[AUTH] Credentials received, validating...');

    // Validate credentials
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      console.log('[AUTH] Invalid credentials');
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    console.log('[AUTH] Credentials valid, generating session token...');
    // Generate session token
    const sessionToken = generateSessionToken();

    console.log('[AUTH] Creating session in database...');
    // Create session in database
    await createSession(sessionToken);
    
    console.log('[AUTH] Session created successfully');

    // Create response with cookie
    const response = NextResponse.json({ success: true });
    
    // Set HTTP-only cookie using NextResponse
    response.cookies.set('admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    console.log('[AUTH] Login successful, returning response');
    return response;
  } catch (error) {
    console.error('[AUTH] Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
