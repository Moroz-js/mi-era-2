'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import BlogEditor from '@/components/admin/BlogEditor';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string | null;
  status: 'draft' | 'published';
  categories: Array<{ id: number; name: string; slug: string }>;
  tags: Array<{ id: number; name: string; slug: string }>;
}

export default function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/blog');
      const data = await response.json();

      if (data.success) {
        const foundPost = data.posts.find((p: BlogPost) => p.id === parseInt(postId));
        if (foundPost) {
          setPost(foundPost);
        } else {
          setError('Post not found');
        }
      } else {
        setError(data.error || 'Failed to fetch post');
      }
    } catch (err) {
      setError('Failed to fetch post');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (postData: any) => {
    const response = await fetch(`/api/admin/blog/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to update post');
    }

    // Redirect to blog list on success
    router.push('/admin/blog');
  };

  const handleCancel = () => {
    router.push('/admin/blog');
  };

  if (loading) {
    return <div className="text-center">Loading post...</div>;
  }

  if (error || !post) {
    return (
      <div>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error || 'Post not found'}
        </div>
        <button
          onClick={() => router.push('/admin/blog')}
          className="bg-brand-yellow hover:bg-brand-violet text-black px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Back to Blog List
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Blog Post</h1>
      <BlogEditor post={post} onSave={handleSave} onCancel={handleCancel} />
    </div>
  );
}
