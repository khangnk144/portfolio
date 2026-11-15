import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useDemoAutoplay } from '../../hooks/use-demo-autoplay'
import { AutoplayBadge } from './AutoplayBadge'
import { CREDITS, EXAMPLES, IMAGE, IMAGE_SOURCE } from './SpatialGroundingAssets'

const boxStyle = ([l, t, w, h]: readonly [number, number, number, number]) => ({
  left: `${l}%`, top: `${t}%`, width: `${w}%`, height: `${h}%`,
})

export function SpatialGroundingDemo() {
  const [sel, setSel] = useState<number | null>(null)
  const [shown, setShown] = useState(0)
  // Bumped on every selection so re-selecting the same expression replays the animation.
  const [runId, setRunId] = useState(0)
  const { ref, tick, isPlaying, takeOver, resume } = useDemoAutoplay<HTMLDivElement>(5500)
  const ex = sel === null ? null : EXAMPLES[sel]
  const done = ex !== null && shown >= ex.steps.length
  const detecting = ex !== null && shown === 0

  useEffect(() => {
    if (sel === null) return
    const n = EXAMPLES[sel].steps.length
    const timers = Array.from({ length: n }, (_, i) => window.setTimeout(() => setShown(i + 1), 900 + i * 700))
    return () => timers.forEach(window.clearTimeout)
  }, [sel, runId])

  const choose = (i: number) => { setShown(0); setSel(i); setRunId((n) => n + 1) }
  const playing = useRef(isPlaying)
  playing.current = isPlaying

  // Each autoplay tick advances to the next expression; the first starts as soon as the demo is in view.
  useEffect(() => {
    if (tick > 0 && playing.current) choose((sel === null ? 0 : sel + 1) % EXAMPLES.length)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick])
  useEffect(() => {
    if (isPlaying && sel === null) choose(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying])

  return (
    <div ref={ref} className="w-full max-w-full">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Example referring expressions">
        {EXAMPLES.map((e, i) => (
          <button
            key={e.phrase}
            type="button"
            aria-pressed={sel === i}
            onClick={() => { takeOver(); choose(i) }}
            className={`rounded-full border px-3 py-1.5 text-left text-xs transition-colors sm:text-sm ${
              sel === i ? 'border-plum bg-plum text-ivory' : 'border-line bg-white text-plum hover:border-rosewood'
            }`}
          >
            “{e.phrase}”
          </button>
        ))}
      </div>

      <div
        role="img"
        aria-label={IMAGE.alt}
        className="relative mt-4 w-full overflow-hidden rounded-2xl border border-line bg-ivory"
        style={{ aspectRatio: `${IMAGE.width} / ${IMAGE.height}` }}
      >
        <img src={IMAGE.src} alt="" width={IMAGE.width} height={IMAGE.height} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
        {ex && EXAMPLES.map((c) => (
          <motion.span
            key={c.phrase}
            className="absolute rounded-sm border border-dashed border-white/90"
            style={boxStyle(c.box)}
            initial={false}
            animate={{ opacity: detecting ? 1 : 0 }}
            aria-hidden
          />
        ))}
        {ex && done && (
          <motion.div
            key={`${sel}-${runId}`}
            className="absolute rounded-md border-2 border-rosewood bg-rosewood/10"
            initial={{ left: '0%', top: '0%', width: '100%', height: '100%', opacity: 0 }}
            animate={{ ...boxStyle(ex.box), opacity: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          >
            <span className="absolute left-0 top-0 whitespace-nowrap rounded-br-md bg-rosewood px-1.5 py-0.5 text-[10px] font-medium text-white sm:text-xs">
              ground truth
            </span>
          </motion.div>
        )}
      </div>

      <ol aria-live="polite" className="mt-4 min-h-[9.5rem] space-y-1.5 text-sm text-plum sm:min-h-[7.5rem]">
        {ex === null && <li className="text-muted">Choose a phrase above to watch the image get grounded.</li>}
        {detecting && <li className="text-muted">Detecting candidate objects for “{ex.phrase}”…</li>}
        {ex?.steps.slice(0, shown).map((s, i) => (
          <motion.li key={`${sel}-${i}`} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className="flex gap-2">
            <span className="font-display italic text-rosewood">{i + 1}.</span>
            <span>{s}</span>
          </motion.li>
        ))}
      </ol>
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
        <p className="min-w-0 flex-1 basis-60 text-xs italic text-muted">
          Toy illustration of a modular pipeline: boxes come from a detector, then relations are computed step by step. End-to-end models predict the box directly. Not a real model&apos;s output.
        </p>
        <AutoplayBadge isPlaying={isPlaying} onResume={resume} />
      </div>
      <p className="mt-1 text-[11px] text-muted">
        {CREDITS}{' '}
        <a href={IMAGE_SOURCE.url} target="_blank" rel="noreferrer" className="underline">{IMAGE_SOURCE.label}</a> ({IMAGE_SOURCE.license}).
      </p>
    </div>
  )
}
