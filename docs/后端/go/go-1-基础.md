## 基础
1. 包
    - 每个go程序都要有一个包名`package main`
2. 导出
    - 首字母大写表示导出`Pi`
3. 函数
```go
package main
import "fmt"

func swap(x, y string) (string, string) {
	return y, x
}

func main() {
	a, b := swap("hello", "world")
	fmt.Println(a, b)
}
```
4. 变量
    - var(函数内外都可以用)
        - 如果不指定值，需要写明类型
        - 指定值，编译期自推导
    - :=(只能用于函数内部)
        - 自推导
5. 基本类型
    - bool
    - string
    - int,int8,int16,int32,int64
    - uint,uint8,uint16,uint32,uint64
    - byte(uint8)
    - rune(int32)
    - float32,float64
    - complex64,complex128
6. 0值
    - 如果变量初始情况下没有赋值
        - int   0
        - str   ""
        - bool  false
7. 类型转换
    - 必须显式转换
8. 常量
    - const，不能用:=自推导
9. 循环
    - go只支持for
    - for i :=0 ;i<10;i++ {}
    - 死循环:`for{}`
10. 流程控制
    - if
    - switch
11. 结构体：
    - struct name {
        var vartype
        var vartype
    }