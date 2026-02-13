'use client';

import { useState, useEffect } from 'react';
import { FormInput } from '../_components/FormInput';
import { FormTextarea } from '../_components/FormTextarea';
import { ImageUploadField } from '../_components/ImageUploadField';
import { DragHandle } from '../_components/DragHandle';
import { useToast } from '@/components/admin/ToastContext';

interface Feature {
  iconSrc: string;
  title: string;
  description: string;
  screenshot: {
    src: string;
    alt: string;
    frameColor: string;
  };
  layout: 'left' | 'right';
}

interface KeyFeaturesData {
  heading: string;
  subheading: string;
  features: Feature[];
}

const defaultKeyFeatures: KeyFeaturesData = {
  heading: '',
  subheading: '',
  features: [],
};

// Predefined frame colors for new features (cycling)
const frameColors = ['#57BD2D', '#3755F0', '#FE2C2B', '#FFA500', '#9C27B0'];

export function KeyFeaturesForm() {
  const { showToast } = useToast();
  const [data, setData] = useState<KeyFeaturesData>(defaultKeyFeatures);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/homepage/key_features');
      if (res.ok) {
        const result = await res.json();
        setData(result.section.content);
      } else if (res.status === 404) {
        const defaultsRes = await fetch('/api/admin/homepage');
        const defaultsData = await defaultsRes.json();
        if (defaultsData.success && defaultsData.sections.key_features) {
          setData(defaultsData.sections.key_features);
        }
      }
    } catch (error) {
      console.error('Failed to load key features data:', error);
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

    if (data.features.length === 0) {
      showToast('Please add at least one feature', 'error');
      return;
    }

    const hasEmpty = data.features.some(f => !f.title || !f.description || !f.screenshot.src || !f.screenshot.alt);
    if (hasEmpty) {
      showToast('Please fill in all fields for all features', 'error');
      return;
    }

    // Auto-calculate layout (chessboard pattern)
    const featuresWithLayout = data.features.map((feature, idx) => ({
      ...feature,
      iconSrc: '/assets/star-1.png', // Hardcoded icon
      layout: (idx % 2 === 0 ? 'right' : 'left') as 'left' | 'right',
    }));

    setSaving(true);
    try {
      const res = await fetch('/api/admin/homepage/key_features', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: { ...data, features: featuresWithLayout } }),
      });

      const result = await res.json();

      if (res.ok) {
        showToast('Key Features section saved successfully', 'success');
        // Update local state with calculated layout
        setData({ ...data, features: featuresWithLayout });
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

  const updateFeature = (index: number, field: string, value: string) => {
    const updated = [...data.features];
    if (field.startsWith('screenshot.')) {
      const screenshotField = field.split('.')[1] as 'src' | 'alt' | 'frameColor';
      updated[index] = {
        ...updated[index],
        screenshot: { ...updated[index].screenshot, [screenshotField]: value },
      };
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    setData({ ...data, features: updated });
  };

  const moveFeature = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= data.features.length) return;

    const updated = [...data.features];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setData({ ...data, features: updated });
  };

  const addFeature = () => {
    const newFrameColor = frameColors[data.features.length % frameColors.length];
    setData({
      ...data,
      features: [
        ...data.features, 
        { 
          iconSrc: '/assets/star-1.png',
          title: '', 
          description: '', 
          screenshot: { src: '', alt: '', frameColor: newFrameColor },
          layout: 'right',
        }
      ],
    });
  };

  const removeFeature = (index: number) => {
    const updated = data.features.filter((_, idx) => idx !== index);
    setData({ ...data, features: updated });
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
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features Section</h2>

      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        <FormInput
          label="Heading"
          value={data.heading}
          onChange={(val) => setData({ ...data, heading: val })}
          placeholder="Everything you need"
          required
        />

        <FormTextarea
          label="Subheading"
          value={data.subheading}
          onChange={(val) => setData({ ...data, subheading: val })}
          placeholder="Simple tools that work together..."
          rows={2}
          required
        />

        <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm text-blue-800">
          <strong>Note:</strong> Icon (star) and layout (left/right alternating) are auto-generated. Frame color is assigned automatically.
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Features</h3>
            <button
              type="button"
              onClick={addFeature}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              + Add Feature
            </button>
          </div>

          {data.features.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No features yet. Click "Add Feature" to create one.
            </div>
          ) : (
            <div className="space-y-6">
              {data.features.map((feature, idx) => (
                <div 
                  key={idx}
                  className="border border-gray-300 rounded-lg p-4 bg-white flex gap-4"
                >
                  {/* Drag handle */}
                  <div className="flex-shrink-0 pt-7">
                    <DragHandle
                      onMoveUp={() => moveFeature(idx, 'up')}
                      onMoveDown={() => moveFeature(idx, 'down')}
                      canMoveUp={idx > 0}
                      canMoveDown={idx < data.features.length - 1}
                    />
                  </div>

                  {/* Form fields */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <img src="/assets/star-1.png" alt="star" className="w-5 h-5" />
                        <span className="text-sm font-medium text-gray-500">Feature {idx + 1}</span>
                        <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600">
                          Layout: {idx % 2 === 0 ? 'Right' : 'Left'}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFeature(idx)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>

                    <FormInput
                      label="Title"
                      value={feature.title}
                      onChange={(val) => updateFeature(idx, 'title', val)}
                      placeholder="App is adaptive to your behavior"
                      required
                    />

                    <FormTextarea
                      label="Description"
                      value={feature.description}
                      onChange={(val) => updateFeature(idx, 'description', val)}
                      placeholder="The more you use Mi-Era, the better it understands..."
                      rows={3}
                      required
                    />

                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Screenshot</h4>
                      
                      <ImageUploadField
                        label="Screenshot Image"
                        value={feature.screenshot.src}
                        onChange={(url) => updateFeature(idx, 'screenshot.src', url)}
                        required
                      />

                      <FormInput
                        label="Screenshot Alt Text"
                        value={feature.screenshot.alt}
                        onChange={(val) => updateFeature(idx, 'screenshot.alt', val)}
                        placeholder="Describe the screenshot"
                        required
                      />
                    </div>
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
