// import { useState } from 'react';
// import Link from 'next/link';

// const initialPosts = [
//   { id: 1, title: 'First Post', content: 'This is the content of the first post.' },
//   { id: 2, title: 'Second Post', content: 'This is the content of the second post.' },
// ];

// const Posts = () => {
//   const [posts, setPosts] = useState(initialPosts);

//   const deletePost = (id) => {
//     const updatedPosts = posts.filter((post) => post.id !== id);
//     setPosts(updatedPosts);
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center bg-gray-100">
//       <h1 className="text-4xl font-bold text-gray-900 mt-8 mb-4">Posts</h1>
//       <ul className="w-full max-w-2xl">
//         {posts.map((post) => (
//           <li key={post.id} className="border-b border-gray-300 py-4 flex justify-between items-center">
//             <Link className="text-xl text-blue-500 hover:underline" href={`/posts/${post.id}`}>
//               {post.title}
//             </Link>
//             <button
//               onClick={() => deletePost(post.id)}
//               className="ml-4 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//             >
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//       <Link className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" href="/posts/new">
//         Create New Post
//       </Link>
//       <Link className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" href="/">
//         Back to Home
//       </Link>
//     </div>
//   );
// };

// export default Posts;

import { useState, useEffect } from 'react';
import Link from 'next/link';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const deletePost = async (id) => {
    try {
      const response = await fetch('/api/posts', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      // Mettre à jour les articles après suppression
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-900 mt-8 mb-4">Posts</h1>
      <ul className="w-full max-w-2xl">
        {posts.map((post) => (
          <li key={post.id} className="border-b border-gray-300 py-4 flex justify-between items-center">
            <div>
              <Link className="text-xl text-blue-500 hover:underline" href={`/posts/${post.id}`}>
                {post.title}
              </Link>
            </div>
            <div className="flex">
              <Link className="ml-4 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600" href={`/posts/edit/${post.id}`}>
                Edit
              </Link>
              <button
                onClick={() => deletePost(post.id)}
                className="ml-4 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <Link className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" href="/posts/new">
        Create New Post
      </Link>
      <Link className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" href="/">
        Back to Home
      </Link>
    </div>
  );
};

export default Posts;


