## 简介
类似json，常用于配置文件 
写的时候要注意等号后的缩进
## 详细
1. 写法:key = value
2. 类型:number,string,boolean,date,array,table……
3. 注释:#
```toml
# 键值对
name = "Project"
version = "1.0.0"
enabled = true

# 数组
numbers = [1, 2, 3, 4, 5]

# 表格
[database]
host = "localhost"
port = 5432

# 嵌套表格
[database.credentials]
username = "admin"
password = "secret"

# 日期时间
created_at = 2023-12-25T10:30:00Z
```