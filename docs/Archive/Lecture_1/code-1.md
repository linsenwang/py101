# Code 1

本笔记回顾了 Python 中的一些核心概念，包括条件语句、循环、数据类型特性、迭代协议、文件处理和字符串操作等。

## 1. 条件语句 (Conditional Statements)

条件语句允许我们根据特定条件是否为真来执行不同的代码块。Python 使用 `if`, `elif` (else if), 和 `else` 关键字来构建条件逻辑。

```python
if 2 > 3:
    print("wrong")
```

```
2 > 3
```

```
False
```

```python
if 3 > 2:
    print("right")
```

```
right
```

```python
a = 1
```

```python
if a < 2:
    print("right")
```

```
right
```

```python
a = 1
```

```python
if a == 2:
    print("a = 2")
```

上述代码片段演示了基本的 `if` 语句。首先，`2 > 3` 是一个布尔表达式，其结果为 `False`，因此 `if` 语句块内的 `print("wrong")` 不会执行。相反，`3 > 2` 的结果为 `True`，所以 `print("right")` 会被执行。接着，变量 `a` 被赋值为 `1`。在条件 `a < 2` 中，由于 `1 < 2` 为真，`print("right")` 被执行。而在最后的例子中，`a == 2` (即 `1 == 2`) 为假，因此 `print("a = 2")` 不会执行。这些例子清晰地展示了条件判断如何控制程序的执行流程。

!!! note "关键概念"
    **布尔表达式 (Boolean Expressions):** 在 `if` 语句中，条件部分是一个布尔表达式，其求值结果为 `True` 或 `False`。
    **代码块 (Code Blocks):** Python 通过缩进来定义代码块。在 `if` 语句之后，缩进的代码行属于该条件为真时执行的块。

## 2. 循环与条件组合 (Loops and Combined Conditions)

循环结构用于重复执行一段代码。`for` 循环常用于遍历序列（如列表、元组、字符串）或其他可迭代对象。在循环内部，可以嵌套条件语句来根据元素的特性执行特定操作，并使用逻辑运算符 `and`、`or`、`not` 组合多个条件。

```python
l = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
for ele in l:
    if int(ele ** 0.5) ** 2 == ele and ele % 2 != 0: # or and
        print(ele)
```

```
1
9
```

这段代码遍历列表 `l` 中的每个元素 `ele`。对于每个元素，它检查两个条件是否同时满足：
1.  `int(ele ** 0.5) ** 2 == ele`: 这个条件判断 `ele` 是否是一个完全平方数。它首先计算 `ele` 的平方根 (`ele ** 0.5`)，然后将其转换为整数 (`int(...)`)，再平方这个整数。如果结果与原始 `ele` 相等，说明 `ele` 是一个完全平方数（例如，对于9，`int(3.0)**2 == 9`）。
2.  `ele % 2 != 0`: 这个条件判断 `ele` 是否是一个奇数（即 `ele` 除以2的余数不为0）。
只有当两个条件都为 `True` 时（由 `and` 连接），`print(ele)` 才会执行。因此，输出结果是列表 `l` 中既是奇数又是完全平方数的数字，即 `1` 和 `9`。注释 `# or and` 提示了逻辑运算符的使用。

## 3. 相等性 (`==`) 与同一性 (`is`) (Equality vs. Identity)

在 Python 中，比较两个对象时，需要区分它们的值是否相等 (`==`) 和它们是否是同一个对象 (`is`)。

```python
a = 1 # 假设 a 之前被赋值为 1
a == 1
```

```
True
```

```python
a = 500
b = a
a == b
```

```
True
```

```python
a is b
```

```
True
```

```python
a = 500
b = 500
a == b
```

```
True
```

```python
a is b # id(a) == id(b)
```

```
False
```

首先，`a == 1` 检查变量 `a` 的值是否等于 `1`。
接着，`a` 被赋值为 `500`，然后 `b = a`。此时，`b` 和 `a` 指向内存中同一个对象。因此，`a == b` (值相等) 和 `a is b` (是同一个对象) 都返回 `True`。
然而，当 `a` 和 `b` 分别被赋值为 `500` (`a = 500`, `b = 500`) 时，情况有所不同。虽然它们的值相等 (`a == b` 返回 `True`)，但 Python 可能会为这两个 `500` 创建不同的对象（特别是对于超出特定范围的整数）。因此，`a is b` 返回 `False`，表示它们是内存中两个独立的对象，尽管它们的值相同。注释 `# id(a) == id(b)` 提示 `is` 实际上是比较对象的内存地址 (`id()`)。

!!! note "关键概念：Python 整数缓存"
    Python 会缓存一小部分整数（通常是 -5 到 256）。在这个范围内的整数，无论创建多少次，都会指向同一个对象，因此 `is` 比较会返回 `True`。超出这个范围的整数，Python 可能会创建新的对象，即使它们的值相同。`500` 通常超出了这个缓存范围。

## 4. `None` 类型与布尔上下文 (The `None` Type and Boolean Context)

`None` 是 Python 中的一个特殊常量，表示空值或无值。它是一个单例对象，即所有对 `None` 的引用都指向同一个对象。在布尔上下文中，`None` 被视作 "falsy" 值。

```python
a = None
b = None # True False -- singularity
a is not b
```

```
False
```

```python
if None: # if 0: if False:
    print("nothing")
```

在第一个代码块中，`a` 和 `b` 都被赋值为 `None`。由于 `None` 是单例对象，`a` 和 `b` 实际上指向内存中完全相同的对象。因此，`a is b` 为 `True`，而 `a is not b` 为 `False`。注释 `# True False -- singularity` 指的是 `None`、`True` 和 `False` 都是单例。
在第二个代码块中，`if None:` 判断 `None` 的布尔值。在 Python 中，`None`、`0`（任何数字类型的零）、空序列（如 `[]`, `()`, `""`）、空映射（如 `{}`）和 `False` 本身在布尔上下文中都被认为是假 (`False`)。因此，条件 `if None:` 为假，`print("nothing")` 不会执行。注释 `# if 0: if False:` 提供了其他 "falsy" 值的例子。

## 5. 链式比较 (Chained Comparisons)

Python 允许将多个比较操作符串联起来，形成链式比较。这种写法更接近数学表达，并且比用 `and` 连接多个独立比较更简洁。

```python
a, b, c, d, e = 1, 4, 3, 3, 5 # k, v
a < b > c == d != e # (a < b) and (b > c) and (c == d) and (d != e)
```

```
True
```

首先，通过多重赋值，变量 `a, b, c, d, e` 分别被赋予值 `1, 4, 3, 3, 5`。
然后，链式比较 `a < b > c == d != e` 被执行。这等同于 `(a < b) and (b > c) and (c == d) and (d != e)`。
让我们逐步分解：
- `a < b` 是 `1 < 4`，为 `True`。
- `b > c` 是 `4 > 3`，为 `True`。
- `c == d` 是 `3 == 3`，为 `True`。
- `d != e` 是 `3 != 5`，为 `True`。
由于所有子比较都为 `True`，整个链式比较的结果也是 `True`。注释 `# (a < b) and (b > c) and (c == d) and (d != e)` 准确地解释了其等价的逻辑。

## 6. 集合操作与迭代陷阱 (Collection Operations and Iteration Pitfalls)

在遍历集合（如列表或字典）的同时修改它，可能会导致意外的行为或错误。

### 6.1 修改字典时的 `RuntimeError`

```python
d1 = {'a': [1], 'b': [1, 2], 'c': [], 'd':[]}
d1
```

```
{'a': [1], 'b': [1, 2], 'c': [], 'd': []}
```

```python
d1.pop('d')
```

```
[]
```

```python
d1
```

```
{'a': [1], 'b': [1, 2], 'c': []}
```

```python
for i in d1: # loop over
    # if d[i] ==  []:
    if not d1[i]: # Check if the list associated with key i is empty
        d1.pop(i)
```

```
Error Type: RuntimeError
Error Message: dictionary changed size during iteration
---------------------------------------------------------------------------
RuntimeError                              Traceback (most recent call last)
Cell In[113], line 1
----> 1 for i in d1: # loop over
      2     # if d[i] ==  []:
      3     if not d1[i]:
      4         d1.pop(i)

RuntimeError: dictionary changed size during iteration
```

这段代码首先创建了一个字典 `d1`，并使用 `pop('d')` 方法移除了键为 `'d'` 的项。然后，它尝试遍历字典 `d1`，并在遍历过程中移除值为空列表的项（例如，键 `'c'` 对应的值 `[]`）。`if not d1[i]` 是一种简洁的判断列表是否为空的方式。然而，在遍历字典的同时修改它（通过 `d1.pop(i)`) 会导致 `RuntimeError: dictionary changed size during iteration`。这是因为迭代器期望在迭代过程中集合的大小保持不变。

!!! warning "注意事项：迭代时修改集合"
    直接在 `for` 循环中修改正在迭代的字典或列表（例如，通过添加或删除元素）通常是不安全的，可能导致 `RuntimeError` 或跳过某些元素。安全的做法是先收集需要修改的键或索引，然后在循环结束后再进行修改，或者迭代集合的副本来进行修改。

### 6.2 修改列表时的潜在问题

```python
d1 = [1, 2, 3, 0, 5] # Note: d1 is now a list, not a dictionary
for i in range(4):
    if not d1[i]: # Check if the element at index i is "falsy" (e.g., 0)
        d1.pop(i)
d1
```

```
[1, 2, 3, 5]
```
在这个例子中，`d1` 是一个列表。代码使用 `range(4)` 来迭代索引 `0, 1, 2, 3`。当 `i` 为 `3` 时，`d1[3]` 是 `0`，条件 `not d1[3]` (即 `not 0`) 为真，于是 `d1.pop(3)` 被执行，移除了元素 `0`。列表 `d1` 变为 `[1, 2, 3, 5]`。
虽然这个特定的例子没有抛出错误并且似乎得到了预期的结果（移除了 `0`），但这种在迭代原始索引范围时通过 `pop(i)` 修改列表长度和元素位置的方法通常是危险的。如果列表中有多个需要移除的元素，或者移除操作改变了后续待检查元素的索引，就可能跳过某些元素的检查。例如，如果列表是 `[0, 0, 1]`，`range(len(original_list))`，第一次 `pop(0)` 后，第二个 `0` 会移动到索引 `0`，但下一次迭代 `i` 会变成 `1`，从而跳过了新的 `d1[0]`。

!!! question "思考题"
    如果想安全地从列表中移除满足特定条件的元素，有哪些更好的方法？
    (提示：考虑迭代副本、使用列表推导式创建新列表，或从后向前迭代。)

## 7. 文件处理与 JSON (File Handling and JSON)

Python 提供了内置功能来处理文件和解析常用数据格式（如 JSON）。

```python
import json # no need to pip instlal or conda install
# context manager
with open("E:/2025S Python/slides\\settings.json", "r") as f: # f: file
    setting_dict = json.load(f)
```

```python
import os
os.getcwd() # current working directory
```

```
'e:\\2025S Python\\inclass notes'
```

```python
setting_dict # Output will depend on the content of 'settings.json'
```

```
{'workbench.colorTheme': 'Dark',
 'editor.fontSize': 24,
 'python.defaultInterpreterPath': 'python.exe',
 'security.workspace.trust.untrustedFiles': 'open',
 'editor.quickSuggestions': {'other': 'on',
  'comments': 'off',
  'strings': 'off'},
 'editor.acceptSuggestionOnEnter': 'smart',
 'workbench.colorCustomizations': {'scrollbarSlider.background': '#00ff40',
  'scrollbarSlider.hoverBackground': '#00ff40',
  'scrollbarSlider.activeBackground': '#00ff40'},
 'terminal.integrated.commandsToSkipShell': ['matlab.interrupt'],
 'editor.tabSize': 4}
```

这段代码演示了几个核心概念：
1.  **`import json`**: 导入 `json` 模块，它用于处理 JSON (JavaScript Object Notation) 数据。JSON 是一种轻量级的数据交换格式，易于人阅读和编写，也易于机器解析和生成。
2.  **`with open(...) as f:`**: 这是 Python 中推荐的文件操作方式，称为上下文管理器。`open("E:/2025S Python/slides\\settings.json", "r")` 以只读模式 (`"r"`) 打开指定路径的文件。`as f` 将打开的文件对象赋给变量 `f`。上下文管理器的主要优点是它能确保文件在代码块执行完毕后（无论是否发生异常）自动关闭，无需显式调用 `f.close()`。
3.  **`json.load(f)`**: 从打开的文件对象 `f` 中读取 JSON 数据，并将其解析（反序列化）为 Python 字典或列表。结果存储在 `setting_dict` 变量中。
4.  **`import os`** 和 **`os.getcwd()`**: 导入 `os` 模块，该模块提供了与操作系统交互的功能。`os.getcwd()` (get current working directory) 返回程序当前执行的工作目录路径。
最后，打印 `setting_dict` 会显示从 `settings.json` 文件加载的内容，通常是一个字典。

!!! warning "注意事项：文件路径"
    代码中使用的文件路径 `"E:/2025S Python/slides\\settings.json"` 是一个绝对路径，并且混合了正斜杠 `/` 和转义的反斜杠 `\\`。在不同操作系统上，路径分隔符可能不同。为了代码的可移植性，通常建议使用 `os.path.join()` 来构建路径，或者使用原始字符串 (e.g., `r"E:\path\to\file"`) 或正斜杠 (Python 在多数系统上能正确处理)。

## 8. 迭代器、`zip` 函数与 `next()` (Iterators, `zip` function, and `next()`)

迭代器是 Python 中一种强大的抽象，它允许我们逐个访问集合中的元素而无需了解其底层实现。`zip` 函数可以将多个可迭代对象聚合成一个迭代器，该迭代器产生元组。

```python
account = ["acc1", "acc2", "acc3"]
balance = (1_000_000, 1_300, 500)
```

```python
account
```

```
['acc1', 'acc2', 'acc3']
```

```python
balance
```

```
(1000000, 1300, 500)
```

```python
z1 = zip(account, balance)
next(z1)
```

```
('acc1', 1000000)
```

```python
next(z1)
```

```
('acc2', 1300)
```

```python
next(z1)
```

```
('acc3', 500)
```

```python
next(z1) # Attempting to get another element after exhaustion
```

```
Error Type: StopIteration
Error Message: 
---------------------------------------------------------------------------
StopIteration                             Traceback (most recent call last)
Cell In[52], line 1
----> 1 next(z1)

StopIteration: 
```

```python
z1 = zip(account, balance) # Re-initialize the zip object
next(z1)
```

```
('acc1', 1000000)
```

```python
a, b = next(z1) # Unpack the tuple returned by next()
a
```

```
'acc2'
```

```python
b
```

```
1300
```

```python
type(z1)
```

```
zip
```

首先，我们创建了一个列表 `account` 和一个元组 `balance`。数字 `1_000_000` 使用下划线作为千位分隔符，以提高可读性。
`z1 = zip(account, balance)` 创建了一个 `zip` 对象，它是一个迭代器。这个迭代器会将 `account` 和 `balance` 中对应位置的元素配对成元组。
`next(z1)` 函数用于从迭代器 `z1` 中获取下一个元素。每次调用 `next(z1)`，它都会返回一个包含来自 `account` 和 `balance` 的对应元素的元组，例如 `('acc1', 1000000)`。
当迭代器中的所有元素都被取出后，再次调用 `next(z1)` 会引发 `StopIteration` 异常，这标志着迭代的结束。
`zip` 对象是一次性的迭代器，一旦耗尽，就不能重新开始迭代，除非像代码中那样重新创建它 `z1 = zip(account, balance)`。
`a, b = next(z1)` 演示了元组解包：`next(z1)` 返回一个元组，这个元组的元素被分别赋给变量 `a` 和 `b`。
最后，`type(z1)` 显示 `z1` 的类型是 `zip`。

!!! note "关键概念：迭代器 (Iterators)"
    迭代器是一个对象，它实现了迭代器协议，即 `__iter__()` 方法（返回迭代器自身）和 `__next__()` 方法（返回下一个元素或在耗尽时引发 `StopIteration`）。`zip` 对象就是一种迭代器。

## 9. 可迭代对象与迭代器协议 (Iterable Objects and Iterator Protocol)

在 Python 中，可迭代对象 (Iterable) 是指任何可以被迭代的对象，例如列表、字符串、元组、字典等。它们可以通过 `iter()` 函数转换成迭代器 (Iterator)。

```python
a = [1, 2, 3] # a is a list, which is iterable
b = 1         # b is an integer, which is not iterable
import collections.abc # Use collections.abc for Abstract Base Classes

isinstance(b, collections.abc.Iterable)
```

```
False
```

```python
for i in b: # Trying to iterate over an integer
    ...
```

```
Error Type: TypeError
Error Message: 'int' object is not iterable
---------------------------------------------------------------------------
TypeError                                 Traceback (most recent call last)
Cell In[64], line 1
----> 1 for i in b:
      2     ...

TypeError: 'int' object is not iterable
```

```python
iter(a) # Get an iterator from the list 'a'
```

```
<list_iterator at 0x28755e47e80>
```

```python
a.__iter__() # iter(a) calls a.__iter__() internally
```

```
<list_iterator at 0x28755d20b80>
```

```python
a.__getitem__(0) # a[0] - Demonstrates sequence protocol, not directly iterator protocol
```

```
1
```

```python
a # a is still the original list
```

```
[1, 2, 3]
```

```python
# Assuming z1 is the zip iterator from the previous section,
# and it has yielded ('acc1', 1000000) and ('acc2', 1300) already.
# next(z1) would be its third element. Let's re-initialize for clarity or assume context.
# If z1 was z1 = zip(account, balance) and two next() calls were made:
# z1 = zip(["acc1", "acc2", "acc3"], (1_000_000, 1_300, 500))
# next(z1) -> ('acc1', 1000000)
# next(z1) -> ('acc2', 1300)

# The notebook context suggests z1 is at a point where the next item is ('acc3', 500)
next(z1) # z1.__next__()
```

```
('acc3', 500)
```

```python
z1.__next__() # Attempting to get the next element after the last one
```

```
Error Type: StopIteration
Error Message: 
---------------------------------------------------------------------------
StopIteration                             Traceback (most recent call last)
Cell In[76], line 1
----> 1 z1.__next__()

StopIteration: 
```

这段代码深入探讨了可迭代对象和迭代器协议：
1.  `a = [1, 2, 3]` 是一个列表，列表是可迭代的。`b = 1` 是一个整数，整数不是可迭代的。
2.  `isinstance(b, collections.abc.Iterable)` 检查 `b` 是否是 `Iterable` 抽象基类的实例。由于整数不可迭代，返回 `False`。 (注意：在旧版本 Python 中可能使用 `collections.Iterable`，但 `collections.abc.Iterable` 是更现代的写法)。
3.  尝试 `for i in b:` 会导致 `TypeError`，因为整数对象不支持迭代。
4.  `iter(a)` 调用列表 `a` 的 `__iter__()` 方法，返回一个列表迭代器对象 (`list_iterator`)。`a.__iter__()` 直接调用该方法，效果相同。
5.  `a.__getitem__(0)` 演示了序列协议的一部分，它允许通过索引访问元素 (如 `a[0]`)。虽然许多可迭代对象也是序列，但迭代协议 (`__iter__` 和 `__next__`) 是更通用的概念。
6.  对于之前创建的 `zip` 迭代器 `z1`，调用 `next(z1)` 或其等效的 `z1.__next__()` 方法会获取下一个元素。当所有元素都被耗尽后，再次调用 `__next__()` 会引发 `StopIteration` 异常。

!!! note "关键概念：可迭代对象 vs. 迭代器"
    *   **可迭代对象 (Iterable):** 任何实现了 `__iter__()` 方法（该方法返回一个迭代器）或者实现了 `__getitem__()` 方法（支持序列索引）的对象。`for` 循环可以作用于可迭代对象。
    *   **迭代器 (Iterator):** 任何实现了 `__iter__()` 方法（返回自身）和 `__next__()` 方法（返回下一个元素或引发 `StopIteration`）的对象。迭代器是有状态的，它会记住上次访问的位置。

以下代码块进一步强调了非可迭代对象（如整数 `b`）在尝试获取迭代器时会发生的情况：
```python
# a = [1, 2, 3] (iterable)
# b = 1 (non-iterable)
iter(a)
```
```
<list_iterator at 0x28755e4e2c0>
```
```python
iter(b)
```
```
Error Type: TypeError
Error Message: 'int' object is not iterable
---------------------------------------------------------------------------
TypeError                                 Traceback (most recent call last)
Cell In[116], line 1
----> 1 iter(b)

TypeError: 'int' object is not iterable
```
```python
# b.__iter__() # This would also fail if b were an object without __iter__
```
```
Error Type: AttributeError
Error Message: 'int' object has no attribute '__iter__'
---------------------------------------------------------------------------
AttributeError                            Traceback (most recent call last)
Cell In[117], line 1
----> 1 b.__iter__()

AttributeError: 'int' object has no attribute '__iter__'
```
```python
a.__iter__()
```
```
<list_iterator at 0x28755bb0f40>
```
`iter(b)` 尝试为整数 `b` 获取迭代器，导致 `TypeError`。直接调用 `b.__iter__()` 会导致 `AttributeError`，因为整数类型没有定义 `__iter__` 方法。而对于列表 `a`，`iter(a)` 和 `a.__iter__()` 都能成功返回一个迭代器。

## 10. 字符串操作 (String Manipulations)

Python 的字符串是不可变的序列，并提供了丰富的内置方法来进行各种操作，如大小写转换、去除空白、替换子串等。`re` 模块还支持更强大的基于正则表达式的字符串处理。

```python
[1, 2, 3] # A simple list expression
```

```
[1, 2, 3]
```

```python
'a', "b" # A tuple of two strings
```

```
('a', 'b')
```

```python
s1 = "abcdefg" # "a"
s1.upper()
```

```
'ABCDEFG'
```

```python
s2 = "ABC"
s2.lower()
```

```
'abc'
```

```python
s3 = "hello world"
s3.title()
```

```
'Hello World'
```

```python
s4 = " hello python! "
s4.strip()
```

```
'hello python!'
```

```python
s4.lstrip()
```

```
'hello python! '
```

```python
s4.rstrip()
```

```
' hello python!'
```

```python
import re # regular expression
s5 = "thetra, hello thetra, world thetra"
re.sub("thetra", "", s5) # substitute
```

```
', hello , world '
```

这段代码演示了多种字符串操作：
-   `s1.upper()`: 将字符串 `s1` 中的所有小写字母转换为大写字母。
-   `s2.lower()`: 将字符串 `s2` 中的所有大写字母转换为小写字母。
-   `s3.title()`: 将字符串 `s3` 转换为标题大小写，即每个单词的首字母大写，其余字母小写。
-   `s4.strip()`: 移除字符串 `s4` 开头和结尾的空白字符（空格、制表符、换行符等）。
-   `s4.lstrip()`: 仅移除字符串 `s4` 开头的空白字符。
-   `s4.rstrip()`: 仅移除字符串 `s4` 结尾的空白字符。
-   `import re` 导入了正则表达式模块。`re.sub("thetra", "", s5)` 使用正则表达式将字符串 `s5` 中所有出现的子串 `"thetra"` 替换为空字符串 `""`。

!!! note "关键概念：字符串不可变性"
    Python 中的字符串是不可变的。这意味着所有字符串方法（如 `upper()`, `strip()`, `replace()` 等）都不会修改原始字符串，而是返回一个新的修改后的字符串。原始字符串 `s1`, `s2`, `s3`, `s4` 在调用这些方法后保持不变。

简单的列表 `[1, 2, 3]` 和元组 `('a', 'b')` 只是作为表达式被求值并显示其结果。