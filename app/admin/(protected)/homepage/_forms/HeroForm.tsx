'use client';

import { useState, useEffect } from 'react';
import { FormInput } from '../_components/FormInput';
import { FormTextarea } from '../_components/FormTextarea';
import { ImageUploadField } from '../_components/ImageUploadField';
import { useToast } from '@/components/admin/ToastContext';

interface HeroData {
  heading: string;
  subheading: string;
  ctaText: string;
  screenshots: Array<{
    src: string;
    alt: string;
    aspectRatio: string;
  }>;
}

const defaultHero: HeroData = {
  heading: '',
  subheading: '',
  ctaText: '',
  screenshots: [
    { src: '', alt: '', aspectRatio: '9/16' },
    { src: '', alt: '', aspectRatio: '9/16' },
    { src: '', alt: '', aspectRatio: '9/16' },
  ],
};

export function HeroForm() {
  const { showToast } = useToast();
  const [data, setData] = useState<HeroData>(defaultHero);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/homepage/hero');
      if (res.ok) {
        const result = await res.json();
        setData(result.section.content);
      } else if (res.status === 404) {
        // Load defaults from fallback API
        const defaultsRes = await fetch('/api/admin/homepage');
        const defaultsData = await defaultsRes.json();
        if (defaultsData.success && defaultsData.sections.hero) {
          setData(defaultsData.sections.hero);
        }
      }
    } catch (error) {
      console.error('Failed to load hero data:', error);
      showToast('Failed to load data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    // Validation
    if (!data.heading || !data.subheading || !data.ctaText) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/admin/homepage/hero', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: data }),
      });

      const result = await res.json();

      if (res.ok) {
        showToast('Hero section saved successfully', 'success');
      } else {
        throw new Error(result.error || 'Failed to save');
      }
    } catch (error) {
      console.error('Save error:', error);
      showToast('Failed to save changes', 'error');
    } finally {
      setSaving(false);
    }
  };

  const updateScreenshot = (index: number, field: 'src' | 'alt', value: string) => {
    const updated = [...data.screenshots];
    updated[index] = { ...updated[index], [field]: value };
    setData({ ...data, screenshots: updated });
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-gray-200 rounded w-1/3"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Hero Section</h2>

      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        <FormInput
          label="Heading"
          value={data.heading}
          onChange={(val) => setData({ ...data, heading: val })}
          placeholder="A reliable space where teens can grow"
          required
        />

        <FormTextarea
          label="Subheading"
          value={data.subheading}
          onChange={(val) => setData({ ...data, subheading: val })}
          placeholder="Track your tasks, understand your emotions..."
          rows={3}
          required
        />

        <FormInput
          label="CTA Button Text"
          value={data.ctaText}
          onChange={(val) => setData({ ...data, ctaText: val })}
          placeholder="Get early access"
          required
        />

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Screenshots (3)</h3>
          <p className="text-sm text-gray-600 mb-4">
            Upload 3 app screenshots for the hero section. Recommended aspect ratio: 9:16 (mobile)
          </p>

          {data.screenshots.map((screenshot, idx) => (
            <div key={idx} className="mb-6 pb-6 border-b border-gray-100 last:border-0">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Screenshot {idx + 1}</h4>
              
              <ImageUploadField
                label={`Image ${idx + 1}`}
                value={screenshot.src}
                onChange={(url) => updateScreenshot(idx, 'src', url)}
              />

              <FormInput
                label="Alt Text"
                value={screenshot.alt}
                onChange={(val) => updateScreenshot(idx, 'alt', val)}
                placeholder="Describe this screenshot"
              />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={loadData}
            disabled={saving}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-brand-violet text-white rounded-lg hover:bg-brand-yellow hover:text-brand-black transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
