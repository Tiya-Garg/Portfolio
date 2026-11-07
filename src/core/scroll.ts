import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

export function initScroll(): Lenis {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  lenisInstance = new Lenis({
    duration: isReducedMotion ? 0.01 : 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: !isReducedMotion,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
  });

  lenisInstance.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenisInstance?.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // Intercept anchor clicks for smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          lenisInstance?.scrollTo(targetEl as HTMLElement, { offset: -60 });
        }
      }
    });
  });

  return lenisInstance;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}
