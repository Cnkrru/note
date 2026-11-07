## 简介
- MDN地址:[https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator)

## 属性
- userAgent
    - 包含浏览器信息的字符串，用来检测浏览器类型和版本
- language
    - 浏览器首选语言
- platform
    - 操作系统平台
- onLine
    - 是否在线，真假判断当前网络状态
- cookieEnabled
    - 是否启用Cookie
- hardwareConcurrency
    - CPU逻辑核数
## 方法
- sendBeacon(url, data)
    - 发送少量数据到服务器，页面卸载时也能发送，常用于埋点统计
- vibrate(ms)
    - 触发设备震动，移动端可用

## 子对象
### clipboard
#### 简介
- 浏览器剪贴板对象
#### 属性
- 无
#### 方法 
- writeText(文本)
    - 复制文本到剪贴板，需要安全上下文（https或localhost）
- readText()
    - 读取剪贴板文本
- write(数据)
    - 写入任意格式数据（如图片），异步操作
- read()
    - 读取任意格式数据，异步操作   