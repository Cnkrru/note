## 简介
> GITHUB仓库地址:[https://github.com/pillarjs/encodeurl](https://github.com/pillarjs/encodeurl)
encodeURL是pillarjs团队成员写的一个编码URL的库
这个库主要用于处理encodeURI函数编码URI的边界问题(%xx二次编译,没组成%xx的%符号,utf-16的非法数据)
- 关于URL为什么要编码，详见于[../../../C](../../../../Computer/computer-4-URL.md)
## 详细
### 1. 常量
- ENCODE_CHARS_REGEXP
```js
const ENCODE_CHARS_REGEXP =/(?:[\x00-\x20"<>`{}\x7F-\uFFFF]+|%+(?![0-9A-Fa-f]{2})){1,1024}/g;
```
这段正则匹配规则:
1. (?:)
    - 分组，将规则分为两组小规则
        - 分组1:```[\x00-\x20"<>`{}\x7F-\uFFFF]+```
            - 需要编码的字符串
                - \x00 到 \x20(控制字符集)
                - "
                - <>
                - `
                - {}
                - \x7F 到 \uFFFF
        - 分组2:```%+(?![0-9A-Fa-f]{2})```
            - 匹配`%<字符><字符>`
            - 要求:匹配的%后面两个字符不是16进制数
            - 用处:避免已经编码的字符(%xx)二次编码
2. {1,1024}
    - 把分组1或分组2循环1-1024次
### 2. 函数:
- encodeUrl(url:string):string
```js
export function encodeUrl(url: string): string {
  const index = url.search(ENCODE_CHARS_REGEXP);
  if (index === -1) return url;
  return url.toWellFormed().replace(ENCODE_CHARS_REGEXP, encodeURI);
}
```
这个函数:
- 参数:url
    - 类型:string
- 返回:string
- 功能:判断传入的url是否需要修正(编码)，直接返回，如果需要,把脏字段/原字段交给`encodeURI`，进行修正/编码
1. `const index = url.search(ENCODE_CHARS_REGEXP);` 
    - 这一段是用`string`的`search(re)`方法找传进去的url有没有脏数据
        - 有脏数据返回索引
        - 没有脏数据(没有匹配到任何字段)，返回-1
2. `if (index === -1) return url;`
    - 没有脏数据，直接返回url
3. `toWellFormed()`
    - 这个主要是除了encodeURI的边界问题
4. `replace()`
    - 这个在这里用的是`(reg,fn)`的方式，每次匹配到都对匹配到的字符串进行一次fn
### 测试
```mjs
const ENCODE_CHARS_REGEXP =/(?:[\x00-\x20"<>`{}\x7F-\uFFFF]+|%+(?![0-9A-Fa-f]{2})){1,1024}/g;

function encodeUrl(url) {
  const index = url.search(ENCODE_CHARS_REGEXP);
  if (index === -1) return url;
  return url.toWellFormed().replace(ENCODE_CHARS_REGEXP, encodeURI);
}

// 空格(对于空格，encodeURI会正常替代为对应utf-8编码的字串)
console.log("空格:");
console.log(encodeUrl("https://example.com/a b"));
console.log(encodeURI("https://example.com/a b"));

// 中文(对于中文，也会正常替换)
console.log("中文:");
console.log(encodeUrl("https://example.com/?q=中文"));
console.log(encodeURI("https://example.com/?q=中文"));

// 特殊功能符号(特殊功能符号也会正常替换)
console.log("特殊功能符号:");
console.log(encodeUrl("https://example.com/path?a=1&b=2#top"));
console.log(encodeURI("https://example.com/path?a=1&b=2#top"));

// 已经编码过的(encodeURI会对%这个符号二次编码，%25)
console.log("已经编码过的:");
console.log(encodeUrl("https://example.com/?q=a%20b"));
console.log(encodeURI("https://example.com/?q=a%20b"));

// 孤立的 %(都会将%编码为%25，但是encodeURL做了校验)
console.log("孤立的 %:");
console.log(encodeUrl("https://example.com/?q=100%"));
console.log(encodeURI("https://example.com/?q=100%"));

// toWellFormed测试(未修正的会报错URI malformed)
const bad = "https://example.com/?q=\uD800"; // 含一个落单的代理项
console.log(encodeURI(bad.toWellFormed()));
console.log(encodeURI(bad));
```