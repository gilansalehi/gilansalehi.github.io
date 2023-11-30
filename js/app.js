import { q, load, setupModules } from './util/utils.js';

import initNav from './components/simpleNav.js';
import initPrefs from './components/simplePrefs.js';
import initPages from './components/pageIndex.js';

import initScrollAnimations from './modules/scrollAnimations.js';
import initScrollActions from './modules/scrollActions.js';
import initCarousels from './modules/carousel.js';

window.q = q;

// export const MODULES = [
//   scrollActions,
//   scrollAnimations,
//   carousels,
// ];

window.addEventListener('load', function (e) {
  // components: init once
  const pageIndex = initPages();
  const nav = initNav();
  const preferences = initPrefs();

  // modules: reusable functionality
  const observedEls = initScrollAnimations();
  const scrollActors = initScrollActions();
  const carousels = initCarousels();

  q('.slide--1')[0].scrollIntoView({
    behavior: 'smooth',
    block: 'end',
    inline: 'start',
  });
});

