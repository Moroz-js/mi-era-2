'use client';

import { useState, useEffect } from 'react';
import { FormInput } from '../_components/FormInput';
import { FormTextarea } from '../_components/FormTextarea';
import { DragHandle } from '../_components/DragHandle';
import { useToast } from '@/components/admin/ToastContext';

interface Step {
  number: number;
  title: string;
  description: string;
}

interface HowItWorksData {
  heading: string;
  steps: Step[];
}

const defaultHowItWorks: HowItWorksData = {
  heading: '',
  steps: [],
};

export function HowItWorksForm() {
  const { showToast } = useToast();
  const [data, setData] = useState<HowItWorksData>(defaultHowItWorks);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/homepage/how_it_works');
      if (res.ok) {
        const result = await res.json();
        setData(result.section.content);
      } else if (res.status === 404) {
        const defaultsRes = await fetch('/api/admin/homepage');
        const defaultsData = await defaultsRes.json();
        if (defaultsData.success && defaultsData.sections.how_it_works) {
          setData(defaultsData.sections.how_it_works);
        }
      }
    } catch (error) {
      console.error('Failed to load how it works data:', error);
      showToast('Failed to load data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!data.heading) {
      showToast('Please enter a heading', 'error');
      return;
    }

    if (data.steps.length === 0) {
      showToast('Please add at least one step', 'error');
      return;
    }

    const hasEmpty = data.steps.some(s => !s.title || !s.description);
    if (hasEmpty) {
      showToast('Please fill in all fields for all steps', 'error');
      return;
    }

    // Recalculate step numbers before saving
    const stepsWithNumbers = data.steps.map((step, idx) => ({
      ...step,
      number: idx + 1,
    }));

    setSaving(true);
    try {
      const res = await fetch('/api/admin/homepage/how_it_works', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: { ...data, steps: stepsWithNumbers } }),
      });

      const result = await res.json();

      if (res.ok) {
        showToast('How It Works section saved successfully', 'success');
        // Update local state with numbered steps
        setData({ ...data, steps: stepsWithNumbers });
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

  const updateStep = (index: number, field: keyof Step, value: string | number) => {
    const updated = [...data.steps];
    updated[index] = { ...updated[index], [field]: value };
    setData({ ...data, steps: updated });
  };

  const moveStep = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= data.steps.length) return;

    const updated = [...data.steps];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setData({ ...data, steps: updated });
  };

  const addStep = () => {
    setData({
      ...data,
      steps: [...data.steps, { number: data.steps.length + 1, title: '', description: '' }],
    });
  };

  const removeStep = (index: number) => {
    const updated = data.steps.filter((_, idx) => idx !== index);
    setData({ ...data, steps: updated });
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
      <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works Section</h2>

      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        <FormInput
          label="Heading"
          value={data.heading}
          onChange={(val) => setData({ ...data, heading: val })}
          placeholder="How it works"
          required
        />

        <div className="border-t border-gray-200 pt-6">
          <div className="sticky top-0 bg-white z-10 flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Steps</h3>
            <button
              type="button"
              onClick={addStep}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              + Add Step
            </button>
          </div>

          {data.steps.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No steps yet. Click "Add Step" to create one.
            </div>
          ) : (
            <div className="space-y-4">
              {data.steps.map((step, idx) => (
                <div 
                  key={idx}
                  className="border border-gray-300 rounded-lg p-4 bg-white flex gap-4"
                >
                  {/* Drag handle */}
                  <div className="flex-shrink-0 pt-7">
                    <DragHandle
                      onMoveUp={() => moveStep(idx, 'up')}
                      onMoveDown={() => moveStep(idx, 'down')}
                      canMoveUp={idx > 0}
                      canMoveDown={idx < data.steps.length - 1}
                    />
                  </div>

                  {/* Form fields */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-brand-yellow text-brand-black text-lg font-bold rounded-full">
                        {idx + 1}
                      </span>
                      <span className="text-sm font-medium text-gray-500">Step {idx + 1}</span>
                    </div>

                    <FormInput
                      label="Title"
                      value={step.title}
                      onChange={(val) => updateStep(idx, 'title', val)}
                      placeholder="Step title"
                      required
                    />

                    <FormTextarea
                      label="Description"
                      value={step.description}
                      onChange={(val) => updateStep(idx, 'description', val)}
                      placeholder="Step description"
                      rows={2}
                      required
                    />

                    <button
                      type="button"
                      onClick={() => removeStep(idx)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Remove Step
                    </button>
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
