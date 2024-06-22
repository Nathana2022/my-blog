// import { useState } from 'react';
// import { useRouter } from 'next/router';
// import Link from 'next/link';

// const NewPost = () => {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Simuler l'envoi des données à un backend
//     const newPost = { id: Date.now(), title, content };
//     console.log('New post created:', newPost);
    
//     // Rediriger vers la page des articles
//     router.push('/posts');
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
//       <h1 className="text-4xl font-bold text-gray-900 mb-6">Create a New Post</h1>
//       <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-6 rounded shadow-md">
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title</label>
//           <input
//             id="title"
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full px-3 py-2 border rounded"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">Content</label>
//           <textarea
//             id="content"
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             className="w-full px-3 py-2 border rounded"
//             rows="6"
//             required
//           />
//         </div>
//         <div className="flex justify-end">
//           <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Create Post</button>
//         </div>
//       </form>
//       <Link href="/posts" className="mt-4 text-blue-500 hover:underline">Back to Posts</Link>
//     </div>
//   );
// };

// export default NewPost;

import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const NewPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      // Rediriger vers la page des articles après création
      router.push('/posts');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Create a New Post</h1>
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
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Create Post</button>
        </div>
      </form>
      <Link href="/posts" className="mt-4 text-blue-500 hover:underline">Back to Posts</Link>
    </div>
  );
};

export default NewPost;
