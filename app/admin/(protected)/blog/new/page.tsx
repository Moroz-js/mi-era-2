'use client';

import { useRouter } from 'next/navigation';
import BlogEditor from '@/components/admin/BlogEditor';

export default function NewBlogPostPage() {
  const router = useRouter();

  const handleSave = async (postData: any) => {
    const response = await fetch('/api/admin/blog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to create post');
    }

    // Redirect to blog list on success
    router.push('/admin/blog');
  };

  const handleCancel = () => {
    router.push('/admin/blog');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create New Blog Post</h1>
      <BlogEditor onSave={handleSave} onCancel={handleCancel} />
    </div>
  );
}
