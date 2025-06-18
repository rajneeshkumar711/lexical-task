// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { MarkNode } from './lexical/nodes/MarkNode'
import { MarkPlugin } from './lexical/plugins/MarkPlugin'
import { MarkButton } from './lexical/components/MarkButton'
import { FootnoteNode } from './lexical/nodes/FootnoteNode'
import { FootnotePlugin } from './lexical/plugins/FootnotePlugin'
import { FootnoteButton } from './lexical/components/FootnoteButton'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const markFeature = {
  feature: {
    nodes: [MarkNode],
    plugins: [MarkPlugin],
    Button: MarkButton,
  },
  key: 'mark',
};

const footnoteFeature = {
  feature: {
    nodes: [FootnoteNode],
    plugins: [FootnotePlugin],
    Button: FootnoteButton,
  },
  key: 'footnote',
};

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Posts],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => defaultFeatures.filter(
      feature => !['subscript', 'superscript'].includes(feature.key)
    ),
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
