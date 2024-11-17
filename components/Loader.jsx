// Loader.js
import React from 'react';

const Loader = () => {
  return (
    <div className="loader"></div>
  );
};

export default Loader;

// CSS (in the same file)
<style>
{`
  .loader {
    width: 50px;
    aspect-ratio: 1;
    border-radius: 50%;
    background: 
      radial-gradient(farthest-side, #ffa516 94%, transparent) top/8px 8px no-repeat,
      conic-gradient(transparent 30%, #ffa516);
    -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 8px), black 0);
    animation: l13 1s infinite linear;
  }
  
  @keyframes l13 { 
    100% { transform: rotate(1turn); }
  }
`}
</style>