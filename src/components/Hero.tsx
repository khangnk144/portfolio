import { motion } from 'framer-motion';
import { ArrowUpRight, GitBranch, MapPin, Sparkles } from 'lucide-react';
import profileImage from '../assets/profile-image.png';
import { profile } from '../data/portfolio';

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center px-5 pb-20 pt-32 sm:px-8 lg:px-10"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-12rem] top-24 h-80 w-80 rounded-full bg-[rgba(232,165,181,0.28)] blur-3xl" />
        <div className="absolute right-[-10rem] top-40 h-96 w-96 rounded-full bg-[rgba(166,190,168,0.22)] blur-3xl" />
        <div className="absolute bottom-12 left-1/3 h-64 w-64 rounded-full bg-[rgba(244,214,196,0.38)] blur-3xl" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-rose-200)] bg-white/70 px-4 py-2 text-sm text-[var(--color-rose-800)] shadow-sm">
            <Sparkles size={16} />
            Hello, I am
          </div>
          <h1 className="font-serif text-5xl leading-[1.02] text-[var(--color-ink)] sm:text-6xl lg:text-7xl">
            {profile.name}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[var(--color-muted)] sm:text-xl">
            {profile.headline}
          </p>
          <div className="mt-5 flex max-w-xl items-start gap-3 rounded-3xl border border-white/80 bg-white/62 p-4 text-sm leading-6 text-[var(--color-muted)] shadow-sm backdrop-blur">
            <MapPin className="mt-1 shrink-0 text-[var(--color-sage-700)]" size={18} />
            <span>{profile.school}</span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {profile.roles.map((role) => (
              <span
                key={role}
                className="rounded-full border border-white/80 bg-white/64 px-4 py-2 text-sm font-medium text-[var(--color-muted)] shadow-sm"
              >
                {role}
              </span>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="primary-cta inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-6 py-3 text-sm font-semibold shadow-[0_16px_38px_rgba(76,58,64,0.24)] transition hover:-translate-y-0.5 hover:bg-[var(--color-rose-900)] focus:outline-none focus:ring-2 focus:ring-[var(--color-rose-500)] focus:ring-offset-2"
            >
              <GitBranch size={18} />
              View GitHub
              <ArrowUpRight size={16} />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-rose-300)] bg-white/68 px-6 py-3 text-sm font-semibold text-[var(--color-rose-900)] transition hover:-translate-y-0.5 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-rose-500)] focus:ring-offset-2"
            >
              See Projects
            </a>
          </div>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-[29rem]"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.12, ease: 'easeOut' }}
        >
          <div className="absolute -left-4 top-16 z-10 rounded-3xl border border-white/80 bg-white/72 p-4 shadow-[0_18px_55px_rgba(92,64,72,0.16)] backdrop-blur">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">UIT</p>
            <p className="mt-1 font-serif text-2xl text-[var(--color-ink)]">Year 2</p>
          </div>
          <div className="absolute -right-2 bottom-8 z-10 rounded-3xl border border-white/80 bg-[var(--color-sage-100)]/80 p-4 shadow-[0_18px_55px_rgba(92,64,72,0.14)] backdrop-blur">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
              Focus
            </p>
            <p className="mt-1 font-medium text-[var(--color-ink)]">Logic & Flow</p>
          </div>
          <div
            className="relative aspect-[0.86] rounded-[2.2rem] border border-white/80 bg-gradient-to-br from-white via-[var(--color-blush)] to-[var(--color-sage-100)] p-6 shadow-[0_28px_80px_rgba(92,64,72,0.16)]"
            onContextMenu={(event) => event.preventDefault()}
          >
            <div className="absolute inset-6 rounded-[1.8rem] border border-white/70" />
            <div className="relative grid h-full place-items-center rounded-[1.7rem] bg-white/40">
              <div className="grid size-52 place-items-center overflow-hidden rounded-full border border-white/80 bg-[var(--color-rose-200)]/70 shadow-inner sm:size-60">
                <img
                  src={profileImage}
                  alt="Khang Nguyen portrait"
                  className="protected-photo h-full w-full object-cover"
                  draggable={false}
                  loading="eager"
                />
              </div>
              <div className="absolute left-10 top-10 size-5 rounded-full bg-[var(--color-sage-600)]" />
              <div className="absolute bottom-20 right-14 size-8 rounded-full border border-[var(--color-rose-300)]" />
              <div className="absolute right-9 top-20 h-14 w-14 rounded-full bg-white/70" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
