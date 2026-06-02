import { motion } from 'framer-motion';
import { ArrowUpRight, GitBranch, WandSparkles } from 'lucide-react';
import { projectProcess, projects } from '../data/portfolio';
import type { Project } from '../data/portfolio';
import { SectionHeading } from './SectionHeading';

function ProjectVisual({ project }: { project: Project }) {
  if (project.visual === 'skinmate') {
    return (
      <div className="project-visual bg-gradient-to-br from-[#fff3f6] via-white to-[#f8dce4]">
        <div className="absolute left-5 top-5 rounded-full bg-white/72 px-3 py-1 text-xs font-semibold text-[var(--color-rose-800)]">
          SKINMATE
        </div>
        <div className="grid h-full place-items-center">
          <div className="relative grid size-32 place-items-center rounded-full bg-white/78 shadow-inner">
            <img
              src="/skinmate_logo.png"
              alt="SKINMATE logo"
              className="size-24 rounded-full object-contain"
              onError={(event) => {
                event.currentTarget.style.display = 'none';
              }}
            />
            <div className="absolute -right-2 bottom-2 rounded-full bg-[var(--color-sage-100)] px-3 py-1 text-xs font-medium text-[var(--color-sage-800)]">
              OCR
            </div>
          </div>
        </div>
        <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2">
          {['GOOD', 'BAD', 'NEUTRAL'].map((label) => (
            <span key={label} className="rounded-full bg-white/74 px-3 py-2 text-center text-[0.65rem] font-semibold text-[var(--color-muted)]">
              {label}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="project-visual bg-gradient-to-br from-[#f3f6ee] via-white to-[#f5ded7]">
      <div className="mx-auto mt-8 w-[82%] rounded-3xl border border-white/80 bg-white/64 p-4 shadow-[0_18px_40px_rgba(92,64,72,0.12)] backdrop-blur">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#e8a5b5]" />
          <span className="size-2.5 rounded-full bg-[#e8d6a5]" />
          <span className="size-2.5 rounded-full bg-[#a6bea8]" />
        </div>
        <div className="mt-6 text-center">
          <p className="font-serif text-4xl text-[var(--color-ink)]">08:30</p>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
            Focus gently
          </p>
        </div>
        <div className="mt-6 rounded-2xl bg-[var(--color-sage-100)]/80 px-4 py-3 text-sm text-[var(--color-sage-900)]">
          Today I will build something calm.
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="section-shell">
      <SectionHeading
        eyebrow="Projects"
        title="Featured work with a soft product lens."
        description="Two projects that show my interest in full-stack systems, useful interfaces, and details that make an app feel easier to use."
      />

      <div className="mx-auto mb-8 flex max-w-4xl gap-3 rounded-[1.35rem] border border-[var(--color-rose-100)] bg-white/66 p-4 text-sm leading-7 text-[var(--color-muted)] shadow-sm backdrop-blur">
        <div className="mt-1 grid size-9 shrink-0 place-items-center rounded-2xl bg-[var(--color-blush)] text-[var(--color-rose-800)]">
          <WandSparkles size={18} />
        </div>
        <p>{projectProcess}</p>
      </div>

      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
        {projects.map((project, index) => {
          const Icon = project.icon;
          return (
            <motion.article
              key={project.title}
              className="group overflow-hidden rounded-[1.65rem] border border-white/80 bg-white/74 shadow-[0_20px_65px_rgba(92,64,72,0.11)] backdrop-blur transition hover:-translate-y-1 hover:shadow-[0_28px_75px_rgba(92,64,72,0.16)]"
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
            >
              <ProjectVisual project={project} />
              <div className="p-6 sm:p-7">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-[var(--color-rose-700)]">
                      {project.subtitle}
                    </p>
                    <h3 className="mt-2 font-serif text-2xl text-[var(--color-ink)]">
                      {project.title}
                    </h3>
                  </div>
                  <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[var(--color-blush)] text-[var(--color-rose-800)]">
                    <Icon size={20} />
                  </div>
                </div>

                <p className="text-sm leading-7 text-[var(--color-muted)]">
                  {project.description}
                </p>

                <ul className="mt-5 grid gap-2">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2 text-sm text-[var(--color-muted)]">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--color-sage-600)]" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[var(--color-ivory)] px-3 py-1.5 text-xs font-semibold text-[var(--color-muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-7 inline-flex items-center gap-2 rounded-full border border-[var(--color-rose-300)] px-5 py-3 text-sm font-semibold text-[var(--color-rose-900)] transition hover:bg-[var(--color-blush)] focus:outline-none focus:ring-2 focus:ring-[var(--color-rose-500)] focus:ring-offset-2"
                >
                  <GitBranch size={17} />
                  View repository
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
