import { Crosshair, Gauge, Layers, MessagesSquare } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type ResearchDirectionId = 'interactive' | 'composed' | 'spatial' | 'efficient';

export type Reading = { label: string; venue: string; href: string };

export type ResearchDirection = {
  id: ResearchDirectionId;
  title: string;
  shortName: string;
  status: 'Current focus' | 'Recently exploring';
  question: string;
  summary: string;
  keywords: string[];
  readings: Reading[];
  icon: LucideIcon;
};

// Copy and readings were checked against the cited papers' abstracts (arXiv pages).
export const researchDirections: ResearchDirection[] = [
  {
    id: 'interactive',
    title: 'Interactive Image/Video Retrieval',
    shortName: 'interactive retrieval',
    status: 'Current focus',
    question: 'What if your description is too vague to find it?',
    summary:
      'When a text query is underspecified, the system asks follow-up questions and re-ranks the candidate images or videos after each answer, so the target climbs toward the top within a few turns.',
    keywords: ['Multi-turn dialog', 'Clarifying questions', 'Re-ranking', 'Vision-language models'],
    readings: [
      { label: 'ChatIR: Chat-based Image Retrieval', venue: 'NeurIPS 2023', href: 'https://arxiv.org/abs/2305.20062' },
      { label: 'PlugIR: Interactive T2I Retrieval with LLMs', venue: 'ACL 2024', href: 'https://arxiv.org/abs/2406.03411' },
      { label: 'Interactive Video Retrieval with Q&A', venue: 'ICCV 2023', href: 'https://arxiv.org/abs/2308.10402' },
    ],
    icon: MessagesSquare,
  },
  {
    id: 'composed',
    title: 'Composed Image/Video Retrieval',
    shortName: 'composed retrieval',
    status: 'Current focus',
    question: 'Search with an example, plus a change?',
    summary:
      'A query pairs a reference image or video with a text edit, such as "the same, but at sunset". The system ranks a gallery for a target that keeps the reference content and applies the edit.',
    keywords: ['Reference + text edit', 'Zero-shot / training-free', 'Re-ranking a shortlist', 'Video retrieval'],
    readings: [
      { label: 'CIRR: Composed Retrieval on Real-life Images', venue: 'ICCV 2021', href: 'https://arxiv.org/abs/2108.04024' },
      { label: 'CIReVL: Training-free Compositional Retrieval', venue: 'ICLR 2024', href: 'https://arxiv.org/abs/2310.09291' },
      { label: 'CoVR: Composed Video Retrieval', venue: 'AAAI 2024', href: 'https://arxiv.org/abs/2308.14746' },
    ],
    icon: Layers,
  },
  {
    id: 'spatial',
    title: 'Object-Centric Spatial Grounding & Reasoning',
    shortName: 'spatial grounding',
    status: 'Recently exploring',
    question: 'Which one is "the second horse from the right"?',
    summary:
      'Given an image and a phrase, find the object it refers to by reasoning over the objects and their spatial relations. Vision-language models still often struggle with left/right and relative position.',
    keywords: ['Visual grounding', 'Referring expressions', 'Spatial relations', 'Object-centric representations'],
    readings: [
      { label: 'What’s "up" with vision-language models?', venue: 'EMNLP 2023', href: 'https://arxiv.org/abs/2310.19785' },
      { label: 'Visual Spatial Reasoning', venue: 'TACL 2023', href: 'https://arxiv.org/abs/2205.00363' },
      { label: 'Object-Centric Learning with Slot Attention', venue: 'NeurIPS 2020', href: 'https://arxiv.org/abs/2006.15055' },
    ],
    icon: Crosshair,
  },
  {
    id: 'efficient',
    title: 'Efficient Image/Video Understanding',
    shortName: 'efficient video understanding',
    status: 'Recently exploring',
    question: 'Do models really need every frame and every patch?',
    summary:
      'Images and videos carry many redundant visual tokens. Token pruning, token merging, and keyframe selection aim to keep most of the accuracy at a fraction of the compute.',
    keywords: ['Token pruning', 'Token merging', 'Keyframe selection', 'Long-video understanding'],
    readings: [
      { label: 'ToMe: Token Merging, Your ViT but Faster', venue: 'ICLR 2023', href: 'https://arxiv.org/abs/2210.09461' },
      { label: 'FastV: An Image is Worth 1/2 Tokens', venue: 'ECCV 2024', href: 'https://arxiv.org/abs/2403.06764' },
      { label: 'Adaptive Keyframe Sampling for Long Video', venue: 'CVPR 2025', href: 'https://arxiv.org/abs/2502.21271' },
    ],
    icon: Gauge,
  },
];
