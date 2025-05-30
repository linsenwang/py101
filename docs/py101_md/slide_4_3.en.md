# Chapter 4: Matplotlib

This chapter delves into various advanced plotting techniques using Matplotlib, often complemented by Seaborn, to create insightful data visualizations. We will explore how to generate scatter plots, histograms, and pair plots, which are essential tools in an AI programmer's toolkit for data analysis and presentation.

## Scatter Plots

Scatter plots are fundamental for visualizing the relationship between two numerical variables. They can also effectively represent additional dimensions of data through variations in point size, color, and transparency.

The following example demonstrates creating a scatter plot using the Iris dataset. Here, sepal length and sepal width are plotted, while petal width influences point size and species determines color.

```python
from sklearn.datasets import load_iris
import matplotlib.pyplot as plt

# Load the Iris dataset
iris = load_iris()
features = iris.data.T  # Transpose to get features as rows

# Print the shape of the features array (optional, for verification)
print(features.shape)

# Create the scatter plot
plt.scatter(features[0], features[1],
            alpha=0.2,
            s=100 * features[3],  # Point size based on the fourth feature (petal width)
            c=iris.target,        # Color based on species
            cmap='viridis')       # Colormap for species

# Set axis labels using feature names
plt.xlabel(iris.feature_names[0])  # Sepal length
plt.ylabel(iris.feature_names[1])  # Sepal width
plt.title("Iris Dataset: Sepal Length vs. Sepal Width") # Added a title for clarity
plt.show()
```

!!! note "Scatter Plot Customization"
    Key parameters used in this scatter plot include:
    - `alpha`: Adjusts the transparency of points, useful for overlapping data.
    - `s`: Defines the marker size. Here, it's scaled by the fourth feature of the Iris dataset.
    - `c`: Assigns colors to markers, often based on a categorical variable like `iris.target`.
    - `cmap`: Specifies the colormap to use when `c` is an array of numerical values representing categories.

## Histograms

Histograms are used to visualize the distribution of a single numerical variable. They work by dividing the data range into a series of intervals (bins) and then counting how many values fall into each bin.

This example shows how to plot a histogram for the 'Fe' (Iron) content in a hypothetical 'glass' dataset.

```python
import matplotlib.pyplot as plt
import pandas as pd # Assuming 'glass' might be a Pandas DataFrame

# Note: The 'glass' DataFrame is assumed to be pre-loaded.
# For example:
# data = {'Fe': [0.1, 0.15, 0.12, 0.2, 0.25, 0.18, 0.22, 0.1, 0.13, 0.17, 0.21]}
# glass = pd.DataFrame(data)

# Plotting the histogram for the 'Fe' column
plt.hist(glass["Fe"], bins=30,
         alpha=0.5,
         histtype='stepfilled',
         color='steelblue',
         edgecolor='none')

plt.xlabel("Iron (Fe) Content")
plt.ylabel("Frequency")
plt.title("Distribution of Iron Content")
plt.show()
```

!!! info "Understanding Histogram Parameters"
    - `bins`: The number of equal-width intervals or bins.
    - `alpha`: The transparency level of the histogram bars.
    - `histtype`: The type of histogram to draw (e.g., 'bar', 'barstacked', 'step', 'stepfilled').
    - `color`: The color of the histogram bars.
    - `edgecolor`: The color of the edges of the bars. Setting to `'none'` can give a cleaner look for `stepfilled` type.

## Pair Plots

Pair plots, often generated using the Seaborn library, are a powerful tool for exploring relationships between multiple variables in a dataset simultaneously. They create a matrix of plots, where off-diagonal plots are scatter plots between pairs of variables, and diagonal plots typically show the univariate distribution (histogram or density plot) of each variable.

Here's how to create a pair plot for the Iris dataset using Seaborn:

```python
import seaborn as sns
import matplotlib.pyplot as plt

# Load the Iris dataset using Seaborn
iris_df = sns.load_dataset("iris")

# Display the first few rows of the dataset (optional, for inspection)
print(iris_df.head())

# Create the pair plot
# 'hue' colors data points by the 'species' column
# 'height' (formerly 'size') controls the size of each facet
sns.pairplot(iris_df, hue='species', height=2.5)
plt.suptitle("Pair Plot of Iris Dataset Features by Species", y=1.02) # Add a main title
plt.show()
```

!!! quote "Insight from Pair Plots"
    Pair plots offer a comprehensive overview of pairwise relationships and individual variable distributions. They are particularly useful in the initial stages of exploratory data analysis (EDA) to quickly spot correlations, clusters, and potential patterns within the data. The `hue` parameter is especially valuable for observing how relationships differ across various categories.
