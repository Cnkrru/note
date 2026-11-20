## 简介

- js 项目自带一个 package.json，负责包管理和基础项目配置
- ts 项目需要一个 tsconfig.json 来配置编译行为
- 执行 tsc 时会自动读取当前目录的 tsconfig.json

## 详细

### 一、compilerOptions（编译选项）

所有编译选项都写在 `compilerOptions` 里。

#### 1. target

- 选择编译产物的 JavaScript 版本，版本不同，编译结果可能不同

```ts
let x: number = 1; // ts
```

```js
var x = 1; // ES5 编译产物
let x = 1; // ES6 编译产物
```

#### 2. module

- 使用的模块系统：`commonjs`、`esnext`、`es2015`、`amd`、`umd`、`system`、`none`
- Node.js 项目一般用 `commonjs`，交给打包工具时一般用 `esnext`

#### 3. lib

- 指定编译时引入的类型库，如 `["ES2020", "DOM"]`
- 不配置时按 target 自动推导，需要在浏览器里用 DOM 类型就要显式加上 `DOM`

#### 4. strict

- 是否启用严格检查，推荐始终开启
- 开启后同时启用下面这些子项：
  - `strictNullChecks`：检查 null/undefined
  - `noImplicitAny`：禁止隐式 any
  - `noImplicitThis`：检查 this 的类型
  - `strictFunctionTypes`：严格检查函数类型
  - `strictPropertyInitialization`：类属性必须在构造函数里初始化
  - `strictBindCallApply`：严格检查 bind/call/apply 的参数
- 子项可以单独覆盖，例如 `"strict": true` 再加 `"strictNullChecks": false`

#### 5. 路径相关

- `rootDir`：源码路径，一般是 `./src`
- `outDir`：编译输出路径，一般是 `./dist`

```json
{
    "compilerOptions": {
        "rootDir": "./src",
        "outDir": "./dist"
    }
}
```

#### 6. 声明与调试相关

- `declaration`：是否输出 `.d.ts` 声明文件
- `declarationDir`：`.d.ts` 声明文件输出路径
- `sourceMap`：是否生成 source map
- `mapRoot`：生成的 source map 的路径

```json
{
    "compilerOptions": {
        "declaration": true,
        "declarationDir": "./types",
        "sourceMap": true,
        "mapRoot": "./map"
    }
}
```

#### 7. 模块解析相关

- `moduleResolution`：模块解析策略，`node`、`bundler`、`classic`
- `baseUrl`：非相对导入的基准路径
- `paths`：路径别名
- `esModuleInterop`：让 CommonJS 模块可以按 ES 模块的方式导入
- `allowSyntheticDefaultImports`：允许没有默认导出的模块使用默认导入
- `isolatedModules`：要求每个文件都能单独编译

```json
{
    "compilerOptions": {
        "moduleResolution": "node",
        "baseUrl": ".",
        "paths": {
            "@/*": ["src/*"],
            "@components/*": ["src/components/*"]
        },
        "esModuleInterop": true,
        "allowSyntheticDefaultImports": true,
        "isolatedModules": true
    }
}
```

#### 8. include / exclude

- 配置要编译的文件有哪些
- `include` 之外的默认不编译，`exclude` 里的即使匹配也会排除

```json
{
    "include": ["src/**/*"],
    "exclude": [
        "node_modules",
        "dist",
        "**/*.test.ts",
        "**/*.spec.ts"
    ]
}
```
