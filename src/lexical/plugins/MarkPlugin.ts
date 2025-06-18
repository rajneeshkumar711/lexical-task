'use client';

import { $createMarkNode, $isMarkNode, MarkNode } from '../nodes/MarkNode';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection, COMMAND_PRIORITY_NORMAL, createCommand } from 'lexical';
import { useEffect } from 'react';

export const TOGGLE_MARK_COMMAND = createCommand('TOGGLE_MARK_COMMAND');

export function MarkPlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([MarkNode])) {
      throw new Error('MarkPlugin: MarkNode not registered on editor');
    }

    return editor.registerCommand(
      TOGGLE_MARK_COMMAND,
      () => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) {
          return false;
        }

        const nodes = selection.extract();
        const isMarked = nodes.every((node) => {
          const parent = node.getParent();
          return $isMarkNode(parent);
        });

        if (isMarked) {
          // Unwrap from mark
          nodes.forEach((node) => {
            const parent = node.getParent();
            if ($isMarkNode(parent)) {
              parent.unwrap();
            }
          });
        } else {
          // Wrap with mark
          const markNode = $createMarkNode();
          selection.insertNodes([markNode]);
          nodes.forEach((node) => {
            markNode.append(node);
          });
        }

        return true;
      },
      COMMAND_PRIORITY_NORMAL
    );
  }, [editor]);

  return null;
} 