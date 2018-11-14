import { q, createStore, template } from './util/reduxLite.js';
import { rootReducer } from './reducers/root.js';
import Nav from './components/nav.js';
import Accordion from './components/accordion.js';
import Flipper from './templates/flipper.js';

window.q = q;

window.addEventListener('load', function (e) {
  window.app = createStore(rootReducer);
  app.registerTemplates({
   FLIPPER: Flipper,
  });
  app.registerComponents({});

  // dumb components don't care about redux state:
  app.on('click', '.accordion', evt => {
    evt.target.matches('.accordion__title, .accordion__arrow') && evt.delegateTarget.classList.toggle('open')
  });
  app.on('keyup', '.accordion', evt => {
    evt.key === 'Enter' && evt.delegateTarget.classList.toggle('open')
  });
  // accessibility:
  q('.accordion__title').map(el => el.setAttribute('tabindex', '0'));

  const nav = new Nav({
    $container: q('.nav')[0],
  });

  console.log('loaded');
  q('.profile')[0].scrollIntoView({
    behavior: 'smooth',
    block: 'end',
    inline: 'start',
  });

  app.update();
});