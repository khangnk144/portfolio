import { aboutCards } from '../data/portfolio';
import { ResearchCard } from './ResearchCard';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

export function About() {
  return (
    <section id="about" className="section-shell border-t border-line">
      <SectionHeading
        index="01"
        eyebrow="About"
        title={
          <>
            Building thoughtful products while <em className="text-rosewood">learning deeply.</em>
          </>
        }
      />

      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal>
          <ResearchCard />
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="border-t border-line">
            {aboutCards.map((card) => {
              const Icon = card.icon;
              return (
                <li key={card.title} className="flex gap-4 border-b border-line py-6">
                  <Icon size={20} className="mt-1 shrink-0 text-rosewood" />
                  <div>
                    <h3 className="font-display text-xl text-ink">{card.title}</h3>
                    <p className="mt-2 text-[0.95rem] leading-7 text-muted">{card.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
