import { q } from './util/utils.js';
import Nav from './home/nav.js';
import Accordion from './home/accordion.js';

window.q = q;

window.addEventListener('load', function (e) {
  console.log('loaded');
  q('.profile')[0].scrollIntoView({
    behavior: 'smooth',
    block: 'end',
    inline: 'start',
  });

  const nav = new Nav({
    $container: q('.nav')[0],
  });

  const accordions = q('.accordion').map($container => {
    return new Accordion({ $container });
  });
});