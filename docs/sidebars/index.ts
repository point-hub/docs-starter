
import type { DefaultTheme } from 'vitepress'
import fs from 'node:fs'
import path from 'node:path'

export function getSidebar(
  versions: string[],
  sidebarAbsoluteDir: string,
): DefaultTheme.SidebarMulti {
  const sidebar: DefaultTheme.SidebarMulti = {}

  versions.forEach((version) => {
    const sidebarPath = path.join(
      sidebarAbsoluteDir,
      `${version}.json`,
    )

    if (!fs.existsSync(sidebarPath)) {
      console.warn(`Sidebar configuration not found: ${sidebarPath}`)
      return
    }

    const content = fs.readFileSync(sidebarPath, 'utf-8')

    const items = JSON.parse(content) as DefaultTheme.SidebarItem[]

    sidebar[`/${version}/`] = items
  })

  return sidebar
}
