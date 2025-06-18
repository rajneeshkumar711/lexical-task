'use client';

import { useEffect, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection, COMMAND_PRIORITY_NORMAL, createCommand } from 'lexical';
import { $createFootnoteNode, $isFootnoteNode, FootnoteNode } from '../nodes/FootnoteNode';

export const INSERT_FOOTNOTE_COMMAND = createCommand('INSERT_FOOTNOTE_COMMAND');

let footnoteCounter = 1;

export function FootnotePlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [footnoteContent, setFootnoteContent] = useState('');
  const [activeFootnote, setActiveFootnote] = useState<FootnoteNode | null>(null);

  useEffect(() => {
    if (!editor.hasNodes([FootnoteNode])) {
      throw new Error('FootnotePlugin: FootnoteNode not registered on editor');
    }

    return editor.registerCommand(
      INSERT_FOOTNOTE_COMMAND,
      () => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) {
          return false;
        }

        const footnoteNode = $createFootnoteNode(footnoteCounter++);
        selection.insertNodes([footnoteNode]);
        setActiveFootnote(footnoteNode);
        setIsModalOpen(true);
        return true;
      },
      COMMAND_PRIORITY_NORMAL
    );
  }, [editor]);

  const handleSaveFootnote = () => {
    if (activeFootnote) {
      editor.update(() => {
        activeFootnote.setFootnoteContent(footnoteContent);
      });
      setIsModalOpen(false);
      setFootnoteContent('');
      setActiveFootnote(null);
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="footnote-modal-overlay">
      <div className="footnote-modal">
        <h3>Enter Footnote Content</h3>
        <textarea
          value={footnoteContent}
          onChange={(e) => setFootnoteContent(e.target.value)}
          placeholder="Enter footnote content..."
          className="footnote-textarea"
        />
        <div className="modal-actions">
          <button className="button primary" onClick={handleSaveFootnote}>
            Save
          </button>
          <button className="button secondary" onClick={() => setIsModalOpen(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
} 