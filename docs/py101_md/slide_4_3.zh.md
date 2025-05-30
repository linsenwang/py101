# 第四章 Matplotlib

本章将引导你了解 Matplotlib 库中更多实用的绘图类型，帮助你更灵活地进行数据可视化。

## 4.1 散点图 (Scatter Plot)

散点图是观察两个数值变量之间关系的有效方式。图中的每个点代表一个数据样本，其在二维平面上的位置由两个变量的值确定。

!!! note "关键概念：散点图参数"
    在 Matplotlib 的 `scatter` 函数中，一些常用参数可以帮助我们定制化图形：
    *   `alpha`: 控制点的透明度，取值范围为 0 (完全透明) 到 1 (完全不透明)。
    *   `s`: 控制点的大小，可以是一个标量值（所有点大小相同）或一个数组（每个点大小不同）。
    *   `c`: 控制点的颜色，可以是一个颜色字符串，也可以是一个数值序列（配合 `cmap` 使用）。
    *   `cmap`: 颜色映射表 (Colormap)，当 `c` 是一个数值序列时，`cmap` 会将这些数值映射到具体的颜色。

以下代码展示了如何使用 `sklearn` 内置的鸢尾花 (iris) 数据集绘制散点图：

```python
from sklearn.datasets import load_iris
import matplotlib.pyplot as plt

iris = load_iris()
features = iris.data.T  # .T 表示转置，使得每个特征成为一个行向量

print(features.shape) # 查看特征数据的维度

# 绘制散点图
# x轴使用第一个特征 (features[0])
# y轴使用第二个特征 (features[1])
plt.scatter(features[0], features[1],
            alpha=0.2,  # 设置点的透明度
            s=100 * features[3],  # 点的大小由第四个特征 (花瓣宽度) 决定，并乘以100以增强视觉效果
            c=iris.target,  # 点的颜色由鸢尾花的类别 (iris.target) 决定
            cmap='viridis')  # 使用 'viridis' 颜色映射表

# 设置坐标轴标签
plt.xlabel(iris.feature_names[0]) # x轴标签为第一个特征的名称
plt.ylabel(iris.feature_names[1]) # y轴标签为第二个特征的名称
plt.title("鸢尾花散点图 (萼片长度 vs 萼片宽度)") # 添加图表标题
plt.colorbar(label='物种类别') # 添加颜色条以解释颜色含义
plt.show() # 显示图像
```

!!! info "代码说明"
    *   `features = iris.data.T`: `iris.data` 是一个 (样本数, 特征数) 的数组。转置后，`features` 的形状变为 (特征数, 样本数)，因此 `features[0]` 代表所有样本的第一个特征值，`features[1]` 代表所有样本的第二个特征值，以此类推。
    *   `s=100*features[3]`: 点的大小与第四个特征（通常是花瓣宽度 Petal Width）成正比。
    *   `c=iris.target`: 点的颜色根据鸢尾花的种类进行区分。`iris.target` 包含了每个样本的类别标签 (0, 1, 2)。
    *   `plt.xlabel()` 和 `plt.ylabel()`: 使用 `iris.feature_names` 为坐标轴设置有意义的标签。

## 4.2 直方图 (Histogram)

直方图是表示数据分布情况的一种常用图形，它将数据划分到一系列连续的区间（称为“箱子”或“bins”），然后统计每个区间内数据点的数量。

!!! note "关键概念：直方图参数"
    `plt.hist()` 函数的一些重要参数：
    *   `bins`: 指定箱子的数量或边界。
    *   `alpha`: 透明度。
    *   `histtype`: 直方图的类型，如 `'bar'`, `'barstacked'`, `'step'`, `'stepfilled'`。
    *   `color`: 直方图的填充颜色。
    *   `edgecolor`: 直方图柱子的边框颜色。

以下代码展示了如何绘制某一特征（假设为玻璃样本中的铁 "Fe" 含量）的直方图：

```python
import matplotlib.pyplot as plt
import numpy as np # 引入numpy以生成示例数据

# !!! 警告：原始代码中的 'glass' 变量未定义 !!!
# 以下代码假设 'glass' 是一个预先加载的 Pandas DataFrame，
# 并且包含名为 'Fe' 的列。
# 例如:
# import pandas as pd
# glass_data_example = {'Type': [1,1,1,2,2], 'RI': [1.5,1.6,1.5,1.7,1.8], 'Fe': [0.1,0.05,0.12,0.08,0.06]}
# glass = pd.DataFrame(glass_data_example)

# 为了使本示例能够运行，我们使用 NumPy 生成一些模拟 "Fe" 数据
# 在实际应用中，您应该使用真实的 glass["Fe"] 数据
simulated_fe_data = np.random.normal(loc=0.1, scale=0.05, size=200) # 生成均值为0.1，标准差为0.05的模拟数据
simulated_fe_data = simulated_fe_data[simulated_fe_data > 0] # Fe含量通常为正

plt.hist(simulated_fe_data,  # 使用模拟数据。原始代码为: glass["Fe"]
           bins=30,  # 将数据分为30个箱子
           alpha=0.5,  # 设置透明度
           histtype='stepfilled',  # 直方图类型：填充的阶梯状
           color='steelblue',  # 设置颜色
           edgecolor='none')  # 不显示边框

plt.xlabel("Fe 含量 (模拟数据)") # x轴标签
plt.ylabel("频数")             # y轴标签
plt.title("Fe 含量直方图")     # 图表标题
plt.show() # 显示图像
```

!!! warning "关于 `glass[\"Fe\"]`"
    上述代码中的 `plt.hist(glass["Fe"], ...)` 行，在原始讲义中，依赖于一个名为 `glass` 的变量，该变量应为一个 Pandas DataFrame，并且包含一个名为 `Fe` 的列。
    为了使示例能够运行，我们在代码中使用了 `simulated_fe_data` 作为替代。在您自己的工作中，请确保 `glass` DataFrame 及其 `Fe` 列已正确加载和定义。

## 4.3 配对图 (Pair Plots)

配对图（也称为散点图矩阵）是探索性数据分析中一种强大的可视化工具。它能够同时展示数据集中多个特征两两之间的关系（通过散点图）以及每个特征自身的分布（通常通过直方图或核密度估计图）。Seaborn 库的 `pairplot` 函数使得创建此类图形非常方便。

!!! info "Seaborn 简介"
    Seaborn 是一个基于 Matplotlib 的 Python 数据可视化库。它提供了一个更高级的API，用于绘制美观且信息丰富的统计图形。

以下代码展示了如何使用 Seaborn 绘制鸢尾花数据集的配对图：

```python
import seaborn as sns
import matplotlib.pyplot as plt # Seaborn 底层依赖 Matplotlib

# 加载 Seaborn 内置的鸢尾花数据集
iris_sns = sns.load_dataset("iris") # 注意变量名与之前的 iris 区分

# 显示数据集的前几行，以了解其结构
print(iris_sns.head())

# 绘制配对图
# hue='species': 根据 'species' (物种) 列对数据点进行着色，以区分不同类别
# height=2.5: 设置每个子图的高度（英寸）。注意：旧版 Seaborn 使用 'size' 参数，新版已改为 'height'。
sns.pairplot(iris_sns, hue='species', height=2.5)

plt.suptitle("鸢尾花数据集配对图 (Seaborn)", y=1.02) # 为整个图形添加一个总标题，y调整标题位置
plt.show() # 显示图像
```

!!! note "配对图解读"
    *   对角线上的图：默认显示每个特征的单变量分布（通常是直方图或核密度图）。
    *   非对角线上的图：显示对应行列特征之间的双变量关系（散点图）。
    *   `hue='species'` 参数使得不同种类的鸢尾花在图中以不同颜色显示，便于比较它们在各个特征上的表现。

