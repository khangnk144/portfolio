import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Award } from 'lucide-react';
import { useState } from 'react';
import type { ComponentType } from 'react';
import { profile, publications } from '../../data/portfolio';
import { researchDirections } from '../../data/research-directions';
import type { ResearchDirectionId } from '../../data/research-directions';
import { Reveal } from '../Reveal';
import { SectionHeading } from '../SectionHeading';
import { ComposedRetrievalDemo } from './ComposedRetrievalDemo';
import { EfficientUnderstandingDemo } from './EfficientUnderstandingDemo';
import { InteractiveRetrievalDemo } from './InteractiveRetrievalDemo';
import { SpatialGroundingDemo } from './SpatialGroundingDemo';

const demos: Record<ResearchDirectionId, ComponentType> = {
  interactive: InteractiveRetrievalDemo,
  composed: ComposedRetrievalDemo,
  spatial: SpatialGroundingDemo,
  efficient: EfficientUnderstandingDemo,
};

// The WACV paper is on composed video retrieval, so it is surfaced on that direction.
const composedPublication = publications[0];

export function ResearchInterests() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = researchDirections[activeIndex];
  const Demo = demos[active.id];

  return (
    <section id="research" className="section-shell border-t border-line">
      <SectionHeading
        index="02"
        eyebrow="Research"
        title={
          <>
            Helping machines find what you <em className="text-rosewood">actually mean.</em>
          </>
        }
        description="I work where vision meets language: retrieving images and videos from imperfect, multimodal queries. Each direction below comes with a small demo built on real dataset samples."
      />

      <Reveal className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.75fr_1.25fr]">
        <div role="tablist" aria-label="Research directions" className="flex flex-col border-t border-line">
          {researchDirections.map((direction, index) => {
            const isSelected = index === activeIndex;
            return (
              <button
                key={direction.id}
                id={`research-tab-${direction.id}`}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls="research-panel"
                onClick={() => setActiveIndex(index)}
                className="group relative flex items-baseline gap-4 border-b border-line py-5 pl-5 text-left"
              >
                {isSelected ? (
                  <motion.span
                    layoutId="research-tab-indicator"
                    className="absolute inset-y-3 left-0 w-0.5 rounded-full bg-pop"
                    transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                  />
                ) : null}
                <span className="font-mono text-xs text-bloom">0{index + 1}</span>
                <span className="flex-1">
                  <span
                    className={`block font-display text-xl leading-snug transition-colors ${
                      isSelected ? 'text-plum' : 'text-muted group-hover:text-ink'
                    }`}
                  >
                    {direction.title}
                  </span>
                  <span className="mt-1 block font-mono text-[0.7rem] text-muted">
                    {direction.status === 'Current focus' ? '● current focus' : '○ recently exploring'}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div
          id="research-panel"
          role="tabpanel"
          aria-labelledby={`research-tab-${active.id}`}
          className="viewfinder min-w-0 p-2"
        >
          <div className="surface-card p-5 sm:p-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <p className="font-display text-2xl leading-snug text-plum sm:text-3xl">{active.question}</p>
              <p className="mt-4 text-[0.95rem] leading-7 text-muted">{active.summary}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {active.keywords.map((keyword) => (
                  <li key={keyword} className="rounded-md bg-blush px-2 py-0.5 font-mono text-[0.7rem] text-rosewood">
                    #{keyword.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}
                  </li>
                ))}
              </ul>

              {active.id === 'composed' && composedPublication ? (
                <p className="mt-5 flex items-start gap-2 rounded-xl bg-blush px-4 py-3 text-sm leading-6 text-plum">
                  <Award size={16} className="mt-1 shrink-0 text-rosewood" />
                  <span>
                    <strong className="font-semibold">
                      {composedPublication.venue} · {composedPublication.status}:
                    </strong>{' '}
                    {composedPublication.title}
                    {composedPublication.equalContribution.includes(profile.name) ? (
                      <span className="text-muted"> (co-first author)</span>
                    ) : null}
                  </span>
                </p>
              ) : null}

              <div className="mt-8 border-t border-line pt-6">
                <Demo />
              </div>

              <div className="mt-8 border-t border-line pt-5">
                <p className="mb-3 font-mono text-xs text-muted">// background reading</p>
                <ul className="grid gap-2">
                  {active.readings.map((reading) => (
                    <li key={reading.href}>
                      <a
                        href={reading.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-baseline gap-2 text-sm text-ink transition-colors hover:text-rosewood"
                      >
                        <span>{reading.label}</span>
                        <span className="text-xs text-muted">{reading.venue}</span>
                        <ArrowUpRight size={13} className="self-center opacity-0 transition-opacity group-hover:opacity-100" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
