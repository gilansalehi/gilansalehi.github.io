import { q } from './util/utils.js';
import Nav from './home/nav.js';

window.q = q;

window.addEventListener('load', function (e) {
  console.log('loaded');
  q('.profile')[0].scrollIntoView({
    behavior: 'smooth',
    block: 'end',
    inline: 'start',
  });

  const nav = new Nav();
});