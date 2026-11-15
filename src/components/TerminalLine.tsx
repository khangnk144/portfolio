import { useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { researchDirections } from '../data/research-directions';

const commands = researchDirections.map(
  (direction) =>
    `${direction.status === 'Current focus' ? 'focus --on' : 'explore --new'} "${direction.shortName}"`,
);

const TYPE_MS = 45;
const DELETE_MS = 22;
const HOLD_MS = 1600;

/** A terminal prompt that types out the research directions one after another. */
export function TerminalLine() {
  const reduceMotion = useReducedMotion();
  const [commandIndex, setCommandIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const command = commands[commandIndex];

  useEffect(() => {
    if (reduceMotion) return;
    const isTyped = length === command.length;
    const delay = isDeleting ? DELETE_MS : isTyped ? HOLD_MS : TYPE_MS;
    const id = window.setTimeout(() => {
      if (!isDeleting && isTyped) setIsDeleting(true);
      else if (isDeleting && length === 0) {
        setIsDeleting(false);
        setCommandIndex((index) => (index + 1) % commands.length);
      } else setLength((value) => value + (isDeleting ? -1 : 1));
    }, delay);
    return () => window.clearTimeout(id);
  }, [command.length, isDeleting, length, reduceMotion]);

  const visible = reduceMotion ? command : command.slice(0, length);

  return (
    <p className="inline-flex max-w-full items-center gap-2 overflow-hidden rounded-lg border border-line bg-paper px-3 py-2 font-mono text-[0.8rem] text-ink shadow-[0_8px_24px_-18px_rgba(59,29,46,0.5)]">
      <span className="shrink-0 text-rosewood">khang@core-lab</span>
      <span className="shrink-0 text-muted">~ %</span>
      <span className="sr-only">{commands.join('; ')}</span>
      <span aria-hidden className="truncate">
        {visible}
      </span>
      <span aria-hidden className="-ml-1 h-4 w-[7px] shrink-0 animate-blink bg-pop" />
    </p>
  );
}
