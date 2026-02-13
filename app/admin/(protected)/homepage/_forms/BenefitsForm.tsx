'use client';

import { useState, useEffect } from 'react';
import { FormInput } from '../_components/FormInput';
import { FormTextarea } from '../_components/FormTextarea';
import { FormSelect } from '../_components/FormSelect';
import { DragHandle } from '../_components/DragHandle';
import { useToast } from '@/components/admin/ToastContext';
import { 
  CheckCircleIcon, 
  LightbulbIcon, 
  ShieldIcon, 
  TrophyIcon, 
  TargetIcon, 
  HeartIcon 
} from '@/components/icons/BenefitIcons';

interface Benefit {
  iconType: string;
  title: string;
  description: string;
}

interface BenefitsData {
  heading: string;
  subheading: string;
  benefits: Benefit[];
}

const defaultBenefits: BenefitsData = {
  heading: '',
  subheading: '',
  benefits: [],
};

const iconOptions = [
  { value: 'CheckCircle', label: 'Check Circle' },
  { value: 'Lightbulb', label: 'Lightbulb' },
  { value: 'Shield', label: 'Shield' },
  { value: 'Trophy', label: 'Trophy' },
  { value: 'Target', label: 'Target' },
  { value: 'Heart', label: 'Heart' },
];

const iconMap = {
  CheckCircle: CheckCircleIcon,
  Lightbulb: LightbulbIcon,
  Shield: ShieldIcon,
  Trophy: TrophyIcon,
  Target: TargetIcon,
  Heart: HeartIcon,
};

export function BenefitsForm() {
  const { showToast } = useToast();
  const [data, setData] = useState<BenefitsData>(defaultBenefits);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/homepage/benefits');
      if (res.ok) {
        const result = await res.json();
        setData(result.section.content);
      } else if (res.status === 404) {
        const defaultsRes = await fetch('/api/admin/homepage');
        const defaultsData = await defaultsRes.json();
        if (defaultsData.success && defaultsData.sections.benefits) {
          setData(defaultsData.sections.benefits);
        }
      }
    } catch (error) {
      console.error('Failed to load benefits data:', error);
      showToast('Failed to load data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!data.heading || !data.subheading) {
      showToast('Please fill in heading and subheading', 'error');
      return;
    }

    if (data.benefits.length === 0) {
      showToast('Please add at least one benefit', 'error');
      return;
    }

    const hasEmpty = data.benefits.some(b => !b.iconType || !b.title || !b.description);
    if (hasEmpty) {
      showToast('Please fill in all fields for all benefits', 'error');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/admin/homepage/benefits', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: data }),
      });

      const result = await res.json();

      if (res.ok) {
        showToast('Benefits section saved successfully', 'success');
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

  const updateBenefit = (index: number, field: keyof Benefit, value: string) => {
    const updated = [...data.benefits];
    updated[index] = { ...updated[index], [field]: value };
    setData({ ...data, benefits: updated });
  };

  const moveBenefit = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= data.benefits.length) return;

    const updated = [...data.benefits];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setData({ ...data, benefits: updated });
  };

  const addBenefit = () => {
    setData({
      ...data,
      benefits: [...data.benefits, { iconType: 'CheckCircle', title: '', description: '' }],
    });
  };

  const removeBenefit = (index: number) => {
    const updated = data.benefits.filter((_, idx) => idx !== index);
    setData({ ...data, benefits: updated });
  };

  const renderIconPreview = (iconType: string) => {
    const IconComponent = iconMap[iconType as keyof typeof iconMap];
    if (!IconComponent) return null;

    return (
      <div className="w-12 h-12 bg-brand-yellow rounded-lg flex items-center justify-center">
        <IconComponent size={24} color="#000000" />
      </div>
    );
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
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Benefits Section</h2>

      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        <FormInput
          label="Heading"
          value={data.heading}
          onChange={(val) => setData({ ...data, heading: val })}
          placeholder="Why Mi-Era exists"
          required
        />

        <FormTextarea
          label="Subheading"
          value={data.subheading}
          onChange={(val) => setData({ ...data, subheading: val })}
          placeholder="Because it's designed for how you actually think and feel..."
          rows={3}
          required
        />

        <div className="border-t border-gray-200 pt-6">
          <div className="sticky top-0 py-2 bg-white z-10 flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Benefits</h3>
            <button
              type="button"
              onClick={addBenefit}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              + Add Benefit
            </button>
          </div>

          {data.benefits.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No benefits yet. Click "Add Benefit" to create one.
            </div>
          ) : (
            <div className="space-y-4">
              {data.benefits.map((benefit, idx) => (
                <div 
                  key={idx}
                  className="border border-gray-300 rounded-lg p-4 bg-gray-50 flex gap-4"
                >
                  {/* Drag handle */}
                  <div className="flex-shrink-0 pt-7">
                    <DragHandle
                      onMoveUp={() => moveBenefit(idx, 'up')}
                      onMoveDown={() => moveBenefit(idx, 'down')}
                      canMoveUp={idx > 0}
                      canMoveDown={idx < data.benefits.length - 1}
                    />
                  </div>

                  {/* Form fields */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-500">Benefit {idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeBenefit(idx)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>

                    {/* Icon selector with preview */}
                    <div className="flex gap-4 items-start">
                      <div className="flex-1">
                        <FormSelect
                          label="Icon"
                          value={benefit.iconType}
                          options={iconOptions}
                          onChange={(val) => updateBenefit(idx, 'iconType', val)}
                          required
                        />
                      </div>
                      <div className="flex-shrink-0 pt-7">
                        <div className="text-xs text-gray-500 mb-1 text-center">Preview</div>
                        {renderIconPreview(benefit.iconType)}
                      </div>
                    </div>

                    <FormInput
                      label="Title"
                      value={benefit.title}
                      onChange={(val) => updateBenefit(idx, 'title', val)}
                      placeholder="Structure without stress"
                      required
                    />

                    <FormTextarea
                      label="Description"
                      value={benefit.description}
                      onChange={(val) => updateBenefit(idx, 'description', val)}
                      placeholder="Build routines that actually work for your brain..."
                      rows={3}
                      required
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

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
