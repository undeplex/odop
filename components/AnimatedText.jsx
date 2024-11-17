// components/AnimatedText.js
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import SplitType from 'split-type';

const AnimatedText = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const ourText = new SplitType(textRef.current, { types: 'chars' });
    const chars = ourText.chars;

    gsap.fromTo(
      chars,
      { 
        y: 100,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        yoyo:true,
        duration: 2,
        ease: 'power4.out',
      }
    );

    return () => {
      ourText.revert();
    };
  }, []);

  return (
    <p className="ourText" ref={textRef}>
      Do hang tight...
    </p>
  );
};

export default AnimatedText;