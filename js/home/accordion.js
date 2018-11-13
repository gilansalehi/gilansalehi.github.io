import Component from '../util/component.js';

export default class Accordion extends Component {
  constructor(options = {}) {
    super(options);

    this.bindEventListeners.bind(this)();
    this.$container.setAttribute('tabindex', '0');
  }

  bindEventListeners() {
    this.on('keyup', '.accordion', evt => {
      if ( evt.key === 'Enter' ) {
        evt.delegateTarget.classList.toggle('open');
      }
    })

    this.on('click', '.accordion > li:first-child', evt => {
      evt.currentTarget.classList.toggle('open');
    });
  }
}