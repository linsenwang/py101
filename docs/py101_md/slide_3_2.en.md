# Chapter 3: NumPy and Pandas

!!! info "Learning Objectives"
    In this chapter, you will learn about:

    *   Data organization principles.
    *   The pandas library for data manipulation.
    *   Understanding pandas `DataFrame` as a 2D NumPy array with row and column information.
    *   Fetching (extracting) rows and columns from a `DataFrame`.
    *   Summarizing information within a table.
    *   Sorting data to prioritize rows.
    *   Using aggregation to identify common trends.
    *   Working with MultiIndexed `DataFrame`s.
    *   Utilizing the `loc` and `iloc` properties.
    *   Creating new columns in a `DataFrame`.

## Working with Data: An Introduction

Welcome! Having covered the basics of Python, we now embark on our journey into working with datasets. A dataset is a collection where data is stored. Since most datasets are presented in a tabular format, we often use the terms "datasets" and "data tables" interchangeably. The `pandas` module is a powerful Python library specifically designed for analyzing data tables.

Data tables are crucial carriers of information. However, this information isn't always self-evident; we need to analyze the data to uncover its underlying insights.

By examining a data table, you will learn to:

*   Understand its organization: what the rows and columns represent.
*   Apply basic manipulations to extract information.

These manipulations enable us to:

*   View data from different perspectives by altering the table's format.
*   Pinpoint specific characteristics or entries by locating them within the table.
*   Segment the data table into smaller groups and summarize information within each group.

## Data Organization Principles

In fields like economics, working with data is essential. Data allows us to:

*   Gain insights into how the economic world operates.
*   Verify economic theories.

Examples of such data include a country's GDP, a person's consumption details, or the price of an item. With advancements in computing power, economic datasets are growing significantly, often reaching several gigabytes or even terabytes in size.

In computing, data is typically stored in tables. A table is analogous to a 2D matrix, comprising rows (horizontal elements) and columns (vertical elements).

Key principles for organizing data in tables include:

*   **Each row represents an observational unit:** This could be an entity like a person, a country, etc.
*   **Each column exhibits a perspective or characteristic of the rows:** For example, a person's height or a country's GDP.
*   **The top row is often reserved for column names (header):** This row is descriptive and not part of the actual data content.
*   **The first column is often reserved for row indices (names):** Similar to the header, this is for identification and not part of the data content.

## Pandas Series: A Single Column

Pandas handles sequence data in a manner similar to NumPy, using a 1-D sequence. However, in pandas, this structure is called a **Series**.

!!! note "Key Characteristics of a Pandas Series"
    *   **Homogeneous Data Type:** All elements within a Series must be of the same data type.
    *   **Named Index:** A crucial distinction is that elements in a Series have names, referred to as the **index**. We can also say that the data points in a Series are "indexed."

## Pandas DataFrame: Processing Tables

The primary data structure in pandas for storing and manipulating tabular data is the **DataFrame**. Conceptually, a DataFrame is like a matrix but with added features for labeling:

*   **Index:** Contains the names (labels) for each row.
*   **Columns:** Contains the names (labels) for each column.

!!! note "Key Concept: DataFrame"
    A pandas `DataFrame` can be thought of as a 2D NumPy array enhanced with descriptive row indices and column names.

For example, let's create a DataFrame. In the output of the following code, the boldfaced numbers on the leftmost side (0 to 5) would be the index, and the boldfaced letters ('A' through 'D') on top would be the column names, as described in the original notes.

```python
import pandas as pd
import numpy as np

df1 = pd.DataFrame(
    np.random.randn(6, 4),  # Generates data from a standard normal distribution N(0,1)
    index=range(6),
    columns=list("ABCD")
)
# To see the DataFrame, you would typically print it or display it in an environment
# like Jupyter Notebook:
# print(df1)
```

### Accessing Rows and Columns

We can extract (or "look up") rows and columns from a DataFrame using their names or positions. However, the methods for indexing rows and columns differ.

**Example: Extracting a Row Slice and a Column**

```python
# Assuming df1 from the previous example
row1_slice = df1[0:1]  # Slicing rows by position; result is a DataFrame
col1 = df1['A']       # Selecting a column by name; result is a Series

# You can inspect these:
# print("Row slice (DataFrame):")
# print(row1_slice)
# print("\nColumn (Series):")
# print(col1)
```

!!! info "Understanding Slicing vs. Selection"
    When you slice rows like `df1[0:1]`, the result is still a `DataFrame`, even if it contains only one row.
    When you select a single column like `df1['A']`, the result is a `pandas.Series`.

Although they might appear similar in some outputs, rows (or row slices) and columns (as Series) are fundamentally different objects. You can verify their types:

```python
print(type(row1_slice))
print(type(col1))
```
The output for `type(col1)` will show `<class 'pandas.core.series.Series'>`, indicating that `col1` is a Series. A Series is a 1-D labeled array capable of holding data of any type, representing a single aspect (column) of a DataFrame. A pandas `DataFrame` can be seen as a collection of these Series objects, sharing a common index.

The DataFrame provides structured information. For instance, observe the data generated by `np.random.randn(6,4)` in `df1`.

!!! info "Data Types Observation"
    You might notice that even if a number looks like an integer (e.g., `1.0` if it appeared), its underlying data type in `df1` (created with `randn`) will be a float. This is because `np.random.randn` generates floating-point numbers.
    Understanding data types is crucial for accurate analysis and avoiding unexpected behavior.

We can get analytical information about each column using the `describe()` method and information about the storage data types with the `.dtypes` attribute.
```
# Processing a Single Table with Pandas

This chapter covers essential Pandas operations for processing and transforming data within a single DataFrame. We will explore how to inspect, sort, aggregate, reshape, and select data effectively.

## Initial DataFrame Exploration and Creation

Pandas DataFrames come with built-in methods for quick exploration. For instance, the `describe()` method provides descriptive statistics of the numerical columns, and the `dtypes` attribute shows the data type of each column.

Here's how you can create a simple DataFrame:

```python
import pandas as pd
import numpy as np

df2 = pd.DataFrame([[1, 2], [1.1, 2.1]], index=range(2), columns=['col1', 'col2'])

# Example usage of dtypes and describe:
# To see the data types:
# print(df2.dtypes)
# To get descriptive statistics:
# print(df2.describe())
```

## Modifying DataFrame Presentation

While the underlying data might not change, altering its presentation can help highlight specific aspects you are interested in.

### Sorting Data

One common way to highlight important information is by arranging it at the top of the table. This is achieved using the `sort_values()` method (for sorting by column values) or the `sort_index()` method (for sorting by the DataFrame's index).

Here's an example demonstrating sorting:

```python
race_score = pd.DataFrame([['Alice', 15.6], ['Bob', 17.3], ['Charlie', 14.5]])
# print("Original race_score:")
# print(race_score)

# Sort by the values in the second column (index 1) in ascending order
race_score_sorted_values = race_score.sort_values(by=1, ascending=True)
# print("\nSorted by values in column 1:")
# print(race_score_sorted_values)

# To demonstrate sort_index, we first assign a new, unsorted index to the original race_score
race_score.index = [1002, 1001, 1003]
# print("\nrace_score with new index:")
# print(race_score)

# Sort by the index
race_score_sorted_index = race_score.sort_index()
# print("\nSorted by index:")
# print(race_score_sorted_index)
```

!!! note "Sorting Methods"
    - `sort_values(by=column_label_or_index, ascending=True/False)`: Sorts the DataFrame by its values in one or more specified columns.
    - `sort_index(ascending=True/False)`: Sorts the DataFrame by its index labels.

### Aggregating Data

When you need a high-level overview of your data, summarization through aggregation is key. Instead of focusing on individual records, aggregation provides insights into the overall data characteristics using functions like mean, sum, count, etc. This is commonly done with the `agg()` method.

Here's an example of data aggregation:

```python
student_name = ['Alice', 'Bob', 'Charlie', 'David', 'Eva']
language_score = [99, 100, 35, 60, 71]
math_score = [25, 89, 36, 40, 91]

score = pd.DataFrame(
    np.array([language_score, math_score]).T,
    index=student_name,
    columns=['language', 'math']
)
# print("Original scores:")
# print(score)

# Calculate the mean score for each subject (aggregation along columns, axis=0)
mean_scores_per_subject = score.agg("mean", axis=0)
# print("\nMean scores per subject:")
# print(mean_scores_per_subject)

# Calculate the total score for each student (aggregation along rows, axis=1)
total_score_per_student = score.agg("sum", axis=1)
# print("\nTotal score per student:")
# print(total_score_per_student)
```

## Reading Data from Files

Pandas offers a straightforward way to read data from various file formats, with CSV files being one of the most common. The `pd.read_csv()` function is a versatile tool for this purpose.

```python
# Example: Reading the Iris dataset.
# Ensure the file path "./iris/iris.data" is correct relative to your working directory.
# irisdata = pd.read_csv("./iris/iris.data", header=None)
# print(irisdata.head())
```

!!! info "Using `pd.read_csv()`"
    `pd.read_csv()` can handle many options. For instance, `header=None` is used when the CSV file lacks a header row, prompting Pandas to assign default integer column names (0, 1, 2,...).

!!! question "In-class Exercise 1: Iris Data Preprocessing"
    1.  Read in the data from `"./iris/iris.data"` (assume it has no header row). Take a quick look at the data. What are the default column names?
    2.  Change the column names to: `"sepal_length"`, `"sepal_width"`, `"petal_length"`, `"petal_width"`, and `"type"`.
    3.  Remove the last column, `"type"`. (Hint: investigate the `drop()` method.)
    4.  Compute (aggregate) the mean and standard deviation for each of the first four numeric columns.
    5.  Create a new DataFrame called `"irisdata_normed"` by performing standardization on the first four columns: subtract the column's mean from each value in that column, and then divide by the column's standard deviation.
    6.  Check the mean and standard deviation of each column in `irisdata_normed`. What values do you expect for the mean and standard deviation after standardization?
    7.  Write the `irisdata_normed` DataFrame to a new CSV file named `iris_normalized.csv`. (Hint: use the `to_csv()` method, and consider the `index` parameter.)

## Reshaping Data Structures

Beyond changing how data *appears*, we can also change its *structure*. Swapping rows and columns is a powerful way to reorganize data for different analytical perspectives without altering the actual data values (unlike aggregation). This is often done using `stack()` and `unstack()` methods.

### Stacking and Unstacking DataFrames

**Multi-level Indexing**

A DataFrame's index uniquely identifies its rows. Sometimes, a single identifier isn't enough, and we need multiple levels of identification (a `MultiIndex`). For example, a student named "Alice" in "Class 1" of "Grade 1" is distinct from an "Alice" in "Class 2" of "Grade 3". A `MultiIndex` helps manage such hierarchical Naming.

Consider an example where we record height and weight for selected students from different grades and classes:

```python
arrays = [
    ["first", "first", "second", "second", "third", "third", "fourth", "fourth"],
    ["one", "two", "one", "two", "one", "two", "one", "two"],
]
height_weight = np.array([
    [173, 176, 185, 167, 165, 193, 156, 163],  # heights
    [130, 190, 180, 170, 170, 200, 100, 105]   # weights
]).T

# Create a MultiIndex from arrays
# For more details, see: https://pandas.pydata.org/docs/reference/api/pandas.MultiIndex.from_arrays.html
myindex = pd.MultiIndex.from_arrays(arrays, names=["grade", "class"])

student_info = pd.DataFrame(height_weight, index=myindex, columns=["height", "weight"])
# print("Original DataFrame (student_info):")
# print(student_info)

# Stack the DataFrame: moves columns to become the innermost index level
stacked_info = student_info.stack()
# print("\nStacked DataFrame (stacked_info):")
# print(stacked_info)

# Unstack the DataFrame: moves an index level (or levels) to become column headers
# Example: unstacking by levels [1,2] (0-indexed from the outermost index) from the stacked_info
# This will unstack 'class' (original index level 1) and the measurement type (original columns, now index level 2)
unstacked_info_example = stacked_info.unstack([1, 2])
# print("\nUnstacked DataFrame (from stacked_info, unstacking levels 1 and 2):")
# print(unstacked_info_example)

# A more common unstack operation might be to unstack the innermost level of the stacked DataFrame
# unstacked_from_stacked = stacked_info.unstack()
# print("\nUnstacked from stacked_info (default, unstacking innermost level):")
# print(unstacked_from_stacked)
```

!!! note "Understanding `stack()` and `unstack()`"
    - `stack()`: "Pivots" a level of the column labels to become the innermost level of a `MultiIndex` on the rows. This typically makes the DataFrame "taller" (more rows, fewer columns).
    - `unstack()`: "Pivots" a level of the row index to become a new level of column labels. This typically makes the DataFrame "wider" (fewer rows, more columns).

## Advanced Data Selection

While basic square bracket indexing (`[]`) can be used for simple selections, it has limitations:

*   It uses different mechanisms for row and column selection.
*   Selecting multiple, non-contiguous rows or columns can be awkward.
*   Slicing columns is not directly supported with single `[]`.
*   Complex, multi-step selections can be error-prone and may trigger `SettingWithCopyWarning`.

For robust and clear data selection, Pandas provides the `.loc[]` (label-based) and `.iloc[]` (integer position-based) accessors.

### Precise Selection with .loc and .iloc

These accessors offer a more explicit and powerful way to select data.

**Examples using `.loc` and `.iloc` with the `student_info` DataFrame:**

```python
# Assuming student_info DataFrame from the previous section is available
# print("Original student_info DataFrame:")
# print(student_info)

# Using .loc to select by label:
# Get the 'height' of the student in 'second' grade, 'one' class
height_second_one = student_info.loc[('second', 'one'), 'height']
# print(f"\nHeight of student ('second', 'one') using .loc: {height_second_one}")

# Using .iloc to select by integer position:
# The student ('second', 'one') is at row index 2 (0-indexed). 'height' is column index 0.
height_iloc_example = student_info.iloc[2, 0]
# print(f"Height using .iloc[2, 0]: {height_iloc_example}")

# Advanced selection with .loc using a callable (lambda function):
# Select all data for students with height greater than 160 and less than 180
selected_students = student_info.loc[lambda df: (df['height'] > 160) & (df['height'] < 180), :]
# print("\nStudents with height > 160 and < 180 (exclusive of 180):")
# print(selected_students)
```

!!! info "Choosing Between `.loc` and `.iloc`"
    - Use `.loc[]` when you want to select data based on index labels or column names. It accepts boolean arrays for filtering rows. Slices are inclusive of the end label.
    - Use `.iloc[]` when you want to select data based on integer positions (like Python list slicing). Slices are exclusive of the end position.
    Both methods support selecting single values, rows, columns, slices, and lists of labels/positions.

## Applied Data Analysis Exercises

### Example: Income Data

!!! question "In-class Exercise 2: Income and Consumption Analysis"
    1.  You are given two files: `income.csv` and `consumption.csv`. These files contain per capita income and per capita consumption data by province, respectively, along with population figures.
    2.  For each dataset, create new columns to calculate the total income and total consumption for each province in each year. Save these modified DataFrames to new files (e.g., `income_total.csv` and `consumption_total.csv`). Consider the units of these new columns (e.g., if per capita income is in USD, total income will also be in USD).
    3.  How would you compute the savings ratio for each province and year? (Savings are defined as the portion of income not used for consumption: Savings = Income - Consumption. The savings ratio is typically Savings / Income).

### Example: Production Function Data

!!! question "In-class Exercise 3: Production Function Analysis (Details to Follow)"
    Another common application of data analysis involves studying production functions.
    *(Further instructions for this exercise, detailing the dataset and specific analytical tasks, would typically be provided here.)*
# Advanced Data Operations in AI Programming

This section covers several exercises focused on common data manipulation and analysis tasks encountered in AI programming, particularly with economic and financial datasets. These include handling time-series data, aligning inputs, calculating derived metrics, and performing aggregations.

## Analyzing Production Function Data

### Understanding Input-Output Alignment

In economic analysis, particularly when examining production functions, it's crucial to ensure that inputs and outputs are correctly aligned in time. A common representation of the Cobb-Douglas production function is:

Y<sub>t</sub> = A<sub>t</sub>K<sub>t</sub><sup>&alpha;</sup>L<sub>t</sub><sup>1-&alpha;</sup>

Where:
-   Y<sub>t</sub> is the output at time t
-   A<sub>t</sub> is the total factor productivity at time t
-   K<sub>t</sub> is the capital input at time t
-   L<sub>t</sub> is the labor input at time t
-   &alpha; is the output elasticity of capital

A common issue, known as a lead/lag problem, arises from financial reporting standards. Firms typically disclose financial statements at the end of a fiscal year. This means:
-   Output (Y<sub>t</sub>) often represents total output *over* the year.
-   Labor (L<sub>t</sub>) might be the number of employees at the *end* of the year.
-   Capital (K<sub>t</sub>) is also typically reported as the stock at the *end* of the year.

This creates a misalignment: end-of-period capital stock (K<sub>t</sub>) is used to model output (Y<sub>t</sub>) generated throughout period t. Ideally, the capital used for production during period t would be the capital available at the *beginning* of period t (i.e., K<sub>t-1</sub>) or an average measure.

!!! info "Aligning Inputs with `shift`"
    To address this misalignment, we often use a `shift` operation on the data. For capital, this means using the previous period's capital (K<sub>t-1</sub>) as the input for the current period's output (Y<sub>t</sub>). For labor, since its contribution can be continuous and we may not be sure which specific measure is most accurate, an average of the current year's and the previous year's labor figures (`(L<sub>t</sub> + L<sub>t-1</sub>)/2`) is often a more robust measure.

!!! question "Exercise: Production Function Analysis"
    The file `cdprod.xlsx` contains capital, labor, and output information collected from a hypothetical capital-intensive firm from 2000 to 2021. Note that the output for the year 2000 is missing.  

    1.  Write a Python function to find the return-to-scale on capital (&alpha;) **without** correcting for the time alignment of inputs.
        !!! hint
            You can write a `for` loop to iterate through possible values of &alpha; and find the one that produces output closest to the observed output.  
    2.  Correctly align the capital and labor inputs as discussed (use lagged capital, K<sub>t-1</sub>, and average labor, (L<sub>t</sub> + L<sub>t-1</sub>)/2). Then, redo step 1 to find &alpha; with the aligned data.  

## Exploring Financial Time Series: Momentum

### The Concept of Momentum in Asset Pricing

In asset pricing theory, "momentum" is an important concept. It describes the empirical tendency for assets that have performed well in the recent past to continue performing well, and conversely, for assets that have performed poorly to continue performing poorly. This phenomenon provides clues about future stock returns based on past return information.

By definition for this exercise, momentum (m<sub>t</sub>) at time t is calculated as:

m<sub>t</sub> = &Pi;<sub>j=2 to 12</sub> r<sub>t-j</sub>

Where r<sub>t</sub> is the return at time t. This specific formula calculates the product of returns over an 11-month period, specifically from month t-2 to month t-12 (effectively skipping the most recent month, t-1).

!!! note "Interpreting the Momentum Formula"
    The formula m<sub>t</sub> = &Pi;<sub>j=2 to 12</sub> r<sub>t-j</sub> involves multiplying simple returns. It's important to be aware of how returns (r<sub>t</sub>) are defined in your dataset (e.g., simple returns `(P_t/P_{t-1}) - 1` or log returns `ln(P_t/P_{t-1})`). While other definitions of momentum exist, for this exercise, please adhere strictly to the formula provided.

!!! question "Exercise: Calculating Stock Momentum"

    1.  The file `return1.csv` contains information about the returns of one firm. Please compute its momentum (m<sub>t</sub>) for all periods where data are available, using the formula defined above.
        !!! hint
            The `rolling()` method in pandas can be very useful for calculations over a moving window. You might need to combine it with a custom function using `.apply()` to compute the product over the window.  

    2.  The file `return4.csv` contains return information for four different firms.
        1.  Examine the data. Calculate the cross-sectional average return for each time period (i.e., the average return of the four firms at each point in time). Then, calculate the time-series average of these cross-sectional average returns.
        2.  Read in the data. Check if any data cleaning or transformation steps are necessary before analysis (e.g., handling missing values, reshaping data if needed).
        3.  Compute the momentum (m<sub>t</sub>) for each of the four firms for all periods where data are available, using the same formula.  

## Analyzing Cross-Sectional and Grouped Data

### Aggregating Economic Data: GDP by Sector and Country

Economic datasets often have multiple dimensions, such as time, geographical region (e.g., country), and economic sector. Aggregation is a common and essential task to summarize this data and derive meaningful insights. For example, we might want to understand the average Gross Domestic Product (GDP) for each country across all its sectors, or the average GDP for each economic sector across multiple countries.

!!! question "Exercise: Sectoral GDP Analysis"
    The file `country_sector.xlsx` contains sector-level Gross Domestic Product (GDP) data for four countries.  

    1.  Calculate the average GDP per country (i.e., for each country, find the average of its GDP across all listed sectors).
    2.  Calculate the average GDP per sector (i.e., for each sector, find the average of its GDP across all four countries).  

