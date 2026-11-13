# 动态对象

## 属性

- 统计:`Object.keys(o).length`

## 方法

1. 增
    - 新增:`o.key = 值`
    - 合并:`Object.assign(目标, 源)`
2. 删
    - 删除:`delete o.key`
3. 改
    - 覆盖:`o.key = 值`
4. 查
    - 取值:`o.key` / `o['key']`
    - 查存:`'key' in o` / `o.hasOwnProperty('key')`
    - 键值列表:`Object.keys(o)/values(o)/entries(o)`
5. 遍历
    - 循环:`for_in`
