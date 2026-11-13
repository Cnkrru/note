## 简介
> 本篇内容来源于MDN文档:[https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Guides/Overview#http_%E7%9A%84%E5%9F%BA%E6%9C%AC%E6%80%A7%E8%B4%A8](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Guides/Overview#http_%E7%9A%84%E5%9F%BA%E6%9C%AC%E6%80%A7%E8%B4%A8)
记录HTTP
- 组成
- 性质
- 功能
- 通信流程
- 报文内容
- API
## 详细
### HTTP系统组成
HTTP(超文本传输协议)

是一种客户端-服务端协议
- 客户端发出请求
- 服务端做出响应

客户端 <--> 代理 <--> 服务端

- 请求由一个用户代理或是一个可以代表用户的代理方发起(一般是浏览器)
- 响应由服务器来提供，返回用户请求的超文本(HTML),API数据(json)之类的
- 代理在中间作为传输层，有很多类别
### HTTP性质
1. 简约性
    - http/1.0 时，文本可读
    - http/2.0 时，内容被封装到二进制(帧)里
2. 拓展性
    - 设置新标头可以引入新功能
3. 无状态，有会话
    - cookie
4. 靠TCP连接
### HTTP功能
1. 缓存
2. 跨域
3. 鉴权
4. 反代
5. 会话
### HTTP通信过程
1. 打开一个TCP连接
2. 发送一个HTTP报文
3. 读取服务端返回的HTTP报文
4. 关闭连接或为后续通信重启连接
### HTTP报文内容
#### 请求报文
```http
请求方法 路径 协议版本
请求头
```

#### 响应报文
```http
协议版本 响应码 响应文本
响应头
```
### API
- Fetch 
- XMLHttpRequest