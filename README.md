# Notes

个人技术笔记站点。内容全在 [docs/](docs/)，站点实值在 [hd.config.ts](hd.config.ts)，
编译管线 / 主题 / SSG 装配由 [hellodocs](https://www.npmjs.com/package/hellodocs)（CLI 命令 `hd`）提供。

```sh
npm install
npm run dev      # 开发服务器
npm run build    # 构建静态站点，产出 dist/
npm run preview  # 预览已构建产物
```

引擎中间产物写在 `.hd/`，构建产物默认在 `dist/`，两者均已加入 `.gitignore`。
`hd.config.ts` 在编译期读取，改后需重新编译才生效（开发模式不热更新配置）。
