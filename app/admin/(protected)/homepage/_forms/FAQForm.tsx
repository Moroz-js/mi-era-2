'use client';

import { useState, useEffect } from 'react';
import { FormInput } from '../_components/FormInput';
import { FormTextarea } from '../_components/FormTextarea';
import { DragHandle } from '../_components/DragHandle';
import { useToast } from '@/components/admin/ToastContext';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQData {
  heading: string;
  items: FAQItem[];
}

const defaultFAQ: FAQData = {
  heading: '',
  items: [],
};

export function FAQForm() {
  const { showToast } = useToast();
  const [data, setData] = useState<FAQData>(defaultFAQ);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/homepage/faq');
      if (res.ok) {
        const result = await res.json();
        setData(result.section.content);
      } else if (res.status === 404) {
        const defaultsRes = await fetch('/api/admin/homepage');
        const defaultsData = await defaultsRes.json();
        if (defaultsData.success && defaultsData.sections.faq) {
          setData(defaultsData.sections.faq);
        }
      }
    } catch (error) {
      console.error('Failed to load FAQ data:', error);
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

    if (data.items.length === 0) {
      showToast('Please add at least one FAQ item', 'error');
      return;
    }

    const hasEmpty = data.items.some(item => !item.question || !item.answer);
    if (hasEmpty) {
      showToast('Please fill in all fields for all FAQ items', 'error');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/admin/homepage/faq', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: data }),
      });

      const result = await res.json();

      if (res.ok) {
        showToast('FAQ section saved successfully', 'success');
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

  const updateItem = (index: number, field: keyof FAQItem, value: string) => {
    const updated = [...data.items];
    updated[index] = { ...updated[index], [field]: value };
    setData({ ...data, items: updated });
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= data.items.length) return;

    const updated = [...data.items];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setData({ ...data, items: updated });
  };

  const addItem = () => {
    setData({
      ...data,
      items: [...data.items, { question: '', answer: '' }],
    });
  };

  const removeItem = (index: number) => {
    const updated = data.items.filter((_, idx) => idx !== index);
    setData({ ...data, items: updated });
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
      <h2 className="text-2xl font-bold text-gray-900 mb-6">FAQ Section</h2>

      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        <FormInput
          label="Heading"
          value={data.heading}
          onChange={(val) => setData({ ...data, heading: val })}
          placeholder="Questions? We've got answers"
          required
        />

        <div className="border-t border-gray-200 pt-6">
          <div className="sticky top-0 bg-white z-10 flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">FAQ Items</h3>
            <button
              type="button"
              onClick={addItem}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              + Add FAQ
            </button>
          </div>

          {data.items.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No FAQ items yet. Click "Add FAQ" to create one.
            </div>
          ) : (
            <div className="space-y-4">
              {data.items.map((item, idx) => (
                <div 
                  key={idx}
                  className="border border-gray-300 rounded-lg p-4 bg-white flex gap-4"
                >
                  {/* Drag handle */}
                  <div className="flex-shrink-0 pt-7">
                    <DragHandle
                      onMoveUp={() => moveItem(idx, 'up')}
                      onMoveDown={() => moveItem(idx, 'down')}
                      canMoveUp={idx > 0}
                      canMoveDown={idx < data.items.length - 1}
                    />
                  </div>

                  {/* Form fields */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-500">FAQ {idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeItem(idx)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>

                    <FormInput
                      label="Question"
                      value={item.question}
                      onChange={(val) => updateItem(idx, 'question', val)}
                      placeholder="What is Mi-Era?"
                      required
                    />

                    <FormTextarea
                      label="Answer"
                      value={item.answer}
                      onChange={(val) => updateItem(idx, 'answer', val)}
                      placeholder="The answer to the question..."
                      rows={5}
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
