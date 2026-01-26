'use client';

import { useToast } from './ToastContext';

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`min-w-[300px] max-w-md rounded-lg shadow-lg p-4 flex items-start gap-3 animate-slide-in ${
            toast.type === 'success'
              ? 'bg-green-50 border border-green-200'
              : toast.type === 'error'
              ? 'bg-red-50 border border-red-200'
              : 'bg-blue-50 border border-blue-200'
          }`}
        >
          <div className="flex-shrink-0 text-2xl">
            {toast.type === 'success' && '✅'}
            {toast.type === 'error' && '❌'}
            {toast.type === 'info' && 'ℹ️'}
          </div>
          <div className="flex-1">
            <p
              className={`text-sm font-medium ${
                toast.type === 'success'
                  ? 'text-green-800'
                  : toast.type === 'error'
                  ? 'text-red-800'
                  : 'text-blue-800'
              }`}
            >
              {toast.message}
            </p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className={`flex-shrink-0 text-lg font-bold ${
              toast.type === 'success'
                ? 'text-green-600 hover:text-green-800'
                : toast.type === 'error'
                ? 'text-red-600 hover:text-red-800'
                : 'text-blue-600 hover:text-blue-800'
            }`}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
