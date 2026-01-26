'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import PageEditor from '@/components/admin/PageEditor';

interface StaticPage {
  id: number;
  slug: string;
  title: string;
  content: string;
  updatedAt: Date;
}

export default function EditPagePage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const [page, setPage] = useState<StaticPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch page data
  useEffect(() => {
    async function fetchPage() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/admin/pages/${slug}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch page');
        }

        setPage({
          ...data.page,
          updatedAt: new Date(data.page.updatedAt),
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load page');
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchPage();
    }
  }, [slug]);

  // Handle save
  const handleSave = async (data: { title: string; content: string }) => {
    try {
      const response = await fetch(`/api/admin/pages/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to save page');
      }

      // Redirect on success (toast will show from PageEditor)
      router.push('/admin/dashboard');
    } catch (err) {
      throw err; // Let PageEditor handle the error display
    }
  };

  // Handle cancel
  const handleCancel = () => {
    router.push('/admin/dashboard');
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-brand-violet"></div>
          <p className="mt-4 text-gray-600">Loading page...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-medium">Error</p>
          <p>{error}</p>
        </div>
        <button
          onClick={() => router.push('/admin/dashboard')}
          className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <p>Page not found</p>
        </div>
        <button
          onClick={() => router.push('/admin/dashboard')}
          className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Edit Page</h1>
        <p className="text-gray-600 mt-2">
          Update the content for the {page.slug} page
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <PageEditor
          page={page}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}
