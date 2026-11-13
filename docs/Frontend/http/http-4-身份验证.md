## 简介
> 本文内容来自于MDN文档:[https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Guides/Authentication](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Guides/Authentication)

MDN这篇文档介绍了HTTP协议自带的一种认证功能
## 详细
HTTP自带的认证方法依靠`请求头(Authorization/Proxy-Authorization)`和`响应头(WWW-Authenticate/Proxy-Authenticate)`来实现
### 请求头
```http
验证方法 凭据信息
```
### 响应头
```http
验证方法 保护区域
```
### 验证方法
1. basic(不安全)
2. bearer(最常用)
……
### Bearer
