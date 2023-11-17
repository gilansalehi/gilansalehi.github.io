import { q } from './util/reduxLite.js';
import { load } from './util/utils.js';
import initNav from './components/simpleNav.js';
import initPrefs from './components/simplePrefs.js';
import initFlippers from './components/flipper.js';
// import initGame from './game/game.js';
import initPages from './components/pageIndex.js';
import initScrollAnimations from './components/scrollAnimations.js';

window.q = q;

window.addEventListener('load', function (e) {
  const nav = initNav();
  const preferences = initPrefs();
  const flippers = initFlippers();
  const pageIndex = initPages();
  const observedEls = initScrollAnimations();

  q('.slide--1')[0].scrollIntoView({
    behavior: 'smooth',
    block: 'end',
    inline: 'start',
  });

});