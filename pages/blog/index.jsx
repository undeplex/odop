
// import path from 'path';
// import fs from 'fs/promises';
// import Link from 'next/link';
// import { useState, useEffect } from 'react';
// import matter from 'gray-matter';
// import { unified } from 'unified';
// import remarkParse from 'remark-parse';
// import remarkRehype from 'remark-rehype';
// import rehypeStringify from 'rehype-stringify';
// import blogsData from '../../markdown/blogs.json';
// import Layout from '@/components/Layout';
// import { format, parseISO, isSameDay } from 'date-fns';

// const POSTS_PER_PAGE = 6;

// function calculateReadingTime(content) {
//   const wordsPerMinute = 200;
//   const words = content.split(/\s+/).length;
//   return `${Math.ceil(words / wordsPerMinute)} min read`;
// }

// export async function getStaticProps() {
//   const blogs = await Promise.all(
//     blogsData.map(async (blog) => {
//       const filePath = path.join(process.cwd(), 'markdown', `${blog.id}.md`);
//       const fileContents = await fs.readFile(filePath, 'utf8');

//       const { content } = matter(fileContents);
//       const processedContent = await unified()
//         .use(remarkParse)
//         .use(remarkRehype)
//         .use(rehypeStringify)
//         .process(content);

//       return {
//         ...blog,
//         content: processedContent.toString(),
//       };
//     })
//   );

//   return {
//     props: { blogs },
//   };
// }

// const BlogPage = ({ blogs }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [search, setSearch] = useState('');
//   const [filteredBlogs, setFilteredBlogs] = useState(blogs);
//   const [selectedDate, setSelectedDate] = useState('');
//   const [sortOrder, setSortOrder] = useState('mostRecent');

//   const totalPages = Math.ceil(filteredBlogs.length / POSTS_PER_PAGE);

//   // Full-text search and filtering logic
//   useEffect(() => {
//     let updatedBlogs = blogs.filter((blog) =>
//       (blog.title + blog.description + blog.category + blog.content)
//         .toLowerCase()
//         .includes(search.toLowerCase())
//     );

//     // Filter by selected date
//     if (selectedDate) {
//       updatedBlogs = updatedBlogs.filter(blog =>
//         isSameDay(new Date(blog.date), new Date(selectedDate))
//       );
//     }

//     // Sort by most recent or oldest
//     updatedBlogs.sort((a, b) => {
//       return sortOrder === 'mostRecent'
//         ? new Date(b.date) - new Date(a.date)
//         : new Date(a.date) - new Date(b.date);
//     });

//     setFilteredBlogs(updatedBlogs);
//   }, [search, selectedDate, sortOrder, blogs]);

//   const paginatedBlogs = filteredBlogs.slice(
//     (currentPage - 1) * POSTS_PER_PAGE,
//     currentPage * POSTS_PER_PAGE
//   );

//   const handlePagination = (direction) => {
//     setCurrentPage((prevPage) => {
//       if (direction === 'next' && currentPage < totalPages) return prevPage + 1;
//       if (direction === 'prev' && currentPage > 1) return prevPage - 1;
//       return prevPage;
//     });
//   };

//   const resetFilters = () => {
//     setSearch('');
//     setSelectedDate('');
//     setSortOrder('mostRecent');
//     setFilteredBlogs(blogs);
//     setCurrentPage(1);
//   };

//   return (
//     <Layout>
//       <div className="max-w-7xl mx-auto p-6">
//         <h1 className="text-3xl my-4 mx-auto w-max">List of Our Best Blogs</h1>

//         {/* Search Bar */}
//         <input
//           type="text"
//           placeholder="Recherche rapide"
//           className="form-input mb-6 w-full border p-2"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         {/* Date Picker */}
//         <div className="flex items-center gap-4 mb-6">
          
//           <input
//             type="date"
//             value={selectedDate}
//             onChange={(e) => setSelectedDate(e.target.value)}
//             className="border p-2"
//           />
//           <button onClick={resetFilters} className="px-4 py-2 bg-blue-500 text-white rounded">
//             Display All
//           </button>
//         </div>

//         {/* Sorting Options */}
//         <div className="mb-6">
//           <button
//             onClick={() => setSortOrder('mostRecent')}
//             className={`mr-4 ${sortOrder === 'mostRecent' ? 'font-bold' : ''}`}
//           >
//             Most Recent
//           </button>
//           <button
//             onClick={() => setSortOrder('oldest')}
//             className={`${sortOrder === 'oldest' ? 'font-bold' : ''}`}
//           >
//             Oldest
//           </button>
//         </div>

//         {/* Blog List */}
//         {paginatedBlogs.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {paginatedBlogs.map((blog) => (
//               <div key={blog.id} className="mb-8 border-b pb-4">
//                 <Link href={`/blog/${blog.title.replace(/\s+/g, '-').toLowerCase()}`}>
//                   <img src={blog.image} alt={blog.title} className="w-full h-[120px] rounded-xl object-cover mb-4" />
//                 </Link>
//                 <h2 className="text-2xl font-bold">{blog.title}</h2>
//                 <p className="text-gray-700">{blog.description}</p>
//                 <div className="text-gray-600 text-sm">{format(parseISO(blog.date), 'MMMM dd, yyyy')}</div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-center text-gray-500">No blogs found for the selected date.</p>
//         )}

//         {/* Pagination Controls */}
//         <div className="mt-8 flex justify-between items-center">
//           <button onClick={() => handlePagination('prev')} disabled={currentPage === 1}>
//             Previous
//           </button>
//           <span>Page {currentPage} of {totalPages}</span>
//           <button onClick={() => handlePagination('next')} disabled={currentPage === totalPages}>
//             Next
//           </button>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default BlogPage;
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

  const totalPages = Math.ceil(filteredBlogs.length / POSTS_PER_PAGE);

  // Filter and sort logic
  useEffect(() => {
    setLoading(true);
    let updatedBlogs = [...blogs];

    // Filter by selected month-year
    if (selectedDate) {
      updatedBlogs = updatedBlogs.filter(blog =>
        isSameMonth(new Date(blog.date), selectedDate)
      );
    }

    // Sort by most recent, oldest, most viewed, or least viewed
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
    setLoading(false);
  }, [selectedDate, sortOrder, blogs]);

  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handlePagination = (direction) => {
    setCurrentPage((prevPage) => {
      if (direction === 'next' && currentPage < totalPages) return prevPage + 1;
      if (direction === 'prev' && currentPage > 1) return prevPage - 1;
      return prevPage;
    });
  };

  const resetFilters = () => {
    setSelectedDate(null);
    setSortOrder('mostRecent');
    setFilteredBlogs(blogs);
    setCurrentPage(1);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Ajoutez ici votre logique pour filtrer les blogs par mois/année
  };
  return (
    <Layout>
      <div className="max-w-7xl mx-auto ">
        <h1 className="text-3xl my-4 mx-auto w-max">List of Our Best Blogs</h1>

        {/* Date Picker */}
        <div className="flex items-center gap-4 mb-6 px-3" >
        <MonthYearPicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                  
          <button onClick={resetFilters} className="px-4 py-2 bg-blue-500 text-white rounded">
            Display All
          </button>
        </div>

        {/* Sorting Options */}
        <div className="mb-6 px-3">
          <button
            onClick={() => setSortOrder('mostRecent')}
            className={`mr-4 ${sortOrder === 'mostRecent' ? 'font-bold' : ''}`}
          >
            Most Recent
          </button>
          <button
            onClick={() => setSortOrder('oldest')}
            className={`mr-4 ${sortOrder === 'oldest' ? 'font-bold' : ''}`}
          >
            Oldest
          </button>
          <button
            onClick={() => setSortOrder('mostViewed')}
            className={`mr-4 ${sortOrder === 'mostViewed' ? 'font-bold' : ''}`}
          >
            Most Viewed
          </button>
          <button
            onClick={() => setSortOrder('leastViewed')}
            className={`${sortOrder === 'leastViewed' ? 'font-bold' : ''}`}
          >
            Least Viewed
          </button>
        </div>

        {/* Loading State */}
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : paginatedBlogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedBlogs.map((post) => (
              <div key={post.id} className=" dark:text-gray-500 group ">
              <Link href={`/blog/${post.title.replace(/\s+/g, '-').toLowerCase()}`} passHref>
              <div className="w-full  rounded-lg p-4">
            <img src={post.image} alt={post.title} className="w-full  h-[160px] object-cover  my-2" />
        
          <h1 className="play  group-hover:underline dark:text-gray-50  text-2xl font-bold text-left mt-4 hover:underline">{post.title}</h1>
          <p className="text-gray-600 mt-2 group-hover:underline text-left dark:text-slate-100">{post.description}</p>
          <div className="text-sm text-gray-500 dark:text-gray-400 ">

            <span className="flex my-2 items-center gap-3  font-bold">

          Par {post.author}
              <span className="size-1 bg-gray-800 dark:bg-gray-300 rounded-full"></span>
              <span>{format(new Date(post.date), 'MMMM dd, yyyy')}</span>
              </span> 
          </div>
          <span className="size1 text-blue-600 l text-left w-full block ">{post.category}</span>

        </div>
              </Link>
            </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No blogs found for the selected date.</p>
        )}

        {/* Pagination Controls */}
        <div className="mt-8 flex justify-between items-center">
          <button onClick={() => handlePagination('prev')} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={() => handlePagination('next')} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;


