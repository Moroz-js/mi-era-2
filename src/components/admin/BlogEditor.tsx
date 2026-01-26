'use client';

import { useState, useEffect } from 'react';
import TipTapEditor from './TipTapEditor';
import ImageUpload from './ImageUpload';
import { useToast } from './ToastContext';
import { slugify } from '@/lib/utils/slugify';

interface BlogPost {
  id?: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string | null;
  status: 'draft' | 'published';
  categories?: Array<{ id: number; name: string; slug: string }>;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface BlogEditorProps {
  post?: BlogPost;
  onSave: (post: Omit<BlogPost, 'id' | 'categories'> & { categoryIds: number[] }) => Promise<void>;
  onCancel: () => void;
}

export default function BlogEditor({ post, onSave, onCancel }: BlogEditorProps) {
  const { showToast } = useToast();
  const [title, setTitle] = useState(post?.title || '');
  const [slug, setSlug] = useState(post?.slug || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [content, setContent] = useState(post?.content || '');
  const [featuredImage, setFeaturedImage] = useState(post?.featuredImage || '');
  const [status, setStatus] = useState<'draft' | 'published'>(post?.status || 'draft');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Categories state
  const [availableCategories, setAvailableCategories] = useState<Category[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>(
    post?.categories?.map(c => c.id) || []
  );
  const [newCategoryName, setNewCategoryName] = useState('');
  const [showImageUpload, setShowImageUpload] = useState(false);

  // Load categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const categoriesRes = await fetch('/api/admin/categories');
      if (categoriesRes.ok) {
        const categoriesData = await categoriesRes.json();
        setAvailableCategories(categoriesData.categories || []);
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    // Auto-generate slug from title if creating new post
    if (!post?.id) {
      setSlug(slugify(newTitle));
    }
  };

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;

    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategoryName.trim() }),
      });

      if (res.ok) {
        const data = await res.json();
        setAvailableCategories([...availableCategories, data.category]);
        setSelectedCategoryIds([...selectedCategoryIds, data.category.id]);
        setNewCategoryName('');
      }
    } catch (err) {
      console.error('Failed to create category:', err);
    }
  };

  const toggleCategory = (categoryId: number) => {
    setSelectedCategoryIds(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleImageUploadSuccess = (url: string) => {
    setFeaturedImage(url);
    setShowImageUpload(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    if (!slug.trim()) {
      setError('Slug is required');
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
        slug: slug.trim(),
        excerpt: excerpt.trim(),
        content: content.trim(),
        featuredImage: featuredImage.trim() || null,
        status,
        categoryIds: selectedCategoryIds,
      });
      showToast('Post saved successfully', 'success');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save post';
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
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-violet focus:border-transparent"
            placeholder="Enter post title"
            required
          />
        </div>

        {/* Slug */}
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
            Slug *
          </label>
          <input
            type="text"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-violet focus:border-transparent"
            placeholder="post-url-slug"
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            URL: /blog/{slug || 'post-url-slug'}
          </p>
        </div>

        {/* Excerpt */}
        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-violet focus:border-transparent"
            placeholder="Brief summary of the post"
          />
        </div>

        {/* Featured Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Featured Image
          </label>
          
          {!showImageUpload && !featuredImage && (
            <button
              type="button"
              onClick={() => setShowImageUpload(true)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Upload Featured Image
            </button>
          )}

          {showImageUpload && (
            <div className="space-y-2">
              <ImageUpload
                onUploadSuccess={handleImageUploadSuccess}
                onUploadError={(err) => setError(err)}
              />
              <button
                type="button"
                onClick={() => setShowImageUpload(false)}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
            </div>
          )}

          {featuredImage && (
            <div className="space-y-2">
              <img
                src={featuredImage}
                alt="Featured preview"
                className="max-w-xs rounded-lg"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowImageUpload(true)}
                  className="text-sm text-brand-violet hover:underline"
                >
                  Change Image
                </button>
                <button
                  type="button"
                  onClick={() => setFeaturedImage('')}
                  className="text-sm text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Content - TipTap Editor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content *
          </label>
          <TipTapEditor
            content={content}
            onChange={setContent}
            placeholder="Write your post content here..."
          />
        </div>

        {/* Categories */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categories
          </label>
          <div className="space-y-3">
            {/* Selected categories */}
            <div className="flex flex-wrap gap-2">
              {selectedCategoryIds.map(id => {
                const category = availableCategories.find(c => c.id === id);
                return category ? (
                  <span
                    key={id}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-brand-violet text-white rounded-full text-sm"
                  >
                    {category.name}
                    <button
                      type="button"
                      onClick={() => toggleCategory(id)}
                      className="hover:text-gray-200"
                    >
                      ✕
                    </button>
                  </span>
                ) : null;
              })}
            </div>

            {/* Available categories */}
            {availableCategories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {availableCategories
                  .filter(c => !selectedCategoryIds.includes(c.id))
                  .map(category => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => toggleCategory(category.id)}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors"
                    >
                      + {category.name}
                    </button>
                  ))}
              </div>
            )}

            {/* Create new category */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="New category name"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-violet focus:border-transparent text-sm"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleCreateCategory();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleCreateCategory}
                disabled={!newCategoryName.trim()}
                className="px-4 py-2 bg-brand-yellow hover:bg-brand-violet text-black rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create
              </button>
            </div>
          </div>
        </div>

        {/* Status */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-violet focus:border-transparent"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-brand-yellow hover:bg-brand-violet text-black px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : post?.id ? 'Update Post' : 'Create Post'}
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
