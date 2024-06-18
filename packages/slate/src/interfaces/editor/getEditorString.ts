import type { EditorStringOptions } from 'slate/dist/interfaces/editor';

import { Editor, type Location } from 'slate';

import type { TEditor, Value } from './TEditor';

/**
 * Get the text string content of a location.
 *
 * Note: by default the text of void nodes is considered to be an empty string,
 * regardless of content, unless you pass in true for the voids option
 */

export const getEditorString = <V extends Value>(
  editor: TEditor<V>,
  at: Location | null | undefined,
  options?: EditorStringOptions
) => {
  if (!at) return '';

  try {
    // 获取 editor 中指定位置的字符串
    return Editor.string(editor as any, at, options);
  } catch (error) {
    return '';
  }
};
