import { ElementNode, LexicalNode, NodeKey, SerializedElementNode } from 'lexical';

export type SerializedFootnoteNode = SerializedElementNode & {
  footnoteContent: string;
  footnoteNumber: number;
};

export class FootnoteNode extends ElementNode {
  __footnoteContent: string;
  __footnoteNumber: number;

  static getType(): string {
    return 'footnote';
  }

  static clone(node: FootnoteNode): FootnoteNode {
    return new FootnoteNode(node.__footnoteNumber, node.__footnoteContent, node.__key);
  }

  constructor(footnoteNumber: number, footnoteContent: string = '', key?: NodeKey) {
    super(key);
    this.__footnoteContent = footnoteContent;
    this.__footnoteNumber = footnoteNumber;
  }

  createDOM(): HTMLElement {
    const dom = document.createElement('sup');
    const link = document.createElement('a');
    link.href = `#footnote-${this.__footnoteNumber}`;
    link.textContent = `${this.__footnoteNumber}`;
    dom.appendChild(link);
    return dom;
  }

  updateDOM(): boolean {
    return false;
  }

  setFootnoteContent(content: string): void {
    const self = this.getWritable();
    self.__footnoteContent = content;
  }

  getFootnoteContent(): string {
    return this.__footnoteContent;
  }

  getFootnoteNumber(): number {
    return this.__footnoteNumber;
  }

  static importJSON(serializedNode: SerializedFootnoteNode): FootnoteNode {
    const node = $createFootnoteNode(serializedNode.footnoteNumber, serializedNode.footnoteContent);
    return node;
  }

  exportJSON(): SerializedFootnoteNode {
    return {
      ...super.exportJSON(),
      type: 'footnote',
      version: 1,
      footnoteContent: this.__footnoteContent,
      footnoteNumber: this.__footnoteNumber,
    };
  }
}

export function $createFootnoteNode(footnoteNumber: number, footnoteContent: string = ''): FootnoteNode {
  return new FootnoteNode(footnoteNumber, footnoteContent);
}

export function $isFootnoteNode(node: LexicalNode | null | undefined): node is FootnoteNode {
  return node instanceof FootnoteNode;
} 