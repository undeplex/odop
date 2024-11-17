// components/Sidebar.js
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import TOC from '@/components/TOC';
import { format } from 'date-fns';
const Sidebar = ({ contentHtml, relatedPosts,author }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Toggle sidebar on mobile
  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 767);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <aside className={`p-4 relative hidden md:block z-50 bg border-l sm w-[100%] hidd bg0  dark:border-gray-700`}>
      {/* For Mobile: Collapsible TOC and Related Posts */}
      {isMobile ? (
        <div className="mb-6 w-full   rounded-xl">
          <button
            onClick={toggleSidebar}
            className="w-full flex items-center justify-between p-3 bg-blue-500 dark:bg-blue-700 text-white rounded-lg"
          >
            <span>Table of Contents</span>
            {isOpen ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
          </button>
          {isOpen && (
            <div className="mt-4 overflow overflow-scroll">
              <TOC content={contentHtml} />
              <div className=" mt-6 mb-3 text-lg font-semibold">More from Bibb</div>
              {relatedPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.title.replace(/\s+/g, '-').toLowerCase()}`}>
                  <div className="mb-4 cursor-pointer">
                    <p className="font-bold">{post.title}</p>
                    </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="">
          {/* For Desktop: Static Sidebar */}
          <div className="text-xl font-bold mb-4">Table of Contents</div>
          <TOC content={contentHtml} />
          <h3 className="mt-6 mb-3 text-lg font-semibold">More from {author}</h3>
          {relatedPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.title.replace(/\s+/g, '-').toLowerCase()}`}>
              <div className="mb-4 cursor-pointer">
                <p className="font-bold">{post.title}</p>
                <div className="text-gray-600 mb-1 dark:text-gray-300 text-sm">{format(new Date(post.date), 'MMMM dd, yyyy')}</div>
                </div>
            </Link>
          ))}
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
