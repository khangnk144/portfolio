import {
  PanelsTopLeft,
  Code2,
  Database,
  GitBranch,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  Search,
  ScanLine,
  Sparkles,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type Project = {
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  tags: string[];
  href: string;
  accent: 'rose' | 'sage';
  icon: LucideIcon;
  visual: 'skinmate' | 'momentum';
};

export type SkillGroup = {
  title: string;
  icon: LucideIcon;
  skills: string[];
};

export const profile = {
  name: 'Khang Nguyen',
  headline: 'Computer Science Student - Full-Stack Developer',
  school: 'University of Information Technology, VNU-HCM, Vietnam',
  github: 'https://github.com/khangnk144',
  roles: ['Computer Science Student', 'Research Intern', 'Curious Builder'],
  intro:
    'I am a second-year Computer Science student who enjoys turning thoughtful product ideas and research questions into clear, testable flows.',
};

export const projectProcess =
  'Both projects were built with an AI-assisted, vibe-coding workflow. I am still growing my fluency in specific languages and frameworks, but I understand product flow, can inspect behavior carefully, and use that understanding to test, debug, and validate whether an implementation works.';

export const researchRole = {
  title: 'Research Intern at CORE Lab UIT',
  href: 'http://core.uit.edu.vn/',
  label: 'Computer Vision & Retrieval',
  text:
    'At CORE Lab, I read papers, look for research gaps, shape new problem ideas, and explore possible solution directions. I do not have publications yet.',
  icon: Search,
};

export const navigation = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export const aboutCards = [
  {
    title: 'Learning through systems',
    text: 'I build from flows first: what users need, what should happen, how to test it, and where the implementation needs more careful checking.',
    icon: GraduationCap,
  },
  {
    title: 'Research curiosity',
    text: 'I enjoy reading papers, comparing approaches, finding gaps, and turning open-ended questions into possible problem directions.',
    icon: Lightbulb,
  },
  {
    title: 'Careful validation',
    text: 'Even when I use AI-assisted coding, I focus on understanding the flow well enough to review, test, and improve the result.',
    icon: HeartHandshake,
  },
];

export const projects: Project[] = [
  {
    title: 'SKINMATE',
    subtitle: 'Full-stack skincare ingredient checker',
    description:
      'An AI-assisted full-stack project for skincare beginners that analyzes cosmetic ingredient lists by skin type, supports OCR scanning, falls back to Gemini for unknown ingredients, and recommends safer products.',
    highlights: [
      'Ingredient analysis by skin type',
      'OCR label scanning and history',
      'Admin review for AI suggestions and community reports',
    ],
    tags: ['Next.js', 'TypeScript', 'Express', 'Prisma', 'Gemini AI'],
    href: 'https://github.com/khangnk144/SKINMATE',
    accent: 'rose',
    icon: ScanLine,
    visual: 'skinmate',
  },
  {
    title: 'MOMENTUM / Aether',
    subtitle: 'Calm productivity Chrome Extension',
    description:
      'An AI-assisted local-first new-tab dashboard with a soft clock, focus input, useful widgets, and a glassmorphism interface designed to make daily planning feel lighter.',
    highlights: [
      'Chrome Extension new-tab experience',
      'Focus-first dashboard widgets',
      'Local-first state and polished visual interactions',
    ],
    tags: ['React', 'TypeScript', 'Chrome Extension', 'Zustand', 'Tailwind CSS'],
    href: 'https://github.com/khangnk144/MOMENTUM',
    accent: 'sage',
    icon: PanelsTopLeft,
    visual: 'momentum',
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend',
    icon: Sparkles,
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Responsive UI'],
  },
  {
    title: 'Backend',
    icon: Database,
    skills: ['Node.js', 'Express', 'Prisma', 'PostgreSQL', 'REST APIs'],
  },
  {
    title: 'Programming & Workflow',
    icon: Code2,
    skills: ['C++', 'Basic Python', 'Git', 'AI-assisted Coding', 'Testing Flows'],
  },
];

export const socialLinks = [
  {
    label: 'GitHub',
    href: profile.github,
    icon: GitBranch,
  },
];
