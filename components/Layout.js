import Link from 'next/link';

import Footer from './Footer';
import { BoltIcon } from '@heroicons/react/24/solid';
import SearchForm from './SearchForm';
import DarkModeToggle from './DarkModeToggle';
import MobileMenu from './MobileMenu';
import { Search } from 'lucide-react';
import LoaderMe from './LoaderMe';

export default function Layout({ children }) {
  
   

    return (
        <div className="fle relative flex-col  justi justify-center">
           
            <header className=" w-full z-50  100 bg-white dark:bg-slate-900 fixed top-0 a dark:bg-slat-800 ">
       
               
                <div className=" lg:hidden md:hidden w-full flex gap-2 px-2 items-center my-2 justify-between ">
                    <div className="flex gap-4 items-center w-full bg-red-5 justify-between">
                    <MobileMenu/>
                    <Link href="/search">
                    <Search className="text-gray-700 dark:text-gray-100 size-7"/>
                    </Link>
                  

                    
                    <div className="dark:text-white flex justify-center play my-2 items-center  max-w w-max mx-auto ">
                    <Link href="/">
                        <img className="w-[72px] dark:invert" src="/doic.svg"/>
                    </Link><span>Blog</span>
                       
                    </div>
                    <>
                    
                   <DarkModeToggle/>
                    </>
                    </div>
                </div>
                    <div className="hidden w-full z z-50 my g-white border-b-o  fixed  top-[-1px]  lg:block md:block">

                <nav className="fu w-full  bg-white dark:text-gray-50 px-14 py-2 dark:bg-slate-900">
                    <div className="flex w- justify-between items-center">



                    <div className="flex justify-center  my-2 items-center  max-w w-max mx-auto ">
                    <Link href="/">
                        <img className="w-[72px] dark:invert" src="/doic.svg"/>
                       
                        
                    </Link>
                        <span className="play">
                          Make it our own way!
                        </span>
                    </div>


                   
                <div className="flex gap-2 items-center">

                </div>
                    </div>
                    <div className="flex ot items-center w-max gap-5 justify-center mx-auto">

                       <div className="flex w-max text-lg  mx-auto mt-2 items-center gap-2 ">
                    <Link href="/blog">Blog</Link>
                    </div>
                    <div className="">
                        
                    </div>
                       <div className="flex w-max text-lg  mx-auto mt-2 items-center gap-2 ">
                    <Link href="/blog/category">Category</Link>
                    </div>
                       <div className="flex w-max text-lg mx-auto mt-2 items-center gap-2 ">
                    <Link href="/testme">newsLetter</Link>
                    </div>
                       <div className="flex w-max text-lg  mx-auto mt-2 items-center gap-2 ">
                    <Link href="/read-later">Read Later</Link>
                    </div>
<SearchForm/>
Light<DarkModeToggle/>Dark
                    </div>
                </nav>
                    </div>
            </header>


            <main className="min-h-screen  overflow-x-hidden p- sm:pt-[70px] md:pt-[80px] pt-[40px] z-50 dark:bg-slate-900 dark:text-white">{children}</main>



            <div className="w-full  ">

            <Footer/>
            </div>
            
        </div>
    );
}
