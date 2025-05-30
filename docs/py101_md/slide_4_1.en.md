# Chapter 4: Matplotlib
This chapter introduces Matplotlib, a powerful Python library for creating static, animated, and interactive visualizations.

## What You Will Learn
*   How to make quick plots in Python using Matplotlib.
*   How to customize the aesthetic styles of your plots.
*   The fundamental way Matplotlib manages picture components:
    *   Figures as the overall canvas.
    *   Axes as individual plotting areas within a Figure.

## A First Glance at Figures in Python

We've previously discussed how to install Python modules. To get started with Matplotlib, you'll first need to install it (e.g., `pip install matplotlib`). Then, we can import it, typically its `pyplot` interface, along with NumPy for numerical operations and pandas for data manipulation.

```python
import matplotlib.pyplot as plt
import numpy as np
import matplotlib as mpl
import pandas as pd # Used in a later example
```

Let's draw our first line. Drawing continuous lines or curves on a computer often involves plotting a series of closely spaced points. This is analogous to how, in physics, perfectly continuous phenomena are often modeled or measured discretely.

We'll generate data for a cosine curve and plot it:

```python
x = np.linspace(0, 10, 100) # Generate 100 points from 0 to 10
sinx = np.sin(x)            # Calculate sin(x) for these points
cosx = np.cos(x)            # Calculate cos(x) for these points

plt.plot(x, cosx)
plt.show() # Display the plot
```

Matplotlib has a very natural integration with pandas. A pandas DataFrame can be directly used as a data source for plotting.

Let's load the Iris dataset and try a simple plot using column names:

```python
# Ensure the iris.data file is in a subdirectory named "iris" or provide the correct path.
# irisdata = pd.read_csv("iris/iris.data", header=None)
# For demonstration purposes, let's create a sample DataFrame if the file is not available
data_dict = {
    "sw": np.random.rand(50) * 2 + 5, # Sample sepal width
    "sl": np.random.rand(50) * 3 + 4, # Sample sepal length
    "pw": np.random.rand(50) * 1.5 + 1, # Sample petal width
    "pl": np.random.rand(50) * 2.5 + 0.5, # Sample petal length
    "type": ['Setosa'] * 25 + ['Versicolor'] * 25 # Sample types
}
irisdata = pd.DataFrame(data_dict)
# If using the actual iris.data file, use these lines:
# irisdata = pd.read_csv("iris/iris.data", header=None)
# irisdata.columns = ["sw", "sl", "pw", "pl", "type"]


plt.plot("sw", "sl", data=irisdata)
plt.xlabel("Sepal Width (sw)") # Adding labels for clarity
plt.ylabel("Sepal Length (sl)")
plt.title("Sepal Width vs. Sepal Length (Iris Data)")
plt.show()
```

!!! question "Exercise: Understanding a Messy Plot"
    The code above, when plotting directly from the unsorted Iris dataset (especially if you plot `pl` vs `pw` for all species), might create a messy, tangled line.  
    Why does this happen? Can you modify the plotting command or the data (e.g., by sorting or filtering, as learned in the pandas chapter) to create a more meaningful visualization, perhaps by plotting for a single species or sorting the values?  

## Modifying Line Attributes

The default lines we've drawn might seem basic. Matplotlib offers many ways to add aesthetic elements to make plots more informative and visually appealing. When drawing a line with `plt.plot()`, several attributes are commonly used:

*   **`marker`**: The style of the marker for each data point (e.g., 'o' for circle, 's' for square, '>' for triangle right).
*   **`linestyle`**: The style of the line (e.g., '-' for solid, '--' for dashed, ':' for dotted).
*   **`linewidth`**: The thickness of the line.
*   **`color`**: The color of the line and/or markers (e.g., 'g' for green, 'b' for blue, 'r' for red, or hex codes).

!!! info "Plot Customization Options"
    For a comprehensive list of `plt.plot()` attributes and their possible values, refer to the official Matplotlib documentation:
    [matplotlib.pyplot.plot](https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.plot.html)

Let's apply some of these attributes to our sine wave plot:

```python
# Assuming x and sinx are defined as before:
# x = np.linspace(0, 10, 100)
# sinx = np.sin(x)

plt.plot(x, sinx,
         marker='>', 
         linestyle='--', 
         linewidth=2, 
         color='g')
plt.title("Customized Sine Wave Plot")
plt.xlabel("x")
plt.ylabel("sin(x)")
plt.show()
```

In interactive environments like Jupyter Notebooks or VS Code's Python Interactive window, you can execute multiple `plt.plot()` commands in the same cell to overlay lines on the same Axes.

```python
# Assuming x, sinx, and cosx are defined

plt.plot(x, sinx, 
         marker='>', 
         markersize=5, # Controls the size of the marker
         color='g')
plt.plot(x, cosx, 
         marker='d',  # Diamond marker
         markersize=5, 
         linestyle=':', 
         linewidth=1, 
         color='c')  # Cyan color
plt.title("Sine and Cosine Waves")
plt.xlabel("x")
plt.ylabel("y")
plt.show()
```

When multiple lines are present on a plot, it's crucial to provide a legend to explain what each line represents. You can add a `label` to each `plot` command and then call `plt.legend()`.

```python
# Assuming x, sinx, and cosx are defined

plt.plot(x, sinx, label='sin(x)', marker='>', markersize=5, color='g')
plt.plot(x, cosx, label='cos(x)', marker='d', markersize=5, linestyle=':', linewidth=1, color='c')
plt.legend() # Displays the legend

plt.title("Sine and Cosine Waves with Legend")
plt.xlabel("x")
plt.ylabel("y")
plt.show()
```

Finally, after creating a plot, you might want to save it to a file. This can be done using `plt.savefig()`.

```python
# Assuming the previous plot (sin and cos with legend) is the current active plot

# Re-generate plot for clarity if running this cell independently
plt.plot(x, sinx, label='sin(x)', marker='>', markersize=5, color='g')
plt.plot(x, cosx, label='cos(x)', marker='d', markersize=5, linestyle=':', linewidth=1, color='c')
plt.title("Sine and Cosine Waves with Legend")
plt.xlabel("x")
plt.ylabel("y")

plt.legend() 
plt.savefig('sin_and_cos.png') # Saves the current figure to a PNG file
# You can also save in other formats like PDF, SVG, etc.
# plt.savefig('sin_and_cos.pdf')

# plt.show() # Still useful to display it after saving, if desired
```

!!! note "Saving Figures"
    `plt.savefig()` should typically be called before `plt.show()`. In some backends, `plt.show()` might clear the figure, making subsequent `savefig()` calls produce an empty image.

## Understanding Figure and Axes Organization

Matplotlib organizes pictures using a hierarchy of **Figures** and **Axes**.

*   A **Figure** (`fig`) is the outermost container, like a canvas. It holds all plotting elements (Axes, titles, legends, etc.). You can think of it as the entire window or page on which everything is drawn.
*   An **Axes** (`ax`) is an area within a Figure where the actual plot is drawn (lines, curves, labels, ticks, etc.). A single Figure can contain one or more Axes.

!!! quote "Matplotlib's Layout Terminology"
    The official Matplotlib documentation describes these components: "The Figure is the overall window or page that everything is drawn on... The Axes is the area on which the data is plotted (with functions like `plot()`) and any labels/ticks associated with it."
    For a detailed explanation, refer to:
    [Matplotlib Quick Start Guide - Parts of a Figure](https://matplotlib.org/stable/users/explain/quick_start.html#parts-of-a-figure)

Most plotting commands in `matplotlib.pyplot` implicitly operate on the "current" Figure and "current" Axes.

### Implicit Axes Creation with `subplot`

One common way to create and arrange Axes is by dividing the Figure into a grid using `plt.subplot()`. This function creates (or activates) an Axes object at a specified grid location.

The syntax is `plt.subplot(number_of_rows, number_of_columns, index_of_this_plot)`. The index starts from 1.

```python
# Assuming x and sinx are defined

plt.subplot(2, 1, 1) # (2 rows, 1 column, 1st subplot)
plt.plot(x, sinx)
plt.title('sin(x) - Subplot 1')

# plt.subplot(2, 1, 2) # (2 rows, 1 column, 2nd subplot)
# plt.plot(x, cosx, color='r')
# plt.title('cos(x) - Subplot 2')

plt.tight_layout() # Adjusts subplot params for a tight layout
plt.show()
```

!!! question "Exercise: Adding Another Subplot"
    Modify the code above to activate the second subplot position (`plt.subplot(2, 1, 2)`). In this second Axes, plot the cosine curve (`cosx`). Add a title to this second subplot as well.  

!!! question "Exercise: Plotting Circles"
    Please read all questions before you begin plotting.  
    For these exercises, you'll need to generate `x` and `y` coordinates for parts of a circle. Remember that for a unit circle, `x = cos(theta)` and `y = sin(theta)`. You'll need to choose appropriate ranges for `theta` (in radians).  
      
    1.  Draw a plot of a quarter of a unit circle in the first quadrant (x >= 0, y >= 0).  
    2.  Draw a plot of a half unit circle where y >= 0 (upper half).  
    3.  Draw a plot of a full unit circle.  
      
    *Hint: `np.pi` can be used for π. For a quarter circle in the first quadrant, theta might range from 0 to π/2.*  

### Explicit Figure and Axes Creation

While `plt.subplot()` is convenient for creating regular grid layouts, you gain more control by manually creating a Figure object and then adding Axes objects to it. This is often referred to as the "object-oriented" approach in Matplotlib.

*   `fig = plt.figure()`: Creates a new Figure. [Documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.figure.html)
*   `ax = plt.axes()`: Adds an Axes to the current Figure by default, filling the Figure. If no Figure exists, it creates one. This is a simple way to get an Axes. A more explicit way when you have a `fig` object is `ax = fig.add_axes([left, bottom, width, height])` or `ax = fig.add_subplot(1, 1, 1)`. [Documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.axes.html)

Let's create a Figure and an Axes explicitly:

```python
fig = plt.figure() # Create a new Figure
ax = plt.axes()    # Add an Axes to the Figure; it fills the Figure by default

# Let's use a slightly different x range for this example to distinguish
x_plot = np.linspace(0, 10, 1000) # 1000 points for a smoother curve
sinx_plot = np.sin(x_plot)

ax.plot(x_plot, sinx_plot)
ax.set_title("Plot on an Explicitly Created Axes")
ax.set_xlabel("x")
ax.set_ylabel("sin(x)")

# The following line can be useful for understanding object identity in Matplotlib:
# print(f"ID of ax: {id(ax)}, ID of fig.axes[0]: {id(fig.axes[0])}, ID of plt.gca(): {id(plt.gca())}")

plt.show()
```

!!! note "Object Identity and `gca()`"
    The commented-out `print` statement in the code above helps illustrate how Matplotlib manages Axes objects:
    *   `ax`: Refers to the Axes object we explicitly created and assigned to the variable `ax`.
    *   `fig.axes[0]`: Accesses the first Axes object in the list of Axes associated with our `fig` object.
    *   `plt.gca()`: A `pyplot` function that "gets current Axes."
    In the scenario above, `ax`, `fig.axes[0]`, and the Axes returned by `plt.gca()` (after `ax` was created and made current) should all refer to the same Axes object in memory, thus having the same ID.

!!! question "Exercise: Creating Multiple Axes and Checking IDs"
    1. Create a Figure object.  
    2. Use `fig.add_subplot(1, 2, 1)` to create a first Axes object. Store it in a variable `ax1`.  
    3. Use `fig.add_subplot(1, 2, 2)` to create a second Axes object. Store it in a variable `ax2`.  
    4. Print the IDs of `ax1`, `ax2`, and `fig.axes[0]`, `fig.axes[1]`.  
    5. Plot something simple on `ax1` (e.g., `ax1.plot(np.random.rand(10))`).  
    6. Then, call `plt.gca()` and print its ID. Which Axes is currently active?  
    7. Plot something on `ax2`. Call `plt.gca()` again and print its ID.  

!!! question "Exercise: Exploring an Empty Figure"
    1. Create an empty Figure using `fig = plt.figure()`.  
    2. Display it using `plt.show()`. What does it look like?  
    3. Try to call `plt.plot([1, 2, 3], [4, 5, 6])` *after* creating the empty figure but *before* explicitly adding any Axes. What happens? Does Matplotlib create an Axes for you automatically in this case?  
```
# Working with Matplotlib Figures and Axes

## Organization of a Picture in Matplotlib

Understanding how Matplotlib organizes figures and axes is crucial for creating and customizing plots effectively. A `Figure` can be thought of as the overall window or page that everything is drawn on, and it can contain one or more `Axes` objects. An `Axes` is the actual plot—the area where data is plotted with x-axis, y-axis, etc.

### Implicit Figure and Axis Creation

When Python is asked to create an `Axes` object (e.g., by a high-level plotting command like `plt.plot()`), it will first implicitly create a `Figure` object if one doesn't already exist or isn't specified. The `Axes` is then placed within this `Figure`.

You can inspect the identities of these objects to see their relationships:

```python
import matplotlib.pyplot as plt
import numpy as np # Added for completeness if running standalone

# Example: Create a simple plot, which implicitly creates a Figure and Axes
plt.plot([1, 2, 3], [4, 5, 6])

# Get the current Axes and its Figure
ax = plt.gca()  # Get Current Axes
fig_of_ax = ax.get_figure()

# Get the current Figure directly
current_fig = plt.gcf() # Get Current Figure

print(f"ID of current Axes' Figure: {id(fig_of_ax)}")
print(f"ID of current Figure (gcf): {id(current_fig)}")

# If you had an explicit figure object, e.g., fig_explicit, ax_explicit = plt.subplots()
# print(f"ID of explicit Figure: {id(fig_explicit)}")
# print(f"ID of explicit Axes' Figure: {id(ax_explicit.get_figure())}")
```

!!! warning "Notebook vs. Script Execution"
    Be aware that Matplotlib behaves differently when used in interactive environments like Jupyter notebooks compared to standalone Python scripts. Notebooks often handle figure display implicitly after a cell execution, while scripts typically require an explicit `plt.show()` command to open the plot window.

To get a reference to the current figure at any time, you can use `plt.gcf()` (Get Current Figure). Similarly, `plt.gca()` gets the current axes.

```python
# Get current figure after some plotting has occurred
fig = plt.gcf()
print(f"ID of current Figure (obtained via plt.gcf()): {id(fig)}")
```

!!! question "In-class Exercise: Plot Output"
    Consider where Matplotlib plots are displayed:  
    1. Where does the output of a Matplotlib plot typically appear when you run code in a Python script versus a Jupyter Notebook?  
    2. What command is typically necessary to make a plot visible when running a Python script?  
    

### Best Practices for Plotting in Matplotlib

For clarity, control, and reproducibility, especially in complex visualizations or notebook environments:

!!! note "Key Plotting Strategies"
    *   **Isolate Plotting Logic:** Group all code for generating and customizing a single figure within one code cell (in notebooks) or a dedicated function (in scripts). This improves organization.
    *   **Explicit Creation:** Prefer explicitly creating `Figure` and `Axes` objects using `fig, ax = plt.subplots()`. This provides direct handles (`fig` and `ax`) for manipulation, leading to more readable and maintainable code.
    *   **Manage Figure References:** If you intend to modify a figure created earlier (e.g., in a previous notebook cell or by another function), ensure you maintain and use a reference to its `Figure` object (or `Axes` object).

### Example: Dynamically Modifying a Figure

This example demonstrates how to create an initial plot and then add more data to the same figure and axes. This is common when building up a plot step-by-step or updating it with new information.

```python
import matplotlib.pyplot as plt
import numpy as np

# Data for the plots
x1 = np.arange(1, 3)
y1 = x1
x2 = np.arange(3, 11)
y2 = x2
x3 = np.arange(11, 21)
y3 = x3

# Create the initial plot.
# The command `plt.scatter` acts on the "current axes."
# If no figure or axes exist, Matplotlib implicitly creates them.
plt.scatter(x1, y1, linewidth=5, label='Dataset 1')

# Get handles to the current figure and axes for further modifications.
# This is useful if you want to ensure subsequent plots go onto this specific figure/axes.
fig = plt.gcf()  # Get Current Figure
ax = plt.gca()   # Get Current Axes

# Add the second dataset to the existing (current) axes
# Using ax.scatter() ensures plotting on this specific Axes object.
ax.scatter(x2, y2, color='r', linewidth=5, label='Dataset 2')

# Add the third dataset to the same existing axes
ax.scatter(x3, y3, color='g', linewidth=5, label='Dataset 3')

# Add a legend to identify the datasets
ax.legend()

# Display the plot (behavior might vary by environment; plt.show() is explicit)
plt.show()
```

!!! info "Pyplot vs. Axes Methods"
    The original notes mentioned comments like `# create an ax< ->fig<->gcf()` and that `plt.scatter(...)` is similar to `# <->ax.scatter <->gca().scatter`.
    This highlights that high-level `plt` functions (like `plt.scatter`) often operate on the "current" figure and axes, which can be accessed via `plt.gcf()` and `plt.gca()`. For more control, especially with multiple subplots or complex figures, using methods directly on an `Axes` object (`ax.scatter()`) is generally preferred over `plt.scatter()`.

### Modifying Axes Attributes

Once you have an `Axes` object (e.g., `ax` from the example above, or if you had `ax = some_figure.gca()`), you can modify its properties such as axis limits, labels, and titles.

```python
# Continuing with 'ax' from the previous example:
ax.set(xlim=(-1, 22),       # Set x-axis limits
       ylim=(-1, 22),       # Set y-axis limits
       xlabel="X-axis",     # Set x-axis label
       ylabel="Y-axis",     # Set y-axis label
       title="A Sine Curve" # Set the title for the axes (as per original notes)
       # Note: The original comment #ｐｌｔ．ｘｌｉｍ refers to plt.xlim functionality
      )

# Re-display the figure to see changes if not automatically updated
# In many environments, modifying 'ax' will update the figure if it's already shown.
# If not, or to be explicit:
plt.show() # Or display(fig) if working with the figure object directly in a notebook
```
!!! quote "Title Note"
    The title "A Sine Curve" is used as specified in the original lecture notes. For the scatter plot data shown in the example, a title like "Multiple Datasets Scatter Plot" might be more descriptive.

!!! info "Matplotlib Figure Anatomy"
    To understand all the components that make up a Matplotlib plot (like Figure, Axes, Axis, Ticks, Spines, Labels, etc.), the official Matplotlib documentation provides an excellent visual guide:
    [Anatomy of a Figure](https://matplotlib.org/stable/gallery/showcase/anatomy.html)
```
