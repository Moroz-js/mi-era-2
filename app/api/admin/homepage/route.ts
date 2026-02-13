import { NextResponse } from 'next/server';
import { db } from '@/lib/db/client';
import { homepageSections } from '@/lib/db/schema';

/**
 * GET /api/admin/homepage
 * Returns all homepage sections as an object keyed by section_key
 */
export async function GET() {
  try {
    const sections = await db.select().from(homepageSections);
    
    // Convert array to object keyed by sectionKey for easier access
    const sectionsMap = sections.reduce((acc, section) => {
      acc[section.sectionKey] = section.content;
      return acc;
    }, {} as Record<string, any>);
    
    return NextResponse.json({
      success: true,
      sections: sectionsMap,
    });
  } catch (error) {
    console.error('Error fetching homepage sections:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch homepage sections' },
      { status: 500 }
    );
  }
}
