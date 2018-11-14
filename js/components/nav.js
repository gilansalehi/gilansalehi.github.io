import { q } from '../util/utils.js';
import Component from './component.js';

export default class Nav extends Component {
  constructor(options = {}) {
    super(options);
    this.$container = q('header')[0];
    this.$icon = q('.nav__icon')[0];
    this.$menu = q('.nav__menu')[0];
    this.$list = q('.nav__menu__list')[0];
    this._state = {
      vPos: 'top',
      hPos: 'left',
      open: false,
    };

    this.bindEventListeners.bind(this)()
  }

  bindEventListeners() {
    const {
      $container,
      $icon,
      $menu,
    } = this;

    this.on('click', '.nav__icon', evt => {
      $container.classList.toggle('open');
    });
    this.on('keyup', '.nav__icon', evt => {
      if ( evt.key === "Enter" ) {
        $container.classList.toggle('open');
      }
    });
    this.on('click', '.nav__close', evt => {
      $container.classList.remove('open');
    })

    this.on('change', '[g-select]', function(evt) {
      const action = evt.delegateTarget.getAttribute('g-select');
      const [vPos, hPos] = evt.delegateTarget.value.toLowerCase().split(' ');
      this[action]({ vPos, hPos });
    }, this);

    this.on('change', '[g-input]', function(evt) {
      const action = evt.delegateTarget.getAttribute('g-input');
      const value = evt.delegateTarget.value;
      this[action](value);
    })
  }

  reposition(options) {
    this.setState({...options });
  }

  setThemeColor(value) {
    q('html')[0].setAttribute('style', `color: ${value}`);
    q('meta[name="theme-color"]')[0].setAttribute('content', value);
  }

  update() {
    const { hPos, vPos } = this._state;
    const { $icon, $menu, $list } = this;
    $icon.setAttribute('style', `${vPos}: 0; ${hPos}: 0;`);
    $menu.setAttribute('style', `${vPos}: 0; ${hPos}: 0;`);
    $list.setAttribute('style', `
      justify-content: ${vPos == 'top' ? 'flex-start' : 'flex-end'};
      text-align: ${hPos};
    `);
  }

}