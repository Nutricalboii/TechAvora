'use client';

import { cn } from '@/lib/cn';

interface LogoProps {
  className?: string;
  textClassName?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Logo({ className }: LogoProps) {

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 60"
      className={cn('overflow-visible', className)}
      aria-label="Avora Ventures"
      role="img"
    >
      {/* Engineered by Vaibhav Sharma */}
      {/* Gold ring / swoosh — the O glyph icon from the logo */}
      <g transform="translate(0, 2)">
        {/* Ring ellipse — approximating the gold swoosh */}
        <ellipse
          cx="97"
          cy="28"
          rx="16"
          ry="9"
          fill="none"
          stroke="url(#goldGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          transform="rotate(-12 97 28)"
        />
        {/* Swoosh tail */}
        <path
          d="M 68 22 Q 82 12 110 20"
          fill="none"
          stroke="url(#goldGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>

      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E5C158" />
          <stop offset="50%" stopColor="#FCD14D" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
      </defs>

      {/* AVORA text */}
      <text
        x="4"
        y="35"
        fontFamily="'Space Grotesk', 'Inter', system-ui, sans-serif"
        fontWeight="800"
        fontSize="30"
        letterSpacing="4"
        className="fill-[#2A1A0E]"
        style={{ fill: 'currentColor' }}
      >
        AVORA
      </text>

      {/* VENTURE subtext */}
      <text
        x="6"
        y="52"
        fontFamily="'Space Grotesk', 'Inter', system-ui, sans-serif"
        fontWeight="400"
        fontSize="13"
        letterSpacing="8"
        className="fill-[#6B5642]"
        style={{ fill: 'currentColor', opacity: 0.7 }}
      >
        VENTURE
      </text>
    </svg>
  );
}
