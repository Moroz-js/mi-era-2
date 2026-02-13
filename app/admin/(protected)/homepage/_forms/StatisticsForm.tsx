'use client';

import { useState, useEffect } from 'react';
import { FormInput } from '../_components/FormInput';
import { FormTextarea } from '../_components/FormTextarea';
import { DragHandle } from '../_components/DragHandle';
import { useToast } from '@/components/admin/ToastContext';

interface Stat {
  value: string;
  label: string;
  description: string;
}

interface StatisticsData {
  stats: Stat[];
}

const defaultStatistics: StatisticsData = {
  stats: [
    { value: '', label: '', description: '' },
    { value: '', label: '', description: '' },
    { value: '', label: '', description: '' },
    { value: '', label: '', description: '' },
    { value: '', label: '', description: '' },
  ],
};

export function StatisticsForm() {
  const { showToast } = useToast();
  const [data, setData] = useState<StatisticsData>(defaultStatistics);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/homepage/statistics');
      if (res.ok) {
        const result = await res.json();
        setData(result.section.content);
      } else if (res.status === 404) {
        const defaultsRes = await fetch('/api/admin/homepage');
        const defaultsData = await defaultsRes.json();
        if (defaultsData.success && defaultsData.sections.statistics) {
          setData(defaultsData.sections.statistics);
        }
      }
    } catch (error) {
      console.error('Failed to load statistics data:', error);
      showToast('Failed to load data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    // Validation
    const hasEmpty = data.stats.some(s => !s.value || !s.label || !s.description);
    if (hasEmpty) {
      showToast('Please fill in all fields for all stats', 'error');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/admin/homepage/statistics', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: data }),
      });

      const result = await res.json();

      if (res.ok) {
        showToast('Statistics section saved successfully', 'success');
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

  const updateStat = (index: number, field: keyof Stat, value: string) => {
    const updated = [...data.stats];
    updated[index] = { ...updated[index], [field]: value };
    setData({ ...data, stats: updated });
  };

  const moveStat = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= data.stats.length) return;

    const updated = [...data.stats];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setData({ ...data, stats: updated });
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
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Statistics Section</h2>

      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm text-blue-800">
          <strong>Note:</strong> This section has exactly 5 stats. You can reorder them but cannot add or remove items.
        </div>

        <div className="space-y-4">
          {data.stats.map((stat, idx) => (
            <div 
              key={idx}
              className="border border-gray-300 rounded-lg p-4 bg-gray-50 flex gap-4"
            >
              {/* Drag handle */}
              <div className="flex-shrink-0 pt-7">
                <DragHandle
                  onMoveUp={() => moveStat(idx, 'up')}
                  onMoveDown={() => moveStat(idx, 'down')}
                  canMoveUp={idx > 0}
                  canMoveDown={idx < data.stats.length - 1}
                />
              </div>

              {/* Form fields */}
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-brand-violet text-white text-xs font-bold rounded-full">
                    {idx + 1}
                  </span>
                  <span className="text-sm font-medium text-gray-500">Stat {idx + 1}</span>
                </div>

                <FormInput
                  label="Value"
                  value={stat.value}
                  onChange={(val) => updateStat(idx, 'value', val)}
                  placeholder="e.g. 0, 100%, ∞"
                  required
                />

                <FormInput
                  label="Label"
                  value={stat.label}
                  onChange={(val) => updateStat(idx, 'label', val)}
                  placeholder="e.g. pressure, yours, support"
                  required
                />

                <FormTextarea
                  label="Description"
                  value={stat.description}
                  onChange={(val) => updateStat(idx, 'description', val)}
                  placeholder="Short description for this stat"
                  rows={2}
                  required
                />
              </div>
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
