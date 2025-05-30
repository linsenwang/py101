
# 第二章 函数

## 您将学到什么

函数式编程中的函数具有一些核心特性：

*   “函数是一等公民 (Functions are first-class objects)”。
*   函数本身也是对象。
*   函数可以与其他函数交互。
*   函数可以存储在变量中并赋予名称。

这些特性不仅是函数式编程的必要条件，也深刻影响着编程语言的设计。我们将通过几个具体用例来介绍这些主题。

## 用例一：装饰器

在开始学习装饰器之前，让我们先回顾一下已经学过的内容。

!!! question "课堂练习 1"
    给定元组 `t1=(1,2,3,4,5)`：
    
    1.  编写一个函数计算 `t1` 的平均值。
    2.  编写一个函数计算 `t1` 的标准差。
    3.  编写一个函数计算 `t1` 的偏度 (skewness)。

现在，我们正式进入装饰器的学习。

!!! info "背景"
    如果在尝试将包含无效值（如 `None`）的参数传递给函数时遇到错误，正确的做法是确保传递给函数的参数中没有无效值。

这里我们引入 `assert` 语句。`assert` 是一种声明，我们断言一个表达式的真假（什么是表达式？）。

*   如果表达式的值为 `True`，则什么也不会发生，程序继续执行。
*   但如果表达式的值为 `False`，断言失败，程序会抛出一个 `AssertionError`。

!!! question "课堂练习 2"
    给定元组 `t2=(1,2,3,None,5)`：
    
    1.  尝试将您的平均值函数应用于 `t2`，观察会发生什么。

下面是一些 `assert` 语句的示例：

```python
# 这个断言会失败，因为 None 在列表中
# assert None not in [1, 2, None, 3], "列表中不应包含 None 值！"
# 这个断言会通过
assert None not in [1, 2, 3], "所有值看起来都很好！"
# 这个断言会失败
# assert "apple" in ["banana", "orange"], "列表中应包含 'apple'!"
```

!!! note "关键概念：`assert` 语句"
    `assert expression, message`
    
    *   `expression` 是一个条件表达式。
    *   `message` (可选) 是在断言失败时显示的错误信息。

!!! question "课堂练习 3"
    1.  使用 `assert` 语句改进您在“课堂练习 1”中编写的函数，以确保输入不包含无效值（例如 `None`）或确保输入列表/元组不为空。

尽管 `assert` 很方便，但如果您编写了许多函数，要修改所有这些函数会很困难。在其他情况下，如果函数是由其他人定义的，我们可能无法自行修改函数。

那么，当我们想要扩展一个函数的功能时，可以定义一个**高阶函数 (higher-order function)**，并将我们想要修改的函数作为其参数。在高阶函数内部完成我们想要的操作，然后返回一个新的、功能增强的函数。这就是装饰器的核心思想。

### 装饰器语法模板

下面是定义装饰器作为高阶函数的通用模板：

```python
# 定义一个装饰器函数
def decorator_name(func):
    def wrapper(*args, **kwargs):
        # 在调用原始函数之前可以做些事情
        print("在函数执行前做些操作...")
        result = func(*args, **kwargs)  # 调用原始函数
        # 在调用原始函数之后可以做些事情
        print("在函数执行后做些操作...")
        return result
    return wrapper

# 使用装饰器来装饰一个函数
@decorator_name
def my_function():
    print("my_function 正在执行")

# 调用被装饰的函数
my_function()
```

!!! question "课堂练习 4"
    编写装饰器来实现以下功能：
    
    1.  在函数执行前打印一行 “`<函数名> function is being called.`”，在执行后打印一行 “`finish calling <函数名> function.`”。
        例如：
        ```
        In[]: print(1)
        Out[]: 
        print function is being called.
        1
        finish calling print function. 
        ```
    2.  记录先前函数调用的返回值。每当函数被调用时，如果参数相同，则直接返回已记录的值，避免重复计算（即实现一个简单的缓存功能）。

## 用例二：递归

高阶函数的另一个重要应用场景是递归。如果 Python 中的任何函数都可以作为参数传递给另一个函数，那么如果一个函数将自身作为参数（或在其定义中调用自身），会发生什么呢？这就是递归。

我们将重新审视两个已经编写过的函数，并介绍三个新的例子来理解递归：

*   重温牛顿法
*   重温求和函数
*   求解平方根
*   斐波那契数列
*   阶乘函数

### 递归回顾：牛顿法

假设我们要找到函数 $f(x) = x^2 - 5$ 的根。我们可以从一个初始猜测开始，比如 $x_0 = 0.5$。
根据牛顿法，迭代公式为：
$f'(x) = 2x$
$x_{\text{next}} = x_{\text{current}} - \frac{f(x_{\text{current}})}{f'(x_{\text{current}})} = x_{\text{current}} - \frac{x_{\text{current}}^2 - 5}{2x_{\text{current}}}$

下面是使用循环实现的牛顿法：

```python
def newton_iterative_sqrt5(x_current):
    return x_current - (x_current**2 - 5) / (2 * x_current)

x = 0.5
for _ in range(10): # 进行10次迭代
    x_prev = x
    x = newton_iterative_sqrt5(x)
    print(f"Current approximation: {x}")
    if abs(x - x_prev) < 1e-7: # 如果变化很小，提前停止
        print("Converged.")
        break
```

请注意 `x = newton_iterative_sqrt5(x)` 这种更新方式，它与直接调用 `newton_iterative_sqrt5(0.5)` 十次是不同的。前者利用了上一次的计算结果。

我们可以尝试用递归来简化这种手动迭代调用。这是一个起点，请尝试自行修改代码使其工作：

```python
def newton_step(x_current):
    return x_current - (x_current**2 - 5) / (2 * x_current)

def newton_recursion(x_current, iterations_left, tolerance=1e-7):
    if iterations_left == 0:
        print("Max iterations reached.")
        return x_current
    
    x_next = newton_step(x_current)
    print(f"Current approximation (recursion): {x_next}")
    
    if abs(x_next - x_current) < tolerance:
        print("Converged (recursion).")
        return x_next
    
    return newton_recursion(x_next, iterations_left - 1, tolerance)

# 初始猜测 x=0.5，迭代10次
initial_guess = 0.5
result = newton_recursion(initial_guess, 10)
print(f"Final result from recursion: {result}")
```

!!! note "递归总结"
    *   **边界条件 (Base Case)** 用于终止递归，防止无限循环。
    *   **递归体 (Recursive Step)** 用于将问题分解为更小的、与原问题相似的子问题，并调用自身来解决这些子问题。
    *   递归和循环的**区别**包括：
        *   递归通常代码更简洁，更接近数学定义，但可能因函数调用栈过深导致栈溢出。
        *   循环通常效率更高（避免函数调用开销），且没有栈溢出风险。
        *   任何用递归实现的算法都可以用循环实现，反之亦然（尽管有时转换不直观）。

### 递归回顾：求和函数

基于前一个例子的学习，您能理解下面的 `sum_recursion` 函数是如何工作的吗？

```python
def sum_recursion(a_list):
    if len(a_list) == 0:  # 边界条件：列表为空，和为0
        return 0
    else:                 # 递归体：第一个元素 + 剩余列表元素的和
        return a_list[0] + sum_recursion(a_list[1:])

my_list = [1, 2, 3, 4, 5]
print(f"Sum of {my_list} is: {sum_recursion(my_list)}") # 输出 15
```

### 递归：平方根

我们之前使用牛顿法来求解数字的平方根。这里介绍另一种方法。
数学上，如果我们想找到 $x$ 的平方根 $r$，那么 $r$ 必须满足：
$r = \frac{x}{r}$

如果这个关系满足，那么我们可以推导出：
$2r = r + \frac{x}{r}$
或者，
$r = 0.5 \times (r + \frac{x}{r})$

这个关系 $r = 0.5 \times (r + \frac{x}{r})$ 是一个递归关系。为什么？如果我们添加上下标，就会更清晰：
$r_{\text{next}} = 0.5 \times (r_{\text{current}} + \frac{x}{r_{\text{current}}})$
这表明我们可以通过当前的猜测值 $r_{\text{current}}$ 来得到一个更好的猜测值 $r_{\text{next}}$。

!!! question "课堂练习 5"
    1.  编写一个名为 `sqrt_recursion` 的递归函数来求解一个数的平方根。
        提示：可以从求解数字 7 的平方根开始，然后将您的函数泛化。需要一个初始猜测值和一个停止条件（例如，迭代次数或前后两次结果差异小于某个阈值）。

!!! note "关键概念"
    递归关系是指导递归函数实现的基础。您应该（或者说必须）非常熟悉它。

!!! question "课堂练习 6"
    1.  请推导斐波那契数列的递推公式。
        它的递推公式为：$a_{n+2} = a_{n+1} + a_n$，通常定义 $a_0 = 0, a_1 = 1$ 或 $a_1 = 1, a_2 = 1$。
    2.  请实现一个 Python 函数来计算斐波那契数列的第 n 项的值。
        提示：您可以选择递归或迭代（循环）两种方式。

作为最后一个练习，我们来做一个更简单的。

!!! question "课堂练习 7"
    1.  请编写一个函数来计算某个非负整数的阶乘。

## 应用案例二：递归

### 通过递归计算平方根

求平方根的迭代公式可以表示为：
若当前近似值为 `𝑟`，目标值为 `𝑥`，则下一个更精确的近似值 `𝑟_next` 可以通过以下公式计算：
`𝑟_next = 0.5 × (𝑟_current + 𝑥 / 𝑟_current)`

这个关系式是递归的。为什么呢？如果我们使用下标来区分不同的迭代步骤，就更容易理解了：
`𝑟₍ᵢ₊₁₎ = 0.5 × (𝑟ᵢ + 𝑥 / 𝑟ᵢ)`
其中 `𝑟ᵢ` 是当前的近似值，`𝑟₍ᵢ₊₁₎` 是下一次迭代的近似值。

!!! question "课堂练习 5.1：递归实现平方根函数"
    1.  请编写一个名为 `root_recursion` 的函数，使用递归方法来计算一个数的平方根。
        提示：可以从计算数字 7 的平方根入手，然后将其推广为一个通用函数。

!!! note "关键概念：递推关系"
    递推关系（Recursive relation）是指导递归函数实现的基础。你现在应该对此非常熟悉了。

### 课堂练习 6.1：斐波那契数列

!!! question "课堂练习 6.1：斐波那契数列"
    1.  请推导斐波那契数列的通项公式。其递推公式为：
        `𝑎₍ₙ₊₂₎ = 𝑎₍ₙ₊₁₎ + 𝑎ₙ`
    2.  请实现一个 Python 函数来计算斐波那契数列的值。
        提示：你可以选择多种实现方式（例如，递归或迭代）。

### 课堂练习 7.1：递归计算阶乘

作为最后一个关于递归的练习，我们来看一个相对简单的问题。

!!! question "课堂练习 7.1：递归计算阶乘"
    1.  请编写一个函数来计算给定数字的阶乘。

## 应用案例三：map、filter 和 reduce

让我们从熟悉的 `max` 函数开始。你已经知道 `max` 函数的输出：

```python
max(1, 2, 3, 4)
# 输出: 4

max("hello", "world", "Python")
# 输出: 'world' (按字典序)
```

Python 也能够计算序列中的最大值：
```python
max((1, 2, 3))
# 输出: 3
```
这里 `max((1,2,3))` 表示找出元组 `(1,2,3)` 中的最大元素。

### `max` 函数及其 `key` 参数

如果我们不满足于 `max` 函数的默认比较行为（例如，对于字符串是按字典序比较），我们可以通过定义一个辅助函数来改变它。这个辅助函数：
*   接受序列中的元素作为参数。
*   返回我们希望用来比较的那个标准值。

例如，比较字符串长度：
```python
def helper(s):
  return len(s)

max("hello", "world", "Python", key=helper)
# 输出: 'Python' (因为 "Python" 长度为6, 是最长的)
```

### 匿名函数 (Lambda Expressions)

每次为了特定标准去定义一个完整的辅助函数可能显得有些繁琐。我们可以省略函数的名称，直接使用它，这就是所谓的**匿名函数**（或 Lambda 函数）。其语法如下：

```python
max("hello", "world", "Python", key=lambda s: len(s))
# 输出: 'Python'
```
这里 `lambda s: len(s)` 定义了一个匿名函数，它接受一个参数 `s` 并返回其长度 `len(s)`.

### `map` 函数

现在让我们转向三个非常有用的高阶函数。`map` 函数会将一个函数应用于序列中的每一个元素，并返回一个包含所有结果的迭代器（在 Python 3 中）。

```python
# 对元组中的每个字符串应用 len 函数
list(map(len, ("hello", "world", "Python")))
# 输出: [5, 5, 6]
```

### `filter` 函数

`filter` 函数根据指定的标准筛选序列中的元素。与 `map` 函数中的辅助函数类似，我们需要设置一个作为筛选标准的函数。但这次，这个辅助函数的返回值必须是布尔类型（`True` 或 `False`）。`filter` 函数会返回一个迭代器，其中包含所有使辅助函数返回 `True` 的元素。

```python
def long_string(x):
  return len(x) > 5

list(filter(long_string, ("hello", "world", "Python", "!" )))
# 输出: ['Python'] (只有 "Python" 的长度大于5)
```

!!! question "课堂练习 8.1：`filter` 与匿名函数"
    1.  请使用匿名函数替换上述 `filter` 示例中的 `long_string` 辅助函数。

### `reduce` 函数

我们要介绍的最后一个技巧是 `reduce` 函数。与其他两个函数不同，我们需要从 `functools` 模块中导入它。`reduce` 函数也需要一个辅助函数，这个辅助函数必须：
1.  接受两个参数。
2.  返回一个与参数类型相同（或兼容）的值。

`reduce` 函数会累积地将这个辅助函数应用于序列的元素，从左到右，以便将序列缩减为单个值。

```python
from functools import reduce

# 使用 reduce 和 lambda 函数连接字符串
reduce(lambda x, y: x + "" + y, ("hello", "world", "Python"))
# 输出: 'helloworldPython'

# 如果想加入空格
reduce(lambda x, y: x + " " + y, ("hello", "world", "Python"))
# 输出: 'hello world Python'
```

## 应用案例四：生成器

我们之前学习过迭代器（什么是迭代器？）。**生成器 (Generators)** 是一种创建迭代器的特殊且便捷的方式。
我们可以通过以下两种主要方式创建自己的生成器：
1.  通过**生成器表达式 (generator expression)**。
2.  通过**生成器函数 (generator function)**。

!!! note "迭代器回顾"
    迭代器是一个对象，它包含了一组可数的值，并且可以通过 `next()` 方法逐个访问这些值。当所有值都被访问后，会引发 `StopIteration` 异常。

!!! question "课堂练习 9.1：输出生成器的函数示例"
    1.  请列举一些 Python 内置的或标准库中返回生成器（或类似迭代器对象）的函数示例。

### 生成器表达式

我们在第一章学习过列表推导式的概念。用圆括号 `()` 包围的推导式并非“元组推导式”，它们实际上是生成器表达式。

```python
g = (x for x in range(5))
type(g)
# 输出: <class 'generator'>

# 可以像迭代器一样使用它
for item in g:
    print(item)
# 输出:
# 0
# 1
# 2
# 3
# 4
```

!!! question "课堂练习 10.1：生成器计算平方数"
    1.  创建一个生成器表达式，用于计算一系列数的平方 (例如 1, 4, 9, 16, ...)。
    2.  思考一下，定义这样一个生成器需要哪些要素？

### 生成器函数与 `yield`

**生成器函数 (Generator functions)** 与常规函数几乎相同，唯一的关键区别在于它们使用 `yield` 关键字而不是 `return` 来返回值。函数中任何地方只要出现了 `yield`，该函数就自动成为一个生成器函数。

`yield` 的字面意思是“放弃”或“让出”。我们在道路上看到的“Yield”标志告诉我们要让路给其他车辆。

在计算机程序中，当生成器函数遇到 `yield` 时，它会做类似的事情：
*   函数会“产出”一个值。
*   然后函数的执行被**暂停**，并将控制权交还给调用者。
*   当下次从这个生成器请求值时（例如，通过 `next()` 函数或在 `for` 循环中），函数会从它上次暂停的地方**恢复执行**，直到遇到下一个 `yield` 语句或函数结束。

### 生成器函数示例：状态与执行流程

以下示例展示了生成器函数的执行流程和状态变化：

```python
import time

def g():
    print(f'g() 开始执行')
    print(f'g() 准备休眠: 当前生成器 g1 的运行状态 (gi_running): {g1.gi_running}')
    time.sleep(1) # 缩短休眠时间以便观察
    print(f'g() 休眠结束，遇到 yield: 当前生成器 g1 的运行状态 (gi_running): {g1.gi_running}')
    yield 1
    print(f'g() 从 yield 恢复执行')
    # yield 语句之后不再有代码，所以再次调用 next() 会引发 StopIteration

# 创建生成器对象
g1 = g()

print(f"调用 next(g1) 之前: g1 的运行状态 (gi_running): {g1.gi_running}") # 通常为0 (未启动或已挂起)
# 首次调用 next() 会启动生成器函数 g() 的执行
value = next(g1)
print(f"从 next(g1) 获取的值: {value}")
print(f"调用 next(g1) 之后，g() 在 yield 处暂停: g1 的运行状态 (gi_running): {g1.gi_running}") # 通常为0 (挂起)

# 如果再次调用 next(g1):
# try:
#     next(g1)
# except StopIteration:
#     print("g() 执行完毕，引发 StopIteration")
# print(f"g() 执行完毕后: g1 的运行状态 (gi_running): {g1.gi_running}") # 通常为0 (已完成)
```

!!! warning "关于示例中 `g1.gi_running` 的说明"
    在原始讲义的 `g()` 函数内部打印 `g1.gi_running` 依赖于 `g1` 是一个在 `g()` 执行时已定义并可访问的（通常是全局）变量。`gi_running` 是生成器对象的一个内部状态属性，表示生成器是否正在执行（值为1）或已暂停/未启动/已完成（值为0）。上述代码调整了注释以更好地反映状态。

### 生成器函数示例：无限序列

现在我们了解了生成器函数的工作原理，可以用它来定义一个生成器。假设我们想要计算从1开始到无穷大的所有整数的平方。如果使用列表，这是不可能的（为什么？因为列表需要在内存中存储所有元素）。但是使用生成器，我们不需要在计算机中存储所有的平方值，只需在需要时即时计算它们。

```python
def squares():
  i = 1
  while True:
    yield i**2
    i += 1

# 使用这个生成器
sq_gen = squares()

# 获取前5个平方数
for _ in range(5):
  print(next(sq_gen))
# 输出:
# 1
# 4
# 9
# 16
# 25
```
!!! note "生成器的优势"
    生成器特别适用于处理大数据流或无限序列，因为它们是惰性求值的，并且内存效率高。

## 应用案例五：错误信息处理

接下来，我们将介绍如何阅读和处理程序中的错误信息。要处理一个错误，我们通常会使用...
```
（前文结尾处关于生成器函数执行的描述）
...当生成器函数在未来某个时间点恢复执行时，它会重新获得计算资源，直到下一次遇到 `yield` 语句。

## 2.4 应用案例

### 2.4.1 用例 IV：生成器（函数）

#### 生成器函数的工作原理
生成器函数是一种特殊的函数，它在被调用时返回一个生成器对象，而不是直接执行函数体。当生成器的 `next()` 方法被调用时，函数开始执行，直到遇到 `yield` 语句。此时，`yield` 后面的表达式的值会作为结果返回，并且函数的执行状态被保存，函数暂停。当下一次调用 `next()` 时，函数会从上次暂停的地方继续执行。

#### 示例：基本生成器函数
以下是一个简单的生成器函数示例，演示了其基本行为和状态转换：

```python
import time

def simple_generator_example():
    print("生成器：开始执行，准备第一次 yield")
    time.sleep(1) # 模拟一些工作
    value_to_yield = "第一个值"
    print(f"生成器：即将 yield '{value_to_yield}'")
    yield value_to_yield
    
    print("\n生成器：恢复执行，在第一次 yield 之后")
    time.sleep(1) # 模拟一些工作
    value_to_yield = "第二个值"
    print(f"生成器：即将 yield '{value_to_yield}'")
    yield value_to_yield
    
    print("\n生成器：恢复执行，在第二次 yield 之后")
    print("生成器：执行完毕")

# 创建生成器对象
my_generator = simple_generator_example()

print("外部：已创建生成器对象")
print(f"生成器对象类型: {type(my_generator)}")

# 第一次调用 next()
print("\n外部：调用 next(my_generator) 第一次...")
try:
    result1 = next(my_generator)
    print(f"外部：从生成器接收到: {result1}")
    # 我们可以检查生成器的状态属性 (需要 import inspect)
    # import inspect
    # print(f"外部：此时 my_generator.gi_running = {inspect.getgeneratorstate(my_generator)}") # RUNNING (during yield) or SUSPENDED (after yield)
except StopIteration:
    print("外部：生成器已耗尽")

# 第二次调用 next()
print("\n外部：调用 next(my_generator) 第二次...")
try:
    result2 = next(my_generator)
    print(f"外部：从生成器接收到: {result2}")
except StopIteration:
    print("外部：生成器已耗尽")

# 第三次调用 next()，预期会引发 StopIteration
print("\n外部：调用 next(my_generator) 第三次...")
try:
    next(my_generator)
except StopIteration:
    print("外部：捕获到 StopIteration，生成器已正常结束。")

```

!!! note "关键概念：`yield` 和生成器状态"
    当生成器函数执行到 `yield` 语句时，它会“暂停”执行，并将其后的表达式的值返回给调用者。此时，函数的所有局部状态（包括变量值、指令指针等）都会被保留。当下一次调用生成器的 `next()` 方法时，函数会从上次暂停的地方恢复执行。
    生成器对象有一些内部属性，可以通过 `inspect` 模块来查看（例如 `inspect.getgeneratorstate()`）：
    -   `GEN_CREATED`: 等待开始执行。
    -   `GEN_RUNNING`: 正在被解释器执行。 (注意：`gi_running` 标志在生成器内部执行时为1，否则为0)
    -   `GEN_SUSPENDED`: 在 `yield` 表达式处暂停。
    -   `GEN_CLOSED`: 执行完毕。

#### 应用：动态计算无限序列

现在我们了解了生成器函数的工作方式，可以用它来定义一个生成器。假设我们想要计算从1到无穷大的整数的平方。如果我们使用列表，这是不可能的（因为列表需要在内存中存储所有元素，而无限序列无法存下）。但是使用生成器，我们不需要在计算机中存储所有的平方值，只需即时计算它们。

```python
def squares():
    i = 1
    while True:
        yield i**2
        i += 1

# 使用示例
sq_gen = squares() # 创建生成器对象
print("前5个平方数：")
for _ in range(5):
    print(next(sq_gen)) # 逐个获取平方数
```
这个 `squares` 生成器可以无限地产生平方数，而不会消耗大量内存。

### 2.4.2 用例 V：错误信息处理
本节我们介绍错误信息的读取和处理。在编程中，错误（也称为异常）是常见现象。有效地处理这些错误对于编写健壮的程序至关重要。Python 提供了 `try-except` 控制流结构来处理异常。

以下代码尝试读取一个包含手写数字像素数据的 CSV 文件，并将其显示为图像。这个过程可能会遇到多种错误，例如文件不存在、文件格式不正确等。

```python
# 假设有一个名为 number1.csv 的文件在 ./data/numbers/ 目录下
# 内容示例 (假设是28x28图像，像素值逗号分隔):
# label
# 0,0,0,...,255,255,...,0,0,0 (共784个值)

import matplotlib.pyplot as plt
import numpy as np
import os # 用于文件路径操作

# --- 准备工作：创建示例文件和目录 (仅用于演示) ---
data_dir = "./data/numbers/"
if not os.path.exists(data_dir):
    os.makedirs(data_dir)

# 创建一个虚拟的 number1.csv 文件用于演示
# (实际课程中应提供此文件，或指导学生创建)
sample_csv_path = os.path.join(data_dir, "number1.csv")
try:
    with open(sample_csv_path, "w") as f:
        f.write("label\n") # 写入头部
        # 创建一个简单的渐变图像数据 (784个像素)
        pixel_values = [str(i % 256) for i in range(784)]
        f.write(",".join(pixel_values) + "\n")
except IOError as e:
    print(f"警告：无法创建示例文件 '{sample_csv_path}': {e}")
# --- 准备工作结束 ---


# --- 核心代码：读取和显示图像 ---
try:
    # 尝试打开并读取文件
    with open(sample_csv_path, "r") as f:
        header = f.readline().strip()  # 读取并移除末尾换行符
        data_str = f.readline().strip() # 读取数据行并移除末尾换行符

    # 将逗号分隔的字符串转换为 NumPy 数组
    pixels_flat = np.array(data_str.split(","), dtype='uint8')
    
    # 校验数据长度并重塑为 28x28 图像
    if pixels_flat.size == 784: # 28 * 28 = 784
        pixels = pixels_flat.reshape((28, 28))
        
        # 使用 matplotlib 显示图像
        plt.imshow(pixels, cmap='gray') # 以灰度图显示
        plt.title(f"手写数字图像 (来自 {os.path.basename(sample_csv_path)})")
        # plt.show() # 调用 plt.show() 会打开一个窗口显示图像；在脚本中若要连续处理则注释掉

        # 保存图像 (原始讲义中提到 mnist{i}.png，这里演示保存单个文件)
        output_filename = f"./mnist_{os.path.splitext(os.path.basename(sample_csv_path))[0]}.png"
        plt.imsave(output_filename, pixels, cmap='gray')
        print(f"图像已成功处理并保存为: {output_filename}")
    else:
        # 如果像素数量不正确，引发一个 ValueError
        raise ValueError(f"数据格式错误：期望784个像素值，实际得到 {pixels_flat.size} 个。")

except FileNotFoundError:
    print(f"错误：文件 '{sample_csv_path}' 未找到。请确保文件路径正确。")
except ValueError as ve:
    print(f"数据处理错误：{ve}")
except Exception as e: # 捕获其他所有预料之外的错误
    print(f"处理文件时发生了一个未知错误：{e}")

```

!!! info "关于 `plt.show()` 和 `plt.imsave()`"
    - `plt.show()`: 在脚本执行时，此函数会打开一个GUI窗口来显示图像，并暂停脚本的后续执行，直到该窗口被关闭。在Jupyter Notebook等交互式环境中，图像通常会内联显示。
    - `plt.imsave()`: 此函数直接将图像数据保存到文件，不会打开GUI窗口，因此适用于批量处理或后台任务。

如果文件不存在、格式错误或在处理过程中发生其他问题，程序流程可能会因错误而中断。然而，在处理多个文件时，我们通常希望一个文件的失败不影响其他文件的处理。在绘制和保存图片之前检查所有数据的有效性可能是一项繁琐的任务。因此，我们需要依赖 `try-except` 控制流来优雅地处理这些潜在问题。

`try-except` 的基本语法如下：

```python
try:
    # 尝试执行的代码块 (Potentially problematic code)
    # 例如：文件操作、网络请求、类型转换、数学计算等
    # result = 10 / 0 # 这会引发 ZeroDivisionError
    # f = open("non_existent_file.txt", "r") # 这会引发 FileNotFoundError
    pass # 请替换为实际代码

except FileNotFoundError as fnf_error:
    # 如果在 try 块中发生了 FileNotFoundError 类型的错误
    # 则执行这里的代码来处理它
    print(f"捕获到文件未找到错误: {fnf_error}")

except ZeroDivisionError as zd_error:
    # 可以有多个 except 块来处理不同类型的特定错误
    print(f"捕获到除零错误: {zd_error}")

except ValueError as val_error:
    # 处理值错误
    print(f"捕获到值错误: {val_error}")

except Exception as general_error:
    # Exception 是大多数内置错误的基类，可以捕获那些未被前面 except 块捕获的通用错误
    # 建议将更具体的异常类型放在前面，通用的 Exception 放在后面作为“兜底”
    print(f"捕获到一个预料之外的错误: {general_error}")

else:
    # 可选块：如果 try 块中没有发生任何错误，则执行这里的代码
    print("try 块中的代码成功执行，没有引发任何异常。")

finally:
    # 可选块：无论 try 块中是否发生错误（即使 try 或 except 块中有 return, break, continue 语句），
    #这里的代码总会被执行。
    # 通常用于资源清理，如关闭文件、释放锁、关闭数据库连接等。
    print("finally 块：执行必要的清理操作。")
```

!!! note "关键概念：`try-except-else-finally` 语句"
    - **`try`**: 包含可能会引发一个或多个异常（错误）的代码块。
    - **`except <ErrorType> [as <variable>]`**: 如果在 `try` 块中发生了 `<ErrorType>` 类型的异常（或者是其子类的异常），则执行相应的 `except` 块。`<variable>` 是一个可选的名称，它会绑定到该异常对象实例，使你可以访问关于错误的更多信息。可以有多个 `except` 块来处理不同类型的异常。
    - **`else`**: （可选）如果 `try` 块中的代码顺利执行完毕，没有引发任何异常，则会执行 `else` 块中的代码。
    - **`finally`**: （可选）无论 `try` 块中是否发生异常，也无论异常是否被捕获，`finally` 块中的代码总会被执行。这对于执行必须的清理操作（如关闭文件）非常有用。

!!! question "课堂练习 11.1：批量处理数字图片"
    1.  **目标**：编写一个 Python 脚本，该脚本能够遍历指定文件夹（例如 `./data/numbers/`）中的所有 CSV 文件。
    2.  **文件格式假设**：
        *   每个 CSV 文件的第一行是表头（可以忽略）。
        *   第二行包含逗号分隔的像素值。
        *   每个文件代表一个 28x28 像素的灰度图像（即包含 784 个像素值）。
    3.  **处理流程**：
        a.  对于文件夹中的每个 CSV 文件：
        b.  **错误处理**：使用 `try-except` 结构来包裹文件读取和处理逻辑。
            *   尝试读取文件内容。
            *   将像素数据字符串分割并转换为一个 NumPy `uint8` 类型的数组。
            *   检查数组大小是否为 784。如果不是，应视为一个错误。
            *   将一维数组重塑 (reshape) 为 28x28 的二维数组。
        c.  **保存图像**：如果数据有效，则使用 `matplotlib.pyplot.imsave()` 将该 NumPy 数组保存为一个 PNG 图像文件。例如，如果原始文件是 `numberX.csv`，则可以将其保存为 `output_mnist_numberX.png` 到指定的输出目录。
        d.  **日志/反馈**：
            *   对于成功处理的文件，打印一条成功的消息。
            *   对于处理失败的文件（例如文件不存在、格式错误、数据损坏等），捕获相应的异常（如 `FileNotFoundError`, `ValueError`, `IndexError`），打印一条指示错误文件和错误类型的消息。确保单个文件的错误不会导致整个脚本的执行中断。
    4.  **提示**：
        *   使用 `os.listdir(directory_path)` 获取文件夹中所有文件和子目录的列表。
        *   使用 `filename.endswith(".csv")` 来筛选出 CSV 文件。
        *   使用 `os.path.join()` 来构建完整的文件路径，以确保跨平台兼容性。

## 2.5 PEP 8 编码规范
Python 增强提案（Python Enhancement Proposals, PEPs）是一系列旨在记录和改进 Python 编程语言特性、流程和约定的文档。PEP 8 是其中非常著名的一个，它作为 Python 代码的风格指南（Style Guide for Python Code）。

!!! info "关于 PEP 8"
    PEP 8 提供了关于如何格式化 Python 代码的详细约定，内容涵盖代码布局（缩进、行长、空行）、字符串引号、表达式和语句中的空格、命名约定、注释、文档字符串等等。
    -   **目的**：提高 Python 代码的可读性和一致性。当所有人都遵循相同的风格指南时，代码会更容易理解、维护和共享。
    -   **它不是强制性的**：Python 解释器不会因为你的代码不符合 PEP 8 而拒绝执行。
    -   **但强烈推荐遵守**：Python 社区广泛采纳 PEP 8 作为事实上的编码标准。许多项目都要求代码遵循 PEP 8。使用代码检查工具（linters）如 Flake8、Pylint、Black 或 Ruff 可以帮助你自动检查和格式化代码以符合 PEP 8 的规范。

## 2.6 参考与扩展阅读
*   **视频教程 (B站)**: [Python функция генераторเข้าใจง่ายใน 12 นาที | yield from | PEP 255, 342, 380](https://www.bilibili.com/video/BV1Y2421A7sB/?spm_id_from=333.3.37.search-card.all.click&vd_source=ec7b194853f6121829b0f428c7736022)
    *   这是一个关于 Python 生成器 (`yield`, `yield from`) 以及相关 PEPs (PEP 255, 342, 380) 的视频讲解。
*   **书籍**: *Mastering Functional Programming with Python*, Steven Lott, 2015. (中文版参考《精通Python函数式编程》)
    *   这本书深入探讨了 Python 中的函数式编程概念和技术，生成器是函数式编程的重要组成部分。
