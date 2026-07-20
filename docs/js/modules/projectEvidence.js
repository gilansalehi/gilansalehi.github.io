import { action } from 'data-wrapper';

const evidenceState = {
  capability: {
    selectedId: '',
    previewedId: '',
  },
  skill: {
    selectedId: '',
    previewedId: '',
  },
};

const activeId = kind => evidenceState[kind].previewedId || evidenceState[kind].selectedId;
const hasEvidence = item => item.projects.length > 0;

const stateClass = item => {
  const active = activeId(item.kind);

  if (!active) return '';
  return item.id === active ? 'is-active' : 'is-muted';
};

export const evidenceRows = (items, kind) => items.map(item => {
  const linked = hasEvidence(item);
  const state = stateClass({ ...item, kind });

  return {
    ...item,
    kind,
    buttonLabel: linked
      ? `Highlight projects demonstrating ${item.title}`
      : `${item.title}; no linked portfolio project`,
    disabled: !linked,
    itemClass: `evidence-tone--${item.tone} ${state}${linked ? '' : ' has-no-evidence'}`,
    pipClass: `evidence-pip evidence-pip--${kind} evidence-tone--${item.tone} ${state}`,
    pressed: String(item.id === evidenceState[kind].selectedId),
  };
});

export const projectEvidenceRows = (items, kind, projectId) => evidenceRows(
  items.filter(item => item.projects.includes(projectId)),
  kind,
);

export const projectEvidenceClass = (projectId, groups) => Object.entries(groups)
  .filter(([kind, items]) => {
    const active = activeId(kind);
    return active && items.some(item => item.id === active && item.projects.includes(projectId));
  })
  .map(([kind]) => `is-${kind}-evidence-match`)
  .join(' ');

export const previewEvidence = action(event => {
  const { kind, id, projects } = event.detail.item;
  if (!projects.length) return;

  evidenceState[kind].previewedId = id;
});

export const restoreEvidence = action(event => {
  evidenceState[event.detail.item.kind].previewedId = '';
});

export const toggleEvidence = action(event => {
  const { kind, id, projects } = event.detail.item;
  if (!projects.length) return;

  const state = evidenceState[kind];
  state.selectedId = state.selectedId === id ? '' : id;
  state.previewedId = '';
});
