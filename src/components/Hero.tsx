import { animate, motion, useInView } from 'framer-motion';
import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { nameParts, profile, projects, publications, researchRole } from '../data/portfolio';
import { researchDirections } from '../data/research-directions';
import { HeroPortrait } from './HeroPortrait';
import { TerminalLine } from './TerminalLine';

const ease = [0.22, 1, 0.36, 1] as const;

const stats = [
  { value: 3, label: 'year at UIT' },
  { value: researchDirections.length, label: 'research directions' },
  { value: publications.length, label: 'publication' },
  { value: projects.length, label: 'featured projects' },
];

/** Counts up from 0 the first time it is visible. */
function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, { duration: 1.1, ease: 'easeOut', onUpdate: (v) => setValue(Math.round(v)) });
    return () => controls.stop();
  }, [inView, to]);

  return <span ref={ref}>{String(value).padStart(2, '0')}</span>;
}

export function Hero() {
  return (
    <section id="home" className="px-5 pb-24 pt-32 sm:px-8 lg:px-10 lg:pb-32 lg:pt-40">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div className="min-w-0" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
          <a
            href={researchRole.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-rosewood"
          >
            <span className="size-1.5 rounded-full bg-pop" />
            {researchRole.title}
            <ArrowUpRight size={13} />
          </a>

          <h1 className="mt-6 whitespace-nowrap font-display text-[clamp(2.75rem,7vw,5.5rem)] font-light leading-none tracking-[-0.03em] text-ink">
            {nameParts.first} <em className="font-normal text-rosewood">{nameParts.last}</em>
          </h1>

          <p className="mt-5 text-lg text-ink sm:text-xl">
            {/* Non-breaking hyphens keep "Full-Stack" on one line. */}
            {profile.headline.replace(' - ', ' · ').replaceAll('-', '‑')}
            <span className="ml-1 text-pop">✦</span>
          </p>

          <div className="mt-5">
            <TerminalLine />
          </div>

          <p className="mt-6 max-w-xl text-[0.95rem] leading-7 text-muted">{profile.intro}</p>
          <p className="mt-3 flex max-w-xl items-start gap-2 text-sm text-muted">
            <MapPin className="mt-0.5 shrink-0 text-rosewood" size={15} />
            {profile.school}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#research"
              className="group inline-flex items-center gap-2 rounded-full bg-plum px-6 py-3 font-mono text-xs text-white transition-colors hover:bg-rosewood"
            >
              ./explore-research
              <ArrowDown size={14} className="transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-plum/20 bg-paper px-6 py-3 font-mono text-xs text-plum transition-colors hover:border-pop hover:text-pop"
            >
              github
              <ArrowUpRight size={14} />
            </a>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-2 gap-y-5 border-t border-line pt-6 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse">
                <dt className="mt-1 font-mono text-[0.65rem] leading-4 text-muted">{stat.label}</dt>
                <dd className="font-display text-3xl text-ink">
                  <CountUp to={stat.value} />
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <HeroPortrait />
      </div>
    </section>
  );
}
