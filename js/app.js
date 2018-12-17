import { q, createStore, template } from './util/reduxLite.js';
import { rootReducer } from './reducers/root.js';
import Nav from './components/nav.js';
import Accordion from './components/accordion.js';
import Flipper from './templates/flipper.js';
import List from './templates/list.js';
import TextSetter from './templates/text.js';
import { html, render } from 'https://unpkg.com/lit-html@0.9.0/lit-html.js';

window.q = q;

window.addEventListener('load', function (e) {
  window.app = createStore(rootReducer);
  // accessibility:
  q('.accordion__title').map(el => el.setAttribute('tabindex', '0'));

  // if nav cared about app state we'd subscribe to the store here too, but it doesn't.
  const nav = new Nav({ $container: q('.nav')[0] });
  const accordions = q('.accordion').map($container => new Accordion({ $container }));

  console.log('loaded');
  q('.profile')[0].scrollIntoView({
    behavior: 'smooth',
    block: 'end',
    inline: 'start',
  });

  app.update(app.state);
});