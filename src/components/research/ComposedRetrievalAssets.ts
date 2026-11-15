/**
 * Real composed-retrieval triplets from CIRCO (validation split; Baldrati et al., ICCV 2023),
 * whose images come from MS-COCO 2017 unlabeled (Flickr). Reference, modification text and the
 * ground-truth target are the dataset's own; distractors are other CIRCO/COCO images that are
 * not annotated as valid targets for the triplet. Files live in public/research/composed/.
 */

export type ImageCredit = { license: string; flickr: string }

export type Tile = { id: number; thumb: string }

export type Triplet = {
  id: number
  concept: string
  /** Relative caption exactly as released in CIRCO. */
  text: string
  reference: { src: string; width: number; height: number; alt: string }
  target: { src: string; width: number; height: number; alt: string }
  /** Gallery tiles in display order; contains the ground-truth target exactly once. */
  gallery: Tile[]
  targetId: number
  referenceId: number
}

export const TRIPLETS: Triplet[] = [
  {
    id: 13,
    concept: 'a teddy bear',
    text: 'is held by a little girl on a chair',
    referenceId: 85932,
    reference: { src: '/research/composed/main-85932.webp', width: 360, height: 480, alt: 'A plush teddy bear with a red bandana sitting on a bed' },
    target: { src: '/research/composed/main-9761.webp', width: 320, height: 480, alt: 'A little girl sitting on a wooden chair holding a teddy bear' },
    targetId: 9761,
    gallery: [{ id: 2010, thumb: '/research/composed/thumb-2010.webp' }, { id: 549717, thumb: '/research/composed/thumb-549717.webp' }, { id: 470858, thumb: '/research/composed/thumb-470858.webp' }, { id: 9761, thumb: '/research/composed/thumb-9761.webp' }, { id: 41208, thumb: '/research/composed/thumb-41208.webp' }, { id: 528417, thumb: '/research/composed/thumb-528417.webp' }, { id: 534704, thumb: '/research/composed/thumb-534704.webp' }],
  },
  {
    id: 185,
    concept: 'a filled glass next to a vase with flowers in it',
    text: 'is shot in greyscale',
    referenceId: 377035,
    reference: { src: '/research/composed/main-377035.webp', width: 480, height: 480, alt: 'A glass of amber drink beside a vase of flowers, in colour' },
    target: { src: '/research/composed/main-510520.webp', width: 480, height: 360, alt: 'A greyscale photo of a wine glass beside a glass vase of flowers' },
    targetId: 510520,
    gallery: [{ id: 510520, thumb: '/research/composed/thumb-510520.webp' }, { id: 144699, thumb: '/research/composed/thumb-144699.webp' }, { id: 317955, thumb: '/research/composed/thumb-317955.webp' }, { id: 150061, thumb: '/research/composed/thumb-150061.webp' }, { id: 564833, thumb: '/research/composed/thumb-564833.webp' }, { id: 233422, thumb: '/research/composed/thumb-233422.webp' }, { id: 478357, thumb: '/research/composed/thumb-478357.webp' }],
  },
  {
    id: 108,
    concept: 'multiple cows',
    text: 'are four and there is a blue sky in the background',
    referenceId: 160210,
    reference: { src: '/research/composed/main-160210.webp', width: 480, height: 360, alt: 'Cows grazing and lying on a green field' },
    target: { src: '/research/composed/main-190835.webp', width: 480, height: 301, alt: 'Four cows standing on a hilltop against a blue sky' },
    targetId: 190835,
    gallery: [{ id: 438725, thumb: '/research/composed/thumb-438725.webp' }, { id: 261215, thumb: '/research/composed/thumb-261215.webp' }, { id: 489127, thumb: '/research/composed/thumb-489127.webp' }, { id: 351962, thumb: '/research/composed/thumb-351962.webp' }, { id: 266525, thumb: '/research/composed/thumb-266525.webp' }, { id: 190835, thumb: '/research/composed/thumb-190835.webp' }, { id: 418004, thumb: '/research/composed/thumb-418004.webp' }],
  },
  {
    id: 41,
    concept: 'a flying biplane',
    text: 'is shot in color',
    referenceId: 345478,
    reference: { src: '/research/composed/main-345478.webp', width: 480, height: 389, alt: 'A sepia photo of a biplane flying over farmland' },
    target: { src: '/research/composed/main-492505.webp', width: 480, height: 365, alt: 'A colour photo of a biplane flying over snowy mountains' },
    targetId: 492505,
    gallery: [{ id: 494347, thumb: '/research/composed/thumb-494347.webp' }, { id: 117648, thumb: '/research/composed/thumb-117648.webp' }, { id: 492505, thumb: '/research/composed/thumb-492505.webp' }, { id: 291277, thumb: '/research/composed/thumb-291277.webp' }, { id: 252633, thumb: '/research/composed/thumb-252633.webp' }, { id: 418004, thumb: '/research/composed/thumb-418004.webp' }, { id: 266525, thumb: '/research/composed/thumb-266525.webp' }],
  },
]

/** Per-image source (original Flickr page host path as listed by COCO) and license. */
export const CREDITS: Record<number, ImageCredit> = {
  2010: { license: 'CC BY-NC 2.0', flickr: 'http://farm6.staticflickr.com/5175/5485134839_481c1f5d37_z.jpg' },
  9761: { license: 'CC BY 2.0', flickr: 'http://farm5.staticflickr.com/4038/4372150522_0e18ba2946_z.jpg' },
  41208: { license: 'CC BY-NC 2.0', flickr: 'http://farm4.staticflickr.com/3389/3453752551_3bbddabc7e_z.jpg' },
  85932: { license: 'CC BY 2.0', flickr: 'http://farm1.staticflickr.com/38/82524962_c504c929e7_z.jpg' },
  117648: { license: 'No known copyright restrictions', flickr: 'http://farm9.staticflickr.com/8469/8091671795_74b7a2c502_z.jpg' },
  144699: { license: 'CC BY 2.0', flickr: 'http://farm9.staticflickr.com/8005/7107780311_c83c1c59a8_z.jpg' },
  150061: { license: 'CC BY-SA 2.0', flickr: 'http://farm1.staticflickr.com/3/2739318_ad4329445f_z.jpg' },
  160210: { license: 'CC BY 2.0', flickr: 'http://farm7.staticflickr.com/6020/5973740371_541713ae68_z.jpg' },
  190835: { license: 'CC BY 2.0', flickr: 'http://farm7.staticflickr.com/6218/6320401340_eb5f0cf6e9_z.jpg' },
  233422: { license: 'CC BY-SA 2.0', flickr: 'http://farm1.staticflickr.com/11/14150001_91f01e133a_z.jpg' },
  252633: { license: 'CC BY 2.0', flickr: 'http://farm4.staticflickr.com/3411/3544955638_68300f633c_z.jpg' },
  261215: { license: 'CC BY 2.0', flickr: 'http://farm9.staticflickr.com/8328/8355109967_01930f5184_z.jpg' },
  266525: { license: 'CC BY 2.0', flickr: 'http://farm9.staticflickr.com/8448/7958494378_accdf740b2_z.jpg' },
  291277: { license: 'CC BY 2.0', flickr: 'http://farm3.staticflickr.com/2373/2265533546_355f6bcae5_z.jpg' },
  317955: { license: 'CC BY 2.0', flickr: 'http://farm1.staticflickr.com/46/177348439_8de35e4762_z.jpg' },
  345478: { license: 'No known copyright restrictions', flickr: 'http://farm8.staticflickr.com/7104/7212151450_1c92b59ba8_z.jpg' },
  351962: { license: 'CC BY 2.0', flickr: 'http://farm5.staticflickr.com/4128/4984296525_ca841b2d4a_z.jpg' },
  377035: { license: 'CC BY 2.0', flickr: 'http://farm9.staticflickr.com/8123/8625962305_00bb6d5fa1_z.jpg' },
  418004: { license: 'CC BY 2.0', flickr: 'http://farm4.staticflickr.com/3557/3505615975_f24f0380c0_z.jpg' },
  438725: { license: 'CC BY-NC 2.0', flickr: 'http://farm5.staticflickr.com/4074/5452635968_a2d8daf1cf_z.jpg' },
  470858: { license: 'CC BY 2.0', flickr: 'http://farm1.staticflickr.com/28/53269153_4fe7103ae4_z.jpg' },
  478357: { license: 'CC BY 2.0', flickr: 'http://farm5.staticflickr.com/4056/4334027563_c015e280b2_z.jpg' },
  489127: { license: 'CC BY-NC 2.0', flickr: 'http://farm9.staticflickr.com/8333/8367500063_af3f60c433_z.jpg' },
  492505: { license: 'CC BY 2.0', flickr: 'http://farm7.staticflickr.com/6002/5984588725_d6b7b2bb68_z.jpg' },
  494347: { license: 'CC BY 2.0', flickr: 'http://farm8.staticflickr.com/7138/7071432319_ab8cd19d63_z.jpg' },
  510520: { license: 'CC BY-SA 2.0', flickr: 'http://farm1.staticflickr.com/117/258927389_9c12de878a_z.jpg' },
  528417: { license: 'CC BY-SA 2.0', flickr: 'http://farm3.staticflickr.com/2435/3792426328_ea206cc378_z.jpg' },
  534704: { license: 'CC BY 2.0', flickr: 'http://farm3.staticflickr.com/2123/5816960851_43295e6a51_z.jpg' },
  549717: { license: 'CC BY-NC 2.0', flickr: 'http://farm8.staticflickr.com/7283/8741729623_f885b05bdb_z.jpg' },
  564833: { license: 'CC BY 2.0', flickr: 'http://farm6.staticflickr.com/5146/5863174447_8da2073b33_z.jpg' },
}

export const SOURCE_NOTE =
  "Triplets: CIRCO (MS-COCO images, Flickr licenses). Retrieval result shown is the dataset's ground truth, not a model's output."
