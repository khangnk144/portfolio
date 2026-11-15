import { useEffect, useId, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useDemoAutoplay } from '../../hooks/use-demo-autoplay'
import { AutoplayBadge } from './AutoplayBadge'
import { CREDITS, FRAMES, FRAME_H, FRAME_W, PATCH_IMAGE, PATCH_SCORES } from './EfficientUnderstandingAssets'

type Mode = 'frames' | 'patches'

const TOKENS_PER_FRAME = 196 // 14 x 14 patches, illustrative assumption
const GRID = 8
const SWEEP = [100, 80, 60, 40, 30, 20, 20, 40, 70, 100] // budget % per autoplay tick
const FRAME_SCORES = FRAMES.map((f) => f.score)
const KEY_COUNT = FRAMES.filter((f) => f.key).length
const clock = (t: number) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`

/** Indices of the k highest-scoring items (ties broken by position). */
function topK(scores: number[], k: number): Set<number> {
  return new Set(
    scores.map((s, i) => [s, i] as const).sort((a, b) => b[0] - a[0] || a[1] - b[1]).slice(0, k).map(([, i]) => i),
  )
}

export function EfficientUnderstandingDemo() {
  const [pct, setPct] = useState(30)
  const [mode, setMode] = useState<Mode>('frames')
  const id = useId()
  const { ref, tick, isPlaying, takeOver, resume } = useDemoAutoplay<HTMLDivElement>(1000)

  useEffect(() => {
    if (!isPlaying) return
    setPct(SWEEP[tick % SWEEP.length])
    setMode(Math.floor(tick / SWEEP.length) % 2 === 0 ? 'frames' : 'patches')
  }, [tick, isPlaying])
  const isFrames = mode === 'frames'
  const scores = useMemo(() => (isFrames ? FRAME_SCORES : PATCH_SCORES), [isFrames])
  const total = scores.length
  const k = Math.max(1, Math.round((pct / 100) * total))
  const kept = useMemo(() => topK(scores, k), [scores, k])

  const tokKept = isFrames ? k * TOKENS_PER_FRAME : k
  const tokTotal = isFrames ? total * TOKENS_PER_FRAME : total
  const attn = (tokKept / tokTotal) ** 2 // attention cost ∝ tokens²
  const keyFrames = FRAMES.filter((f, i) => f.key && kept.has(i))
  const allKeys = keyFrames.length === KEY_COUNT

  return (
    <div ref={ref}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="font-display text-lg text-plum">
          Keep the <em className="text-rosewood">informative</em> {isFrames ? 'frames' : 'patches'}
        </p>
        <div role="group" aria-label="Demo mode" className="flex rounded-full bg-blush p-1 text-sm">
          {(['frames', 'patches'] as const).map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={mode === m}
              onClick={() => { takeOver(); setMode(m) }}
              className={`rounded-full px-4 py-1 capitalize transition-colors ${mode === m ? 'bg-plum text-ivory' : 'text-plum hover:bg-petal'}`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {isFrames ? (
        <ul className="grid grid-cols-4 gap-2 sm:grid-cols-8" aria-label="Video frames, 16 in total">
          {FRAMES.map((f, i) => (
            <motion.li
              key={f.src}
              animate={kept.has(i) ? { scale: 1, opacity: 1 } : { scale: 0.85, opacity: 0.4 }}
              transition={{ duration: 0.3 }}
              className={`relative overflow-hidden rounded-lg border border-line ${kept.has(i) ? '' : 'grayscale'} ${f.key ? 'ring-2 ring-rosewood' : ''}`}
            >
              <img src={f.src} width={FRAME_W} height={FRAME_H} loading="lazy" decoding="async" alt={f.key ?? `Frame at ${clock(f.t)}`} className="block aspect-video w-full object-cover" />
              <span className="absolute bottom-0 right-0 rounded-tl bg-ivory/90 px-1 text-[10px] text-plum">{f.score.toFixed(2)}</span>
              <span className="sr-only">{kept.has(i) ? 'kept' : 'dropped'}</span>
            </motion.li>
          ))}
        </ul>
      ) : (
        <div className="relative mx-auto aspect-video w-full max-w-md overflow-hidden rounded-lg border border-line">
          <img src={PATCH_IMAGE.src} width={PATCH_IMAGE.width} height={PATCH_IMAGE.height} loading="lazy" decoding="async" alt="One video frame split into an 8 by 8 grid of patches" className="block h-full w-full object-cover" />
          <div aria-hidden className="absolute inset-0 grid grid-cols-8 grid-rows-8">
            {PATCH_SCORES.map((_, i) => (
              <motion.span key={i} initial={false} animate={{ opacity: kept.has(i) ? 0 : 0.85 }} transition={{ duration: 0.25 }} className="border border-ivory/40 bg-ivory" />
            ))}
          </div>
        </div>
      )}
      <p className="mt-2 text-xs text-muted">
        {isFrames
          ? 'Score = change vs. previous frame (computed from pixels; the first frame has none). Real methods also use the question being asked.'
          : "Score = colour distance from the frame's mean (computed saliency stand-in). Real methods drop or merge tokens using attention or similarity."}
      </p>

      <div className="mt-5">
        <label htmlFor={id} className="mb-1 block text-sm font-medium text-plum">
          Keep {pct}% of {isFrames ? 'frames' : 'patch tokens'}
        </label>
        <input
          id={id}
          type="range"
          min={20}
          max={100}
          step={5}
          value={pct}
          onChange={(e) => { takeOver(); setPct(Number(e.target.value)) }}
          className="w-full accent-plum"
        />
      </div>

      <dl aria-live="polite" className="mt-5 grid grid-cols-3 divide-x divide-line border-y border-line text-sm">
        <div className="py-3 pr-3">
          <dt className="text-xs text-muted">{isFrames ? 'Frames kept' : 'Patches kept'}</dt>
          <dd className="font-display text-xl text-plum">{k} / {total}</dd>
        </div>
        <div className="px-3 py-3">
          <dt className="text-xs text-muted">Visual tokens</dt>
          <dd className="font-display text-xl text-plum">
            {isFrames ? (k * 196).toLocaleString('en-US') : k}
            <span className="text-sm text-muted"> / {isFrames ? (total * 196).toLocaleString('en-US') : total}</span>
          </dd>
        </div>
        <div className="py-3 pl-3">
          <dt className="text-xs text-muted">≈ Attention cost</dt>
          <dd className="font-display text-xl text-plum">{(attn * 100).toFixed(attn < 0.1 ? 1 : 0)}%</dd>
          <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-blush">
            <motion.div className="h-full origin-left rounded-full bg-rosewood" initial={false} animate={{ scaleX: attn }} />
          </div>
        </div>
      </dl>
      <p className="mt-2 text-[0.7rem] text-muted">
        {isFrames ? 'Assumes 196 tokens per frame (14×14 patches). ' : ''}Attention cost ∝ tokens²; total cost also has linear terms.
      </p>

      {isFrames && (
        <p aria-live="polite" className="mt-4 text-sm leading-6 text-sage-deep">
          Recipe still readable? <strong>{allKeys ? 'Yes' : 'Partly'}</strong>:{' '}
          {keyFrames.map((f) => `${f.key} (${clock(f.t)})`).join(' → ') || 'no key moment kept'}
        </p>
      )}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs italic text-muted">
          Video: {CREDITS.title} by {CREDITS.author}, {CREDITS.license},{' '}
          <a href={CREDITS.url} target="_blank" rel="noreferrer" className="underline">Wikimedia Commons</a>. Scores computed from pixels; selection is a toy illustration.
        </p>
        <AutoplayBadge isPlaying={isPlaying} onResume={resume} />
      </div>
    </div>
  )
}
