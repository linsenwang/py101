# Chapter 2: Functions

## Introduction to Functions in Functional Programming

This chapter explores the role and characteristics of functions within the paradigm of functional programming.

!!! quote "Core Principle"
    Functions are first-class objects.

This means that in functional programming, functions are not just constructs for executing code; they are treated like any other data type. Key implications include:

*   **Functions as Objects:** Functions can be assigned to variables, stored in data structures (like lists or dictionaries), passed as arguments to other functions, and returned as values from other functions.
*   **Interactions:** They can interact with other functions in sophisticated ways, enabling patterns like higher-order functions.
*   **Encapsulation and Naming:** Functions can be "held inside" variables and thus assigned names, contributing to modularity and reusability.

These characteristics are fundamental to functional programming and significantly influence programming language design. We will delve into these concepts through several specific use cases.

## Use Case I: Decorators

Decorators provide a powerful and elegant way to modify or enhance functions and methods in Python. They are a form of metaprogramming where a part of the program tries to modify another part of the program at compile time. Before diving into decorators, let's review some foundational concepts.

### Review and Initial Exercises

!!! question "Exercise 1: Basic Data Analysis"
    Given the tuple `t1`:
    
    ```python
    t1 = (1, 2, 3, 4, 5)
    ```
    
    1.  Write a function to compute the average of `t1`.
    2.  Write a function to compute the standard deviation of `t1`.
    3.  Write a function to compute the skewness of `t1`.  
    

### Input Validation with `assert`

When designing functions, it's crucial to handle inputs correctly. For instance, if you encountered an error when attempting to pass `t2 = (1, 2, 3, None, 5)` to your statistical functions from Exercise 1, this highlights the need for robust input validation. The `assert` statement is one tool for this.

!!! info "The `assert` Statement"
    The `assert` statement is a debugging aid that tests a condition.
    
    *   It consists of the keyword `assert` followed by an expression and an optional message.
    *   If the expression evaluates to `True` (or a truthy value), the program continues execution normally.
    *   If the expression evaluates to `False` (or a falsy value), an `AssertionError` is raised, typically halting the program. The optional message, if provided, will be part of the error.
    
    Using `assert` helps in catching invalid states or inputs early in the development and testing phases, making it clear what assumptions (assertions) the code is making.

!!! question "Exercise 2: Handling Invalid Inputs"
    Given the tuple `t2`:
    
    ```python
    t2 = (1, 2, 3, None, 5)
    ```
    
    1.  Apply your average function (from Exercise 1) to `t2`. Observe the behavior or error if `None` values are not explicitly handled by your function.  
    

Here are some examples illustrating the use of `assert` statements:

```python
# Example 1: Asserting that a condition (which is true) holds.
# This assertion will pass, and the program continues.
my_list_ok = [1, 2, 3]
assert None not in my_list_ok, "Error: Unexpected None value found in list."
# print("Assertion for my_list_ok passed.") # Will be printed

# Example 2: Asserting a condition (which is false) holds.
# This will raise an AssertionError with the provided message.
my_list_bad = [1, 2, None, 3]
# The following line would raise an AssertionError:
# assert None not in my_list_bad, "Error: Unexpected None value found in list."

# Example 3: Asserting without a custom message.
# assert len(my_list_ok) == 3 # This passes
# assert len(my_list_bad) == 3 # This fails with AssertionError, but no custom message from us.
```

!!! note
    The message in an `assert` statement is only included in the `AssertionError` if the assertion fails. `assert` statements can be globally disabled by running Python with the `-O` (optimize) flag, so they should primarily be used for internal consistency checks and debugging, not for public API input validation that must always occur.

!!! question "Exercise 3: Improving Functions with `assert`"
    1.  Use `assert` statements to improve your functions from Exercise 1. For example, ensure that input collections are not empty if the calculation requires it, or that elements are numeric.  
    

### Extending Functionality with Higher-Order Functions

Although `assert` is useful for checks within a function, if you have many functions or if you cannot modify the source code of a function (e.g., it's from a third-party library), adding cross-cutting concerns like logging, timing, or more complex validation becomes challenging.

This is where **higher-order functions** come into play. A higher-order function is a function that does at least one of the following:
1.  Takes one or more functions as arguments.
2.  Returns a function as its result.

To extend the functionality of an existing function without altering its code, we can define a higher-order function. This higher-order function takes the original function as an argument, creates a new "wrapper" function that adds the desired behavior around the original function's execution, and then returns this new wrapper function. This is the core concept underpinning decorators.

### Decorator Syntax

A decorator in Python provides syntactic sugar for applying such a higher-order function to another function.

!!! note "Decorator Syntax Template"
    Here's a general template for defining a decorator and applying it:
    
    ```python
    # 1. Define the decorator (a higher-order function)
    def my_decorator_function(original_function):
        def wrapper_function(*args, **kwargs):
            # Code to execute BEFORE calling the original function
            print(f"Something is happening before {original_function.__name__} is called.")
            
            result = original_function(*args, **kwargs) # Call the original function
            
            # Code to execute AFTER calling the original function
            print(f"Something is happening after {original_function.__name__} has finished.")
            return result
        return wrapper_function

    # 2. Apply the decorator to a function using the @ syntax
    @my_decorator_function
    def say_whee():
        print("Whee!")

    # Calling the decorated function
    say_whee()
    ```
    
    In this template:
    *   `my_decorator_function` is the higher-order function that acts as the decorator.
    *   `original_function` (e.g., `say_whee`) is the function being decorated.
    *   `wrapper_function` is the new function that the decorator defines. It "wraps" the `original_function`, adding behavior before and/or after its execution. It accepts arbitrary positional (`*args`) and keyword (`**kwargs`) arguments to ensure it can wrap any function signature.
    *   The `@my_decorator_function` syntax above `def say_whee():` is equivalent to writing `say_whee = my_decorator_function(say_whee)` after the definition of `say_whee`.

!!! question "Exercise 4: Writing Decorators"
    Write decorators to perform the following tasks:
    
    1.  **Logging Function Calls:**
        Create a decorator that prints a line like "Calling function `<function_name>`..." before the decorated function executes and "Finished calling function `<function_name>`." after it completes.
        
        *Example of decorating a custom function `greet()`:*
        ```python
        # @log_calls
        # def greet(name):
        #     print(f"Hello, {name}!")
        # 
        # greet("Alice")
        ```
        *Expected Output:*
        ```
        Calling function `greet`...
        Hello, Alice!
        Finished calling function `greet`.
        ```
        *(The original raw notes mentioned an example with `print(1)`. Decorating built-in functions like `print` directly with `@` syntax is generally not straightforward and often not the typical use case for custom decorators. It's more common to decorate your own defined functions.)*

    2.  **Memoization (Caching Return Values):**
        Create a decorator that records the return values of previous calls to the decorated function. If the function is called again with the same arguments, the decorator should return the cached value immediately without re-executing the function. This technique is known as memoization and can significantly speed up functions whose results are expensive to compute and are often requested with the same inputs.  
    

## Use Case II: Recursion

Another important concept where functions operate on data in a self-referential manner is **recursion**. While decorators involve functions that wrap other functions, recursion involves a function that calls itself.

!!! info "Recursion Defined"
    Recursion occurs when a function calls itself, either directly or indirectly, to solve a problem. A well-defined recursive solution typically involves two key components:
    *   A **base case(s)**: One or more simple conditions under which the function can return a result directly without making further recursive calls. This prevents infinite recursion.
    *   A **recursive step(s)**: The function calls itself with a modified input that moves the problem closer to a base case.

We will explore recursion by:
*   Revisiting Newton’s method for finding roots.
*   Revisiting a function for calculating sums.
*   Discussing finding the square root using a recursive relation.
*   (Potentially) Generating the Fibonacci sequence.
*   (Potentially) Calculating the Factorial function.

### Newton’s Method (Recursive Approach)

Recall Newton's method for finding the root of a function $f(x)$. For example, to find the root of $f(x) = x^2 - C$ (which is $\sqrt{C}$), we start with an initial guess $x_0$.

The derivative is $f'(x) = 2x$.
The iterative formula for Newton's method is:
$x_{\text{next}} = x_{\text{current}} - \frac{f(x_{\text{current}})}{f'(x_{\text{current}})}$
For $f(x) = x^2 - 5$ (i.e., finding $\sqrt{5}$), this becomes:
$x_{\text{next}} = x_{\text{current}} - \frac{x_{\text{current}}^2 - 5}{2x_{\text{current}}}$

An iterative implementation could look like this:
```python
def newton_step_for_sqrt5(x_current):
    # Specific to f(x) = x^2 - 5
    return x_current - (x_current**2 - 5) / (2 * x_current)

# Iterative application
x_guess = 0.5  # Initial guess
print(f"Initial guess: {x_guess}")
for i in range(10): # Perform 10 iterations
    x_guess = newton_step_for_sqrt5(x_guess)
    print(f"Iteration {i+1}: {x_guess}")
```

!!! note "Iteration vs. Recursive Calls"
    The iterative loop `for _ in range(10): x = newton_step_for_sqrt5(x)` is computationally equivalent to a fixed number of nested calls: `newton_step_for_sqrt5(newton_step_for_sqrt5(...newton_step_for_sqrt5(0.5)...))`. Recursion allows us to express such self-referential computations more generally, often with a dynamic stopping condition instead of a fixed number of iterations.

We can define Newton's method recursively. A starting point for such a function is provided below. Your task would be to complete it, ensuring it has a proper base case (stopping condition) and correctly performs the recursive step.

```python
# A template for a recursive Newton's method function
def newton_recursion_sqrt(x_current, target_value=5, tolerance=1e-7, max_iterations=100, iteration_count=0):
    # Base Case 1: Max iterations reached
    if iteration_count >= max_iterations:
        print("Max iterations reached.")
        return x_current
    
    # Base Case 2: Value is close enough to the root
    if abs(x_current**2 - target_value) < tolerance:
        return x_current
    else:
        # Recursive Step: Calculate the next guess
        x_next = x_current - (x_current**2 - target_value) / (2 * x_current)
        return newton_recursion_sqrt(x_next, target_value, tolerance, max_iterations, iteration_count + 1)

# Example usage:
# initial_guess_for_sqrt5 = 0.5
# approx_sqrt_5 = newton_recursion_sqrt(initial_guess_for_sqrt5, target_value=5)
# print(f"Approximated square root of 5 (recursive): {approx_sqrt_5}")
```
The original raw notes had `defnewton_recursion (x):. return newton_recursion (x):` which was a non-functional placeholder. The version above is a more complete, illustrative recursive structure.

!!! note "Key Aspects of Recursion"
    *   A **base case** (or boundary condition) is essential to terminate the recursion. Without it, the function would call itself indefinitely, leading to a `RecursionError` (stack overflow).
    *   A **recursive step** (or recursion body) breaks the problem into smaller, self-similar subproblems. The function calls itself to solve these subproblems, combining their results to solve the original problem.
    *   **Recursion vs. Loops:**
        *   **State Management:** Loops often use mutable variables updated in each iteration. Recursion typically manages state via function parameters passed through successive calls on the call stack.
        *   **Termination:** Loops end when a condition is met. Recursion ends when a base case is reached.
        *   **Readability:** For problems with inherent recursive structures (e.g., tree traversals, some mathematical definitions like factorial), recursive solutions can be more intuitive and closer to the problem's definition. For simpler iterative tasks, loops might be clearer or more efficient in Python due to function call overhead.

### Sum of Elements (Recursive Approach)

Understanding the base case and recursive step is key to grasping recursion. Consider how the following `sum_recursion` function calculates the sum of elements in a list:

```python
def sum_recursion(data_list):
    if len(data_list) == 0:  # Base case: if the list is empty, its sum is 0
        return 0
    else:  # Recursive step:
        # The sum is the first element PLUS the sum of the rest of the list
        return data_list[0] + sum_recursion(data_list[1:])

# Example usage:
numbers = [1, 2, 3, 4, 5]
total_sum = sum_recursion(numbers)
print(f"The sum of {numbers} is: {total_sum}")  # Output: 15

empty = []
sum_of_empty = sum_recursion(empty)
print(f"The sum of {empty} is: {sum_of_empty}")    # Output: 0
```

!!! info "How `sum_recursion` Works"
    *   **Base Case:** If the input `data_list` is empty (`len(data_list) == 0`), the function returns `0`. This stops the recursion.
    *   **Recursive Step:** If the list is not empty, the function returns the sum of:
        1.  The first element of the list (`data_list[0]`).
        2.  The result of calling `sum_recursion` with the remainder of the list (`data_list[1:]`, which is a new list containing all elements except the first).
    This process continues, with the list shrinking at each step, until the base case (empty list) is reached. The results are then "bubbled up" as each recursive call returns.

### Finding Square Root (Alternative Recursive Relation)

We've explored Newton's method for finding square roots. Another way to think about finding the square root of a number $x$ is by considering an iterative improvement of a guess $r$.
If $r$ is an estimate for $\sqrt{x}$, then ideally $r = \frac{x}{r}$.
If $r$ is not a perfect estimate, then $r$ and $\frac{x}{r}$ will be on opposite sides of the true $\sqrt{x}$ (one larger, one smaller, unless $r=\sqrt{x}$). A better estimate might be their average.
This leads to the update rule:
$r_{\text{new}} = 0.5 \times \left(r_{\text{old}} + \frac{x}{r_{\text{old}}}\right)$

This formula provides a recursive relation to refine an estimate for $\sqrt{x}$. If we start with an initial guess $r_0$, we can compute $r_1$, then $r_2$, and so on, until the value of $r$ stabilizes or reaches desired precision.

!!! note "Connection to Newton's Method"
    Interestingly, this update rule $r_{\text{new}} = 0.5 \times \left(r_{\text{old}} + \frac{x}{r_{\text{old}}}\right)$ is precisely the same iterative formula obtained when applying Newton's method to find the root of the function $f(r) = r^2 - x = 0$.
    
    Recall Newton's formula: $r_{\text{new}} = r_{\text{old}} - \frac{f(r_{\text{old}})}{f'(r_{\text{old}})}$.
    For $f(r) = r^2 - x$, $f'(r) = 2r$.
    So, $r_{\text{new}} = r_{\text{old}} - \frac{r_{\text{old}}^2 - x}{2r_{\text{old}}} = \frac{2r_{\text{old}}^2 - (r_{\text{old}}^2 - x)}{2r_{\text{old}}} = \frac{r_{\text{old}}^2 + x}{2r_{\text{old}}} = \frac{1}{2} \left( r_{\text{old}} + \frac{x}{r_{\text{old}}} \right)$.
    
    Thus, this "alternative method" is a specific application or re-derivation of Newton's method for square roots. It forms a natural basis for a recursive function.

```
# Advanced Python: Recursion, Functional Programming, and Generators

## Recursion and Square Roots

The process of finding a square root can be described using a recursive relation. Consider the formula presented in the original notes:

`2𝑟=𝑟+𝑥Or,. 𝑟=0. 5×(𝑟+𝑥. 𝑟)`

This can be understood as a recursive relation. Why? If we use superscripts to denote the current and next approximation for the root `𝑟`, the relationship becomes clearer:

`𝑟_next = 0.5 × (𝑟_current + 𝑥.𝑟_current)`

!!! note "Regarding the Formula"
    The formula `𝑟_next = 0.5 × (𝑟_current + 𝑥.𝑟_current)` is provided as in the original lecture material. For practical square root computation, especially using methods like Newton-Raphson, the formula is typically `𝑟_next = 0.5 × (𝑟_current + 𝑥/𝑟_current)`.

!!! question "Exercise 5.1: Square Root with Recursion"  
    1. Write a `root_recursion` function to find the square root of a number.  
    Hint: Start from finding the square root of 7 and then generalize your function.  

Recursive relations are fundamental in guiding the implementation of a recursion function. You’re (or should be) extremely familiar with them.

!!! question "Exercise 6.1: Fibonacci Sequence: Formula and Implementation"  
    1. 请推导斐波那契数列的通项公式. 它的递推公式为：  
       `𝑎𝑛+2=𝑎𝑛+1+𝑎𝑛`  
    2. Please implement a Python function to compute the values of the Fibonacci sequence.  
    Hint: You can choose from two approaches.  

As a final exercise on this topic, let's work on an easier one.

!!! question "Exercise 7.1: Factorial Calculation"  
    1. Please write a function to compute the factorial of some number.  

## Functional Tools: Map, Filter, and Reduce

Let’s start with the familiar `max` function. You already know its output:

```python
max((1,2,3))
max(1,2,3,4)
```

If you try `max("hello", "world", "Python")`, you’ll see Python can also compute the maximum based on lexicographical order. But what does this mean in terms of comparison?

If we’re not satisfied with the default behavior (e.g., for strings, we might want the longest string), we can change it by defining a helper function. This helper function:
*   Takes an element (for comparison) as a parameter.
*   Returns the value (the standard) on which we want to sort or find the maximum.

```python
def helper(s):
    return len(s)

max("hello", "world", "Python", key=helper)
```

Is it necessary to define the `helper` function formally every time we want to find the maximum of some elements according to a custom standard? We can abandon the function's name and use it directly. This is known as an anonymous function, or a `lambda` function. The syntax is demonstrated below:

```python
max("hello", "world", "Python", key=lambda s: len(s))
```

Now let’s turn to three useful functions that often involve `lambda` functions: `map`, `filter`, and `reduce`.

**Map**

The `map` function applies a given function to every element of a sequence (e.g., a list or tuple) and returns a map object (an iterator).

```python
list(map(len, ("hello", "world", "Python")))  # Example: map(function, iterable)
```

**Filter**

The `filter` function constructs an iterator from elements of an iterable for which a function returns true. Similar to the `key` argument in `max`, we need to set the standard as a function. However, this time, the return value of the helper function must be Boolean.

```python
def long_string(s):
    return len(s) > 5

list(filter(long_string, ("hello", "world", "Python"))) # Example: filter(function, iterable)
```

!!! question "Exercise 8.1: Using Anonymous Functions with Filter"  
    1. Replace the helper function `long_string` in the `filter` example above with an anonymous function (`lambda`).  

**Reduce**

The last technique in this group is the `reduce` function. Unlike `map` and `filter`, `reduce` is not a built-in function and needs to be imported from the `functools` module.

The `reduce` function applies a rolling computation to sequential pairs of values in a list or other iterable. The helper function for `reduce` must:
*   Take two parameters.
*   Return a single value of the same type (or a type compatible with the next iteration).

```python
from functools import reduce

reduce(lambda x, y: x + "" + y, ("hello", "world", "Python")) # Concatenates strings
```

## Iterators and Generators

We have learned about iterators (an object that can be iterated upon, meaning that you can traverse through all the values). Generators provide a special and convenient way to create iterators. There are several ways we can make generators.

We can create our own generators in two primary ways:
1.  Through generator expressions.
2.  Through a generator function.

!!! question "Exercise 9.1: Identifying Generator Functions"  
    1. List examples of Python built-in functions or functions from standard libraries that output generators or iterators.  

### Generator Expressions

We learned the idea of list comprehensions in Chapter 1. Comprehensions enclosed in parentheses, however, are not "tuple comprehensions." They are generator expressions.

```python
type((x for x in range(5)))
```
This will output `<class 'generator'>`.

!!! question "Exercise 10.1: Generator for Squares"  
    1. Make a generator to help compute squares (1, 4, 9, 16, ...).  
    What is necessary for you to define a generator like this?  

### Generator Functions

Generator functions are defined like regular functions, but instead of using `return` to send back a value, they use the `yield` keyword. Wherever `yield` appears in a function, that function becomes a generator function.

The word `yield` means to give up a right or to produce something. The `yield` signs we see on the road tell us to give up the right-of-way to other traffic.

In a computer program, when a generator function encounters a `yield` statement, it does something similar. The generator function’s execution is suspended at that point, and it yields a value to the caller. Other parts of the program can then use the computing resources. When we request the next value from the generator function at a future time, it resumes execution from where it left off, regaining computing resources until it encounters another `yield` statement or the function terminates.
# Python Use Cases and Best Practices

This document covers advanced Python topics including generators, error handling techniques, and coding style guidelines as per PEP 8.

When a generator function is resumed at a future time, it regains the computing resources and continues execution from where it left off, until it encounters another `yield` statement or the function terminates.

## Use Case IV: Generators (Continued)

Generators provide a powerful way to work with sequences of data, especially large or infinite sequences, by producing items one at a time and only when needed.

### Example: Basic Generator with State

Let's explore a generator function and observe its state. The attribute `gi_running` (an internal CPython detail) indicates if the generator is currently executing.

```python
import time

# g1 is used inside g() below. For this to work as written without NameError,
# g1 would need to be a global variable referring to the generator instance itself.
# This is an unusual pattern and is preserved from the source material.
# A more common way to inspect generator state is from outside the generator function,
# using inspect.getgeneratorstate().

def g():
    print(f'g() executing part 1: gi_state (via g1.gi_running): {g1.gi_running}')
    time.sleep(3)
    print(f'g() about to yield: gi_state (via g1.gi_running): {g1.gi_running}')
    yield 1

g1 = g() 
# At this point, g() has not started running.
# If g1 were accessible as a global inside g(), g1.gi_running would be 0 here.

print(f"Calling next(g1)... Current state (g1.gi_running before next()): {g1.gi_running if hasattr(g1, 'gi_running') else 'N/A'}")
next(g1) # This executes the body of g() until the yield statement
print(f"After next(g1) call. Current state (g1.gi_running after next()): {g1.gi_running if hasattr(g1, 'gi_running') else 'N/A'}")
```

!!! note "Regarding `g1.gi_running` inside `g()`"
    The example code uses `g1.gi_running` inside the `g()` function. In a typical scenario, `g1` (the generator instance) is created outside `g()`. For `g()` to access `g1` as shown, `g1` would need to be a global variable or passed in some other unconventional way. The public API to get a generator's state is `inspect.getgeneratorstate(gen_instance)`. The `gi_running` attribute is an internal detail of CPython and might behave differently or be absent in other Python implementations. The provided code illustrates a concept, but its direct execution as written might lead to a `NameError` for `g1` within `g()` unless `g1` is explicitly declared global and assigned appropriately before `next(g1)` makes the generator run.

### Example: Infinite Sequence Generator

Generator functions are particularly useful for creating iterators for sequences that are too large to fit in memory, or even infinite sequences. Suppose we want to compute the squares of integers from 1 to infinity. This is impossible if we are using a list, as a list would require storing all elements. With a generator, we don't need to store all squares; we compute them on-the-fly.

```python
def squares():
    i = 1
    while True:
        yield i**2
        i += 1
```

!!! info "Why not a list for infinite sequences?"
    A list is a finite data structure stored in memory. Attempting to create a list of infinite items would exhaust available memory and is practically impossible. Generators, by yielding items one by one, avoid this limitation.

## Use Case V: Error Message Handling

Effective error handling is crucial for robust applications. Python's `try-except` control flow is the primary mechanism for managing exceptions.

### Scenario: Plotting Hand-Written Number Images

Consider a task where we process image files. The following code attempts to read data for a hand-written number from a CSV file and plot it.

```python
# The variable 'i' used in plt.imsave() is not defined in this snippet.
# It's assumed to be part of a larger context, like a loop.
# The placement of import statements is preserved from the source material.

with open("./data/numbers/number1.csv", "r") as f:
    header = f.readline()
    data = f.readline()

import matplotlib.pyplot as plt
import numpy as np

pixels = np.array(data.split(','), dtype='uint8').reshape((28, 28))
plt.imshow(pixels)
# plt.imsave(f"./mnist{i}.png", pixels) # 'i' needs to be defined for this line
```

!!! note "Context for `i`"
    The line `plt.imsave(f"./mnist{i}.png", pixels)` uses a variable `i` which is not defined in the provided snippet. This suggests the code is an excerpt from a loop or a function where `i` would be appropriately defined.

If an error occurs during file processing or data conversion (e.g., file not found, corrupted data), the program flow might be interrupted. If we are processing many images, one bad file could stop the entire process. Manually checking all data beforehand can be a daunting task. This is where `try-except` becomes essential.

### The `try-except` Control Flow

The `try-except` statement allows you to define a block of code to be tested for errors (the `try` block) and a block of code to be executed if an error occurs (the `except` block).

!!! question "Exercise: Robust Plotting"
    1.  Modify the image plotting code to handle potential errors (e.g., `FileNotFoundError`, `ValueError` during data conversion) when processing multiple number images from the `numbers` folder.
    2.  Ensure that if one file causes an error, the program prints a message about the problematic file and continues to process the remaining files.
    3.  Plot and save all valid numbers from the `numbers` folder.

### `try-except-finally` Syntax

The `try-except` block can also include an optional `finally` clause. The `finally` block, if specified, will be executed regardless of whether an exception occurred in the `try` block or not. This is useful for cleanup actions, like closing files.

```python
try:
    # Code that might raise an exception
    # e.g., file operations, network requests, complex calculations
    x = 1 / 0 # This will raise a ZeroDivisionError
except ZeroDivisionError as e:
    # Code to handle the specific exception (ZeroDivisionError)
    print(f"Error: Cannot divide by zero! Details: {e}")
except KeyError as e:
    # Code to handle another specific exception (KeyError)
    print(f"Error: Key not found! Details: {e}")
except Exception as e:
    # Code to handle any other exceptions not caught above
    print(f"An unexpected error occurred: {e}")
else:
    # Optional: Code to execute if no exceptions were raised in the try block
    print("No errors occurred.")
finally:
    # Code that will always execute, regardless of exceptions
    # e.g., closing files, releasing resources
    print("The try-except block has finished.")
```

## PEP 8: Python Style Guide

The Python Enhancement Proposals (PEPs) are a collection of documents that provide information to the Python community or describe a new feature for Python or its processes or environment.

### Overview
PEP 8 is the official style guide for Python code. It covers aspects like code layout, naming conventions, comments, and programming recommendations.

### Importance
Adhering to PEP 8 is not mandatory for Python code to run, but it is highly recommended because:
*   **Readability:** Consistent style makes code easier to read and understand by yourself and others.
*   **Maintainability:** Well-formatted code is easier to maintain and debug.
*   **Collaboration:** It helps teams work together more effectively by establishing common coding standards.

!!! quote "Insight"
    "Readability counts." - The Zen of Python (PEP 20)

It is a good practice to familiarize yourself with PEP 8 and apply its guidelines in your Python projects. Tools like linters (e.g., Flake8, Pylint) can help automatically check your code for PEP 8 compliance.

## References and Further Reading

*   **Video Resource (Bilibili):** [https://www.bilibili.com/video/BV1Y2421A7sB/?spm_id_from=333.3.37.search-card.all.click&vd_source=ec7b194853f6121829b0f428c7736022](https://www.bilibili.com/video/BV1Y2421A7sB/?spm_id_from=333.3.37.search-card.all.click&vd_source=ec7b194853f6121829b0f428c7736022)
*   **Book:** *Mastering Functional Programming with Python*, Steven Lott, 2015.
*   **Official PEP 8 Document:** [https://www.python.org/dev/peps/pep-0008/](https://www.python.org/dev/peps/pep-0008/)
