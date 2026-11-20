## 1. favicon实现
### 1.1 步骤
1. 准备favicon文件：推荐使用.ico、.png或.svg格式
2. 添加favicon标签到HTML头部
3. 为不同设备和浏览器添加不同尺寸的favicon
### 1.2 代码
```html
<!-- 基本favicon设置 -->
<link rel="icon" href="favicon.ico" type="image/x-icon">
<!-- 为不同设备和浏览器添加不同尺寸的favicon -->
<link rel="icon" href="favicon-16x16.png" sizes="16x16" type="image/png">
<link rel="icon" href="favicon-32x32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="apple-touch-icon.png" sizes="180x180">
```
---
> 按要求弄个图标放根目录就得了，其他的别管