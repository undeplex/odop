import Layout from '@/components/Layout';
import blogsData from '../../markdown/blogs.json';
import Link from 'next/link';
import Head from 'next/head';
import SingleBlog from '@/components/SingleBlog';

export async function getStaticPaths() {
  const allTags = [...new Set(blogsData.flatMap(blog => blog.tags))];
  const paths = allTags.map((tag) => ({ params: { tag } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const tag = params.tag;
  const filteredBlogs = blogsData.filter(blog => blog.tags.includes(tag));
  return { props: { tag, filteredBlogs } };
}

const TagPage = ({ tag, filteredBlogs }) => {
  const pageTitle = `Posts Tagged with "${tag}" - My Blog`; // Customize with your blog's name
  const pageDescription = `Browse posts tagged with "${tag}" on our blog. Discover articles covering ${tag} and more.`;
  const pageUrl = `https://yourwebsite.com/tags/${tag}`; // Update with your domain

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
              { "@type": "ListItem", "position": 3, "name": `Tag: ${tag}`, "item": pageUrl },
            ],
          })}
        </script>

        {/* Structured Data for Tagged Blog Posts */}
        {filteredBlogs.map((blog, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": blog.title,
                "description": blog.description,
                "author": blog.author,
                "datePublished": blog.date,
                "url": `https://yourwebsite.com/blog/${blog.title.replace(/\s+/g, '-').toLowerCase()}`
              }),
            }}
          />
        ))}
      </Head>

      <div className="max-w-7xl px-4 mx-auto pt-12">
        <nav className="text-sm dark:text-gray-300 text-gray-500 mb-4">
          <Link href="/">
            <span className="hover:underline">Home</span>
          </Link>
          {' / '}
          <Link href="/blog">
            <span className="hover:underline">Tags</span>
          </Link>
          {' / '}
          <span className="hover:underline">{tag}</span>
        </nav>

        <h1 className="text-3xl mb-6">Posts tagged with "{tag}"</h1>

        {filteredBlogs.map(blog => (
         <SingleBlog blog={blog}/>
        ))}
      </div>
    </Layout>
  );
};

export default TagPage;