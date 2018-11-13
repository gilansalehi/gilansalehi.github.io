import { q } from '../util/utils.js';
import Component from '../util/component.js';

export default class Nav extends Component {
  constructor(options = {}) {
    super(options);
    this.$container = q('header')[0];
    this.$el = q('.nav__icon')[0];
    this.$menu = q('.nav__menu')[0];
    this._state = {
      vPos: 'top',
      hPos: 'left',
      open: false,
    };

    this.bindEventListeners.bind(this)()
  }

  bindEventListeners() {
    const self = this;
    const {
      $container,
      $el,
      $menu,
    } = this;

    this.on('click', '.nav__icon', evt => {
      $container.classList.toggle('open');
    });

    q('[g-click]').map(el => el.addEventListener('click', evt => {
      const currentTarget = evt.currentTarget;
      const action = self.getAttribute('g-click');
      debugger;
    }));
  }

  reposition(options) {
    this._state = { ...this._state, ...options };
    const { hPos, vPos } = this._state;
    const { $el, $menu } = this;
    $el.setAttribute('style', `${vPos}: 0; ${hPos}: 0;`);
    $menu.setAttribute('style', `${vPos}: 20px; ${hPos}: 20px;`);
    this.update();
  }

  update() {

  }

}