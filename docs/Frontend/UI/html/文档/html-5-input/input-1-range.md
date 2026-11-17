## 简介
range类型用于做进度条
## 详细
```html
<input type="range" min="0" max="100" step="0.1" value="0" class="progress">
```
- min:最小值
- max:最大值
- step:拖动步长
- value:进度值
### 1. input事件
```js
const progress = document.querySelector('.progress')
progress.addEventListener('input',()=> {
console.log(`当前进度为${progress.value}`)
})
```
- 监听鼠标拖动事件
### 2. change事件
```js
const progress = document.querySelector('.progress')
progress.addEventListener('change',() => {
console.log(`结束进度为${progress.value}`)
})
```
- 监听鼠标点击进度条事件