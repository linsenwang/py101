# 第 1 章 基础知识

本章我们将学习 Python 的一些非常基础的理论，以及更多的构建模块和函数。我们还将探讨控制流，特别是 `for` 循环和 `if` 条件语句。

如果我们将一个程序比作一栋建筑，那么变量就是砖块，而语法则告诉程序员如何将这些砖块组合起来砌成墙壁。不同的程序仅仅是砌墙方式的不同而已。

!!! info "本章学习目标"
    1.  理解 Python 的基本构建块。
    2.  掌握函数的基本使用。
    3.  学习 `for` 循环和 `if` 条件语句的控制流。
    4.  深入了解字典（Dictionary）这一映射数据类型。

## 1.2.3 映射 — 字典 (Dictionary)

我们已经学习了如何通过下标 (subscripting) 从列表 (list) 或元组 (tuple) 中获取元素。使用下标的必要条件是元素的顺序。另一种提取元素的方式是通过它们的名称。但这只有在容器为我们提供了名称的情况下才有效。字典 (Dictionary) 就是这样一种通过名称（而非顺序）进行下标操作的容器类型。

### 1.2.3.1 创建字典的方法

以下是几种创建字典的示例：

```python
# 方法一：使用花括号 {}
age = {
    "Alice": 21,
    "Bob": 32,
    "Charlie": 44
}

# 方法二：使用 dict() 构造函数和关键字参数
name = dict(
    stu1="Alice",
    stu2="Bob",
    stu3="Charlie"
)

# 方法三：使用 dict() 构造函数和包含键值对的列表
grade = dict([
    ['stu1', 87],
    ['stu2', 99],
    ['stu3', 65]
])

# 方法四：使用 dict.fromkeys() 创建一个所有键具有相同（可选）初始值的字典
# 如果不提供第二个参数，值默认为 None
new_dict = dict.fromkeys(["key1", "key2"]) # 值将是 None
another_dict = dict.fromkeys(["keyA", "keyB"], 100) # 值将是 100

print(age)
print(name)
print(grade)
print(new_dict)
print(another_dict)
```

!!! note "关键概念：键 (Keys) 和值 (Values)"
    在字典中，元素的名称被称为“键 (keys)”，而元素对应的内容被称为“值 (values)”。字典存储的是键值对 (key-value pairs)。

### 字典元素的访问与 `get()` 方法

我们可以通过将键传递给字典来查找一个元素（键值对）。

```python
age = {"Alice": 21, "Bob": 32, "Charlie": 44}

# 通过键访问值
print(age["Alice"]) # 输出: 21
```

如果尝试访问一个不存在于字典中的键，Python 会引发一个 `KeyError` 错误，导致程序停止。

```python
# 下面这行会引发 KeyError，因为 "David" 不在字典中
# print(age["David"])
```

为了避免这种情况，我们可以使用字典的 `get()` 方法。如果键不存在，`get()` 方法默认会返回 `None`（或者可以指定一个自定义的默认返回值），而程序会继续执行。

```python
print(age.get("Alice"))    # 输出: 21
print(age.get("David"))    # 输出: None (程序不会报错)
print(age.get("David", "N/A")) # 输出: N/A (指定了默认值)

# 列表索引越界示例
l = [1, 2, 3]
# print(l[3]) # 这会引发 IndexError
```

!!! question "课堂练习 1.2.3.1.1：字典的键与值"
    1.  在上面 `age`, `name`, `grade` 这三个字典中，各自的键和值分别是什么？

## 特殊主题：流程控制 (I) — `for` 循环

我们如何能逐个访问列表中的所有元素呢？

*   我们可以通过 `l[0]`, `l[1]`, `l[2]` 等手动取出它们。
*   我们也可以创建一个索引变量 `i` 来帮助我们：

    ```python
    l = [1, 2, 3]
    i = 0
    print(l[i]) # 输出 l[0]
    i = 1
    print(l[i]) # 输出 l[1]
    # ... 以此类推 (这里我通常忽略 print 语句，仅作演示)
    ```

*   一种更便捷的方式是依赖自动化的 `for` 循环：

    ```python
    # for 循环的基本语法
    # for element in container:
    #     # 对 element 执行操作
    
    my_list = [10, 20, 30]
    for item in my_list:
        print(item)
    ```

!!! question "课堂练习 特殊主题 (I).1：`for` 循环实践"
    1.  创建一个列表，并使用 `for` 循环打印其所有元素。
    2.  创建一个元组，并使用 `for` 循环打印其所有元素。
    3.  创建一个字典，并使用 `for` 循环打印其所有值。
    4.  创建一个字典，并使用 `for` 循环打印其所有键。
    5.  使用 f-string 以格式化的方式打印字典的键值对。

### `range()` 函数简介

我们非正式地介绍一个在 `for` 循环中非常有用的函数：`range()`。`range()` 函数与列表切片非常相似。

*   `range(stop)`: 生成从 0 到 `stop-1` 的整数序列。
    ```python
    for i in range(5): # 0, 1, 2, 3, 4
        print(i)
    ```
*   `range(start, stop)`: 生成从 `start` 到 `stop-1` 的整数序列。
    ```python
    for i in range(1, 6): # 1, 2, 3, 4, 5
        print(i)
    ```
*   `range(start, stop, step)`: 生成从 `start` 到 `stop-1`，步长为 `step` 的整数序列。
    ```python
    for i in range(0, 10, 2): # 0, 2, 4, 6, 8
        print(i)
    
    for i in range(0, 30, 5): # 0, 5, 10, 15, 20, 25
        print(i)

    for i in range(0, 10, 3): # 0, 3, 6, 9
        print(i)

    for i in range(0, -10, -1): # 0, -1, -2, ..., -9
        print(i)
    
    # 特殊情况
    for i in range(0): # 不会执行循环体
        print("This won't print")

    for i in range(1, 0): # 不会执行循环体，因为 start > stop 且 step 默认为正
        print("This also won't print")
    ```

## 特殊主题：流程控制 (I) — `if` 语句

在某些情况下，我们可能只想打印出列表/元组/字典中的特定元素。

例如，给定一个列表：
```python
l = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
```
我们可能只需要那些是某个整数平方的数字，或者只需要那些是某个整数立方的数字，或者仅仅是奇数。换句话说，只有当元素满足某个**条件**时，我们才对其进行操作。这里我们使用 `if` 控制流。

```python
# 示例：只打印偶数
for element in l:
    if element % 2 == 0: # 条件：元素能被2整除
        print(element)
```

!!! question "课堂练习 特殊主题 (I).2：`if` 语句实践"
    对于包含 13 个元素的列表 `l = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]`：
    1.  打印出所有奇数元素。
    2.  打印出所有是平方数的元素 (例如 1, 4, 9)。
    3.  打印出所有是立方数的元素 (例如 1, 8)。

### `==` vs `is`

在 `if` 语句中，最常用的条件是比较。
*   比较两个数字的大小：`<`, `>`, `==`, `<=`, `>=`, `!=`
*   比较对象的身份 (identity)：`is`

`None` 是 Python 中的一个特殊对象。我们需要关注它与比较运算符的交互。

### 比较表达式返回布尔值

我们所说的“表达式 (expression)”是指可以被求值的 Python 代码。其正式定义较为复杂，我们将在未来的课程中讨论。比较表达式依赖于 `<`、`>`、`<=`、`>=`、`!=` 以及 `is` 和 `not` (逻辑非)。

比较的求值支持链式表达式。例如：

```python
a, b, c, d, e = 1, 4, 3, 3, 5
result = a < b > c == d != e # 等价于 (a < b) and (b > c) and (c == d) and (d != e)
print(result) # True
```

!!! note "关于 `None` 的比较：使用 `is`"
    一个特别需要注意的地方是涉及 `None` 的比较。当我们比较一个对象是否为 `None` 时，**应该使用 `is` 而不是 `==`**。
    这是因为 `None` 是一个单例对象 (singleton)。在 Python 中，我们使用 `is` 来比较对象的身份 ID。因此，当我们写 `a = None`，`b = None` 时，`a is b` 会返回 `True`，因为 `a` 和 `b` 都指向内存中同一个 `None` 对象。而 `==` 通常用于比较值，虽然对于 `None` 来说 `None == None` 也是 `True`，但 PEP 8 (Python 代码风格指南) 推荐使用 `is None` 或 `is not None`。

    ```python
    var1 = None
    var2 = None

    print(var1 is None) # True (推荐)
    print(var1 == None) # True (不推荐)
    print(var1 is var2) # True
    ```

## 1.2.3 映射 — 字典 (Dictionary) (续)

### 更新字典：添加元素和合并字典

有时我们想向字典中添加更多元素。我们可以使用 `[]` 运算符：

```python
my_dict = {"name": "Alice", "age": 30}
my_dict["city"] = "New York" # 添加新键值对
my_dict["age"] = 31          # 更新已存在的键的值
print(my_dict)
```

有时我们想合并两个字典。我们可以使用 `update()` 方法。`update()` 方法会将另一个字典的键值对添加进来，如果遇到相同的键，则会用新值覆盖旧值。

```python
dict1 = {'a': 1, 'b': 2}
dict2 = {'b': 3, 'c': 4}
dict1.update(dict2)
print(dict1) # 输出: {'a': 1, 'b': 3, 'c': 4}
```
更多关于 `update` 方法的信息，请阅读：[Python Dictionaries: update() method](https://python-reference.readthedocs.io/en/latest/docs/dict/update.html)

### 字典与列表/元组的区别 (示例 1.2.3.3)

字典在某些操作上与列表或元组有显著不同，尤其是在迭代过程中修改它们时。

考虑以下从字典中移除特定项的例子：

```python
d = {'a': [1], 'b': [1, 2], 'c': [], 'd': []}
# 错误的方式：在迭代字典时修改它的大小可能导致问题
# for key in d: # 这会迭代 d.keys() 的一个副本 (Python 3) 或一个视图
#     if not d[key]: # 如果值为空列表
#         d.pop(key) # RuntimeError: dictionary changed size during iteration (在某些Python版本或特定情况下)
                     # 或者跳过某些元素

# 更安全的方式是迭代键的副本，或者创建一个新字典
keys_to_remove = []
for key, value in d.items():
    if not value: # 如果值为空列表
        keys_to_remove.append(key)

for key in keys_to_remove:
    d.pop(key)
print(f"字典 d 处理后: {d}") # 输出: {'a': [1], 'b': [1, 2]}


# 列表在迭代中修改的类似问题
my_list = [1, 2, 3, 0, 5, 0]
# 尝试在迭代时移除元素 (不推荐，可能跳过元素)
# for item in my_list:
#     if item == 0:
#         my_list.remove(item) # 这会导致问题，因为列表长度和索引在变化

# 更安全的方式是使用列表推导式创建新列表或迭代副本
new_list = [item for item in my_list if item != 0]
print(f"列表 my_list 处理后 (创建新列表): {new_list}")

# 另一个列表 pop 示例，说明索引变化
data = [1, 2, 3, 0, 5]
# for i in range(len(data)): # len(data) 在循环开始时固定
#     # 如果 data.pop(i) 被执行，列表会变短，后续的 i 可能会越界
#     # 或者访问到错误的元素
#     # 例如，如果 i=0 时 pop(0)，原先的 data[1] 变成新的 data[0]
#     # 但下一次循环 i 会是 1，跳过了新的 data[0]
#     # print(f"Trying to pop at index {i}")
#     # data.pop(i) # 这通常是错误的做法

# 正确地从后往前删除，或者使用列表推导式/filter
indices_to_pop = []
for i in range(len(data)):
    if data[i] == 0: # 假设我们要删除0
        indices_to_pop.append(i)

# 从后往前删除，避免索引问题
for i in sorted(indices_to_pop, reverse=True):
    data.pop(i)
print(f"列表 data pop 处理后: {data}")
```

!!! note "迭代时修改容器的注意事项"
    在迭代一个容器（如列表或字典）的同时修改它（添加或删除元素）通常是不安全的，可能导致意外行为，如跳过元素或引发运行时错误。安全的做法通常包括：
    1.  迭代容器的一个副本。
    2.  创建一个新的、经过筛选的容器。
    3.  如果必须原地修改，对于列表，从后往前删除可以避免索引问题。对于字典，先收集要修改的键，迭代完成后再进行修改。

### 示例 1.2.3.4：将 JSON 文件作为字典处理

JSON (JavaScript Object Notation) 是一种轻量级的数据交换格式，其结构与 Python 字典非常相似。Python 的 `json` 模块可以轻松地在 JSON 数据和 Python 对象之间进行转换。

假设我们有一个名为 `settings.json` 的文件，内容如下：
```json
{
    "username": "guest",
    "theme": "dark",
    "notifications": {
        "email": true,
        "sms": false
    },
    "max_connections": 10
}
```

我们可以这样读取并将其作为字典处理：
```python
import json

# 假设 settings.json 文件在同一目录下
# 为了运行此示例，你需要先创建一个 settings.json 文件
# 你可以手动创建，或用以下代码创建它：
settings_data_for_file = {
    "username": "guest",
    "theme": "dark",
    "notifications": {
        "email": True,
        "sms": False
    },
    "max_connections": 10
}
with open("settings.json", "w") as f_write:
    json.dump(settings_data_for_file, f_write, indent=4)
# ---- 文件创建完毕 ----


# 读取 JSON 文件
try:
    with open("settings.json", "r") as f:
        setting_dict = json.load(f) # 从文件加载 JSON 数据并转换为 Python 字典

    # 现在 setting_dict 就是一个 Python 字典了
    print(setting_dict)
    print(type(setting_dict))

    # 你可以像操作普通字典一样操作它
    print(f"Username: {setting_dict['username']}")
    print(f"Email notifications enabled: {setting_dict['notifications']['email']}")

    # 获取所有键值对
    print("All items in setting_dict:")
    for key, value in setting_dict.items():
        print(f"  {key}: {value}")

except FileNotFoundError:
    print("Error: settings.json not found. Please create the file first.")
```

Python 中有一个特殊的对象，它的唯一名称是 `None`。`None` 是 `NoneType` 类型的唯一值，通常用来表示“空”或“无值”。

在 Python 中，我们使用 `is` 关键字来比较对象的身份标识 (id)。因此，当我们这样写时：

```python
a = None
b = None
a is b
```
返回的结果是 `True`，因为 `a` 和 `b` 都指向内存中同一个 `None` 对象。

!!! note "关键概念：`None` 是一个单例对象"
    这意味着在整个 Python 程序运行期间，只有一个 `None` 对象存在。所有对 `None` 的赋值实际上都是让变量指向这个唯一的对象。

## 1.2.3 映射 (Mapping) — 字典 (dictionary)

有时候，我们希望向字典中添加更多的元素。这时可以使用 `[]` 操作符：

```python
my_dict = {'name': 'Alice', 'age': 30}
my_dict['city'] = 'New York' # 添加新键值对
print(my_dict)
# 输出: {'name': 'Alice', 'age': 30, 'city': 'New York'}

my_dict['age'] = 31 # 更新已存在的键的值
print(my_dict)
# 输出: {'name': 'Alice', 'age': 31, 'city': 'New York'}
```

有时，我们想要合并两个字典。这时可以使用 `update()` 方法。
关于 `update()` 方法的更多信息，请阅读官方文档：[https://python-reference.readthedocs.io/en/latest/docs/dict/update.html](https://python-reference.readthedocs.io/en/latest/docs/dict/update.html)

```python
dict1 = {'a': 1, 'b': 2}
dict2 = {'b': 3, 'c': 4}
dict1.update(dict2) # dict2 中的键值对会合并到 dict1 中
                     # 如果有相同的键，dict2 中的值会覆盖 dict1 中的值
print(dict1)
# 输出: {'a': 1, 'b': 3, 'c': 4}
```

字典与列表或元组有显著的不同。它们是无序的键值对集合（在 Python 3.7+ 版本中，字典会保持插入顺序，但这更多是实现细节，不应作为核心特性依赖）。

### 示例：列表与字典在删除元素时的差异

思考以下在循环中删除字典元素的代码：
```python
d = {'a': [1], 'b': [1, 2], 'c': [], 'd': []}
# 注意：在迭代字典时修改其大小可能会导致问题。
# 一个更安全的方法是先收集要删除的键。
keys_to_pop = []
for i in d:
    if not d[i]: # 如果键对应的值为空列表
        keys_to_pop.append(i)

for key in keys_to_pop:
    d.pop(key)
print(d)
# 预期输出 (取决于具体Python版本和迭代器行为，直接修改可能导致RuntimeError):
# {'a': [1], 'b': [1, 2]}
```

再看一个在循环中删除列表元素的例子（这通常会导致跳过元素或索引错误）：
```python
d_list = [1, 2, 3, 0, 5]
# 警告：在迭代列表的同时从中删除元素是一个常见的陷阱。
# 当一个元素被删除时，后续元素的索引会发生变化。
# 例如，当 i=0 时，d_list.pop(0) 删除 1，列表变为 [2,3,0,5]。
# 下一轮 i=1，此时 d_list[1] 是 3，元素 2 被跳过了。
# for i in range(4): # 这里的 range(4) 是基于原始列表长度减一，但列表长度在变化
#     d_list.pop(i) # 这段代码会引发 IndexError
# print(d_list)
```
!!! note "注意"
    在迭代集合（如列表或字典）的同时修改它通常是不安全的，可能会导致意外行为或错误。如果需要这样做，建议迭代集合的副本，或者先收集需要修改/删除的项，然后在迭代结束后再进行操作。

### 示例：将 JSON 文件作为字典读取
我们可以很方便地将存储在 JSON 文件中的数据读入 Python 字典。
```python
import json

# 假设我们有一个名为 "settings.json" 的文件，内容如下：
# {
#   "theme": "dark",
#   "fontSize": 14,
#   "showSidebar": true
# }

with open("settings.json", "r") as f:
    setting_dict = json.load(f)

print(setting_dict)
# 输出: {'theme': 'dark', 'fontSize': 14, 'showSidebar': True}

print(setting_dict.items())
# 输出: dict_items([('theme', 'dark'), ('fontSize', 14), ('showSidebar', True)])
```

### `zip` 函数
在结束关于字典的讨论之前，还有一个相关的主题：`zip` 函数。
`zip` 在英文中的意思是“拉链”。顾名思义，Python 的 `zip` 函数就像现实生活中的拉链一样，将两个或多个序列“缝合”在一起。它将多个可迭代对象的对应元素打包成一个个元组。

例如：
```python
account = ["622848", "600314", "500297"]
balance = (1_000_000, 1_300_500, 500)

z1 = zip(account, balance) # z1 是一个 zip 对象 (迭代器)

# 我们可以将 zip 对象转换为列表或直接迭代
# print(list(z1))
# 输出: [('622848', 1000000), ('600314', 1300500), ('500297', 500)]

# 或者更常见地，直接在循环中使用
for k, v in z1:
    print(k, "has a balance of", v)
# 输出:
# 622848 has a balance of 1000000
# 600314 has a balance of 1300500
# 500297 has a balance of 500
```
`zip` 函数在创建字典时也非常有用：
```python
keys = ['name', 'age', 'city']
values = ['Bob', 25, 'Paris']
profile = dict(zip(keys, values))
print(profile)
# 输出: {'name': 'Bob', 'age': 25, 'city': 'Paris'}
```

## 1.2 对象的类型

!!! question "课堂练习 1.2.2.1"    
    1.  我们已经学习了哪些简单（基本）数据类型？
    2.  我们已经学习了哪些复杂（容器）数据类型？
    3.  你如何区分它们？（例如，从可变性、有序性、元素唯一性等角度）

### 1.2.4 字符串 (String)
我们已经多次看到引号的使用。被引号包围的文本是字符串，而不是变量名。Python 通常不区分双引号 (`"`) 和单引号 (`'`) 定义的字符串。

字符串是一种特殊的序列容器（严格来说，它是一种“序列类型”）。字符串本身可以包含其他字符（实际上就是字符的序列）。

我们介绍三组常用的字符串函数/方法：

*   **大小写转换:**
    *   `upper()`: 将字符串中所有字符转换为大写。
    *   `lower()`: 将字符串中所有字符转换为小写。
    *   `title()`: 将字符串中每个单词的首字母转换为大写，其余字母为小写。
*   **移除不必要的字符:**
    *   `strip()`: 移除字符串开头和结尾的指定字符（默认为空白字符）。
    *   `lstrip()`: 移除字符串开头的指定字符（默认为空白字符）。
    *   `rstrip()`: 移除字符串结尾的指定字符（默认为空白字符）。
*   **来自 `re` 模块的函数 (正则表达式):**
    *   `re.sub()`: 用于执行正则表达式替换。

!!! info "关于模块 (Module)"
    模块是一些由他人（或你自己）编写的 Python 代码，可以被分开存储并在其他 Python 程序中导入和使用。`re` 就是一个用于处理正则表达式的内置模块。

!!! question "课堂练习 1.2.4.1"    
    1.  反转一个字符串。例如，给定 `s = "desserts"`，将其反转得到 `"stressed"`。将 `"drawer"` 反转得到 `"reward"`。这些被称为“回文构词”(anadromes)。
    2.  从字符串中移除所有元音字母（a, e, i, o, u，不区分大小写）。例如，`"drawer"` 会变成 `"drwr"`。
    3.  计算一个字符串中单词的数量（可以使用 `split()` 方法）。

### 1.2.5 无序不重复集合 — Set
根据定义，**set 对象是一个无序的、包含不同（唯一）可哈希对象的集合**。
参考 Python 官方文档：[https://docs.python.org/3/library/stdtypes.html#set-types-set-frozenset](https://docs.python.org/3/library/stdtypes.html#set-types-set-frozenset)

Python 文档还提供了一个术语表供参考，其中解释了什么是“可哈希”(hashable)：
[https://docs.python.org/3/glossary.html#term-hashable](https://docs.python.org/3/glossary.html#term-hashable)

!!! note "关键概念：可哈希 (Hashable)"
    一个对象是可哈希的，如果它有一个哈希值，并且这个哈希值在其生命周期内永不改变（它需要一个 `__hash__()` 方法），同时它可以与其他对象进行比较（它需要一个 `__eq__()` 方法）。可哈希对象必须是不可变的。所有 Python 内置的不可变类型（如整数、浮点数、字符串、元组）都是可哈希的。可变容器（如列表、字典、集合）是不可哈希的。

Set 的行为与我们在数学课程中遇到的集合概念非常相似。集合的元素是唯一的且无序的。我们也可以使用数学概念，如成员测试 (`in`，对应 ∈)、判断子集 (`issubset`，对应 ⊂)、并集 (`union` 或 `|`，对应 ∪)、交集 (`intersection` 或 `&`，对应 ∩)、差集 (`difference` 或 `-`，对应 −) 以及对称差集 (`symmetric_difference` 或 `^`，对应 Δ) 来操作集合。

!!! question "课堂练习 1.2.5.1"    
    你如何检查一个对象是否是“可哈希”的？（提示：可以尝试将其作为字典的键或集合的元素。）

有几种创建集合的方法：

*   使用花括号 `{}` (但注意 `{}` 创建的是空字典，空集合必须用 `set()` 创建)：
    ```python
    my_set = {1, 2, 3, 2} # 重复的 2 会被忽略
    print(my_set)      # 输出: {1, 2, 3}
    ```
*   使用 `set()` 函数：
    ```python
    empty_set = set()
    another_set = set([1, 2, 2, 3, 4]) # 从列表创建集合
    print(another_set) # 输出: {1, 2, 3, 4}
    ```
*   使用集合推导式 (稍后介绍)。

集合创建后，我们可以修改它（添加、删除元素等）。请看下面的练习。

对于不可变的集合，我们使用 `frozenset`，主要通过 `frozenset()` 函数创建：
```python
frozen = frozenset([1, 2, 3])
# frozen.add(4) # 这会引发 AttributeError，因为 frozenset 是不可变的
```

!!! question "课堂练习 1.2.5.2"    
    1.  创建一个包含数字 1, 2, 3, 4, 5 的集合。
    2.  向该集合中添加数字 6。
    3.  创建两个集合：`set_a = {1, 2, 3, 4}` 和 `set_b = {3, 4, 5, 6}`。
    4.  求 `set_a` 和 `set_b` 的并集。
    5.  求 `set_a` 和 `set_b` 的交集。
    6.  求 `set_a` 和 `set_b` 的差集 (`set_a - set_b`)。
    7.  求 `set_a` 和 `set_b` 的对称差集。
    8.  给定列表 `numbers = [1, 2, 2, 3, 4, 4, 4, 5]`，创建一个集合以移除重复元素。
    9.  将得到的集合转换回列表（元素数量会减少）。

## 1.3 Pythonic 特性
“Pythonic” 是一个含义比较宽松的术语，通常指“Python 所特有的”编码风格或语法，用于表示那些只有 Python（或少数其他语言）才具备的简洁、优雅或高效的写法。

例如，我们已经见过一些 Pythonic 的代码：
*   `zip`
*   `with` 语句
*   `None`
*   `sorted()` 函数（特别是与 `key`参数结合使用时）
*   f-string (格式化字符串字面量)

还有更多 Pythonic 的特性。让我们来看看以下两个：
*   推导式 (Comprehensions)
*   `enumerate` 函数

### 1.3.1 推导式 (Comprehensions)
Python 提供了一种简洁的方式来创建列表、集合和字典，称为推导式。

*   **列表推导式 (List comprehension):**
    ```python
    squares = [x**2 for x in range(5)]
    # squares 结果为 [0, 1, 4, 9, 16]
    # 通常比使用循环和 .append() 更快，如果逻辑不太复杂的话。
    ```
*   **集合推导式 (Set comprehension):**
    ```python
    unique_chars = {c for c in 'abcdcba'}
    # unique_chars 结果为 {'a', 'b', 'c', 'd'} (顺序不定)
    ```
*   **字典推导式 (Dictionary comprehension):**
    ```python
    squared_map = {x: x**2 for x in range(5)}
    # squared_map 结果为 {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}
    ```

这里缺少的是“元组推导式”。当你写类似下面的代码时：
```python
gen_exp = (i for i in range(3))
```
你得到的并不是一个元组，而是一个**生成器表达式 (generator expression)**。生成器是一种特殊的迭代器，它不会一次性在内存中创建所有元素，而是在被请求时逐个生成。

我们也可以在推导式中添加 `if` 控制流：

*   **只有 `if` 条件:**
    ```python
    even_numbers = [x for x in range(10) if x % 2 == 0]
    # even_numbers 结果为 [0, 2, 4, 6, 8]
    ```
*   **`if-else` 条件:** (注意 `if-else` 在 `for` 子句之前)
    ```python
    processed_list = [x if x % 2 == 0 else x + 1 for x in range(10)]
    # processed_list 结果为 [0, 2, 2, 4, 4, 6, 6, 8, 8, 10]
    # (偶数不变，奇数加1)
    ```

!!! question "课堂练习 1.3.1"    
    下面的每段代码运行需要多长时间？（请实际运行并观察，思考为什么会有差异）
    ```python
    import time

    # 代码片段 1
    # result1 = [time.sleep(1), time.sleep(1), time.sleep(1)][0] 
    # print("片段1完成")

    # 代码片段 2
    # gen = (time.sleep(1) for _ in range(3)) # 创建生成器
    # result2 = next(gen) # 获取第一个元素，此时第一个 time.sleep(1) 执行
    # print("片段2完成第一个元素")
    # result2_all = list(gen) # 获取剩余元素，此时剩下的 time.sleep(1) 执行
    # print("片段2完成所有元素")

    # 更直接的比较：
    print("开始列表创建...")
    list_creation_start_time = time.time()
    my_list = [time.sleep(0.5) for _ in range(3)] # 所有 sleep 立即执行
    list_creation_end_time = time.time()
    print(f"列表创建耗时: {list_creation_end_time - list_creation_start_time:.2f} 秒")
    # accessing an element is fast
    # first_element_list = my_list[0]

    print("\n开始生成器创建...")
    generator_creation_start_time = time.time()
    my_generator = (time.sleep(0.5) for _ in range(3)) # sleep 不会立即执行
    generator_creation_end_time = time.time()
    print(f"生成器创建耗时: {generator_creation_end_time - generator_creation_start_time:.2f} 秒 (非常快)")

    print("\n开始从生成器取第一个元素...")
    generator_access_start_time = time.time()
    first_element_gen = next(my_generator) # 第一个 sleep 在这里执行
    generator_access_end_time = time.time()
    print(f"获取生成器第一个元素耗时: {generator_access_end_time - generator_access_start_time:.2f} 秒")
    
    print("\n开始从生成器取剩余元素...")
    generator_access_all_start_time = time.time()
    remaining_elements_gen = list(my_generator) # 剩余的 sleep 在这里执行
    generator_access_all_end_time = time.time()
    print(f"获取生成器剩余元素耗时: {generator_access_all_end_time - generator_access_all_start_time:.2f} 秒")
    ```

## 1.4 对象的值
在本节结束之前，让我们回顾一下。回想一下，一个 Python 对象由其 (i) 身份标识 (id)，(ii) 类型 (type)，和 (iii) 内容/值 (value) 来定义。这些组成部分扮演什么角色？

有时候，我们可能需要改变一个变量的类型，这通常被称为“类型转换”或“类型强制转换”(type casting)。我们可以使用类型名称作为函数来实现，例如 `int()`, `str()`, `list()`。
```python
num_str = "123"
num_int = int(num_str) # num_int 是一个新的整数对象
print(type(num_str), type(num_int))
```
改变类型通常会产生一个新的变量（对象）。那么改变对象的值呢？

当值的改变不改变对象的内存地址 (id) 时，变量名仍然指向同一个对象，只是该对象的内容发生了变化。我们称这样的对象和该对象的类型是**可变的 (mutable)**。

可变对象非常有用，但有时也可能引入一些不易察觉的复杂性，尤其是在函数参数传递或多个变量指向同一个可变对象时。我们将在下一章更深入地探讨可变与不可变对象。

### 列表推导式中的条件逻辑

在Python的列表推导式中，`if` 条件可以用于两种不同的目的：作为筛选器，或者作为三元条件表达式的一部分来决定元素的值。

1.  **`if` 作为筛选器**：
    当 `if` 子句位于 `for` 循环之后时，它起到筛选元素的作用。只有满足 `if` 条件的元素才会被包含在最终生成的列表中。

    ```python
    # 示例：从0到9的数字中，筛选出所有偶数
    [x for x in range(10) if x % 2 == 0]
    ```
    输出：`[0, 2, 4, 6, 8]`

2.  **`if-else` 作为条件表达式**：
    当 `if-else` 结构位于 `for` 循环之前（作为推导式的一部分）时，它用于根据条件为每个迭代项生成不同的值。这类似于一个三元操作符。

    ```python
    # 示例：从0到9的数字中，偶数保持不变，奇数加1
    [x if x % 2 == 0 else x + 1 for x in range(10)]
    ```
    输出：`[0, 2, 2, 4, 4, 6, 6, 8, 8, 10]`

!!! note "关键区别"
    筛选型的 `if` 决定一个元素是否被**包含**。
    条件表达式型的 `if-else` 决定一个元素被包含时其**值**是什么。

!!! question "课堂练习 1.3.1：代码运行时间"
    请分析以下两段 Python 代码片段，并说明它们各自大概需要多长时间来运行？为什么？

    **代码片段 1:**
    ```python
    import time
    result1 = [time.sleep(1), time.sleep(1), time.sleep(1)][0]
    ```

    **代码片段 2:**
    ```python
    import time
    result2 = (time.sleep(1), time.sleep(1), time.sleep(1))[0]
    ```
    思考列表和元组在构建其元素时的求值策略有何不同。

## 1.4 对象的值与可变性

在进一步学习Python的诸多特性之前，我们有必要回顾一下Python中“对象”的核心概念。每一个Python对象都由以下三个基本部分构成：

*   **(i) 身份 (id)**：对象在内存中的唯一地址，可以通过内置函数 `id()` 查看。
*   **(ii) 类型 (type)**：对象的具体类别，例如整数 (`int`)、字符串 (`str`)、列表 (`list`) 等，可以通过内置函数 `type()` 查看。
*   **(iii) 内容 (value)**：对象所存储的具体数据。

这三个方面共同定义了一个对象的特性和行为。

### 1.4.1 类型转换 (Type Casting)

在编程过程中，我们有时会遇到数据类型与期望操作不符的情况。打个比方，就像“你的打开方式不对”。Python 提供了**类型转换**（也称类型强制转换）的功能，允许我们将一个类型的对象转换为另一个类型。这通常通过调用目标类型的构造函数来实现，例如 `int()`, `str()`, `list()` 等。

```python
s = "123"
n = int(s)  # 将字符串 "123" 转换为整数 123
print(type(s), type(n)) # <class 'str'> <class 'int'>
print(id(s), id(n))     # 原始对象s和新对象n的id通常不同
```

!!! note "类型转换创建新对象"
    进行类型转换时，通常会创建一个全新的对象，这个新对象拥有新的身份 (id) 和新的类型，其值则根据转换规则从原对象计算而来。原对象（如果不再有任何引用指向它）则可能被Python的垃圾回收机制回收。

### 1.4.2 修改对象的值：可变性 (Mutability)

了解了类型转换后，我们再来探讨直接修改对象**内容（值）**的情况。

当一个对象的值发生改变，但其内存地址（即 `id()` 的返回值）保持不变时，我们就称这个对象是**可变的 (mutable)**。这意味着我们可以“原地”修改这个对象，而所有引用该对象的变量都会观察到这个变化。

!!! note "可变 (Mutable) vs. 不可变 (Immutable) 对象"
    *   **可变对象 (Mutable Objects)**：创建后，其内部状态或包含的内容可以被修改，而对象的身份 (id) 不变。Python中常见的可变对象有：列表 (`list`)、字典 (`dict`)、集合 (`set`)、字节数组 (`bytearray`)。
    *   **不可变对象 (Immutable Objects)**：一旦创建，其内部状态或包含的内容就不能再被修改。任何试图“修改”不可变对象的操作实际上都会导致创建一个新的对象。Python中常见的不可变对象有：数字（`int`, `float`, `bool`）、字符串 (`str`)、元组 (`tuple`)、冻结集合 (`frozenset`)。

可变对象在需要频繁修改数据而又不希望产生大量新对象的场景下非常有用，例如动态构建一个列表。然而，由于多个名称可能指向同一个可变对象，对其进行修改时需要特别小心，以免产生意料之外的副作用（例如，修改一个列表，结果影响了另一个看似无关的变量）。

我们将在后续的章节中更深入地探讨可变与不可变对象的特性、应用场景以及它们在编程实践中的影响。

!!! question "课堂练习 1.4.1：可变对象探究"
    1.  Python 中有哪些常见的内置数据类型是可变的？请至少列举三种。
    2.  Python 中有哪些常见的内置数据类型是不可变的？请至少列举三种。
    3.  你如何通过编写 Python 代码来验证一个特定类型的对象是可变的还是不可变的？请提供一个清晰的验证方法或示例代码。

## 扩展阅读与资源

*   **Python 名称与值 (Ned Batchelder)**：[Facts and Myths about Python Names and Values](https://nedbatchelder.com/text/names.html)
    *   一篇由资深Python开发者 Ned Batchelder 撰写的经典文章，深入剖析了Python中名称、对象、赋值和可变性等核心概念。
*   **CS61A (UC Berkeley) 复习材料**：[CS61A Review Materials](https://cs61a.org/Review/)
    *   来自加州大学伯克利分校著名的计算机科学导论课程 CS61A 的复习资料，内容严谨，有助于深入理解计算机科学的基本原理在Python中的体现。

## 关键Python特性概览

除了已经讨论的内容，Python 还包含许多其他强大且常用的特性，在后续的学习中会逐步接触到，例如：

*   **更多核心数据类型**：
    *   **字典 (Dictionary / `dict`)**: 存储键值对 (key-value pairs) 的无序集合，通过键快速查找值。
    *   **字符串 (String / `str`)**: 表示文本数据的不可变序列，拥有丰富的操作方法。
    *   **集合 (Set / `set`)**: 存储不重复元素的无序集合，支持高效的成员检测和集合运算。
*   **控制流语句**：
    *   **`for` 循环**: 用于遍历序列（如列表、元组、字符串）或其他可迭代对象的元素。
    *   **`if-elif-else` 语句**: 实现复杂的条件判断和分支逻辑。
*   **Pythonic 编程风格**: 指的是编写符合Python设计哲学和社区惯例的、优雅、简洁、易读的代码。这不仅仅是语法正确，更关乎代码的组织方式和表达习惯。

---
来源参考：[https://www.thepaper.cn/newsDetail_forward_21329531](https://www.thepaper.cn/newsDetail_forward_21329531)
```
