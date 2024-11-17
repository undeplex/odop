
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown, X } from 'lucide-react';
import { Bars2Icon } from '@heroicons/react/24/solid';
import { gsap } from 'gsap';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [toggleStyle, setToggleStyle] = useState(false);
  const [categories, setCategories] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        menuRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, [isOpen]);

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (dropdownOpen) {
      gsap.fromTo(
        dropdownRef.current.children,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, stagger: 0.1, ease: 'power1.out' }
      );
    }
  }, [dropdownOpen]);

  return (
    <div>
      <button
        onClick={() => { setIsOpen(!isOpen); setToggleStyle(!toggleStyle); }}
        className="focus:outline-none"
      >
        {isOpen ? <X className="size-8 dark:text-white text-gray-800" /> : <Bars2Icon className="size-8 dark:text-white text-gray-800" />}
      </button>

      <div className={`fixed text-gray-600 dark:text-white top-13 left-0 w-full px-6 bg-gray-5 h-screen dark:bg-slate-900 bg-white rounded-bl-3xl z-50 transform transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-[900px]'}`}>
        <div ref={menuRef} className="flex pt-5 flex-col space-y-3 play gap-2 text-xl">
          <Link href="/">
            <span className="hover:text-blue-500  play text-3xl">Home</span>
          </Link>
          <Link href="/blog">
            <span className="hover:text-blue-500 play text-3xl">Blog</span>
          </Link>
          <Link href="/contact">
            <span className="hover:text-blue-500 play text-3xl">Contact</span>
          </Link>
          <Link href="/tags">
            <span className="hover:text-blue-500 play text-3xl">Popular tags</span>
          </Link>
          <Link href="/read-later">
            <span className="hover:text-blue-500 play text-3xl">Read Later</span>
          </Link>

          {/* Dropdown Menu for Categories */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="hover:text-blue-500 play text-3xl flex items-center"
            >
              Category
              <span className={`ml-2 transform transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}>
                <ChevronDown/>
              </span>
            </button>
            {dropdownOpen && (
              <div
                ref={dropdownRef}
                className=""
              >
                {categories.map((category, index) => (
              <Link href={`/blog/category/${category.toLowerCase()}`}>
                    <span className="block text-2xl play px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                      {category}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/">
            <span className="hover:text-blue-500 play text-3xl">About Doic LLC</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;

