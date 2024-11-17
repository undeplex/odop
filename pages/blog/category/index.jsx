import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';

export default function CategoriesPage({ categories }) {
  return (
    <Layout>
      <Head>
        <title>Popular Blog Categories | Doic Neon</title>
        <meta name="description" content="Explore our most popular and frequently visited blog categories, covering a variety of topics that our readers love." />
        <meta name="keywords" content="blog categories, popular blog topics, blog topics, category list, blog" />
        <link rel="canonical" href="https://doic-neon.vercel.app/blog/categories" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Popular Blog Categories | Your Blog Name" />
        <meta property="og:description" content="Explore our most popular and frequently visited blog categories." />
        <meta property="og:url" content="https://doic-neon.vercel.app/blog/categories" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://doic-neon.vercel.app/your-image.jpg" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Popular Blog Categories | Your Blog Name" />
        <meta name="twitter:description" content="Explore our most popular and frequently visited blog categories." />
        <meta name="twitter:image" content="https://doic-neon.vercel.app/your-image.jpg" />

        {/* Breadcrumb Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://doic-neon.vercel.app/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": "https://doic-neon.vercel.app/blog"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Categories",
                "item": "https://doic-neon.vercel.app/blog/categories"
              }
            ]
          })}
        </script>
      </Head>

      <div className="max-w-4xl mx-auto px-6 py-6 md:pt-12">
        <nav className="text-sm dark:text-gray-300 text-gray-500 mb-4">
          <Link href="/">
            <span className="hover:underline">Home</span>
          </Link>
          {' / '}
          <Link href="/blog">
            <span className="hover:underline">Blog</span>
          </Link>
          {' / '}
          <span className="hover:underline">Categories</span>
        </nav>
        
        <h1 className="text-3xl font-bold text-center mb-6 play">Categories</h1>
        <p>Explore our most popular and frequently visited categories:</p>
        
        <ul className="space-y-4">
          {categories.map((category) => (
            <li key={category} className="text-lg list-none my-3">
              <Link href={`/blog/category/${category.toLowerCase()}`}>
                <span className="text-blue-500 hover:text-blue-700 transition-colors">
                  {category}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );	
}

// Server-side function to load categories
export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'markdown', 'blogs.json'); // Adjust path if necessary
  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  // Extract unique categories from the posts
  const categories = [...new Set(jsonData.map(post => post.category))];

  return { props: { categories } };
}