# 第三章 NumPy 与 Pandas

在本章中，你将学习到：

*   一种新的、更通用的数据结构：数组 (array)
*   NumPy 的入门级数据结构：ndarray
*   NumPy 的基本函数
*   (你需要阅读大量函数文档)
*   使用 NumPy 进行矩阵运算
*   广播 (broadcast) 机制
*   通过向量化 (vectorization) 加速计算

## 3.1 NumPy 模块

距离我们上次使用 conda 环境已经有一段时间了。让我们打开命令行提示符并安装这两个模块。
我们之后会主要使用 Pandas，但了解 NumPy 中的一些基本操作对于我们处理数据非常重要。
本章只会涵盖 NumPy 模块的一小部分内容。有关官方介绍，请参阅[此页面](https://numpy.org/doc/stable/user/quickstart.html) (虽然官方文档是英文的，但它是最权威的参考资料)。

!!! info "安装 NumPy 和 Pandas"
    如果你尚未安装，可以使用 conda 进行安装：
    ```bash
    conda install numpy
    conda install pandas
    ```
    示例命令输出：
    ```
    (base) C:\Users\glma>conda install numpy
    (base) C:\Users\glma>conda install pandas
    ```

### 3.1.1 NumPy 模块 (ndarray)

我们已经学习过，复杂数据类型可以容纳多个元素（可能具有不同类型）。将数字放入序列的类似想法催生了数组类型。
根据 NumPy 文档：“在计算机编程中，数组是一种用于存储和检索数据的结构。”

!!! note "NumPy 数组的特点"
    我们强调 NumPy 数组的两个主要特点：
    *   它们具有固定的大小（元素数量）。
    *   所有元素必须是相同的数据类型。

让我们创建一些数组。我们可以使用 `dtype` (代表数据类型 data type) 参数来指定元素的类型。

```python
import numpy as np

a = np.array([1, 2, 3])
b = np.array([1, 2, 'a']) # 当列表包含不同类型时，NumPy 会尝试找到一个通用的数据类型（这里是字符串）
c = np.array([a, b], dtype=object) # 由于 a 和 b (转换后) 的元素类型或结构可能不同，指定 dtype=object 可以容纳它们
# d = np.array([a, 'python']) # 这种创建方式通常会导致 dtype=object 的数组，如果元素类型不一致

print("a:", a, "dtype:", a.dtype)
print("b:", b, "dtype:", b.dtype)
print("c:", c, "dtype:", c.dtype)

a = np.array(a, dtype=float) # 将数组a的元素类型显式转换为浮点数
print("a (float):", a, "dtype:", a.dtype)
```

!!! note "回顾练习说明"
    在学习装饰器 (decorators) 之前，让我们回顾一下已学的内容。下面的练习旨在巩固基础知识。

!!! question "课堂练习 1：元组数据处理"  
    给定元组 `t1 = (1, 2, 3, 4, 5)`：
    
    1.  编写一个函数计算 `t1` 的平均值。
    2.  编写一个函数计算 `t1` 的标准差。
    3.  编写一个函数计算 `t1` 的偏度 (skewness)。
    
    ```python
    t1 = (1, 2, 3, 4, 5)
    
    # 提示：
    # 平均值 = 总和 / 数量
    # 方差 = Σ(x_i - μ)^2 / N
    # 标准差 = sqrt(方差)
    # 偏度 = [ N / ((N-1)*(N-2)) ] * Σ [ (x_i - μ) / σ ]^3  (样本偏度)
    # 或 偏度 = (1/N) * Σ [ (x_i - μ) / σ ]^3 (总体偏度，如果使用总体标准差)
    
    # 请在此处编写你的函数

    # 示例函数框架：
    # def calculate_mean(data):
    #     # ...
    #     return mean_val
    
    # def calculate_std_dev(data):
    #     # ...
    #     return std_dev_val
    
    # def calculate_skewness(data):
    #     # ...
    #     return skewness_val
    ```

NumPy 模块还为我们提供了一些有用的函数来创建特殊的 ndarray：

*   `ones()`: 创建所有元素为 1 的 ndarray。
*   `zeros()`: 创建所有元素为 0 的 ndarray。
*   `eye()`: 创建单位矩阵 (对角线为1，其余为0)。
*   `random.random()`: 创建元素为 $0 \le x < 1$ 之间均匀分布随机数的 ndarray。
*   `random.normal()`: 创建元素服从正态分布的随机数 ndarray。
*   `random.randint()`: 创建元素为指定范围内随机整数的 ndarray。

我们可以使用 `numpy.arange` 来创建一个类似 Python 内置 `range` 函数的序列，但返回的是一个 NumPy 数组。
我们也可以使用 `numpy.linspace` 来创建一个等差序列，可以指定序列的起始值、终止值和元素数量。

```python
import numpy as np

# 示例:
arr_ones = np.ones((2, 3)) # 创建一个2x3的全1数组
print("np.ones((2,3)):\n", arr_ones)

arr_zeros = np.zeros(5) # 创建一个长度为5的全0数组
print("np.zeros(5):\n", arr_zeros)

arr_eye = np.eye(3) # 创建一个3x3的单位矩阵
print("np.eye(3):\n", arr_eye)

arr_rand_uniform = np.random.random((2,2)) # 创建一个2x2的随机数组 (元素在[0,1)之间均匀分布)
print("np.random.random((2,2)):\n", arr_rand_uniform)

arr_rand_normal = np.random.normal(loc=0, scale=1, size=(2,2)) # 创建一个2x2的随机数组 (元素服从均值为0，标准差为1的正态分布)
print("np.random.normal(loc=0, scale=1, size=(2,2)):\n", arr_rand_normal)

arr_rand_int = np.random.randint(low=0, high=10, size=5) # 创建包含5个随机整数的数组 (范围在[0, 10)之间)
print("np.random.randint(low=0, high=10, size=5):\n", arr_rand_int)

arr_arange = np.arange(0, 10, 2) # 类似range(0, 10, 2)，但不包括10
print("np.arange(0, 10, 2):\n", arr_arange)

arr_linspace = np.linspace(0, 1, 5) # 在0和1之间生成5个等间隔的数 (包括0和1)
print("np.linspace(0, 1, 5):\n", arr_linspace)
```

!!! question "课堂练习 2：创建三维正态分布数组"  
    创建一个形状为 (2, 3, 4) 的三维 ndarray。该 ndarray 的每个元素都应服从均值为 5，标准差为 3 的正态分布。
    
    ```python
    # 在这里编写你的代码
    # mean_val = 5
    # std_dev_val = 3
    # shape_val = (2, 3, 4)
    # random_3d_array = np.random.normal(loc=mean_val, scale=std_dev_val, size=shape_val)
    # print(random_3d_array)
    ```

!!! question "课堂练习 3：arange 与 linspace 的区别"  
    `numpy.arange` 和 `numpy.linspace` 有什么主要区别？请从它们如何确定序列中的值以及参数的意义方面进行说明。
    

### 3.1.2 NumPy 模块 (向量化)

NumPy 在 Python 数据分析中如此流行和重要的原因在于其在数学运算，特别是矩阵代数方面的强大能力。这使得 NumPy 在处理向量和矩阵运算时非常高效。

!!! quote "NumPy 与向量化"
    有些作者甚至写道：“NumPy 的核心就是向量化 (NumPy is all about vectorization)。”

!!! note "向量化 (Vectorization)"
    向量化是指使用 NumPy 的数组操作来代替显式的循环。这些操作通常在编译后的 C 代码中执行，因此比纯 Python 循环快得多。

NumPy 是用 C 语言实现的，因此即使我们用 Python 编写代码，其执行速度也非常快。

**示例 3.1.2.1 NumPy 比列表快多少？**

```python
import numpy as np
import time

size = 10_000_000

python_list = list(range(size))
numpy_array = np.arange(size)

# Python 列表操作计时
stime_list = time.perf_counter()
python_list_squared = [x**2 for x in python_list]
etime_list = time.perf_counter()
list_time = etime_list - stime_list
print(f"Python 列表操作耗时: {list_time:.5f} 秒")

# NumPy 数组操作计时
stime_numpy = time.perf_counter()
numpy_array_squared = numpy_array ** 2
etime_numpy = time.perf_counter()
numpy_time = etime_numpy - stime_numpy
print(f"NumPy 数组操作耗时: {numpy_time:.5f} 秒")

# 结果比较
if numpy_time > 0 : # 避免除以零错误
    print(f"在这个例子中，NumPy 比 Python 列表快 {list_time / numpy_time:.2f} 倍。")
else:
    print("NumPy 操作时间过短，无法精确比较。")
```

### 3.1.3 NumPy 模块 (矩阵代数)

在线性代数中，你学习了如何将两个维度匹配的矩阵相加：
$M_1 = \begin{pmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{pmatrix}$, $M_2 = \begin{pmatrix} 6 & 5 & 4 \\ 3 & 2 & 1 \end{pmatrix}$
$M_1 + M_2 = \begin{pmatrix} 1+6 & 2+5 & 3+4 \\ 4+3 & 5+2 & 6+1 \end{pmatrix} = \begin{pmatrix} 7 & 7 & 7 \\ 7 & 7 & 7 \end{pmatrix}$

!!! question "课堂练习 4：矩阵加法实现"  
    1.  使用 Python 列表（嵌套列表表示矩阵）实现上述矩阵加法。
    2.  使用 NumPy ndarray 实现上述矩阵加法。
    
    ```python
    # 1. 使用 Python 列表实现
    # M1_list = [[1, 2, 3], [4, 5, 6]]
    # M2_list = [[6, 5, 4], [3, 2, 1]]
    # result_list = [[0, 0, 0], [0, 0, 0]] # 初始化结果列表
    # for i in range(len(M1_list)):
    #     for j in range(len(M1_list[0])):
    #         result_list[i][j] = M1_list[i][j] + M2_list[i][j]
    # print("List addition result:", result_list)

    # 2. 使用 NumPy 实现
    # import numpy as np
    # M1_np = np.array([[1, 2, 3], [4, 5, 6]])
    # M2_np = np.array([[6, 5, 4], [3, 2, 1]])
    # result_np = M1_np + M2_np
    # print("NumPy addition result:\n", result_np)
    ```

在 NumPy 中，我们也可以将一个向量加到一个矩阵的每一行或每一列。
当我们对 NumPy 数组使用数学运算符（`+`、`-`、`*`、`/` 等）时，NumPy 引入了一种称为 **广播 (broadcasting)** 的机制。

!!! note "广播 (Broadcasting)"
    广播描述了 NumPy 在算术运算期间如何处理具有不同形状的数组。在满足特定规则的前提下，如果两个数组的形状不完全相同，NumPy 会自动扩展（或“广播”）较小数组的维度，使其形状与较大数组兼容，以便可以进行逐元素运算。

这意味着“较小”的 ndarray 会被扩展（或“广播”）以匹配“较大” ndarray 的形状，然后进行元素级运算。

```python
import numpy as np

m1 = np.array([[1, 2, 3], 
               [4, 5, 6], 
               [7, 8, 9]]) # m1 的形状是 (3, 3)
v1 = np.array([1, 1, 1])   # v1 的形状是 (3,) 

# 运算 m1 + v1 时：
# 1. NumPy 比较 m1 (3,3) 和 v1 (3,) 的形状，从尾部维度开始。
# 2. 最后一个维度：m1 是 3，v1 是 3。匹配。
# 3. 向前一个维度：m1 是 3，v1 没有这个维度。
# 4. 广播规则：如果一个数组的维度较少，或者某个维度的大小为1，则该维度可以被“拉伸”以匹配另一个数组。
#    在此例中，v1 被视为 [[1, 1, 1]]，然后这个行向量被“复制”3次，形成：
#    [[1, 1, 1],
#     [1, 1, 1],
#     [1, 1, 1]]
#    然后与 m1 进行逐元素相加。
result = m1 + v1 
print("m1:\n", m1)
print("v1:", v1)
print("m1 + v1 (广播行向量到每一行):\n", result)
# 输出:
# [[ 2  3  4]
#  [ 5  6  7]
#  [ 8  9 10]]

# 如果想将列向量加到每一列，需要确保列向量的形状正确
v_col = np.array([[1], [1], [1]]) # v_col 的形状是 (3, 1)
# 运算 m1 + v_col 时：
# 1. m1 (3,3) vs v_col (3,1)
# 2. 最后一个维度：m1 是 3，v_col 是 1。v_col 的维度1被广播到3。
# 3. 前一个维度：m1 是 3，v_col 是 3。匹配。
#    v_col 被视为 [[1,1,1], [1,1,1], [1,1,1]] (转置后的样子)
result_col = m1 + v_col
print("v_col:\n", v_col)
print("m1 + v_col (广播列向量到每一列):\n", result_col)
# 输出:
# [[2 2 2]
#  [5 5 5]
#  [8 8 8]]
```

!!! question "课堂练习 5：广播中的“大小”"  
    1.  在广播机制中，我们提到“较小”和“较大”的数组。这里的“较小”和“较大”具体指什么？（提示：与数组的维度和形状 (shape) 以及广播规则如何比较它们有关）
    

如果数组的尺寸不匹配任何维度，且不符合广播规则，会发生什么？
```python
import numpy as np

m1 = np.array([[1, 2, 3], 
               [4, 5, 6], 
               [7, 8, 9]]) # m1 的形状是 (3, 3)
v_mismatch = np.array([1, 1]) # v_mismatch 的形状是 (2,)

# m1 的形状是 (3, 3)，v_mismatch 的形状是 (2,)
# 比较尾部维度：m1 的最后一个维度是 3，v_mismatch 的最后一个（也是唯一一个）维度是 2。
# 因为 3 != 2 且两者都不为 1，所以它们不兼容，无法广播。
try:
    result = m1 + v_mismatch
    print(result)
except ValueError as e:
    print(f"发生错误: {e}")
# 输出:
# 发生错误: operands could not be broadcast together with shapes (3,3) (2,) 
```

在线性代数中，我们还学习了如何转置一个矩阵：
例如，若 $M_1 = \begin{pmatrix} 0 & 1 & 2 & 3 \\ 4 & 5 & 6 & 7 \\ 8 & 9 & 10 & 11 \end{pmatrix}$，其形状为 (3, 4)。
则其转置 $M_1^T = \begin{pmatrix} 0 & 4 & 8 \\ 1 & 5 & 9 \\ 2 & 6 & 10 \\ 3 & 7 & 11 \end{pmatrix}$，形状为 (4, 3)。

这也可以用 NumPy 轻松完成，通过访问数组的 `.T` 属性：
```python
import numpy as np

m1 = np.array([
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11]
])
print("原始矩阵 m1 (shape {}):\n{}".format(m1.shape, m1))

m1_T = m1.T
print("转置矩阵 m1.T (shape {}):\n{}".format(m1_T.shape, m1_T))
```

!!! question "课堂练习 6：`.T` 与 `numpy.transpose()`"  
    1.  NumPy 中还有一个 `numpy.transpose()` 函数。它与数组的 `.T` 属性有什么区别？（提示：考虑多维数组的情况，例如三维或更高维数组的转置）
    

NumPy 的 ndarray 甚至更加灵活，我们可以使用 `reshape` 方法来改变 NumPy ndarray 的形状，只要总元素数量保持不变。
```python
import numpy as np

m1 = np.array([
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11]
]) # m1 的形状是 (3, 4)，总共 12 个元素
print("原始 m1 (shape {}):\n{}".format(m1.shape, m1))

# 重塑为一维数组 (向量)，包含12个元素
m11 = m1.reshape(12)
print("m11 (reshape(12)):", m11, "形状:", m11.shape)

# 另一种表示一维数组的方式，使用元组 (12,)
m12 = m1.reshape((12,)) # 与 m1.reshape(12) 效果相同
print("m12 (reshape((12,))):", m12, "形状:", m12.shape)

# 重塑为列向量 (12行1列)
m13 = m1.reshape((12, 1))
print("m13 (reshape((12,1))) 形状:", m13.shape)
print("m13.T (转置后，形状 {}):\n{}".format(m13.T.shape, m13.T)) # 打印其转置以节省垂直空间

# 重塑为其他二维形状，例如 (2行6列)
m14 = m1.reshape((2, 6))
print("m14 (reshape((2,6))) 形状:", m14.shape)
print("m14:\n", m14)
# print("m14.T (转置后，形状 {}):\n{}".format(m14.T.shape, m14.T)) # 原文有 m14.T，这里也展示一下

# 使用 -1 让 NumPy 自动计算缺失的维度
# 例如，如果我们想得到一个有 4 列的数组，行数可以自动计算 (12元素 / 4列 = 3行)
m15 = m1.reshape((-1, 4))
print("m15 (reshape((-1,4))) 形状:", m15.shape) # 结果应为 (3,4)
print("m15:\n", m15)

m16 = m1.reshape((6, -1))
print("m16 (reshape((6,-1))) 形状:", m16.shape) # 结果应为 (6,2)
print("m16:\n", m16)
```

### 3.1.4 再谈向量化

NumPy 之所以更快，是因为它将许多操作（如算术运算、聚合等）委托给用 C 或 Fortran 编写的预编译、高度优化的代码。这些底层实现通常：
*   **使用循环更少**：许多向量化操作在底层仍然使用循环，但这些循环是在 C 中实现的，比 Python 中的显式 `for` 循环快得多。
*   **内存访问优化**：NumPy 数组在内存中是连续存储的（通常情况下），这使得数据访问更快，并且可以更好地利用 CPU 缓存。
*   **利用 SIMD 指令**：现代 CPU 支持单指令多数据 (SIMD) 指令，允许对数据的多个部分同时执行相同的操作。NumPy 库（及其依赖的线性代数库如 BLAS, LAPACK）通常会利用这些指令。
*   **减少 Python 解释器的开销**：对于大规模数据，Python 解释器的每次迭代开销（类型检查、函数调用等）会累积起来。向量化操作将整个计算任务交给底层代码一次性处理，大大减少了这种开销。

(原文在此处中断，以上为根据上下文补充的解释)
好的，这是根据您的要求转换和整理的课程讲义内容：

```markdown
# NumPy 数组操作进阶

## 3.1.3 NumPy 模块 (矩阵代数)

在某些情况下，当进行算术运算的两个数组的维度不完全匹配时，NumPy 会尝试通过“广播”（Broadcasting）机制来使它们兼容。但是，如果维度完全不兼容，将会产生错误。

例如，如果我们尝试将一个 3x3 矩阵与一个只有2个元素的一维数组相加：

```python
import numpy as np

m1 = np.array([[1,2,3],[4,5,6],[7,8,9]])
v1 = np.array([1,1])
# 下面的操作将会导致 ValueError，因为 v1 的大小 (2,) 无法广播到 m1 的大小 (3,3)
# m1 + v1
```

!!! note "注意"
    上述代码 `m1 + v1` 会因为维度不匹配而引发 `ValueError: operands could not be broadcast together with shapes (3,3) (2,)`。NumPy的广播规则要求维度要么相等，要么其中一个为1。

在线性代数中，我们学习了如何转置矩阵：
$$
M_1 = \begin{pmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{pmatrix}, \quad M_1^T = \begin{pmatrix} 1 & 4 \\ 2 & 5 \\ 3 & 6 \end{pmatrix}
$$
这在 NumPy 中也可以轻松实现：

```python
m1 = np.array([
    [0,1,2,3],
    [4,5,6,7],
    [8,9,10,11]
])
m1T = m1.T
print("原始矩阵 m1:\n", m1)
print("转置矩阵 m1T:\n", m1T)
```

!!! question "课堂练习 6.1"
    `numpy` 模块中有一个 `numpy.transpose()` 函数。它与使用数组的 `.T` 属性有何区别？

    !!! info "提示"
        实际上，对于二维数组（矩阵）而言，`.T` 是 `numpy.transpose()` 的一个特例或快捷方式。`numpy.transpose()` 提供了更灵活的轴变换功能，尤其对于高维数组。对于二维数组，两者的效果是相同的。

NumPy 的 `ndarray` 对象甚至更加灵活，我们可以使用 `.reshape()` 方法来改变 `ndarray` 的形状。

```python
m1 = np.array([
    [0,1,2,3],
    [4,5,6,7],
    [8,9,10,11]
]) # m1 的形状是 (3, 4)

# 将 m1 重塑为一维数组 (向量)
m11 = m1.reshape(12)
print("m11:", m11, ":", m11.shape)

# 另一种重塑为一维数组的方式
m12 = m1.reshape([12,])
print("m12:", m12, ":", m12.shape)

# 重塑为列向量 (12行1列)
m13 = m1.reshape([12,1])
print("m13 转置后:", m13.T, ":", m13.shape) # m13.T 的形状是 (1, 12)

# 重塑为 2x6 的矩阵
m14 = m1.reshape([2,6])
print("m14 转置后:", m14.T, ":", m14.shape) # m14.T 的形状是 (6, 2)
```

## 3.1.4 再谈向量化 (Revisit vectorization)

NumPy 之所以快速，很大程度上归功于其向量化的特性。回想一下，我们曾经尝试将一个数字加到一个 Python 列表中：

```python
lst = [1,2,3]
# 下面的操作会引发 TypeError，因为列表不支持直接与标量进行算术运算
# lst + 4
```
输出会是：
```
TypeError: can only concatenate list (not "int") to list
```

但是对于 NumPy 的 `ndarray`，我们可以轻松地将一个标量加到数组的每个元素上：
```python
arr = np.array([1,2,3])
arr_plus_4 = arr + 4
print(arr_plus_4)
```
输出：
```
[5 6 7]
```

!!! note "关键概念: 通用函数 (ufuncs)"
    更广泛地说，我们引入 NumPy 的一些**通用函数 (universal functions, ufuncs)**。使用它们的原因不仅仅是速度快，还在于其易用性。我们已经看到列表操作远慢于 `ndarray` 操作。现在，让我们将注意力集中在循环和 `ufuncs` 应用于 `ndarray` 时的比较上。(部分代码摘自 Jake VanderPlas 的《Python Data Science Handbook》)。

让我们从“普通”函数开始。

### 示例 3.1.4.1：计时器装饰器与普通函数

首先，定义一个计时器装饰器，用于评估函数执行100次的平均时间和标准差。

```python
import time
import numpy as np

def timer_100(func):
    """一个装饰器，用于测量函数运行100次的平均时间和标准差"""
    times = []
    def wrapper(*args, **kwargs):
        for _ in range(100):
            stime = time.time()
            func(*args, **kwargs)
            etime = time.time()
            times.append(etime - stime)
        avg = np.mean(times)
        std = np.std(times)
        print(f"函数 {func.__name__} 的平均运行时间是 {avg:.6f}s; 标准差是 {std:.6f}s")
        # 注意：为了在实际应用中获取函数返回值，wrapper 应该 return func(*args, **kwargs)
        # 但在此处，我们主要关注计时，所以省略了实际结果的返回
        # 如果需要返回结果，可以在循环外调用一次并返回
        return func(*args,**kwargs) # 或者不返回，取决于是否需要结果
    return wrapper
```

现在，我们定义一个使用循环计算倒数的函数，并用计时器装饰它：

```python
@timer_100
def compute_reciprocals(nums):
    output = np.empty(len(nums))
    for i in range(len(nums)):
        output[i] = 1.0 / nums[i]
    return output

# 使用一个包含10000个随机整数的数组进行测试
large_array = np.random.randint(1, 100, size=10_000)
result_loop = compute_reciprocals(large_array)
```

接下来，我们定义一个使用 NumPy 向量化操作计算倒数的函数：

```python
@timer_100 # 同样使用计时器
def numpy_reciprocals(nums):
    return 1.0 / nums

# 使用相同的数组进行测试
result_numpy = numpy_reciprocals(large_array)
```
通过运行上述代码，你会发现 `numpy_reciprocals` 的执行速度远快于 `compute_reciprocals`。

!!! question "课堂练习 7.1"
    虽然我们看到 `compute_reciprocals` 和 `numpy_reciprocals` 之间的时间差异巨大，但我们还没有检查它们的答案是否正确。请验证这两个函数的正确性。

    !!! info "验证方法"
        可以使用 `np.allclose(result_loop, result_numpy)` 来比较两个浮点数数组是否在容差范围内近似相等。

除了像 `+`, `-`, `*`, `/` 这样的常用运算符外，许多常用的数学函数，包括 `abs`, `sin`, `cos`, `tan`, `arcsin`, `arccos`, `arctan`, `exp`, 和 `log`，都是 NumPy 的 `ufuncs`。NumPy 还提供了更多。例如，`expm1` 计算 `exp(x)-1`，而 `log1p` 计算 `log(1+x)`，这些函数在 `x` 很小时能提供更高的精度。

尽管 `ufuncs` 非常丰富，但有时我们仍然发现它们不足以支持我们需要的所有类型的操作。NumPy 提供了 `numpy.vectorize` 函数，帮助我们编写自己的 `ufuncs`。

!!! info "背景: `numpy.vectorize`"
    `numpy.vectorize` 主要是为了方便，它提供了一种将普通函数（通常作用于标量）转换为可以作用于 NumPy 数组（元素级）的向量化函数的方式。值得注意的是，`numpy.vectorize` 本质上是在后台进行循环，所以它通常不会带来像内置 `ufuncs` 那样的显著性能提升（因为内置 `ufuncs` 是用 C 语言实现的）。但它简化了代码，使其更易读。

一个例子：

!!! question "课堂练习 8.1"
    阅读 `numpy.vectorize` 的文档，并编写你自己的函数来计算 $f(x) = \frac{1}{1+x^2}$。然后测试这个向量化函数的速度，并与手动循环或列表推导的方式进行比较。

    ```python
    import numpy as np
    import time

    # 1. 定义标量函数
    def scalar_f(x):
        return 1.0 / (1.0 + x**2)

    # 2. 使用 numpy.vectorize 创建向量化函数
    vectorized_f = np.vectorize(scalar_f)

    # 3. 创建测试数据
    test_array = np.linspace(0, 10, 100000)

    # 4. 测试向量化函数
    start_time = time.time()
    result_vectorized = vectorized_f(test_array)
    end_time = time.time()
    print(f"使用 np.vectorize 的运行时间: {end_time - start_time:.6f}s")

    # 5. 作为对比，NumPy 原生操作
    start_time = time.time()
    result_numpy_native = 1.0 / (1.0 + test_array**2)
    end_time = time.time()
    print(f"使用 NumPy 原生操作的运行时间: {end_time - start_time:.6f}s")
    
    # 6. 验证结果是否一致
    # print(f"结果是否一致: {np.allclose(result_vectorized, result_numpy_native)}")
    ```
    你会发现，`numpy.vectorize` 仍然比不上 NumPy 的原生向量化操作（如示例中的 `1.0 / (1.0 + test_array**2)`）。

!!! question "课堂练习 9.1"
    阅读 NumPy 的 `min()` 和 `mean()` 函数的文档。给定一个 `ndarray`：
    1.  选出那些值大于3的条目 (使用布尔掩码)。
    2.  找出每一行的最小值。
    3.  找出每一列的平均值。

    ```python
    import numpy as np

    arr = np.array([
        [1,2,3],
        [4,5,6],
        [7,8,9]
    ])

    # 1. 选出值大于3的条目
    mask = arr > 3
    print("大于3的元素的掩码:\n", mask)
    print("大于3的元素:\n", arr[mask])

    # 2. 找出每一行的最小值
    # axis=1 表示沿着行的方向操作（即对每一行进行操作）
    min_each_row = arr.min(axis=1)
    print("每一行的最小值:\n", min_each_row)

    # 3. 找出每一列的平均值
    # axis=0 表示沿着列的方向操作（即对每一列进行操作）
    mean_each_column = arr.mean(axis=0)
    print("每一列的平均值:\n", mean_each_column)
    ```

## 3.1.5 视图 (View) vs. 副本 (Copy)

NumPy 中一个非常重要但也可能引起困惑的概念是**视图 (view)** 和 **副本 (copy)** 之间的区别。

!!! note "关键概念: 视图 vs. 副本"
    *   **视图 (View)**: 如果我们打个比方，视图为我们提供了一种“观察”数据的方式，数据本身保持不变（没有子数据被取出并独立存储）。对视图的修改会影响原始数据。
    *   **副本 (Copy)**: 相反，副本意味着我们创建了一个数据的子集（或完整拷贝），并为其赋予了一个新的名称和独立的内存空间。对副本的修改不会影响原始数据。

两者之间的主要区别在于当我们更改它们的内容时会发生什么。例如，在下面的代码中，`y` 是 `x` 的一部分的一个视图：

```python
import numpy as np

x = np.arange(10) # x 是 [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
y = x[1:3]        # y 是 x 的一个切片，通常是视图

print(f"改变 x 之前, y: {y}") # y 是 [1, 2]

# 修改原始数组 x 中对应 y 的部分
x[1:3] = [10, 11]
print(f"改变 x 之后, y: {y}") # y 也随之改变，变为 [10, 11]
```
在这个例子中，由于 `y` 是 `x` 的一个视图，所以当 `x` 的相应部分被修改时，`y` 的值也反映了这些变化。

我们可以使用 `.base` 属性来检查一个数组是否是另一个数组的视图：

```python
print(f"y.base is x: {y.base is x}") # 输出 True，表明 y 的数据是基于 x 的
```
如果一个数组是它自己数据的拥有者（即它不是任何其他数组的视图），那么它的 `.base` 属性是 `None`。

!!! info "背景"
    NumPy 中的切片操作通常返回视图而不是副本，这是为了提高性能和内存效率，避免不必要的数据复制。然而，某些操作（如使用布尔掩码索引或某些高级索引）可能会返回副本。明确何时得到视图、何时得到副本非常重要，以避免意外修改数据。如果需要确保得到副本，可以使用 `.copy()` 方法，例如 `y = x[1:3].copy()`。

我们暂时不会过多讨论这个话题。您可以从以下链接中找到更多相关信息。

**进一步阅读:**
*   NumPy 官方文档 - 视图与副本: [https://numpy.org/doc/stable/user/basics.copies.html](https://numpy.org/doc/stable/user/basics.copies.html) (请注意，您提供的链接是 2.0 版本，稳定版链接可能更常用)
*   SciPy Cookbook - Views vs Copies: [https://scipy-cookbook.readthedocs.io/items/ViewsVsCopies.html](https://scipy-cookbook.readthedocs.io/items/ViewsVsCopies.html)
*   Stack Overflow 讨论: [https://stackoverflow.com/questions/47181092/numpy-views-vs-copy-by-slicing](https://stackoverflow.com/questions/47181092/numpy-views-vs-copy-by-slicing)

