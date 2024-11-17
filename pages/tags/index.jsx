import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import Layout from '@/components/Layout';
import Link from 'next/link';

export async function getStaticProps() {
  // Read the blogs.json file
  const filePath = path.join(process.cwd(),'markdown', 'blogs.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const blogs = JSON.parse(fileContents);

  // Extract unique tags
  const tags = Array.from(new Set(blogs.flatMap((blog) => blog.tags)));

  return {
    props: {
      tags,
    },
  };
}

export default function TagsPage({ tags }) {
  const siteName = 'My Blog Site';
  const pageUrl = 'https://yourwebsite.com/tags';
  const pageTitle = 'Tags - Explore Topics on My Blog';
  const pageDescription =
    'Discover all the tags used in our blogs. Explore various topics such as technology, automation, and system administration.';

  // JSON-LD for structured data
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: pageTitle,
    description: pageDescription,
    url: pageUrl,
  };

  return (
    <>
      <Head>
        {/* Basic SEO */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="tags, blog tags, explore topics, categories" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:image" content="https://yourwebsite.com/og-image.jpg" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://yourwebsite.com/twitter-image.jpg" />

        {/* Canonical URL */}
        <link rel="canonical" href={pageUrl} />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </Head>

<Layout>

      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1 className="play text-3xl">Tags</h1>
        <p className="text-lg my-4">
         Ceci est une liste non exhausive de tous les sujets en particuliers dont nous parlons ... 
      
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '15px',
          }}
        >
          {tags.map((tag, index) => (
            <Link  href={`/tags/${tag}`}>
            <div
              key={index} className="border hover:border-blue-600 hover:text-blue-600 text-center px-4 py-3 rounded-full">
              {tag}
            </div>
            </Link>
          ))}
        </div>
      </div>
</Layout>
    </>
  );
}

