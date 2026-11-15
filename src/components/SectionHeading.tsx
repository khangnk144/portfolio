import type { ReactNode } from 'react';
import { Reveal } from './Reveal';
import { ScrambleText } from './ScrambleText';

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
};

export function SectionHeading({ index, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <Reveal className="mx-auto mb-14 grid max-w-6xl gap-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
      <div>
        <p className="mb-5 font-mono text-xs text-rosewood">
          <span className="text-pop">[{index}]</span> <ScrambleText text={`~/${eyebrow.toLowerCase()}`} />
        </p>
        <h2 className="font-display text-4xl font-light leading-[1.08] tracking-[-0.02em] text-ink sm:text-5xl">
          {title}
        </h2>
      </div>
      {description ? <p className="text-[0.95rem] leading-7 text-muted lg:pb-1">{description}</p> : null}
    </Reveal>
  );
}
