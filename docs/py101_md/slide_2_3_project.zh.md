# 第二章 函数

本章我们将通过一些以往的期中测试题来练习函数的使用，这些题目能够帮助你了解期中测试中可能会遇到的题型。

## 练习题：计算序列中的连续“1”的次数（2024年秋季期中考试题3）

!!! question "练习：统计投掷硬币序列中连续“1”的出现次数"
    当我们投掷一枚硬币时，可能出现两种结果：正面（Head）或反面（Tail）。如果出现正面，我们在纸上记下数字“1”；如果出现反面（在这个例子中称作“花”），我们记下“0”。我们将硬币投掷 `n` 次，并记录下所有的结果。

    例如，一个投掷序列可能被记录为：`1 0 1 1 1 0 1 0 1 1 0 0`。

    我们定义连续出现的“1”为一个“run”。在上面的例子中，序列 `1 0 1 1 1 0 1 0 1 1 0 0` 包含以下“run”：
    *   `1` (在序列开头)
    *   `1 1 1`
    *   `1` (在 `0 1 0` 中)
    *   `1 1`
    所以，这个序列总共有 4 个“run”。

    在 Python 中，你可以使用以下代码生成一个随机的01序列：
    ```python
    import random
    n = 10
    s1 = [random.randint(0, 1) for _ in range(n)]
    print(s1) # 方便查看生成的序列
    ```

    **任务：**
    请编写一个 Python 函数，该函数接收一个由0和1组成的列表（序列），计算并返回该序列中“run”（连续的“1”）的个数。

## 练习题：创建计时装饰器（2024年秋季期中考试题4）

!!! question "练习：实现一个函数计时装饰器 `timer_100`"
    对于程序员来说，代码的执行速度是一个重要的考量因素。因此，程序员们常常会尝试用不同的方法编写函数，并测试各个版本代码的运行时间。

    **任务：**
    为了简化这一测试过程，请创建一个名为 `timer_100` 的装饰器。该装饰器需要完成以下功能：
    1.  当被装饰的函数被调用时，自动执行该函数100次。
    2.  在100次执行完毕后，打印一行信息，包含这100次执行的平均时间和标准差。

    **示例用法：**
    ```python
    import random
    import time # 需要 time 模块来计时
    import math # 需要 math 模块计算标准差的平方根

    # 你需要在这里定义 timer_100 装饰器

    @timer_100
    def sums():
        numbers = [random.random() for _ in range(10)] # 原文为 range(10)，应为 range(1000) 或更大才有意义
        sum(numbers)

    sums()
    ```

    **示例输出格式：**
    ```
    The average run time is 0.000609s; the std is 0.076s
    ```
    (注意：具体的数值会根据你的计算机性能和 `sums` 函数的实际复杂度而有所不同。)

## 练习题：拟牛顿法（Secant Method）实现

!!! question "练习：实现割线法求解方程"
    牛顿法（Newton's method）在求解方程的根时有一些限制：
    *   起始点需要选择在解的附近。
    *   函数必须是可微的。

    当函数不可微，或者导数难求时，我们需要依赖其他方法。例如，割线法（Secant method）就是一种常用的替代方法。其迭代公式如下：

    $x_{n+1} = x_n - f(x_n) \frac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})}$

    !!! note "关于教材中的割线法公式"
        教材中提供的原始公式为： $x_{n+1} = x_n - f(x_n) \frac{x_n - x_{n+1}}{f(x_n) - f(x_{n+1})}$。
        这个形式将 $x_{n+1}$ 同时放在了等式的两边，并且 $f(x_{n+1})$ 在计算 $x_{n+1}$ 时是未知的，这使得直接迭代求解变得复杂或不可能。
        通常，割线法的标准迭代公式使用前两个点 $x_n$ 和 $x_{n-1}$ 来计算下一个点 $x_{n+1}$，如上方修正后的公式所示。在实现时，请优先考虑使用标准的割线法公式。若严格按照原始公式，则需要对方程进行代数变换或采用特殊解法。

    **任务：**
    1.  请实现割线法。
    2.  使用你实现的割线法求解方程 $f(x) = x^3 - x - 1 = 0$。
        (原始题目中给出的方程是 $f(x) = x-3-1=0$，即 $f(x)=x-4=0$。这个方程过于简单，其解为 $x=4$，无需数值方法。为了更好地练习割线法，我们这里采用一个更典型的非线性方程 $f(x) = x^3 - x - 1 = 0$。当然，你也可以尝试实现原始题目中的 $f(x)=x-4=0$。)

## 练习题：条件生成器调用

!!! question "练习：根据时间奇偶性调用不同生成器"
    **任务：**
    你需要编写两个生成器和一个主函数：

    1.  **生成器1 (`odd_second_gen`)：**
        *   当被调用（即执行 `next()`）时，打印一行信息：“it is an odd second.”
        *   获取当前时间（`time.time()`），并将其作为生成的值 `yield` 出来（原始描述为“saves the current time for future use”，这里理解为 `yield` 该值）。

    2.  **生成器2 (`even_second_gen`)：**
        *   当被调用时，打印一行信息：“it is an even second.”
        *   获取当前时间，并将其作为生成的值 `yield` 出来。

    3.  **主函数 (`conditional_caller`)：**
        *   该函数获取当前时间 `time.time()`。
        *   判断当前时间的整数部分是奇数还是偶数。
        *   如果整数部分是奇数，则调用（执行一次 `next()`）生成器1。
        *   如果整数部分是偶数，则调用（执行一次 `next()`）生成器2。
        *   函数应返回被调用生成器所 `yield` 的时间值。

    你需要导入 `time` 模块来获取当前时间。
