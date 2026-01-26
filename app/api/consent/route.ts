import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/client';
import { consentLogs } from '@/lib/db/schema';
import { randomUUID } from 'crypto';

interface ConsentRequest {
  analytics: boolean;
  sessionId?: string;
}

interface ConsentResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse<ConsentResponse>> {
  try {
    // Parse request body
    const body: ConsentRequest = await request.json();
    
    // Validate request
    if (typeof body.analytics !== 'boolean') {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request: analytics field must be a boolean',
        },
        { status: 400 }
      );
    }

    // Generate or use provided session ID
    const sessionId = body.sessionId || randomUUID();

    // Store consent in database
    await db.insert(consentLogs).values({
      sessionId,
      analytics: body.analytics,
      timestamp: new Date(),
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Consent logged successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error logging consent:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
