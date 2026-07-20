import { action } from 'data-wrapper';
import initPage from 'site/views/page.js';

const PANELS = Object.freeze({
  capabilities: {
    title: 'Capabilities',
    tabId: 'capabilities-tab',
  },
  skills: {
    title: 'Skills',
    tabId: 'skills-tab',
  },
});

export default context => {
  let activePanel = 'capabilities';

  initPage(context);

  const selectPanel = panel => {
    activePanel = panel;
  };

  return {
    activeTitle: () => PANELS[activePanel].title,
    capabilitiesSelected: () => String(activePanel === 'capabilities'),
    capabilitiesTabIndex: () => activePanel === 'capabilities' ? 0 : -1,
    capabilitiesTabClass: () => activePanel === 'capabilities' ? 'is-active' : '',
    capabilitiesHidden: () => activePanel !== 'capabilities',
    skillsSelected: () => String(activePanel === 'skills'),
    skillsTabIndex: () => activePanel === 'skills' ? 0 : -1,
    skillsTabClass: () => activePanel === 'skills' ? 'is-active' : '',
    skillsHidden: () => activePanel !== 'skills',
    showCapabilities: action(() => selectPanel('capabilities')),
    showSkills: action(() => selectPanel('skills')),
    navigateTabs: action(event => {
      const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
      if (!keys.includes(event.key)) return;

      event.preventDefault();
      const showSkills = event.key === 'ArrowRight' || event.key === 'End';
      const nextPanel = showSkills ? 'skills' : 'capabilities';

      selectPanel(nextPanel);
      event.target.closest('[role="tablist"]')
        ?.querySelector(`#${PANELS[nextPanel].tabId}`)
        ?.focus();
    }),
  };
};
