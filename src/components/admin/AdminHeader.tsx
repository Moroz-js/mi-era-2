'use client';

import { useRouter } from 'next/navigation';

export default function AdminHeader() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/admin/logout', {
        method: 'POST',
      });

      if (response.ok) {
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-900">mi-Era Admin</h1>
          <p className="text-sm text-gray-500">Content Management System</p>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <span>View Live Site</span>
            <span>↗</span>
          </a>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-brand-red hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
