import { type DefaultTheme } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

// https://vitepress.dev/reference/site-config
export default withMermaid({
  lang: 'en-US',
  title: 'Docs Starter',
  description: 'template for Web documentation',
  cleanUrls: true,
  srcDir: './src',
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png' }],
    ['link', { rel: 'stylesheet', href: '/fontawesome-6.min.css' }],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/icon.png',
    nav: nav(),
    sidebar: {
      '/': { base: '', items: sidebarDocs() },
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/point-hub/docs-starter' }],
    search: {
      provider: 'local',
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 Pointhub',
    },
  },
})

function nav(): DefaultTheme.NavItem[] {
  return [
    { text: 'Home', link: '/' },
    { text: 'Examples', link: '/markdown-examples' },
  ]
}

function sidebarDocs(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Documentation',
      items: [
        { text: 'Introduction', link: '/introduction' },
        { text: 'Config', link: '/config' },
        { text: 'Diagram Tools', link: '/diagram-tools' },
      ],
    },
    {
      text: 'Examples',
      items: [
        { text: 'Markdown Examples', link: '/markdown-examples' },
        { text: 'Runtime API Examples', link: '/api-examples' },
      ],
    },
    {
      text: 'References',
      items: [
        { text: 'Vitepress', link: 'https://vitepress.dev/' },
        { text: 'Mermaid.js', link: 'https://mermaid.js.org/' },
      ],
    },
  ]
}
