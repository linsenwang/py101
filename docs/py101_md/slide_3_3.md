# Chapter 3: NumPy and Pandas
## Overview

This chapter delves deeper into data manipulation using NumPy and Pandas, focusing on:

*   Processing and transforming single tables.
*   Converting tables between long and wide formats.
*   Dividing tables into manageable groups for analysis.
*   Reinforcing concepts with practical examples.

## Reshaping DataFrames: `pivot_table` and `melt`

Sometimes, the way data is structured in a table isn't ideal for analysis. We might need to reshape it.

!!! info "Distinction from `stack` and `unstack`"
    Methods like `stack()` and `unstack()` can change the presentation of data by moving information between the index and columns. However, the actual data values remain unchanged. For instance, a 6x2 table might become a 3x4 table, but the numbers themselves are merely rearranged.

We will now explore methods that go further by interchanging index/column information with the table's content.

!!! note "Key Concept: Long vs. Wide Tables"
    *   A table is considered **long** when it has more rows than desired for a particular analysis, often with repeated information across rows or multiple observations stacked vertically.
    *   A table is considered **wide** when it has more columns than desired, potentially making it difficult to compare certain variables or when observations are spread horizontally across columns.

    We use `pivot_table` to transform long tables into wider ones and `melt` to convert wide tables into longer ones.

### Pivoting Tables: From Long to Wide with `pivot_table`

Let's start by creating a "long" DataFrame to demonstrate pivoting. This DataFrame is considered "long" because each unique combination of `date` and `grades` for a `score` is on its own row.

```python
import numpy as np
import pandas as pd

data = {
    "score": [90, 91, 92, 80, 81, 82, 60, 61, 62, 50, 51, 52],
    "grades": ["A"]*3 + ["B"]*3 + ["C"]*3 + ["D"]*3,
    "date": pd.to_datetime(["2020-01-03", "2020-01-04", "2020-01-05"] * 4)
}
df = pd.DataFrame(data)
print("Original Long DataFrame:")
print(df)
```

We use `pivot_table` to convert such a long table to a wider format. For instance, we might want `date` as the index, `grades` as columns, and `score` as the values. The table we want would look like this:

```
grades        A   B   C   D
date
2020-01-03   90  80  60  50
2020-01-04   91  81  61  51
2020-01-05   92  82  62  52
```

Here's how to achieve this using `pivot_table`:

```python
pivoted = df.pivot_table(
    index="date",      # Values from this column become the new index
    columns="grades",  # Values from this column become the new column headers
    values="score"     # Values from this column fill the table
)
print("\nPivoted Wide DataFrame:")
print(pivoted)
```

!!! question "Exercise: Pivot a Custom Table"
    First, create a DataFrame from the following data:
    ```python
    exercise_data = {
        "value": range(13),
        "variable": ["A"]*4 + ["B"]*3 + ["C"]*3 + ["D"]*3,
        "date": pd.to_datetime(
            ["2020-01-03"]*5 +
            ["2020-01-04"]*4 +
            ["2020-01-05"]*4
        )
    }
    exercise_df = pd.DataFrame(exercise_data)
    print("Original Exercise DataFrame:")
    print(exercise_df)
    ```
    Instructions: Pivot this table using `date` as the index, `variable` as columns, and aggregate `value` using `sum`.

    The `pivot_table` method is more powerful than simply changing the locations of data. Its `aggfunc` parameter can summarize information for each cell in the new pivoted table if there are multiple values that map to it. For example, to sum values:

    ```python
    # Solution for the exercise:
    # pivoted_exercise = exercise_df.pivot_table(
    #    index="date",
    #    columns="variable",
    #    values="value",
    #    aggfunc="sum"  # Aggregate function
    # )
    # print("\nPivoted Exercise DataFrame (sum):")
    # print(pivoted_exercise)
    ```

!!! question "Exercise: Analyzing Mall Sales Data with `pivot_table`"
    First, read in the `MallSales.csv` data. (You'll need to ensure this file is accessible in your environment).
    ```python
    # Example:
    # mall_sales_df = pd.read_csv("MallSales.csv")
    # print(mall_sales_df.head())
    ```
    Then, perform the following operations:

    1.  Pivot the table to compute the sum of `Sales` by `Year` and `Category`. What issues do you encounter? (Hint: Consider data types or missing values if errors occur).
    2.  Pivot the table to compute the average `Sales` by `Year`.
    3.  Pivot the table to see the average `Rating` by `Product`.
        !!! tip "String Operations"
            To convert a column to string type, you can use `.astype(str)`. To access string methods for a Series, use `.str`. For example, `df['column'].str.rstrip('%')` removes a trailing '%' character from each string in the 'column'.
    4.  Pivot the table to show both the sum and mean of `Sales` by `Year` and `Category`. (Hint: `aggfunc` can take a list of functions, e.g., `aggfunc=['sum', 'mean']`).
    5.  Nest `Product` under `Category` in the index and redo question 4. (Hint: `index` can take a list of columns, e.g., `index=['Category', 'Product']`).  

### Melting Tables: From Wide to Long with `melt`

Conversely, we use `melt` to convert a wide table into a longer one. A DataFrame is considered "wide" or "messy" when it has too many columns, especially if those columns represent variables that could be better organized into fewer columns with more rows. This makes it harder to find or analyze useful information.

For example, consider data where multiple attributes of an entity are spread across columns:
```python
# Assume messydata1.csv contains data like:
# Name,ID,Age,Gender
# Alice,101,30,F
# Bob,102,25,M
# This is wide if ID, Age, Gender are seen as different 'measurements' of Name.

data_attributes_as_columns = {
    'Name': ['Alice', 'Bob'],
    'ID': [101, 102],
    'Age': [30, 25],
    'Gender': ['F', 'M']
}
messydata1_df = pd.DataFrame(data_attributes_as_columns)
print("Original DataFrame (attributes as columns):")
print(messydata1_df)
```

We can "melt" this DataFrame to a long format, where one column stores the attribute type (e.g., 'ID', 'Age', 'Gender') and another stores its value. `id_vars` specifies columns that should remain as identifiers.

```python
long_format_df = messydata1_df.melt(
    id_vars=["Name"],         # Column(s) to keep as identifier variables
    var_name="Attribute",     # Name for the new column holding former column names
    value_name="Value"        # Name for the new column holding values
)
print("\nMelted DataFrame (long format):")
print(long_format_df)
```

Then we can make smaller and neater DataFrames by filtering this long format:
```python
ids = long_format_df.loc[lambda df: df['Attribute'] == 'ID', :]
ages = long_format_df.loc[lambda df: df['Attribute'] == 'Age', :]
genders = long_format_df.loc[lambda df: df['Attribute'] == 'Gender', :]

print("\nFiltered IDs:")
print(ids)
print("\nFiltered Ages:")
print(ages)
print("\nFiltered Genders:")
print(genders)
```

**Another example: French Fries Data**

Consider a dataset on French fries tasting scores, where each sensory attribute (e.g., `potato`, `buttery`, `grassy`) is a separate column. This is a "wide" format.

An example of the original data structure (simulated from `french_fries.dat` description):
```
   time  treatment  subject  rep  potato  buttery  grassy
0     1          1        3    1     2.9      0.0     0.0
... (more rows and columns for other attributes) ...
```

We want to transform this into a "long" table like:
```
   time  treatment  subject  rep   scale  score
0     1          1        3    1  potato    2.9
1     1          1        3    1 buttery    0.0
2     1          1        3    1  grassy    0.0
...
```
This is achieved by "melting" the attribute columns (`potato`, `buttery`, etc.) into two new columns: `scale` (containing the attribute name) and `score` (containing the value).

```python
# Assuming french_fries.dat is available and tab-delimited
# ffm = pd.read_csv("french_fries.dat", delimiter='\t')
# print("Original French Fries DataFrame (head):")
# print(ffm.head())

# melted_ffm = ffm.melt(
#     id_vars=['time', 'treatment', 'subject', 'rep'], # Columns to keep as identifiers
#     var_name='scale',                               # Name for the new 'variable' column
#     value_name='score'                              # Name for the new 'value' column
# )
# print("\nMelted French Fries DataFrame (head):")
# print(melted_ffm.head())
```

!!! question "Exercise: Melting Cake Data"
    Read in the `cake.dat` data. This file typically has a wide format where different bakers' ratings or measurements are in separate columns (e.g., `baker1`, `baker2`). Melt it to a long table with a structure similar to this example:

    ```
    cr  fr  variable  value
    1   1   baker1    7.5
    2   1   baker1    6.1
    1   1   baker2    4.2
    2   1   baker2    3.7
    1   2   baker3    3.8
    ...
    ```
    You'll need to identify which columns are `id_vars` (likely `cr` and `fr`) and which ones should be melted (the baker columns). The new column for baker identifiers could be named `variable` (as in the example) or something more descriptive like `baker_id`, and the new column for their scores would be `value`.

## Grouping Data with `groupby`

A common data operation is to split a DataFrame into groups based on some criteria and then apply a function (like sum, mean, count) to each group. Pandas provides the `groupby()` method for this powerful "split-apply-combine" pattern.

Let's use the classic Iris dataset as an example. We can group the flower samples by their `type`.

```python
# Ensure iris.data is available (e.g., in a subdirectory "./iris/")
# It typically has no header, and columns are:
# sepal_length, sepal_width, petal_length, petal_width, type
column_names = ["sepal_length", "sepal_width", "petal_length", "petal_width", "type"]
# irisdata = pd.read_csv(
#     "./iris/iris.data",
#     names=column_names,
#     header=None
# )
# print("Iris DataFrame (head):")
# print(irisdata.head())

# iris_group = irisdata.groupby("type")

# To see the size of each group (number of rows):
# print("\nSize of each group:")
# print(iris_group.size())

# To calculate the mean of all numeric columns for each group:
# print("\nMean values per group:")
# print(iris_group.mean())
```

!!! note "Understanding GroupBy Objects"
    Applying `groupby()` doesn't immediately create multiple new DataFrames. Instead, it creates a `DataFrameGroupBy` object. This object holds information about how the rows are allocated to different groups. You don't typically use this object directly for its grouping information but rather apply aggregation methods (like `sum()`, `mean()`, `count()`, `size()`, `min()`, `max()`, `std()`, `agg()`, `apply()`) to it. These methods operate on each group independently and then intelligently combine the results into a new Series or DataFrame.

Try out various aggregation methods that can be applied to a `GroupBy` object like `iris_group` (e.g., `median()`, `describe()`) and observe how they provide insights for each flower type.

## Other Useful DataFrame Methods

There are several other DataFrame methods that are essential for data cleaning and preparation. We won’t introduce these methods in detail here, but please read their documentation and practice using them:

*   `dropna()`: Removes missing values (NaN). You can specify how (any or all missing) and along which axis (rows or columns).
*   `drop_duplicates()`: Removes duplicate rows, optionally based on a subset of columns.
*   `reset_index()`: Resets the DataFrame index to a default integer index. Often, the old index is added as a new column.

## Practice Exercises

!!! question "Exercise: Course Enrollment Analysis"
    **Scenario:** We want to count how many people selected courses from different channels (e.g., online vs. onsite) and different class types using data from a `course_form.csv` file. We can rely on the `groupby()` method combined with an aggregation like `count()` or `size()`.

    **Explanation:** In this type of analysis, an aggregation function (like `count()` or `size()`) is applied to each group formed by `groupby()`. The groups effectively behave as if they were separate DataFrames for the aggregation step, and then the results are combined into a new Series or DataFrame.

    First, load the data (assuming `course_form.csv` is available):
    ```python
    # course_form = pd.read_csv("./course_form.csv")
    # print("Course Form Data (sample):")
    # print(course_form.head())
    ```

    To count enrollments based on `class` and `form` (assuming these are columns in your CSV):
    ```python
    # enrollment_counts = course_form.groupby(["class", "form"]).size()
    # The .size() method counts the number of rows in each group.
    # Alternatively, to count non-null values in a specific column per group:
    # enrollment_counts_specific_col = course_form.groupby(["class", "form"])['student_id'].count()

    # print("\nEnrollment counts by class and form:")
    # print(enrollment_counts)
    ```
    The original notes mentioned `course_form.groupby(["class","form"]).count()`. This would return the count of non-null values for *all other columns* for each group. Using `.size()` is often more direct for just getting group sizes.

!!! question "Exercise: Further Analysis Tasks"
    Now, please perform additional analyses based on the `course_form.csv` data or any other dataset provided. (The specific instructions for this exercise were incomplete in the original notes, so this is a placeholder for further tasks). For example, you could try to:

    1.  Using `course_form.csv`, calculate the average `score` (if such a column exists) for each combination of `class` and `form`.
    2.  Find the most popular `class` based on the total number of enrollments.
    3.  If the dataset contains timestamps, group by month and analyze trends.  

```
# Advanced Data Analysis Techniques

```python
course_form.groupby(["class","form"]).count()
```

## Practice Exercises

!!! question "Exercise 4: Exploring Animal Data with Pandas"
    1.  Read in the `animal.csv` data and find the fastest animal in each class using `.first()`.
    2.  Read in the `animal.csv` data and find the fastest *and the second fastest* animal in each class using `.nth()`.
    3.  Read in the `animal.csv` data and find the index of the fastest animal in each class using `.idxmax()`.
    4.  Read in the `animal.csv` data and get the `birdgroup` using the `get_group` method.
    5.  Read in the `race.csv` file, which contains information about a competition. The column `id` shows the athletes' ID, and the column `time` records their times for several tries. Find the average time for each athlete.

!!! question "Exercise 5: Reorganizing Class Score Data"
    Files `class1.xlsx` and `class2.csv` contain information on the average scores from two classes for both language and math. Please reorganize the information in the two tables so that we can compare the language scores and math scores.
    
    Specifically, create two DataFrames: one for the language scores of the two classes and one for the math scores of the two classes. Your new tables should resemble the following structures:

    **Language Scores DataFrame:**
    | Year | Class1 | Class2 |
    |------|--------|--------|
    | 2022 | ...    | ...    |
    | 2023 | ...    | ...    |
    | 2024 | ...    | ...    |

    **Math Scores DataFrame:**
    | Year | Class1 | Class2 |
    |------|--------|--------|
    | 2024 | ...    | ...    |

## Case Study I: GDP Data Analysis from stats.gov.cn

!!! info "Background: National Economic Data"
    The National Bureau of Statistics of China provides a wealth of information regarding the country’s economy, particularly macroeconomic balances. For instance, GDP data by province and by sector are readily available. While we have previously worked with consumption and income data, those datasets were pre-processed. Now, we will engage with the raw data.

!!! question "Exercise 6: Macroeconomic Data Aggregation and Analysis"
    For this exercise, you will need four files: `consumption.csv`, `cpi.csv`, `gpd.csv`, and `population.csv`.

    1.  Read in these datasets and perform necessary transformations to consolidate all information into a single DataFrame.
        !!! note "Important Tip"
            When adding new columns, ensure that the data alignment and order are correct.
    2.  Compute the total savings for each province in each year. Store the resulting DataFrame in a "long" format.
        !!! note "Format Consideration"
            While you could store this data in a "wide" format, doing so might complicate subsequent operations.
    3.  We know that the price of products changes every year, as indicated by the consumer price index (CPI). The file `cpi.csv` contains the price index relative to 2013 (in 2013 Yuan) over the years. Please adjust the total savings of each province by this price index. We call the adjusted savings “real savings.”
    4.  What’s the average real savings of each province across the years?
    5.  Which province saves the most on average?

## Case Study II: Analyzing Returns of Individual Stocks

!!! warning "Advanced Exercise"
    This exercise presents a higher level of difficulty!

The file `stock_utf.csv` contains daily information for 10 listed stocks on the Chinese stock market from 1990 to 2000. This dataset is a subsample of the entire market but serves as a practical example. It includes 75 variables (columns), though not all will be used.

!!! question "Exercise 7: Individual Stock Return Calculation"
    1.  Examine the dataset: What are the variables (column names)?
    2.  We focus on `PrevClPr` (Previous Closing Price) and `Clpr` (Closing Price). Please create a new DataFrame to only include relevant columns (e.g., stock identifier, date, `PrevClPr`, `Clpr`).
    3.  We have previously learned how to construct momentum using monthly return data. Now, create returns from the new DataFrame. It’s defined as:
        `Clpr / PrevClPr`
    4.  Please compute the cumulative return every 5 days for each stock.

## Case Study III: Calculating Market Return

The file `Chinese_market.csv` is used for this study.
!!! info "Data Characteristics"
    This file purportedly contains data for all Chinese listed firms. However, due to privacy concerns, significant noise has been intentionally added to the original data.

It includes the following columns:

*   `stkcd`: Stock code
*   `trdmnt`: Trading month
*   `mclsprc`: Closing price for the month
*   `msmvttl`: Total market value

Our objective is to compute the weighted (by total market value) average of closing price of all the firms in each month. This weighted average shows us how the stock market performs as a large portfolio.

## Case Study IV: Index Return Calculation

We use `Chinese_market.csv` again. This time, we have another data file, `FT50.xlsx`, which contains the composite of Financial Times 50 index.

# Example V: Portfolio Returns

## Introduction

We will now explore the computation of portfolio returns, which can be more complex than individual asset returns. This section builds upon concepts related to financial data analysis, potentially using data files such as `FT50.xlsx`, which contains information on the Financial Times 50 index composites.

The primary goal is to construct various stock portfolios based on specific criteria (like market capitalization) and then calculate their respective returns.

!!! question "Preliminary Exercise: Weighted Average for FT50 Subset"
    Using data from the `FT50.xlsx` file (specifically, focusing on FT50 composites related to the Chinese market, if applicable), please select a subset of these firms and compute the weighted average of their relevant financial metric (e.g., price or return, as appropriate to the context of "weighted average").  

## Portfolio Construction Methodology

To analyze portfolio returns, we first need to construct the portfolios. A common approach involves dividing the entire stock universe into several groups based on certain characteristics. Here, we will focus on market capitalization.

The general steps are:

1.  **Define the Stock Universe**: Start with a defined set of stocks (e.g., those listed in `FT50.xlsx`).
2.  **Select Ranking Criterion**: For our purposes, we will use the **log of the market value** of stocks. This is often done on a periodic basis (e.g., monthly).
3.  **Form Portfolios (Deciles)**:
    *   Rank all stocks according to the chosen criterion (log market value) for each period.
    *   Divide the ranked stocks into ten equal parts (deciles).
    *   The largest 10% of stocks (by log market value) are grouped together to form the first portfolio.
    *   The next group, comprising stocks from the 10th to 20th percentile, forms the second portfolio, and so on, until ten distinct portfolios are created.
4.  **Calculate Portfolio Returns**: Once portfolios are formed for a period, the return for each portfolio is typically calculated as the simple average of the returns of the constituent stocks within that portfolio for that period.

!!! note "What is a Portfolio?"
    In this context, a portfolio is simply a collection of stocks. The "portfolio return" refers to the collective performance of these stocks, often calculated as an average of their individual returns.

## Calculating Portfolio Returns: Step-by-Step

Let's break down the process into specific tasks.

### Gross Returns for Individual Stocks

Before calculating portfolio returns, you usually need the returns for each individual stock.

!!! question "Exercise: Calculate Monthly Gross Returns"
    For each stock available in your dataset (e.g., from `FT50.xlsx`), please find its gross return for each month.  

### Portfolio Construction Based on Market Value (Average Price Focus)

This exercise focuses on forming portfolios and calculating the average *price* of the stocks within them, which is a different metric than portfolio *return*.

!!! question "Exercise: Portfolios by Market Value (Average Price)"
    1. For each month, construct ten portfolios based on the **market value** of the stocks.
    2. For each of these ten portfolios, compute the simple average of the *price* of its constituent stocks.  

    !!! info "Focus on Price, Not Return"
        Note that this exercise asks for the average *price* of the stocks within each portfolio, not the average return. This can be useful for understanding the general price level of stocks in different market value segments.

### Portfolio Construction Based on Log Market Value (Average Return Focus)

This is the core task for calculating portfolio returns based on market capitalization deciles.

!!! question "Exercise: Portfolios by Log Market Value (Average Return)"
    1. For each month:
        a. Rank all stocks based on the **log of their market value**.
        b. Construct ten distinct portfolios by dividing the ranked stocks into deciles. (e.g., the top 10% of stocks by log market value form Portfolio 1, the next 10% form Portfolio 2, and so on).
    2. For each portfolio in each month:
        a. Compute the simple average of the *returns* of its constituent stocks. This will result in a monthly return series for each of the ten portfolios.  

### Analyzing Overall Portfolio Performance

Once you have the monthly return series for each portfolio, you can analyze their overall performance.

!!! question "Exercise: Calculate Average Portfolio Series Returns"
    Using the monthly return series you computed for each of the ten portfolios (from the previous exercise), please find the average return for each portfolio series over the entire observation period.  
    This will give you a single average return figure for Portfolio 1, Portfolio 2, ..., Portfolio 10.

