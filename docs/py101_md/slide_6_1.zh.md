# 第六章 对象

## 你将学到什么

*   Python 中的一切皆为**对象**。
*   对象的构成：
    *   成员属性
    *   成员方法
*   `self` 关键字
*   一些神奇的 "dunder" (双下划线) 方法
*   `@property` 描述符

## 6.1 Python 对象

我们在第一周就已经学习到，“Python 中的一切皆为对象”。那时，我们只提到一个对象由三个部分组成。我曾承诺会告诉你们更多关于对象的知识，现在我们就来深入探讨。

我们已经看到：
*   对基本 Python 语句的抽象形成了循环。
*   对过程的抽象形成了函数。

现在，我们引入另一个抽象层次：
*   对数据和操作之间关系的抽象，以及将变量（数据）封装在对象中，实现数据与操作的分离与统一。

我们首先定义一些对象：
```python
import pandas as pd

a = int(1.0)
b = pd
c = (lambda x: x + 1)
d = type

def func():
    pass
```

!!! question "课堂练习 6.1.1：对象定义"
    ```
    以上定义中，哪些是对象？
    ```

当我们运行 `type(a)` 时，我们会看到变量的类型。当我们定义另一个整数时，它们的类型是相同的。这种一致性表明所有整数都是以相同的方式定义（创建）的。这种方式被概括在名称 `int`之下。我们将这种创建对象的方式称为**类的实例化**。

要实例化一个类，我们首先需要定义一个类：
这与定义函数非常相似，只是我们将 `def` 改为了 `class`。但是，省略号（`...`）背后带来了巨大的差异。

下面的代码通过 `MyInt` 类在内部创建了一个变量 `value`。
```python
class MyInt():
    pass # 一个简单的类定义
```

```python
class MyInt():
    value = 1
```

现在，让我们根据自己的定义来创建一个整数。

!!! question "课堂练习 6.1.2：类的实例化"
    ```
    1. 事实上，`int` 是 Python 定义的一个类。你将如何通过它创建一个整数？
    2. 你将如何通过我们自己的定义（`MyInt`）创建一个整数？
    3. 你将如何根据我们自己的定义创建另一个整数？
    4. 修改一个自定义整数的 `value` 值，看看另一个自定义整数的 `value` 是否会改变。
    5. 你创建的两个自定义整数（`MyInt` 实例）是相同的吗？
    ```

!!! note "关键概念：实例化"
    上述创建不同 `MyInt` 实例的过程被称为**实例化**。

(图片来源示意图：一个制造工厂的卡通画)
来源: https://www.istockphoto.com/photos/cartoon-of-the-manufacturing-plant

## 6.2 `__init__` 方法

正如你所见，如果我们在类的命名空间中定义一个变量（如 `value = 1`），所有实例都会共享这个变量的更改，并同时表现出来。我们需要给每个实例它自己的命名空间。因为这个命名空间是它们自己的，我们称之为 `self` 命名空间。

之前的类属性：
```python
# value = 1
```
应改为实例属性：
```python
# self.value = 1
```

直接强制 Python 创建一个 `self` 对象是行不通的。我们需要提供一个上下文，以便 Python 可以在 “self” 上下文中工作。

!!! note "重要提示"
    `__init__` 方法在面向对象编程中至关重要。注意，我们现在是在一个类内部定义一个函数。

```python
class MyInt():
    def __init__(self, x):
        self.value = x
```

!!! question "课堂练习 6.2.1：调用 `__init__`"
    ```
    1. 你能从全局环境中直接调用 `__init__` 方法吗？
    2. 你应该如何调用它（或者说，它在什么时候被调用）？
    ```

`__init__` 方法被特别地称为**构造器 (constructor)**。它为每个实例设置初始值。调用它时，就好像函数名是类名一样：
```python
# self.value = x # 这行是在 __init__ 方法内部
a = MyInt(2)
```

!!! question "课堂练习 6.2.2：构造器调用的观察"
    ```
    1. 你注意到什么不寻常的地方了吗？（提示：`__init__` 方法的参数和调用时的参数）
    ```

!!! question "课堂练习 6.2.3：定义 `Dog` 类"
    ```
    1. 定义一个 `Dog` 类，每只狗都应该有名字（name）、年龄（age）和体重（weight）。
    2. 创建三只狗：Spike、Luna 和 Puppy。你可以随意设定它们的年龄和体重。
    3. 为所有的狗定义一个 `bark` 方法。当狗吠叫时，在屏幕上打印出它的名字。例如：
       "Spike is barking!"
    ```

## 6.3 其他一些 Dunder 方法

Dunder 方法（双下划线方法，如 `__init__`、`__str__`）是 Python 中具有特殊含义的方法。它们允许我们自定义类的行为。

#### 示例 6.3.1：`__str__` 方法
`__str__` 方法用于定义当对象被转换为字符串时（例如，使用 `print()` 函数或 `str()` 内置函数）的表现形式。

```python
class Cat:
    species = "felion" # felion 应为 feline (猫科动物)

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def __str__(self):
        return f"A {type(self).__name__} named {self.name}."

tom = Cat('Tom', 3)
print(tom)
```

#### 示例 6.3.2：可迭代对象与迭代器 (`__iter__` 和 `__next__`)
`__iter__` 方法返回一个迭代器对象，而迭代器对象则通过 `__next__` 方法逐个返回元素。

首先，一个可迭代类的例子：
```python
# from collections.abc import Iterator # 这行导入通常是需要的，但遵循原文不添加

class MyIterable:
    def __init__(self, *args):
        self.data = args

    def __iter__(self):
        return iter(self.data) # 注意：这里使用了内置的iter()，它会为元组self.data返回一个内置迭代器

i1 = MyIterable(1, 2, 3, 4, 5)
# isinstance(iter(i1), Iterator) # 检查 i1 是否可迭代，并返回一个迭代器
                                 # Iterator 需要从 collections.abc 导入
```

下面是一个自定义迭代器类的（不完整且有问题的）示例，旨在说明 `__next__` 方法的结构：
```python
class MyIterator:
    self.counter = 0 # 注意：此行直接在类体中，且使用self，这在Python中是无效的语法来定义实例变量。
                     # 若意图为类变量，应为 counter = 0。
                     # 若为实例变量，应在 __init__ 方法中定义。

    def __next__(self, i): # 注意：__next__ 的正确签名是 __next__(self)；参数 i 在此未被使用。
        if self.counter < len(self.data): # 注意：self.data 在此类中未定义。
            ans = self.data[self.counter]
            self.counter += 1
            return ans
        else:
            raise StopIteration()
```

!!! note "关于 `MyIterator` 的说明"
    上述 `MyIterator` 类的代码片段源自原始讲义，并按原样呈现。它包含一些在标准 Python 中会导致错误或与预期行为不符的结构 (例如 `self.counter = 0` 直接在类定义下，`__next__` 的参数，以及未定义的 `self.data`)。在实际编程中，迭代器类需要正确实现 `__init__` 来接收数据和初始化计数器，并且 `__next__` 方法的签名应为 `def __next__(self):`。

## 6.4 @property 描述符

在之前的“狗的年龄”练习中，你可以随意设置狗的年龄。然而，狗的年龄不能为负数。为了防止用户给对象的属性设置无意义的值，我们引入了 `@property` 描述符。

考虑以下有问题的 `Dog` 类：
```python
class Dog:
    def __init__(self, age):
        self.age = age # 年龄可以直接设置，没有检查

xiaobai = Dog(2)
xiaohuang = Dog(-1) # -1 是一个无效的年龄
# print(xiaohuang.age) 会输出 -1
```

为了“保护”成员属性 `age` 不被随意赋值，我们使用函数来获取 (get) 和设置 (set) 它。
```python
class Dog:
    def __init__(self, age=0):
        self._age = age # 使用下划线表示这是一个“受保护”的内部变量

    def get_age(self):
        return self._age

    def set_age(self, age):
        if age > 0:
            self._age = age
        else:
            raise ValueError("Age must be positive")
```

下一步是强制用户使用 `get_age` 和 `set_age` 方法。注意，我们还提供了一个默认年龄。
```python
# xiaobai = Dog()
# xiaobai.set_age(2)
# print(xiaobai.get_age())

# xiaohuang = Dog()
# try:
#     xiaohuang.set_age(-1)
# except ValueError as e:
#     print(e)
```

然而，总会有些特立独行的人喜欢用其他方式（比如直接访问 `_age`）。在这种情况下，Python 提供了一个描述符（descriptor），它能将变量转换成一个**属性 (property)**：每当我们访问或更改其值时，都必须通过指定的函数来完成。

（下文应展示 `@property` 的用法，例如：）
```python
class Dog:
    def __init__(self, initial_age=0):
        self._age = initial_age # 内部存储变量

    @property
    def age(self):
        """获取狗的年龄"""
        print("Getter called")
        return self._age

    @age.setter
    def age(self, new_age):
        """设置狗的年龄，并进行验证"""
        print("Setter called")
        if new_age > 0:
            self._age = new_age
        else:
            raise ValueError("Age must be a positive number.")

# 示例用法：
# xiaobai = Dog(2)
# print(xiaobai.age) # 调用 getter
# xiaobai.age = 3    # 调用 setter
# print(xiaobai.age)

# xiaohuang = Dog()
# try:
#     xiaohuang.age = -1 # 调用 setter，将引发 ValueError
# except ValueError as e:
#     print(e)

# xiaohuang.ag # 原文的截断部分
```
!!! info "讲义截断提示"
    原文在此处 (`xiaohuang . ag`) 截断。上述 `@property` 示例代码是对后续内容的合理推测和补充，以完整展示其概念。
# 第六章：Python 对象与高级特性

本章我们将深入探讨 Python 中属性访问的控制机制，特别是 `property` 描述符的使用，并进一步理解 Python对象的本质及其灵活性。

## 6.4 `property` 描述符

在面向对象编程中，我们常常需要控制对类成员属性的访问，以确保数据的完整性和一致性。直接暴露属性可能导致它们被随意修改，从而引入错误或不期望的行为。

### 6.4.1 属性直接访问的问题

让我们以一个 `Dog` 类为例。如果我们直接定义一个 `age` 属性，那么外部代码可以随意设置这个年龄，甚至设置为无效的值，比如负数。

```python
class Dog:
    def __init__(self, age):
        self.age = age

# 创建 Dog 实例
xiaobai = Dog(2)
print(f"小白的年龄: {xiaobai.age}")

# 年龄属性可以直接被修改为无效值
xiaohuang = Dog(-1)
print(f"小黄的年龄: {xiaohuang.age}, 这是一个无效的年龄！")
```

上述代码中，`xiaohuang` 对象的年龄被设置为了 `-1`，这在现实中是不合理的。

### 6.4.2 使用 Getter 和 Setter 方法进行封装

为了“保护”成员属性 `age` 不被随意修改，一种常见的方法是使用 getter（获取）和 setter（设置）方法来间接访问和修改它。按照约定，实际存储数据的属性名通常以下划线开头（例如 `_age`），以表明它是一个内部属性。

```python
class Dog:
    def __init__(self, age=0):  # 提供一个默认年龄
        # 使用一个“内部”属性 _age 来存储年龄
        # 注意：此处为了简化，直接赋值。在更完善的设计中，构造函数也应使用setter进行验证。
        # 或者，提供一个有效的默认值，如 age=1，并通过setter初始化。
        if age <= 0:
            # 如果初始年龄无效，可以抛出异常或设置一个安全的默认值
            print(f"警告：初始年龄 {age} 无效，将使用默认值 1。")
            self._age = 1
        else:
            self._age = age

    def get_age(self):
        print("调用 get_age 方法")
        return self._age

    def set_age(self, new_age):
        print(f"调用 set_age 方法，尝试设置年龄为: {new_age}")
        if new_age <= 0:
            raise ValueError("年龄必须是正数 (Age must be positive)")
        self._age = new_age

# 使用 getter 和 setter
xiaobai = Dog() # 初始年龄为0，按上述逻辑会被警告并设为1
print(f"小白初始年龄: {xiaobai.get_age()}") # 获取的是修正后的年龄

xiaobai.set_age(2)
print(f"小白设置后年龄: {xiaobai.get_age()}")

print("\n尝试为小黄设置年龄:")
xiaohuang = Dog() # 初始年龄为0，按上述逻辑会被警告并设为1
try:
    xiaohuang.set_age(-1)
except ValueError as e:
    print(f"错误: {e}")
```

!!! note "关键概念：封装"
    通过将属性私有化（约定俗成使用 `_` 前缀）并提供公有的 getter/setter 方法，我们可以控制属性的读取和写入逻辑，例如进行数据验证。这体现了面向对象编程的封装原则。

这种方法虽然能解决问题，但用户必须显式调用 `get_age()` 和 `set_age()` 方法，代码可能显得不够简洁。

### 6.4.3 使用 `property` 关键字

Python 提供了一种更优雅的方式——`property` 描述符。它可以将类的方法（getter, setter, deleter）包装成属性，使得用户在访问该属性时，表面上看起来像是直接访问变量，实际上背后调用的是我们指定的方法。

这样，我们既能保持属性访问的简洁语法（如 `object.age`），又能执行必要的逻辑（如验证）。

```python
class Dog:
    def __init__(self, age=1): # 默认年龄设为有效的正数
        self._age = None  # 初始化内部存储变量
        self.age = age    # 此处赋值会触发下面的 set_age_method 方法

    def get_age_method(self):
        print("通过 property 的 getter 获取 age")
        return self._age

    def set_age_method(self, value):
        print(f"通过 property 的 setter 设置 age 为: {value}")
        if value <= 0:
            raise ValueError("年龄必须是正数 (Age must be positive)")
        self._age = value  # 存储在内部变量 _age 中

    # 使用 property() 函数将方法转换为属性
    # 第一个参数是 getter 方法，第二个参数是 setter 方法
    age = property(get_age_method, set_age_method)

# 测试 property 的使用
print("--- 创建小狗实例 (使用 property) ---")
try:
    fluffy = Dog(3)  # __init__ 中 self.age = age 会调用 set_age_method
    print(f"Fluffy 的年龄: {fluffy.age}")  # 调用 get_age_method

    print("\n--- 尝试通过 property 修改年龄 ---")
    fluffy.age = 5  # 调用 set_age_method
    print(f"Fluffy 修改后的年龄: {fluffy.age}") # 调用 get_age_method

    print("\n--- 尝试通过 property 设置非法年龄 ---")
    # 如下代码块中的 xiaohuang.age = -1 语句会触发 set_age_method 并因验证失败而抛出异常
    # xiaohuang = Dog(1) # 假设已创建对象
    # xiaohuang.age = -1
    fluffy.age = -1  # 这会调用 set_age_method 并引发 ValueError

except ValueError as e:
    print(f"错误: {e}")

print("\n--- 尝试使用非法初始年龄创建实例 (使用 property) ---")
try:
    # __init__ 中 self.age = 0 会调用 set_age_method，引发 ValueError
    problem_dog = Dog(0)
except ValueError as e:
    print(f"错误: {e}")
```

!!! info "提示"
    在上面的例子中，当我们执行 `self.age = age` (在 `__init__` 中) 或 `fluffy.age = 5` 时，Python 会自动调用 `set_age_method`。同样，读取 `fluffy.age` 会自动调用 `get_age_method`。这种机制使得属性的访问既安全又直观。
    虽然示例中使用了 `get_age_method` 和 `set_age_method` 这样的名称，但更常见的做法是直接使用名为 `age` (用于 `property`) 的 getter 和 setter 方法，例如 `def age(self): ...` (getter) 和 `def age(self, value): ...` (setter)，然后使用 `@property` 和 `@age.setter` 装饰器，这是一种更 Pythonic 的写法，但 `property()` 函数是其底层机制。

### 6.4.4 Python 描述符简介

`property` 实际上是 Python 描述符（descriptor）的一种应用。描述符是一个实现了特定协议方法（如 `__get__()`, `__set__()`, `__delete__()`）的类。当一个描述符实例作为另一个类（宿主类）的类属性时，对该属性的访问会被描述符的方法拦截。

Python 中有许多其他有用的描述符，它们是实现许多 Python核心特性的基石，例如方法绑定、类方法 (`@classmethod`) 和静态方法 (`@staticmethod`) 等。深入理解描述符有助于更好地掌握 Python 的对象模型。

## 6.5 Python 对象

现在让我们从更宏观的视角讨论：既然类的所有功能似乎都可以用“普通”的 Python 变量和函数来实现，那我们为什么还需要对象呢？

原因可能因人而异，但其中一个最重要的原因是**对象带来的便利性，尤其是在我们需要分离变量（通过创建新的命名空间）时**。

### 6.5.1 为什么需要对象？—— 课堂思考

!!! question "课堂思考：学生信息管理"
    假设我们要在一个课程中管理学生信息。

    1.  本学期有76名学生。如果要为每位学生创建一个档案，存储他们的姓名、作业成绩、年龄、班级等信息。你会用什么方式来实现？
    2.  到了下个学期，有新的学生入学。你将如何自动化这个系统来存储新学生的信息？
    3.  你更倾向于创建一个 Python 类，还是使用一些全局变量来管理这些数据？为什么？
    4.  现在由于隐私问题，我们只希望每个学生的分数仅对该学生本人可见（或通过特定授权访问）。你将如何修改你的代码来实现这一需求？

### 6.5.2 Python 对象的灵活性

Python 对象非常灵活。你甚至可以在运行时动态地为对象创建属性：

```python
import pandas as pd # 示例需要 pandas 库

# 创建一个 pandas DataFrame 对象
df = pd.DataFrame(
    [[1, 2], [3, 4]],
    columns=["A", "B"],
    index=["a", "b"]
)
print("原始 DataFrame:")
print(df)

# 在运行时为 df 对象动态添加一个新属性 'C' (这也是一个新的列)
df.C = [5, 6]

print("\n添加新列 'C' 后的 DataFrame:")
print(df)
```

这个例子展示了 Pandas DataFrame 对象允许动态添加列（在 Pandas 中，列可以被视为对象的属性）。这种动态性是 Python 灵活性的一个体现，但也应谨慎使用，以避免代码变得难以理解和维护。

## 编程范式 (Programming Paradigm)

(此部分内容在原始讲义中未展开，通常会讨论面向对象编程（OOP）作为一种编程范式，以及它与其他范式如过程式编程、函数式编程等的比较和结合。)
