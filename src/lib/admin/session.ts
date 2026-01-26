import { db } from '../db/client';
import { adminSessions } from '../db/schema';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';

/**
 * Generate a secure random session token
 * @returns Base64-encoded 32-byte random string
 */
export function generateSessionToken(): string {
  const buffer = crypto.randomBytes(32);
  return buffer.toString('base64');
}

/**
 * Create a new admin session in the database
 * @param sessionToken - The session token to store
 * @returns The created session object
 */
export async function createSession(sessionToken: string) {
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24); // 24-hour expiration

  const [session] = await db
    .insert(adminSessions)
    .values({
      sessionToken,
      expiresAt,
    })
    .returning();

  return session;
}

/**
 * Validate a session token
 * @param sessionToken - The session token to validate
 * @returns The session object if valid, null otherwise
 */
export async function validateSession(sessionToken: string) {
  const [session] = await db
    .select()
    .from(adminSessions)
    .where(eq(adminSessions.sessionToken, sessionToken))
    .limit(1);

  if (!session) {
    return null;
  }

  // Check if session has expired
  if (new Date() > session.expiresAt) {
    // Delete expired session
    await db
      .delete(adminSessions)
      .where(eq(adminSessions.sessionToken, sessionToken));
    return null;
  }

  return session;
}

/**
 * Delete a session from the database
 * @param sessionToken - The session token to delete
 */
export async function deleteSession(sessionToken: string) {
  await db
    .delete(adminSessions)
    .where(eq(adminSessions.sessionToken, sessionToken));
}

/**
 * Clean up expired sessions from the database
 */
export async function cleanupExpiredSessions() {
  const now = new Date();
  await db
    .delete(adminSessions)
    .where(eq(adminSessions.expiresAt, now));
}
