import { NextRequest, NextResponse } from 'next/server';
import { sendConfirmation } from '@/lib/email/service';

// RFC 5322 compliant email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

function validateEmail(email: string): boolean {
  if (!email || email.length < 5 || email.length > 255) {
    return false;
  }
  return EMAIL_REGEX.test(email);
}

interface WaitlistRequest {
  email: string;
}

interface WaitlistResponse {
  success: boolean;
  message: string;
  error?: string;
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: WaitlistRequest = await request.json();
    const { email } = body;

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json<WaitlistResponse>(
        {
          success: false,
          message: 'Invalid email format',
          error: 'Please enter a valid email address',
        },
        { status: 400 }
      );
    }

    // Normalize email (lowercase)
    const normalizedEmail = email.toLowerCase().trim();

    // Send confirmation email
    await sendConfirmation(normalizedEmail);

    return NextResponse.json<WaitlistResponse>(
      {
        success: true,
        message: 'Successfully joined the waitlist!',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Waitlist API error:', error);

    return NextResponse.json<WaitlistResponse>(
      {
        success: false,
        message: 'Internal server error',
        error: 'Something went wrong. Please try again.',
      },
      { status: 500 }
    );
  }
}
