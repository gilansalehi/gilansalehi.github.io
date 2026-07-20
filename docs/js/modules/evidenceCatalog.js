import { technologyName } from './technologyCatalog.js';

export const CAPABILITIES = [
  {
    id: 'architecture',
    code: 'ARC',
    tone: 1,
    title: 'Front-end architecture',
    description: 'Modular, maintainable systems shaped around browser standards and clear ownership boundaries.',
    projects: 'data-wrapper lorem-appsum parker agora joann'.split(' '),
  },
  {
    id: 'frameworks',
    code: 'UX',
    tone: 2,
    title: 'Framework & component design',
    description: 'Small APIs, reusable components, reactive primitives, and conventions that make other developers effective.',
    projects: 'data-wrapper lorem-appsum parker agora joann persado'.split(' '),
  },
  {
    id: 'interfaces',
    code: 'UI',
    tone: 3,
    title: 'Interface engineering',
    description: 'Responsive, accessible, themeable interfaces that carry design intent cleanly into production.',
    projects: 'data-wrapper lorem-appsum parker agora joann reformation converse born-group persado'.split(' '),
  },
  {
    id: 'modernization',
    code: 'OPT',
    tone: 4,
    title: 'Modernization & performance',
    description: 'Simpler legacy systems, leaner dependencies, safer build processes, and faster runtime behavior.',
    projects: 'data-wrapper parker joann converse'.split(' '),
  },
  {
    id: 'leadership',
    code: 'LDR',
    tone: 5,
    title: 'Technical leadership',
    description: 'Mentorship, standards, documentation, and coordination across product, design, and engineering.',
    projects: 'parker agora joann born-group'.split(' '),
  },
  {
    id: 'delivery',
    code: 'CICD',
    tone: 6,
    title: 'Complex delivery',
    description: 'Large commerce platforms, third-party integrations, replatforming programs, and production launches.',
    projects: 'data-wrapper parker agora joann reformation converse born-group persado'.split(' '),
  },
];

const ALL_PROJECTS = 'data-wrapper lorem-appsum parker agora joann reformation converse born-group persado'.split(' ');

export const SKILL_PROJECTS = {
  GIT: ALL_PROJECTS,
  CSS: ALL_PROJECTS,
  ES6: ALL_PROJECTS,
  HTML: ALL_PROJECTS,
  GH: 'data-wrapper'.split(' '),
  JQ: 'joann reformation'.split(' '),
  JS: ALL_PROJECTS,
  NOD: [],
  PG: 'persado'.split(' '),
  RLS: 'persado'.split(' '),
  RB: 'persado'.split(' '),
  RCT: 'parker persado'.split(' '),
  HKS: 'parker'.split(' '),
  NXT: 'parker'.split(' '),
  RDX: 'persado'.split(' '),
  NPM: 'joann reformation converse persado'.split(' '),
  WPK: 'joann reformation converse persado'.split(' '),
  TS: 'data-wrapper lorem-appsum parker agora'.split(' '),
  PRE: 'lorem-appsum agora'.split(' '),
  SIG: 'lorem-appsum agora'.split(' '),
  BUN: 'lorem-appsum agora'.split(' '),
  WC: 'data-wrapper'.split(' '),
  ESM: 'data-wrapper agora'.split(' '),
  SCS: 'joann reformation converse'.split(' '),
  TWD: 'lorem-appsum parker agora'.split(' '),
  ZSH: [],
  BASH: [],
  GQL: 'parker'.split(' '),
};

export const SKILLS = Object.entries(SKILL_PROJECTS).map(([code, projects], index) => ({
  id: code.toLowerCase(),
  code,
  title: technologyName(code),
  projects,
  tone: index % 6 + 1,
}));
