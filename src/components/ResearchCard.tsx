import { ArrowUpRight } from 'lucide-react';
import { profile, publications, researchRole } from '../data/portfolio';

export function ResearchCard() {
  return (
    <article className="surface-card flex h-full flex-col p-7 sm:p-9">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rosewood">{researchRole.label}</p>
        <a
          href={researchRole.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-rosewood"
        >
          CORE Lab
          <ArrowUpRight size={14} />
        </a>
      </div>

      <h3 className="mt-4 font-display text-3xl font-light leading-tight text-ink">{researchRole.title}</h3>
      <p className="mt-3 max-w-xl text-[0.95rem] leading-7 text-muted">{researchRole.text}</p>

      <div className="mt-auto pt-10">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted">Publication</p>
        <ul className="grid gap-3">
          {publications.map((pub) => (
            <li key={pub.title} className="rounded-xl bg-blush/60 p-5">
              <p className="text-xs font-semibold text-rosewood">
                {pub.venue} · <span className="text-sage-deep">{pub.status}</span>
              </p>
              <p className="mt-2 font-display text-lg leading-snug text-ink">{pub.title}</p>
              <p className="mt-2 text-sm text-muted">
                {pub.authors.map((author, index) => {
                  const mark = pub.equalContribution.includes(author) ? '*' : '';
                  return (
                    <span key={author}>
                      {author === profile.name ? (
                        <strong className="font-semibold text-ink">{author}{mark}</strong>
                      ) : (
                        `${author}${mark}`
                      )}
                      {index < pub.authors.length - 1 && ', '}
                    </span>
                  );
                })}
              </p>
              {pub.equalContribution.length > 1 ? (
                <p className="mt-1 text-xs text-muted">* Equal contribution (co-first authors)</p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
