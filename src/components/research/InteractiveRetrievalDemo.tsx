import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { RotateCcw, Sparkles } from 'lucide-react'
import { useDemoAutoplay } from '../../hooks/use-demo-autoplay'
import { AutoplayBadge } from './AutoplayBadge'
import {
  CANDIDATES,
  DIALOG,
  QUERY,
  QUERY_NOTE,
  SOURCE_NOTE,
  TARGET_ID,
  credits,
  type RetrievalCandidate,
} from './InteractiveRetrievalAssets'

// Autoplay: 6 ticks per cycle (0 = query only, 1-3 = answers, 4-5 = hold on the result).
const AUTOPLAY_MS = 1500
const CYCLE_TICKS = 6

const score = (c: RetrievalCandidate, step: number) => c.consistent.slice(0, step).filter(Boolean).length

export function InteractiveRetrievalDemo() {
  const [step, setStep] = useState(0)
  const { ref, tick, isPlaying, takeOver, resume } = useDemoAutoplay<HTMLDivElement>(AUTOPLAY_MS)

  useEffect(() => {
    if (!isPlaying) return
    setStep(Math.min(tick % CYCLE_TICKS, DIALOG.length))
  }, [tick, isPlaying])

  const answer = () => {
    takeOver()
    setStep((s) => Math.min(s + 1, DIALOG.length))
  }
  const reset = () => {
    takeOver()
    setStep(0)
  }
  const handleResume = () => {
    setStep(0)
    resume()
  }

  // Stable sort: equal scores keep the base order, so ranking only changes when an answer rules something out.
  const ranked = [...CANDIDATES].sort((a, b) => score(b, step) - score(a, step))
  const alive = (c: RetrievalCandidate) => score(c, step) === step
  const counts = Array.from({ length: step + 1 }, (_, k) => CANDIDATES.filter((c) => score(c, k) === k).length)
  const done = step === DIALOG.length

  return (
    <div ref={ref} className="min-w-0">
      <div className="grid min-w-0 gap-4 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div className="flex min-h-[15rem] min-w-0 flex-col gap-2 sm:min-h-[20rem]" aria-live="polite">
          <div className="ml-auto max-w-[90%] rounded-2xl rounded-br-md bg-plum px-3 py-2 text-sm text-ivory">{QUERY}</div>
          <p className="ml-auto max-w-[90%] text-right text-[0.65rem] italic leading-snug text-muted">{QUERY_NOTE}</p>
          {DIALOG.slice(0, step + 1).map((d, i) => (
            <motion.div key={d.round} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-2">
              <div className="max-w-[92%] rounded-2xl rounded-bl-md border border-line bg-white px-3 py-2 text-sm text-ink">
                {d.question}
                <span className="ml-1.5 text-[0.6rem] uppercase tracking-wide text-muted">round {d.round}/10</span>
              </div>
              {i < step ? (
                <div className="ml-auto rounded-2xl rounded-br-md bg-rosewood/10 px-3 py-2 text-sm font-medium text-plum">{d.answer}</div>
              ) : (
                <button
                  type="button"
                  onClick={answer}
                  className="ml-auto rounded-full border border-rosewood/40 bg-white px-3 py-1.5 text-xs font-medium text-rosewood transition hover:bg-rosewood hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rosewood"
                >
                  Reply: {d.answer}
                </button>
              )}
            </motion.div>
          ))}
        </div>

        <div className="min-w-0">
          <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-3">
            {ranked.map((c, rank) => {
              const target = done && rank === 0 && c.id === TARGET_ID
              return (
                <motion.div
                  key={c.id}
                  layout
                  animate={{ opacity: alive(c) ? 1 : 0.35 }}
                  transition={{ layout: { duration: 0.5, ease: 'easeInOut' }, opacity: { duration: 0.3 } }}
                  className={`relative aspect-[4/3] min-w-0 overflow-hidden rounded-lg bg-blush ${target ? 'ring-2 ring-rosewood ring-offset-1 ring-offset-white' : 'ring-1 ring-line'}`}
                >
                  <img src={c.src} width={c.width} height={c.height} alt={c.alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                  <span aria-hidden className="absolute left-1 top-1 rounded bg-white/90 px-1 text-[0.6rem] font-medium leading-4 text-plum">
                    #{rank + 1}
                  </span>
                </motion.div>
              )
            })}
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2" aria-live="polite">
            <p className="text-sm text-plum">
              <span className="font-display italic">{counts.join(' → ')}</span> still consistent
            </p>
            <AnimatePresence>
              {done && (
                <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-1 rounded-full bg-rosewood px-3 py-1 text-xs font-medium text-white">
                  <Sparkles size={12} aria-hidden /> Target found ✦
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-start justify-between gap-2 border-t border-line pt-3">
        <div className="flex min-w-0 flex-col gap-1.5">
          <p className="text-xs italic text-muted">{SOURCE_NOTE}</p>
          <AutoplayBadge isPlaying={isPlaying} onResume={handleResume} />
          <details className="text-[0.65rem] text-muted">
            <summary className="cursor-pointer">Image credits (Flickr via MS-COCO)</summary>
            <ul className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5">
              {credits.map((c) => (
                <li key={c.id}>
                  <a href={c.url} target="_blank" rel="noreferrer" className="underline">{c.id}</a> {c.license}
                </li>
              ))}
            </ul>
          </details>
        </div>
        <button
          type="button"
          onClick={reset}
          disabled={step === 0}
          className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-plum transition hover:bg-blush disabled:opacity-40"
        >
          <RotateCcw size={12} aria-hidden /> Reset
        </button>
      </div>
    </div>
  )
}
