# 第四章 Matplotlib

## 你将学到什么

*   如何在 Python 中快速绘制图形。
*   如何为你的图片添加美化样式。
*   Matplotlib 管理图片的方式。
*   将 Figure 理解为画布。
*   将 Axes 理解为绘图区域。

## 4.1 Python 中的图形初探

我们已经多次学习了如何安装模块。现在，让我们来安装并加载 `matplotlib`。

```python
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd # 假设 irisdata 会用到 pandas
import matplotlib as mpl
```

现在，我们用 `matplotlib` 来绘制第一条线。绘制线条让我们回想起高中物理。还记得物理老师说过，在现实生活中很难找到一条真正连续的线吗？当我们想要绘制一条连续的线或曲线时，实际上是将足够多、足够近的点连接起来。

```python
x = np.linspace(0, 10, 100)
sinx = np.sin(x)
cosx = np.cos(x)
plt.plot(x, cosx)
plt.show() # 在脚本环境中建议添加 plt.show() 以显示图形
```

!!! info "背景知识"
    绘制连续线条或曲线时，我们实际上是通过连接一系列足够密集的点来实现的。这与物理学中对连续性的理解相似，现实中的“连续”往往是对离散点在足够小尺度上的近似。

Matplotlib 与 Pandas 有着非常自然的结合。一旦我们用 Pandas 创建了一个 DataFrame，它就能与 Matplotlib 顺畅地交互。

```python
# 确保你有一个名为 "iris" 的文件夹，并且 "iris.data" 文件在其中
# 或者提供 iris.data 的完整或相对路径
try:
    irisdata = pd.read_csv("iris/iris.data", header=None)
    irisdata.columns = ["sw", "sl", "pw", "pl", "type"]
    plt.plot("sw", "sl", data=irisdata)
    plt.xlabel("Sepal Width (sw)") # 添加x轴标签
    plt.ylabel("Sepal Length (sl)") # 添加y轴标签
    plt.title("Sepal Width vs Sepal Length") # 添加标题
    plt.show()
except FileNotFoundError:
    print("错误：iris/iris.data 文件未找到。请确保文件路径正确。")
    # 创建一个示例 DataFrame 以便后续代码可以运行
    data = {'sw': np.random.rand(50)*2 + 5,
            'sl': np.random.rand(50)*1 + 2,
            'pw': np.random.rand(50)*2 + 3,
            'pl': np.random.rand(50)*0.5 + 1,
            'type': ['setosa']*20 + ['versicolor']*15 + ['virginica']*15}
    irisdata = pd.DataFrame(data)
    print("已使用随机生成的示例数据替代 iris 数据。")
    plt.plot("sw", "sl", data=irisdata)
    plt.xlabel("Sepal Width (sw)")
    plt.ylabel("Sepal Length (sl)")
    plt.title("Sepal Width vs Sepal Length (示例数据)")
    plt.show()

```

!!! question "课堂练习 4.1.1"
    上面的代码创建了一张杂乱无章的图片。为什么会这样？
    你能用上一章学到的知识来修正它吗？（提示：原始数据可能是未排序的，直接用 `plt.plot` 连接点会导致线条来回跳跃。如果想展示散点关系，应该使用散点图；如果确实要画线，数据点应按x轴排序。）

## 4.2 修改线条属性

我们之前绘制的线条看起来有些简陋。让我们添加一些美化元素。
绘制线条时，常用的几个属性包括：

*   **Markers (标记点样式)**
*   **Linestyle (线条样式)**
*   **Linewidth (线条宽度)**
*   **Colors (颜色)**

这个页面提供了更多选项：[matplotlib.pyplot.plot API文档](https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.plot.html)

让我们来使用这些属性：

```python
x = np.linspace(0, 10, 100) # 确保 x 和 sinx 已定义
sinx = np.sin(x)
cosx = np.cos(x)

plt.plot(x, sinx,
         marker='>',
         linestyle='--',
         linewidth=2,
         color='g')
plt.title("Sine Wave with Custom Attributes")
plt.xlabel("x")
plt.ylabel("sin(x)")
plt.show()
```

在 VS Code (或者通常的 Notebook 环境) 的同一个单元格中，我们可以调用多次 `plt.plot` 函数，它们会绘制在同一张图上。

```python
plt.plot(x, sinx,
         marker='>',
         markersize=5,
         color='g')
plt.plot(x, cosx,
         marker='d',
         markersize=5,
         linestyle=':',
         linewidth=1,
         color='c')
plt.title("Sine and Cosine Waves")
plt.xlabel("x")
plt.ylabel("Function Value")
plt.show()
```

但是现在我们可能会感到困惑：这些线条分别代表什么？这时，`legend` (图例) 就派上用场了。

```python
plt.plot(x, sinx, label='sin(x)', color='g', marker='>', markersize=5) # 添加 label
plt.plot(x, cosx, label='cos(x)', color='c', marker='d', markersize=5, linestyle=':') # 添加 label
plt.legend() # 显示图例
plt.title("Sine and Cosine Waves with Legend")
plt.xlabel("x")
plt.ylabel("Function Value")
plt.show()
```

最后，让我们把这张漂亮的图片保存到某个地方。

```python
plt.plot(x, sinx, label='sin(x)', color='g', marker='>', markersize=5)
plt.plot(x, cosx, label='cos(x)', color='c', marker='d', markersize=5, linestyle=':')
plt.legend()
plt.title("Sine and Cosine Waves to be Saved")
plt.xlabel("x")
plt.ylabel("Function Value")
plt.savefig('sin_and_cos.png')
# plt.show() # 在保存后，如果不想显示，可以注释掉 show
print("图片已保存为 sin_and_cos.png")
```

## 4.3 Matplotlib 中的图像组织

Matplotlib 将图片组织为 `Figure` (图形) 和 `Axes` (坐标轴/绘图区域)。

*   **`Figure` (图)**：可以看作是一块画布，你可以在上面绘制线条、曲线、形状等。
*   **`Axes` (坐标轴/绘图区域)**：是画布上的一个区域，实际的图形内容绘制在 `Axes` 上。

大多数情况下，我们必须在 `Figure` 内的某个 `Axes` 上进行绘图。
Matplotlib 官方文档对其布局有如下描述：[Matplotlib 快速入门指南](https://matplotlib.org/stable/users/explain/quick_start.html)

!!! note "关键概念：Figure 与 Axes"
    *   `Figure` 是顶层容器，可以包含一个或多个 `Axes`。
    *   `Axes` 是实际进行数据可视化的地方，包含了坐标轴、刻度、标签以及绘制的图形元素（如线条、散点等）。
    *   一个 `Figure` 可以有多个 `Axes`，这使得我们可以在一张大图上创建多个子图。

下面是一个 Matplotlib 中一些元素的示例图示（通常官方文档会提供这类图）：

*(注：原始文本提及 "Here is an example of some elements in a matplotlib."，但未提供图片。此处通常指 Figure、Axes、Title、Legend、X-axis label、Y-axis label、Ticks 等组件的示意图。)*

隐式创建 `Axes` 的第一种尝试是简单地告诉 Python 我们需要将 `Figure` 分割成不同的部分。

```python
plt.subplot(2, 1, 1) # (#行数, #列数, 当前选中的子图索引，从1开始)
plt.plot(x, sinx)
plt.title("Subplot 1: sin(x)")

# plt.subplot(2, 1, 2) # 为下一个练习预留
# plt.plot(x, cosx)    # 为下一个练习预留
# plt.title("Subplot 2: cos(x)") # 为下一个练习预留

plt.tight_layout() # 调整子图布局，防止重叠
plt.show()
```

!!! question "课堂练习 4.3.1"
    创建另一个 `Axes` (即第二个子图)，并在其中绘制 `cos` 曲线。
    ```python
    # 练习代码可以这样写：
    # plt.subplot(2, 1, 1)
    # plt.plot(x, sinx)
    # plt.title("Subplot 1: sin(x)")

    # plt.subplot(2, 1, 2) # 创建第二个子图
    # plt.plot(x, cosx, color='r')
    # plt.title("Subplot 2: cos(x)")

    # plt.tight_layout()
    # plt.show()
    ```

!!! question "课堂练习 4.3.2"
    请在开始绘图前阅读所有问题。
    1.  在第一象限绘制一个四分之一单位圆。
    2.  绘制一个 $y > 0$ 的半单位圆。
    3.  绘制一个完整的单位圆。
    
    提示：参数方程 $x = \cos(\theta)$, $y = \sin(\theta)$。

虽然 `plt.subplot` 很方便，它为我们创建了规则排列的单元格来放置 `Axes`。现在让我们通过手动创建一个 `Figure` 和一个 `Axes` 来了解更多。

```python
fig = plt.figure()  # 创建一个新的 Figure 对象
# 更多关于 figure 的信息: https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.figure.html
ax = plt.axes()     # 在当前 Figure 中创建一个 Axes 对象
# 更多关于 axes 的信息: https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.axes.html

x_large = np.linspace(0, 10, 1000) # 使用不同的变量名以防混淆
ax.plot(x_large, np.sin(x_large)) # 在这个 ax 上绘图
plt.title("Plot on a Manually Created Axes")
plt.show()

# print(id(ax), id(fig.axes[0]), id(plt.gca())) # 查看对象的ID
```

!!! question "课堂练习 4.3.3"
    创建另一个 `Axes` 并检查它们的 ID。思考一下，如果直接 `ax2 = plt.axes()`，它会创建在哪里？如果想在同一个 `fig` 上创建第二个 `Axes`，应该怎么做？（提示：`fig.add_axes([left, bottom, width, height])`）

!!! question "课堂练习 4.3.4"
    创建一个空的 `fig`。它看起来是什么样子？
    ```python
    # fig_empty = plt.figure()
    # plt.show()
    ```

如果我们只是请求 Python 创建一个 `Axes` (例如通过 `plt.axes()` 或直接 `plt.plot()`)，Python 会首先隐式地创建一个 `Figure`，然后在该 `Figure` 中创建一个 `Axes`。

```python
# fig = plt.figure() # 已在上面创建
# ax = plt.axes()    # 已在上面创建

print(f"ID of fig: {id(fig)}")
print(f"ID of ax's figure: {id(ax.get_figure())}")
print(f"ID of current figure (gcf): {id(plt.gcf())}")
```

!!! warning "注意"
    在 Notebook 中使用 Matplotlib 与在脚本中工作有很大不同。
    例如，在 Notebook 中，单元格执行后图形通常会自动显示。`plt.gcf()` (get current figure) 和 `plt.gca()` (get current axes) 的行为可能也因单元格执行上下文而异。

```python
# 如果在一个新的 Notebook 单元格中执行，plt.gcf() 可能会创建一个新的 Figure
# print(id(plt.gcf()))
```

!!! question "课堂练习 4.3.5"
    如果上面的 `print(id(plt.gcf()))` 在一个新的 Notebook 单元格中执行，它的输出指向哪里？与之前 `fig` 的 ID 相同吗？为什么？

在期望的位置正确绘图的方法：
1.  将所有相关的绘图代码（创建 Figure、Axes，绘图命令）放在同一个单元格中。
2.  如果需要在不同单元格中操作同一个 Figure，确保引用的是之前创建的 Figure 对象。

### 示例 4.3.1：动态更改图形

这个例子演示了如何获取当前的 `Axes` 并向其添加内容。在 Notebook 或交互式环境中，`plt.scatter()` 如果没有指定 `ax`，会尝试在“当前” `Axes` 上绘图。如果不存在，则会创建一个。

```python
x_coords1 = np.arange(1, 3)
y_coords1 = x_coords1

x_coords2 = np.arange(3, 11)
y_coords2 = x_coords2

x_coords3 = np.arange(11, 21)
y_coords3 = x_coords3

# 创建一个 Axes (plt.axes() 会隐式创建一个 Figure，并返回 Axes)
# 或者 plt.figure() 后跟 fig.add_subplot() / fig.add_axes()
plt.figure() # 显式创建一个 Figure
ax = plt.gca() # 获取当前 Axes，如果没有则创建一个

# 第一次绘图
ax.scatter(x_coords1, y_coords1, linewidth=5, label='Data 1') # 在获取的 ax 上绘图

# 后续绘图也会在同一个 ax 上，因为它是当前激活的
ax.scatter(x_coords2, y_coords2, color='r', label='Data 2')

ax.scatter(x_coords3, y_coords3, color='g', marker='^', label='Data 3')

ax.legend()
plt.title("Dynamically Adding to an Axes")
plt.xlabel("X values")
plt.ylabel("Y values")
plt.show()
```

好的，我们来将这段 AI 编程课程讲义文本转换为清晰、结构合理的 Markdown 格式。

```markdown
# Matplotlib 绘图基础

## 4.3 Matplotlib 中的图像组织

在 Matplotlib中，一个“图像” (figure) 可以被看作是一个包含了所有绘图元素（如标题、图例、坐标轴等）的顶层容器。而“坐标轴” (axes) 则是我们实际进行数据可视化的区域，一个图像中可以包含一个或多个坐标轴。

当我们请求 Python 创建一个坐标轴 (axis) 时，如果当前没有活动的图形 (figure)，Python 会首先隐式地创建一个新的图形，然后在这个图形中添加一个坐标轴。

我们可以通过 `id()` 函数来验证这一点，它返回对象的唯一标识符。

```python
import matplotlib.pyplot as plt
import numpy as np

# 假设我们直接创建一个坐标轴，或者进行绘图操作
# plt.axes() # 这会隐式创建 figure 和 axes
# 或者，更常见的是直接绘图
plt.plot([1, 2, 3]) # 这也会隐式创建 figure 和 axes

# 获取当前图形 (Get Current Figure)
fig = plt.gcf()
# 获取当前坐标轴 (Get Current Axes)
ax = plt.gca()

print(f"ID of fig: {id(fig)}")
print(f"ID of ax.get_figure(): {id(ax.get_figure())}")
print(f"ID of plt.gcf() after getting ax: {id(plt.gcf())}")
```

!!! note "关键概念：`gcf()` 和 `gca()`"
    *   `plt.gcf()`: Get Current Figure，获取当前活动的图形对象。
    *   `plt.gca()`: Get Current Axes，获取当前活动的坐标轴对象。
    如果当前没有图形或坐标轴，这些函数会自动创建它们。

!!! warning "Jupyter Notebook 与脚本环境的差异"
    请注意，在 Jupyter Notebook 这样的交互式环境中使用 Matplotlib，其行为（尤其是在图形显示方面）与在独立的 Python 脚本 (`.py` 文件) 中使用时有所不同。脚本通常需要显式调用 `plt.show()` 来显示图形。

```python
# 再次检查当前图形的 ID
print(id(plt.gcf()))
```

!!! question "课堂练习 4.3.5：输出在哪里？"
    思考一下，在 Jupyter Notebook 中，如果一个单元格 (cell) 的最后一行代码是一个 Matplotlib 图形对象（例如，变量 `fig`），或者是一个绘图操作，那么图形会如何显示？如果在一个脚本中，同样的代码会发生什么？

### 在 Notebook 中绘图的推荐方式

为了确保图形在期望的位置创建和更新，特别是在 Jupyter Notebook 中处理多个图形或动态更新图形时，推荐遵循以下实践：

1.  **将所有相关的绘图代码（创建图形、绘图、设置属性）放在同一个单元格中。** 这样可以避免因单元格执行顺序或状态遗留问题导致的混淆。
2.  **如果需要在后续单元格中引用或修改某个特定图形，请确保将该图形对象赋值给一个变量，并在后续单元格中明确使用该变量。**

### 示例 4.3.1：动态更改图形

让我们看一个例子，演示如何在同一个坐标轴上逐步添加数据点。

```python
# 准备数据
x1 = np.arange(1, 3)
y1 = x1
x2 = np.arange(3, 11)
y2 = x2
x3 = np.arange(11, 21)
y3 = x3

# 第一次绘图：绘制 (x1, y1)
# 这会隐式创建一个新的 figure 和 axes
plt.scatter(x1, y1, linewidth=5, label='Data 1')
# 获取当前 figure 和 axes，以便后续使用
fig = plt.gcf()
ax = plt.gca()

# 为了在 Notebook 中看到这一步的输出，我们可以显式“显示”fig
# 在 Notebook 中，如果 fig 是单元格的最后一个表达式，它通常会自动显示
fig
```

#### 示例 4.3.1：动态更改图形 (续)

现在，我们在之前创建的同一个坐标轴 `ax` 上添加更多数据。

```python
# 在先前获取的坐标轴 ax 上绘制第二组数据 (x2, y2)
ax.scatter(x2, y2, color='r', linewidth=5, label='Data 2')

# 再次显示 fig，观察变化
fig
```

```python
# 继续在同一个坐标轴 ax (或者通过 plt.gca() 重新获取) 上绘制第三组数据 (x3, y3)
current_ax = plt.gca() # 或者直接使用之前保存的 ax
current_ax.scatter(x3, y3, color='g', linewidth=5, label='Data 3')

# 再次显示 fig
fig
```

### 修改坐标轴属性

与之前学习到的类似，我们可以获取图形中的坐标轴对象，并修改其各种属性，如坐标轴范围、标签、标题等。

假设 `fig_in_cell_3` 是我们在之前某个单元格中创建并赋值的图形对象 (Figure object)。

```python
# 假设 fig_in_cell_3 是之前代码单元格中创建的 fig 对象
# 例如，我们重新运行示例 4.3.1 的第一部分来得到一个干净的图形
plt.figure() # 创建一个新的、干净的图形作为 fig_in_cell_3 的代表
x_sine = np.linspace(-np.pi, np.pi, 100)
y_sine = np.sin(x_sine)
plt.plot(x_sine, y_sine)
fig_in_cell_3 = plt.gcf() # 将当前图形赋给 fig_in_cell_3

# 获取该图形中的当前坐标轴
ax_to_modify = fig_in_cell_3.gca()

# 设置坐标轴的属性
ax_to_modify.set(
    xlim=(-np.pi - 0.5, np.pi + 0.5),  # 等同于 plt.xlim()，但作用于特定ax
    ylim=(-1.5, 1.5),                  # 等同于 plt.ylim()
    xlabel="x-axis",
    ylabel="y-axis",
    title="A sine curve"
)

# 在 Notebook 中显示修改后的图形
fig_in_cell_3
```

!!! info "参考资料"
    Matplotlib 官方文档中有一个很好的示例，详细展示了图形的各个组成部分（通常被称为 "Anatomy of a figure"）：
    [Matplotlib Figure Anatomy](https://matplotlib.org/stable/gallery/showcase/anatomy.html)

