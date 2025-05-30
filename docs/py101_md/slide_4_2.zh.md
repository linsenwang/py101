# 第 4 章 Matplotlib

## 你将学到什么

本章将通过一个较长的示例来深入学习 Matplotlib 的使用，在此之前，我们会先掌握一些必备的基础知识。

## 4.4 在一个图形中创建多个坐标轴

我们已经学习了 Matplotlib 如何管理图像。现在，轮到我们来学习如何更精细地控制和管理这些图像的布局了。

回忆一下我们是如何在 Python 中快速绘制图形的？使用 `plt.subplot`！
它有一个“兄弟”函数，但功能却大相径庭：`plt.subplots`。

!!! question "课堂练习 4.4.1"
    `plt.subplot` 返回了什么？

一个简单的 `plt.subplots` 函数调用会返回两个对象：一个 Figure 对象和一个 Axes 对象（或包含 Axes 对象的数组）。因为坐标轴（axes）是实际绘图的地方，所以我们通常使用返回的 Axes 对象上的方法，例如 `ax.plot` 函数，来进行绘图。

```python
import matplotlib.pyplot as plt
import numpy as np

fig, ax = plt.subplots()

x = np.linspace(0, 10, 1000)
sinx = np.sin(x)
cosx = np.cos(x)
expx = np.exp(x)
tanhx = np.tanh(x)

ax.plot(x, sinx)
plt.show() # 在脚本中显示图形需要这一行
```

但这看起来似乎有些繁琐，我们为什么需要功能更强大的 `subplots` 呢？
它的强大之处在于其参数，例如，我们可以指定创建子图的行数和列数：

```python
fig, axs = plt.subplots(2, 2)
plt.show()
```

!!! question "课堂练习 4.4.2"
    `axs` 是什么？你如何探究它？

    !!! info "提示"
        `axs` 通常是一个 NumPy 数组，其中包含了各个子图的 Axes 对象。你可以通过 `type(axs)` 和 `axs.shape` 来查看它的类型和结构。

现在我们可以更精确地控制我们想要在哪里绘图。通过解包 `axs` 数组，我们可以直接获得每个子图的 Axes 对象：

```python
# 假设 x, sinx, cosx, expx, tanhx 已如前定义
fig, ((ax1, ax2), (ax3, ax4)) = plt.subplots(2, 2)

ax1.plot(x, sinx)
ax1.set_title('sin(x)')

ax2.plot(x, cosx)
ax2.set_title('cos(x)')

ax3.plot(x, expx)
ax3.set_title('exp(x)')

ax4.plot(x, tanhx)
ax4.set_title('tanh(x)')

plt.tight_layout() # 调整子图布局以避免重叠
plt.show()
```

!!! question "课堂练习 4.4.3"
    我们已经学习了多少种创建图形和坐标轴的方法？

    !!! note "关键概念：创建图形和坐标轴的方法回顾"
        1.  **隐式创建**: 直接使用 `plt.plot()` 等函数时，Matplotlib 会自动创建图形和坐标轴。
        2.  **`plt.figure()` + `fig.add_subplot()`**: 先创建图形对象，再向其添加子图（坐标轴）。
        3.  **`plt.subplot()`**: 用于在当前图形中创建并切换到指定的子图。
        4.  **`plt.subplots()`**: 一次性创建图形和指定数量的子图，返回图形对象和 Axes 对象（或其数组）。这是更推荐的面向对象的方法。

### 顺序创建 Figure 和 Axes

另一种方法是顺序创建图形（figure）和坐标轴（axes）。
我们首先创建一个图形对象，并可以设置其属性，例如尺寸、背景色和布局方式：

```python
fig = plt.figure(figsize=(2.5, 2.5),        # 宽度和高度，单位为英寸
               facecolor='lightskyblue',    # 图形背景色
               layout='constrained')      # 使用约束布局以避免元素重叠
fig.suptitle('Fig-Ax Figure')             # 设置图形的总标题
plt.show()
```

现在让我们向这个图形中添加一个坐标轴，并更改其外观，例如设置标题、位置和字体样式：

```python
# 假设 fig 对象已如上创建
ax = fig.add_subplot()
ax.set_title('Axes',
             loc='left',        # 标题位置
             fontstyle='oblique', # 字体样式：斜体
             fontsize='medium')   # 字体大小
# 为了能看到效果，我们可以在这个坐标轴上画点东西
ax.plot([1, 2, 3], [1, 4, 9])
plt.show() # 确保更新显示
```

### 马赛克布局 (Mosaic Subplots)

`plt.subplot_mosaic` 提供了比创建规则网格子图更灵活的方式，可以创建更复杂的“马赛克”式布局。

```python
fig, axs = plt.subplot_mosaic([['A', 'right'],
                               ['B', 'right']],  # 定义子图布局和名称
                              figsize=(4, 3),
                              layout='constrained')
# axs 现在是一个字典，键是 'A', 'B', 'right'
# 值为对应的 Axes 对象

plt.show()
```

!!! question "课堂练习 4.4.4"
    `axs` 在这种情况下类似什么？你能总结一下如何制作马赛克图吗？

    !!! info "提示"
        此时的 `axs` 是一个字典，其键是你在布局列表中指定的字符串，值是对应的 Axes 对象。

        **制作马赛克图的步骤：**
        1.  使用一个列表的列表（或类数组结构）来定义布局。每个内部列表代表一行。
        2.  列表中的字符串是子图的标签。相同的标签会使该子图跨越这些单元格。
        3.  `plt.subplot_mosaic()` 返回 Figure 对象和 Axes 对象的字典。
        4.  通过字典键（如 `axs['A']`）访问和操作各个子图。

我们可以像操作普通 Axes 对象一样操作马赛克布局中的 Axes 对象，例如添加文本：

```python
# 假设 fig, axs 已通过 plt.subplot_mosaic 创建
axs['A'].text(0.5, 0.5,
              'subplot A',
              ha='center',      # 水平对齐方式
              va='center')      # 垂直对齐方式

axs['right'].text(0.5, 0.5,
                  'subplot right',
                  ha='center', va='center')

axs['B'].text(0.5, 0.5,
              'subplot B',
              ha='center', va='center')
plt.show()
```

### 修改已创建的坐标轴

创建坐标轴后，我们仍然可以修改它们的各种属性：

```python
# 假设 axs['A'] 和 axs['B'] 存在于一个马赛克布局中
axs['A'].set_xlabel("x-axis of A")
axs['A'].set_xlim(-2, 3)
axs['B'].set_title('axs[B] title')
plt.show()
```

### 添加注释和标题

我们可以为坐标轴和整个图形添加注释和标题。
下面的示例假设 `axs` 是一个 2x2 的 Axes 对象数组（例如通过 `fig, axs = plt.subplots(2, 2)` 创建）：

```python
# 假设存在一个 fig 和一个 2x2 的 axs 数组
# fig, axs = plt.subplots(2, 2) # 如果需要重新创建

for row in range(2):
    for col in range(2):
        axs[row, col].annotate(f'axs[{row}, {col}]', # 注释文本
                               (0.5, 0.5),        # 注释位置 (数据坐标系中相对位置)
                               ha='center',
                               va='center',
                               fontsize=18,
                               color='darkgrey')
fig.suptitle('plt.subplots() Demo') # 图形总标题
plt.tight_layout(rect=[0, 0, 1, 0.96]) # 调整布局，为总标题留出空间
plt.show()
```

!!! note "颜色名称注意"
    原文中的 `color='darkgrey ’` 末尾有一个多余的空格，已修正为 `color='darkgrey'`。

### 精确控制坐标轴位置

有时我们不希望使用默认的边距或布局管理器，而是想精确地指定坐标轴在图形中的位置和大小。可以使用 `fig.add_axes()` 方法。

```python
# fig.clf() # 清除当前图形内容，如果需要在一个已存在的 fig 对象上操作
fig = plt.figure()

# add_axes([left, bottom, width, height])
# 参数都是相对于图形尺寸的比例 (0 到 1)
ax1 = fig.add_axes([0.1, 0.1, 0.8, 0.8]) # 主坐标轴
ax1.set_title('Main Axes')
ax1.plot(np.arange(5), np.arange(5)**2)


ax2 = fig.add_axes([0.2, 0.6, 0.3, 0.2]) # 在主坐标轴内的一个小坐标轴 (插图)
ax2.set_title('Inset Axes')
ax2.plot(np.arange(5), np.cos(np.arange(5)))


# 原文中的 fig.add_axes([1, 1, 1, 1]) 和 fig.add_axes([-1, 0, 1, 2])
# 会将坐标轴放置在图形画布之外或以非标准方式重叠，这里不作主要展示
# fig.add_axes([1, 1, 1, 1]) # 这个坐标轴的左下角在图形的右上角，通常不可见
# fig.add_axes([-1, 0, 1, 2]) # 这个坐标轴的左下角在图形的左边界之外

plt.show()
```

!!! note "关于 `fig.add_axes()`"
    `fig.add_axes([left, bottom, width, height])` 方法允许在图形中的任意位置放置坐标轴。
    参数 `left`, `bottom`, `width`, `height` 都是相对于图形尺寸的比例（0 到 1）。
    - `[0, 0, 1, 1]` 表示坐标轴将占据整个图形区域。
    - 坐标可以超出 `[0, 1]` 的范围，但这通常意味着坐标轴的一部分或全部会位于图形的可见区域之外，或者与其他坐标轴重叠，除非有意为之并配合图形大小调整。

## 4.5 综合示例

现在我们准备好学习这个综合示例了。我们的目标是制作如下图所示的图片。
（假设此处会展示一个包含多个子图、曲线、填充区域等元素的复杂图像）

数据片段参考（可能用于图中的某些部分）：`3. 4. 1. 3. 0. 8. 0. 5`

在我们开始编写代码之前，让我们先分析一下它的结构和组成部分。

!!! question "课堂练习 4.5.1：分析目标图像"
    1.  思考如何构建目标图片的基本框架（例如，需要多少个子图，它们的布局是怎样的？）。
    2.  考虑如何在相应的子图上添加曲线。
    3.  （可选）如果图像包含饼图或类似的楔形区域，思考如何用颜色填充它们。
