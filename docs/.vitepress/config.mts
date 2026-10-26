import { defineConfig } from 'vitepress'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { basename, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))

// 从 Markdown 文件中提取第一个一级标题作为侧栏文本，回退到文件名
function extractTitle(file: string): string {
  const content = readFileSync(file, 'utf-8')
  const m = content.match(/^#\s+(.+)$/m)
  if (m) return m[1].trim()
  return basename(file, extname(file))
}

// 递归扫描 docs 目录，按目录层级自动生成侧栏
function buildSidebar(dirPath: string, linkBase: string): any[] {
  const entries = readdirSync(dirPath)
    .filter((n) => !n.startsWith('.'))
    .sort((a, b) => a.localeCompare(b, 'zh-CN'))
  const items: any[] = []
  for (const name of entries) {
    const full = join(dirPath, name)
    if (statSync(full).isDirectory()) {
      const children = buildSidebar(full, `${linkBase}/${name}`)
      if (children.length) {
        items.push({ text: name, collapsed: true, items: children })
      }
    } else if (extname(name) === '.md') {
      const isIndex = name === 'index.md'
      const link = isIndex
        ? `${linkBase}/`
        : `${linkBase}/${name.replace(/\.md$/, '')}`
      const text = isIndex ? basename(dirPath) : extractTitle(full)
      items.push({ text, link })
    }
  }
  return items
}

export default defineConfig({
  lang: 'zh-CN',
  title: 'KruDoc',
  description:
    '个人技术笔记知识库，记录编程学习与工程实践，涵盖后端、前端、硬件、框架、脚本等多个领域。',
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg' }],
    ['meta', { name: 'keywords', content: 'KruDoc,技术笔记,知识库,后端,前端,硬件,嵌入式,框架,脚本' }],
  ],
  cleanUrls: true,
  ignoreDeadLinks: [
    // 文档内容中的本地演示链接
    /^https?:\/\/localhost/,
  ],
  themeConfig: {
    siteTitle: 'KruDoc',
    nav: [
      { text: '首页', link: '/' },
      { text: '后端', link: '/后端/', activeMatch: '/后端/' },
      { text: '前端', link: '/前端/', activeMatch: '/前端/' },
      { text: '框架', link: '/框架/', activeMatch: '/框架/' },
      { text: '硬件', link: '/硬件/', activeMatch: '/硬件/' },
      { text: '数学', link: '/数学/', activeMatch: '/数学/' },
      { text: '电气', link: '/电气/', activeMatch: '/电气/' },
      { text: '工具', link: '/工具/', activeMatch: '/工具/' },
      { text: 'OS', link: '/OS/', activeMatch: '/OS/' },
      { text: '脚本', link: '/脚本/', activeMatch: '/脚本/' },
      { text: '技能', link: '/skills/', activeMatch: '/skills/' },
      { text: '英语', link: '/英语/', activeMatch: '/英语/' },
      { text: '其他', link: '/其他/', activeMatch: '/其他/' },
    ],
    sidebar: buildSidebar(root, ''),
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Cnkrru/note' },
    ],
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
          modal: {
            noResultsText: '没有找到结果',
            resetButtonTitle: '清除查询条件',
            footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' },
          },
        },
      },
    },
    outline: { level: [2, 3], label: '本页目录' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    externalLinkIcon: true,
  },
})
