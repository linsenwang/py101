
# 第三章 NumPy 与 Pandas 基础

## 学习目标

*   深入理解单表数据处理。
*   掌握长宽表的转换方法。
*   学习如何将数据表进行分组操作。
*   通过更多实例进行练习。

## 3.2.4 `pivot_table` 与 `melt`：长宽表转换

!!! note "关键概念：`stack`/`unstack` 与 `pivot_table`/`melt` 的区别"
    `stack` 和 `unstack` 方法通过改变索引（index）和列（columns）来转换数据的呈现方式，但表格的**内容本身保持不变**。换句话说，只是数据的展示形式发生了变化（例如，从一个 6x2 的表变成一个 3x4 的表，但表中的数值不变）。
    而现在我们要介绍的 `pivot_table` 和 `melt` 方法，则允许在索引/列与表格**内容**之间进行转换和重塑。

我们通常将行数过多、信息冗余的表称为“长表”（long table），而将列数过多、不易聚焦关键信息的表称为“宽表”（wide table）。

*   **`pivot_table`**：将长表转换为更宽、更紧凑的表。
*   **`melt`**：将宽表转换为更长、更规范的表。

### `pivot_table`：长表转宽表

让我们先创建一个用于演示 `pivot_table` 的长表。

```python
import numpy as np
import pandas as pd

data = {
    "score": [90, 91, 92, 80, 81, 82, 60, 61, 62, 50, 51, 52],
    "grades": ["A"]*3 + ["B"]*3 + ["C"]*3 + ["D"]*3,
    "date": pd.to_datetime(["2020-01-03", "2020-01-04", "2020-01-05"]*4)
}
df = pd.DataFrame(data)
print("原始长表 df:")
print(df)
```

我们希望通过 `pivot_table` 将上述长表 `df` 转换成如下形式的宽表：

| date       | A  | B  | C  | D  |
| :--------- | :- | :- | :- | :- |
| 2020-01-03 | 90 | 80 | 60 | 50 |
| 2020-01-04 | 91 | 81 | 61 | 51 |
| 2020-01-05 | 92 | 82 | 62 | 52 |

实现代码如下：

```python
pivoted = df.pivot_table(
    index="date",      # 指定哪一列的值作为新表的索引
    columns="grades",  # 指定哪一列的值作为新表的列名
    values="score"     # 指定哪些列的值填充到新表的主体中
)
print("\n转换后的宽表 pivoted:")
print(pivoted)
```

!!! question "课堂练习 1：数据透视"
    请对以下数据进行透视操作：
    ```python
    data_ex1 = {
        "value": range(13),
        "variable": ["A"]*4 + ["B"]*3 + ["C"]*3 + ["D"]*3,
        "date": pd.to_datetime(
            ["2020-01-03"]*5 + 
            ["2020-01-04"]*4 + 
            ["2020-01-05"]*4
        )
    }
    df_ex1 = pd.DataFrame(data_ex1)
    print("待透视的表 df_ex1:")
    print(df_ex1)
    ```
    **提示：**思考如何处理 `value` 列在透视后的聚合。

`pivot_table` 方法的功能远不止简单地改变数据位置。它的 `aggfunc` 参数可以在数据透视过程中对每个分组进行信息汇总（聚合）。

例如，如果一个日期和变量组合有多行数据，我们可以使用 `aggfunc` 来指定聚合函数，如求和：
```python
# 假设 df_ex1 是上一个练习中的数据
# 如果不指定 aggfunc 且存在重复的 index/columns 组合，可能会报错或默认使用 mean
# pivoted_ex1_sum = df_ex1.pivot_table(
# index="date",
# columns="variable",
# values="value",
# aggfunc="sum"  # 指定聚合函数为求和
# )
# print("\n按 variable 求和透视后的表 pivoted_ex1_sum:")
# print(pivoted_ex1_sum)
```

!!! question "课堂练习：`MallSales.csv` 数据分析"
    读取 `MallSales.csv` 数据，并完成以下操作：

    1.  透视表格，计算按年份（Year）和类别（Category）统计的销售总额（Sales）。你遇到了什么问题？（提示：检查数据类型和缺失值）
    2.  透视表格，计算按年份（Year）统计的平均销售额（Sales）。
    3.  透视表格，查看按产品（Product）统计的平均评分（Rating）。
        *   提示：将列转换为字符串类型，可以使用 `.str` 访问器。
        *   提示：移除字符串末尾的特定字符，可以使用 `.str.rstrip()`。
    4.  透视表格，同时显示按年份（Year）和类别（Category）统计的销售总额（Sum of Sales）和平均销售额（Mean of Sales）。
    5.  在问题4的基础上，将产品（Product）嵌套在类别（Category）下进行透视。

### `melt`：宽表转长表

当一个 DataFrame 包含过多的列时，我们称之为“杂乱的”（messy）宽表，因为有用的信息可能难以提取。`melt` 方法可以将这样的宽表转换为更易于处理的长表。

例如，有如下一个“杂乱”的宽表：
```python
# 假设 messydata1.csv 内容如下：
# Name,ID,Age,Gender
# Alice,1,25,Female
# Bob,2,30,Male
# Charlie,3,22,Male

messydata1 = pd.read_csv("messydata1.csv")
print("原始宽表 messydata1:")
print(messydata1)
```

我们可以使用 `melt` 将其转换为长表：
```python
melted_messy = messydata1.melt(id_vars=["Name"]) # Name 列作为标识符变量，其余列转换为行
print("\n转换后的长表 melted_messy:")
print(melted_messy)
```

转换后，我们可以更方便地提取特定信息，例如，分离出ID、年龄和性别：
```python
ids = melted_messy.loc[lambda df: df['variable'] == 'ID', :]
ages = melted_messy.loc[lambda df: df['variable'] == 'Age', :]
genders = melted_messy.loc[lambda df: df['variable'] == 'Gender', :]

# print("\nIDs:")
# print(ids)
# print("\nAges:")
# print(ages)
# print("\nGenders:")
# print(genders)
```

另一个 `melt` 的例子是处理炸薯条（French Fries）的数据：
假设我们有一个宽表 `french_fries.dat`，其中不同口味的评分分布在多个列中。
```python
# 假设 french_fries.dat 文件内容大致如下 (制表符分隔):
# time treatment subject rep potato buttery grassy ...
# 1    1         3       1   2.9    0.0     0.0    ...
# ...

# 注意：实际读取时，delimiter 可能需要根据文件实际情况调整，例如 delimiter='\t'
# ffm = pd.read_csv("french_fries.dat", delimiter='\s+') # 假设是空格分隔
# print("原始炸薯条数据 (部分):")
# print(ffm.head())
```
我们希望将其转换为长表，其中每一行代表一个特定的评分：
| time | treatment | subject | rep | scale  | score |
| :--- | :-------- | :------ | :-- | :----- | :---- |
| 1    | 1         | 3       | 1   | potato | 2.9   |
| 1    | 1         | 3       | 1   | buttery| 0.0   |
| 1    | 1         | 3       | 1   | grassy | 0.0   |
| ...  | ...       | ...     | ... | ...    | ...   |

实现代码如下：
```python
# 假设 ffm 已经成功读取
# melted_ffm = ffm.melt(
# id_vars=['time', 'treatment', 'subject', 'rep'], # 这些列保持不变，作为标识符
# var_name='scale',                               # 原来的列名转换后，新列的名称
# value_name='score'                             # 原来的值转换后，新列的名称
# )
# print("\n转换后的炸薯条长表 (部分):")
# print(melted_ffm.head())
```

!!! question "课堂练习 2：蛋糕数据转换"
    读取 `cake.dat` 数据，并将其转换为如下所示的长表格式：

    | cr | fr | variable | value |
    | :- | :- | :------- | :---- |
    | 1  | 1  | baker1   | 7.5   |
    | 2  | 1  | baker1   | 6.1   |
    | 1  | 1  | baker2   | 4.2   |
    | 2  | 1  | baker2   | 3.7   |
    | 1  | 2  | baker3   | 3.8   |
    | …  | …  | …        | …     |

    **提示：** 确定哪些是 `id_vars`，哪些是需要 `melt` 的值。

## 3.2.5 `groupby`：数据分组

DataFrame 的另一个重要操作是根据某些标准将行分成不同的组。例如，我们可以将学生按年级分组，一年级的学生组成一组，二年级的学生组成另一组，依此类推。这通常使用 `groupby` 方法实现。

让我们使用经典的鸢尾花（iris）数据集作为例子，将不同种类的花根据其类型（type）进行分组。

```python
# 确保 iris.data 文件在指定路径 './iris/iris.data' 或调整路径
# 文件内容示例:
# 5.1,3.5,1.4,0.2,Iris-setosa
# 4.9,3.0,1.4,0.2,Iris-setosa
# ...
irisdata = pd.read_csv(
    "./iris/iris.data", 
    names=["sepal_length", "sepal_width", "petal_length", "petal_width", "type"],
    header=None
)

iris_group = irisdata.groupby("type")
print("按 'type' 分组后，各组的大小:")
print(iris_group.size())
```

!!! note "关于 `groupby` 对象"
    需要注意的是，`groupby` 操作返回的是一个 `DataFrameGroupBy` 对象，它本身并不直接显示为多个新的 DataFrame。它实际上记录了哪些行属于哪个组。我们通常不直接使用这个 `DataFrameGroupBy` 对象本身，而是对其应用各种聚合方法（如 `sum()`, `mean()`, `count()`, `size()`, `first()`, `nth()` 等），这些方法会分别作用于每个分组。

请尝试对 `iris_group` 应用不同的聚合方法，并总结你的发现。

## 3.2.6 其他常用方法

以下是一些其他常用的 Pandas DataFrame 方法，我们不会在此详细介绍，但请务必阅读相关文档并通过练习来掌握它们：

*   `dropna()`: 删除含有缺失值的行或列。
*   `drop_duplicates()`: 删除重复的行。
*   `reset_index()`: 重置 DataFrame 的索引，并将旧索引添加为一列（可选）。

## 实践练习

!!! question "课堂练习 3：课程选择统计"
    **背景：** 我们有一个 `course_form.csv` 文件，记录了学生选课的信息，包括课程渠道（线上或线下）。
    **任务：** 统计有多少人从不同渠道（`form`：online/onsite）选择了不同的课程（`class`）。
    
    我们依赖 `count()` 方法来完成此任务。在这个例子中，`count()` 方法会应用于 `groupby` 形成的每个子 DataFrame，然后将各组的计数结果合并成一个新的 DataFrame。

    ```python
    # 假设 course_form.csv 文件内容大致如下：
    # student_id,class,form
    # 1,Math,online
    # 2,Physics,onsite
    # 1,Physics,online
    # 3,Math,onsite
    # ...
    
    # course_form = pd.read_csv("./course_form.csv")
    # grouped_counts = course_form.groupby(["class", "form"]).count()
    # print("按课程和渠道统计选课人数:")
    # print(grouped_counts) 
    # 如果想统计的是学生人数，可能需要对 student_id 使用 nunique()
    # grouped_student_counts = course_form.groupby(["class", "form"])['student_id'].nunique()
    # print(grouped_student_counts)
    ```

!!! question "课堂练习 4：动物数据分析"
    请完成以下操作：

    1.  读取 `animal.csv` 数据，并使用 `first()` 方法找出每个类别（class）中速度最快的动物。
        （假设数据已按速度降序排列，或者 `first()` 取的是分组后的第一条记录，不一定是“最快”，需结合数据具体情况或先排序）。
    2.  读取 `animal.csv` 数据，并使用 `nth()` 方法找出每个类别中速度最快 *和第二快* 的动物。
    3.  读取 `animal.csv` 数据，并使用 `idxmax()` 方法找出每个类别中速度最快的动物的索引。
        （`idxmax()` 通常用于 Series，若要用于 DataFrame 分组，可能需要先选定速度列）。
    4.  读取 `animal.csv` 数据，并使用 `get_group()` 方法获取所有鸟类（bird）组成的分组数据。
    5.  读取 `race.csv` 文件，该文件包含一场比赛的信息。`id` 列显示运动员ID，`time` 列记录了他们几次尝试所花费的时间。找出每位运动员的平均用时。

!!! question "课堂练习 5：班级成绩整合"
    文件 `class1.xlsx` 和 `class2.csv` 包含了两个班级（class1, class2）在语文（language）和数学（math）两门课程的平均成绩。请将这两个文件中的信息进行整合与重组，以便于比较分析。
    
    **提示：** 考虑如何合并数据，以及如何组织数据结构（例如，是否需要长宽表转换）。
```
```python
course_form.groupby(["class","form"]).count()
```

## 课堂练习：分组操作

!!! question "课堂练习 4：深入 GroupBy 操作"
    请按以下要求完成操作：

    1.  读取 `animal.csv` 数据，并使用 `.first()` 方法找出每个类别 (`class`) 中速度最快 (`speed`) 的动物。
    2.  读取 `animal.csv` 数据，并使用 `.nth()` 方法找出每个类别 (`class`) 中速度最快 *和* 次快的动物。
    3.  读取 `animal.csv` 数据，并使用 `.idxmax()` 方法找出每个类别 (`class`) 中速度最快的动物的索引。
    4.  读取 `animal.csv` 数据，并使用 `get_group()` 方法获取 `bird` 类别的数据。
    5.  读取 `race.csv` 文件，该文件包含一场竞赛的信息。`id` 列显示运动员ID，`time` 列记录了他们几次尝试所花费的时间。请计算每位运动员的平均时间。

!!! question "课堂练习 5：数据重组与对比"
    文件 `class1.xlsx` 和 `class2.csv` 包含了两个班级在语文和数学上的平均成绩信息。请重新组织这两个表格中的信息，以便我们可以比较两个班级的语文成绩和数学成绩。

    具体来说，创建两个 DataFrame：一个用于存储两个班级的语文成绩，另一个用于存储两个班级的数学成绩。新表格的结构应如下所示：

    **语文成绩 DataFrame:**
    | Year | Class1 | Class2 |
    |------|--------|--------|
    | 2022 | ...    | ...    |
    | 2023 | ...    | ...    |
    | 2024 | ...    | ...    |

    **数学成绩 DataFrame:**
    | Year | Class1 | Class2 |
    |------|--------|--------|
    | 2024 | ...    | ...    |
    | ...  | ...    | ...    |

## 应用案例

### 案例一：国家统计局 GDP 数据分析

!!! info "背景信息：宏观经济数据"
    我国国家统计局提供了丰富的国家经济信息，特别是宏观经济平衡方面的数据。例如，我们可以轻松找到按省份和按行业划分的 GDP 数据。之前，我们已经接触过消费和收入数据，但当时使用的是已经处理过的数据。现在，让我们来看看原始数据。

!!! question "课堂练习 6：多数据源整合与实际价值计算"
    我们将使用四个文件：`consumption.csv`、`cpi.csv`、`gpd.csv` 和 `population.csv`。

    1.  请读取这些数据，并进行必要的更改，以便将所有信息整合到一个 DataFrame 中。
        !!! note "提示"
            设置新列时，需要确保顺序正确。
    2.  请计算各省份每年的总储蓄，并将结果 DataFrame 以“长”格式（long format）存储。
        !!! note "提示"
            您也可以使用“宽”格式（wide format）存储，但这可能会导致后续处理的麻烦。
    3.  我们知道，每年的产品价格都会发生变化，这由居民消费价格指数（CPI）反映。文件 `cpi.csv` 包含了相对于2013年（以2013年人民币计价）的历年价格指数。请根据价格指数调整各省份的总储蓄。我们将调整后的储蓄称为“实际储蓄”（real savings）。
    4.  各省份历年的平均实际储蓄是多少？
    5.  平均而言，哪个省份的储蓄最多？

### 案例二：个股回报率分析

!!! warning "注意"
    此练习难度较高！

!!! info "数据背景：个股日度数据"
    文件 `stock_utf.csv` 包含了1990年至2000年中国股市10只上市股票的每日信息。该数据是整个市场的一个子样本，但可以作为一个很好的示例。文件包含75个变量（列），但我们不会使用所有这些变量。

!!! question "课堂练习 7：股票回报率计算"
    1.  数据中包含哪些变量？（请自行探索）
    2.  我们重点关注 `PrevClPr`（前收盘价）和 `Clpr`（收盘价）。请创建一个新的 DataFrame，仅包含这些相关列以及股票代码和日期等必要信息。
    3.  我们已经学习了如何使用月度回报数据构建动量因子。现在，请从新的 DataFrame 中计算日回报率。回报率（此处指总回报率）定义为：
        \[ \frac{Clpr}{PrevClPr} \]
    4.  请计算每只股票每5天的累计回报率。

### 案例三：市场回报率计算

!!! info "数据背景：中国市场数据"
    文件 `Chiense_market.csv` 包含了所有中国上市公司的信息，但出于隐私考虑，我们对原始数据添加了大量噪音。该文件据称包含三列，但实际列举了以下关键信息：
    *   `stkcd`：股票代码
    *   `trdmnt`：交易月份
    *   `mclsprc`：月收盘价
    *   `msmvttl`：总市值

    我们需要计算每个月所有公司收盘价的加权平均值（按总市值加权）。这个加权平均值向我们展示了股票市场作为一个大型投资组合的表现。

### 案例四：指数回报率计算

!!! info "背景介绍"
    我们再次使用 `Chinese_market.csv` 文件。此外，我们还有另一个数据文件 `FT50.xlsx`，其中包含金融时报50指数（Financial Times 50 index）的成分股信息。

!!! question "课堂练习 8：特定指数成分股分析"
    现在，请从 `Chinese_market.csv` 中筛选出 FT50 指数的成分股数据子集，并计算这些公司按市值加权的平均价格（或根据具体分析目标，计算加权平均回报率）。

### 案例五：投资组合回报率计算

!!! info "背景介绍：构建投资组合"
    现在，让我们来计算迄今为止最复杂的回报率：投资组合回报率。我们首先需要构建一些投资组合。为此，我们首先根据股票市值的对数将股票池（stock universe）分为十个部分。
    *   市值最大的10%的股票组成一个投资组合，我们计算它们的简单平均回报率（称为投资组合和投资组合回报率）。
    *   接下来市值最大的10%到20%的股票组成另一个投资组合，我们计算它们的简单平均回报率，以此类推。

!!! question "课堂练习 9：构建市值分组投资组合并计算指标"
    请根据每个月的市值将股票构建成十个投资组合，并计算每个投资组合的简单平均价格。

!!! question "课堂练习 10：投资组合月度回报率 (进阶步骤)"
    1.  请计算每个月每只股票的总回报率（Gross Return）。
    2.  请根据市值将股票构建成十个投资组合... (原文后续步骤不完整，为 "Please construct ten portfolios ac"，通常指按市值分组并计算其平均回报率)。

## 计算公司子集的加权平均值

在处理实际金融数据时，我们有时需要关注特定公司群体的表现。例如，我们可以从 `Chinese_market` 数据集中选取金融时报50指数（FT50）成分股的一个子集，并计算这些公司的加权平均指标（如加权平均市值或加权平均收益率）。具体的权重可以根据市值、成交量或其他因素来确定。

!!! note "提示"
    这部分内容旨在引出更复杂的组合构建思想，具体的加权平均计算方法将取决于分析目标和可用数据。

## 示例五：投资组合收益率计算

接下来，我们将探讨一个在投资分析中至关重要的概念：**投资组合收益率**。计算投资组合收益率通常比计算单个资产的收益率更为复杂，因为它涉及到多个资产的汇总和可能的动态调整。

### 投资组合构建的基本逻辑

要计算投资组合收益率，我们首先需要构建这些投资组合。一个常见的方法是根据某种标准（如公司市值）对股票池中的所有股票进行排序和分组。

!!! note "核心步骤：构建投资组合"
    构建投资组合通常涉及以下步骤：
    1.  **选择标准与排序**：确定一个用于给股票排序的变量，例如公司市值（Market Value）或市值的对数值（Log of Market Value）。在每个时间点（例如每个月末），对所有股票按此标准进行排序。
    2.  **股票分组（分层）**：将排序后的股票等分为若干组。例如，可以构建十个投资组合（Decile Portfolios），即：
        *   市值最大的10%的股票构成第一个投资组合。
        *   市值排在接下来10%（即10%-20%区间）的股票构成第二个投资组合。
        *   以此类推，直到市值最小的10%的股票构成第十个投资组合。
    3.  **计算组内平均指标**：对于每个构建好的投资组合，在每个时间点计算其成分股的某种平均指标。常见的有：
        *   **简单平均价格**：组合内所有股票价格的算术平均值。
        *   **简单平均收益率**：组合内所有股票收益率的算术平均值（也称为等权重组合收益率）。

### 课堂练习与指导

!!! info "前置准备：计算个股总回报率"
    在进行投资组合收益率计算之前，通常需要先计算出每个月每只股票的**总回报率 (gross return)**。总回报率考虑了股价变动和股息收入。
    ```python
    # 伪代码示例：计算个股月度总回报率
    # df['price_next_month'] = df.groupby('stock_id')['price'].shift(-1)
    # df['dividend_this_month'] = df.groupby('stock_id')['dividend'].fillna(0) # 假设已有股息数据
    # df['gross_return'] = (df['price_next_month'] + df['dividend_this_month']) / df['price']
    ```
    请确保你已经掌握了个股回报率的计算方法。

!!! question "课堂练习 1：按市值构建投资组合并计算平均价格"
    请根据**每个月**的**市值**将股票构建成十个投资组合，并计算每个投资组合内股票的**简单平均价格**。

    **步骤提示：**
    1.  获取每个月末所有股票的市值数据。
    2.  对于每个月末：
        a.  根据市值对股票进行降序排列。
        b.  将股票等分为十组。
        c.  计算每组股票在该月末的简单平均价格。
    3.  整理结果，展示每个投资组合在每个月的平均价格序列。

!!! question "课堂练习 2：按市值对数构建投资组合并计算平均收益率"
    1.  请计算**每个月**每只股票的**总回报率 (gross return)**。
    2.  请根据**每个月**的**市值对数 (log of market value)** 将股票构建成十个投资组合。
        *   市值对数有助于处理市值的极端分布，使分组更为稳健。
    3.  计算每个投资组合（即每组股票）在该月的**简单平均收益率**。

    **步骤提示：**
    1.  确保已计算出所有股票在每个月的总回报率。
    2.  获取每个月末所有股票的市值数据，并计算其自然对数值。
    3.  对于每个月末：
        a.  根据市值对数对股票进行降序排列。
        b.  将股票等分为十组。
        c.  对于每一组，找到其成分股在**当月**的总回报率，并计算这些回报率的简单平均值。这将是该投资组合在当月的收益率。
    4.  整理结果，得到十个投资组合各自的月度收益率时间序列。

!!! question "课堂练习 3：计算各投资组合序列的平均收益率"
    在完成“课堂练习 2”后，你将得到十个投资组合的月度收益率时间序列。现在，请针对这十个投资组合中的**每一个**，计算其**整个时间序列的平均收益率**。

    **步骤提示：**
    1.  对于第一个投资组合的月度收益率序列，计算其所有月份收益率的算术平均值。
    2.  对第二个投资组合的月度收益率序列，同样计算其算术平均值。
    3.  以此类推，直到计算出所有十个投资组合的长期平均收益率。

!!! note "关键概念：市值因子与规模效应"
    通过比较不同市值分组（例如，大市值组合与小市值组合）的平均收益率，我们可以初步观察市场上是否存在“规模效应”（Size Effect），即小市值公司股票的平均回报率是否系统性地高于或低于大市值公司股票。这种按特征分组并比较其平均回报的方法是因子投资研究中的基础步骤。

