'use client';

import { useState, useEffect } from 'react';
import { FormInput } from '../_components/FormInput';
import { FormTextarea } from '../_components/FormTextarea';
import { DragHandle } from '../_components/DragHandle';
import { useToast } from '@/components/admin/ToastContext';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

interface TestimonialsData {
  heading: string;
  testimonials: Testimonial[];
}

const defaultTestimonials: TestimonialsData = {
  heading: '',
  testimonials: [],
};

export function TestimonialsForm() {
  const { showToast } = useToast();
  const [data, setData] = useState<TestimonialsData>(defaultTestimonials);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/homepage/testimonials');
      if (res.ok) {
        const result = await res.json();
        setData(result.section.content);
      } else if (res.status === 404) {
        const defaultsRes = await fetch('/api/admin/homepage');
        const defaultsData = await defaultsRes.json();
        if (defaultsData.success && defaultsData.sections.testimonials) {
          setData(defaultsData.sections.testimonials);
        }
      }
    } catch (error) {
      console.error('Failed to load testimonials data:', error);
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

    if (data.testimonials.length === 0) {
      showToast('Please add at least one testimonial', 'error');
      return;
    }

    const hasEmpty = data.testimonials.some(t => !t.quote || !t.author || !t.role);
    if (hasEmpty) {
      showToast('Please fill in all fields for all testimonials', 'error');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/admin/homepage/testimonials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: data }),
      });

      const result = await res.json();

      if (res.ok) {
        showToast('Testimonials section saved successfully', 'success');
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

  const updateTestimonial = (index: number, field: keyof Testimonial, value: string) => {
    const updated = [...data.testimonials];
    updated[index] = { ...updated[index], [field]: value };
    setData({ ...data, testimonials: updated });
  };

  const moveTestimonial = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= data.testimonials.length) return;

    const updated = [...data.testimonials];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setData({ ...data, testimonials: updated });
  };

  const addTestimonial = () => {
    setData({
      ...data,
      testimonials: [...data.testimonials, { quote: '', author: '', role: '' }],
    });
  };

  const removeTestimonial = (index: number) => {
    const updated = data.testimonials.filter((_, idx) => idx !== index);
    setData({ ...data, testimonials: updated });
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
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Testimonials Section</h2>

      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        <FormInput
          label="Heading"
          value={data.heading}
          onChange={(val) => setData({ ...data, heading: val })}
          placeholder="What people are saying"
          required
        />

        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Testimonials</h3>
            <button
              type="button"
              onClick={addTestimonial}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              + Add Testimonial
            </button>
          </div>

          {data.testimonials.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No testimonials yet. Click "Add Testimonial" to create one.
            </div>
          ) : (
            <div className="space-y-4">
              {data.testimonials.map((testimonial, idx) => (
                <div 
                  key={idx}
                  className="border border-gray-300 rounded-lg p-4 bg-gray-50 flex gap-4"
                >
                  {/* Drag handle */}
                  <div className="flex-shrink-0 pt-7">
                    <DragHandle
                      onMoveUp={() => moveTestimonial(idx, 'up')}
                      onMoveDown={() => moveTestimonial(idx, 'down')}
                      canMoveUp={idx > 0}
                      canMoveDown={idx < data.testimonials.length - 1}
                    />
                  </div>

                  {/* Form fields */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-500">Testimonial {idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeTestimonial(idx)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>

                    <FormTextarea
                      label="Quote"
                      value={testimonial.quote}
                      onChange={(val) => updateTestimonial(idx, 'quote', val)}
                      placeholder="The testimonial text..."
                      rows={4}
                      required
                    />

                    <FormInput
                      label="Author"
                      value={testimonial.author}
                      onChange={(val) => updateTestimonial(idx, 'author', val)}
                      placeholder="e.g. Alex, 16"
                      required
                    />

                    <FormInput
                      label="Role"
                      value={testimonial.role}
                      onChange={(val) => updateTestimonial(idx, 'role', val)}
                      placeholder="e.g. Student, Parent, Teacher"
                      required
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
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
