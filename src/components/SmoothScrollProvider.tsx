'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,             // snappy interpolation factor (0 = instant, 1 = no smoothing)
      smoothWheel: true,
      wheelMultiplier: 0.9,  // slightly under 1 to avoid over-scroll feeling
      touchMultiplier: 1.2,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
    });

    window.avoraLenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.avoraLenis = null;
    };
  }, []);

  const pathname = usePathname();
  useEffect(() => {
    if (window.avoraLenis) {
      window.avoraLenis.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return <>{children}</>;
}
