// Breadcrumbs.js
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Breadcrumbs = ({ category, title,postUrl }) => {
  const router = useRouter();

  return (
    <>
    <Head>
        <script type="application/ld+json">
{`
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://yourwebsite.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "blog",
      "item": "https://yourwebsite.com/blog"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "${category}",
      "item": "https://yourwebsite.com/blog/category/${category.toLowerCase()}"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "${title}",
      "item": "${postUrl}"
    }
  ]
}
`}
</script>
    </Head>
    <nav className="text-sm dark:text-gray-300 text-gray-500 mb-4">
      <Link href="/">
        <span className="hover:underline">Home</span>
      </Link>
      {' / '}
      <Link href="/blog">
        <span className="hover:underline">Blog</span>
      </Link>
      {' / '}
      <Link href={`/blog/category/${category.toLowerCase()}`}>
        <span className="hover:underline">{category}</span>
      </Link>
      {' / '}
      <span>{title}</span>
    </nav>
    </>
  );
};

export default Breadcrumbs;
