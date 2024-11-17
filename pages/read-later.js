import Link from 'next/link';
import blogsData from '../blogs.json';
import { useState,useEffect } from 'react';
import Layout from '@/components/Layout';
const ReadLater = () => {
    const [readLaterPosts, setReadLaterPosts] = useState([]);
    const [count, setCount] = useState(0);
  
    // Load posts from local storage
    useEffect(() => {
      const readLaterList = JSON.parse(localStorage.getItem('readLater')) || [];
      const posts = blogsData.filter((blog) => readLaterList.includes(blog.id));
      setReadLaterPosts(posts);
      setCount(posts.length);
    }, []);
  
    // Remove a single post from "Read Later"
    const removeFromReadLater = (postId) => {
      const updatedList = readLaterPosts.filter((post) => post.id !== postId);
      setReadLaterPosts(updatedList);
      localStorage.setItem('readLater', JSON.stringify(updatedList.map((post) => post.id)));
      setCount(updatedList.length);
    };
  
    // Clear all posts from "Read Later"
    const clearAll = () => {
      setReadLaterPosts([]);
      localStorage.removeItem('readLater');
      setCount(0);
    };
  
    return (
        <Layout>


      <div className="p-6 wma max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Read Later ({count})</h1>
  
        {count === 0 ? (
          <p className="text-gray-600">No posts saved yet.</p>
        ) : (
          <>
            <button onClick={clearAll} className="bg-red-500 text-white px-4 py-2 rounded mb-4">
              Clear All
            </button>
            {readLaterPosts.map((post) => (
              <div key={post.id} className="block p-4 border rounded mb-4">
                <Link href={`/blog/${post.title.replace(/\s+/g, '-').toLowerCase()}`}>
                  <span className="hover:border-indigo-500">
                    <h2 className="text-xl font-semibold">{post.title}</h2>
                    <p>{post.description}</p>
                  </span>
                </Link>
                <button
                  onClick={() => removeFromReadLater(post.id)}
                  className="text-red-500 mt-2"
                >
                  Remove from Read Later
                </button>
              </div>
            ))}
          </>
        )}
      </div>
        </Layout>
    );
  };
  
  export default ReadLater;
  