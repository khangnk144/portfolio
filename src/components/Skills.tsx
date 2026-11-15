import { skillGroups } from '../data/portfolio';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

export function Skills() {
  return (
    <section id="skills" className="section-shell border-t border-line">
      <SectionHeading
        index="04"
        eyebrow="Skills"
        title={
          <>
            A practical toolkit, from <em className="text-rosewood">idea to interface.</em>
          </>
        }
        description="My stack is shaped by real project work: frontend structure, backend APIs, data modeling, and browser-based product experiences."
      />

      <div className="mx-auto grid max-w-6xl gap-x-10 md:grid-cols-3">
        {skillGroups.map((group, index) => {
          const Icon = group.icon;
          return (
            <Reveal key={group.title} delay={index * 0.06} className="border-t border-line py-7">
              <div className="flex items-center gap-3">
                <Icon size={18} className="text-rosewood" />
                <h3 className="font-display text-xl text-ink">{group.title}</h3>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-md border border-line bg-paper px-2.5 py-1 font-mono text-xs text-ink transition-colors hover:border-pop hover:text-pop"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
