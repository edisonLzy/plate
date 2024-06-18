import type { Path } from 'slate';

import {
  type EElementOrText,
  type InsertNodesOptions,
  type RemoveNodesOptions,
  type TEditor,
  type Value,
  insertNodes,
  withoutNormalizing,
} from '@udecode/slate';

import { removeNodeChildren } from './removeNodeChildren';

export interface ReplaceNodeChildrenOptions<
  N extends EElementOrText<V>,
  V extends Value = Value,
> {
  at: Path;
  nodes: N | N[];
  insertOptions?: Omit<InsertNodesOptions<V>, 'at'>;
  removeOptions?: Omit<RemoveNodesOptions<V>, 'at'>;
}

/** Replace node children: remove then insert. */
// 替换Node的children
export const replaceNodeChildren = <
  N extends EElementOrText<V>,
  V extends Value = Value,
>(
  editor: TEditor<V>,
  { at, insertOptions, nodes, removeOptions }: ReplaceNodeChildrenOptions<N, V>
) => {
  withoutNormalizing(editor, () => {
    // 删除Node的children
    removeNodeChildren(editor, at, removeOptions);
    // 插入新的children
    insertNodes(editor, nodes, {
      ...insertOptions,
      at: at.concat([0]),
    });
  });
};
