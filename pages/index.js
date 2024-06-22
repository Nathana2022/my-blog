import Link from 'next/link';

const Home = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <h1 className="text-4xl font-bold text-gray-900 mb-6">Welcome to My Blog</h1>
    <Link href="/posts" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" >View Posts</Link>
  </div>
);

export default Home;
