# Config

The config file `docs/config.ts` allows you to customize various aspects of your VitePress site. Consult the [config reference](https://vitepress.dev/reference/site-config) for full details on all config options 

## Navigation

The Nav is the navigation bar displayed on top of the page. It contains the site title, global menu links, etc.

You may define `themeConfig.nav` option to add links to your nav.

```ts
export default withMermaid({
  themeConfig: {
    nav: nav()
  }
}

function nav(): DefaultTheme.NavItem[] {
  return [
    { text: 'Home', link: '/' },
    { text: 'Examples', link: '/markdown-examples' },
  ]
}
```

## Sidebar

The sidebar is the main navigation block for your documentation. You can configure the sidebar menu in `themeConfig.sidebar`.

```ts
export default withMermaid({
  themeConfig: {
    sidebar: {
      '/': { base: '', items: sidebarDocs() },
    }
  }
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
```