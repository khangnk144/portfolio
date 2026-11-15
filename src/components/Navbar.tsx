import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { nameParts, navigation, profile } from '../data/portfolio';
import { useActiveSection } from '../hooks/use-active-section';

const sectionIds = navigation.map((item) => item.href.slice(1));

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const activeId = useActiveSection(sectionIds);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (value) => setIsScrolled(value > 16));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        isScrolled || isOpen ? 'border-line bg-ivory/95' : 'border-transparent bg-transparent'
      }`}
    >
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8 lg:px-0">
        <a href="#home" className="font-display text-xl text-ink" aria-label={`${profile.name} home`}>
          {nameParts.first} <em className="text-rosewood">{nameParts.last}</em>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {navigation.map((item) => {
            const isActive = activeId === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'true' : undefined}
                className={`relative py-1 font-mono text-xs lowercase transition-colors ${
                  isActive ? 'text-plum' : 'text-muted hover:text-ink'
                }`}
              >
                {item.label}
                {isActive ? (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-0 -bottom-0.5 h-px bg-pop"
                    transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                  />
                ) : null}
              </a>
            );
          })}
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-full border border-plum/20 px-4 py-1.5 font-mono text-xs text-plum transition-colors hover:border-plum hover:bg-plum hover:text-white"
          >
            github
            <ArrowUpRight size={13} />
          </a>
        </div>

        <button
          type="button"
          className="grid size-10 place-items-center rounded-full text-ink transition-colors hover:bg-blush md:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            id="mobile-navigation"
            className="border-t border-line bg-ivory px-5 pb-4 md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {[...navigation, { label: 'GitHub ↗', href: profile.github }].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block border-b border-line py-3 text-base ${
                  activeId === item.href.slice(1) ? 'text-rosewood' : 'text-ink'
                }`}
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
