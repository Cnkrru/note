vue用`{{}}`做插值语法

## 用法
### 1. 插入变量
- 可以插入普通变量
- 也可以插入响应式变量
    - 两者差别在于，响应式变量变化，DOM会随之更新，而普通变量不会
#### 测试代码
```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue';
let a = 0
const b = ref(0)

onMounted(()=> {
const aBtn = document.querySelector('.abtn')
const bBtn = document.querySelector('.bbtn')
aBtn.addEventListener('click',() => {
  a++
  console.log(a)
})

bBtn.addEventListener('click',() => {
  b.value++
  console.log(b.value) 
})
})
</script>

<template>
  <span>
    {{ a }}
    <button class="abtn">请点击我</button>
  </span>
  <span>
    {{ b }}
    <button class="bbtn">请点击我</button>
  </span>

</template>

<style scoped>
</style>
```

#### 代码运行结果
- a:控制台显示a增加了,但是`{{a}}`渲染没改变
- b:控制台显示b增加了,但是`{{b}}`渲染更新了

:::tip
关于为什么JS事件绑定部分要放到onMounted
:::
### 2. 插入JS表达式
