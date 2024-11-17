
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const NavbarLoader = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <div className={`fixed top-0 left-0 w-full h-1 ${loading ? 'bg-blue-500 animate-loader' : ''}`}></div>
  );
};

export default NavbarLoader;