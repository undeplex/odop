
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';
import Layout from '@/components/Layout';
import FeaturedSection from '@/components/FeaturedSection';
import RecentPost from '@/components/RecentPost';
import { differenceInDays } from 'date-fns';
import { categories } from '@/markdown/categories';
import PopCat from '@/components/PopCat';
import SubscribeForm from '@/components/SubscribeForm';
import MostViewedBlogs from '@/components/MostViewedBlogs';
import Link from 'next/link';
import AnimatedText from '@/components/AnimatedText';
import { GlobeEuropeAfricaIcon } from '@heroicons/react/24/outline';
import { ArrowDown } from 'lucide-react';
import Profiler from '@/components/Profiler';

// Load posts from JSON and Markdown
async function loadPosts() {
  const jsonPath = path.join(process.cwd(), 'markdown', 'blogs.json');
  const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

  return jsonData.map(post => {
    const markdownPath = path.join(process.cwd(), 'markdown', `${post.id}.md`);
    const fileContents = fs.readFileSync(markdownPath, 'utf-8');
    const { content } = matter(fileContents);

    // Calculate reading time
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const readingTime = `${Math.ceil(words / wordsPerMinute)} min read`;

    return {
      ...post,
      content,
      readingTime,
      date: new Date(post.date).toISOString(),
    };
  });
}

// Filter recent posts
function filterRecentPosts(posts) {
  const today = new Date();
  return posts.filter(post => differenceInDays(today, new Date(post.date)) <= 10);
}

// Filter featured posts
function filterFeaturedPosts(posts) {
  return posts.filter(post => post.featured);
}

// Get most viewed posts
function getMostViewedPosts(posts) {
  return posts.sort((a, b) => b.views - a.views).slice(0, 4);
}

export async function getStaticProps() {
  const allPosts = await loadPosts();
  const recentPosts = filterRecentPosts(allPosts);
  const featuredPosts = filterFeaturedPosts(allPosts);
  const mostViewedPosts = getMostViewedPosts(allPosts);
  return { props: { recentPosts, featuredPosts, mostViewedPosts } };
}

export default function Blogs({ recentPosts, featuredPosts, mostViewedPosts }) {
  const pageTitle = "Recent Blogs | New, Popular & Most Visited Articles";
  const pageDescription =
    "Discover our most recent blogs, popular posts, and trending articles. Stay updated with the latest insights and trends.";
  const pageUrl = "https://yourdomain.com/blogs";
  const siteName = "Your Blog Site";
  const ogImage = "https://yourdomain.com/og-image.jpg";

  return (
    <Layout>
      <Head>
        {/* Basic SEO Tags */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />

        {/* Open Graph Metadata for Social Sharing */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content={siteName} />

        {/* Twitter Card Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:site" content="@YourTwitterHandle" />

        {/* Canonical Link */}
        <link rel="canonical" href={pageUrl} />

        {/* Structured Data with JSON-LD for Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": pageUrl,
              },
              "headline": pageTitle,
              "description": pageDescription,
              "image": ogImage,
              "author": {
                "@type": "Person",
                "name": "Your Author Name",
              },
              "publisher": {
                "@type": "Organization",
                "name": siteName,
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://yourdomain.com/logo.png",
                },
              },
              "datePublished": "2024-11-15",
              "dateModified": "2024-11-15",
            }),
          }}
        />
      </Head>

      {/* Page Content */}
      <div className="max-w-7xl mx-auto pt-8">
        <div className="px-3 bg-red-5">
{/* <AnimatedText/> */}

        <h1 className="md:text-5xl text-4xl font-bold text-center  play">Grow,Learn and have fun Reading on
        <img src="/doic.svg" className="inver  mx-3 dark:invert w-[100px] md:w-[193px] inline"/>
<span className="text-2xl"> Blog</span>
          
           </h1>
        <p className=" break-al text-center md:text-xl dark:text-gray-200 my-4 md:w-8/12 mx-auto">
          Just in time pour decouvrir des trendy topics pour Booster votre every day, avec des blogs orienter educations et overall growth, we're also project focus 'cause we really are all about tangible result 
        </p>
        <div className="flex flex-col md:flex-row w-max mx-auto gap-6">


        <Link href="/">
        <ArrowDown className="mx-auto"/>

        <button className="dark text-gray-700 flex items-center underline dark:text-white px-5 py-3 rounded-full mx-auto ">Voir la liste de tous les articles

          <GlobeEuropeAfricaIcon className="inline size-5"/>
        </button>
        </Link>
        <Link href="/">
        <button className=" text-gray-950 dark:text-gray-200 border-2 px-5 py-3 rounded-full mx-auto  block mb-4">Nous contacter</button>
        </Link>
        </div>
        </div>



        <h1 className="text-4xl font-bold text-center mb-6 play">Most Viewed Blogs</h1>
        <MostViewedBlogs posts={mostViewedPosts} />

        {featuredPosts.length > 0 && (
          <FeaturedSection featuredPosts={featuredPosts} />
        )}

    
        <p className="text-center text-lg mb-6">
          Explore our latest articles, including the most popular and frequently visited posts.
        </p>
   
              <h1 className="text-4xl font-bold text-center mb-6 play">Recent Blogs (Last 5 Days)</h1>
     

        <div className="grid px-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recentPosts.map(post => (
            <RecentPost key={post.id} post={post} />
          ))}
        </div>

        <h1 className="text-4xl font-bold text-center my-4 play">Discover Popular Categories</h1>
        <p className="text-center text-lg mb-6">
          Explore categories that might interest you as they are frequently visited.
        </p>
        <PopCat categories={categories} />
        <div className="px-4">
           <Profiler/>
        </div>
        <div className="px-4">
            <SubscribeForm />
        </div>
      </div>
    </Layout>
  );
}