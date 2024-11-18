
// import React from 'react';
// import Link from 'next/link';
// import { format } from 'date-fns';
// import { remark } from 'remark';
// import remarkParse from 'remark-parse';
// import Image from 'next/image';
//   // Calculate the reading time
//   function calculateReadingTime(content) {
//     // Parse the Markdown content to plain text
//     const processor = remark().use(remarkParse);
//     const plainText = processor.processSync(content).toString();
  
//     // Calculate the word count
//     const wordsPerMinute = 200;
//     const words = plainText.split(/\s+/).length;
//     const time = Math.ceil(words / wordsPerMinute);
  
//     return `${time} min read`;
//   }
// const SingleBlog = ({ blog }) => {

  

//   return (
//     <div className="dark:text-gray-500 border-b border-gray-500 pb-4  transition-all duration-500 group">
//       <div className="w-full h-[150px] overflow-hidden mb-2 rounded-xl">
//         <img
//           src={blog.image}
//           alt={blog.title}
          
//           className="size-full group-hover:scale-[110%] group-hover:rotate-[2deg] group-hover:transition-all duration-500 rounded-xl object-cover mb-4"
//         />
       
//       </div>

//       <Link href={`/blog/${blog.title.replace(/\s+/g, '-').toLowerCase()}`} passHref>
//         <p className="text-2xl font-bold dark:text-white play group-hover:underline">{blog.title}</p>
//         <p className="dark:text-gray-400 text-gray-700 my-3">{blog.description}</p>
//         <div className="flex gap-2 items-center justify-between">
//           <p className="flex items-center gap-2">
//             <img
//               src={blog.authorImage}
//               width="34"
//               className="rounded-full ring-2 object-cover"
//             />
//             <span className="dark:text-gray-50 text-gray-700">{blog.author}</span>
//           </p>
//           <div className="text-sm text-blue-500 mb-1">{blog.category}</div>
//         </div>
//         <div>

//         <div className="text-gray-600 flex justify-between mt-3 dark:text-gray-300 text-sm">
//           <div>

//           Publish on {format(new Date(blog.date), 'MMMM dd, yyyy')}
//           </div>
//             <p className="flex items-center gap-2">
//              {calculateReadingTime(blog.content)} 
//           </p>
//         </div>
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default SingleBlog;
import React from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { remark } from 'remark';
import remarkParse from 'remark-parse';
import Image from 'next/image';

// Calcul du temps de lecture
function calculateReadingTime(content) {
  const processor = remark().use(remarkParse);
  const plainText = processor.processSync(content).toString();
  const wordsPerMinute = 200;
  const words = plainText.split(/\s+/).length;
  const time = Math.ceil(words / wordsPerMinute);
  return `${time} min read`;
}

const SingleBlog = ({ blog }) => {
  return (
    <div className="dark:text-gray-500 border-b border-gray-500 pb-4 transition-all duration-500 group">
      {/* Image du blog */}
      <div className="w-full h-[150px] overflow-hidden mb-2 rounded-xl relative">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover  rounded-xl group-hover:scale-[110%] group-hover:rotate-[2deg] group-hover:transition-all duration-500"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkZGRkIiAvPjwvc3ZnPg=="
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <Link href={`/blog/${blog.title.replace(/\s+/g, '-').toLowerCase()}`} passHref>
        <p className="text-2xl font-bold dark:text-white play group-hover:underline">{blog.title}</p>
        <p className="dark:text-gray-400 text-gray-700 my-3">{blog.description}</p>

        {/* Métadonnées */}
        <div className="flex gap-2 items-center justify-between">
          <Image
            src={blog.authorImage}
            width={34}
            height={34}
            alt={blog.author}
            className="rounded-full ring-2 object-cover"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkZGRkIiAvPjwvc3ZnPg=="
          />
          <span className="dark:text-gray-50 text-gray-700">{blog.author}</span>
          <div className="text-sm text-blue-500 mb-1">{blog.category}</div>
        </div>

        <div className="text-gray-600 flex justify-between mt-3 dark:text-gray-300 text-sm">
          <div>{format(new Date(blog.date), 'MMMM dd, yyyy')}</div>
          <p className="flex items-center gap-2">{calculateReadingTime(blog.content)}</p>
        </div>
      </Link>
    </div>
  );
};

export default SingleBlog;