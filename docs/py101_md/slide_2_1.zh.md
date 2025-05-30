
# 第二章 函数

**本章学习目标：**

*   如何定义和调用一个简单的函数。
*   函数作为对象（内存块）是如何存储的，以及调用函数时内部会发生什么。
*   函数如何自然地将内存划分为更小的片段，以及命名如何在这些空间中存在。
*   Python 如何管理这些空间并控制变量的可访问性。

!!! quote "核心思想"
    “函数是一等对象。”

## 2.1 简单函数

!!! question "课堂练习 2.1.1：回顾（读取文本文件，使用字典）"
    **背景：** 你正在为一个训练营管理一个数据库。在 `data` 文件夹下，有来自5个班级的学生信息。每个班级都有一个 `age.txt` 和 `gender.txt` 文件。

    1.  请读取1班的 `age.txt` 和 `gender.txt` 文件。
    2.  创建一个新的 `.txt` 文件来存储1班的信息。
    3.  为其他班级重复上述步骤。

从上面的例子中，你会注意到对于每个班级，工作都是重复的，这意味着相同的代码被多次使用。这样做有什么缺点呢？

*   容易出错
*   难以修改
*   ...

因此，我们需要学习如何抽象这个过程并将其封装到一个 **函数** 中。

### 函数的构成

函数旨在将我们从重复性工作中解放出来，从而提高效率。为了实现这一点，函数需要知道：

*   **我们想做什么**：这部分被称为 **函数体 (function body)**。
*   **它将处理哪些对象**：函数会处理不同的班级（或更普遍地说，不同的对象）。我们需要告诉它要处理哪一个。我们通过 **参数 (parameters)** 将这些随情况变化的信息传递给函数。
*   **函数的名称**：和变量一样，名称非常重要。函数也需要一个 **名称 (name)**。
*   **返回值 (return value)**：这是函数的另一个组成部分，我们稍后会讨论它。

### 函数的定义

将上述要素组合在一起，函数的 Pythonic 定义风格如下：

```python
def <函数名>(<参数列表>):
    <函数体>
    return None # 或者其他返回值
```

!!! question "课堂练习 2.1.2"
    将练习 2.1.1 中的代码整合起来，定义一个函数。

### 函数的存储与调用

一旦定义，函数就会像其他对象一样存储在内存中。尝试打印函数本身，看看会输出什么。

编程中的函数与数学中的函数类似。
在数学中，我们可能需要重复计算任意两点 P1=(𝑥₁,𝑦₁) 和 P2=(𝑥₂,𝑦₂) 之间的距离。因此，我们定义距离函数 $f(P_1, P_2) = \sqrt{(x_1-x_2)^2 + (y_1-y_2)^2}$。

我们定义函数就是为了使用它们。在 Python 中，当我们使用一个函数时，我们称之为 **调用 (call)** 函数。
在数学中，给定两个特定的点 (1,2) 和 (3,4)，我们通过将值传递给函数来评估 $f$ 函数：$f((1,2), (3,4))$。

!!! question "课堂练习 2.1.3"
    调用你刚刚定义的函数，并将其应用于2班。

!!! question "课堂练习 2.1.4"
    总结定义函数的步骤。

!!! question "课堂练习 2.1.5"
    1.  定义一个函数，计算列表中所有数字的平方。例如，如果列表是 `l = [1, 2, 3]`，函数应得到 `[1, 4, 9]`。
    2.  存储新的列表以备将来使用。

## 特殊主题 I：Python 调用栈

当函数被调用时，Python 内部会如何管理执行流程呢？这就涉及到了调用栈的概念。

**示例：观察调用栈**
以下代码使用 `inspect` 模块来查看当前的函数调用栈。

```python
import inspect

def print_stack():
    stack = inspect.stack()
    for frame_info in stack:
        print(f"Function : {frame_info.function}")
        print(f"Code context: {frame_info.code_context}")
        print("-" * 80)

def func_b():
    print_stack()

def func_a():
    func_b()

func_a()
```

!!! note "Python 函数调用过程总结"
    1.  **添加一个局部帧 (local frame)**，形成一个新的环境。
    2.  在该帧中，**将函数的形式参数绑定到其实际参数**。
    3.  在那个新的环境中 **执行函数体**。
    *(来源：Prof. John DeNero, CS61A, UCB)*

!!! question "课堂练习：特殊主题"
    1.  你如何区分函数定义和函数调用？

## 特殊主题 II：牛顿法

这是一个更偏向数学的主题。

**问题：** 给定任意函数，如何找到它的根 (root)？
牛顿法 (Newton's method) 是最常用的方法之一。其核心思想是通过迭代逼近的方式找到方程 $f(x)=0$ 的解。

!!! question "课堂练习：特殊主题"
    2.  编写一个函数，找出函数 $f(x) = 3x^2 - \sin(x) + x$ 在 $-4.5$ 附近的根。当误差小于某个预设值时，报告找到的根。

## 2.1 简单函数 (续)

### 特例 I：默认参数

在前面的牛顿法示例中，我们可以选择每次运行函数时都设置误差界限。但大多数时候，为了公平或方便，我们希望使用相同的值。
仅在少数情况下我们才想更改该值。我们可以为函数预先分配一个值，这称为 **默认参数 (default parameter)**。

```python
def greet(name, message="你好"):
    print(f"{message}, {name}!")

greet("张三")  # 使用默认的 message
greet("李四", "早上好") # 提供自定义的 message
```

!!! question "课堂练习 2.1.6"
    尝试以下代码。你发现了什么？能解释一下吗？

    ```python
    def append_to(element, to=[]):
        to.append(element)
        return to

    my_list = append_to(12)
    print(my_list)

    my_other_list = append_to(42)
    print(my_other_list)
    ```

!!! warning "注意：可变默认参数的陷阱"
    在 Python 中，函数的默认参数值在函数定义时被评估一次。如果默认参数是一个可变对象（如列表、字典），那么后续的函数调用（如果不提供该参数）将会共享并修改同一个对象。这通常不是期望的行为。
    一个常见的解决方法是将默认值设置为 `None`，并在函数体内检查并创建新的可变对象：
    ```python
    def append_to_safer(element, to=None):
        if to is None:
            to = []
        to.append(element)
        return to
    ```

### 特例 II：闭包与延迟绑定

函数可以定义在其他函数内部，并且可以访问外部函数作用域中的变量。这种现象与闭包 (closure) 相关。

!!! question "课堂练习 2.1.7"
    分析以下代码的输出，并解释原因。

    ```python
    ff = {}
    for i in range(5):
        def f():
            return i
        ff[i] = f

    # 你期望 ff[3]() 的输出是什么？实际输出是什么？
    print(f"ff[3]() outputs: {ff[3]()}") 
    
    # 思考：为什么会这样？如何修改才能让 ff[k]() 返回 k？
    ```

!!! info "解释：延迟绑定"
    在上述练习 `2.1.7` 中，循环内定义的函数 `f` 形成了一个闭包，它捕获了变量 `i`。然而，`i` 的值是在函数 `f` 被 *调用* 时才查找的，而不是在函数 `f` 被 *定义* 时。当循环结束后，`i` 的最终值是 `4`。因此，字典 `ff` 中所有的函数在被调用时，都会返回 `4`。

    要解决这个问题，可以利用默认参数在函数定义时绑定值的特性：
    ```python
    ff_corrected = {}
    for i in range(5):
        def f_corrected(val=i): # 使用默认参数来捕获当前的 i 值
            return val
        ff_corrected[i] = f_corrected

    print(f"ff_corrected[3]() outputs: {ff_corrected[3]()}")
    ```

## 2.2 命名空间与变量作用域

我们已经学习到 Python 解释器将 **名称 (names)** 绑定到 **对象 (objects)**。对象主要存在于堆内存 (heap memory) 中，而名称则存在于栈 (stack) 的帧 (frames) 中。

**命名空间 (Namespace)** 是一个字典，它告诉我们哪个名称绑定到哪个值（对象）。
Python 中有不同层次的命名空间，例如：

*   **内置命名空间 (Built-ins Namespace)**：包含 Python 内置的函数和常量，如 `print()`, `len()`, `True`, `None`。
*   **全局命名空间 (Global Namespace)**：模块级别的名称。当一个模块被导入时，会创建一个全局命名空间。
*   **包围命名空间 (Enclosing Function Locals)**：如果一个函数定义在另一个函数内部（嵌套函数），内部函数可以访问外部（包围）函数的命名空间。
*   **局部命名空间 (Local Namespace)**：函数调用时创建的命名空间，包含函数内部定义的名称（参数和局部变量）。

理解这些命名空间以及 Python 如何查找名称（即 **作用域规则 LEGB：Local -> Enclosing -> Global -> Built-in**）对于编写正确的代码至关重要。

我们继续讨论函数的一些特殊情况和高级用法。

### 2.1.5 默认参数 (续)
在少数情况下，我们会希望改变预分配给函数的默认参数值。

!!! note "回顾：默认参数"
    我们为函数参数预先分配一个值，这被称为默认参数。通常，默认参数在函数定义时被评估一次。

### 2.1.6 简单函数 (特殊情况 I：可变默认参数的陷阱)

!!! question "课堂练习 2.1.6：可变默认参数的意外行为"
    请尝试运行以下代码。你发现了什么？能解释原因吗？
    ```python
    def append_to(element, to=[]):
        to.append(element)
        return to

    my_list = append_to(12)
    print(my_list)

    my_other_list = append_to(42)
    print(my_other_list)
    ```

!!! note "关键概念：可变默认参数"
    当函数的默认参数是一个可变对象（如列表、字典）时，这个默认对象会在函数定义时被创建一次，并且在后续所有未提供该参数的调用中共享。这意味着对这个默认对象的修改会影响到后续的调用。
    在上面的例子中，`my_list` 和 `my_other_list` 最终会指向同一个列表对象，因为它们都使用了默认的 `to=[]`。第一次调用 `append_to(12)` 后，`to` 变为 `[12]`。第二次调用 `append_to(42)` 时，它继续在已经变为 `[12]` 的同一个列表上操作，因此 `to` 变为 `[12, 42]`。
    要避免这种情况，通常的做法是将默认值设为 `None`，然后在函数内部检查并创建新的可变对象：
    ```python
    def append_to_safer(element, to=None):
        if to is None:
            to = []
        to.append(element)
        return to
    ```

### 2.1.7 简单函数 (特殊情况 II：闭包与延迟绑定)

!!! question "课堂练习 2.1.7：闭包中的变量捕获"
    观察以下代码的输出，并思考其原因。
    ```python
    ff = {}
    for i in range(5):
        def f():
            return i
        ff[i] = f

    print(ff[0]())
    print(ff[1]())
    print(ff[2]())
    print(ff[3]())
    print(ff[4]())
    # 尝试调用 ff[3]() 会输出什么？
    # print(ff[3]())
    ```
    你会发现所有函数调用都返回循环结束时 `i` 的最终值。

!!! note "关键概念：闭包与延迟绑定 (Late Binding)"
    在Python中，当你在一个循环内部定义函数（形成闭包）并且该函数引用了循环变量时，闭包并不会在定义时捕获循环变量的当前值。相反，它会捕获对该变量的引用。因此，当这些闭包函数稍后被调用时，它们会查找到该变量在它们被调用那一刻的值。在上面的例子中，当循环完成时，`i` 的值是 `4`。所以，无论你调用 `ff` 字典中的哪个函数，它都会返回 `4`。
    如果想让每个函数捕获定义时 `i` 的值，可以使用默认参数技巧：
    ```python
    ff_fixed = {}
    for i in range(5):
        def f_fixed(val=i): # 使用默认参数捕获当前 i 的值
            return val
        ff_fixed[i] = f_fixed

    print(ff_fixed[0]()) # 输出 0
    print(ff_fixed[3]()) # 输出 3
    ```

## 2.2 命名空间与变量作用域

我们已经学习到 Python 解释器会将名称（变量名、函数名等）绑定到对象。对象主要存在于堆内存中，而名称则主要存在于栈帧中。

**命名空间 (Namespace)** 是一个从名称到对象的映射，可以理解为一个字典，告诉我们哪个名称绑定到哪个值。Python 中有几种主要的命名空间：
*   **内置命名空间 (Built-in)**：包含所有 Python 内置函数和常量，如 `len()`, `True`, `Exception` 等。
*   **全局命名空间 (Global)**：包含模块级别定义的名称。当一个模块被导入时，会为其创建一个全局命名空间。
*   **包围命名空间 (Enclosing/Nonlocal)**：存在于嵌套函数中，指外部函数（包围函数）的命名空间。
*   **局部命名空间 (Local)**：包含函数内部定义的名称。当函数被调用时，会为其创建一个局部命名空间。

与命名空间相关的一个概念是**作用域 (Scope)**，它描述了一个对象可以被自由访问的代码区域。

### 2.2.1 命名空间探查

!!! question "课堂练习 2.2.1.1：变量交换与命名空间分析"
    1.  编写一个函数来交换两个变量的值。例如，初始时 `a, b = 1, 2`，交换后 `a` 应该是 `2`，`b` 应该是 `1`。
        ```python
        # 提示：Pythonic 的交换方式
        # a, b = b, a
        ```
    2.  分析你编写的函数（或者下面的示例函数）中的变量名。检查这些名称在不同命名空间中的存在情况。
        ```python
        import builtins

        # 查看内置命名空间的类型和内容
        print(type(builtins))
        # print(dir(builtins)) # 内容较多，可以按需取消注释

        # 查看当前模块（全局）命名空间的内容
        # print(dir(globals())) # 在脚本顶层，globals() 返回模块的命名空间
                               # 在函数内部，globals() 依然返回模块的命名空间

        x = 10 # 全局变量
        y = 20 # 全局变量

        def swap_and_show_scopes(a, b):
            global x # 声明我们将修改全局变量 x
            local_var = 5 # 局部变量

            print(f"初始时: a={a}, b={b}, x={x}, local_var={local_var}")
            
            # 交换 a 和 b (在函数局部作用域内)
            a, b = b, a
            x = 30 # 修改全局变量 x
            
            print(f"交换后: a={a}, b={b}, x={x}, local_var={local_var}")
            
            print("--- 命名空间探查 ---")
            print("局部命名空间 (locals()):")
            print(locals()) # 显示函数内部的局部命名空间
            print("全局命名空间 (globals() - 部分):")
            # globals() 返回整个模块的字典，通常很大，只展示关注的变量
            global_namespace = globals()
            print({k: global_namespace[k] for k in ['x', 'y', 'swap_and_show_scopes'] if k in global_namespace})
            
            return a, b

        new_a, new_b = swap_and_show_scopes(1, 2)
        print(f"函数外部: new_a={new_a}, new_b={new_b}, x={x}, y={y}")
        # print(local_var) # 这会报错，因为 local_var 只在函数作用域内有效
        ```

!!! question "课堂练习 2.2.1.2：检查局部命名空间"
    你如何检查一个函数内部的局部命名空间中的对象？
    
    !!! info "答案"
        使用 `locals()` 函数。它返回一个表示当前局部符号表的字典。

### 2.2.2 变量作用域 (LEGB 规则)

当 Python 解释器需要查找一个名称（变量）时，它会按照特定的顺序搜索不同的命名空间，这个顺序通常被称为 **LEGB 规则**：

1.  **L (Local)**：局部作用域。首先在当前函数或代码块内部查找。
2.  **E (Enclosing function locals)**：包围函数作用域。如果当前函数是嵌套函数，则在其外部（包围）函数的局部作用域中查找。
3.  **G (Global)**：全局作用域。在当前模块的顶层定义的名称。
4.  **B (Built-in)**：内置作用域。Python 预定义的名称。

解释器会按 LEGB 顺序查找，一旦找到该名称，搜索就会停止。

*   **Modules**：模块有其自身的全局作用域。
*   **Nested functions**：嵌套函数引入了包围作用域的概念。
*   **`global` 关键字**：允许在函数内部修改全局作用域中的变量。
*   **`nonlocal` 关键字**：允许在嵌套函数内部修改其包围函数作用域中的变量（非全局，非局部）。

!!! question "课堂练习 2.2.2.1：变量名覆盖内置函数"
    以下代码会输出什么？我们如何使其恢复“正常”（即让 `max` 恢复其内置行为）？
    ```python
    print(max(1, 2))
    max = min # 这里 max 被重新赋值
    # print(max(1, 2)) # 再次调用 max 会发生什么？
    ```
    如何恢复？
    1.  `del max`：如果 `max` 是在当前作用域（例如全局）定义的，删除它会使得 Python 重新在内置作用域找到 `max`。
    2.  明确调用 `builtins.max`：`print(builtins.max(1,2))`

!!! note "变量作用域的一个更复杂示例"
    ```python
    x = "global x"

    def outer_func():
        # nonlocal x # 如果试图在这里用 nonlocal x 会报错，因为 x 不在包围作用域，而在全局作用域
        y = "outer y"
        
        def inner_func():
            global x  # 声明要修改全局变量 x
            nonlocal y # 声明要修改包围函数 outer_func 中的变量 y
            
            z = "inner z" # 局部变量
            
            x = "modified global x by inner_func"
            y = "modified outer y by inner_func"
            
            print(f"Inside inner_func: x='{x}', y='{y}', z='{z}'")

        inner_func()
        print(f"Inside outer_func (after inner_func call): y='{y}'")

    outer_func()
    print(f"Globally (after outer_func call): x='{x}'")
    # print(y) # 报错，y 不是全局变量
    # print(z) # 报错，z 不是全局变量
    ```
    这个例子展示了 `global` 和 `nonlocal` 关键字如何影响变量的查找和修改。

!!! question "课堂练习 2.2.2.2：变量作用域的意义"
    1.  Python 如何计算对象的引用次数？
        *   **提示**：避免不必要的全局变量。全局变量的生命周期长，可能导致命名冲突和难以追踪的副作用。作用域有助于管理变量的生命周期和可见性，从而间接帮助引用计数机制（当变量离开作用域且没有其他引用时，对象可能被回收）。
    2.  你如何修改“特殊情况 II”（课堂练习 2.1.7，闭包与延迟绑定）中的函数工厂，使其按预期工作？
        *   **提示**：使用默认参数捕获值，或者使用 `nonlocal` (如果适用，但在这个特定例子中默认参数更直接)。
        ```python
        # 回顾课堂练习 2.1.7 的修复方案
        # ff_fixed = {}
        # for i in range(5):
        #     def f_fixed(val=i): # 使用默认参数捕获当前 i 的值
        #         return val
        #     ff_fixed[i] = f_fixed
        ```
    3.  你如何向全局函数隐藏信息（即封装）？
        *   **提示**：遵循 LEGB 规则。将变量定义在局部或包围作用域中，可以使其不被全局作用域直接访问，从而实现信息隐藏。类也是实现封装的重要机制。

## 2.3 函数是一等公民 (First-class Objects)

在 Python 中，函数是**一等公民 (First-class objects)**。这意味着函数可以像其他任何对象（如整数、字符串、列表）一样被对待：
*   可以被赋值给变量。
*   可以作为元素存储在数据结构中（如列表、字典）。
*   可以作为参数传递给其他函数。
*   可以作为其他函数的返回值。

当我们使用一个函数作为另一个“更高级别”函数的参数或返回值时，我们就在使用**高阶函数 (Higher-order functions)**。

### 2.3.1 函数作为返回值

这通常用于创建闭包或函数工厂。
```python
def intercept_factory(intercept):
    a = intercept  # a 被内部函数 slope_func 捕获，形成闭包
    def slope_func(x, slope=2): # 也可以让斜率可配置
        return slope * x + a
    return slope_func

# 创建一个 y = 2x + 1 的函数
linear_func_intercept_1 = intercept_factory(1) 
print(linear_func_intercept_1(3)) # 输出 2*3 + 1 = 7

# 创建一个 y = 2x + 5 的函数
linear_func_intercept_5 = intercept_factory(5)
print(linear_func_intercept_5(3)) # 输出 2*3 + 5 = 11

# 创建一个 y = 3x + 5 的函数
custom_slope_func = intercept_factory(5)
print(custom_slope_func(3, slope=3)) # 输出 3*3 + 5 = 14
```

### 2.3.2 函数作为参数

这允许我们将行为作为数据传递，实现回调、策略模式等。
```python
def call_count(func_to_call, count_tracker=[0]): # 使用可变默认参数来追踪调用次数 (有其陷阱，见2.1.6)
    count_tracker[0] += 1
    print(f"调用第 {count_tracker[0]} 次: ", end="")
    func_to_call() # 调用传入的函数

call_count(print) # 实际上 print() 需要参数，这里会隐式打印换行
# 为了让 print 有意义，我们可以用 lambda
call_count(lambda: print("Hello from lambda!"))
call_count(lambda: print("Another call!"))

# 更安全的计数器版本
def call_count_safer(func_to_call, counter_obj):
    counter_obj['count'] += 1
    print(f"调用第 {counter_obj['count']} 次: ", end="")
    func_to_call()

my_counter = {'count': 0}
call_count_safer(lambda: print("Safer call 1"), my_counter)
call_count_safer(lambda: print("Safer call 2"), my_counter)
```

!!! question "课堂练习 2.3.1：高阶函数修改"
    1.  修改“函数作为返回值”的代码示例 (即 `intercept_factory`)，使得我们可以自由选择截距 `intercept`。（原示例已实现）
    2.  进一步修改该示例，使得我们也可以自由选择斜率 `slope`。（原示例已部分实现，通过 `slope_func` 的参数）
        ```python
        # 完整可配置版本
        def line_factory(slope, intercept):
            def line_function(x):
                return slope * x + intercept
            return line_function

        my_line = line_factory(slope=3, intercept=5) # y = 3x + 5
        print(f"y = 3*2 + 5 is {my_line(2)}")
        ```
    3.  修改“函数作为参数”的代码示例 (即 `call_count`)，使其不需要默认参数来追踪计数（提示：可以将计数器作为参数传入或使用类的实例）。（已在 `call_count_safer` 中展示了一种方法）

### 2.3.3 函数作为对象 (特殊情况 III): `*args` 与 `**kwargs`

在 `call_count` 示例中，我们可以将一个函数作为参数传递。但是，被调用的函数（如 `print`）如果需要它自己的参数，我们之前的简单 `call_count` 版本就无法很好地处理。

考虑一个场景：我们希望 `call_count` 能够调用任何函数，并传递给该函数任意数量的位置参数和关键字参数。

```python
# 初步尝试：固定参数传递
# def call_count_with_arg(func, arg_to_called, x=[0]): # x 依然是可变默认参数陷阱
#     x[0] += 1
#     print(f"调用第 {x[0]} 次:")
#     func(arg_to_called)

# my_counter_list = [0] # 外部计数器
# call_count_with_arg(print, "hello", my_counter_list)
# call_count_with_arg(print, "python", my_counter_list)
# call_count_with_arg(print, "world", my_counter_list)
```
这个版本只能传递一个固定参数。如果被调用函数需要不同数量或类型的参数，这种方式就不够灵活。

#### `*args`：收集位置参数

当我们不确定要给函数传递多少个**位置参数**时，可以使用 `*args`。星号 `*` 在这里是**解包 (unpacking)** 或 **打包 (packing)** 操作符。
*   在函数定义中，`*args` 会将所有多余的未命名（位置）参数打包成一个元组 (tuple)。
*   在函数调用中，`*some_iterable` 会将可迭代对象 `some_iterable` 解包成独立的位置参数。

!!! question "课堂练习 2.3.2：星号操作符的解包行为"
    下面的代码片段中，星号操作符是如何工作的？它们有何不同？
    ```python
    a = 1, 2, 3       # a 是一个元组 (1, 2, 3)
    print(f"a: {a}, type: {type(a)}")

    a, b, c = 1, 2, 3 # 多重赋值: a=1, b=2, c=3
    print(f"a: {a}, b: {b}, c: {c}")

    # a, b = 1, 2, 3    # 这会引发 ValueError: too many values to unpack (expected 2)

    a, *b, c = 1, 2, 3, 4, 5 # 星号用于收集多余的值
                           # a=1, b=[2, 3, 4], c=5
    print(f"a: {a}, b: {b} (type: {type(b)}), c: {c}")
    ```

!!! question "课堂练习 2.3.3：总结星号解包模式"
    通过思考以下例子来总结星号的解包模式：
    ```python
    # *a, b = 1, 2, 3, 4, 5
    # print(f"*a, b: a={a}, b={b}") # a=[1, 2, 3, 4], b=5

    # a, *b = 1, 2, 3, 4, 5
    # print(f"a, *b: a={a}, b={b}") # a=1, b=[2, 3, 4, 5]

    # *a, *b = 1, 2, 3, 4, 5 # 这会引发 SyntaxError: two starred expressions in assignment

    # *a, b, c = 1, 2, 3, 4, 5
    # print(f"*a, b, c: a={a}, b={b}, c={c}") # a=[1, 2, 3], b=4, c=5
    
    # *a, b = 1 # 这会引发 TypeError，因为 b 没有值可分配
    # 需要至少一个元素给 b，剩下的给 a
    # *a, b = [1] # 错误
    
    # *a, b = [1,2] # a=[1], b=2
    # print(f"*a, b from [1,2]: a={a}, b={b}")
    ```
    **总结**：在赋值语句的左侧，带星号的变量会收集所有未被其他变量匹配的值，并以列表形式存储。一个赋值表达式中最多只能有一个带星号的变量。

!!! note "使用 `*args` 传递不定数量参数"
    注意，在函数定义中 `args` (不带星号) 是一个元组，而 `*args` (带星号) 在函数调用时用于解包这个元组，将其元素作为独立参数传递。
    将不定数量的参数传递给函数通常涉及两个步骤：
    1.  在函数定义中，使用 `*args` 将传入的多个位置参数**打包**成一个元组。
    2.  如果需要将这个元组再传递给另一个函数，并且希望这些元素作为独立参数被接收，则在调用另一个函数时使用 `*args` **解包**这个元组。

    ```python
    def call_count_flexible_args(func_to_call, *args_for_func, counter_obj={'count':0}):
        counter_obj['count'] += 1
        print(f"调用第 {counter_obj['count']} 次:")
        # *args_for_func 在这里解包，将元组内的元素作为独立参数传给 func_to_call
        func_to_call(*args_for_func) 

    # 使用 print 函数，它接受多个参数
    call_count_flexible_args(print, "hello", "python", "world")
    call_count_flexible_args(print, "Value:", 42, "Status:", True)

    # 为了让 print 的 sep 参数生效，可以把它作为关键字参数传入
    # 或者修改 call_count_flexible_args 来处理关键字参数（见下一节 **kwargs）
    # 如果 print 的 sep 是被 call_count_flexible_args 内部调用时指定的：
    def call_count_flexible_args_with_sep(func_to_call, *args_for_func, counter_obj={'count':0}):
        counter_obj['count'] += 1
        print(f"调用第 {counter_obj['count']} 次:")
        # 假设 func_to_call 是 print，我们可以硬编码 sep
        if func_to_call == print:
             func_to_call(*args_for_func, sep=", ") # 这里 sep 是 print 的参数
        else:
             func_to_call(*args_for_func)

    call_count_flexible_args_with_sep(print, "hello", "python", "world")
    ```

#### `**kwargs`：收集关键字参数

另一类参数是**关键字参数 (keyword arguments)**，它们必须以 `param_name=value` 的形式传递给函数。这些是命名参数。
与 `*args` 解包列表或元组不同，我们使用 `**kwargs` 来处理不定数量的关键字参数。
*   在函数定义中，`**kwargs` 会将所有未匹配到形式参数的关键字参数打包成一个字典。
*   在函数调用中，`**some_dict` 会将字典 `some_dict` 解包成独立的关键字参数。

```python
# 字典解包示例
dict1 = {"a": 1, "b": 2, "c": 3}
dict2 = {"d": 4, "e": 5, "f": 6}
combined_dict = {**dict1, **dict2} # Python 3.5+
print(combined_dict)
# 输出: {'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6}
```

#### `*args` 和 `**kwargs` 的顺序

在函数定义和调用时，参数的顺序非常重要：
1.  **标准位置参数**
2.  `*args` (任意数量的位置参数)
3.  **标准关键字参数** (可以有默认值)
4.  `**kwargs` (任意数量的关键字参数)

!!! note "参数顺序规则"
    *   在函数调用时，未命名的参数（位置参数）必须在关键字参数之前传递。
    *   在函数定义时，带有默认值的参数必须在没有默认值的参数之后。`*args` 必须在普通参数之后，`**kwargs` 必须在 `*args` (如果存在) 或普通参数之后。

    正确的函数定义顺序示例：
    `def func(pos1, pos2, default_arg1="default", *args, kw_only1, kw_only2="val", **kwargs):`

!!! question "课堂练习 2.3.4：处理任意关键字参数"
    请注意，`**kwargs` 实际上是解包一个字典，也就是说，`kwargs` 本身是一个字典对象。我们知道字典有键 (keys) 和值 (values)。
    请阅读关于命名参数的文档（通常与函数定义和调用相关，`**kwargs` 是其一部分）。
    编写一个函数，该函数接受任意数量的关键字参数，并打印出每个参数的名称和值。

    ```python
    def process_kwargs(**kwargs):
        print("收到的关键字参数:")
        if not kwargs:
            print("  (无)")
            return
            
        for key, value in kwargs.items():
            print(f"  参数名: {key}, 值: {value}")

    # 测试
    process_kwargs(name="Alice", age=30, city="New York")
    process_kwargs(item="laptop", price=1200.99, currency="USD", in_stock=True)
    process_kwargs() # 不传递任何关键字参数
    ```

结合 `*args` 和 `**kwargs`，我们可以创建非常通用的高阶函数，例如装饰器。
```python
def universal_call_logger(func_to_call, *args, **kwargs):
    # args 是一个元组，kwargs 是一个字典
    print(f"准备调用函数: {func_to_call.__name__}")
    print(f"  位置参数: {args}")
    print(f"  关键字参数: {kwargs}")
    
    # 调用原始函数，并传递捕获到的所有参数
    result = func_to_call(*args, **kwargs)
    
    print(f"函数 {func_to_call.__name__} 调用完毕，返回: {result}")
    return result

# 示例函数
def greet(name, greeting="Hello"):
    message = f"{greeting}, {name}!"
    print(message)
    return len(message)

# 使用通用调用器
universal_call_logger(greet, "Bob") 
print("-" * 20)
universal_call_logger(greet, "Charlie", greeting="Hi")
print("-" * 20)
universal_call_logger(print, "This will be printed", "with multiple args.", sep="---")
```

## 2.3 函数作为对象 (特殊情况 III) (续)

### 命名参数与字典解包

以 `param=arg` 形式传递给函数的参数称为**命名参数** (named arguments)。

与使用 `*` 来解包 (unpack) 列表或元组不同，我们使用 `**` 来解包字典。相较于列表解包，字典解包的使用场景要少一些。

下面是一个使用 `**` 合并字典的例子：

```python
dict1 = {"a": 1, "b": 2, "c": 3}
dict2 = {"d": 4, "e": 5, "f": 6}
combined_dict = {**dict1, **dict2}
print(combined_dict)
# 预期的输出: {'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6}
```

### `*args` 和 `**kwargs` 的顺序

在函数定义和调用中，关于 `*args` (接收任意数量的位置参数) 和 `**kwargs` (接收任意数量的关键字参数) 的顺序，有一条重要的规则：

*   在函数调用时，**未命名的参数 (位置参数) 必须在关键字参数之前传递**。
*   类似地，在定义函数时，**带默认值的参数必须跟在没有默认值的参数之后** (针对普通参数和仅关键字参数)。同时，`*args` 必须在 `**kwargs` 之前。

!!! note "关键概念：函数参数顺序"
    在定义函数时，参数的总体顺序通常遵循：
    1.  标准位置参数 (没有默认值)。
    2.  带默认值的标准位置参数。
    3.  `*args` (用于收集多余的位置参数)。
    4.  仅关键字参数 (keyword-only arguments)，可以有或没有默认值 (没有默认值的必须在前)。
    5.  `**kwargs` (用于收集多余的关键字参数)。

    简单来说：位置参数 -> `*args` -> 关键字参数/`**kwargs`。

### 课堂练习 2.3.4：`**kwargs` 的使用

!!! question "课堂练习：计算命名参数的总和"
    我们知道 `**kwargs` 实际上是在解包一个字典，这意味着在函数内部，`kwargs` 本身就是一个字典。我们已经学习过，字典由键 (keys) 和值 (values) 组成。

    可以查阅 Python 官方文档中关于字典和关键字参数的说明：
    [Python 官方文档 - 字典类型 (dict)](https://docs.python.org/3/library/stdtypes.html#dict)
    (特别关注映射解包和函数调用中 `**` 的使用部分)

    请编写一个函数 `sum_of_kwargs`，该函数能够接收若干个命名参数 (参数的数量和名称在调用前是未知的)，并计算这些命名参数对应的值的总和。

    例如：
    ```python
    def sum_of_kwargs(**kwargs):
        # 请在此处实现函数逻辑
        total = 0
        for value in kwargs.values():
            total += value
        return total

    # 预期调用方式和结果：
    result = sum_of_kwargs(Alice=5, Bob=3, Charlie=4)
    print(f"Sum of kwargs: {result}") # 应输出 12

    result2 = sum_of_kwargs(x=10, y=20, z=30, name="Test") # 如果参数值不全是数字，需要处理或说明
    # 对于这个练习，我们假设所有传入的命名参数的值都是数字
    # 如果要处理非数字，可以添加类型检查和错误处理
    # print(f"Sum of kwargs (mixed): {result2}") # 如果上面的函数不做修改，这里会报错
    
    # 仅对数字求和的更健壮版本示例：
    def sum_of_numeric_kwargs(**kwargs):
        total = 0
        for key, value in kwargs.items():
            if isinstance(value, (int, float)): # 只对整数和浮点数求和
                total += value
            else:
                print(f"Warning: Argument '{key}' with value '{value}' is not numeric and will be skipped.")
        return total
        
    result_numeric = sum_of_numeric_kwargs(Alice=5, Bob=3, Charlie=4, David="ignoreme", Score=9.5)
    print(f"Sum of numeric kwargs: {result_numeric}") # 应输出 5 + 3 + 4 + 9.5 = 21.5
    ```
    **任务：请实现 `sum_of_kwargs` 函数，使其能够正确处理类似 `sum_of_kwargs(Alice=5, Bob=3, Charlie=4)` 的调用并返回其数值总和。**

## 工具的组合与创造

!!! quote "思想启发：工具的组合与创造"
    工具的组合 (The assembly of tools)
    <br>
    工具的创造 (The creation of tools)
    <br>
    <small>来源：[《2001太空漫游》50年：库布里克如何定义未来 - 纽约时报中文网](https://cn.nytimes.com/culture/20180515/2001-a-space-odyssey-kubrick/)</small>

