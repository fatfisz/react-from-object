import { createElement } from 'react';


export default function reactFromObject(node) {
  if (!node.type) {
    return node;
  }

  const { type, props, children } = node;
  let processedChildren;

  if (Array.isArray(children)) {
    processedChildren = children.map(reactFromObject);
    return createElement(type, props, ...processedChildren);
  }

  if (children) {
    processedChildren = reactFromObject(children);
    return createElement(type, props, processedChildren);
  }

  return createElement(type, props);
}
