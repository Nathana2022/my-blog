import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const EditPost = () => {
  const router = useRouter();
  const { id } = router.query;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Simulation de la récupération initiale du post à éditer depuis l'API
  // Dans une application réelle, cela devrait être récupéré depuis l'API
  const post = { id: parseInt(id, 10), title: 'Initial Title', content: 'Initial Content' };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error('Failed to update post');
      }

      // Redirection vers la page des articles après mise à jour
      router.push('/posts');
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Edit Post</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            rows="6"
            required
          />
        </div>
        <div className="flex justify-end">
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Update Post</button>
        </div>
      </form>
      <Link href="/posts" className="mt-4 text-blue-500 hover:underline">Back to Posts</Link>
    </div>
  );
};

export default EditPost;
