import initCarousels from '../modules/carousel.js';
import initScrollAnimations, { disconnectScrollAnimations } from '../modules/scrollAnimations.js';

export default function initPage({ wrapper, cleanup }) {
  queueMicrotask(() => {
    if (!wrapper.isConnected) return;

    initScrollAnimations(wrapper);
    initCarousels(wrapper);

    wrapper.querySelector('.slide--1')?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'start',
    });
  });

  cleanup(() => disconnectScrollAnimations(wrapper));
}
