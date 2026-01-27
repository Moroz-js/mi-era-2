import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/client';
import { waitlistEmails } from '@/lib/db/schema';
import { desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    // Fetch all waitlist emails, sorted by newest first
    const emails = await db
      .select({
        email: waitlistEmails.email,
        createdAt: waitlistEmails.createdAt,
      })
      .from(waitlistEmails)
      .orderBy(desc(waitlistEmails.createdAt));

    // Generate CSV content
    const csvHeaders = 'email,signup_date\n';
    const csvRows = emails
      .map((row) => {
        const signupDate = row.createdAt.toISOString();
        return `${row.email},${signupDate}`;
      })
      .join('\n');

    const csvContent = csvHeaders + csvRows;

    // Return CSV file with appropriate headers
    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="waitlist-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error('Error exporting waitlist:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to export waitlist',
      },
      { status: 500 }
    );
  }
}
