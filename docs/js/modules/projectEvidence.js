import { action, flush } from 'data-wrapper';

const getProjectKey = entry => {
  const link = entry.querySelector('.portfolio-entry__media[href]');
  if (!link) return '';

  return new URL(link.href, document.baseURI).hostname.replace(/^www\./, '');
};

const createEvidence = (entry, evidenceItems, options, handlers) => {
  const evidence = document.createElement('div');
  const label = document.createElement('span');
  const list = document.createElement('ul');

  evidence.className = `portfolio-entry__evidence portfolio-entry__evidence--${options.kind}`;
  evidence.dataset.generatedEvidence = options.kind;
  label.className = 'portfolio-entry__evidence-label';
  label.textContent = options.label;
  list.setAttribute('aria-label', `${options.label} demonstrated by this project`);

  evidenceItems.forEach(item => {
    const listItem = document.createElement('li');
    const pip = document.createElement('button');
    const code = document.createElement('span');

    pip.type = 'button';
    pip.className = `evidence-pip evidence-pip--${options.kind} evidence-tone--${item.tone}`;
    pip.dataset.evidenceId = item.id;
    pip.setAttribute('aria-label', item.title);
    pip.setAttribute('aria-pressed', 'false');
    pip.title = item.title;
    code.textContent = item.code;
    code.setAttribute('aria-hidden', 'true');

    pip.addEventListener('mouseenter', () => handlers.preview(item.id));
    pip.addEventListener('mouseleave', handlers.restore);
    pip.addEventListener('focus', () => handlers.preview(item.id));
    pip.addEventListener('blur', handlers.restore);
    pip.addEventListener('click', () => handlers.toggle(item.id));

    pip.append(code);
    listItem.append(pip);
    list.append(listItem);
  });

  evidence.append(label, list);
  const tools = entry.querySelector('.portfolio-entry__tools');
  const capabilityEvidence = entry.querySelector('[data-generated-evidence="capability"]');
  const anchor = options.kind === 'skill' && capabilityEvidence ? capabilityEvidence : tools;
  anchor?.after(evidence);

  return evidence;
};

export default function initProjectEvidence(context, evidenceItems, options) {
  const { wrapper, cleanup } = context;
  let selectedId = '';
  let previewedId = '';
  let portfolio;
  let generatedEvidence = [];

  const itemsById = new Map(evidenceItems.map(item => [item.id, item]));
  const activeId = () => previewedId || selectedId;

  const applyProjectState = () => {
    if (!portfolio) return;

    const active = activeId();
    const groupSelector = `[data-generated-evidence="${options.kind}"]`;
    const matchClass = `is-${options.kind}-evidence-match`;

    portfolio.querySelectorAll('.portfolio-entry').forEach(entry => {
      const matchingPip = entry.querySelector(`${groupSelector} [data-evidence-id="${active}"]`);
      entry.classList.toggle(matchClass, Boolean(active && matchingPip));
    });

    portfolio.querySelectorAll(`${groupSelector} [data-evidence-id]`).forEach(pip => {
      const isActive = Boolean(active && pip.dataset.evidenceId === active);
      pip.classList.toggle('is-active', isActive);
      pip.classList.toggle('is-muted', Boolean(active && !isActive));
      pip.setAttribute('aria-pressed', String(pip.dataset.evidenceId === selectedId));
    });
  };

  const preview = id => {
    if (!itemsById.get(id)?.projects.length) return;
    previewedId = id;
    applyProjectState();
  };

  const restore = () => {
    previewedId = '';
    applyProjectState();
  };

  const toggle = id => {
    if (!itemsById.get(id)?.projects.length) return;
    selectedId = selectedId === id ? '' : id;
    previewedId = '';
    applyProjectState();
  };

  queueMicrotask(() => {
    if (!wrapper.isConnected) return;

    portfolio = wrapper.closest('.portfolio');
    if (!portfolio) return;

    generatedEvidence = [...portfolio.querySelectorAll('.portfolio-entry')]
      .map(entry => {
        const projectKey = getProjectKey(entry);
        const matches = evidenceItems.filter(item => item.projects.includes(projectKey));

        return matches.length
          ? createEvidence(entry, matches, options, {
              preview: id => {
                preview(id);
                flush();
              },
              restore: () => {
                restore();
                flush();
              },
              toggle: id => {
                toggle(id);
                flush();
              },
            })
          : null;
      })
      .filter(Boolean);
  });

  cleanup(() => {
    generatedEvidence.forEach(evidence => evidence.remove());
    portfolio?.querySelectorAll('.portfolio-entry').forEach(entry => {
      entry.classList.remove(`is-${options.kind}-evidence-match`);
    });
  });

  return {
    itemView: () => evidenceItems.map(item => {
      const active = activeId();
      const hasEvidence = item.projects.length > 0;
      const stateClass = item.id === active ? 'is-active' : active ? 'is-muted' : '';

      return {
        ...item,
        buttonLabel: hasEvidence
          ? `Highlight projects demonstrating ${item.title}`
          : `${item.title}; no linked portfolio project`,
        disabled: !hasEvidence,
        itemClass: `evidence-tone--${item.tone} ${stateClass}${hasEvidence ? '' : ' has-no-evidence'}`,
        pressed: String(item.id === selectedId),
      };
    }),
    previewEvidence: action(event => preview(event.detail.item.id)),
    restoreEvidence: action(restore),
    toggleEvidence: action(event => toggle(event.detail.item.id)),
  };
}
