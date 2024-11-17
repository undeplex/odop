import React from 'react';
import { useRef } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { ArrowLeft } from 'lucide-react';

const PopCat = ({ categories }) => {
  const sliderRef = useRef(null);

  // Function to handle next/prev buttons
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 300;
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 300;
    }
  };

  return (
    <div className="popular-category-container px-2 ">
      <button className="bg-blue-200 p-2 rounded-full hover:ring-4 bg-opacity-15 left-0" onClick={scrollLeft}>
       <FaArrowLeft/>
      </button>
      <div className="slider" ref={sliderRef}>
        {categories.map((category) => (
          <div key={category.id} className="category-card dark:bg-gray-800 bg-gray-100 ">
            <Link href={`blog/category/${category.slug}`}>
              <span>
                {/* <img src={category.icon} alt={category.name} className="category-icon" /> */}
                <h3 className="text-blue-500 text-lg play">{category.name}</h3>
                <p className="hover:underline">{category.description}</p>
              </span>
            </Link>
          </div>
        ))}
      </div>
      <button className=" right-0 bg-blue-200 p-2 rounded-full hover:ring-4 bg-opacity-15 left" onClick={scrollRight}>
        <FaArrowRight />
      </button>

      {/* Styling for the component */}
      <style jsx>{`
        .popular-category-container {
          position: relative;
          display: flex;
          align-items: center;
          margin: 20px 0;
        }
        .slider {
          display: flex;
          overflow-x: scroll;
          scroll-behavior: smooth;
          scrollbar-width: none; /* Hide scrollbar for Firefox */
        }
        .slider::-webkit-scrollbar {
          display: none; /* Hide scrollbar for Chrome, Safari, Opera */
        }
        .category-card {
          min-width: 200px;
          margin: 10px;
          padding: 20px;
      
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s;
        }
        .category-card:hover {
          transform: translateY(-5px);
        }
        .category-icon {
          width: 50px;
          height: 50px;
          margin-bottom: 15px;
        }
        .scroll-button {
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 2;
        }
      
      `}</style>
    </div>
  );
};

export default PopCat;
