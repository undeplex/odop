
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import gsap from 'gsap';

const PageTransition = ({ children }) => {
  const router = useRouter();
  const transitionRef = useRef(null);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      gsap.to(transitionRef.current, { opacity: 1, duration: 0.5 });
    };

    const handleRouteChangeComplete = () => {
      gsap.to(transitionRef.current, { opacity: 0, duration: 0.5 });
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeComplete);
    };
  }, [router]);

  return (
    <>
      <div
        ref={transitionRef}
        className="fixed top-0 left-0 w-full h-full bg-black opacity-0 pointer-events-none"
        style={{ zIndex: 1000 }}
      />
      {children}
    </>
  );
};

export default PageTransition;