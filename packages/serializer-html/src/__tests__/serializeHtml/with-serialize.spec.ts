import React from 'react';

import { createBoldPlugin } from '@udecode/plate';
import { MARK_BOLD } from '@udecode/plate-basic-marks';
import {
  type PlatePlugin,
  createPlateEditor,
  htmlStringToDOMNode,
} from '@udecode/plate-core';
import { createImagePlugin } from '@udecode/plate-media';
import { createPlateUIEditor } from 'www/src/lib/plate/create-plate-ui-editor';

import { serializeHtml } from '../../serializeHtml';

const plugins = [
  createImagePlugin({
    serializeHtml: ({ element }) =>
      React.createElement('img', { src: element.url }),
  }),
];

it('custom serialize image to html', () => {
  expect(
    htmlStringToDOMNode(
      serializeHtml(createPlateUIEditor({ plugins }), {
        nodes: [
          {
            children: [],
            type: 'img',
            url: 'https://i.kym-cdn.com/photos/images/original/001/358/546/3fa.jpg',
          },
        ],
      })
    ).innerHTML
  ).toEqual(
    '<img src="https://i.kym-cdn.com/photos/images/original/001/358/546/3fa.jpg">'
  );
});

it('custom serialize bold to html', () => {
  expect(
    serializeHtml(
      createPlateUIEditor({
        plugins: [
          createBoldPlugin({
            serializeHtml: ({ children, leaf }) =>
              leaf[MARK_BOLD] && !!leaf.text
                ? React.createElement('b', {}, children)
                : children,
          }),
        ],
      }),
      {
        nodes: [
          { text: 'Some paragraph of text with ' },
          { bold: true, text: 'bold' },
          { text: ' part.' },
        ],
      }
    )
  ).toEqual('Some paragraph of text with <b>bold</b> part.');
});

function Bold({ children }: any): React.ReactElement {
  return React.createElement('b', {}, children);
}

describe('multiple custom leaf serializers', () => {
  const normalizeHTML = (html: string): string =>
    new DOMParser().parseFromString(html, 'text/html').body.innerHTML;

  it('serialization with the similar renderLeaf/serialize.left options of the same nodes should give the same result', () => {
    const pluginsWithoutSerializers: PlatePlugin[] = [
      { component: Bold as any, isLeaf: true, key: 'bold' }, // always bold
    ];

    const pluginsWithSerializers: PlatePlugin[] = [
      {
        component: Bold as any,
        isLeaf: true,
        key: 'bold',
        serializeHtml: Bold,
      },
    ];

    const result1 = serializeHtml(
      createPlateEditor({
        plugins: pluginsWithoutSerializers,
      }),
      {
        nodes: [{ bold: true, text: 'any text' }],
      }
    );

    const result2 = serializeHtml(
      createPlateEditor({
        plugins: pluginsWithSerializers,
      }),
      {
        nodes: [{ text: 'any text' }],
      }
    );

    expect(normalizeHTML(result1)).toEqual(normalizeHTML(result2));
    expect(normalizeHTML(result2)).toEqual('<b>any text</b>');
  });
});
