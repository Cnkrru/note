## 简介
typescript在JavaScript基础上增加了一些类型
## 详细
### 基础类型(JavaScript)
#### 1. number
int+float
#### 2. boolean
true/false
#### 3. string
普通字符串
#### 4. null/undefined
#### 5. object
### 拓展类型(Typescript)
#### 1. any
#### 2. void
用于没有返回值的函数的返回值的类型
#### 3. array
`type[]` / `Array<type>`
#### 4. tuple
已知数量和类型的数组
```ts
let tuple:[string,number] = ['xiaoming',18]
```
#### 5. enum
已知数量，类型，具体内容的集合
```ts
enum Color {
    Red,
    Green
}
let rColor:Color = Color.Red
```
#### 6. union
联合类型
```ts
let union: string | number = 'xiaoming'
```
#### 7. 字面量类型
```ts
type Theme = 'ink' | 'sakura' | 'blue'
```