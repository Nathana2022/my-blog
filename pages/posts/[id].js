import { useRouter } from 'next/router';
import Link from 'next/link';

const posts = [
  { id: 1, title: 'First Post', content: 'This is the content of the first post.' },
    { id: 2, title: 'Second Post', content: 'This is the content of the second post.' },
    { id: 3, title: 'Third Post', content: 'This is the content of the second post.' },
    { id: 4, title: 'Fourth Post', content: 'This is the content of the second post.' },
    { id: 5, title: 'Fiveth Post', content: 'This is the content of the second post.' },
    { id: 6, title: 'Sixth Post', content: 'This is the content of the second post.' },
];

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const post = posts.find((p) => p.id === parseInt(id, 10));

  if (!post) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100">Post not found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
        <div className="w-full max-w-2xl p-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
      <p className="text-lg text-gray-700 mb-6">{post.content}</p>
      <Link className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" href="/posts">Back to Posts</Link>
    </div>
    </div>
    
  );
};

export default Post;
