import { ElementNode, LexicalNode, NodeKey, SerializedElementNode } from 'lexical';

export type SerializedMarkNode = SerializedElementNode;

export class MarkNode extends ElementNode {
  static getType(): string {
    return 'mark';
  }

  static clone(node: MarkNode): MarkNode {
    return new MarkNode(node.__key);
  }

  constructor(key?: NodeKey) {
    super(key);
  }

  createDOM(): HTMLElement {
    const dom = document.createElement('mark');
    return dom;
  }

  updateDOM(): boolean {
    return false;
  }

  static importJSON(serializedNode: SerializedMarkNode): MarkNode {
    const node = $createMarkNode();
    return node;
  }

  exportJSON(): SerializedMarkNode {
    return {
      ...super.exportJSON(),
      type: 'mark',
      version: 1,
    };
  }
}

export function $createMarkNode(): MarkNode {
  return new MarkNode();
}

export function $isMarkNode(node: LexicalNode | null | undefined): node is MarkNode {
  return node instanceof MarkNode;
} 