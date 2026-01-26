'use client';

import { useState } from 'react';
import TipTapEditor from './TipTapEditor';
import { useToast } from './ToastContext';

interface StaticPage {
  id: number;
  slug: string;
  title: string;
  content: string;
  updatedAt: Date;
}

interface PageEditorProps {
  page: StaticPage;
  onSave: (data: { title: string; content: string }) => Promise<void>;
  onCancel: () => void;
}

export default function PageEditor({ page, onSave, onCancel }: PageEditorProps) {
  const { showToast } = useToast();
  const [title, setTitle] = useState(page.title);
  const [content, setContent] = useState(page.content);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    if (!content.trim()) {
      setError('Content is required');
      return;
    }

    try {
      setSaving(true);
      await onSave({
        title: title.trim(),
        content: content.trim(),
      });
      showToast('Page saved successfully', 'success');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save page';
      setError(errorMessage);
      showToast(errorMessage, 'error');
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {/* Page Info */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-600">
            Editing page: <span className="font-medium text-gray-900">{page.slug}</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Last updated: {new Date(page.updatedAt).toLocaleString()}
          </p>
        </div>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Page Title *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-violet focus:border-transparent"
            placeholder="Enter page title"
            required
          />
        </div>

        {/* Content - TipTap Editor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content *
          </label>
          <TipTapEditor
            content={content}
            onChange={setContent}
            placeholder="Write your page content here..."
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-brand-yellow hover:bg-brand-violet text-black px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Save Page'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
