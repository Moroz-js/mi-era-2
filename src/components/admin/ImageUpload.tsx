'use client';

import { useState, useRef, DragEvent, ChangeEvent } from 'react';

interface ImageUploadProps {
  onUploadSuccess: (url: string) => void;
  onUploadError?: (error: string) => void;
  accept?: string;
  maxSize?: number; // in bytes
  className?: string;
}

export default function ImageUpload({
  onUploadSuccess,
  onUploadError,
  accept = 'image/jpeg,image/jpg,image/png,image/gif,image/webp',
  maxSize = 5 * 1024 * 1024, // 5MB default
  className = '',
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    // Check file type
    const allowedTypes = accept.split(',').map(t => t.trim());
    if (!allowedTypes.includes(file.type)) {
      return `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`;
    }

    // Check file size
    if (file.size > maxSize) {
      return `File size exceeds maximum limit of ${maxSize / 1024 / 1024}MB`;
    }

    return null;
  };

  const uploadFile = async (file: File) => {
    setError(null);
    setIsUploading(true);
    setUploadProgress(0);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Simulate progress (since fetch doesn't support upload progress natively)
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Upload failed');
      }

      onUploadSuccess(data.url);
      
      // Reset after success
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
        setPreviewUrl(null);
      }, 1000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMessage);
      setIsUploading(false);
      setUploadProgress(0);
      setPreviewUrl(null);
      
      if (onUploadError) {
        onUploadError(errorMessage);
      }
    }
  };

  const handleFileSelect = (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      if (onUploadError) {
        onUploadError(validationError);
      }
      return;
    }

    uploadFile(file);
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`image-upload ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileInputChange}
        className="hidden"
        disabled={isUploading}
      />

      <div
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-colors duration-200
          ${isDragging ? 'border-brand-violet bg-brand-violet/10' : 'border-gray-300 hover:border-brand-violet'}
          ${isUploading ? 'pointer-events-none opacity-60' : ''}
        `}
      >
        {previewUrl && isUploading ? (
          <div className="space-y-4">
            <img
              src={previewUrl}
              alt="Upload preview"
              className="max-h-48 mx-auto rounded"
            />
            <div className="space-y-2">
              <div className="text-sm text-gray-600">
                Uploading... {uploadProgress}%
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-brand-violet h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="text-sm text-gray-600">
              <span className="font-semibold text-brand-violet">Click to upload</span>
              {' '}or drag and drop
            </div>
            <p className="text-xs text-gray-500">
              PNG, JPG, GIF, WEBP up to {maxSize / 1024 / 1024}MB
            </p>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
          {error}
        </div>
      )}
    </div>
  );
}
