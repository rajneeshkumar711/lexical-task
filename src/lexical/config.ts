import { MarkNode } from './nodes/MarkNode';
import { MarkPlugin } from './plugins/MarkPlugin';
import { MarkButton } from './components/MarkButton';
import { FootnoteNode } from './nodes/FootnoteNode';
import { FootnotePlugin } from './plugins/FootnotePlugin';
import { FootnoteButton } from './components/FootnoteButton';
import type { FeatureProvider } from '@payloadcms/richtext-lexical';

type FeaturesProps = {
  defaultFeatures: string[];
};

export const lexicalFeatures = ({ defaultFeatures }: FeaturesProps): FeatureProvider[] => [
  ...defaultFeatures.filter(
    (feature: string) => !['subscript', 'superscript'].includes(feature)
  ),
  {
    key: 'mark',
    component: MarkButton,
    plugins: [MarkPlugin],
    nodes: [MarkNode],
  },
  {
    key: 'footnote',
    component: FootnoteButton,
    plugins: [FootnotePlugin],
    nodes: [FootnoteNode],
  },
]; 