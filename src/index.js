import { createElement } from 'react';


export default function reactFromObject(node) {
  if (!node.type) {
    return node;
  }

  const { type, props, children } = node;

  if (Array.isArray(children)) {
    return createElement(type, props, ...children.map(reactFromObject));
  }

  if (children) {
    return createElement(type, props, reactFromObject(children));
  }

  return createElement(type, props);
}
