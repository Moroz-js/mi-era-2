'use client';

import { useState } from 'react';
import ImageUpload from '@/components/admin/ImageUpload';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  required?: boolean;
}

export function ImageUploadField({ label, value, onChange, required = false }: ImageUploadFieldProps) {
  const [showUpload, setShowUpload] = useState(false);

  const handleUploadSuccess = (url: string) => {
    onChange(url);
    setShowUpload(false);
  };

  const handleRemove = () => {
    onChange('');
    setShowUpload(false);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {value && !showUpload ? (
        <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
          <img 
            src={value} 
            alt={label} 
            className="max-h-48 rounded mb-3 mx-auto"
          />
          <div className="text-sm text-gray-600 mb-2 truncate">
            {value}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setShowUpload(true)}
              className="px-4 py-2 bg-brand-violet text-white rounded hover:bg-brand-yellow hover:text-brand-black transition-colors text-sm"
            >
              Change Image
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="px-4 py-2 border border-red-300 text-red-600 rounded hover:bg-red-50 transition-colors text-sm"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <ImageUpload 
          onUploadSuccess={handleUploadSuccess}
          onUploadError={(err) => console.error('Upload error:', err)}
        />
      )}
    </div>
  );
}
