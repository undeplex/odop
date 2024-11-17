const Tooltip = () => {
    return (
      <div className="relative flex items-center justify-center mt-8 group">
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300">
          Hover me
        </button>
        <div className="absolute bg-opacity-35 bottom-full mb-2 w-32 p-2 bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
          On est toujours à l'etape experimental
          <div className="absolute w-3 h-3 bg-black transform rotate-45 -bottom-1 left-1/2 -translate-x-1/2"></div>
        </div>
      </div>
    );
  };
  
  export default Tooltip;