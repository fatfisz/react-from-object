import assert from 'assert';

import { shallow } from 'enzyme';
import { createElement } from 'react';

import reactFromObject from '../lib';


describe('react-from-object', () => {
  function compare(input, expected) {
    const result = reactFromObject(input);
    const wrappedResult = createElement('div', {}, result);
    const wrapper = shallow(wrappedResult);
    assert.equal(
      wrapper.html().slice(
        '<div>'.length,
        -'</div>'.length,
      ),
      expected,
    );
  }

  it('should handle empty elements', () => {
    compare(
      { type: 'div' },
      '<div></div>',
    );
  });

  it('should handle elements with props', () => {
    compare(
      {
        type: 'img',
        props: {
          'src': 'foo',
          'alt': 'bar',
        },
      },
      '<img src="foo" alt="bar"/>',
    );
  });

  it('should handle a single child', () => {
    compare(
      {
        type: 'div',
        children: 'foo',
      },
      '<div>foo</div>',
    );
  });

  it('should handle multiple children', () => {
    compare(
      {
        type: 'div',
        children: [
          'foo',
          {
            type: 'p',
            children: 'bar',
          },
          'baz'
        ],
      },
      '<div>foo<p>bar</p>baz</div>',
    );
  });

  it('should handle children and props at the same time', () => {
    compare(
      {
        type: 'canvas',
        props: {
          width: '42px',
          height: '42px',
        },
        children: 'foo',
      },
      '<canvas width="42px" height="42px">foo</canvas>',
    );
  });

  it('should handle text', () => {
    compare(
      'text',
      'text',
    );
  });
});
