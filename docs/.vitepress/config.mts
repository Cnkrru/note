import { defineConfig } from 'vitepress'
import { withSidebar } from 'vitepress-sidebar'
import { withMermaid } from 'vitepress-plugin-mermaid'

const siteTitle = 'KruDoc'
const siteDescription =
  '个人技术笔记知识库，记录编程学习与工程实践，涵盖后端、前端、框架、硬件、计算机原理与操作系统等方向。'
const siteUrl = 'https://blog.cnkrru.top'

export default withMermaid(
  withSidebar(
    defineConfig({
      lang: 'zh-CN',
      title: siteTitle,
      description: siteDescription,
      sitemap: { hostname: siteUrl },
      outDir: '../dist',
      ignoreDeadLinks: 'localhostLinks',
      lastUpdated: true,
      vite: {
        optimizeDeps: {
          // mermaid 依赖的这几个包是 CJS，dev 下需预打包才能拿到 default 导出
          include: [
            'mermaid',
            'fastdom',
            'fastdom/extensions/fastdom-promised.js',
            'dayjs',
            '@braintree/sanitize-url',
          ],
        },
      },
      head: [
        ['link', { rel: 'icon', href: '/favicon.png', type: 'image/png' }],
        ['link', { rel: 'apple-touch-icon', href: '/favicon.png' }],
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:title', content: siteTitle }],
        ['meta', { property: 'og:description', content: siteDescription }],
      ],
      themeConfig: {
        logo: '/favicon.png',
        siteTitle,
        nav: [
          { text: '首页', link: '/' },
          { text: '文档', link: '/Backend/cpp/cpp-1-基础' },
        ],
        outline: { level: [2, 3], label: '本页目录' },
        search: {
          provider: 'local',
          options: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档',
              },
              modal: {
                displayDetails: '显示详细列表',
                resetButtonTitle: '重置搜索',
                backButtonTitle: '关闭搜索',
                noResultsText: '没有找到相关结果',
                footer: {
                  selectText: '选择',
                  selectKeyAriaLabel: '回车',
                  navigateText: '切换',
                  navigateUpKeyAriaLabel: '上箭头',
                  navigateDownKeyAriaLabel: '下箭头',
                  closeText: '关闭',
                  closeKeyAriaLabel: 'esc',
                },
              },
            },
          },
        },
        editLink: {
          pattern: 'https://github.com/Cnkrru/note/edit/main/docs/:path',
          text: '在 GitHub 上编辑此页',
        },
        lastUpdated: {
          text: '最后更新',
          formatOptions: { dateStyle: 'full', timeStyle: 'medium' },
        },
        docFooter: {
          prev: '上一篇',
          next: '下一篇',
        },
        socialLinks: [{ icon: 'github', link: 'https://github.com/Cnkrru/note' }],
        darkModeSwitchLabel: '外观',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式',
        sidebarMenuLabel: '菜单',
        returnToTopLabel: '回到顶部',
        externalLinkIcon: true,
      },
    }),
    {
      documentRootPath: 'docs',
      useTitleFromFileHeading: false,
      includeRootIndexFile: false,
      includeFolderIndexFile: false,
      collapsed: true,
      sortFolderTo: 'top',
      sortMenusByCustomFunction: (a, b) =>
        a.fileName.localeCompare(b.fileName, 'zh-CN', { numeric: true }),
    },
  ),
)
