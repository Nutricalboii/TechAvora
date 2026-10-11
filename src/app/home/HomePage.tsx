'use client';

import { useEffect } from 'react';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Contact from '@/components/Contact';

function HashScrollHandler() {
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);
  return null;
}

export default function HomePage() {
  return (
    <>
      <HashScrollHandler />
      <Hero />
      <Services />
      <Contact />
    </>
  );
}
