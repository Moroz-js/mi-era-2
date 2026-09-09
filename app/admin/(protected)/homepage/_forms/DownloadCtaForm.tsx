'use client';

import { useEffect, useState } from 'react';
import { FormInput } from '../_components/FormInput';
import { FormTextarea } from '../_components/FormTextarea';
import { useToast } from '@/components/admin/ToastContext';
import { defaultHomepageData } from '@/lib/homepage-defaults';

interface DownloadCtaData {
  heading: string;
  subheading: string;
}

const defaultDownloadCta: DownloadCtaData = {
  heading: defaultHomepageData.download_cta.heading,
  subheading: defaultHomepageData.download_cta.subheading,
};

export function DownloadCtaForm() {
  const { showToast } = useToast();
  const [data, setData] = useState<DownloadCtaData>(defaultDownloadCta);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/homepage/download_cta');
      if (res.ok) {
        const result = await res.json();
        setData({
          heading: result.section.content.heading || '',
          subheading: result.section.content.subheading || '',
        });
      } else if (res.status === 404) {
        const defaultsRes = await fetch('/api/admin/homepage');
        const defaultsData = await defaultsRes.json();
        if (defaultsData.success && defaultsData.sections.download_cta) {
          setData({
            heading: defaultsData.sections.download_cta.heading || '',
            subheading: defaultsData.sections.download_cta.subheading || '',
          });
        } else {
          setData(defaultDownloadCta);
        }
      }
    } catch (error) {
      console.error('Failed to load download CTA data:', error);
      showToast('Failed to load data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!data.heading.trim()) {
      showToast('Please enter a heading', 'error');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/admin/homepage/download_cta', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: data }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Failed to save');
      }

      showToast('Download CTA section saved successfully', 'success');
    } catch (error) {
      console.error('Save error:', error);
      showToast('Failed to save changes', 'error');
    } finally {
      setSaving(false);
    }
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
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Download CTA</h2>
      <p className="text-gray-600 mb-6">
        Heading and subheading for the “Ready to own your era?” block. The button text and link are edited in Settings.
      </p>

      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        <FormInput
          label="Heading"
          value={data.heading}
          onChange={(val) => setData({ ...data, heading: val })}
          placeholder="Ready to own your era?"
          required
        />

        <FormTextarea
          label="Subheading"
          value={data.subheading}
          onChange={(val) => setData({ ...data, subheading: val })}
          placeholder="Join a webinar and see how Mi-Era helps teens build focus and confidence."
          rows={3}
        />

        <div className="sticky bottom-0 bg-white border-t border-gray-200 pt-4 mt-6 -mx-6 px-6 -mb-6 pb-6 flex items-center justify-end gap-3">
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
