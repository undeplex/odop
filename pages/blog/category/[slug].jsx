import Layout from '@/components/Layout';
import fs from 'fs';
import Link from 'next/link';
import path from 'path';
import Head from 'next/head';
import { format } from 'date-fns';
import SingleBlog from '@/components/SingleBlog';

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'markdown', 'blogs.json');
  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const categories = [...new Set(jsonData.map(post => post.category))];
  const paths = categories.map((category) => ({
    params: { slug: category.toLowerCase() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'markdown', 'blogs.json');
  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const filteredPosts = jsonData.filter(
    post => post.category.toLowerCase() === params.slug
  );

  return { props: { category: params.slug, posts: filteredPosts } };
}

const CategoryPage = ({ category, posts }) => {
  const categoryTitle = `${category.charAt(0).toUpperCase() + category.slice(1)} Articles`;
  const pageTitle = `${categoryTitle} - My Blog`; // Customize with your blog's name
  const pageDescription = `Explore insightful articles on ${category} from our blog. Stay updated with our latest content.`;
  const pageUrl = `https://yourwebsite.com/blog/category/${category}`; // Update with your domain

  return (
    <Layout>
      <Head>
        {/* Basic SEO */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        
        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={pageUrl} />
        
        {/* Structured Data for Breadcrumbs */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://yourwebsite.com" },
              { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://yourwebsite.com/blog" },
              { "@type": "ListItem", "position": 3, "name": "Category", "item": "https://yourwebsite.com/blog/category" },//i will place the category in blog page 
              { "@type": "ListItem", "position": 4, "name": categoryTitle, "item": pageUrl },
            ],
          })}
        </script>
        
        {/* Structured Data for Blog Category */}
        {posts.map((post) => (
          <script
           
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": post.title,
                "description": post.description,
                "author": post.author,
                "datePublished": post.date,
                "url": `https://yourwebsite.com/blog/${post.title.replace(/\s+/g, '-').toLowerCase()}`
              }),
            }}
          />
        ))}
      </Head>

      <div className="max-w-7xl mx-auto pt-12 px-4">
        <nav className="text-sm dark:text-gray-300 text-gray-500 mb-4">
          <Link href="/">
            <span className="hover:underline">Home</span>
          </Link>
          {' / '}
          <Link href="/blog">
            <span className="hover:underline">Blog</span>
          </Link>
          {' / '}
          <Link href="/blog/category">
            <span className="hover:underline">Category</span>
          </Link>
          {' / '}
          <span className="hover:underline">{category}</span>
        </nav>
        
        <h1 className="text-3xl font-bold text-center mb-6">{categoryTitle}</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.map((blog) => (
              
         <>
         <SingleBlog blog={blog} />
          </>

          
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
