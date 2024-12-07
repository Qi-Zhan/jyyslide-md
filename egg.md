  author:
    name: 詹奇
    url: <https://qi-zhan.github.io/>

+++++

# E-graph in a Nutshell

----

## Overview

+ **Q1** (Why): 为什么需要 E-graph？
+ **Q2** (What): 什么是 E-graph？
+ <del>**Q3** (How): 怎么实现 E-graph？</del>

----

## 一个简单的任务

+ 一个神奇的函数, Ta 接受所有由变量 `x`, `y`, `z` 和常数 `1`, `2`, `3`, `4`, 构成的表达式, 并返回 `True` 或 `False`.
  + 例如 `x + 1, 2 * y, z >> 3`
+ 这个函数的实现是未知的, 但我们知道 Ta 有一个对于未知量的赋值, 并通过运算出的结果来判断表达式的真假
  + 例如 `x + 1 *  (2 * y) - z >> 3` 在 `{x |-> 1, y |-> 2, z|-> 8}` = `1 + 1 * (2 * 2) - 8 >> 3`
+ 我们需要找到一个表达式, 使得这个函数返回 `True`

----

## 平平无奇的语法树

```python
@dataclass
class Expr:
    def __add__(self, other):
        return BinOp('+', self, other)

@dataclass
class Const(Expr):
    value: int

@dataclass
class Var(Expr):
    value: str

@dataclass
class BinOp(Expr):
    op: str
    left: Expr
    right: Expr
```

----

## 枚举

+ 从所有基础表达式开始, 每次生成新的表达式, 直到找到满足条件的表达式为止

```python
def grow(exprs):
    for expr in exprs:
        yield expr
    for expr1 in exprs:
        for expr2 in exprs:
            yield expr1 + | - | * | / + expr2

def enumerate(spec):
    exprs = all_terminals() # x, y, z, ...
    while True:
        for expr in exprs:
            if spec(expr):
                return expr
        exprs = grow(exprs)
```

----

## 数据爆炸

----

## 剪枝

> 注意到有很多表达式是等价的, 例如 `x + y` 和 `y + x`, `x * y * z` 和 `x * (y * z)`

----

## 写点规则就行了

+ 交换律
+ 结合律

----

## 然而

----

> <red> 怎么在一般意义下实现化简呢？ </red>

+ 给定一组(尽可能一般性)的重写规则
+ 给定一个表达式
+ 求出这个表达式在这组规则下的最简形式

```c
s
```

---

# E-graph
