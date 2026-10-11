import type Lenis from 'lenis';

declare global {
  interface Window {
    avoraLenis: Lenis | null;
  }
}

export {};
