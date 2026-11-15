import { ArrowUpRight } from 'lucide-react';
import { projectProcess, projects } from '../data/portfolio';
import { MomentumVisual, SkinmateVisual } from './ProjectVisuals';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

export function Projects() {
  return (
    <section id="projects" className="section-shell border-t border-line">
      <SectionHeading
        index="03"
        eyebrow="Projects"
        title={
          <>
            Featured work with a <em className="text-rosewood">product lens.</em>
          </>
        }
        description="Two projects that show my interest in full-stack systems, useful interfaces, and details that make an app feel easier to use."
      />

      <div className="mx-auto grid max-w-6xl gap-8">
        {projects.map((project, index) => {
          const Visual = project.visual === 'skinmate' ? SkinmateVisual : MomentumVisual;
          const isReversed = index % 2 === 1;

          return (
            <Reveal key={project.title}>
              <article className="surface-card group grid overflow-hidden transition-colors hover:border-petal lg:grid-cols-2">
                <div className={`p-3 ${isReversed ? 'lg:order-2' : ''}`}>
                  <Visual />
                </div>

                <div className="flex flex-col p-7 sm:p-10">
                  <p className="font-mono text-xs text-rosewood">
                    <span className="text-pop">0{index + 1}</span>
                    <span className="mx-2 text-line">/</span>
                    {project.subtitle.toLowerCase()}
                  </p>
                  <h3 className="mt-3 font-display text-3xl text-ink sm:text-4xl">{project.title}</h3>
                  <p className="mt-4 text-[0.95rem] leading-7 text-muted">{project.description}</p>

                  <ul className="mt-5 grid gap-2">
                    {project.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-3 text-sm leading-6 text-muted">
                        <span className="mt-2.5 h-px w-3 shrink-0 bg-rosewood" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-6 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <li key={tag} className="rounded-md border border-line bg-ivory px-2 py-0.5 font-mono text-[0.7rem] text-muted">
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 inline-flex items-center gap-1.5 self-start border-b border-plum/30 pb-0.5 font-mono text-xs text-plum transition-colors hover:border-pop hover:text-pop"
                  >
                    view repository
                    <ArrowUpRight size={15} />
                  </a>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mx-auto mt-8 max-w-6xl border-l-2 border-petal pl-5 text-sm leading-7 text-muted">
        <span className="font-semibold text-ink">How I build. </span>
        {projectProcess}
      </Reveal>
    </section>
  );
}
