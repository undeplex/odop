
// import Link from 'next/link';
// import { format } from 'date-fns';
// const FeaturedSection = ({ featuredPosts }) => {
//   const mainPost = featuredPosts[4];
//   const sidePosts = featuredPosts.slice(1, 5); // Get up to three additional posts

//   return (
//     <section className="py-8 container mx-auto">
//       <h2 className="text-4xl play font-bold text-center mb-6">Featured Blogs</h2>
//       <div className="">
        
//         {/* Main Featured Post (Left) */}
//         <div className="w-full relative  rounded-lg ">
//           <Link href={`/blog/${mainPost.title.replace(/\s+/g, '-').toLowerCase()}`} passHref>
//             <img src={mainPost.image} alt={mainPost.title} className="w-full md:h-[500px] h-64 object-cover  my-2" />
//           </Link>
//           <h1 className="play dark:text-gray-00 block md:hidden  text-2xl font-bold text-left mt-4">{mainPost.title}</h1>
//           <p className="text-gray-600 mt-2 block md:hidden text-left dark:text-slate-100">{mainPost.description}</p>
//           <div className="text-sm text-gray-500 block md:hidden mt-4">
//             <span className="flex items-center gap-3  font-bold">
//             <img src={mainPost.authorImage} alt={mainPost.title} className="size-9 rounded-full w-full ring-4 object-cover  my-2" />

//            {mainPost.author}
//               <span className="size-1 bg-black rounded-full"></span>
//               <span>{format(new Date(mainPost.date), 'MMMM dd, yyyy')}</span>
//               </span> 
//           </div>
//           <div>

//           <div className="text-sm absolute bottom-0 p-4  bg-black w-full text-gray-500 mt-4">
//           <h1 className="play dark:text-gray-00   text-2xl font-bold text-left mt-4">{mainPost.title}</h1>
//           <p className="text-gray-600 mt-2 text-left dark:text-slate-100">{mainPost.description}</p>
//             <span className="flex items-center gap-3  font-bold">
//             <img src={mainPost.authorImage} alt={mainPost.title} className="size-9 rounded-full ring-4 object-cover  my-2" />

//            {mainPost.author}
//               <span className="size-1 bg-black rounded-full"></span>
//               <span>{format(new Date(mainPost.date), 'MMMM dd, yyyy')}</span>
//               </span> 
//           </div>
//           </div>
//         </div>
        
//         {/* Side Featured Posts (Right) */}
//         <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4">
//           {sidePosts.map((mainPost, index) => (
//             <div key={index} className=" dark:text-gray-500  ">
//               <Link href={`/blog/${mainPost.title.replace(/\s+/g, '-').toLowerCase()}`} passHref>
//               <div className="w-full  rounded-lg p-4">
//             <img src={mainPost.image} alt={mainPost.title} className="w-full  h-[160px] object-cover  my-2" />
        
//           <h1 className="play underline dark:text-gray-50  text-2xl font-bold text-left mt-4 hover:underline">{mainPost.title}</h1>
//           <p className="text-gray-600 mt-2 text-left dark:text-slate-100">{mainPost.description}</p>
//           <div className="text-sm text-gray-500 dark:text-gray-400 ">

//             <span className="flex my-2 items-center gap-3  font-bold">

//           Par {mainPost.author}
//               <span className="size-1 bg-gray-800 dark:bg-gray-300 rounded-full"></span>
//               <span>{format(new Date(mainPost.date), 'MMMM dd, yyyy')}</span>
//               </span> 
//           </div>
//           <span className="size1 text-blue-600 l text-left w-full block ">{mainPost.category}</span>

//         </div>
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturedSection;

import Link from 'next/link';
import { format } from 'date-fns';
import SingleBlog from './SingleBlog';

const FeaturedSection = ({ featuredPosts }) => {
  const mainPost = featuredPosts[4];
  const sidePosts = featuredPosts.slice(1, 5); // Get up to three additional posts

  // Helper function to truncate text
  const truncateText = (text, limit) => {
    return text.length > limit ? `${text.substring(0, limit)}...` : text;
  };

  return (
    <section className="py-8 text-left container mx-auto">
      <h2 className="text-4xl play font-bold text-center mb-6">Featured Blogs</h2>
      <div className="">
       
        <div className="w-full rounded-lg  relative">
          <Link href={`/blog/${mainPost.title.replace(/\s+/g, '-').toLowerCase()}`} passHref>
            <div className="relative  mx-auto group ">
              <img
                src={mainPost.image}
                alt={mainPost.title}
                className="w-full sm:h-[450px] md:h-[550px] h-64 object-cover my-2 main-feature-img"
              />
              <div className="absolute hidden sm:block p-3 w-full bottom-0  h-[300px] left-0 bg-gradient-to-t from-black via-transparent to-transparent opacity opacity-100 lg:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 p-4">
            <h1 className="play w-9/12 dark:text-gray-00 text-3xl text-white font-bold text-left mt-4">{mainPost.description}</h1>  
           
            <div className="text-sm flex items-center justify-between text-gray-200 mt-4">
              <div className="flex items-center gap-3 font-bold">
                <img
                  src={mainPost.authorImage}
                  alt={mainPost.title}
                  className="size-9 rounded-full ring-4 object-cover my-2"
                />
                {mainPost.author}
                <span className="size-1 bg-black rounded-full"></span>
                <span>{format(new Date(mainPost.date), 'MMMM dd, yyyy')}</span>
              </div>
           
{/* <div>

              {mainPost.tags.map((tag) => (
            <Link key={tag} href={`/tags/${tag}`}>
              <span className="mx-2 dark:text-gray-100 rounded-full  px-3 py-1  border-2 border-r-gray-100 hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-600 duration-300 transition-all">{tag}</span>
            </Link>
          ))}
</div> */}
            
            </div>
            
          </div>
          

              </div>
              <span className="mx-2 absolute top-3 right-3 dark:text-gray-100 rounded-full  px-3 py-1  text-2xl border-r-gray-100 hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-600 duration-300 transition-all underline">{mainPost.category.toUpperCase()}</span>

            </div>
          </Link>
          <div className=" block  sm:hidden px-6">
            <h1 className="play dark:text-gray-00 text-2xl font-bold text-left mt-4">{mainPost.title}</h1>  
            <p className="text-gray-600 mt-2 text-left dark:text-slate-100">

              {truncateText(mainPost.description, 200)}
            </p>
            <div className="text-sm text-gray-500 mt-4">
              <div className="flex items-center gap-3 font-bold">
                <img
                  src={mainPost.authorImage}
                  alt={mainPost.title}
                  className="size-9 rounded-full ring-4 object-cover my-2"
                />
                {mainPost.author}
                <span className="size-1 bg-black rounded-full"></span>
                <span>{format(new Date(mainPost.date), 'MMMM dd, yyyy')}</span>
              </div>
            </div>
          </div>
     
        </div>

       

















        <h1 className="text-4xl font-bold text-center my-5 play">Nos Articles le plus populaires </h1>
        <div className="grid px-6 grid-cols-1 text-left gap-6 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4">
        {sidePosts.map((post, index) => ( 
            // <div key={index} className="group dark:text-gray-500">
            //   <Link href={`/blog/${post.title.replace(/\s+/g, '-').toLowerCase()}`} passHref>
            //     <div className="w-full rounded-lg p-4">
            //       <img
            //         src={post.image}
            //         alt={post.title}
            //         className="w-full h-[160px] object-cover my-2"
            //       />
            //       <h1 className="play group-hover:underline  dark:text-gray-50 text-2xl font-bold text-left mt-4 hover:underline">
            //         {truncateText(post.title,100)}
            //       </h1>
            //       <p className="text-gray-600 group-hover:underline mt-2 text-left dark:text-slate-100">
            //         {truncateText(post.description, 100)}
            //       </p>
            //       <div className="text-sm text-gray-500 dark:text-gray-400">
            //         <span className="flex my-2 items-center gap-3 font-bold">
            //           {post.author}
            //           <span className="size-1 bg-gray-800 dark:bg-gray-300 rounded-full"></span>
            //           <span>{format(new Date(post.date), 'MMMM dd, yyyy')}</span>
            //         </span>
            //       </div>
            //       <span className="size1 text-blue-600 l text-left w-full block">{post.category}</span>
            //     </div>
            //   </Link>
            // </div>


            <SingleBlog key={index} blog={post}/>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
