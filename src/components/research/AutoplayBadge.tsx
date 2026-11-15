import { useReducedMotion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';

type AutoplayBadgeProps = {
  isPlaying: boolean;
  onResume: () => void;
};

/** Shows whether a demo is self-playing, and lets the visitor hand control back to it. */
export function AutoplayBadge({ isPlaying, onResume }: AutoplayBadgeProps) {
  const reduceMotion = useReducedMotion();
  // Autoplay never runs under reduced motion, so there is nothing to resume.
  if (reduceMotion) return null;

  if (isPlaying) {
    return (
      <span className="inline-flex items-center gap-1.5 text-[0.7rem] font-medium text-muted">
        <Play size={11} className="fill-current" aria-hidden />
        Playing automatically · click anything to take over
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={onResume}
      className="inline-flex items-center gap-1.5 rounded-full border border-petal px-2.5 py-1 text-[0.7rem] font-medium text-plum transition-colors hover:bg-blush"
    >
      <Pause size={11} aria-hidden />
      You are in control · resume autoplay
    </button>
  );
}
