import initScrollAnimations, { disconnectScrollAnimations } from '../modules/scrollAnimations.js';

export default function initPage({ wrapper, cleanup }) {
  const scrollToTarget = () => {
    requestAnimationFrame(() => {
      wrapper.querySelector('.scrolltarget')?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'start',
      });
    });
  };

  queueMicrotask(() => {
    if (!wrapper.isConnected) return;

    initScrollAnimations(wrapper);
  });

  if (document.readyState === 'complete') {
    scrollToTarget();
  } else {
    window.addEventListener('load', scrollToTarget, { once: true });
  }

  cleanup(() => {
    window.removeEventListener('load', scrollToTarget);
    disconnectScrollAnimations(wrapper);
  });
}
