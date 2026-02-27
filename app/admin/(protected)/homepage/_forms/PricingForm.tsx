'use client';

import { useState, useEffect } from 'react';
import { FormInput } from '../_components/FormInput';
import { DragHandle } from '../_components/DragHandle';
import { useToast } from '@/components/admin/ToastContext';

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  yearlyPrice?: string;
  yearlySaving?: string;
  addonLabel?: string;
  features: string[];
  highlighted: boolean;
  ctaText: string;
  isAddon?: boolean;
  footnote?: string;
  visible?: boolean;
}

interface PricingData {
  heading: string;
  subheading?: string;
  plans: PricingPlan[];
}

const defaultPlan = (): PricingPlan => ({
  name: '',
  price: '',
  period: '',
  yearlyPrice: '',
  yearlySaving: '',
  addonLabel: '',
  features: [],
  highlighted: false,
  ctaText: '',
  isAddon: false,
  footnote: '',
  visible: true,
});

const defaultPricing: PricingData = {
  heading: '',
  subheading: '',
  plans: [defaultPlan(), defaultPlan(), defaultPlan()],
};

export function PricingForm() {
  const { showToast } = useToast();
  const [data, setData] = useState<PricingData>(defaultPricing);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/homepage/pricing');
      if (res.ok) {
        const result = await res.json();
        setData(result.section.content);
      } else if (res.status === 404) {
        const defaultsRes = await fetch('/api/admin/homepage');
        const defaultsData = await defaultsRes.json();
        if (defaultsData.success && defaultsData.sections?.pricing) {
          setData(defaultsData.sections.pricing);
        }
      }
    } catch (error) {
      console.error('Failed to load Pricing data:', error);
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
    const hasEmpty = data.plans.some((p) => !p.name || !p.price || !p.ctaText);
    if (hasEmpty) {
      showToast('Please fill in Name, Price and CTA for all plans', 'error');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/admin/homepage/pricing', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: data }),
      });
      const result = await res.json();
      if (res.ok) {
        showToast('Pricing section saved successfully', 'success');
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

  /* ── Plan helpers ── */
  const updatePlan = <K extends keyof PricingPlan>(
    planIdx: number,
    field: K,
    value: PricingPlan[K]
  ) => {
    const updated = data.plans.map((p, i) => (i === planIdx ? { ...p, [field]: value } : p));
    setData({ ...data, plans: updated });
  };

  const setHighlighted = (planIdx: number) => {
    const updated = data.plans.map((p, i) => ({ ...p, highlighted: i === planIdx }));
    setData({ ...data, plans: updated });
  };

  /* ── Feature helpers ── */
  const addFeature = (planIdx: number) => {
    const updated = [...data.plans[planIdx].features, ''];
    updatePlan(planIdx, 'features', updated);
  };

  const updateFeature = (planIdx: number, featureIdx: number, value: string) => {
    const updated = [...data.plans[planIdx].features];
    updated[featureIdx] = value;
    updatePlan(planIdx, 'features', updated);
  };

  const removeFeature = (planIdx: number, featureIdx: number) => {
    const updated = data.plans[planIdx].features.filter((_, i) => i !== featureIdx);
    updatePlan(planIdx, 'features', updated);
  };

  const moveFeature = (planIdx: number, featureIdx: number, direction: 'up' | 'down') => {
    const newIdx = direction === 'up' ? featureIdx - 1 : featureIdx + 1;
    const features = [...data.plans[planIdx].features];
    if (newIdx < 0 || newIdx >= features.length) return;
    [features[featureIdx], features[newIdx]] = [features[newIdx], features[featureIdx]];
    updatePlan(planIdx, 'features', features);
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-gray-200 rounded w-1/3" />
        <div className="h-32 bg-gray-200 rounded" />
        <div className="h-32 bg-gray-200 rounded" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Pricing Section</h2>

      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        {/* Section-level fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Heading"
            value={data.heading}
            onChange={(val) => setData({ ...data, heading: val })}
            placeholder="Choose what works for you"
            required
          />
          <FormInput
            label="Subheading"
            value={data.subheading ?? ''}
            onChange={(val) => setData({ ...data, subheading: val })}
            placeholder="Start free, upgrade when you're ready."
          />
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Plans</h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {data.plans.map((plan, planIdx) => (
              <div
                key={planIdx}
                className={`rounded-lg border-2 p-4 space-y-4 transition-opacity ${
                  plan.visible === false ? 'opacity-50' : ''
                } ${
                  plan.highlighted ? 'border-brand-violet bg-violet-50' : 'border-gray-200 bg-white'
                }`}
              >
                {/* Plan header */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">
                    Plan {planIdx + 1}
                  </span>

                  <div className="flex items-center gap-2">
                    {/* Visible toggle */}
                    <button
                      type="button"
                      onClick={() => updatePlan(planIdx, 'visible', plan.visible === false ? true : false)}
                      className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border transition-colors ${
                        plan.visible === false
                          ? 'bg-gray-100 text-gray-400 border-gray-300 hover:border-gray-400'
                          : 'bg-green-50 text-green-700 border-green-300 hover:border-green-500'
                      }`}
                    >
                      {plan.visible === false ? (
                        <>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                          Hidden
                        </>
                      ) : (
                        <>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          Visible
                        </>
                      )}
                    </button>

                    {/* Most Popular toggle */}
                    <button
                      type="button"
                      onClick={() => setHighlighted(planIdx)}
                      className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border transition-colors ${
                        plan.highlighted
                          ? 'bg-brand-violet text-white border-brand-violet'
                          : 'bg-white text-gray-500 border-gray-300 hover:border-brand-violet hover:text-brand-violet'
                      }`}
                    >
                      <svg
                        className="w-3 h-3"
                        fill={plan.highlighted ? 'currentColor' : 'none'}
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                      Most Popular
                    </button>
                  </div>
                </div>

                {/* Name */}
                <FormInput
                  label="Plan name"
                  value={plan.name}
                  onChange={(val) => updatePlan(planIdx, 'name', val)}
                  placeholder="Study"
                  required
                />

                {/* Price + Period */}
                <div className="grid grid-cols-2 gap-3">
                  <FormInput
                    label="Price"
                    value={plan.price}
                    onChange={(val) => updatePlan(planIdx, 'price', val)}
                    placeholder="$7.99"
                    required
                  />
                  <FormInput
                    label="Period"
                    value={plan.period}
                    onChange={(val) => updatePlan(planIdx, 'period', val)}
                    placeholder="/month"
                    required
                  />
                </div>

                {/* Yearly price + saving */}
                <div className="grid grid-cols-2 gap-3">
                  <FormInput
                    label="Yearly price"
                    value={plan.yearlyPrice ?? ''}
                    onChange={(val) => updatePlan(planIdx, 'yearlyPrice', val)}
                    placeholder="$59.99"
                  />
                  <FormInput
                    label="Yearly saving"
                    value={plan.yearlySaving ?? ''}
                    onChange={(val) => updatePlan(planIdx, 'yearlySaving', val)}
                    placeholder="37%"
                  />
                </div>

                {/* Add-on label */}
                <FormInput
                  label="Add-on label (optional)"
                  value={plan.addonLabel ?? ''}
                  onChange={(val) => updatePlan(planIdx, 'addonLabel', val)}
                  placeholder="Optional ⚡"
                />

                {/* Is add-on toggle */}
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={plan.isAddon ?? false}
                    onChange={(e) => updatePlan(planIdx, 'isAddon', e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-brand-violet focus:ring-brand-violet"
                  />
                  <span className="text-sm text-gray-700">Mark as add-on (⚡ icon in title)</span>
                </label>

                {/* CTA text */}
                <FormInput
                  label="CTA button text"
                  value={plan.ctaText}
                  onChange={(val) => updatePlan(planIdx, 'ctaText', val)}
                  placeholder="Start 7-day free trial"
                  required
                />

                {/* Footnote */}
                <FormInput
                  label="Footnote (optional)"
                  value={plan.footnote ?? ''}
                  onChange={(val) => updatePlan(planIdx, 'footnote', val)}
                  placeholder="AI chat and project breaks are subject to fair use limits."
                />

                {/* Features */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Features</span>
                    <button
                      type="button"
                      onClick={() => addFeature(planIdx)}
                      className="text-xs px-2.5 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                    >
                      + Add
                    </button>
                  </div>

                  {plan.features.length === 0 ? (
                    <p className="text-xs text-gray-400 py-2">No features yet.</p>
                  ) : (
                    <div className="space-y-2">
                      {plan.features.map((feature, featIdx) => (
                        <div key={featIdx} className="flex items-center gap-2">
                          <DragHandle
                            onMoveUp={() => moveFeature(planIdx, featIdx, 'up')}
                            onMoveDown={() => moveFeature(planIdx, featIdx, 'down')}
                            canMoveUp={featIdx > 0}
                            canMoveDown={featIdx < plan.features.length - 1}
                          />
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) => updateFeature(planIdx, featIdx, e.target.value)}
                            placeholder="Feature description"
                            className="flex-1 min-w-0 px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-brand-violet focus:border-transparent"
                          />
                          <button
                            type="button"
                            onClick={() => removeFeature(planIdx, featIdx)}
                            className="flex-shrink-0 text-red-500 hover:text-red-700 text-sm font-medium"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save / Reset */}
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
