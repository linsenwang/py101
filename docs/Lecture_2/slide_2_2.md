# 2.2: Functions

This chapter delves into the concept of functions within the paradigm of functional programming, emphasizing their versatile nature and pivotal role in Python.

!!! note "Key Concept: Functions as First-Class Objects"
    In Python, functions are treated as first-class objects. This means:
    
    *   Functions are objects themselves.
    *   They can be assigned to variables and given names.
    *   They can interact with other functions (e.g., be passed as arguments or returned from other functions).
    This characteristic is fundamental to functional programming and influences language design.

We'll explore these concepts through several specific use cases.

## Use Case I: Decorators

Before diving into decorators, let's solidify some foundational concepts.

!!! question "In-class Exercise 1: Basic Data Computations"
    Given the tuple `t1 = (1, 2, 3, 4, 5)`:
    1.  Write a function to compute the average of `t1`.
    2.  Write a function to compute the standard deviation of `t1`.
    3.  Write a function to compute the skewness of `t1`.  
    
    ```python
    t1 = (1, 2, 3, 4, 5)
    ```

### The `assert` Statement

If you encounter an error, for instance, when passing `t2 = (1, 2, 3, None, 5)` to your functions, it's crucial to ensure that arguments do not contain invalid values. The `assert` statement is a useful tool for this.

!!! info "Understanding `assert`"
    An `assert` statement is a claim about a condition. You assert an expression (a piece of code that evaluates to a value).
    *   If the expression evaluates to `True`, the program proceeds normally.
    *   If the expression evaluates to `False`, the assertion fails, and an `AssertionError` occurs, typically halting the program.

!!! question "In-class Exercise 2: Applying Functions with Potentially Invalid Data"
    1.  Apply your average function (from Exercise 1) to `t2`.  
    
    ```python
    t2 = (1, 2, 3, None, 5)
    ```

Here are some examples of `assert` statements:

```python
# This assertion will fail and raise an AssertionError because None is not in the list.
# The message "All values look good!" will be part of the error.
# assert None in [1, 2, 3], "All values look good!"

# This assertion will pass because None is indeed not in the list.
assert None not in [1, 2, 3], "Contains None!"
```

!!! question "In-class Exercise 3: Enhancing Functions with `assert`"
    1.  Use `assert` statements to improve the robustness of the functions you wrote in Exercise 1 by checking for invalid input values (e.g., `None` values if your functions expect numbers).  

### Introduction to Decorators

While `assert` is handy for input validation within a function, modifying numerous existing functions can be cumbersome. Moreover, if functions are provided by external libraries or other developers, you might not be able to alter their source code directly.

To extend the functionality of an existing function without modifying its core code, we can use **decorators**. Decorators are a form of higher-order function: they take a function as an argument and return a new, augmented function.

### Decorator Syntax

Here's a general template for defining and using a decorator:

```python
# To define a decorator as a higher-order function
def decor(func):
    def wrapper(*args, **kwargs):
        # Code to execute before calling the original function
        print("Something is happening before the function is called.")
        
        result = func(*args, **kwargs)  # Call the original function
        
        # Code to execute after the original function
        print("Something is happening after the function is called.")
        return result
    return wrapper

# To decorate a function using the @ syntax
@decor
def say_hello():
    print("Hello!")

# Calling the decorated function
# say_hello()
```

!!! question "In-class Exercise 4: Writing Decorators"
    Write decorators to achieve the following:
    1.  Print a line `"Calling function <function_name>..."` before the execution of the decorated function and print `"Finished calling function <function_name>."` after its execution.
    2.  Create a decorator that caches the return values of previous function calls. If the decorated function is called again with the same arguments, the cached result should be returned immediately without re-executing the function. (This is also known as memoization).  

    **Example Output for the first decorator task:**
    If you decorate a function, say `print_message`, like this:
    ```python
    # Assuming 'logging_decorator' is your first decorator
    @logging_decorator 
    def print_message(message):
        print(message)
    
    print_message("Test")
    ```
    The output might look like:
    ```
    Calling function print_message...
    Test
    Finished calling function print_message.
    ```
    The raw notes show an example with `print(1)`:
    ```
    In[]: print(1)
    Out[]: Calling function print...
    1
    Finished calling function print.
    ```
    *(Note: The exact output format "In[]/Out[]" suggests an interactive console; your decorator should produce the descriptive lines around the original function's action.)*

## Use Case II: Recursion

Recursion is a powerful concept where a function calls itself to solve a problem. This is possible because, in Python, functions can be passed as arguments, even to themselves.

We’ll revisit two functions we've previously written and explore three new examples to understand recursion:
*   Revisit Newton’s method
*   Revisit the sums function
*   Finding square root
*   Fibonacci sequence
*   Factorial function

### Revisiting Newton's Method (Iterative and Recursive)

Suppose we want to find the root of \(f(x) = x^2 - 5\). Let's start with an initial guess, say `x = 0.5`.
Newton's method formula is:
\[ x_{next} = x_{current} - \frac{f(x_{current})}{f'(x_{current})} \]
For \(f(x) = x^2 - 5\), the derivative is \(f'(x) = 2x\).
So, the iteration becomes:
\[ x_{next} = x_{current} - \frac{x_{current}^2 - 5}{2x_{current}} \]

Here's an iterative implementation:
```python
def newton_step(x):
    return x - (x**2 - 5) / (2 * x)

x = 0.5
for _ in range(10):  # Perform 10 iterations
    x = newton_step(x)
print(x)
```

Consider the relationship:
Is the loop `for _ in range(10): x = newton_step(x)` effectively the same as manually composing the function calls like this?
`newton_step(newton_step(newton_step(newton_step(newton_step(newton_step(newton_step(newton_step(newton_step(newton_step(0.5))))))))))`
Yes, conceptually it is.

We can implement Newton's method recursively. Here's a starting point for a recursive version. Try to modify it to make it work correctly (e.g., by adding a base case or a counter for iterations):

```python
# Initial (incomplete) recursive idea
def newton_recursion(x, iterations_left):
    if iterations_left == 0:
        return x
    else:
        next_x = x - (x**2 - 5) / (2 * x)
        return newton_recursion(next_x, iterations_left - 1)

To make it work, you'd call it like:
initial_guess = 0.5
result = newton_recursion(initial_guess, 10)
print(result)
```

!!! note "Key Elements of Recursion"
    *   **Base Case (or Boundary Condition):** A condition that stops the recursion. Without it, the function would call itself indefinitely, leading to a stack overflow error.
    *   **Recursive Step (or Recursion Body):** The part of the function where it calls itself, usually with modified arguments that move closer to the base case.

!!! info "Recursion vs. Loops"
    *   **Readability:** Recursive solutions can sometimes be more intuitive and closer to the mathematical definition of a problem.
    *   **Overhead:** Function calls have overhead. Deep recursion can be less efficient than an equivalent iterative solution and can lead to stack overflow errors if the recursion depth limit is exceeded.
    *   **State Management:** Loops often require explicit management of state variables, while recursion handles state implicitly through function call stacks.

### Revisiting the Sums Function (Recursive)

Based on the principles of recursion, can you understand how the following `sum_recursion` function works to sum elements in a list?

```python
def sum_recursion(data_list):
    if len(data_list) == 0:  # Base case: empty list sums to 0
        return 0
    else:
        # Recursive step: sum of the first element and the sum of the rest of the list
        return data_list[0] + sum_recursion(data_list[1:])

# Example usage:
# print(sum_recursion([1, 2, 3, 4, 5]))  # Output: 15
```

### Finding Square Root (Another Recursive Method)

While Newton's method can find square roots, there's another iterative approach that can be expressed recursively.
Mathematically, if \(r\) is the square root of \(x\), then \(r = \frac{x}{r}\).
If this relation is satisfied, then it implies \(2r = r + \frac{x}{r}\), which simplifies to:
\[ r = 0.5 \times \left(r + \frac{x}{r}\right) \]
This is a recursive relation. If we add superscripts to denote successive approximations:
\[ r_{next} = 0.5 \times \left(r_{current} + \frac{x}{r_{current}}\right) \]
This is known as the Babylonian method or Heron's method.

!!! question "In-class Exercise 5: Recursive Square Root Function"
    1.  Write a `root_recursion` function to find the square root of a number using the recursive relation \( r_{next} = 0.5 \times \left(r_{current} + \frac{x}{r_{current}}\right) \).
        *Hint: Start by trying to find the square root of 7. You'll need an initial guess for \(r_{current}\) and a condition to stop the recursion (e.g., when \(r_{next}\) is very close to \(r_{current}\) or after a fixed number of iterations).*  

A recursive relation is fundamental in guiding the implementation of a recursive function. You are (or should be) becoming extremely familiar with this concept.

!!! question "In-class Exercise 6: Fibonacci Sequence"
    1.  Please derive the general term formula for the Fibonacci sequence. Its recurrence relation is: \(a_{n+2} = a_{n+1} + a_n\), with \(a_0 = 0, a_1 = 1\) (or \(a_1 = 1, a_2 = 1\), depending on the starting convention).
    2.  Please implement a Python function to compute the values of the Fibonacci sequence.
        *Hint: You can choose an iterative approach or a recursive approach. Be mindful of the efficiency of a naive recursive solution for larger numbers.*  

!!! question "In-class Exercise 7: Factorial Function"
    1.  Please write a function to compute the factorial of a non-negative integer \(n\) (denoted as \(n!\)). Recall that \(0! = 1\) and \(n! = n \times (n-1)!\) for \(n > 0\).  

## Use Case III: `map`, `filter`, and `reduce`

Let's start with the familiar built-in `max()` function. You likely know its basic behavior:

```python
print(max((1, 2, 3)))    # Output: 3
print(max(1, 2, 3, 4))   # Output: 4
```

If you try `max("hello", "world", "Python")`, Python will also compute the "maximum" based on lexicographical (alphabetical) order:
```python
print(max("hello", "world", "Python"))  # Output: world
```

### Customizing `max` with a Key Function

If we're not satisfied with the default behavior (e.g., we want to find the longest string instead of the lexicographically largest), we can change it by providing a `key` function. This helper function:
1.  Takes an element (from the items being compared) as its parameter.
2.  Returns the value (the "standard") on which the comparison should be based.

```python
def get_length(s):
    return len(s)

print(max("hello", "world", "Python", key=get_length))  # Output: Python
```

### Anonymous Functions (`lambda`)

Defining a separate helper function like `get_length` can be verbose if it's simple and only used once. Python allows for **anonymous functions**, also known as `lambda` functions, which can be defined inline.

The syntax is `lambda arguments: expression`.

```python
print(max("hello", "world", "Python", key=lambda s: len(s)))  # Output: Python
```

### `map` Function

The `map()` function applies a given function to every item of an iterable (like a list or tuple) and returns a map object (which is an iterator) containing the results.

`map(function, iterable, ...)`

```python
words = ("hello", "world", "Python")
lengths = map(len, words)
print(list(lengths))  # Output: [5, 5, 6]
```

### `filter` Function

The `filter()` function constructs an iterator from elements of an iterable for which a function returns true. Similar to the `key` function in `max` or the function in `map`, we need to define a standard (a function) for filtering. However, for `filter`, this function must return a Boolean value (`True` or `False`).

`filter(function, iterable)`

```python
words = ("hello", "world", "Python", "is", "fun")

def is_long_string(s):
    return len(s) > 4

long_words = filter(is_long_string, words)
print(list(long_words))  # Output: ['hello', 'world', 'Python']
```

!!! question "In-class Exercise 8: Using Anonymous Functions with `filter`"
    1.  Replace the `is_long_string` helper function in the `filter` example above with an equivalent anonymous (`lambda`) function.  

### `reduce` Function

The `reduce()` function is used to apply a rolling computation to sequential pairs of values in an iterable. Unlike `map` and `filter` (which are built-in), `reduce` needs to be imported from the `functools` module.

The `reduce()` function requires a helper function (often a `lambda`) that:
1.  Takes two arguments.
2.  Returns a single value, typically of the same type as the accumulated result.

`functools.reduce(function, iterable[, initializer])`

```python
from functools import reduce

words = ("hello", "world", "Python")

# Example: Concatenate strings
concatenated_string = reduce(lambda x, y: x + " " + y, words)
print(concatenated_string)  # Output: hello world Python

numbers = [1, 2, 3, 4, 5]
sum_of_numbers = reduce(lambda x, y: x + y, numbers)
print(sum_of_numbers)  # Output: 15
```
The original notes had `reduce(lambda x,y:x+""+y,("hello","world","Python"))` which would result in `"helloworldPython"`. The example above adds spaces for better readability of the concatenated string.

## Use Case IV: Generators

We have previously learned about iterators (an object that allows traversal through its elements one by one). **Generators** provide a special and convenient way to create iterators.

There are two primary ways to create our own generators:
1.  Through **generator expressions**.
2.  Through **generator functions**.

!!! question "In-class Exercise 9: Functions Outputting Generators"
    1.  List some examples of built-in functions or operations in Python that output generators or iterators. (Hint: think about `map`, `filter`, `range` in Python 3, dictionary views like `.keys()`, `.values()`, `.items()`).  

### Generator Expressions

In Chapter 1, we learned about list comprehensions. Syntactically similar expressions enclosed in parentheses `()` are not "tuple comprehensions" but are, in fact, **generator expressions**.

```python
gen_exp = (x * x for x in range(5))
print(type(gen_exp))  # Output: <class 'generator'>

# To see the values, you can iterate or convert to a list
# print(list(gen_exp))  # Output: [0, 1, 4, 9, 16]
```

!!! question "In-class Exercise 10: Generator for Squares"
    1.  Create a generator expression to produce the sequence of squares (1, 4, 9, 16, ...). What is necessary for you to define a generator like this (e.g., how do you represent an infinite sequence if needed, or a very long finite one efficiently)?  

### Generator Functions

Generator functions look almost like regular functions, but they use the `yield` keyword instead of (or in addition to) `return`. The presence of `yield` in a function's body automatically makes it a generator function.

!!! info "The `yield` Keyword"
    `yield` means to temporarily give up control or produce a value. Think of yield signs on a road: they tell drivers to give way to other traffic.
    In a Python generator function, when `yield` is encountered:
    1.  The function produces the value specified by `yield`.
    2.  The function's state is "frozen" or suspended. It pauses execution and gives up control (and computing resources) to the caller.
    3.  When the generator is asked for its next value (e.g., via `next()` or in a `for` loop), it resumes execution from where it left off, with its local variables and state intact, until it hits another `yield` statement or a `return` statement (or the end of the function).

**Example 2.4.1: A Simple Generator Function**

```python
import time

def simple_generator_function():
    print(f'Generator starting...')
    time.sleep(1)
    print(f'Generator yielding 1...')
    yield 1
    
    print(f'Generator resumed, sleeping again...')
    time.sleep(1)
    print(f'Generator yielding 2...')
    yield 2
    
    print(f'Generator resumed, finishing.')

# Create a generator object
g1 = simple_generator_function()

# print(f'g1 object: {g1}') # Shows it's a generator object

# print("Calling next(g1)...")
# value = next(g1)
# print(f"Received: {value}")

# print("Calling next(g1) again...")
# value = next(g1)
# print(f"Received: {value}")

# print("Calling next(g1) one more time...")
# try:
#    next(g1)
# except StopIteration:
#    print("Generator finished and raised StopIteration.")

# The specific example from the notes with gi_running:
# Note: gi_running is an internal attribute and its direct use is generally discouraged for production code.
# It indicates if the generator is currently executing.

def g():
    # To check gi_running, the generator object g1 needs to exist.
    # This check is tricky to place meaningfully inside g() before g1 is assigned from g().
    # The example likely intended to show its state from outside.
    # print(f'g() before first yield: gi_state (from outside) would be running if checked during next()')
    time.sleep(1) # Simulating work
    print(f'g() about to yield 1')
    yield 1
    print(f'g() resumed after yielding 1')
    time.sleep(1) # Simulating more work
    print(f'g() about to yield 2')
    yield 2
    print(f'g() resumed after yielding 2, and finishing')

# g1 = g()
# print(f"Initial state of g1 (e.g., g1.gi_frame): {g1.gi_frame is not None}")
# print(f"Is g1 running (g1.gi_running before first next())? {g1.gi_running}") # Typically 0 (False)

# print("Calling next(g1)...")
# next(g1) # During this call, g1.gi_running would be 1 (True) from within g if it could inspect itself via g1
# print(f"Is g1 running (g1.gi_running after first next())? {g1.gi_running}") # Typically 0 (False)

# print("Calling next(g1) again...")
# next(g1)
# print(f"Is g1 running (g1.gi_running after second next())? {g1.gi_running}") # Typically 0 (False)
```
*Note: The `gi_running` attribute mentioned in the original notes is an internal implementation detail and might behave differently across Python versions or not be readily accessible for such a direct demonstration.*

Now that we see how generator functions work, we can define a generator with them. Suppose we want to compute the squares of integers from 1 to infinity. This is impossible if we are using a list (because a list would require storing all infinite numbers in memory). But with a generator, we don't need to store all squares; we just compute them on-the-fly as needed.

```python
def infinite_squares():
    i = 1
    while True:
        yield i * i
        i += 1

# Example usage:
# sq_gen = infinite_squares()
# print(next(sq_gen))  # Output: 1
# print(next(sq_gen))  # Output: 4
# print(next(sq_gen))  # Output: 9
# ... and so on, indefinitely
```

## Use Case V: Error Handling

This section introduces reading error messages and handling potential errors gracefully in your programs. To handle an error, we rely on the `try-except` control flow.

Consider the following code, which attempts to read image data from CSV files and display/save them. This code might fail if a file is missing, corrupted, or not in the expected format.

```python
# Placeholder for imports and file reading logic
# Assume this code is intended to run in a loop for multiple files.
# The variable 'i' would typically come from an outer loop.

# import matplotlib.pyplot as plt
# import numpy as np
# import os

# data_folder = "../data/numbers/" # Example path
# output_folder = "./"

# For a single file example (as in notes, assuming i=1):
# file_path = os.path.join(data_folder, "number1.csv")
# i = 1 

# try:
#     with open(file_path, "r") as f:
#         header = f.readline()  # Skip header
#         data_line = f.readline().strip()
    
#     if data_line:
#         pixels = np.array(data_line.split(","), dtype='uint8').reshape((28, 28))
#         plt.imshow(pixels, cmap='gray')
#         # plt.show() # To display
#         # plt.imsave(os.path.join(output_folder, f"mnist_{i}.png"), pixels, cmap='gray')
#         # print(f"Processed and saved mnist_{i}.png")
#     else:
#         print(f"No data in {file_path}")

# except FileNotFoundError:
#     print(f"Error: File {file_path} not found.")
# except Exception as e:
#     print(f"An error occurred with file {file_path}: {e}")
```
The original snippet:
```python
# with open("../data/numbers/number1.csv", "r") as f:
#     header = f.readline()
#     data = f.readline()
# import matplotlib.pyplot as plt
# import numpy as np
# pixels = np.array(data.split(","), dtype='uint8').reshape((28, 28))
# plt.imshow(pixels)
# # The 'i' in f"./mnist{i}.png" suggests this is part of a loop.
# # plt.imsave(f"./mnist{i}.png", pixels) 
```

If an error occurs (e.g., `FileNotFoundError`, `ValueError` due to malformed data), the program flow might be interrupted. If you are processing many files, one bad file could stop the entire process. Checking all data meticulously before processing can be a daunting task. The `try-except` control flow helps manage such situations.

### `try-except-else-finally` Syntax

The full syntax for error handling is:

```python
try:
    # Code that might raise an error
    # ...
except SpecificErrorType1 as e:
    # Code to handle SpecificErrorType1
    # 'e' contains the error object
    # ...
except SpecificErrorType2 as e:
    # Code to handle SpecificErrorType2
    # ...
except Exception as e:  # Catch other exceptions (use more specific types if possible)
    # Code to handle any other exceptions caught by 'Exception'
    # ...
else:
    # Code to execute if the 'try' block completes without raising any errors
    # ...
finally:
    # Code that will always execute, whether an error occurred or not
    # Useful for cleanup operations (e.g., closing files, releasing resources)
    # ...
```

!!! question "In-class Exercise 11: Robust Plotting with Try-Except"
    1.  Modify the image plotting code (or create a loop that processes multiple hypothetical image data files from the `numbers` folder) to include `try-except` blocks. Your goal is to ensure that if one file causes an error, the program prints an informative message about that specific file and continues to process the remaining files, rather than crashing.  

## PEP 8: Python Style Guide

The Python Enhancement Proposals (PEPs) are a collection of documents that propose new features, collect community input on issues, and document design decisions for Python.

**PEP 8** is the official style guide for Python code. It covers aspects like:
*   Code layout (indentation, line length, blank lines)
*   Naming conventions (variables, functions, classes, modules)
*   Comments and docstrings
*   Programming recommendations

!!! info "About PEP 8"
    *   **It is not required:** Python will execute code that doesn't follow PEP 8.
    *   **It is highly recommended:** Adhering to PEP 8 makes code more readable, consistent, and maintainable, especially when working in teams. Many linters and IDEs can help you check for PEP 8 compliance.

## References and Further Reading

*   [Functional Programming Concepts (Bilibili Video - Chinese)](https://www.bilibili.com/video/BV1Y2421A7sB/?spm_id_from=333.337.search-card.all.click&vd_source=ec7b194853f6121829b0f428c7736022)
*   Lott, Steven F. *Mastering Functional Programming with Python*. Packt Publishing, 2015.