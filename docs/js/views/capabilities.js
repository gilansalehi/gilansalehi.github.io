import initProjectEvidence from 'site/modules/projectEvidence.js';
import initPage from 'site/views/page.js';

const CAPABILITIES = Object.freeze([
  {
    id: 'architecture',
    code: 'ARC',
    tone: 1,
    title: 'Front-end architecture',
    description: 'Modular, maintainable systems shaped around browser standards and clear ownership boundaries.',
    projects: ['data-wrapper.org', 'getparker.com', 'app.agora.finance', 'joann.com', 'persado.com'],
  },
  {
    id: 'frameworks',
    code: 'UX',
    tone: 2,
    title: 'Framework & component design',
    description: 'Small APIs, reusable components, reactive primitives, and conventions that make other developers effective.',
    projects: ['data-wrapper.org', 'getparker.com', 'persado.com'],
  },
  {
    id: 'interfaces',
    code: 'UI',
    tone: 3,
    title: 'Interface engineering',
    description: 'Responsive, accessible, themeable interfaces that carry design intent cleanly into production.',
    projects: [
      'data-wrapper.org',
      'getparker.com',
      'app.agora.finance',
      'joann.com',
      'reformation.com',
      'converse.com',
      'borngroup.com',
      'persado.com',
    ],
  },
  {
    id: 'modernization',
    code: 'OPT',
    tone: 4,
    title: 'Modernization & performance',
    description: 'Simpler legacy systems, leaner dependencies, safer build processes, and faster runtime behavior.',
    projects: ['data-wrapper.org', 'joann.com', 'converse.com'],
  },
  {
    id: 'leadership',
    code: 'LDR',
    tone: 5,
    title: 'Technical leadership',
    description: 'Mentorship, standards, documentation, and coordination across product, design, and engineering.',
    projects: ['app.agora.finance', 'joann.com', 'converse.com'],
  },
  {
    id: 'delivery',
    code: 'CICD',
    tone: 6,
    title: 'Complex delivery',
    description: 'Large commerce platforms, third-party integrations, replatforming programs, and production launches.',
    projects: [
      'app.agora.finance',
      'getparker.com',
      'joann.com',
      'reformation.com',
      'converse.com',
      'borngroup.com',
      'persado.com',
    ],
  },
]);

export default context => {
  initPage(context);

  return initProjectEvidence(context, CAPABILITIES, {
    kind: 'capability',
    label: 'Capabilities',
  });
};
