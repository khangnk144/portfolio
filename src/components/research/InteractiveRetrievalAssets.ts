// Real VisDial / MS-COCO images for the retrieval demo. Every image was inspected by eye;
// `consistent[i]` records whether the picture is visibly consistent with answer i.

export interface RetrievalCandidate {
  id: string
  src: string
  width: number
  height: number
  alt: string
  /** Visibly consistent with dialog answer 0, 1, 2 respectively. */
  consistent: [boolean, boolean, boolean]
}

export const TARGET_ID = '105101'

export const QUERY = 'A cat on a bench'
export const QUERY_NOTE = 'Vaguer paraphrase of the caption: "adult cat with a collar sitting outdoors on a wooden bench"'

// Real dialog rounds from the VisDial entry of the target image (round = position in the 10-round dialog).
export const DIALOG: { round: number; question: string; answer: string }[] = [
  { round: 5, question: 'Is the bench wood?', answer: 'Yes' },
  { round: 7, question: 'What color is the bench?', answer: 'Brown' },
  { round: 3, question: 'What color is the cat?', answer: 'White and orange' },
]

const img = (id: string, w: number, h: number, alt: string, consistent: [boolean, boolean, boolean]): RetrievalCandidate => ({
  id,
  src: `/research/interactive/cat-bench-${id}.webp`,
  width: w,
  height: h,
  alt,
  consistent,
})

const T = true
const F = false

// Base (pre-dialog) order is the display order before any answer.
export const CANDIDATES: RetrievalCandidate[] = [
  img('8241', 320, 213, 'Grey and white cat asleep on a weathered grey wooden bench', [T, F, F]),
  img('106443', 320, 217, 'Brown tabby cat on a golden wooden slatted bench', [T, T, F]),
  img('87488', 320, 240, 'Fluffy orange cat on a white metal bench in front of a bicycle wheel', [F, F, F]),
  img('40439', 320, 197, 'White and brown cat lying on a green wrought-iron bench', [F, F, F]),
  img('105101', 320, 240, 'Orange and white cat with a red collar on a dark brown wooden bench', [T, T, T]),
  img('86165', 320, 214, 'Orange tabby cat on a weathered grey wooden bench', [T, F, F]),
  img('106121', 240, 320, 'Brown tabby cat lying on a brown wooden bench in the sun', [T, T, F]),
  img('80244', 320, 240, 'Black cat lying on a flat stone bench', [F, F, F]),
  img('102063', 320, 214, 'Black and white cat on a honey-coloured wooden bench on a lawn', [T, T, F]),
  img('97358', 320, 240, 'Orange cat on a white metal bench beside a bicycle', [F, F, F]),
  img('41448', 320, 209, 'Grey cat lying on a weathered grey wooden bench', [T, F, F]),
  img('32060', 320, 214, 'Tabby cat with a heart-shaped tag on an ornate dark metal bench', [F, F, F]),
]

export const SOURCE_NOTE = 'Image & dialog: VisDial / MS-COCO (CC). Ranking is scripted for illustration.'

// Per-image source (Flickr page via COCO annotations) and license.
export const credits: { id: string; license: string; url: string }[] = [
  { id: '105101', license: 'CC BY 2.0', url: 'http://farm3.staticflickr.com/2300/2393330320_f520286320_z.jpg' },
  { id: '8241', license: 'CC BY 2.0', url: 'http://farm9.staticflickr.com/8402/8632625379_5900b69400_z.jpg' },
  { id: '86165', license: 'CC BY 2.0', url: 'http://farm4.staticflickr.com/3039/2985829099_bae630dcfa_z.jpg' },
  { id: '41448', license: 'CC BY 2.0', url: 'http://farm9.staticflickr.com/8148/7623839486_3157d93512_z.jpg' },
  { id: '106443', license: 'CC BY-SA 2.0', url: 'http://farm5.staticflickr.com/4051/4527975141_3551d59c21_z.jpg' },
  { id: '106121', license: 'CC BY 2.0', url: 'http://farm7.staticflickr.com/6165/6180727062_4e4eb48e99_z.jpg' },
  { id: '102063', license: 'CC BY-SA 2.0', url: 'http://farm5.staticflickr.com/4122/4765126307_3175461af0_z.jpg' },
  { id: '87488', license: 'CC BY 2.0', url: 'http://farm8.staticflickr.com/7250/7520201840_3e01349e3f_z.jpg' },
  { id: '97358', license: 'CC BY 2.0', url: 'http://farm8.staticflickr.com/7274/7520201236_a04ed41086_z.jpg' },
  { id: '40439', license: 'CC BY 2.0', url: 'http://farm1.staticflickr.com/186/398809706_f9197c35dd_z.jpg' },
  { id: '80244', license: 'CC BY 2.0', url: 'http://farm4.staticflickr.com/3217/3052765624_eb8feea3fb_z.jpg' },
  { id: '32060', license: 'CC BY 2.0', url: 'http://farm7.staticflickr.com/6074/6107321676_e2176d564e_z.jpg' },
]
