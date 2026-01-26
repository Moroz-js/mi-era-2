import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/admin/auth';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminNav from '@/components/admin/AdminNav';
import { ToastProvider } from '@/components/admin/ToastContext';
import ToastContainer from '@/components/admin/ToastContainer';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  // Redirect to login if not authenticated
  if (!session) {
    redirect('/admin/login');
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <div className="flex">
          <AdminNav />
          <main className="flex-1 p-8">
            {children}
          </main>
        </div>
        <ToastContainer />
      </div>
    </ToastProvider>
  );
}
