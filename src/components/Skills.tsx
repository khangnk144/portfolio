import { motion } from 'framer-motion';
import { skillGroups } from '../data/portfolio';
import { SectionHeading } from './SectionHeading';

export function Skills() {
  return (
    <section id="skills" className="section-shell bg-white/42">
      <SectionHeading
        eyebrow="Skills"
        title="A practical toolkit for building from idea to interface."
        description="My stack is shaped by real project work: frontend structure, backend APIs, data modeling, and browser-based product experiences."
      />

      <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
        {skillGroups.map((group, index) => {
          const Icon = group.icon;
          return (
            <motion.article
              key={group.title}
              className="rounded-[1.5rem] border border-white/80 bg-white/74 p-6 shadow-[0_18px_55px_rgba(92,64,72,0.09)] backdrop-blur"
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="grid size-11 place-items-center rounded-2xl bg-[var(--color-sage-100)] text-[var(--color-sage-800)]">
                  <Icon size={21} />
                </div>
                <h3 className="font-serif text-xl text-[var(--color-ink)]">{group.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-[var(--color-rose-100)] bg-[var(--color-ivory)] px-3 py-2 text-sm font-medium text-[var(--color-muted)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
