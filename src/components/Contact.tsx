import { GitBranch, Send } from 'lucide-react';
import { profile } from '../data/portfolio';
import { SectionHeading } from './SectionHeading';

export function Contact() {
  return (
    <section id="contact" className="section-shell pb-16">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/80 bg-gradient-to-br from-white/82 via-[var(--color-blush)]/72 to-[var(--color-sage-100)]/70 p-7 text-center shadow-[0_24px_80px_rgba(92,64,72,0.13)] backdrop-blur sm:p-10">
        <SectionHeading
          eyebrow="Contact"
          title="Let us connect through code."
          description="I am always happy to share what I am building and keep learning from thoughtful projects."
        />
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="primary-cta inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-6 py-3 text-sm font-semibold shadow-[0_16px_38px_rgba(76,58,64,0.22)] transition hover:-translate-y-0.5 hover:bg-[var(--color-rose-900)] focus:outline-none focus:ring-2 focus:ring-[var(--color-rose-500)] focus:ring-offset-2"
        >
          <GitBranch size={18} />
          Visit GitHub
          <Send size={16} />
        </a>
      </div>

      <footer className="mx-auto mt-10 max-w-6xl text-center text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
        © 2026 Khang Nguyen
      </footer>
    </section>
  );
}
