# 第三章 NumPy 与 Pandas

## 你将学到什么

*   数据组织的基本原则
*   Pandas 库的核心组件：Series 和 DataFrame
*   DataFrame 的结构：可以理解为带行索引和列名的二维 NumPy 数组
*   数据提取：
    *   如何根据行索引或位置选取行数据
    *   如何根据列名选取列数据
*   表格信息汇总与描述性统计
*   数据排序：根据值或索引对数据进行排序，以突出重要信息
*   数据聚合：对数据进行分组和计算，以观察总体趋势
*   多级索引（MultiIndexed DataFrame）的概念与使用
*   使用 `loc` 和 `iloc` 属性进行更灵活的数据选择
*   在 DataFrame 中创建新列

## 序言 —— 处理数据

在我们学习了诸多 Python 基础知识之后，现在我们正式开启处理数据集的旅程。数据集是存储数据的地方。由于大多数数据集以表格形式出现，因此在本课程中，我们会将“数据集”和“数据表”视为可互换使用的术语。

Pandas 是一个专门用于分析数据表的 Python 模块。

数据表是信息最重要的载体之一。但信息并非总是能够不言自明，因此我们需要分析数据以揭示其背后蕴含的信息。通过学习本章，你将能够：

*   解释数据表的组织方式（即表的行和列分别代表什么）。
*   应用一些基本的数据操作方法从表格中获取所需信息。

这些操作能帮助我们：
*   通过改变表格的格式，从不同视角审视数据。
*   通过定位特定数据点，帮助我们找到特定个体的特定特征。
*   将数据表划分为更小的单元（称为“组”），并对每个组内的信息进行汇总。

## 序言 —— 数据组织

在经济学研究中，我们经常需要处理数据。通过数据，我们可以：
*   洞察经济世界的运作方式。
*   验证我们的经济理论。

这些数据可能包括一个国家的 GDP、某个人的消费明细、一件商品的价格等等。随着计算能力的提升，经济数据变得越来越庞大，现在处理 GB 甚至 TB 级别的的数据集已屡见不鲜。

在计算机中，我们通常将数据存储在表格中。表格在很大程度上类似于一个二维矩阵，它包含行（每个水平方向的元素序列）和列（每个垂直方向的元素序列）。

!!! note "数据表组织的基本原则"
    *   **每一行** 代表一个观测单元（例如一个人、一个国家等实体）。
    *   **每一列** 展示了观测单元的某个特定视角或特征（例如人的身高、国家的 GDP 等）。
    *   **顶部的行** 通常保留用作列名，称为表头（Header）。它不属于表格的“内容”部分。
    *   **最左边的列** 通常保留用作行的索引（名称）。它也不属于表格的“内容”部分。

## 3.1 单列数据：Series

Pandas 存储序列数据的方式与 NumPy 非常相似：都是一维序列。但在 Pandas 中，这种序列被称为 **Series**。

!!! note "Series 的关键特性"
    *   **同质性**：一个 Series 中的所有元素必须是相同的数据类型。
    *   **带索引**：Series 的一个重要特征是其元素具有名称，这些名称被称为索引（index）。我们也可以说，“Series 中的数据是被索引的”。

## 3.2 处理表格数据：DataFrame

我们用来存储数据表的类型称为 Pandas **DataFrame**。它基本上是一个带有行索引（index）和列名（columns）的矩阵：
*   `index`：包含每一行的名称。
*   `columns`：包含每一列的名称。

例如，在下方的示例代码生成的表格中，最左侧加粗的数字是行索引，顶部的加粗字母是列名。

```python
import pandas as pd
import numpy as np

# 创建一个示例 DataFrame
df1 = pd.DataFrame(
    np.random.randn(6, 4),  # 6x4 的符合标准正态分布 N(0,1) 的随机数
    index=range(6),         # 行索引为 0 到 5
    columns=list("ABCD")    # 列名为 A, B, C, D
)
print(df1)
```

### 3.2.1 行与列

我们可以使用行索引名和列名来查找（取出）数据。但两者的索引方式有所不同：

```python
# 提取第一行 (结果仍然是一个 DataFrame)
row1 = df1[0:1]
print("提取的第一行 (df1[0:1]):")
print(row1)
print(type(row1))

# 提取 'A' 列 (结果是一个 Series)
col1 = df1['A']
print("\n提取的 'A' 列 (df1['A']):")
print(col1)
print(type(col1))
```

!!! note "Series 与 DataFrame 的关系"
    虽然看起来相似，但通过 `type()` 函数检查它们的类型，你会发现行切片（如 `df1[0:1]`）的结果仍然是一个 DataFrame，而单列选择（如 `df1['A']`）的结果是一个 `pandas.core.series.Series`。
    Series 是一个用于存储单一维度信息的一维对象。而 Pandas DataFrame 则是由多个 Series 构成的二维数据结构，可以看作是共享相同行索引的 Series 的集合。

DataFrame 为我们提供了结构化的信息。例如，我们可以使用 `describe()` 方法获取每一列的描述性统计信息，使用 `dtypes` 属性获取各列的数据存储类型。

```python
# 创建另一个示例 DataFrame
df2 = pd.DataFrame(
    [[1, 2], [1.1, 2.1]],
    index=range(2),
    columns=['col1', 'col2']
)
print("\nDataFrame df2:")
print(df2)

print("\ndf2 各列的数据类型:")
print(df2.dtypes)

print("\ndf2 各列的描述性统计:")
print(df2.describe())
```

!!! info "数据类型提示"
    在 `df2` 中，`col1` 列混合了整数 `1` 和浮点数 `1.1`。Pandas 为了保持列中数据类型的一致性，会将该列的整体数据类型视为浮点型（`float64`），即使其中某些值最初是以整数形式输入的。这就是为什么在 `df2.dtypes` 的输出中，`col1` 可能是 `float64` 类型。

### 3.2.2 排序与聚合

我们可以从不同的角度审视一个数据表。虽然信息本身不会改变，但我们可以通过排序和聚合等方式，突出显示我们更感兴趣的信息。

**排序 (Sorting)**

高亮信息的第一种方法是将最重要的信息放在表格的顶部。这可以通过 `sort_values()` 方法（按值排序）或 `sort_index()` 方法（按索引排序）来实现。

下面是一个排序的例子：

```python
# 示例：比赛得分数据
race_score_data = {'选手': ['Alice', 'Bob', 'Charlie'], '得分': [15.6, 17.3, 14.5]}
race_score = pd.DataFrame(race_score_data)
print("原始比赛得分:")
print(race_score)

# 按第二列（'得分'，列索引为1，如果用列名则是 '得分'）升序排序
# 注意：如果 DataFrame 初始化时没有显式指定列名，而是用的默认数字列名，则可以用数字。
# race_score.sort_values(by=1, ascending=True) # 如果列名为 0, 1
# 更推荐的方式是使用列名:
race_score_sorted_by_value = race_score.sort_values(by='得分', ascending=True)
print("\n按得分升序排序后:")
print(race_score_sorted_by_value)

# 修改行索引并按行索引排序
race_score.index = [1002, 1001, 1003]
print("\n修改行索引后:")
print(race_score)

race_score_sorted_by_index = race_score.sort_index()
print("\n按行索引升序排序后:")
print(race_score_sorted_by_index)
```

**聚合 (Aggregation)**

当我们想要对表格数据进行鸟瞰式观察，了解其总体特征时，我们会进行信息汇总，即聚合。这意味着我们不再关注单个数据点的细节，而是...
## 3.2 处理单个表格

### 3.2.1 DataFrame 基本属性与概览

在深入了解表格数据的具体操作之前，我们先来看看如何获取 DataFrame 的基本信息。

*   使用 `describe()` 方法可以获取数据的描述性统计信息，如计数、均值、标准差、最小值、最大值和四分位数等。
*   通过 `.dtypes` 属性可以查看 DataFrame 中每一列的数据类型。

下面是一个创建 DataFrame 并查看其属性的简单示例：

```python
import pandas as pd
import numpy as np # 通常与 pandas 一起使用

# 创建一个示例 DataFrame
df2 = pd.DataFrame([[1, 2], [1.1, 2.1]],
                   index=range(2),
                   columns=['col1', 'col2'])

# 查看数据类型
print("数据类型 (dtypes):")
print(df2.dtypes)

# 查看描述性统计
print("\n描述性统计 (describe):")
print(df2.describe())
```

### 3.2.2 排序与聚合

当我们想要对表格数据进行鸟瞰式观察，了解其总体特征时，我们会进行信息汇总，即聚合。这意味着我们不再关注单个数据点的细节，而是希望了解数据的整体情况。

#### 突出显示信息：排序
我们可以从不同角度审视表格。尽管信息内容本身不会改变，但我们可以突出显示我们更感兴趣的信息。第一种突出显示的方法是将最重要的信息放在表格的顶部，这可以通过 `.sort_values()` (按值排序) 或 `.sort_index()` (按索引排序) 方法实现。

一个排序的例子：
```python
# 假设我们有一个比赛得分的 DataFrame
race_score = pd.DataFrame([
    ['Alice', 15.6],
    ['Bob', 17.3],
    ['Charlie', 14.5]
], columns=['Name', 'Score']) # 为列指定名称以便于理解

# 按 'Score' 列 (原为索引1) 升序排序
print("按分数升序排序:")
print(race_score.sort_values(by='Score', ascending=True))

# 修改索引并按索引排序
race_score.index = [1002, 1001, 1003]
print("\n按新索引排序:")
print(race_score.sort_index())
```

#### 信息汇总：聚合
当我们希望对表格数据进行鸟瞰式观察时，我们会进行信息汇总。也就是说，我们不再关注单个数据记录的细节，而是想了解数据的整体面貌。这种汇总操作可以通过 `.agg()` 方法完成。

一个聚合的例子：
```python
student_name = ['Alice', 'Bob', 'Charlie', 'David', 'Eva']
language_score = [99, 100, 35, 60, 71]
math_score = [25, 89, 36, 40, 91]

score = pd.DataFrame(
    np.array([language_score, math_score]).T, # .T 转置数组使成绩成为列
    index=student_name,
    columns=['language', 'math'] # 注意：原文中 'math’ 应为 'math'
)
print("原始分数表:")
print(score)

# 计算每门课程的平均分 (axis=0 表示按列操作)
print("\n各科目平均分:")
print(score.agg("mean", axis=0))

# 计算每个学生的总分 (axis=1 表示按行操作)
print("\n每位学生总分:")
print(score.agg("sum", axis=1))
```

#### 读取CSV文件
Pandas 提供了一个非常简洁和强大的 API 来读取 CSV 文件：`pd.read_csv()` 函数。这是处理表格数据的第一步。

```python
# 示例：读取 iris 数据集
# 假设 iris.data 文件位于同级目录下的 iris 文件夹中，并且没有表头
# irisdata = pd.read_csv("./iris/iris.data", header=None)
# print(irisdata.head()) # 打印前5行查看数据是否加载成功
```
!!! note "文件路径提示"
    在实际运行 `pd.read_csv()` 时，请确保文件路径 `"./iris/iris.data"` 是正确的，或者根据您的文件实际位置进行修改。

!!! question "课堂练习 1：鸢尾花数据处理"
    1.  读取数据 `./iris/iris.data` (假设文件无表头) 并快速查看。列名是什么？（提示：可以使用 `.head()` 和 `.columns`）
    2.  将列名更改为 `"sepal_length"`, `"sepal_width"`, `"petal_length"`, `"petal_width"`, 和 `"class"` (原 `type` 可能会与 Python 关键字冲突，建议用 `class` 或 `species`)。
    3.  移除最后一列 `"class"` (提示: 有一个名为 `drop` 的方法)。
    4.  计算前四列 (花萼长度、花萼宽度、花瓣长度、花瓣宽度) 中每一列的平均值和标准差（使用聚合方法）。
    5.  对前四列进行标准化处理：从每个相应列中减去该列的平均值，然后除以其标准差。新的 DataFrame 应称为 `"irisdata_normed"`。
    6.  检查 `irisdata_normed` 的平均值和标准差 (理论上均值应接近0，标准差应接近1)。
    7.  将处理后的数据 `irisdata_normed` 写入一个新的 `.csv` 文件 (使用 `.to_csv()` 方法)，例如 `iris_normed.csv`，并且不包含索引。

### 3.2.3 堆叠与拆分 (`.stack()` 和 `.unstack()`)
前面的小节 (例如 3.2.2 中关于排序和聚合的讨论) 主要关注如何改变数据内容的呈现方式或进行汇总，但我们基本上保持了原有的行作为行、列作为列的结构（没有进行行和列之间的根本性转置或交换）。

突出显示我们感兴趣的数据的第二种重要方法是通过**交换行和列的层级**。这不仅是一种数据重塑技巧，也是一种在不改变内容值（与聚合不同）的情况下组织数据的重要方式。这可以通过 `.stack()` 和 `.unstack()` 方法实现。

*   `.stack()`: 将 DataFrame 的列“堆叠”到行，即将列索引转换为行索引，通常会产生一个 Series (如果原始列索引只有一层) 或一个具有更深层级行索引的 DataFrame。
*   `.unstack()`: `.stack()` 的逆操作，将行索引的某个层级“拆分”到列索引。

DataFrame 中的索引向我们展示了关于个体身份的信息，但通常情况下，我们可能会有多层级的身份信息（MultiIndex）。例如，一年级一班有一个 Alice，三年级二班可能也有一个 Alice。因此，我们需要多重索引来帮助唯一识别一个数据点。

让我们假设我们从不同年级、不同班级选择一名学生，并记录他们的身高和体重。

```python
# 定义多层索引的各个级别
arrays = [
    ["first", "first", "second", "second", "third", "third", "fourth", "fourth"], # 年级
    ["one", "two", "one", "two", "one", "two", "one", "two"], # 班级
]

# 对应的数据：身高和体重
height_weight = np.array([
    [173, 176, 185, 167, 165, 193, 156, 163],  # 身高
    [130, 190, 180, 170, 170, 200, 100, 105]   # 体重
]).T # 转置使得每行代表一个学生，每列代表身高或体重

# 创建多层索引对象
# 参考: https://pandas.pydata.org/docs/reference/api/pandas.MultiIndex.from_arrays.html
myindex = pd.MultiIndex.from_arrays(arrays, names=["grade", "class"])

# 创建带有MultiIndex的DataFrame
student_info = pd.DataFrame(height_weight,
                            index=myindex,
                            columns=["height", "weight"])
print("原始 DataFrame (student_info):")
print(student_info)

# 使用 stack() 将列转换为行索引的最内层
# 结果通常是一个 Series，其索引是 (grade, class, original_column_name)
stacked_info = student_info.stack()
print("\nStack 之后 (stacked_info):")
print(stacked_info)

# 使用 unstack() 可以将行索引的特定层级转换回列索引
# 例如，将 stacked_info 中代表原列名 ('height', 'weight') 的层级 (默认最内层, 级别-1) unstack 回去
unstacked_original = stacked_info.unstack()
print("\nUnstack 默认层级 (恢复原状):")
print(unstacked_original)

# 也可以 unstack 多层，例如，将 'class' (级别1) 和原列名层级 (级别2, stack后产生的) 转换回列
# student_info.stack().unstack([1,2]) 这种调用方式需要Series的索引有足够多的层级
# 或者，对原始 student_info 进行操作
# 先 stack，然后 unstack 'class' 层级 (索引中的第1层)
unstacked_class = student_info.stack().unstack(level='class')
print("\nStack 后再 Unstack 'class' 层级:")
print(unstacked_class)

# 也可以对 student_info 直接 unstack，但这通常用于行索引层级很多的情况
# 例如，如果想把 'class' 变成列的一个层级：
# print("\nUnstacking 'class' from student_info:")
# print(student_info.unstack(level='class'))
```

### 3.2.4 基于标签和位置的选择 (`.loc` 和 `.iloc`)
从 DataFrame 中提取行和列的最简单方法是使用方括号 `[]`。然而，这种方式在复杂场景下存在一些局限性：
*   对于行和列的选择，可能需要不同的语法或步骤。
*   直接用 `[]` 选择多行（通过标签列表）不直观，通常 `df[['col1', 'col2']]` 是选择列。
*   用 `[]` 对列进行切片操作不直接支持 (例如 `df[:, 1:3]` 通常不工作，或行为不符合预期)。
*   复杂的多步选择（高级选择）容易因返回视图（view）或副本（copy）的不确定性而引发 `SettingWithCopyWarning` 或难以调试的错误。

为了更清晰、更健壮地选择数据，Pandas 提供了两个主要的基于索引的访问器：
*   `.loc[]`: **L**abel-based **o**peration **c**ollector. 用于基于标签（行索引名和列名）选择数据。可以接受单个标签、标签列表、标签切片、布尔数组等。
*   `.iloc[]`: **I**nteger **l**ocation-based **o**peration **c**ollector. 用于基于整数位置（从0开始的行号和列号）选择数据。可以接受单个整数、整数列表、整数切片、布尔数组等。

!!! note "关键区别"
    `.loc` 使用的是 DataFrame 索引和列的**名称/标签**。
    `.iloc` 使用的是 DataFrame 索引和列的**整数位置**。
    切片操作时，`.loc` 的结束点是**包含**的，而 `.iloc` 的结束点是**不包含**的（与 Python 列表切片一致）。

```python
# 继续使用上一节的 student_info DataFrame
# print("原始 DataFrame (student_info):")
# print(student_info)

# 使用 .loc 选择标签为 ('second', 'one') 的行和 'height' 列
val_loc = student_info.loc[('second', 'one'), 'height']
print(f"\nstudent_info.loc[('second', 'one'), 'height']: {val_loc}")

# 使用 .iloc 选择第3行 (整数位置为2) 和第1列 (整数位置为0)
# student_info 中 ('second', 'one') 对应的是索引为2的行, 'height' 是索引为0的列
val_iloc = student_info.iloc[2, 0]
print(f"student_info.iloc[2, 0]: {val_iloc}") # 这应该与上面的 val_loc 相同

# 使用 .loc 和 lambda 函数进行条件选择
# 选择 'height' 大于 160 且小于 180 的所有行和所有列
# lambda df: ... 中的 df 指代 student_info 本身
conditional_loc = student_info.loc[lambda df: (df['height'] > 160) & (df['height'] < 180), :]
print("\n条件选择 (身高 > 160 且 < 180):")
print(conditional_loc)

# .loc 也可以用于选择多行多列
# 例如，选择 'first' 年级的所有学生的身高和体重
first_grade_data = student_info.loc['first'] # MultiIndex 支持部分选择
print("\n'first' 年级学生数据:")
print(first_grade_data)

# 选择 'Alice' 和 'Bob' 的 'math' 成绩 (使用之前 score DataFrame 的例子)
# print("\nAlice 和 Bob 的数学成绩:")
# print(score.loc[['Alice', 'Bob'], 'math'])

# 使用 .iloc 选择前3行和前2列
# print("\nscore DataFrame 的前3行，前2列 (iloc):")
# print(score.iloc[0:3, 0:2]) # 行0,1,2 和 列0,1
```

!!! info "收入数据示例背景"
    接下来，我们将应用所学知识处理一个关于收入与消费数据的实际案例。

!!! question "课堂练习 2：收入与消费数据分析"
    1.  文件 `income.csv` 和 `consumption.csv` 包含了各省（市、自治区）在不同年份的人均收入和人均消费数据，以及相应的人口数量。
    2.  请分别读取这两个文件。然后，为每个 DataFrame 创建新列，以计算每个省份在每年的**总收入**和**总消费**。计算后，将这两个 DataFrame 分别另存为新文件，例如 `income_total.csv` 和 `consumption_total.csv`。（思考：总收入/总消费的单位是什么？）
    3.  你将如何计算各省各年的**储蓄额**和**储蓄率**？（储蓄额定义为总收入减去总消费，储蓄率定义为储蓄额占总收入的百分比）。如果让你将这些信息合并到一个新的 DataFrame 中，你会如何操作？(提示: 可能需要合并操作)

### 3.2.5 数据移位与生产函数应用

!!! info "生产函数数据示例背景"
    在处理时间序列数据，特别是经济学中的生产函数模型分析时，经常需要对数据进行时间上的对齐操作。例如，当期的产出可能是由上一期的资本投入决定的。

处理单个数据集时，另一个非常有用的操作是数据的**超前 (lead) / 滞后 (lag)**。这可以通过 Pandas 中的 `.shift()` 方法实现。该方法可以将数据沿着指定的轴（默认为行轴）移动指定的期数。

让我们考虑一个柯布-道格拉斯生产函数的形式：
$Y_t = A_t K_t^\alpha L_t^{1-\alpha}$

其中：
*   $Y_t$ 是 $t$ 时期的总产出。
*   $K_t$ 是 $t$ 时期投入的资本。
*   $L_t$ 是 $t$ 时期投入的劳动。
*   $A_t$ 是 $t$ 时期的全要素生产率。
*   $\alpha$ 是资本的产出弹性。

在会计实践中，公司通常在财年末披露财务报表。此时，报告的“产出 ($Y_t$)”通常是整个年度的总产出，“劳动力 ($L_t$)”可能是年末的雇员人数，“资本 ($K_t$)”也可能是年末的存量。这种数据记录方式可能会导致投入与产出之间在时间上的错位。例如，本年度的产出可能更多地依赖于年初或上一年度末的资本存量。我们通常使用 `shift()` 函数来将相关的投入变量调整到合适的时间节点。

对于劳动力投入，由于我们不确定是期末值、期初值还是平均值能最准确地衡量实际投入，一种常见的处理方法是取当年和上一年的平均劳动力作为 $L_t$ 的代理变量。

!!! question "课堂练习 3：生产函数数据处理"
    文件 `cdprod.xlsx` (假设) 包含了某行业或多家公司多年的面板数据，其中包括产出 (output)、资本存量 (capital) 和劳动力投入 (labor) 等变量。
    1.  读取 `cdprod.xlsx` 数据。假设数据中已有时序和个体标识。
    2.  为了解决资本投入与产出的时间错位问题，为每个公司创建滞后一期的资本存量，即 $K_{t-1}$。 (提示: 可能需要先按公司分组，再进行 `shift` 操作)。
    3.  计算平均劳动力投入。一种常见做法是使用当期劳动力 $L_t$ 和上一期劳动力 $L_{t-1}$ 的平均值，即 $L_{avg,t} = (L_t + L_{t-1}) / 2$。同样，注意在面板数据中按公司分组处理。
    4.  （可选）将产出 $Y_t$、滞后资本 $K_{t-1}$、平均劳动 $L_{avg,t}$ 取自然对数，为后续的线性回归分析做准备 (即 $\ln(Y_t) = \ln(A_t) + \alpha \ln(K_{t-1}) + (1-\alpha) \ln(L_{avg,t})$)。
    5.  处理由于 `shift` 操作产生的缺失值 (NaN)。你会如何处理它们？（例如，删除包含NaN的行，或仅在计算中使用有效数据）。

## 数据处理与分析：时间序列操作

## 处理 `shift` 操作产生的缺失值

在上一节中，我们讨论了使用 `shift` 操作来进行数据的超前或滞后处理。一个常见的问题是，`shift` 操作会在数据的开头或结尾产生缺失值 (NaN)。

!!! question "思考与讨论"
    针对 `shift` 操作产生的缺失值 (NaN)，你会如何处理它们？（例如，删除包含NaN的行，或仅在计算中使用有效数据）。

---

## 示例：生产函数数据

!!! info "背景知识：生产函数与数据校准"
    经济学中，生产函数描述了投入与产出之间的关系。一个常见的生产函数形式是柯布-道格拉斯生产函数：
    `𝑌𝑡 = 𝐴𝑡 * 𝐾𝑡^𝛼 * 𝐿𝑡^(1−𝛼)`
    其中：
    *   `𝑌𝑡` 是时期 `𝑡` 的总产出。
    *   `𝐴𝑡` 是时期 `𝑡` 的全要素生产率 (Total Factor Productivity, TFP)。
    *   `𝐾𝑡` 是时期 `𝑡` 使用的资本存量。
    *   `𝐿𝑡` 是时期 `𝑡` 投入的劳动量。
    *   `𝛼` 是资本的产出弹性。

    在会计实践中，公司通常在财政年度末披露财务报表。这意味着：
    *   产出 (`𝑌𝑡`) 通常是整个年度的总产出。
    *   劳动 (`𝐿𝑡`) 通常是年末的员工数量。
    *   资本 (`𝐾𝑡`) 通常也是年末的资本存量。

    这种数据记录方式会导致投入和产出之间的时间错位问题。例如，当期产出 `𝑌𝑡` 更有可能依赖于期初或期中平均的资本和劳动投入，而不是期末值。我们可以使用 Pandas 中的 `shift()` 函数来校准这些数据，使投入和产出在时间上对齐。

    对于劳动投入，由于不确定使用期初、期末还是期中平均值能更准确地衡量，通常会采用当年和上一年的平均劳动量作为 `𝐿𝑡` 的代理。

!!! question "课堂练习 3：生产函数数据处理"
    文件 `cdprod.xlsx` 包含了一家虚拟的资本密集型企业从2000年到2021年的资本、劳动和产出信息。但2000年的产出数据缺失。

    1.  请编写一个函数，在不校正数据时间错位的情况下，估算资本的产出弹性 `𝛼`。
        *   **提示**：你可以编写一个循环，尝试不同的 `𝛼` 值（例如，从0到1，步长0.01），找出哪个 `𝛼` 值能使得基于 `𝐾𝑡^𝛼` 计算得到的序列与（某种标准化或变换后的）产出序列 `𝑌𝑡` 最接近。一种简化的思路是，如果 `𝑌𝑡/𝐿𝑡^(1−𝛼) = 𝐴𝑡 * (𝐾𝑡/𝐿𝑡)^𝛼` 近似成立，可以分析 `log(𝑌𝑡/𝐿𝑡) = log(𝐴𝑡) + 𝛼 * log(𝐾𝑡/𝐿𝑡)` 的关系。更简单地，如果假设 `𝐴𝑡` 和 `𝐿𝑡` 影响不大，或者 `𝑌𝑡 ≈ 𝐶 * 𝐾𝑡^𝛼`，可以尝试拟合这个关系。

    2.  请正确校准资本和劳动数据的时间序列（例如，使用期初资本 `𝐾𝑡-1` 作为当期 `𝑌𝑡` 的投入，使用当年和上一年的平均劳动 `(𝐿𝑡 + 𝐿𝑡-1)/2` 作为当期投入），然后重新执行步骤1，估算资本的产出弹性 `𝛼`。比较两次估算的结果。

---

## 示例：金融数据

!!! info "背景知识：资产定价中的动量效应"
    在资产定价理论中，“动量 (momentum)”是一个重要的概念。它指的是股票过去的收益率信息可以为预测其未来收益率提供线索。通常，动量因子 `𝑚𝑡` 定义为过去一段时间（不包括最近一个月）的累计收益率。例如，一个常用的动量定义是：
    `𝑚𝑡 = Σ(j=2 to 12) 𝑟(𝑡−𝑗)`
    其中 `𝑟𝑡` 是资产在时间 `𝑡` 的收益率。这个公式计算的是从 `𝑡-12` 到 `𝑡-2` 这11个月的累计收益率。

!!! question "课堂练习 4：金融数据与动量因子计算"
    1.  文件 `return1.csv` 包含了一家公司股票的收益率信息。请计算该公司在数据可得情况下的月度动量因子。
        *   **提示**：你可能会发现 Pandas 的 `rolling()` 方法非常有用。具体来说，可以使用 `rolling(window=11).sum()` 来计算过去11期（对应 `j=2` 到 `j=12` 的11个值）的和，然后再用 `shift(1)` 来确保我们使用的是 `t-12` 到 `t-2` 的数据来预测 `t` 或解释 `t-1`。对于 `𝑟(𝑡−𝑗)`，若要计算 `𝑚𝑡`，需要 `𝑟(𝑡-2)`, `𝑟(𝑡-3)`, ..., `𝑟(𝑡-12)`。

    2.  文件 `return4.csv` 包含了四家公司股票的收益率信息。
        1.  查看数据，计算每个时间点的横截面平均收益率 (cross-sectional average returns)。然后，计算这些横截面平均收益率的时间序列平均值。
        2.  请读入数据，并检查是否需要进行任何必要的数据清洗或转换。
        3.  请计算这四家公司在数据可得情况下的月度动量因子。

---

## 示例：各国分行业GDP数据

!!! question "课堂练习 5：国家与行业 GDP 数据分析"
    文件 `country_sector.xlsx` 包含了四个国家在不同行业的GDP数据。
    请分别计算：
    1.  每个国家的总平均GDP（跨行业的平均值）。
    2.  每个行业的总平均GDP（跨国家的平均值）。
    可以使用 Pandas 的 `groupby()` 和 `mean()` 方法来实现。
