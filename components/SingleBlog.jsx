
import React from 'react';
import Link from 'next/link';
import { format } from 'date-fns';

const SingleBlog = ({ blog }) => {
  return (
    <div className="dark:text-gray-500 transition-all duration-500 group">
      <div className="w-full h-[150px] overflow-hidden mb-2 rounded-xl">
        <img
          src={blog.image}
          alt={blog.title}
          className="size-full group-hover:scale-[110%] group-hover:rotate-[2deg] group-hover:transition-all duration-500 rounded-xl object-cover mb-4"
        />
      </div>

      <Link href={`/blog/${blog.title.replace(/\s+/g, '-').toLowerCase()}`} passHref>
        <p className="text-2xl font-bold dark:text-white play group-hover:underline">{blog.title}</p>
        <p className="dark:text-gray-400 text-gray-700 my-3">{blog.description}</p>
        <div className="flex gap-2 items-center justify-between">
          <p className="flex items-center gap-2">
            <img
              src={blog.authorImage}
              width="34"
              className="rounded-full ring-2 object-cover"
            />
            <span className="dark:text-gray-50 text-gray-700">{blog.author}</span>
          </p>
          <div className="text-sm text-blue-500 mb-1">{blog.category}</div>
        </div>
        <div className="text-gray-600 mt-3 dark:text-gray-300 text-sm">
          Publish on {format(new Date(blog.date), 'MMMM dd, yyyy')}
        </div>
      </Link>
    </div>
  );
};

export default SingleBlog;
