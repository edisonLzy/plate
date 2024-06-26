import type { TElement } from '@udecode/plate-common';

export interface TMediaElement extends TElement {
  url: string;
  align?: 'center' | 'left' | 'right';
  id?: string;
  isUpload?: boolean;
  name?: string;
}

export interface MediaPlugin {
  isUrl?: (text: string) => boolean;

  /** Transforms the url. */
  transformUrl?: (url: string) => string;
}

export const ELEMENT_MEDIA = 'media';
