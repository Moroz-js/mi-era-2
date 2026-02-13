'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useToast } from '@/components/admin/ToastContext';

const sectionLabels: Record<string, string> = {
  hero: 'Hero Section',
  statistics: 'Statistics',
  benefits: 'Benefits',
  key_features: 'Key Features',
  how_it_works: 'How It Works',
  testimonials: 'Testimonials',
  pricing: 'Pricing',
  download_cta: 'Download CTA',
  faq: 'FAQ',
};

export default function EditHomepageSectionPage() {
  const params = useParams();
  const router = useRouter();
  const { showToast } = useToast();
  const key = params.key as string;
  
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadSection();
  }, [key]);

  const loadSection = async () => {
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch(`/api/admin/homepage/${key}`);
      
      if (res.status === 404) {
        // Section doesn't exist in DB, load from defaults
        const defaultsRes = await fetch('/api/admin/homepage');
        const defaultsData = await defaultsRes.json();
        
        if (defaultsData.success && defaultsData.sections[key]) {
          setContent(JSON.stringify(defaultsData.sections[key], null, 2));
        } else {
          setContent('{}');
        }
      } else if (res.ok) {
        const data = await res.json();
        setContent(JSON.stringify(data.section.content, null, 2));
      } else {
        throw new Error('Failed to load section');
      }
    } catch (err) {
      setError('Failed to load section content');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setError('');
    
    // Validate JSON
    try {
      JSON.parse(content);
    } catch (err) {
      setError('Invalid JSON format. Please check your syntax.');
      return;
    }

    setSaving(true);

    try {
      const res = await fetch(`/api/admin/homepage/${key}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: JSON.parse(content) }),
      });

      const data = await res.json();

      if (res.ok) {
        showToast('Section saved successfully', 'success');
      } else {
        throw new Error(data.error || 'Failed to save');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to save section');
      showToast('Failed to save section', 'error');
    } finally {
      setSaving(false);
    }
  };

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(content);
      setContent(JSON.stringify(parsed, null, 2));
      setError('');
    } catch (err) {
      setError('Cannot format invalid JSON');
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <button
          onClick={() => router.push('/admin/homepage')}
          className="text-brand-violet hover:underline mb-4 flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to homepage sections
        </button>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Edit {sectionLabels[key] || key}
        </h1>
        <p className="text-gray-600">
          Edit the JSON content below. Changes will be reflected on the homepage immediately after saving.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Content (JSON)
          </label>
          <button
            onClick={formatJSON}
            className="text-sm text-brand-violet hover:underline"
          >
            Format JSON
          </button>
        </div>
        
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-[500px] font-mono text-sm border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-brand-violet focus:border-transparent resize-none"
          spellCheck={false}
        />
        
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Make sure to maintain the JSON structure. Invalid JSON cannot be saved.
          </div>
          <div className="flex gap-3">
            <button
              onClick={loadSection}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={saving}
            >
              Reset
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2 bg-brand-violet text-white rounded-lg hover:bg-brand-yellow hover:text-brand-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">Tips:</h3>
        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li>Use "Format JSON" button to auto-format your content</li>
          <li>Strings with special characters should be escaped properly</li>
          <li>For images, use paths like <code className="bg-blue-100 px-1 rounded">/placeholders/image.png</code> or upload URLs</li>
          <li>Changes take effect immediately after saving - preview the homepage to verify</li>
        </ul>
      </div>
    </div>
  );
}
