export default class Component {
  constructor(options = {}) {
    this.$container = options.$container || document;
  }

  on(eventType, delegateSelector, callback) {
    this.$container.addEventListener(eventType, event => {
      const delegateTarget = q(delegateSelector).filter(el => el.contains(event.target))[0];
      if ( delegateTarget ) {
        event.delegateTarget = delegateTarget;
        callback(event);
      }
    });
  }
}