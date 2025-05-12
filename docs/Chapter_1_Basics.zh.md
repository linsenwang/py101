# 第一章 基础：可迭代对象与迭代器

*来源：Programming for AI (Python), 马国良 (Guoliang Ma), The Chow Institute, 2025*

## 可迭代对象 (Iterables)

通俗地说，我们可以将**可迭代对象 (Iterables)** 看作是一种类型。但更准确地说，可迭代对象指的是 Python 中任何具有某些共同特性、允许被迭代（遍历）的对象。

### 可迭代对象的主要特性

1.  **可用于 `for` 循环：**
    这是最常见的用例。所有可迭代对象都可以传递给 `for` 循环。这与其名称直接对应：*能够* (ABLE) 被*迭代* (ITERated)。
    ```python
    my_list = [10, 20, 30] # 列表是一个可迭代对象
    for item in my_list:
        print(item)
    ```

2.  **可用于 `iter()` 函数：**
    只有可迭代对象才能作为参数传递给内置的 `iter()` 函数而不会引发错误。`iter()` 函数从可迭代对象返回一个*迭代器* (iterator) 对象。
    ```python
    a = [1, 2, 3]  # list 是可迭代对象
    b = 1          # int 不是可迭代对象

    iterator_a = iter(a) # 正确获取一个迭代器对象
    print(iterator_a)

    # iter(b)          # 这会引发 TypeError: 'int' object is not iterable
    ```

3.  **包含 `__iter__` 方法：**
    从技术上讲，是什么让一个对象成为可迭代对象？它必须实现特殊方法 `__iter__`。
    Python 中的一切都是对象，对象包含数据和方法。你可以使用 `dir()` 来检查对象的内容。
    ```python
    a = [1, 2, 3]
    print(dir(a)) # 你会在输出中找到 '__iter__'
    ```
    可迭代对象的决定性属性就是这个 `__iter__` 方法的存在。当你调用 `iter(a)` 时，Python 内部会调用 `a.__iter__()`。这只有在对象 `a` 确实拥有 `__iter__` 方法时才有效。

4.  **`for` 循环的回退机制：`__getitem__`（较少见）：**
    原文提到，有时*没有* `__iter__` 方法的对象，如果实现了 `__getitem__` 方法（用于索引，如 `my_list[0]`），也可能在 `for` 循环中工作。这主要是为了向后兼容性。定义迭代的标准方式是通过 `__iter__`。

## 迭代器 (Iterators)

迭代器与可迭代对象密切相关。

*   **迭代器*本身就是*可迭代对象：** 迭代器本身也必须拥有 `__iter__` 方法。这意味着迭代器也可以传递给 `iter()`，通常会返回它自身。
*   **迭代器拥有 `__next__` 方法：** 迭代器与普通可迭代对象的区别在于 `__next__` 方法的存在。这个方法负责产生序列中的*下一个*项，并在没有更多项时引发 `StopIteration` 异常。

```python
my_list = [1, 2]
my_iterator = iter(my_list) # 从列表（可迭代对象）获取迭代器

# 检查方法（示意性 - dir() 输出很长）
# print(dir(my_iterator)) # 会包含 __iter__ 和 __next__

# 迭代器如何工作（for 循环的幕后机制）
print(next(my_iterator)) # 输出: 1
print(next(my_iterator)) # 输出: 2
# print(next(my_iterator)) # 会引发 StopIteration 异常
```

## 为何要区分可迭代对象和迭代器？

*   **可迭代对象 (Iterables)：** 可以将其视为数据*源*或*容器*（如列表、元组、字符串、字典、文件等）。Python 提供了许多内置的可迭代对象。它们在迭代中的主要作用是在被请求时（通过 `iter()` 或隐式地由 `for` 循环）提供一个*迭代器*。

*   **迭代器 (Iterators)：** 可以将其视为执行实际迭代的*执行者* (worker)，它跟踪当前位置并*按需*获取下一项。我们需要迭代器来实现**惰性求值 (lazy evaluation)**。这意味着：
    *   值是逐个生成的，仅在 `next()` 请求时才生成。
    *   这非常节省内存，特别是对于大型数据集或潜在的无限序列，因为不需要一次将整个序列存储在内存中。
    *   它允许计算仅在必要时发生。

总结：通常，你在 `for` 循环中使用**可迭代对象**（如列表）。在幕后，Python 使用 `__iter__` 从可迭代对象获取一个**迭代器**，然后重复调用该迭代器的 `__next__` 方法来获取每一项，直到引发 `StopIteration`。
