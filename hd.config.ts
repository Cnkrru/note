/*
 * 站点配置：hello 引擎（hellodocs）在用户侧的唯一配置源
 * 编译期读取，改后需重新编译才生效（开发模式不热更新配置）
 * 除 title 外全部可选，这里只写与默认值的差异
 */
import { defineConfig } from 'hellodocs'

export default defineConfig({
  title: 'KruDoc',
  description:
    '个人技术笔记知识库，记录编程学习与工程实践，涵盖后端、前端、硬件、框架、脚本等多个领域。',
  keywords: 'KruDoc,技术笔记,知识库,后端,前端,硬件,嵌入式,框架,脚本',
  // sitemap / canonical 的绝对地址；留空则全站不产 sitemap
  siteUrl: 'https://blog.cnkrru.top',
  // 分享封面：社交平台抓取 og:image 用，须为 png/jpg（不支持 SVG）；换图只替换 public/og-cover.png
  ogImage: '/og-cover.png',
  ogImageAlt: 'KruDoc 技术笔记知识库',
  copyright: `© ${new Date().getFullYear()} note · Powered by hellodocs`,
  // 内容目录：docs/ 下的 .md 即文档源，目录层级即侧栏分组
  docsDir: 'docs',
  maxDepth: 6,
  // 顶栏导航：站内写 / 或 /post/<相对 docs 的路径去掉 .md>，外链写完整 http(s):// 由新窗口打开
  nav: [
    { text: '首页', link: '/' },
    { text: '文档', link: '/post/后端/cpp/cpp-1-基础' },
  ],
  // 仓库外链：文章页的「编辑 / 历史」入口据此拼 GitHub 地址，url 留空则不渲染这两个入口
  repo: { url: 'Cnkrru/note', branch: 'main', docsDir: 'docs' },
})
