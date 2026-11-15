import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { profile } from '../data/portfolio';
import { Reveal } from './Reveal';

export function Contact() {
  return (
    <section id="contact" className="section-shell pb-10">
      <Reveal className="mx-auto max-w-6xl">
        <div className="rounded-3xl bg-plum bg-[radial-gradient(rgb(255_255_255/0.08)_1px,transparent_1.2px)] bg-[length:22px_22px] px-7 py-16 text-center text-ivory sm:px-12 sm:py-24">
          <p className="mb-6 font-mono text-xs text-petal">
            <span className="text-pop">[05]</span> ~/contact
          </p>
          <h2 className="mx-auto max-w-3xl font-display text-4xl font-light leading-[1.05] tracking-[-0.02em] sm:text-6xl">
            Let us connect <em className="text-petal">through code.</em>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[0.95rem] leading-7 text-white/70">
            I am always happy to share what I am building and keep learning from thoughtful projects.
          </p>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-ivory px-7 py-3.5 text-sm font-medium text-plum transition-colors hover:bg-petal"
          >
            <span className="font-mono text-xs">$ open {profile.github.replace(/^https?:\/\//, '')}</span>
            <ArrowUpRight size={15} />
          </a>
        </div>
      </Reveal>

      <footer className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-4 font-mono text-[0.7rem] text-muted sm:flex-row">
        <span>© 2026 {profile.name}</span>
        <a href="#home" className="inline-flex items-center gap-1.5 transition-colors hover:text-rosewood">
          Back to top
          <ArrowUp size={13} />
        </a>
      </footer>
    </section>
  );
}
