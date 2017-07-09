# react-from-object

> Create a React element from a description

This tool transforms a "description" of a React element into a React element, for example:

```js
import reactFromObject from 'react-from-object'

const element = reactFromObject(
  {
    type: 'canvas',
    props: {
      width: '42px',
      height: '42px',
    },
    children: 'foo',
  },
);

// Now element is the same as this:
// <canvas width="42px" height="42px">foo</canvas>
```

This is useful for passing something to a React app from the server without render to HTML and use `dangerouslySetInnerHTML`.
Instead you can pass a description of a React element and build it on the client side.

It's basically replacing this:

```jsx
<div dangerouslySetInnerHTML={{ __html: markup }} />
```

with that:

```jsx
<div>{reactFromObject(data)}</div>
```

## Format

The element can be either a primitive value or an object.
The object is expected to have these properties:

#### `type`

This is the name of the element to render.
It can be everything that is accepted by `React.createElement`.

Example:

```js
{
  type: 'div',
}
````

#### `props` (optional)

If present, it has to be an object containing props of the element.

Example:

```js
{
  type: 'img',
  props: {
    src: 'foo',
    alt: 'bar',
  },
}
```

*Warning: the `children` inside the `props` object are not processed - either pass them in `children` or process them beforehand.*

#### `children` (optional)

This should be either an element or an array of elements.

Example:

```js
{
  type: 'div',
  children: [
    'foo',
    {
      type: 'p',
      children: 'bar',
    },
    'baz',
  ],
}
```


## Performance

I don't really have any measurements, but this should be roughly as performant as handwritten JSX.

## License

Copyright (c) 2017 Rafał Ruciński. Licensed under the MIT license.
