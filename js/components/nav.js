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

    this.bindEventListeners.bind(this)();
  }

  bindEventListeners() {
    const { $container } = this;

    this.on('click', '.nav__icon', e => $container.classList.toggle('open'));
    this.on('keyup', '.nav__icon', e => e.key === "Enter" && $container.classList.toggle('open'));
    this.on('click', '.nav__close', e => $container.classList.remove('open'));

    this.on('change', '[g-select]', function(e) {
      const action = e.delegateTarget.getAttribute('g-select');
      const [vPos, hPos] = e.delegateTarget.value.toLowerCase().split(' ');
      this[action]({ vPos, hPos });
    }, this);

    this.on('change', '[g-input]', function(e) {
      const action = e.delegateTarget.getAttribute('g-input');
      const value = e.delegateTarget.value;
      this[action](value);
    });
  }

  reposition(options) {
    this.setState({...options });
  }

  setThemeColor(data) {
    q('html')[0].style.setProperty('--theme-color-1', data);
    q('meta[name="theme-color"]')[0].setAttribute('content', data['primary']);
  }
  setThemeColor2(data) {
    q('html')[0].style.setProperty('--theme-color-2', data);
  }
  setThemeColor3(data) {
    q('html')[0].style.setProperty('--theme-color-3', data);
  }

  update() {
    const { hPos, vPos } = this._state;
    const { $icon, $menu, $list } = this;
    $icon.style.cssText = `${vPos}: 0; ${hPos}: 0;`;
    $menu.style.cssText = `${vPos}: 0; ${hPos}: 0;`;
    $list.style.cssText = `
      justify-content: ${vPos === 'top' ? 'flex-start' : 'flex-end'};
      text-align: ${hPos};
    `;
  }

}