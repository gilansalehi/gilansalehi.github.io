import initScrollAnimations, { disconnectScrollAnimations } from '../modules/scrollAnimations.js';

export default function initPage({ wrapper, cleanup }) {
  const scrollToTarget = () => {
    const reduceMotion = document.documentElement.hasAttribute('data-reduce-motion')
      || window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    requestAnimationFrame(() => {
      wrapper.querySelector('.scrolltarget')?.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
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
