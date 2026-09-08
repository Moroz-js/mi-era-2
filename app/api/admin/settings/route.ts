import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db/client';
import { homepageSections } from '@/lib/db/schema';
import { validateSession } from '@/lib/admin/session';
import {
  DEFAULT_SITE_CTA,
  SITE_CTA_KEY,
  normalizeSiteCta,
} from '@/lib/site-cta';

async function requireAdmin() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('admin_session')?.value;

  if (!sessionToken) {
    return false;
  }

  return validateSession(sessionToken);
}

export async function GET() {
  try {
    const isAdmin = await requireAdmin();
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const [section] = await db
      .select()
      .from(homepageSections)
      .where(eq(homepageSections.sectionKey, SITE_CTA_KEY));

    return NextResponse.json({
      success: true,
      settings: section ? normalizeSiteCta(section.content) : DEFAULT_SITE_CTA,
    });
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return NextResponse.json({
      success: true,
      settings: DEFAULT_SITE_CTA,
    });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const isAdmin = await requireAdmin();
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const settings = normalizeSiteCta(body);

    if (!body?.ctaText?.trim() || !body?.ctaLink?.trim()) {
      return NextResponse.json(
        { success: false, error: 'CTA text and CTA link are required' },
        { status: 400 }
      );
    }

    try {
      new URL(settings.ctaLink);
    } catch {
      return NextResponse.json(
        { success: false, error: 'CTA link must be a valid URL' },
        { status: 400 }
      );
    }

    const [existing] = await db
      .select()
      .from(homepageSections)
      .where(eq(homepageSections.sectionKey, SITE_CTA_KEY));

    if (existing) {
      await db
        .update(homepageSections)
        .set({
          content: settings,
          updatedAt: new Date(),
        })
        .where(eq(homepageSections.sectionKey, SITE_CTA_KEY));
    } else {
      await db.insert(homepageSections).values({
        sectionKey: SITE_CTA_KEY,
        content: settings,
      });
    }

    revalidatePath('/', 'layout');

    return NextResponse.json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error('Error updating site settings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}
