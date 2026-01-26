import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getAdminSession } from '@/lib/admin/auth';
import { db } from '@/lib/db/client';
import { blogPosts, waitlistEmails } from '@/lib/db/schema';
import { eq, count } from 'drizzle-orm';

async function getDashboardStats() {
  try {
    // Get total blog posts
    const totalPostsResult = await db.select({ count: count() }).from(blogPosts);
    const totalPosts = totalPostsResult[0]?.count || 0;

    // Get draft posts count
    const draftPostsResult = await db
      .select({ count: count() })
      .from(blogPosts)
      .where(eq(blogPosts.status, 'draft'));
    const draftPosts = draftPostsResult[0]?.count || 0;

    // Get published posts count
    const publishedPostsResult = await db
      .select({ count: count() })
      .from(blogPosts)
      .where(eq(blogPosts.status, 'published'));
    const publishedPosts = publishedPostsResult[0]?.count || 0;

    // Get waitlist count
    const waitlistResult = await db.select({ count: count() }).from(waitlistEmails);
    const waitlistCount = waitlistResult[0]?.count || 0;

    return {
      totalPosts,
      draftPosts,
      publishedPosts,
      waitlistCount,
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      totalPosts: 0,
      draftPosts: 0,
      publishedPosts: 0,
      waitlistCount: 0,
    };
  }
}

export default async function AdminDashboardPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect('/admin/login');
  }

  const stats = await getDashboardStats();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to the mi-Era admin panel</p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Posts</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalPosts}</p>
            </div>
            <div className="text-4xl">📝</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Draft Posts</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.draftPosts}</p>
            </div>
            <div className="text-4xl">✏️</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Published Posts</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{stats.publishedPosts}</p>
            </div>
            <div className="text-4xl">✅</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Waitlist Signups</p>
              <p className="text-3xl font-bold text-brand-violet mt-2">{stats.waitlistCount}</p>
            </div>
            <div className="text-4xl">📧</div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/admin/blog/new"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-brand-violet hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl">➕</span>
            <div>
              <p className="font-medium text-gray-900">Create New Post</p>
              <p className="text-sm text-gray-600">Write a new blog post</p>
            </div>
          </Link>

          <Link
            href="/admin/blog"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-brand-violet hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl">📝</span>
            <div>
              <p className="font-medium text-gray-900">Manage Blog Posts</p>
              <p className="text-sm text-gray-600">View and edit all posts</p>
            </div>
          </Link>

          <Link
            href="/admin/pages/about"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-brand-violet hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl">📄</span>
            <div>
              <p className="font-medium text-gray-900">Edit Pages</p>
              <p className="text-sm text-gray-600">Update static pages</p>
            </div>
          </Link>

          <Link
            href="/admin/waitlist"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-brand-violet hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl">📧</span>
            <div>
              <p className="font-medium text-gray-900">View Waitlist</p>
              <p className="text-sm text-gray-600">Manage email signups</p>
            </div>
          </Link>

          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-brand-violet hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl">🌐</span>
            <div>
              <p className="font-medium text-gray-900">View Public Site</p>
              <p className="text-sm text-gray-600">Open landing page</p>
            </div>
          </Link>

          <Link
            href="/blog"
            target="_blank"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-brand-violet hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl">📰</span>
            <div>
              <p className="font-medium text-gray-900">View Public Blog</p>
              <p className="text-sm text-gray-600">See published posts</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Session Info */}
      <div className="mt-6 bg-gray-100 rounded-lg p-4">
        <p className="text-sm text-gray-600">
          Session expires: <span className="font-medium">{new Date(session.expiresAt).toLocaleString()}</span>
        </p>
      </div>
    </div>
  );
}
