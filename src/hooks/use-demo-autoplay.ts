import { useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

/**
 * Drives a self-playing demo. `tick` increments every `intervalMs` while the demo
 * is on screen and the visitor has not taken over (never under reduced motion). Call `takeOver()` on any manual
 * interaction; call `resume()` to hand control back to autoplay.
 */
export function useDemoAutoplay<T extends HTMLElement>(intervalMs: number) {
  const ref = useRef<T>(null);
  const reduceMotion = useReducedMotion();
  const [inView, setInView] = useState(false);
  const [userTookOver, setUserTookOver] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.35,
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // `isPlaying` = autoplay mode (visitor has not taken over); ticks only advance while on screen.
  const isPlaying = !userTookOver && !reduceMotion;
  const isTicking = isPlaying && inView;

  useEffect(() => {
    if (!isTicking) return;
    const id = window.setInterval(() => setTick((value) => value + 1), intervalMs);
    return () => window.clearInterval(id);
  }, [isTicking, intervalMs]);

  return {
    ref,
    tick,
    isPlaying,
    takeOver: () => setUserTookOver(true),
    resume: () => {
      setTick(0);
      setUserTookOver(false);
    },
  };
}
