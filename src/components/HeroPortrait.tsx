import { motion } from 'framer-motion';
import profileImage from '../assets/profile-image.webp';
import { nameParts, profile, publications } from '../data/portfolio';

const featuredPublication = publications[0];

/** Arch-framed portrait with a detection-style box around the face, a nod to computer vision work. */
export function HeroPortrait() {
  return (
    <motion.figure
      className="relative mx-auto w-full max-w-[22rem] lg:max-w-[24rem]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div
        className="relative aspect-[4/5] overflow-hidden rounded-t-[12rem] rounded-b-2xl border border-line bg-blush"
        onContextMenu={(event) => event.preventDefault()}
      >
        <img
          src={profileImage}
          alt={`${profile.name} portrait`}
          width={900}
          height={900}
          className="protected-photo h-full w-full object-cover object-[center_30%]"
          draggable={false}
          fetchPriority="high"
        />

        <motion.div
          aria-hidden
          className="absolute left-[19%] top-[13%] h-[50%] w-[62%] rounded-sm border-[1.5px] border-pop"
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="absolute -top-[1.35rem] left-[-1.5px] whitespace-nowrap rounded-t-sm bg-pop px-1.5 py-0.5 font-mono text-[0.65rem] text-white">
            {nameParts.first.toLowerCase()}_{nameParts.last.toLowerCase()} · cs@uit
          </span>
        </motion.div>
      </div>

      {featuredPublication ? (
        <figcaption className="absolute -bottom-5 left-1/2 w-max -translate-x-1/2 rounded-full border border-line bg-paper px-4 py-2 font-mono text-[0.7rem] text-ink shadow-[0_8px_24px_-12px_rgba(59,29,46,0.25)]">
          <span className="text-pop">✦</span> {featuredPublication.venue}
          <span className="mx-2 text-line">|</span>
          {featuredPublication.status.toLowerCase()}
        </figcaption>
      ) : null}
    </motion.figure>
  );
}
