// components/RecentPost.js
import Link from 'next/link';
import { format } from 'date-fns';
import SingleBlog from './SingleBlog';
const RecentPost = ({ post }) => {
  return (
      // <div key={post.id} className=" dark:text-gray-500 group ">
      //         <Link href={`/blog/${post.title.replace(/\s+/g, '-').toLowerCase()}`} passHref>
      //         <div className="w-full  rounded-lg p-4">
      //       <img src={post.image} alt={post.title} className="w-full  h-[160px] object-cover  my-2" />
        
      //     <h1 className="play  group-hover:underline dark:text-gray-50  text-2xl font-bold text-left mt-4 hover:underline">{post.title}</h1>
      //     <p className="text-gray-600 mt-2 group-hover:underline text-left dark:text-slate-100">{post.description}</p>
      //     <div className="text-sm text-gray-500 dark:text-gray-400 ">

      //       <span className="flex my-2 items-center gap-3  font-bold">

      //     Par {post.author}
      //         <span className="size-1 bg-gray-800 dark:bg-gray-300 rounded-full"></span>
      //         <span>{format(new Date(post.date), 'MMMM dd, yyyy')}</span>
      //         </span> 
      //     </div>
      //     <span className="size1 text-blue-600 l text-left w-full block ">{post.category}</span>

      //   </div>
      //         </Link>
      //       </div>
      <SingleBlog blog={post} />
  );
};

export default RecentPost;