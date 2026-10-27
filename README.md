# Notes

个人技术笔记站点。内容全在 [docs/](docs/)，站点配置在
[docs/.vitepress/config.mts](docs/.vitepress/config.mts)，由
[VitePress](https://vitepress.dev/) 负责构建与主题渲染。

```sh
npm install
npm run dev      # 开发服务器
npm run build    # 构建静态站点，产出 dist/
npm run preview  # 预览已构建产物
```

侧栏由 `docs/` 目录结构自动生成，新增 Markdown 文件后无需改配置。
构建缓存写在 `docs/.vitepress/cache/`，产物默认在 `dist/`，两者均已加入 `.gitignore`。
