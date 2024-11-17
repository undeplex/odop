import React from 'react';
import SingleBlog from './SingleBlog';

const MostViewedBlogs = ({ posts }) => {
  return (
    <div>
      <div className="grid px-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {posts.map((blog, index) => (
          <SingleBlog key={index} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default MostViewedBlogs;