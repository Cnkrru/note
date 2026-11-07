## 1. 文字效果
### 1.1 尺寸
- font-size：num+px
- 说明：px指的是像素大小
- 默认值：谷歌浏览器默认字体大小是16px
### 1.2 粗细
- font-weight：num
> 没写过
### 1.3 行高
- line-height：num+px
- 说明：如果只写num，则为当前标签的字符大小的num倍；行高=上间距+下间距+字体大小
> 不讲究
### 1.4 颜色
- color
- rgb三原色写法
- rgba透明色表示法：a表示透明度，属于（0，1）小
- 十六进制表示：RRGGBB（如果重复，则写成RGB）
> 各种颜色都能这样写
---
## 2. 排版布局
### 2.1 横向位置
- text-align：style
- left：默认左
- right
- center：居中的是字体
- 图片居中：需要给img标签加一个父级：div
### 2.2 垂直居中（行高特殊作用）
- 方法：
  - 造一个盒子
  - 把文字行高和盒子高度设置一样就行
- 说明：仅限单行文字垂直居中
> 文字居中用
### 2.3 单词换行
- word-warp: break-word
> 很少用
### 2.4 长句子拆分换行
- word-break: keep-all/break-all
> 很少用
---
## 3. 字体样式
- font-family：字体样式
### 3.1 倾斜
- font-style：normal/italic
- 说明：normal是不倾斜，italic是倾斜
> 没用过
### 3.2 缩进
- text-indent：num+px/num+em
- 说明：一般使用em，em与当前内容字体相关，2em就是首行缩进2格
> 很少用
### 3.3 修饰线
- text-decoration
- none：无
- underline：下划线
- line-through：删除线
- overline：上划线
> 只在消除a标签默认样式时写一下none
### 3.4 文本阴影
- text-shadow：px px px color
> 没用过
---
## 4. 字符复合属性
- font：倾斜 加粗 字号/行高 字体
- 说明：必须严格按照顺序来写；一般用于开发初期，统一文字效果
> 没这样写过
---