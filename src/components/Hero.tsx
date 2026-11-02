'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      '.hero-headline',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.2 }
    );

    gsap.fromTo(
      '.hero-sub',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out', delay: 0.5 }
    );
  }, { scope: container });

  return (
    <section
      ref={container}
      aria-label="Tech Avora — Production AI starts with better data"
      className="relative min-h-[100dvh] flex flex-col justify-center lg:justify-end overflow-hidden bg-black py-16 sm:py-20 md:py-24 lg:py-0"
    >
      {/* Optimized background image using next/image */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        <Image
          src="/abstract.webp"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-75 sm:opacity-80 scale-105"
        />
        {/* Gradients to ensure text readability against the background */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 sm:via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      </div>

      {/* Content — Responsive padding & clamp typography for Mobile/Tablet/iPad/Laptop */}
      <div className="relative z-10 w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 pb-4 md:pb-12 lg:pb-24 max-w-screen-2xl mx-auto flex flex-col justify-center lg:justify-end h-full mt-14 sm:mt-16 md:mt-20 lg:mt-0">
        <h1
          className="hero-headline font-heading uppercase tracking-wide text-white leading-[0.98] mb-6 sm:mb-8 max-w-4xl"
          style={{
            fontSize: 'clamp(2.5rem, 5.8vw, 5.5rem)',
            willChange: 'transform, opacity',
          }}
        >
          Production AI<br />
          starts with<br />
          <span className="text-[#f59e0b]">better data.</span>
        </h1>

        {/* Sleek caption on the bottom */}
        <div className="hero-sub max-w-3xl lg:max-w-4xl" style={{ willChange: 'transform, opacity' }}>
          <p className="font-sans text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed border-l-2 border-[#f59e0b]/60 pl-4 sm:pl-5">
            Tech Avora helps enterprises prepare high-quality AI data and build production-ready AI solutions. One integrated delivery framework from raw data to deployed intelligence.
          </p>
        </div>
      </div>
    </section>
  );
}
