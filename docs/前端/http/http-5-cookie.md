## 简介
> 本文内容来自于MDN文档:[https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Guides/Cookies](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Guides/Cookies)

主要有三个功能:会话状态管理,用户设置,浏览器跟踪

cookie以前常用于存储一些用户配置之类的，不过现在可以用localstore/seesionstore/indexDB替代了

## 详细
### 请求/响应头
- 服务端:set-cookie
- 客户端:cookie
服务端给客户端发送响应，附带`set-cookie`,客户端拿到后,可以在下次向服务器请求时带着，表示是同一个浏览器(浏览器跟踪),也可以传一些用户配置，服务端做出相应修改
### 声明周期
在`set-cookie`时，可以配置`expires`来控制cookie过期时间
### 对cookie进行保护
1. secure
    - 在`set-cookie`时，配置`secure`限制他人访问
2. httponly
    - JavaScript不能访问带`httponly`的cookie，可以防止XSS攻击