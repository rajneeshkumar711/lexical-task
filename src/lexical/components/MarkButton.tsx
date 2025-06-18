'use client';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection } from 'lexical';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHighlighter } from '@fortawesome/free-solid-svg-icons';
import { $isMarkNode } from '../nodes/MarkNode';
import { TOGGLE_MARK_COMMAND } from '../plugins/MarkPlugin';

export const MarkButton = (): JSX.Element => {
  const [editor] = useLexicalComposerContext();

  const handleClick = () => {
    editor.dispatchCommand(TOGGLE_MARK_COMMAND, undefined);
  };

  const isActive = () => {
    const selection = $getSelection();
    if (!$isRangeSelection(selection)) {
      return false;
    }

    const nodes = selection.extract();
    return nodes.every((node) => {
      const parent = node.getParent();
      return $isMarkNode(parent);
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`toolbar-item ${isActive() ? 'active' : ''}`}
      title="Mark"
      aria-label="Mark text"
    >
      <FontAwesomeIcon icon={faHighlighter} />
    </button>
  );
}; 