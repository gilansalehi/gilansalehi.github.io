export const q = selector => [...document.querySelectorAll(selector)];

export const on = function (eventType, delegateSelector, callback, $container = document) {
    $container.addEventListener(eventType, event => {
      const delegateTarget = [
        ...$container.querySelectorAll(delegateSelector)
      ].filter(el => el.contains(event.target))[0];

      if ( delegateTarget ) {
        event.delegateTarget = delegateTarget;
        callback.bind(delegateTarget)(event);
      }
    });
  }
