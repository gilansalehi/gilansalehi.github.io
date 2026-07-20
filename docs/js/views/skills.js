import initProjectEvidence from 'site/modules/projectEvidence.js';
import initPage from 'site/views/page.js';

const ALL_PROJECTS = [
  'data-wrapper.org',
  'getparker.com',
  'app.agora.finance',
  'joann.com',
  'reformation.com',
  'converse.com',
  'borngroup.com',
  'persado.com',
];

const SKILLS = Object.freeze([
  { id: 'git', code: 'GIT', title: 'Git', projects: ALL_PROJECTS },
  { id: 'css', code: 'CSS', title: 'CSS', projects: ALL_PROJECTS },
  { id: 'es6', code: 'ES6', title: 'ES6+', projects: ALL_PROJECTS },
  { id: 'html', code: 'HTML', title: 'HTML', projects: ALL_PROJECTS },
  { id: 'github', code: 'GH', title: 'GitHub', projects: ['data-wrapper.org'] },
  { id: 'jquery', code: 'JQ', title: 'jQuery', projects: ['joann.com', 'reformation.com'] },
  { id: 'javascript', code: 'JS', title: 'JavaScript', projects: ALL_PROJECTS },
  { id: 'node', code: 'NOD', title: 'Node.js', projects: [] },
  { id: 'postgresql', code: 'PG', title: 'PostgreSQL', projects: ['persado.com'] },
  { id: 'rails', code: 'RLS', title: 'Rails', projects: ['persado.com'] },
  { id: 'ruby', code: 'RB', title: 'Ruby', projects: ['persado.com'] },
  { id: 'react', code: 'RCT', title: 'React', projects: ['getparker.com', 'persado.com'] },
  { id: 'react-hooks', code: 'HKS', title: 'React Hooks', projects: ['getparker.com'] },
  { id: 'nextjs', code: 'NXT', title: 'Next.js', projects: ['getparker.com'] },
  { id: 'redux', code: 'RDX', title: 'Redux', projects: ['persado.com'] },
  { id: 'npm', code: 'NPM', title: 'npm', projects: ['joann.com', 'reformation.com', 'converse.com', 'persado.com'] },
  { id: 'webpack', code: 'WPK', title: 'Webpack', projects: ['joann.com', 'reformation.com', 'converse.com', 'persado.com'] },
  { id: 'typescript', code: 'TS', title: 'TypeScript', projects: ['data-wrapper.org', 'getparker.com', 'app.agora.finance'] },
  { id: 'preact', code: 'PRE', title: 'Preact', projects: ['app.agora.finance'] },
  { id: 'signals', code: 'SIG', title: 'Signals', projects: ['app.agora.finance'] },
  { id: 'bun', code: 'BUN', title: 'Bun', projects: ['app.agora.finance'] },
  { id: 'web-components', code: 'WC', title: 'Web Components', projects: ['data-wrapper.org'] },
  { id: 'es-modules', code: 'ESM', title: 'ES Modules', projects: ['data-wrapper.org', 'app.agora.finance'] },
  { id: 'scss', code: 'SCS', title: 'SCSS', projects: ['joann.com', 'reformation.com', 'converse.com'] },
  { id: 'tailwind', code: 'TWD', title: 'Tailwind CSS', projects: ['getparker.com', 'app.agora.finance'] },
  { id: 'zsh', code: 'ZSH', title: 'zsh', projects: [] },
  { id: 'bash', code: 'BASH', title: 'Bash', projects: [] },
  { id: 'graphql', code: 'GQL', title: 'GraphQL', projects: [] },
].map((skill, index) => ({
  ...skill,
  tone: index % 6 + 1,
})));

export default context => {
  initPage(context);

  return initProjectEvidence(context, SKILLS, {
    kind: 'skill',
    label: 'Skills',
  });
};
