# Chapter 4: Matplotlib

This chapter delves into Matplotlib, focusing on how to manage multiple plots within a single figure and build complex visualizations. We'll explore various techniques, culminating in a comprehensive example.

## Multiple Axes in One Figure

We've previously learned how Matplotlib handles figures and plots. Now, it's time to take more direct control over the layout and management of multiple axes within a single figure.

Recall that for a quick plot, we might have used `plt.subplot()`. Matplotlib also offers `plt.subplots()` (note the plural 's'), which is a more powerful and commonly used function for creating figures with multiple subplots.

!!! question "Exercise 4.4.1: Understanding `plt.subplot` Return Value"
    What did `plt.subplot` return?  
    (Hint: Consider its typical usage and the object it provides for plotting.)

A simple call to the `plt.subplots()` function returns two objects: a `Figure` object and an `Axes` object (or an array of `Axes` objects). Since plotting commands are methods of an `Axes` object, we use it to draw on the canvas.

```python
# Assuming 'plt' (matplotlib.pyplot) and 'np' (numpy) are already imported
# import matplotlib.pyplot as plt
# import numpy as np

fig, ax = plt.subplots()
x = np.linspace(0, 10, 1000)
sinx = np.sin(x)
cosx = np.cos(x)
expx = np.exp(x)
tanhx = np.tanh(x)

ax.plot(x, sinx)
# To display the plot, you would typically use plt.show() at the end of your script
# or the figure would render automatically in a Jupyter notebook.
```

### Arranging Multiple Subplots

While `plt.subplots()` can create a single figure and axis, its real power shines when creating a grid of subplots. You can specify the number of rows and columns:

```python
fig, axs = plt.subplots(2, 2) # Creates a 2x2 grid of subplots
```

!!! question "Exercise 4.4.2: Investigating `axs`"
    What is `axs` in the code `fig, axs = plt.subplots(2, 2)`? How would you investigate its type and structure in Python?  

With multiple axes, we can precisely control where each plot is drawn. The `axs` object returned by `plt.subplots(nrows, ncols)` is typically a NumPy array of `Axes` objects. We can unpack this array to assign individual axes to variables:

```python
fig, ((ax1, ax2), (ax3, ax4)) = plt.subplots(2, 2)

# Assuming x, sinx, cosx, expx, tanhx are defined as in the previous example
ax1.plot(x, sinx)
ax1.set_title('sin(x)')

ax2.plot(x, cosx)
ax2.set_title('cos(x)')

ax3.plot(x, expx)
ax3.set_title('exp(x)')

ax4.plot(x, tanhx)
ax4.set_title('tanh(x)')

# Use plt.tight_layout() for better spacing, then plt.show()
# plt.tight_layout()
# plt.show()
```

!!! question "Exercise 4.4.3: Review of Figure/Axes Creation"
    How many distinct methods have we learned so far to create Matplotlib figures and axes?  

### Creating Figures and Axes Sequentially

Another approach is to create a `Figure` object first and then add `Axes` objects to it. This offers fine-grained control over figure properties.

First, create a figure and customize its attributes:
```python
fig = plt.figure(figsize=(2.5, 2.5),       # width and height in inches
                 facecolor='lightskyblue',
                 layout='constrained')     # helps in fitting plots; similar to tight_layout
fig.suptitle('Fig-Ax Figure')
```

Next, add an `Axes` object to the figure and customize it:
```python
ax = fig.add_subplot()
ax.set_title('Axes',
             loc='left',
             fontstyle='oblique',  # 'normal', 'italic', 'oblique'
             fontsize='medium')   # 'small', 'medium', 'large', etc.
# ax.plot(x, sinx) # Example plot
# plt.show()
```

### Mosaic Subplots

For more complex layouts that don't fit a simple grid, Matplotlib offers `subplot_mosaic`. This function allows you to define subplots using a visual, ASCII-art-like representation or a list of lists.

```python
fig, axs = plt.subplot_mosaic([['A', 'right'],
                               ['B', 'right']],
                              figsize=(4, 3),
                              layout='constrained')
```

!!! question "Exercise 4.4.4: Understanding `subplot_mosaic`"
    What is the structure of `axs` when returned by `subplot_mosaic`? Can you summarize the steps to create a plot using this method?  

The `axs` object returned by `subplot_mosaic` is a dictionary where keys are the labels specified in the mosaic layout (e.g., 'A', 'B', 'right'). You can use these keys to access and plot on specific axes:

```python
# Assuming axs is from the subplot_mosaic call above
axs['A'].text(0.5, 0.5,
              'subplot A',
              ha='center',        # Horizontal Alignment
              va='center')        # Vertical Alignment

axs['right'].text(0.5, 0.5,
                  'subplot right',
                  ha='center',
                  va='center')

axs['B'].text(0.5, 0.5,
              'subplot B',
              ha='center',
              va='center')
# plt.show()
```

### Modifying Axes Properties

Once axes are created, you can modify their properties, such as labels, limits, and titles:

```python
# Assuming axs is from the subplot_mosaic example
axs['A'].set_xlabel("x-axis of A")
axs['A'].set_xlim(-2, 3)
axs['B'].set_title('axs[B] title')
# plt.show()
```

### Adding Annotations and Figure Titles

You can add annotations to individual axes and a "super title" (suptitle) to the entire figure. The following example assumes `axs` is a 2D NumPy array (e.g., from `plt.subplots(2, 2)`):

```python
# Re-create a 2x2 grid for this example, if not continuing from above
# fig, axs = plt.subplots(2, 2, layout='constrained')

# Assuming axs is a 2x2 array of Axes objects
for row in range(2):
    for col in range(2):
        axs[row, col].annotate(f'axs[{row}, {col}]',
                               (0.5, 0.5), # Coordinates for the text (in data space)
                               ha='center',
                               va='center',
                               fontsize=18,
                               color='darkgrey') # Corrected quote
fig.suptitle('Figure Title via plt.subplots()')
# plt.show()
```

!!! note "Note on `axs`"
    The `axs` object behaves differently depending on how it's created.
    *   `plt.subplots(1, 1)`: `ax` is a single `Axes` object.
    *   `plt.subplots(N, 1)` or `plt.subplots(1, M)`: `axs` is a 1D NumPy array of `Axes`.
    *   `plt.subplots(N, M)` (N>1, M>1): `axs` is a 2D NumPy array of `Axes`.
    *   `plt.subplot_mosaic(...)`: `axs` is a dictionary of `Axes`.

### Precise Axes Placement with `fig.add_axes()`

For ultimate control over subplot positioning and sizing, bypassing automated layout mechanisms, you can use `fig.add_axes()`. This method takes a list `[left, bottom, width, height]` where coordinates are fractions of the figure width and height (ranging from 0 to 1).

```python
# Ensure we have a figure object, possibly clearing an existing one
# if fig exists:
# fig.clf() # Clear current figure
fig = plt.figure()

# Adds an axes that fills the entire figure
ax1 = fig.add_axes([0, 0, 1, 1])
ax1.text(0.5, 0.5, 'Axes [0,0,1,1]', ha='center', va='center', color='blue')

# Adds another axes. These can overlap or be placed arbitrarily.
# The following examples might create axes outside the [0,1]x[0,1] normalized figure area
# or significantly overlap, depending on the values.
# For demonstration:
ax2 = fig.add_axes([0.1, 0.1, 0.5, 0.5]) # An inset axes
ax2.text(0.5, 0.5, 'Axes [0.1,0.1,0.5,0.5]', ha='center', va='center', color='red', fontsize=8)

# The original examples were:
# fig.add_axes([1, 1, 1, 1]) # This would start at the top-right corner and extend out
# fig.add_axes([-1, 0, 1, 2]) # This would start to the left of the figure

# plt.show()
```
!!! warning "Coordinates in `add_axes`"
    Coordinates for `fig.add_axes([left, bottom, width, height])` are typically in normalized figure coordinates (0,0 is bottom-left, 1,1 is top-right). Values outside this range can lead to axes being partially or fully outside the visible figure area, or require careful figure size management.

## Crafting a Complex Example

Now that we are equipped with various tools for creating and managing figures and axes, we are ready to tackle a more complex example. The goal is to construct a specific, detailed picture.

(The raw notes mentioned: "Our goal is to make the following picture. 3. 4. 1. 3. 0. 8. 0. 5". This suggests a visual target, which is not provided here. The numbers might be data or labels from that target image.)

Before writing any code for a complex visualization, it's crucial to analyze its components and structure.

!!! question "Exercise 4.5.1: Deconstructing the Target Figure"
    Imagine you have a complex figure to replicate. How would you approach it? Consider these steps:
    
    1.  Make a skeleton of the target picture (identify main axes, their arrangement).
    2.  Add in the primary data representations (curves, scatter plots, bars, etc.).
    3.  (Optional, if applicable) Fill in areas with colors, add annotations, legends, and fine-tune aesthetics.  

