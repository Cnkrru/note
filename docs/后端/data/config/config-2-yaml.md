## 简介
类似json，常用于配置文件
像py，但是py用toml作为配置文件，不怎么用
## 详细
1. 格式:用缩进表示层级关系(2/4格)
2. 类型:number,string,boolean,null,list
3. 注释:#
```yaml
# 基本类型
name: note          # 字符串
version: 1.0        # 数字
enabled: true       # 布尔值
timeout: null       # 空值

# 列表
tags:
  - markdown
  - vitepress

# 嵌套映射
server:
  host: localhost
  port: 5173
```