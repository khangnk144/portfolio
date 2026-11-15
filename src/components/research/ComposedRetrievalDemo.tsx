import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { useDemoAutoplay } from '../../hooks/use-demo-autoplay'
import { AutoplayBadge } from './AutoplayBadge'
import { CREDITS, SOURCE_NOTE, TRIPLETS } from './ComposedRetrievalAssets'
import { CandidateGallery, MainPhoto } from './ComposedRetrievalScene'

export function ComposedRetrievalDemo() {
  const [idx, setIdx] = useState(0)
  const { ref, tick, isPlaying, takeOver, resume } = useDemoAutoplay<HTMLDivElement>(2800)

  useEffect(() => {
    if (!isPlaying || tick === 0) return
    setIdx(tick % TRIPLETS.length)
  }, [tick, isPlaying])

  const triplet = TRIPLETS[idx]
  const refCredit = CREDITS[triplet.referenceId]
  const tgtCredit = CREDITS[triplet.targetId]

  return (
    <div ref={ref} className="w-full min-w-0">
      <p className="mb-3 font-display text-lg italic text-plum">Search with a reference + a change</p>

      <div className="mx-auto grid max-w-md grid-cols-2 gap-4">
        <figure className="min-w-0">
          <MainPhoto photo={triplet.reference} />
          <figcaption className="mt-1.5 text-center text-xs text-muted">Reference photo</figcaption>
        </figure>
        <figure className="min-w-0" aria-live="polite">
          <MainPhoto photo={triplet.target} motionKey={triplet.target.src} />
          <figcaption className="mt-1.5 text-center text-xs text-muted">Top-1 retrieved photo</figcaption>
        </figure>
      </div>

      <div className="mt-4 rounded-2xl border border-dashed border-bloom/60 bg-ivory p-3">
        <p className="mb-1 flex items-center gap-1.5 text-xs text-muted">
          <Plus size={14} className="shrink-0 text-bloom" aria-hidden />
          Modification text (verbatim from CIRCO)
        </p>
        <p aria-live="polite" className="font-display text-base italic text-rosewood">
          “{triplet.text}”
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5" role="group" aria-label="Choose an example">
          {TRIPLETS.map((t, i) => (
            <button
              key={t.id}
              type="button"
              aria-pressed={i === idx}
              onClick={() => {
                takeOver()
                setIdx(i)
              }}
              className={`rounded-full border px-2.5 py-1 text-xs transition-colors ${
                i === idx ? 'border-plum bg-plum text-ivory' : 'border-line bg-white text-plum hover:bg-blush'
              }`}
            >
              {t.concept}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <p className="mb-2 text-xs text-muted">
          The system does not edit or draw anything. It looks through a database of existing photos and returns the
          best match. Small gallery with one marked match — real benchmarks often have several valid targets.
        </p>
        <CandidateGallery triplet={triplet} />
      </div>

      <p className="mt-4 text-xs text-muted">
        Composed video retrieval (e.g. CoVR, EgoCVR) applies the same idea to clips.
      </p>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
        <p className="text-center text-xs italic text-muted">{SOURCE_NOTE}</p>
        <AutoplayBadge isPlaying={isPlaying} onResume={resume} />
      </div>
      <p className="mt-2 text-center text-[10px] text-muted">
        Photo sources:{' '}
        <a href={refCredit.flickr} target="_blank" rel="noopener noreferrer" className="underline">
          reference
        </a>{' '}
        ({refCredit.license}),{' '}
        <a href={tgtCredit.flickr} target="_blank" rel="noopener noreferrer" className="underline">
          target
        </a>{' '}
        ({tgtCredit.license}); all images via MS-COCO / Flickr.
      </p>
    </div>
  )
}
