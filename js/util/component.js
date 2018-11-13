export default class Component {
  constructor(options = {}) {
    this.$container = options.$container || document;
    this._state = options._state || {};
  }

  on(eventType, delegateSelector, callback, thisArg = this) {
    this.$container.addEventListener(eventType, event => {
      const delegateTarget = q(delegateSelector).filter(el => el.contains(event.target))[0];
      if ( delegateTarget ) {
        event.delegateTarget = delegateTarget;
        callback.bind(thisArg)(event);
      }
    });
  }

  setState(options) {
    this._state = { ...this._state, ...options };
    this.update();
  }

  update() {
    // defined by inheritor classes
  }
}