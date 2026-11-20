## 1. SQL基础

### 1.1 MySQL指令
- show databases：查看有哪些数据库
- use dbid：进入该数据库
- show tables：查看该数据库有哪些表
- exit：退出MySQL

### 1.2 SQL基础语法

#### 1.2.1 DDL(定义语法)

##### 库语言
- show databases：查看有哪些数据库
- use dbid：进入目标数据库
- create database dbid：创建新的数据库
- select database：查看当前数据库

##### 表语言
- show tables：查看表格
- create table tableid (listid1 类型，……)：创建新表格
- drop table tableid：删除表格

#### 1.2.2 DML(操作语法)
- insert into tableid [(list1，list2，list3……)] value(值1，值2，值3……)：插值
- delete from tableid (while判断)：去值
- update tableid set list=value(while条件)：更新

#### 1.2.3 DQL(查询语法)
- select listid from tableid(while 条件)：查询id列表
- select * from tableid：查询所有列表
- select listid|count_def from tableid(while 条件) group by listid：查询id列表/聚合函数
- 后缀：+order by listid[asc/desc]：asc表示正向排序/desc表示反向排序

### 1.3 pymysql
- pymysql：python管理数据库的包

### 1.4 备注

#### 1.4.1 术语说明
- dbid：数据库名
- tableid：表格名
- listid：列名

#### 1.4.2 数据类型
- 整形：int
- 浮点：float
- 字符：varchar(最长255)
- 日期：data
- 时间：timestamp

#### 1.4.3 聚合函数
- sum（列）：求和
- avg（列）：均值
- min（列）：最小
- max（列）：最大
- const（列）：求数量