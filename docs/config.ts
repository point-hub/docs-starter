
import { withMermaid } from 'vitepress-plugin-mermaid'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { getSidebar } from './sidebars'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const srcAbsoluteDir = path.resolve(__dirname, './src')
const sidebarAbsoluteDir = path.resolve(__dirname, './sidebars')

// Detect available documentation versions.
const versions: string[] = fs.existsSync(srcAbsoluteDir)
  ? fs.readdirSync(srcAbsoluteDir).filter((file) => {
      const fullPath = path.join(srcAbsoluteDir, file)

      return (
        fs.statSync(fullPath).isDirectory() &&
        /^v\d+\.\d+$/.test(file)
      )
    })
  : []

// Sort versions using semantic version numbers.
versions.sort((a, b) => {
  const versionA = a.slice(1).split('.').map(Number)
  const versionB = b.slice(1).split('.').map(Number)

  for (let i = 0; i < 3; i++) {
    if (versionA[i] !== versionB[i]) {
      return versionB[i] - versionA[i]
    }
  }

  return 0
})

// Determine the latest available version.
const latestVersion = versions[0] ?? 'v1.0'

// Load individual sidebar configurations.
const dynamicSidebar = getSidebar(
  versions,
  sidebarAbsoluteDir,
)

// Default sidebar for the root documentation.
dynamicSidebar['/'] = [
  {
    text: 'Documentation',
    items: [
      {
        text: 'Introduction',
        link: `/${latestVersion}/introduction`,
      },
    ],
  },
]

export default withMermaid({
  lang: 'en-US',
  title: 'Developer Portal',
  description: 'Template for Web documentation',
  cleanUrls: true,
  srcDir: './src',

  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        href: '/favicon-32x32.png',
      },
    ],
    ['link', { rel: 'stylesheet', href: 'https://pointhub.net' }],
  ],

  themeConfig: {
    logo: '/icon.png',

    nav: [
      { text: 'Home', link: '/v1.0/' },
      {
        component: 'VersionSwitcher',
        props: {
          versions,
          latestVersion,
        },
      },
    ],

    sidebar: dynamicSidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com' },
    ],

    search: {
      provider: 'local',
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 Pointhub',
    }
  },
})
