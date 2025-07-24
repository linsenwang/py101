# Chapter 2: Functions

This chapter delves into the nature and utility of functions, particularly within the paradigm of functional programming. You will learn about:

*   Functions as fundamental building blocks in functional programming.
*   The concept of functions as "first-class objects."
*   How functions, being objects, can interact with other functions.
*   The ability for functions to be stored in variables and assigned names – a key feature underpinning functional programming and modern language design.

We will explore these concepts through specific use cases.

!!! quote "Key Concept: Functions as First-Class Objects"
    In programming language design, a "first-class citizen" (or first-class object) is an entity that supports all the operations generally available to other entities. These operations typically include being passed as an argument, returned from a function, and assigned to a variable. When functions are first-class objects, it unlocks powerful programming techniques.

## Use Case I: Decorator

Before we dive into decorators, let's refresh some foundational concepts with an exercise.

!!! question "Exercise: Basic Statistical Functions"
    Given the tuple `t1 = (1, 2, 3, 4, 5)`:
    1.  Write a function to compute the average of `t1`.
    2.  Write a function to compute the standard deviation of `t1`.
    3.  Write a function to compute the skewness of `t1`.
    
    ```python
    t1 = (1, 2, 3, 4, 5)
    # Your function definitions and calls here
    ```

### Validating Function Arguments with `assert`

If you encountered an error when trying to pass data containing invalid values (e.g., `None`) to a function, you'd realize the importance of input validation. The correct approach is to ensure that arguments passed to your functions do not contain invalid values that could break their logic.

Here, we introduce the `assert` statement. An `assert` is a claim: we assert that a certain expression (what is an expression?) evaluates to `True`.

*   If the value of the expression is `True`, nothing happens, and the program proceeds.
*   If the value of the expression is `False`, the assertion fails, and an `AssertionError` occurs, typically halting the program.

!!! question "Exercise: Handling Invalid Inputs"
    Consider the tuple `t2 = (1, 2, 3, None, 5)`.
    1.  Apply the `average` function you wrote in the previous exercise to `t2`. Observe what happens.
    
    ```python
    t2 = (1, 2, 3, None, 5)
    # Attempt to use your average function with t2
    ```

Let's look at some examples of `assert` statements:

```python
# Example 1: This assertion will fail and raise an AssertionError
# The message "All values look good!" will be part of the error.
# assert None in [1, 2, 3], "All values look good!"

# Example 2: This assertion will pass because None is not in [1, 2, 3].
# No message will be printed because the assertion is true.
assert None not in [1, 2, 3] # "Contains None!" would be printed if this failed

# Example 3: A more typical use case for an error message
# This will fail and print the helpful error message.
# data = [1, 2, None, 4]
# for x in data:
#    assert x is not None, "Encountered a None value in the data!"
```

!!! note "Using `assert`"
    The `assert` statement is primarily a debugging aid. It helps catch internal errors or invalid conditions that should ideally not occur if the program logic is correct. While it can be used for input validation, dedicated error handling (e.g., `try-except` blocks or explicit checks with `if` statements raising custom errors) is often preferred for user-supplied input or external data.

!!! question "Exercise: Improving Functions with `assert`"
    1.  Modify the statistical functions you wrote earlier (average, standard deviation, skewness) to use `assert` statements to check for `None` values in the input data. Ensure your functions raise an `AssertionError` if `None` is found.

### Introduction to Decorators

Although `assert` is handy for adding checks, if you have many functions, modifying each one individually can be tedious. Moreover, if functions are provided by a third-party library, you might not be able to (or want to) modify their source code directly.

So, when we want to extend or modify the functionality of an existing function without altering its core code, we can use a **higher-order function**. A higher-order function is a function that either takes one or more functions as arguments, returns a function as its result, or both.

A **decorator** is a common application of higher-order functions. It's a way to wrap additional functionality around an existing function. The decorator takes the original function as an argument, defines a new "wrapper" function that adds the new behavior before and/or after calling the original function, and then returns this wrapper function.

#### Decorator Syntax Template

Here's the general syntax for defining and using a decorator:

```python
# To define a decorator as a higher-order function
def decorator_function(original_function):
    def wrapper_function(*args, **kwargs):
        # Code to execute before calling the original function
        print(f"Wrapper executed before {original_function.__name__}")
        
        result = original_function(*args, **kwargs) # Call the original function
        
        # Code to execute after calling the original function
        print(f"Wrapper executed after {original_function.__name__}")
        return result
    return wrapper_function

# To decorate a function using the @ syntax
@decorator_function
def my_function():
    print("my_function is executing")

# Calling the decorated function
my_function()

# This is equivalent to:
# def my_function():
#     print("my_function is executing")
# my_function = decorator_function(my_function)
# my_function()
```

!!! question "Exercise: Writing Decorators"
    Write decorators to perform the following tasks:

    1.  **Logging Function Calls:** Create a decorator that prints a line like "`<function_name>` function is being called." before the decorated function executes and a line like "`finish calling <function_name>` function." after it completes.
        
        *Example Usage and Expected Output:*
        ```python
        @log_calls  # Assuming your decorator is named log_calls
        def greet(name):
            print(f"Hello, {name}!")
            return f"Greetings to {name}"

        greet("Alice") 
        ```
        *Expected Output:*
        ```
        greet function is being called.
        Hello, Alice!
        finish calling greet function.
        ```

    2.  **Memoization (Caching Results):** Create a decorator that records the return values of previous calls to a function. If the decorated function is called again with the same arguments, the decorator should return the stored result immediately without re-executing the function. This is useful for computationally expensive functions.
        
        *Hint: You'll need a way to store argument-result pairs, like a dictionary.*

## Use Case II: Recursion

Another powerful concept, often related to functions calling other functions (or themselves), is **recursion**. If any function in Python can be passed to another function as a parameter, what happens if a function calls itself? This is the essence of recursion.

We'll explore recursion by:

*   Revisiting Newton’s method for finding roots.
*   Revisiting a function for calculating sums.
*   Introducing recursive approaches for:
    *   Finding the square root of a number.
    *   Generating the Fibonacci sequence.
    *   Calculating the factorial function.

### Newton's Method (Recursion)

Suppose we want to find the root of $f(x) = x^2 - 5$. We can start with an initial guess, say $x_0 = 0.5$.
Newton's method provides an iterative formula to find successively better approximations of the root:
$f'(x) = 2x$
$x_{next} = x_{current} - \frac{f(x_{current})}{f'(x_{current})} = x_{current} - \frac{x_{current}^2 - 5}{2x_{current}}$

Here's an iterative implementation:

```python
def newton_iterative_step(x_current):
    # For f(x) = x^2 - 5
    return x_current - (x_current**2 - 5) / (2 * x_current)

x = 0.5  # Initial guess
print(f"Initial guess: {x}")
for i in range(10):  # Perform 10 iterations
    x_prev = x
    x = newton_iterative_step(x)
    print(f"Iteration {i+1}: {x}")
    if abs(x - x_prev) < 1e-7: # Stop if convergence is met
        print("Converged.")
        break
```

#### Transition to Recursion

Pay attention to the iterative update: `x = newton_iterative_step(x)`. This repetitive application suggests a recursive structure. An iterative loop performing `x = f(x)` ten times is like `f(f(f(...f(initial_x)...)))`.

We can try to define a recursive version of Newton's method. Here is a starting point. Try to modify the code by yourself to make it work. You'll need a base case (stopping condition) and a recursive step.

```python
def newton_recursive_step(x_current):
    # For f(x) = x^2 - 5
    return x_current - (x_current**2 - 5) / (2 * x_current)

def find_root_newton_recursive(x, tolerance=1e-7, max_iterations=10, current_iteration=0):
    print(f"Iteration {current_iteration}: x = {x}")
    if current_iteration >= max_iterations:
        print("Max iterations reached.")
        return x
    
    x_next = newton_recursive_step(x)
    
    if abs(x_next - x) < tolerance:
        print("Converged.")
        return x_next
    else:
        # Recursive call:
        return find_root_newton_recursive(x_next, tolerance, max_iterations, current_iteration + 1)

# Example usage:
initial_guess = 0.5
root = find_root_newton_recursive(initial_guess)
print(f"Approximate root found: {root}")
print(f"Square of root: {root**2}") # Should be close to 5
```

!!! note "Key Concepts in Recursion"
    *   **Boundary Condition (Base Case):** This is crucial. It defines the condition under which the recursion stops. Without a base case, a recursive function would call itself indefinitely, leading to a stack overflow error. In Newton's method, this could be reaching a desired tolerance or a maximum number of iterations.
    *   **Recursive Step:** This is the part of the function where it calls itself, typically with modified arguments that move it closer to the base case.
    *   **Recursion vs. Loops:**
        *   Recursion often provides more elegant and intuitive solutions for problems that are inherently recursive (e.g., tree traversals, quicksort, merge sort).
        *   Iterative solutions (using loops) can sometimes be more efficient in terms of memory usage (avoiding the overhead of multiple function calls on the stack) and may be easier to reason about for simpler, linear problems.
        *   Any problem solvable with recursion can also be solved with iteration, and vice versa, though one approach might be more natural or practical.

### Summation (Recursion)

Based on what we learned from the Newton's method example, consider how the `sum_recursion` function below works. It calculates the sum of elements in a list.

```python
def sum_recursion(data_list):
    # Base case: if the list is empty, its sum is 0
    if len(data_list) == 0:
        return 0
    # Recursive step: sum of the first element and the sum of the rest of the list
    else:
        return data_list[0] + sum_recursion(data_list[1:])

# Example usage:
my_numbers = [1, 2, 3, 4, 5]
total = sum_recursion(my_numbers)
print(f"The sum of {my_numbers} is {total}") # Output: The sum of [1, 2, 3, 4, 5] is 15
```
The function works by:
1.  **Base Case:** If the input list `x` is empty (`len(x) == 0`), it returns `0`.
2.  **Recursive Step:** Otherwise, it returns the sum of the first element `x[0]` and the result of calling `sum_recursion` on the rest of the list `x[1:]`. This progressively shortens the list until the base case is met.

### Finding Square Root (Alternative Recursive Method)

While Newton's method is one way to find a square root, another recursive approach exists.
Mathematically, if we are looking for the square root $r$ of a number $x$, then $r$ must satisfy:
$r = \frac{x}{r}$

If this relation is satisfied, we can manipulate it to find an iterative improvement formula. Suppose we have an estimate $g$ for the square root of $x$. If $g$ is not the true root, then $g$ and $\frac{x}{g}$ will be on opposite sides of the true root (one larger, one smaller, unless $g$ is the root). A better estimate for the root would be their average:
A common derivation starts from $r^2 = x$.
If $g$ is an approximation of $r$, we can try to find a better approximation.
Consider the iterative formula often used, derived from an averaging idea:
If $g$ is our current guess for $\sqrt{x}$, then a possibly better guess is the average of $g$ and $\frac{x}{g}$.
$g_{next} = 0.5 \times (g_{current} + \frac{x}{g_{current}})$

This gives us a recursive relation to refine our guess for the square root:
$r_{new} = 0.5 \times (r_{old} + \frac{x}{r_{old}})$

We can implement this recursively:

```python
def sqrt_recursive(x, guess, tolerance=1e-7, max_iterations=100, current_iteration=0):
    if current_iteration >= max_iterations:
        print("Max iterations reached for sqrt_recursive.")
        return guess
    
    if x < 0:
        raise ValueError("Cannot compute square root of a negative number.")
    if x == 0:
        return 0
        
    new_guess = 0.5 * (guess + x / guess)
    
    print(f"Sqrt Iteration {current_iteration}: guess = {new_guess}")

    if abs(new_guess - guess) < tolerance:
        print("Converged for sqrt_recursive.")
        return new_guess
    else:
        return sqrt_recursive(x, new_guess, tolerance, max_iterations, current_iteration + 1)

# Example usage:
number_to_sqrt = 25
initial_guess_sqrt = 1.0 # An initial guess
approx_sqrt = sqrt_recursive(number_to_sqrt, initial_guess_sqrt)
print(f"The square root of {number_to_sqrt} is approximately {approx_sqrt}")
print(f"Verification: {approx_sqrt}^2 = {approx_sqrt**2}")
```

# Advanced Python: Recursion, Functional Tools, and Generators

## Recursion

### Square Root Calculation

The formula for iteratively approximating a square root, such as by Heron's method, can be expressed as a recursive relation. Consider the relationship:
`2r = r + x/r`
This can be rearranged to find the next approximation for `r`:
`r = 0.5 * (r + x/r)`

This is a recursive relation. If we add superscripts to denote the iteration step, it becomes clearer:
`r_next = 0.5 * (r_current + x / r_current)`

!!! question "Exercise 5.1: Square Root Recursion"
    1. Write a `root_recursion` function to find the square root of a number.
    Hint: Start from finding the square root of 7 and then generalize your function.  

!!! note "Recursive Relations"
    A recursive relation is fundamental in guiding the implementation of a recursion function. You should be very familiar with this concept.

### Fibonacci Sequence

!!! question "Exercise 6.1: Fibonacci Sequence"
    1. 请推导斐波那契数列的通项公式. 它的递推公式为：
       `a_{n+2} = a_{n+1} + a_n`
    2. Please implement a Python function to compute the values of the Fibonacci sequence.
       Hint: you can choose from two common approaches (iterative or recursive).  

### Factorial Calculation
As a final exercise on recursion, let's work on a common, simpler example.

!!! question "Exercise 7.1: Factorial Function"
    1. Please write a function to compute the factorial of a given number.  

## Map, Filter, and Reduce

Let’s start with the familiar `max` function. You already know its basic output:

```python
max(1, 2, 3, 4)
```
Output: `4`

If you try `max` with strings, Python can also determine the "maximum" based on lexicographical order:
```python
max("hello", "world", "Python")
```
Output: `'world'` (Note: In Python 3, "Python" < "hello" < "world" due to ASCII values. The example might intend a different outcome or just show it works with strings).

It also works with iterables like tuples:
```python
max((1, 2, 3))
```
Output: `3`

### Customizing `max` with a Helper Function

If we’re not satisfied with the default behavior (e.g., for strings, we might want the longest string), we can change it by defining a helper function. This function:

*   Takes an element (from the items being compared) as a parameter.
*   Returns the value (the standard) on which we want to sort or find the maximum.

For example, to find the longest string:
```python
def helper(s):
    return len(s)

max("hello", "world", "Python", key=helper)
```
Output: `'Python'`

### Anonymous Functions (`lambda`)

It can be cumbersome to define a named helper function every time we need custom comparison logic. We can use anonymous functions, also known as `lambda` functions, to define these helpers inline.

The syntax is `lambda arguments: expression`.

```python
max("hello", "world", "Python", key=lambda s: len(s))
```
Output: `'Python'`

### `map`, `filter`, and `reduce`

Now let’s turn to three useful higher-order functions often associated with functional programming paradigms.

#### The `map` Function
The `map` function applies a given function to every element of an iterable (like a list or tuple) and returns a map object (an iterator).

```python
list(map(len, ("hello", "world", "Python"))) # Convert map object to list for display
```
Output: `[5, 5, 6]`

#### The `filter` Function
The `filter` function constructs an iterator from elements of an iterable for which a function returns true. Similar to the `key` argument in `max`, we need to provide a function that sets the standard for filtering. This helper function must return a Boolean value (`True` or `False`).

```python
def long_string(s):
    return len(s) > 5

list(filter(long_string, ("hello", "world", "Python", "course"))) # Convert filter object to list
```
Output: `['Python', 'course']`

!!! question "Exercise 8.1: Filter with Anonymous Function"
    1. Replace the named helper function (`long_string`) in the `filter` example above with an equivalent anonymous function (`lambda`).  

#### The `reduce` Function
The last technique is the `reduce` function. Unlike `map` and `filter` (which are built-in), `reduce` needs to be imported from the `functools` module in Python 3.

The `reduce` function applies a binary function (a function that takes two arguments) cumulatively to the items of an iterable, from left to right, so as to reduce the iterable to a single value.

The helper function for `reduce` must:

*   Take two parameters.
*   Return a value of the same type as the accumulated value (often, but not strictly, the same type as the items).

```python
from functools import reduce

reduce(lambda x, y: x + " " + y, ("hello", "world", "Python"))
```
Output: `'hello world Python'`

## Generators

We have learned about iterators. (What is an iterator? An object that implements the iterator protocol, `__iter__()` and `__next__()` methods). Generators provide a special and convenient way to create iterators.

We can create our own generators in two main ways:
1.  Through generator expressions.
2.  Through a generator function.

!!! question "Exercise 9.1: Functions Outputting Generators"
    1. List examples of built-in functions or operations in Python that output generators (or iterators that behave like generators).  

### Generator Expressions

We learned the idea of list comprehensions in Chapter 1. If you use parentheses `()` instead of square brackets `[]` in a comprehension-like syntax, you are not creating a "tuple comprehension." Instead, you are creating a generator expression.

```python
type((x for x in range(5)))
```
Output: `<class 'generator'>`

!!! question "Exercise 10.1: Squares Generator"
    1. Create a generator expression to help compute squares of numbers (e.g., 1, 4, 9, 16, ...).
    2. What is necessary for you to define a generator like this? (Think about the components of a generator expression).  

### Generator Functions

Generator functions are defined like regular functions, but they use the `yield` keyword. Wherever a `yield` statement appears in a function, that function becomes a generator function.

The term `yield` means to give up or surrender something. For example, yield signs on the road tell drivers to give up the right-of-way to other traffic.

In a computer program, when a generator function encounters a `yield` statement, it does something similar:

*   It "yields" a value (this value is sent to the caller).
*   Its state is saved, and its execution is suspended.
*   Other parts of the program can then use the computing resources.

When the generator function is called upon again (e.g., by iterating to the next value), it resumes execution from where it left off, with its state intact, until it encounters another `yield` statement or the function terminates.
```
2ERROR
