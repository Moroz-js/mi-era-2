'use client';

import { useEffect, useState } from 'react';
import { FormInput } from '../homepage/_components/FormInput';
import { useToast } from '@/components/admin/ToastContext';
import { DEFAULT_SITE_CTA, type SiteCta } from '@/lib/site-cta';

export default function SettingsPage() {
  const { showToast } = useToast();
  const [data, setData] = useState<SiteCta>(DEFAULT_SITE_CTA);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/settings');
      const result = await res.json();
      if (res.ok && result.settings) {
        setData(result.settings);
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
      showToast('Failed to load settings', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!data.ctaText.trim() || !data.ctaLink.trim()) {
      showToast('Please fill in CTA text and CTA link', 'error');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Failed to save');
      }

      setData(result.settings);
      showToast('Settings saved successfully', 'success');
    } catch (error) {
      console.error('Save error:', error);
      showToast(error instanceof Error ? error.message : 'Failed to save settings', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-4 max-w-4xl">
        <div className="h-10 bg-gray-200 rounded w-1/3"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">
          Global CTA used in the header, footer, and homepage buttons.
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        <FormInput
          label="CTA Text"
          value={data.ctaText}
          onChange={(val) => setData({ ...data, ctaText: val })}
          placeholder="Check Out Our Webinars"
          required
        />

        <FormInput
          label="CTA Link"
          value={data.ctaLink}
          onChange={(val) => setData({ ...data, ctaLink: val })}
          placeholder="https://meet.google.com/kcj-jtvn-yyg"
          required
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
