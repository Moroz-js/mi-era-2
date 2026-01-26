import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/client';
import { waitlistEmails } from '@/lib/db/schema';
import { desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    // Fetch all waitlist emails, sorted by newest first
    const emails = await db
      .select({
        id: waitlistEmails.id,
        email: waitlistEmails.email,
        createdAt: waitlistEmails.createdAt,
        confirmed: waitlistEmails.confirmed,
      })
      .from(waitlistEmails)
      .orderBy(desc(waitlistEmails.createdAt));

    return NextResponse.json({
      success: true,
      emails: emails.map((email) => ({
        ...email,
        createdAt: email.createdAt.toISOString(),
      })),
    });
  } catch (error) {
    console.error('Error fetching waitlist emails:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch waitlist emails',
      },
      { status: 500 }
    );
  }
}
