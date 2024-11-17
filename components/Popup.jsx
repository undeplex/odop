import { useState } from "react";

const Popup = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      {/* <button
        className=" px-4 rounded transition-colors duration-300"
        onClick={() => setIsOpen(true)}
      >
        {children}
      </button> */}

      {isOpen && (
        <div className="fixed z-50 inset-0 flex items-center justify-center h-screen bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full relative transform transition-transform duration-300 scale-95 sm:scale-100">
            <h2 className="text-xl font-bold mb-4">Pop-Up Modal</h2>
            <p className="mb-4">This is a simple pop-up/modal component.</p>
            <button
              className="absolute top-2 right-2 text-black hover:text-red-500"
              onClick={() => setIsOpen(false)}
            >
              ✖️
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;