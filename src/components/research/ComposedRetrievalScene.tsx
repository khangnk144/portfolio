import { AnimatePresence, motion } from 'framer-motion'
import type { Triplet } from './ComposedRetrievalAssets'

type Photo = Triplet['reference']

/** One large photo, shown whole (object-contain) so no part of the edit is cropped away. */
export function MainPhoto({ photo, motionKey }: { photo: Photo; motionKey?: string }) {
  return (
    <div className="aspect-[4/3] w-full overflow-hidden rounded-xl border border-line bg-ivory">
      <AnimatePresence mode="wait">
        <motion.img
          key={motionKey ?? photo.src}
          src={photo.src}
          width={photo.width}
          height={photo.height}
          alt={photo.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        />
      </AnimatePresence>
    </div>
  )
}

/** Candidate database for one triplet; the ground-truth target is outlined. */
export function CandidateGallery({ triplet }: { triplet: Triplet }) {
  return (
    <ul className="grid grid-cols-4 gap-1.5 sm:grid-cols-8" aria-label="Candidate photos in the database">
      {triplet.gallery.map((tile, i) => {
        const hit = tile.id === triplet.targetId
        return (
          <li
            key={tile.id}
            className={`rounded-lg p-0.5 transition-opacity ${
              hit ? 'bg-rosewood opacity-100' : 'opacity-60'
            }`}
          >
            <img
              src={tile.thumb}
              width={200}
              height={200}
              alt={hit ? 'Top-1 retrieved candidate' : `Candidate ${i + 1}`}
              loading="lazy"
              decoding="async"
              className="aspect-square w-full rounded-md object-cover"
            />
          </li>
        )
      })}
    </ul>
  )
}
