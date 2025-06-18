'use client';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSuperscript } from '@fortawesome/free-solid-svg-icons';
import { INSERT_FOOTNOTE_COMMAND } from '../plugins/FootnotePlugin';

export const FootnoteButton = (): JSX.Element => {
  const [editor] = useLexicalComposerContext();

  const handleClick = () => {
    editor.dispatchCommand(INSERT_FOOTNOTE_COMMAND, undefined);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="toolbar-item"
      title="Add Footnote"
      aria-label="Add footnote"
    >
      <FontAwesomeIcon icon={faSuperscript} />
    </button>
  );
}; 