import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { aboutCards, profile, researchRole } from '../data/portfolio';
import { SectionHeading } from './SectionHeading';

export function About() {
  const ResearchIcon = researchRole.icon;

  return (
    <section id="about" className="section-shell bg-white/42">
      <SectionHeading
        eyebrow="About"
        title="Building thoughtful web products while learning deeply."
        description={profile.intro}
      />

      <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
        {aboutCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.article
              key={card.title}
              className="rounded-[1.5rem] border border-white/80 bg-white/72 p-6 shadow-[0_18px_55px_rgba(92,64,72,0.09)] backdrop-blur"
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <div className="mb-5 grid size-12 place-items-center rounded-2xl bg-[var(--color-blush)] text-[var(--color-rose-800)]">
                <Icon size={22} />
              </div>
              <h3 className="font-serif text-xl text-[var(--color-ink)]">{card.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{card.text}</p>
            </motion.article>
          );
        })}
      </div>

      <div className="mx-auto mt-6 max-w-6xl rounded-[1.65rem] border border-white/80 bg-gradient-to-br from-white/78 via-[var(--color-blush)]/48 to-[var(--color-sage-100)]/64 p-6 shadow-[0_18px_55px_rgba(92,64,72,0.09)] backdrop-blur sm:p-7">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="flex gap-4">
            <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/72 text-[var(--color-sage-800)]">
              <ResearchIcon size={22} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-rose-600)]">
                {researchRole.label}
              </p>
              <h3 className="mt-2 font-serif text-2xl text-[var(--color-ink)]">
                {researchRole.title}
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--color-muted)]">
                {researchRole.text}
              </p>
            </div>
          </div>
          <a
            href={researchRole.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-[var(--color-rose-300)] bg-white/62 px-5 py-3 text-sm font-semibold text-[var(--color-rose-900)] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-rose-500)] focus:ring-offset-2"
          >
            CORE Lab
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
