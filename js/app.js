import { q } from './util/reduxLite.js';
import initNav from './components/simpleNav.js';
import initPrefs from './components/simplePrefs.js';

// window.q = q;

window.addEventListener('load', function (e) {
  const nav = initNav();
  const preferences = initPrefs();

  q('.profile')[0].scrollIntoView({
    behavior: 'smooth',
    block: 'end',
    inline: 'start',
  });
});
