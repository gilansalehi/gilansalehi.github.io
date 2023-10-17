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

export const g = function (selector, nodeProps = {}, children = [], ctx = document) {
  let node = ctx.querySelector(selector);
  if (!node) {
    let { nodeType, nodeId, nodeClass } = _parseSelectorString(selector);
    node = document.createElement(nodeType);
    if (nodeId) { node.id = nodeId; }
    node.classList.add(...nodeClass);

    Object.entries(nodeProps).forEach(([prop, value]) => {
      node[_propMap(prop)] = value;
    });

    for (let child of children) {
      node.appendChild(child);
    }
  } else {
    Object.entries(nodeProps).forEach(([prop, value]) => {
      node[_propMap(prop)] = value;
    });

    for (let child of children) {
      console.log('what now? ', child);
    }
  }

  return node;
}

export async function load(url, { container = document, callback = false }) {
  fetch(url + '?q=' + Math.random() ).then(function (response) {
    return response.text();
  }).then(function (htmlString) {
    var parser = new DOMParser();
    var html = parser.parseFromString(htmlString, 'text/html');
    let contents = document.adoptNode(html.body.firstChild);
    if (container) { container.appendChild(contents); }
    if (callback) { callback() }
    return contents
  }).catch(function (err) {
    console.warn('Something went wrong.', err);
  });
}

function _parseSelectorString(str) {
  let [str2, ...nodeClass] = str.split('.');
  let [nodeType, nodeId] = str2.split('#');

  return {
    nodeType,
    nodeId,
    nodeClass
  }
}

function _propMap(prop) {
  const propMap = {
    text: 'textContent',
    class: 'classList',
  };
  return propMap[prop] || prop;
}
