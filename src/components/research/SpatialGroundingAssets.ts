/** Real RefCOCO example: image, referring expressions and ground-truth boxes. */
export interface GroundingExample {
  phrase: string
  /** Ground-truth box as [left, top, width, height] in % of the image. */
  box: readonly [number, number, number, number]
  /** Illustrative step trace of a modular pipeline (scripted text, not model output). */
  steps: readonly string[]
}

export const IMAGE = {
  src: '/research/spatial/horses-refcoco-491739.webp',
  width: 640,
  height: 428,
  alt: 'Draft horses pulling a plough across a field, with two men walking beside them. Three horses are outlined as candidates.',
} as const

// Boxes: RefCOCO (UNC) validation annotations for COCO image 491739, converted from
// COCO x,y,w,h pixels (640x428) to %. Phrases are verbatim RefCOCO sentences.
export const EXAMPLES: readonly GroundingExample[] = [
  {
    phrase: 'front left horse',
    box: [38.17, 32.85, 25.05, 54.62],
    steps: [
      'Detector proposes 3 horse boxes (the annotated horses)',
      'Order the boxes by center x: 51%, 70%, 82%',
      'Relation "left": keep the smallest x, the chestnut horse nearest the men',
      'Ground the phrase to that box',
    ],
  },
  {
    phrase: 'second horse from right',
    box: [54.7, 26.07, 29.91, 63.6],
    steps: [
      'Detector proposes 3 horse boxes (the annotated horses)',
      'Order the boxes from the right by center x: 82%, 70%, 51%',
      'Relation "second from right": take the 2nd box in that order',
      'Ground the phrase to that box, the chestnut horse with the pale mane',
    ],
  },
  {
    phrase: 'dark horse on far right',
    box: [67.58, 37.7, 28.88, 50.01],
    steps: [
      'Detector proposes 3 horse boxes (the annotated horses)',
      'Attribute "dark": only one is black; the other two are chestnut',
      'Relation "far right": it also has the largest center x, 82%',
      'Ground the phrase to that box',
    ],
  },
]

export const CREDITS =
  'Image & expressions: RefCOCO (MS-COCO, CC). Boxes are ground truth; the step trace is illustrative.'
// The original Flickr photo is no longer online (author unrecoverable); link the COCO-hosted copy.
export const IMAGE_SOURCE = {
  url: 'http://images.cocodataset.org/train2014/COCO_train2014_000000491739.jpg',
  label: 'MS-COCO #491739',
  license: 'Flickr photo, CC BY 2.0',
} as const
