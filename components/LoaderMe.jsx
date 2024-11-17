import React from 'react';

const LoaderMe = () => {
  const loaderStyle = {
    width: '17px',
    height: '17px',
    borderRadius: '50%',
    position: 'relative',
    animation: 'rotate 1s linear infinite'
  };

  const loaderBeforeStyle = {
    content: '""',
    boxSizing: 'border-box',
    position: 'absolute',
    inset: '0px',
    borderRadius: '50%',
    border: '4px solid #000',
    animation: 'prixClipFix 2s linear infinite'
  };

  return (
    <div style={loaderStyle} className="dark:invert ">
      <div style={loaderBeforeStyle}></div>
      <style jsx>{`
        @keyframes rotate {
          100% { transform: rotate(360deg); }
        }
        @keyframes prixClipFix {
          0% { clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0); }
          25% { clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0); }
          50% { clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%); }
          75% { clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%); }
          100% { clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0); }
        }
      `}</style>
    </div>
  );
};

export default LoaderMe;