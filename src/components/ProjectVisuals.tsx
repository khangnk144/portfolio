import { useEffect, useState } from 'react';

const verdicts = [
  { label: 'GOOD', dot: 'bg-sage' },
  { label: 'BAD', dot: 'bg-rosewood' },
  { label: 'NEUTRAL', dot: 'bg-[#d8b98c]' },
];

const labelLineWidths = [92, 76, 84, 62, 70];

/** Mock ingredient label with an OCR scan line sweeping over it. */
export function SkinmateVisual() {
  return (
    <div className="relative h-full min-h-[21rem] overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-blush via-white to-petal/70">
      <span className="absolute left-5 top-5 rounded-full bg-white/85 px-3 py-1 text-[0.65rem] font-bold tracking-[0.2em] text-rosewood">
        SKINMATE
      </span>

      <div className="absolute inset-x-8 bottom-20 top-16 rounded-2xl border border-white bg-white/75 p-5 shadow-[0_20px_45px_-20px_rgba(75,31,55,0.35)] transition duration-500 group-hover:-rotate-1 group-hover:scale-[1.02] sm:inset-x-12">
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          <div className="absolute inset-x-2 h-12 animate-scan rounded-xl bg-gradient-to-b from-transparent via-bloom/35 to-transparent" />
        </div>
        <div className="relative flex items-center gap-3">
          <img
            src="/skinmate_logo.png"
            alt="SKINMATE logo"
            className="size-12 rounded-full bg-white object-contain shadow-sm"
            onError={(event) => {
              event.currentTarget.style.display = 'none';
            }}
          />
          <div className="space-y-2">
            <div className="h-2 w-24 rounded-full bg-petal" />
            <div className="h-2 w-16 rounded-full bg-blush" />
          </div>
        </div>
        <div className="relative mt-5 space-y-2.5">
          {labelLineWidths.map((width) => (
            <div key={width} className="h-2 rounded-full bg-ink/10" style={{ width: `${width}%` }} />
          ))}
        </div>
        <span className="absolute -right-3 -top-3 rounded-full bg-sage-soft px-3 py-1 text-xs font-semibold text-sage-deep shadow-sm">
          OCR
        </span>
      </div>

      <div className="absolute inset-x-5 bottom-5 grid grid-cols-3 gap-2">
        {verdicts.map((verdict, index) => (
          <span
            key={verdict.label}
            className="flex items-center justify-center gap-1.5 rounded-full bg-white/85 px-2 py-2 text-[0.65rem] font-bold tracking-wider text-muted transition duration-300 group-hover:-translate-y-1"
            style={{ transitionDelay: `${index * 70}ms` }}
          >
            <span className={`size-1.5 rounded-full ${verdict.dot}`} />
            {verdict.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function useClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return now;
}

function greetingFor(hour: number) {
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

/** Mini new-tab dashboard with a live clock and a focus input visitors can type into. */
export function MomentumVisual() {
  const now = useClock();
  const [focus, setFocus] = useState('');
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });

  return (
    <div className="relative grid h-full min-h-[21rem] place-items-center overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-sage-soft via-white to-champagne p-6">
      <div className="w-full max-w-sm rounded-3xl border border-white bg-white/85 p-5 shadow-[0_20px_45px_-20px_rgba(75,31,55,0.3)] transition duration-500 group-hover:-translate-y-1">
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-bloom" />
            <span className="size-2.5 rounded-full bg-[#e8d6a5]" />
            <span className="size-2.5 rounded-full bg-sage" />
          </div>
          <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-muted">New tab</span>
        </div>

        <div className="mt-6 text-center">
          <p className="font-display text-5xl font-light tabular-nums text-ink">{time}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted">{greetingFor(now.getHours())}</p>
        </div>

        <label className="mt-6 block">
          <span className="sr-only">Try the daily focus input</span>
          <input
            value={focus}
            onChange={(event) => setFocus(event.target.value)}
            maxLength={48}
            placeholder="Today I will build something calm."
            className="w-full rounded-2xl bg-sage-soft px-4 py-3 text-center text-sm text-sage-deep outline-none ring-sage/50 transition placeholder:text-sage-deep/70 focus:ring-2"
          />
        </label>

        <div className="mt-4 flex justify-center gap-2">
          {['Pomodoro', 'Todo', 'Habits'].map((widget) => (
            <span key={widget} className="rounded-full bg-white px-3 py-1 text-[0.65rem] font-semibold text-muted">
              {widget}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
