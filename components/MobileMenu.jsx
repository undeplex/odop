import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Search, X } from 'lucide-react';
import { Bars2Icon } from '@heroicons/react/24/solid';
import { gsap } from 'gsap';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [toggleStyle, setToggleStyle] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        menuRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, [isOpen]);

  return (
    <div>
      <button
        onClick={() => { setIsOpen(!isOpen); setToggleStyle(!toggleStyle); }}
        className="focus:outline-none"
      >
        {isOpen ? <X className="size-10 dark:text-white text-gray-800" /> : <Bars2Icon className="size-10 dark:text-white text-gray-800" />}
      </button>

      <div className={`fixed text-gray-600 dark:text-white top-13 left-0 w-full p-4 bg-gray-5 h-screen dark:bg-slate-900 bg-white h-max rounded-bl-3xl z-50 transform transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-[900px]'}`}>
        <div ref={menuRef} className="flex flex-col space-y-3 play gap-2 text-xl">
          <Link href="/">
            <span className="hover:text-gray-500 play text-4xl">Home</span>
          </Link>
          <Link href="/blog">
            <span className="hover:text-gray-500 play text-4xl">Blog</span>
          </Link>
          <Link href="/blog/category">
            <span className="hover:text-gray-500 play text-4xl">Category</span>
          </Link>
          <Link href="/">
            <span className="hover:text-gray-500 play text-4xl">Apropos de Doic llc.</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;