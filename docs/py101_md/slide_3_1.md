# Chapter 3: NumPy and Pandas

This chapter introduces NumPy, a fundamental package for numerical computation in Python, and sets the stage for Pandas. We'll explore array structures, essential functions, and the power of vectorization.

## What You Will Learn
- A new and more general data structure: the array.
- NumPy's core data structure: the `ndarray`.
- Basic NumPy functions for array creation and manipulation.
- Performing matrix operations with NumPy.
- Understanding NumPy's broadcasting mechanism.
- How vectorization accelerates computations.

!!! info "Reading Function Documentation"
    To fully leverage NumPy (and later, Pandas), you’ll often need to consult the official documentation for various functions and their parameters. A good starting point is the [NumPy user guide](https://numpy.org/doc/stable/user/).

## The NumPy Module

It's been a while since we last used the `conda` environment. Let's ensure NumPy and Pandas are installed. Open your terminal or Anaconda Prompt and run the following commands if you haven't installed these packages yet:

```bash
# (base) C:\Users\yourusername>conda install numpy
# (base) C:\Users\yourusername>conda install pandas
```

!!! note "Focus of this Chapter"
    While we will primarily use Pandas in subsequent data analysis tasks, a solid understanding of basic NumPy operations is crucial as Pandas is built on top of NumPy. This chapter covers a foundational subset of NumPy's capabilities.

### Understanding `ndarray`

We've previously learned that complex data types in Python, like lists or tuples, can hold several elements, which can even be of different types. NumPy's `ndarray` (n-dimensional array) introduces a more specialized sequence type optimized for numerical operations.

!!! quote "NumPy Array Definition"
    According to the NumPy documentation, "In computer programming, an array is a structure for storing and retrieving data."

Two key features of NumPy arrays ( `ndarray`s) are:

*   **Fixed Size:** The number of elements in an array is fixed upon its creation.
*   **Homogeneous Type:** All elements within an array must be of the same data type (e.g., all integers, all floats).

### Creating Arrays
Let’s create some `ndarray`s. We can specify the data type of the elements using the `dtype` parameter.

```python
import numpy as np

# Creating a simple array
a = np.array([1, 2, 3])
print("Array a:", a)
print("Data type of a:", a.dtype)

# Array with mixed types (NumPy will upcast to a common type, here strings)
b = np.array([1, 2, 'a'])
print("\nArray b:", b)
print("Data type of b:", b.dtype)

# Creating an array of arrays (potentially of different types/shapes)
# For this, dtype=object is often needed to maintain sub-array integrity
# Here, 'a' is an array of integers, and 'b' is an array of strings
c = np.array([a, b], dtype=object)
print("\nArray c (dtype=object):", c)
print("Element 0 of c:", c[0])
print("Element 1 of c:", c[1])

# Explicitly setting dtype during creation
a_float = np.array([1, 2, 3], dtype=float)
print("\nArray a_float:", a_float)
print("Data type of a_float:", a_float.dtype)
```

!!! question "Exercise 1: Basic Array Statistics"
    Given the tuple `t1 = (1, 2, 3, 4, 5)`:
    1. Convert `t1` to a NumPy array.
    2. Write a function (or use NumPy built-ins) to compute the average of the elements in the array.
    3. Write a function (or use NumPy built-ins) to compute the standard deviation of the elements.
    4. (Optional Challenge) Write a function (or find a SciPy function) to compute the skewness of the elements.
    
    ```python
    t1 = (1, 2, 3, 4, 5)
    
    # Your code here
    # Example for average:
    # import numpy as np
    # arr_t1 = np.array(t1)
    # average = np.mean(arr_t1)
    # print(f"Average: {average}")
    ```

### Special Array Creation Functions
NumPy provides several convenient functions to create `ndarray`s with specific initial values or patterns:

*   `np.ones(shape, dtype=None)`: Creates an array of the given shape, filled with ones.
*   `np.zeros(shape, dtype=None)`: Creates an array of the given shape, filled with zeros.
*   `np.eye(N, M=None, k=0, dtype=float)`: Creates a 2-D array with ones on the diagonal and zeros elsewhere (an identity matrix if N=M).
*   `np.random.random(size=None)` or `np.random.rand(d0, d1, ..., dn)`: Creates an array with random floats in the half-open interval [0.0, 1.0).
*   `np.random.normal(loc=0.0, scale=1.0, size=None)`: Creates an array with random samples drawn from a normal (Gaussian) distribution.
*   `np.random.randint(low, high=None, size=None, dtype=int)`: Creates an array with random integers from `low` (inclusive) to `high` (exclusive).
*   `np.arange([start,] stop[, step,], dtype=None)`: Returns evenly spaced values within a given interval. Similar to Python's `range` but returns an `ndarray`.
*   `np.linspace(start, stop, num=50, endpoint=True, retstep=False, dtype=None)`: Returns `num` evenly spaced numbers over a specified interval `[start, stop]`.

!!! question "Exercise 2: Creating a 3D Array"
    Create a 3-D `ndarray` with dimensions 2x3x4. Each entry of this `ndarray` should follow a normal distribution with a mean of 5 and a standard deviation of 3.
    
    ```python
    # import numpy as np
    # mean = 5
    # std_dev = 3
    # shape = (2, 3, 4)
    # random_3d_array = np.random.normal(mean, std_dev, shape)
    # print(random_3d_array)
    ```

!!! question "Exercise 3: `arange` vs. `linspace`"
    What’s the key difference between `numpy.arange()` and `numpy.linspace()` in terms of how they generate sequences? When might you prefer one over the other?

### Vectorization: The Power of NumPy
One of the primary reasons NumPy is so popular and crucial in Python data analysis is its efficiency in numerical computations, especially for operations on entire arrays (vectors and matrices). This is achieved through **vectorization**. Vectorized operations in NumPy are implemented in C, making them much faster than equivalent operations performed using Python loops.

!!! quote "NumPy and Vectorization"
    Some authors have aptly stated, "NumPy is all about vectorization."

This means that operations are applied to all elements of an array simultaneously, or in highly optimized loops under the hood, rather than iterating element by element in Python.

#### Example: Performance Comparison (NumPy vs. List)
Let's see how much faster NumPy can be compared to standard Python lists for a simple numerical operation.

```python
import numpy as np
import time

size = 10_000_000
python_list = list(range(size))
numpy_array = np.arange(size)

# --- List timing ---
stime_list = time.perf_counter()
python_list_squared = [x**2 for x in python_list]
etime_list = time.perf_counter()
list_time = etime_list - stime_list
print(f"Time taken by list comprehension: {list_time:.5f} seconds")

# --- NumPy timing ---
stime_numpy = time.perf_counter()
numpy_array_squared = numpy_array ** 2  # Vectorized operation
etime_numpy = time.perf_counter()
numpy_time = etime_numpy - stime_numpy
print(f"Time taken by NumPy array: {numpy_time:.5f} seconds")

# --- Results ---
if numpy_time > 0:  # Avoid division by zero if numpy_time is extremely small
    print(f"NumPy is approximately {list_time / numpy_time:.2f} times faster than lists in this example.")
else:
    print("NumPy operation was too fast to measure reliably with this method, or an error occurred in timing.")
```

### Matrix Algebra with NumPy
NumPy excels at linear algebra operations. For example, adding two matrices is straightforward, provided their dimensions are compatible.

In linear algebra, if you have two matrices:
$$ M_1 = \begin{pmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{pmatrix}, \quad M_2 = \begin{pmatrix} 6 & 5 & 4 \\ 3 & 2 & 1 \end{pmatrix} $$
Their sum is:
$$ M_1 + M_2 = \begin{pmatrix} 1+6 & 2+5 & 3+4 \\ 4+3 & 5+2 & 6+1 \end{pmatrix} = \begin{pmatrix} 7 & 7 & 7 \\ 7 & 7 & 7 \end{pmatrix} $$

!!! question "Exercise 4: Matrix Addition"
    1. Represent `M1` and `M2` as Python lists of lists. Write a function to compute their sum using nested loops.
    2. Represent `M1` and `M2` as NumPy arrays. Compute their sum using NumPy's addition operator. Compare the simplicity of the code.

### Broadcasting
NumPy's **broadcasting** is a powerful mechanism that allows arithmetic operations on arrays of different shapes. Subject to certain constraints, the smaller array is "broadcast" across the larger array so that they have compatible shapes for the operation. This avoids the need to explicitly replicate the smaller array to match the larger one, leading to more efficient memory usage and cleaner code.

For example, we can add a 1D array (vector) to each row or column of a 2D array (matrix):

```python
import numpy as np

m1 = np.array([[1, 2, 3],
               [4, 5, 6],
               [7, 8, 9]])
v1 = np.array([1, 0, 1])  # A 1D array (shape (3,))

# Add v1 to each row of m1
m1_plus_v1 = m1 + v1
print("m1:\n", m1)
print("\nv1:", v1)
print("\nm1 + v1 (v1 broadcasted to each row of m1):\n", m1_plus_v1)

# To add v1 as a column, v1 needs to be a column vector (shape (3,1))
v_col = np.array([[10], [20], [30]]) # A 2D array (column vector, shape (3,1))
m1_plus_v_col = m1 + v_col
print("\nv_col (column vector):\n", v_col)
print("\nm1 + v_col (v_col broadcasted to each column of m1):\n", m1_plus_v_col)
```

!!! question "Exercise 5: Understanding Broadcasting Rules"
    1. In the context of NumPy broadcasting, what does it mean for array shapes to be "compatible"?
    2. Briefly describe the general rules NumPy follows to broadcast arrays during arithmetic operations. (Hint: Consider how dimensions are compared, starting from the trailing dimensions).

# Advanced NumPy Operations

This section delves deeper into NumPy's capabilities, covering matrix algebra, the power of vectorization, and the important distinction between array views and copies.

## NumPy for Matrix Algebra

NumPy is a cornerstone for numerical computation in Python, largely due to its efficient handling of multi-dimensional arrays and a rich set of functions for linear algebra.

### Broadcasting and Dimension Mismatches

When performing operations between arrays of different shapes, NumPy attempts to use a set of rules called "broadcasting." However, if the shapes are incompatible according to these rules, an error will occur.

Consider a scenario where array dimensions do not align for an operation:

```python
import numpy as np

m1 = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
v1 = np.array([1, 1]) # v1 has shape (2,)

# Attempting to add m1 (3x3) and v1 (2,)
# This will result in a ValueError because shapes are not compatible for broadcasting.
# m1 + v1
```

!!! note "Broadcasting Rule"
    For broadcasting to work, when comparing dimensions (starting from the trailing ones), either the dimensions must be equal, or one of them must be 1. If these conditions are not met, a `ValueError` is raised. In the example above, the trailing dimension of `m1` (3) does not match `v1`'s dimension (2), and neither is 1.

### Matrix Transposition

In linear algebra, transposing a matrix switches its rows and columns. NumPy provides a straightforward way to achieve this.

If we have a matrix $M_1$:
$$ M_1 = \begin{pmatrix} 0 & 1 & 2 & 3 \\ 4 & 5 & 6 & 7 \\ 8 & 9 & 10 & 11 \end{pmatrix} $$
Its transpose, $M_1^T$, would be:
$$ M_1^T = \begin{pmatrix} 0 & 4 & 8 \\ 1 & 5 & 9 \\ 2 & 6 & 10 \\ 3 & 7 & 11 \end{pmatrix} $$

This can be done in NumPy using the `.T` attribute:

```python
m1 = np.array([
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11]
])
m1T = m1.T
print("Original matrix m1:\n", m1)
print("Transposed matrix m1T:\n", m1T)
```

!!! question "Exercise: `numpy.transpose` vs. `.T`"
    There is a `numpy.transpose()` function. What’s the difference between using `numpy.transpose(m1)` and `m1.T`?  
    Investigate their functionalities and any potential differences in usage or behavior.

### Reshaping Arrays

The `numpy.ndarray` is highly flexible. We can use the `.reshape()` method to change the shape of an array without changing its data, provided the new shape is compatible with the original number of elements.

```python
m1 = np.array([
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11]
]) # m1 has shape (3, 4), total 12 elements

# Reshape to a 1D array of 12 elements
m11 = m1.reshape(12)
print(m11, ":", m11.shape)

# Reshape to a 1D array (explicitly as a column vector in spirit, then row)
m12 = m1.reshape([12,])
print(m12, ":", m12.shape)

# Reshape to a 2D array (column vector) of shape (12, 1)
m13 = m1.reshape([12, 1])
print(m13.T, ":", m13.shape) # Transposed for printing, original shape is (12,1)

# Reshape to a 2D array of shape (2, 6)
m14 = m1.reshape([2, 6])
print(m14, ":", m14.shape) # Note: m14.T was in the original, printing m14 directly
```

## Revisit Vectorization

NumPy's speed largely comes from its vectorized operations. Vectorization allows operations to be applied to entire arrays at once, rather than element by element in Python loops.

Recall that attempting to add a number directly to a standard Python list results in an error:
```python
lst = [1, 2, 3]
# lst + 4 # This would raise a TypeError
```
With NumPy `ndarray`s, however, scalar operations are straightforward and efficient:
```python
arr = np.array([1, 2, 3])
result = arr + 4
print(result) # Output: [5 6 7]
```

### Universal Functions (Ufuncs)

More generally, NumPy provides universal functions (ufuncs), which are functions that operate on `ndarray`s in an element-by-element fashion. They are not only fast but also convenient to use. We've seen that list operations can be much slower than `ndarray` operations. Now, let's compare Python loops versus ufuncs when both are applied to an `ndarray`.

(Portions of the following code examples are adapted from the *Python Data Science Handbook* by Jake VanderPlas.)

Let's start with a "normal" Python function that uses a loop:

**Example: Timing Function Execution**

To measure performance, we can use a decorator to time function execution multiple times and report the average.

```python
import numpy as np
import time # Ensure time is imported for stime and etime

def timer_100(func):
    times = []
    def wrapper(*args, **kwargs):
        for _ in range(100): # Corrected loop variable
            stime = time.time()
            func(*args, **kwargs)
            etime = time.time() # Corrected variable name
            times.append(etime - stime)
        avg = np.mean(times)
        std = np.std(times)
        print(f"The average run time is {avg:.6f}s; the std is {std:.6f}s")
        # It's good practice for a wrapper to return the function's result
        # For this timing decorator, returning the result of the last call,
        # or None if the function doesn't return anything meaningful for timing.
        # For simplicity here, we are not returning the func's result.
    return wrapper

@timer_100
def compute_reciprocals(nums):
    output = np.empty(len(nums))
    for i in range(len(nums)):
        output[i] = 1.0 / nums[i]
    return output

# Test with a large array
# compute_reciprocals(np.random.randint(1, 10, size=10_000))
```

Now, let's perform the same operation using NumPy's vectorized approach (which implicitly uses a ufunc for division):

```python
@timer_100 # Applying the timer to the NumPy version as well for fair comparison
def numpy_reciprocals(nums):
    return 1.0 / nums

# Test with a large array
# random_numbers = np.random.randint(1, 10, size=10_000)
# print("Timing compute_reciprocals (loop-based):")
# compute_reciprocals(random_numbers)
# print("\nTiming numpy_reciprocals (vectorized):")
# numpy_reciprocals(random_numbers)
```
!!! info "Running the Timing Test"
    If you run the code above (uncommenting the test calls), you'll observe that `numpy_reciprocals` is significantly faster than `compute_reciprocals`. This highlights the performance benefits of vectorization.

!!! question "Exercise: Verify Correctness"
    Although we observed a significant time difference between `compute_reciprocals` and `numpy_reciprocals`, we haven't formally checked if their answers are correct and equivalent.  
    Write code to verify the correctness of these two functions. For instance, you can use `np.allclose()` to compare their outputs for a given input.

### Common and Specialized Ufuncs

Besides common arithmetic operators like `+`, `-`, `*`, `/`, which have ufunc equivalents (`np.add`, `np.subtract`, etc.), many commonly used mathematical functions are available as ufuncs. These include:

*   `np.abs` (absolute value)
*   Trigonometric functions: `np.sin`, `np.cos`, `np.tan`
*   Inverse trigonometric functions: `np.arcsin`, `np.arccos`, `np.arctan`
*   Exponential and logarithmic functions: `np.exp`, `np.log`

NumPy also provides more specialized ufuncs for numerical stability or specific mathematical needs. For example:

*   `np.expm1(x)` computes $e^x - 1$. This provides greater precision for small values of $x$ than `np.exp(x) - 1`.
*   `np.log1p(x)` computes $\log(1 + x)$. This provides greater precision for small values of $x$ than `np.log(1 + x)`.

### Creating Custom Ufuncs with `numpy.vectorize`

While NumPy offers an abundance of ufuncs, situations may arise where you need a custom operation not directly covered. NumPy provides `numpy.vectorize` to transform a Python function that works on scalars into a function that can operate on NumPy arrays in a vectorized manner.

!!! note "Performance of `numpy.vectorize`"
    It's important to understand that `numpy.vectorize` is primarily a convenience wrapper. It internally uses a Python loop, so it doesn't offer the same performance benefits as ufuncs written in C. However, it can simplify code by allowing you to write a function for scalars and apply it to arrays.

!!! question "Exercise: Custom Vectorized Function"
    1. Read the documentation for `numpy.vectorize`.
    2. Write your own Python function to compute $f(x) = \frac{1}{1 + x^2}$.
    3. Use `numpy.vectorize` to create a vectorized version of your function.
    4. Test the speed of your vectorized function on a NumPy array and compare it (e.g., using the `timer_100` decorator or `%timeit` in IPython/Jupyter) with a manually looped version and, if possible, a version written using only standard NumPy ufuncs (like `1.0 / (1.0 + x**2)`).

!!! question "Exercise: Array Operations - Min, Mean, and Masking"
    1. Read the documentation for the `min()` and `mean()` methods/functions in NumPy, paying attention to the `axis` parameter.
    2. Given the following `ndarray`:
       ```python
       arr = np.array([
           [1, 2, 3],
           [4, 5, 6],
           [7, 8, 9]
       ])
       ```
       Perform these operations:
       *   Create a boolean mask to select only those entries whose values are greater than 3.
       *   Find the minimum value of each row.
       *   Find the mean (average) of each column.

## View vs. Copy in NumPy

A potentially confusing but crucial aspect of NumPy is the distinction between a "view" and a "copy" of an array.

*   **View (Shallow Copy):** A view is a new array object that looks at the same data as the original array. No new data is created. If you modify a view, the original array's data will also change. Slicing an array often produces a view.
*   **Copy (Deep Copy):** A copy creates a new array object with its own data, duplicated from the original array. Modifications to a copy do not affect the original array, and vice-versa.

The main difference becomes apparent when you modify their contents.

**Example: Modifying a View**

Consider `y` as a slice (and thus, often a view) of `x`:
```python
x = np.arange(10)
print(f"Original x: {x}")

y = x[1:3]  # y is a slice of x
print(f"y (slice of x): {y}")
print(f"y.base is x: {y.base is x}") # Check if y shares data with x

# Modify an element in the view y
y[0] = 100
print(f"y after changing y[0]: {y}")
print(f"x after changing y[0] (original array affected): {x}")

# Modify part of x that y views
x[1:3] = [10, 11] # Note: x[1] was already changed by modifying y[0]
print(f"x after changing x[1:3]: {x}")
print(f"y after changing x[1:3] (view reflects changes): {y}")
```

### Checking if an Array is a View

You can check if an array is a view of another array using the `.base` attribute. If `y.base` returns the original array `x` (or any array), it means `y` shares its data with `x`. If `y.base` is `None`, then `y` owns its own data.

```python
x = np.arange(10)
y_view = x[1:3]       # Slicing often creates a view
y_copy = x[1:3].copy() # Explicitly making a copy

print(f"y_view.base is x: {y_view.base is x}") # Expected: True
print(f"y_view.base: {y_view.base}")          # Shows the base array

print(f"y_copy.base is x: {y_copy.base is x}") # Expected: False
print(f"y_copy.base: {y_copy.base}")          # Expected: None
```

!!! warning "Implicit vs. Explicit Copying"
    Be mindful of whether an operation returns a view or a copy, especially when modifying arrays. If you need to ensure that the original array is not modified, explicitly create a copy using the `.copy()` method.

### Further Readings

For a more comprehensive understanding of views versus copies in NumPy:

*   NumPy Documentation on Copies and Views: [https://numpy.org/doc/stable/user/basics.copies.html](https://numpy.org/doc/stable/user/basics.copies.html)
*   SciPy Cookbook - Views vs. Copies: [https://scipy-cookbook.readthedocs.io/items/ViewsVsCopies.html](https://scipy-cookbook.readthedocs.io/items/ViewsVsCopies.html)
*   Stack Overflow Discussion: [https://stackoverflow.com/questions/47181092/numpy-views-vs-copy-by-slicing](https://stackoverflow.com/questions/47181092/numpy-views-vs-copy-by-slicing)
```
