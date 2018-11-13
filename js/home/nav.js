import { q } from '../util/utils.js';
import Component from '../util/component.js';

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

    this.on('change', '[g-select]', function(evt) {
      const action = evt.delegateTarget.getAttribute('g-select');
      const [vPos, hPos] = evt.delegateTarget.value.toLowerCase().split(' ');
      this[action]({ vPos, hPos });
    }, this);
  }

  reposition(options) {
    this.setState({...options });
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