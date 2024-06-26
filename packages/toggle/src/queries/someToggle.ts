import {
  type PlateEditor,
  type Value,
  someNode,
} from '@udecode/plate-common/server';

import { ELEMENT_TOGGLE } from '../types';

export const someToggle = <V extends Value>(editor: PlateEditor<V>) => {
  return (
    !!editor.selection &&
    someNode(editor, {
      match: (n) => n.type === ELEMENT_TOGGLE,
    })
  );
};
