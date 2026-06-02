import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { navigation, profile } from '../data/portfolio';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/70 bg-white/78 px-4 py-3 shadow-[0_18px_60px_rgba(92,64,72,0.12)] backdrop-blur-xl">
        <a href="#home" className="flex items-center gap-3" aria-label="Khang Nguyen home">
          <span className="grid size-10 place-items-center rounded-full bg-[var(--color-rose-200)] font-serif text-lg text-[var(--color-rose-800)]">
            K
          </span>
          <span className="hidden text-sm font-semibold text-[var(--color-ink)] sm:block">
            {profile.name}
          </span>
        </a>

        <div className="hidden items-center gap-2 md:flex">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)] transition hover:bg-[var(--color-blush)] hover:text-[var(--color-rose-800)]"
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="grid size-10 place-items-center rounded-full text-[var(--color-ink)] transition hover:bg-[var(--color-blush)] md:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {isOpen ? (
        <div
          id="mobile-navigation"
          className="mx-auto mt-3 grid max-w-6xl gap-1 rounded-3xl border border-white/70 bg-white/92 p-3 shadow-[0_18px_60px_rgba(92,64,72,0.12)] backdrop-blur-xl md:hidden"
        >
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="rounded-2xl px-4 py-3 text-sm font-semibold text-[var(--color-muted)] transition hover:bg-[var(--color-blush)] hover:text-[var(--color-rose-800)]"
            >
              {item.label}
            </a>
          ))}
        </div>
      ) : null}
    </header>
  );
}
