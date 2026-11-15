import { useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const GLYPHS = '01<>/[]{}=+*#_';
const FRAMES = 20;

/** Short text that "decrypts" from random glyphs the first time it scrolls into view. */
export function ScrambleText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const reduceMotion = useReducedMotion();
  const [output, setOutput] = useState(text);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    let frame = 0;
    let raf = 0;
    const step = () => {
      frame += 1;
      const revealed = (frame / FRAMES) * text.length;
      setOutput(
        Array.from(text, (char, i) =>
          char === ' ' || i < revealed ? char : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
        ).join(''),
      );
      if (frame < FRAMES) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduceMotion, text]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>{output}</span>
    </span>
  );
}
