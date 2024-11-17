import { FaFacebook, FaTwitter, FaLinkedin, FaPinterest } from 'react-icons/fa';
import fs from 'fs/promises';
import path from 'path';
import { useEffect, useState } from 'react';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import blogsData from '../../markdown/blogs.json';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import Link from 'next/link';
import Head from 'next/head';
import { DiscussionEmbed } from 'disqus-react'; // Import Disqus component
import ClipboardJS from 'clipboard';
import { format, differenceInDays } from 'date-fns';
import dynamic from 'next/dynamic';
import remarkToc from 'remark-toc';
import remarkSlug from 'remark-slug';
import TOC from '@/components/TOC';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm'; // Supports tables, task lists, etc.
import TextToAudio from '@/components/TextAudio';
import { BookmarkCheck, BookMarkedIcon, Clock, Copy, Eye } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { BookmarkIcon, BookmarkSlashIcon, EyeIcon } from '@heroicons/react/24/outline';
import Sidebar from '@/components/Sidebar';
import LoaderMe from '@/components/LoaderMe';
import SingleBlog from '@/components/SingleBlog';
// Import Clipboard only on client-side
const Clipboard = dynamic(() => import('clipboard'), { ssr: false });
// Helper function to calculate time elapsed
const timeElapsed = (dateString) => {
  const blogDate = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - blogDate) / 1000);
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 },
  ];
  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count > 0) {
      return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
    }
  }
  return 'just now';
};

export async function getStaticPaths() {
  const paths = blogsData.map((blog) => ({
    params: { slug: blog.title.replace(/\s+/g, '-').toLowerCase() }, // Convert title to slug format
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // Convert slug back to title (slug is lowercased, replace dashes with spaces)
  const title = params.slug.replace(/-/g, ' ').toUpperCase(); // Converts slug back to title

  // Find blog by matching title (case-insensitive)
  const blog = blogsData.find((b) => b.title.toUpperCase() === title); // Match title in case-insensitive manner
  
  if (!blog) {
    return {
      notFound: true, // Return 404 if not found
    };
  }
  // Fetch all blogs by the same author
 
  const filePath = path.join(process.cwd(), 'markdown', `${blog.id}.md`);
  const fileContents = await fs.readFile(filePath, 'utf8');
  const { content } = matter(fileContents);
  
  const relatedBlogs = blogsData.filter((b) => b.category === blog.category && b.id !== blog.id);
  const relatedPostsByAuthor = blogsData.filter((post) => post.author === blog.author && post.id !== blog.id);

  // Convert markdown content to HTML
  const processedContent = await unified()
  .use(remarkParse)
  .use(remarkSlug) // Adds IDs to headings
  .use(remarkRehype,{allowDangerousHtml:true})
  .use(rehypeStringify,{allowDangerousHtml:true})
    .use(remarkToc, { heading: 'Table of Contents', tight: true })
    // .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
    .use(remarkGfm) // Support GitHub flavored markdown (tables, task lists, etc.)
    .use(rehypeHighlight) // Highlight code syntax
    .process(content);
  const contentHtml = processedContent.toString();

  return {
    props: { blog, contentHtml, relatedBlogs, relatedPostsByAuthor },
  };
}

const BlogPost = ({ blog, contentHtml, relatedBlogs,relatedPostsByAuthor }) => {
  const { id, title, description, authorImage, tags, image, date, category, author,views } = blog;
  const [elapsedTime, setElapsedTime] = useState('');

  useEffect(() => {
    setElapsedTime(timeElapsed(date));
  }, [date]);

  const router = useRouter();
  const postUrl = `https://peterthings.vercel.app${router.asPath}`;

  // Social Media Share URLs
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(title)}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(postUrl)}&media=${encodeURIComponent(image)}&description=${encodeURIComponent(description)}`,
  };
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



useEffect(() => {
  setLoading(false); // Update to false after content is fully loaded
}, []);



// Inside BlogPost Component
const [isAdded, setIsAdded] = useState(false);

useEffect(() => {
  const readLaterList = JSON.parse(localStorage.getItem('readLater')) || [];
  setIsAdded(readLaterList.includes(blog.id));
}, [blog.id]);

const addToReadLater = (postId) => {
  const readLaterList = JSON.parse(localStorage.getItem('readLater')) || [];
  if (!readLaterList.includes(postId)) {
    readLaterList.push(postId);
    localStorage.setItem('readLater', JSON.stringify(readLaterList));
    setIsAdded(true);
  }
};
// Calculate the reading time
function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const time = Math.ceil(words / wordsPerMinute);
  return `${time} min read`;
}
  
useEffect(() => {
  if (typeof window !== "undefined") {
    // Only run on client-side
    const clipboard = new ClipboardJS('.copy-btn', {
      target: (trigger) => trigger.previousElementSibling, // Select the code block
    });

    clipboard.on('success', () => {
      alert('Code copied to clipboard!');
    });

    clipboard.on('error', () => {
      alert('Failed to copy code.');
    });

    return () => clipboard.destroy(); // Cleanup on unmount
  }
}, []);


// Inject "Copy" button into code blocks
const enhancedContentHtml = contentHtml.replace(
  /<pre><code([\s\S]*?)<\/code><\/pre>/g,
  (match) =>
    `<div class="relative  group">${match}<button  class="text-[12px] flex items-center copy-btn absolute top-2 right-2 bg-gray-700 bg-opacity-  text-gray-200 gap- px-2 py-1 rounded opacity-100 group-hover:opacity-100 transition-opacity">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
  </svg>Copy

  </button></div>`
);
const [loading, setLoading] = useState(true);

// Simulate loading effect for testing
useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false); // Stop loading after 2 seconds
  }, 2000);

  return () => clearTimeout(timer); // Clean up the timer
}, []);

return (




    <Layout>
      <Head>
        <title>{title}</title>
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={postUrl} />
        <meta property="og:site_name" content="Your Site Name" />


 {/* Open Graph / Facebook */}
 <meta property="og:type" content="article" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={image} />
  <meta property="og:url" content={postUrl} />
  <meta property="og:site_name" content="Your Site Name" />
  <meta property="article:published_time" content={new Date(date).toISOString()} />
  <meta property="article:author" content={author} />
  <meta property="article:tag" content={tags.join(', ')} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:url" content={postUrl} />

        {/* Robots */}
  <meta name="robots" content="index, follow" />
  <meta name="googlebot" content="index, follow" />
  
  {/* Viewport */}
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  {/* Additional Metadata */}
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

      </Head>






 
      <script type="application/ld+json"
      dangerouslySetInnerHTML={{__html: JSON.stringify({

        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "${postUrl}"
        },
        "headline": "${title}",
        "description": "${description}",
        "image": "${image}",  
        "author": {
          "@type": "Person",
          "name": "${author}"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Your Site Name",
          "logo": {
            "@type": "ImageObject",
            "url": "/path/to/your/logo.png"
          }
        },
        "datePublished": "${new Date(date).toISOString()}",
        "dateModified": "${new Date(date).toISOString()}",
        "keywords": "${tags.join(', ')}"
      })}}
      >

</script> 


 <div
      style={{ width: `${scrollProgress}%` }}
      className="fixed top-0 left-0 h-1 bg-blue-500 z-50"
    />
    {loading ? (<SkeletonLoader/>):(

<div className="max-w-7xl mx-auto px-6  bg-red-5 grid grid-cols-1 md:grid-cols-3 smbg-red-100 lg:grid-cols-4 gap-8"> 
  <div className="relative bg">
<div className="fixed sm   lg:w-[20%] md:w-[30%] pt-4  overflow-hidden ">


<Sidebar contentHtml={contentHtml} author={author} relatedPosts={relatedPostsByAuthor} />

</div>
  </div>

          <div className="lg:col-span-3 col-span-1   md:col-span-2">

        <Breadcrumbs category={category} title={title} postUrl={postUrl}/>
        
    
          {/* <Loader/> */}
        <h1 className="text-4xl font-bold mb-4 play">{title}</h1>
        <div className="text-gray-500 dark:text-gray-300 gap-4 flex my-4 items-center">
       <div className=" size-[43px]">

          <img
            src={authorImage}
            alt={title}
            className=" size-full ring-4 object-cover rounded-full  mb-6"
          />
       </div>
          <p className=" text-lg ">
            <p>Cet article a été écrit par:</p>
            <p className="dark:text-gray-50">{author}   • {elapsedTime} </p></p>
        </div>
        <div className="mb-6 font-normal dark:text-gray-300 text-gray-700 ">{description}</div>
        <div className="md:flex-col lg:flex-row flex-col flex gap-5 justify-betwee items-center my-3">


<p className="text-sm  text-gray-700 dark:text-gray-300">Jouer ce Blog en Audio (French only)
  <span className="bg-red-500 bg-opacity-20 text-red-500 text-sm p-2 mx-1 rounded-xl">Beta</span>
</p>
 {/* Text-to-Audio Component */}
 <div className="flex justify-between gap-9">


 <div className="">

<TextToAudio text={contentHtml.replace(/<\/?[^>]+(>|$)/g, "")} />
 </div>
 <div className="">
 <button
className="bg-blue-500 dark:bg-blue-600 bg-opacity-80 text-white px-3 py-2 rounded "
onClick={() => addToReadLater(blog.id)}
>
{isAdded ? <><BookmarkIcon className="size-6"/></> : <><BookmarkSlashIcon className="size-6"/></>}
</button>

 </div>
 </div>
</div>
        
        <img src={image} alt={title} className="w-full lg:h-[230px] h-[190px]   object-cover mx-auo " />
        <div className="flex my-3 items-center justify-between sm:gap-10 sm:justify-start">

        <div className="text-blue-500 text-sm ">{category}</div>
        {/* Tags Section */}
        <span className=" text-gray-200 flex gap-2 items-center">{views} <Eye/></span>
        </div>
     Tags
        <div className="flex flex-wrap space-y-1 my-4 gap-2">
          {tags.map((tag) => (
            <Link key={tag} href={`/tags/${tag}`}>
              
              <span className="bg-gray my-4 text-sm dark:text-gray-100 rounded-full text-gray-800 px-3 py-1  border border-gray-400 hover:border-blue-600 hover:text-blue-600">{tag}</span>
            </Link>
          ))}
        </div>

        <h1 className="h1">TABLE OF CONTENTS
        <TOC content={contentHtml} />
        </h1>
        <div
          className="prose max-w-none play "
          dangerouslySetInnerHTML={{ __html: enhancedContentHtml }}
        ></div>
         <div className="text-3xl play my-4 ">Thank for reading this article</div>


<p className="flex bg- items-center gap-12">
          
          <div className="flex text-s bg-red- items-center gap-2">


                <Clock className="size-5" /> {calculateReadingTime(contentHtml)}
          </div>
          <div className="text-gray-600 mb-1 text-m dark:text-gray-300 ">{format(new Date(blog.date), 'MMMM dd, yyyy')}</div>

              </p>

              <div className="flex bg-re flex-col md:flex-row gap-9">

        <div className="text-gray-500 bg-red dark:text-gray-300 gap-4 flex my-4 items-center">
       <div className=" size-[43px]">

          <img
            src={authorImage}
            alt={title}
            className=" size-full ring-4 object-cover rounded-full  mb-6"
          />
       </div>
          <p className=" text-lg ">
            <p>Cet article a ete ecrit par:</p>
            <p className="dark:text-gray-50">{author}   • {elapsedTime} </p></p>
        </div>
        <div className="fgap-4 my-5 flex-col  md:flex-row">
        <div>Partager cet article sur les reseaux sociaux</div>
        <div className="flex gap-7  mt-4 mx-auto w-max">


          <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-100">
            <FaFacebook size={24} />
          </a>
          <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-100">
            <FaTwitter size={24} />
          </a>
          <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-100">
            <FaLinkedin size={24} />
          </a>
          <a href={shareLinks.pinterest} target="_blank" rel="noopener noreferrer" className="text-gray-100">
            <FaPinterest size={24} />
          </a>
        </div>
        </div>
              </div>




{/* New Section for Author's Blogs */}
{relatedPostsByAuthor.length == 0 ? (<div className="underline">{author} n'a pas d'autre article </div>):(<><div className="text-2xl mt-10 mb-4 play">Autre Blogs par {author}</div>  </>)}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
  {relatedPostsByAuthor.map((blog) => (
    <Link key={blog.id} href={`/blog/${blog.title.replace(/\s+/g, '-').toLowerCase()}`}>
      <div className=" hover:underline rounded-lg S bg-gr hover: transition">
       
        <p className="text-2xl font-bold ">{blog.title}</p>
        <p className="dark:text-gray-400 text-gray-700 my-1">{blog.description}</p>
        <div className="text-gray-600 mb-1 dark:text-gray-300 text-sm">
          {format(new Date(blog.date), 'MMMM dd, yyyy')}
        </div>
      </div>
    </Link>
  ))}
</div>












        <div className="text-2xl mt-10 mb-4 play">Plus d'article de la meme categorie</div>
        <div className="my-2">
            {relatedBlogs.length > 2 ? (<> <Link href={`/blog/category/${category.toLowerCase()}`}>
            <span className="text-blue-600 underline">Afficher tous les Blog de la category {category}</span>
            </Link></>):(<>...</>)}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedBlogs.slice(0,3).map((blog) => (
            <SingleBlog blog={blog}/>
          ))}
        </div>
        

        <div className="mt-10" >
          <div className="text-3xl mb-4 play">Commentaire</div>
          <DiscussionEmbed
            shortname="peterthings" // Replace this with your Disqus shortname
            config={{
              url: `http://localhost:3000/blog/${id}`, // For local testing, use localhost URL
              identifier: id,
              title: title,
            }}
          />
        </div>
         </div>
        {/* Sidebar Component */}
      </div>
    )}
    </Layout>
  );
};

export default BlogPost;
const SkeletonLoader = () => (
  <div className="max-w-7xl mx-auto h-screen grid place-content-center">
<div className="scale-150 iphone-loader">
  
</div>
  </div>
);