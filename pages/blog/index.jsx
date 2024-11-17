
import path from 'path';
import fs from 'fs/promises';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import blogsData from '../../markdown/blogs.json';
import Layout from '@/components/Layout';
import { format, parseISO, isSameMonth } from 'date-fns';
import DatePicker from 'react-date-picker';
import MonthYearPicker from '@/components/MonthYearPicker';
import SingleBlog from '@/components/SingleBlog';
import { FaCaretLeft } from 'react-icons/fa';
import { CalendarClock, ChevronLeft, ChevronRight } from 'lucide-react';
import Head from 'next/head';
const POSTS_PER_PAGE = 20;

function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return `${Math.ceil(words / wordsPerMinute)} min read`;
}

export async function getStaticProps() {
  const blogs = await Promise.all(
    blogsData.map(async (blog) => {
      const filePath = path.join(process.cwd(), 'markdown', `${blog.id}.md`);
      const fileContents = await fs.readFile(filePath, 'utf8');

      const { content } = matter(fileContents);
      const processedContent = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeStringify)
        .process(content);

      return {
        ...blog,
        content: processedContent.toString(),
      };
    })
  );

  return {
    props: { blogs },
  };
}



const BlogPage = ({ blogs }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);
  const [selectedDate, setSelectedDate] = useState(null);
  const [sortOrder, setSortOrder] = useState('mostRecent');
  const [loading, setLoading] = useState(false);

  const POSTS_PER_PAGE = 20;
  const totalPages = Math.ceil(filteredBlogs.length / POSTS_PER_PAGE);

  const simulateLoading = (callback) => {
    setLoading(true);
    setTimeout(() => {
      callback();
      setLoading(false);
    }, 2000); // Simulate a 3-second delay
  };

  const applyFilters = () => {
    simulateLoading(() => {
      let updatedBlogs = [...blogs];

      // Filter by selected month-year
      if (selectedDate) {
        updatedBlogs = updatedBlogs.filter(blog =>
          isSameMonth(new Date(blog.date), selectedDate)
        );
      }
     
      // Sort by selected order
      updatedBlogs.sort((a, b) => {
        switch (sortOrder) {
          case 'mostRecent':
            return new Date(b.date) - new Date(a.date);
          case 'oldest':
            return new Date(a.date) - new Date(b.date);
          case 'mostViewed':
            return b.views - a.views;
          case 'leastViewed':
            return a.views - b.views;
          default:
            return 0;
        }
      });

      setFilteredBlogs(updatedBlogs);
    });
  };

  useEffect(() => {
    applyFilters();
  }, [selectedDate, sortOrder]);

  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );
  const resetFilters = () => {
        setSelectedDate(null);
        setSortOrder('mostRecent');
        setFilteredBlogs(blogs);
        setCurrentPage(1);
      };
  // Generate dynamic meta title and description
  const metaTitle = "Best Blogs on Learning By Doing | My Blog Site";
  const metaDescription = "Discover the best tips, strategies, and insights for multiple things effectively. Explore our curated list of blogs now.";

  return (
    <Layout>
      <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Head>
        <link rel="canonical" href="https://doic-neon.vercel.app/blogs" />
      </Head>
          <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://doic-neon.vercel.app/blogs" />
        <meta property="og:image" content="https://doic-neon.vercel.app/default-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content="https://doic-neon.vercel.app/default-image.jpg" />
      </Head>
      <Head>
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": metaTitle,
        "description": metaDescription,
        "url": "https://doic-neon.vercel.app/blogs",
        "blogPosts": blogs.map((blog) => ({
          "@type": "BlogPosting",
          "headline": blog.title,
          "description": blog.description,
          "datePublished": blog.date,
          "url": `https://doic-neon.com/blogs/${blog.id}`,
          "author": {
            "@type": "Person",
            "name": blog.author,
          },
        })),
      }),
    }}
  />
</Head>
      <div className="max-w-7xl mx-auto px-6 bg bg ">
        <h1 className="text-3xl my-4 mx-auto w-max play">List of Our Best Blogs</h1>

        {/* Date Picker and Sorting */}
        <div className="mb-6">
          {/* Date Picker */}
          <div className="flex items-center gap-4 mb-6 " ><CalendarClock/>        <MonthYearPicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                  
         <button onClick={resetFilters} className="px-4 py-2 bg-blue-500 bg-opacity-15 text-blue-600  rounded">
           Display All
         </button>
  </div>
          {/* Sorting Options */}
          <div className="mb-6">
       <button
            onClick={() => setSortOrder('mostRecent')}
            className={`mr-4 ${sortOrder === 'mostRecent' ? 'text-blue-500 font-bold' : ''}`}
          >
            Most Recent
          </button>
          <button
            onClick={() => setSortOrder('oldest')}
            className={`mr-4 ${sortOrder === 'oldest' ? 'text-blue-500 font-bold' : ''}`}
          >
            Oldest
          </button>
          <button
            onClick={() => setSortOrder('mostViewed')}
            className={`mr-4 ${sortOrder === 'mostViewed' ? 'text-blue-500 font-bold' : ''}`}
          >
            Most Viewed
          </button>
          <button
            onClick={() => setSortOrder('leastViewed')}
            className={`${sortOrder === 'leastViewed' ? 'text-blue-500 font-bold' : ''}`}
          >
            Least Viewed
          </button>
        </div>
        </div>

        {/* Loader */}
        {loading ? (
          <div className="flex justify-center items-center min min-h-[400px]">
            <div className="iphone-loader "></div>
          </div>
        ) : paginatedBlogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedBlogs.map((post) => (
              <SingleBlog key={post.id} blog={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No blogs found.</p>
        )}

        {/* Pagination */}
        <div className="my-8 px-6 flex justify-between items-center">
           <button className="size-19 bg-blue-600 bg-opacity-15 p-2 hover:ring-4 rounded-full" onClick={() => handlePagination('prev')} disabled={currentPage === 1}>
             <ChevronLeft/>
           </button>
           <span>Page {currentPage} sur {totalPages}</span>
           <button className="size-19 bg-blue-600 bg-opacity-15 p-2 hover:ring-4 rounded-full" onClick={() => handlePagination('next')} disabled={currentPage === totalPages}>
             <ChevronRight/>
           </button>  
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;

