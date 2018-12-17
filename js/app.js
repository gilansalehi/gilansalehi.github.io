import { q, createStore, template } from './util/reduxLite.js';
import { rootReducer } from './reducers/root.js';
import Nav from './components/nav.js';
import Accordion from './components/accordion.js';

window.q = q;

window.addEventListener('load', function (e) {
  var provider = window.app = createStore(rootReducer);
  // accessibility:
  q('.accordion__title').map(el => el.setAttribute('tabindex', '0'));

  // if nav cared about app state we'd subscribe to the store here too, but it doesn't.
  const nav = new Nav({ $container: q('.nav')[0] });
  const accordions = q('.accordion').map($container => new Accordion({ $container }));

  q('.profile')[0].scrollIntoView({
    behavior: 'smooth',
    block: 'end',
    inline: 'start',
  });

  app.update(app.state);
});