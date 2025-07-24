# Chapter 2: Functions

This chapter explores the fundamentals of functions in Python. You will learn:

*   How to define and call simple functions.
*   How functions are stored in memory as objects and the internal processes during a function call.
*   How functions create distinct memory spaces (namespaces) and how Python manages variable accessibility within these spaces.

!!! quote "Key Concept: Functions as First-Order Objects"
    In Python, functions are "first-order objects." This means they can be assigned to variables, passed as arguments to other functions, and returned from functions, just like any other data type (e.g., integers, strings, lists).

## Simple Functions

Let's start by understanding the basics of creating and using functions.

!!! question "Exercise 2.1.1: File Processing for Training Camp"
    Context: You are managing a database for a training camp. Under the `data` folder, there are student information files from 5 classes. Each class has an `age.txt` and a `gender.txt` file.  
    
    1.  Please read in `age.txt` and `gender.txt` from class 1.
    2.  Create a new `.txt` file to store the combined information for class 1.
    3.  Repeat these steps for all other classes.  
    
From the exercise above, you might notice that processing each class involves repetitive tasks. Performing the same operations multiple times has several disadvantages:

*   **Prone to errors:** Copying and pasting code can lead to mistakes.
*   **Hard to modify:** If a change is needed, it must be applied in multiple places.
*   ... and other inefficiencies.

To address this, we learn to abstract repetitive procedures and encapsulate them into **functions**.

### Composition of a Function

A function is designed to perform a specific task, freeing us from repetitive work and improving efficiency. To achieve this, a function typically consists of the following components:

*   **Function Body:** This is the set of instructions that defines what the function does.
*   **Parameters:** Functions often need to operate on different data. Parameters are placeholders for the specific values (arguments) a function will work with when it's called.
*   **Name:** A descriptive name is crucial for identifying and calling the function.
*   **Return Value:** A function can (optionally) send a result back to the caller. We will discuss this in more detail later.

### Defining a Function in Python

Here's the standard Python syntax for defining a function:

```python
def <name>(<parameters>):
    <body>
    returnNone
```

!!! question "Exercise 2.1.2: Define a Function"
    Assemble the code you wrote for Exercise 2.1.1 to define a reusable function that can process the data for any given class.  
    
Once defined, a function is stored in memory, similar to other Python objects like lists or dictionaries. You can try printing the function object itself to see how Python represents it.

!!! info "Analogy to Mathematical Functions"
    Programming functions are conceptually similar to mathematical functions. In mathematics, if we need to repeatedly find the distance between any two points P1=(x₁, y₁) and P2=(x₂, y₂), we define a distance function, for example, `f(P1, P2) = sqrt((x₁ - x₂)² + (y₁ - y₂)²).`

We define functions so we can use (or **call**) them. In mathematics, given two specific points, say (1,2) and (3,4), we evaluate the function `f` by passing these specific values: `f((1,2), (3,4))`. Similarly, in Python, we call a function by its name, providing the necessary arguments.

!!! question "Exercise 2.1.3: Call a Function"
    Call the function you defined in Exercise 2.1.2 and apply it to process the data for class 2.  
    
!!! question "Exercise 2.1.4: Summarize Function Definition"
    Summarize the key steps involved in defining a function in Python.  
    
!!! question "Exercise 2.1.5: List Transformation"
    1.  Define a function that computes the square of each number in a given list. For example, if the input list is `l = [1, 2, 3]`, the function should produce `[1, 4, 9]`.
    2.  Store the new list (the list of squares) for future use.  
    
## Special Topic I: The Python Call Stack

When a function is called in Python, a mechanism known as the call stack manages its execution. Here's an example demonstrating how to inspect the call stack:

```python
import inspect

def print_stack():
    stack = inspect.stack()
    for frame in stack:
        print(f"Function : {frame.function}")
        print(f"Code context: {frame.code_context}") # Note: raw text was 'codecontext'
        print("-" * 80)

print_stack()
```

### Python Function Call Summary

The process of a Python function call can be summarized as follows:

1.  A new local frame is added to the call stack, forming a new environment for the function's execution.
2.  The function's formal parameters are bound to the arguments provided in the function call within this new frame.
3.  The body of the function is executed in this new environment.

!!! info "Source"
    Prof. John DeNero, CS61A, UCB

!!! question "Exercise: Function vs. Function Call"
    How do you distinguish between a function itself (the definition) and a function call (the execution)?  
    
## Special Topic II: Newton's Method

This topic delves into a more mathematical application of functions: finding roots.

Given a function `f(x)`, how can you find a value `x` such that `f(x) = 0`? Newton's method is a widely used iterative algorithm for this purpose.

!!! question "Exercise: Implementing Newton's Method"
    Write a Python function to find a root of the equation `f(x) = 3x² - sin(x) + x = 0`. Start your search around `x = -4.5`. The function should report the root when the approximation error is smaller than a predefined threshold.  
    
### Default Parameter Values

Consider the Newton's method exercise. We might want to set the error bound (threshold) each time we call the function. However, in many scenarios, we prefer to use a consistent default value, for instance, to ensure fairness in comparisons or for convenience.

Only in rare cases do we want to change the valueWe preallocate a value to the function, w
# Python Functions: Advanced Concepts and Scope

This document explores several advanced aspects of functions in Python, including default parameter behaviors, namespaces, variable scope, and the concept of functions as first-class objects.

## Default Parameter Values

In Python, we can assign default values to function parameters. This means if a function is called without providing a value for such a parameter, the default value is used automatically.

```python
def greet(name, message="Hello"):
    print(f"{message}, {name}!")

greet("Alice")  # Output: Hello, Alice!
greet("Bob", "Good morning")  # Output: Good morning, Bob!
```

While convenient, using mutable objects (like lists or dictionaries) as default values can lead to unexpected behavior, as the default value is evaluated only once when the function is defined.

### Mutable Default Arguments: A Common Pitfall

When a mutable object is used as a default argument, it is instantiated only once when the function is defined. Subsequent calls to the function without that argument will reuse the same object.

!!! question "Exercise: Mutable Default Argument Behavior"
    Try the code below. What do you find? Can you explain the behavior?
    ```python
    def append_to(element, to=[]):
        to.append(element)
        return to

    my_list = append_to(12)
    print(my_list)

    my_other_list = append_to(42)
    print(my_other_list)
    ```

!!! note "Best Practice for Mutable Defaults"
    To avoid unintended sharing of mutable default arguments, the common practice is to use `None` as a default and create a new mutable object inside the function if the argument is `None`.
    ```python
    def append_to_safer(element, to=None):
        if to is None:
            to = []
        to.append(element)
        return to
    ```

## Closures and Scope in Nested Functions

Python allows defining functions inside other functions. These inner functions can capture and remember the values of variables from their enclosing (outer) function's scope, even if the outer function has finished execution. This is known as a closure.

However, care must be taken when defining functions in a loop, especially if these functions refer to loop variables. This can lead to "late binding" issues where all created functions end up using the last value of the loop variable.

!!! question "Exercise: Function Factories and Late Binding"
    Consider the following code. What will `ff[3]()` output? Why? How could you modify it so each function `f` "remembers" the value of `i` at the time of its creation?
    ```python
    ff = {}
    for i in range(5):
        def f():
            return i
        ff[i] = f

    # What does this print?
    # print(ff[3]()) 
    ```
    **Hint:** Think about when `i` is evaluated by the inner function `f`.

## Namespaces and Variable Scope

Understanding namespaces and scope is crucial for writing correct and maintainable Python code.

A **namespace** is a system that holds a collection of names (identifiers) and maps them to objects. Think of it as a dictionary where keys are names and values are the objects they refer to. Python uses several namespaces, such as:

*   **Built-in Namespace**: Contains built-in functions and constants (e.g., `print()`, `len()`, `True`).
*   **Global Namespace**: Specific to a module. Contains names defined at the top level of a module or script.
*   **Local Namespace**: Specific to a function call. Contains names defined within that function (arguments, local variables).
*   **Enclosing Namespace**: For nested functions, this is the local namespace of any and all enclosing functions.

**Scope** refers to the region of a program where a particular namespace can be accessed directly (i.e., without needing to prefix it).

### Understanding Namespaces

Objects in Python primarily reside in heap memory, while the names that refer to these objects typically live in stack frames associated with function calls. Namespaces provide the mapping.

!!! question "Exercise: Swapping Variables and Inspecting Namespaces"
    1.  Write a Python function to swap the values of two variables `a` and `b`. For example, if `a=1` and `b=2` initially, after swapping, `a` should be `2` and `b` should be `1`.
    2.  Analyze your function. What namespaces are involved? How would you inspect the names within the `globals` and `builtins` namespaces?
        ```python
        # Example for inspection (run this in a Python interpreter or script)
        # import builtins
        # print(type(builtins), dir(builtins))
        # print(dir()) # Shows names in the current scope (often globals at top level)
        #
        # def my_swap_function(x, y):
        #     # Your swap logic here
        #     print("Inside function, locals:", locals())
        #     return x, y # Example, needs correct swap
        #
        # a_val = 10
        # b_val = 20
        # print("Before swap, globals contain 'a_val':", 'a_val' in globals())
        # a_val, b_val = my_swap_function(a_val, b_val)
        # print(f"After swap: a_val={a_val}, b_val={b_val}")
        ```

!!! question "Exercise: Inspecting the Local Namespace"
    How do you check the objects (names) currently defined within the local namespace of a function?

!!! info "Inspecting Namespaces"
    *   `globals()`: Returns a dictionary representing the current global namespace.
    *   `locals()`: Returns a dictionary representing the current local namespace.
    *   `dir()`: Without arguments, returns a list of names in the current local scope. With an object as an argument (e.g., `dir(builtins)`), it returns a list of valid attributes for that object.

### Scope of a Variable: The LEGB Rule

When Python encounters a variable name, it searches for it in a specific order of scopes. This is commonly known as the **LEGB rule**:

1.  **L**ocal: The current function's namespace.
2.  **E**nclosing function locals: Namespaces of any enclosing functions, from the innermost to outermost.
3.  **G**lobal: The namespace of the module containing the code.
4.  **B**uilt-in: The namespace containing Python's built-in functions and constants.

The interpreter stops at the first place the name is found. If the name isn't found in any of these scopes, a `NameError` is raised.

The `global` keyword can be used to indicate that a variable inside a function refers to a global variable. The `nonlocal` keyword (for nested functions) indicates that a variable refers to a variable in an enclosing (but not global) scope.

!!! question "Exercise: Variable Shadowing"
    What will the following code output? How can you ensure the built-in `max` function is used in the second `print` call, even after `max` has been reassigned?
    ```python
    print(max(1, 2))
    max = min  # Reassigning the name 'max'
    # print(max(1, 2)) # What happens here?
    ```

!!! question "Exercise: Purpose of Variable Scopes"
    Consider the following questions regarding variable scopes:
    1.  How does Python manage object lifetimes (e.g., through reference counting)? How does scope influence this?
        *   **Hint:** Think about avoiding unnecessary global variables.
    2.  Referring back to the "Function Factories and Late Binding" exercise (with `ff` and `f`), how could you explicitly ensure the inner function uses a variable from its enclosing scope that is *not* the loop variable `i` itself, but rather a copy of `i`'s value at each iteration?
        *   **Hint:** Consider default arguments to the inner function or using `nonlocal` with helper variables.
    3.  How do scopes help in "information hiding" or preventing unintended modification of variables from other parts of your code?
        *   **Hint:** The LEGB rule itself enforces a certain level of encapsulation.

## Functions as First-Class Objects

In Python, functions are "first-class objects." This means they can be:

*   Assigned to variables.
*   Stored in data structures (like lists or dictionaries).
*   Passed as arguments to other functions.
*   Returned as values from other functions.

Functions that operate on other functions (by taking them as arguments or returning them) are called **higher-order functions**.

### Functions as Return Values

A function can define an inner function and return it. The returned inner function often forms a closure, remembering its enclosing scope.

```python
def intercept_b(b):
    # b is 'captured' by slope_m_times_x
    def slope_m_times_x(x, m=2): # Example with slope m
        return m * x + b
    return slope_m_times_x

# Create a linear function with intercept 1
linear_func_b1 = intercept_b(1)
# Call the returned function
result = linear_func_b1(3) # Calculates 2*3 + 1
print(result) # Output: 7

linear_func_b5_m3 = intercept_b(5)
result2 = linear_func_b5_m3(3, m=3) # Calculates 3*3 + 5
print(result2) # Output: 14
```

### Functions as Arguments

You can pass functions as arguments to other functions. This is a powerful technique for customizing behavior.

```python
def call_counter(func_to_call, call_state={'count': 0}):
    call_state['count'] += 1
    print(f"Calling '{func_to_call.__name__}' for the {call_state['count']} time(s).")
    func_to_call()

def say_hello():
    print("Hello there!")

call_counter(say_hello)
call_counter(say_hello)
```

!!! question "Exercise: Enhancing Higher-Order Functions"
    1.  Modify the `intercept_b` (renamed from `intercept_1`) code example above so that the user can select the intercept `b` when creating the linear function. (This is already demonstrated in the example above).
    2.  Further modify the `intercept_b` example so that the user can also select the slope `m` when *creating* the `slope_m_times_x` function (i.e., `m` should also be a parameter to `intercept_b`).
    3.  Modify the `call_counter` example so that it does not use a mutable default argument for `call_state`. How can you achieve similar stateful behavior more safely or explicitly?

### Passing Arguments to Functions within Higher-Order Functions

In the `call_counter` example, the `func_to_call` was called without any arguments. What if the function we want to count calls for itself requires arguments?

Consider this initial approach:

```python
def simple_call_with_arg(func, arg_for_func, state={'calls':0}):
    state['calls'] += 1
    print(f"Call number {state['calls']}")
    func(arg_for_func)

# Example usage (note: print is a built-in function)
# simple_call_with_arg(print, "hello")
# simple_call_with_arg(print, "python")
# simple_call_with_arg(print, "world")
```
This works if `func` always takes exactly one argument. But what if it takes a variable number of arguments, or keyword arguments?

#### Arbitrary Positional Arguments: `*args`

When you are not sure how many positional arguments a function might receive (or need to pass on), you can use `*args`.
*   In a function definition, `*args` collects any extra positional arguments into a tuple named `args`.
*   In a function call, `*iterable` unpacks the elements of `iterable` as individual positional arguments.

The `*` operator is generally known as the packing (in function definition) or unpacking (in function call) operator for positional arguments.

!!! question "Exercise: Understanding Unpacking with `*`"
    How do the following assignments and print statements differ in their behavior and output?
    ```python
    a = 1, 2, 3       # What is 'a'?
    print(a)

    x, y, z = 1, 2, 3 # Multiple assignment
    print(x, y, z)

    # p, q = 1, 2, 3    # What happens here? ValueError

    r, *s, t = 1, 2, 3, 4, 5 # Extended iterable unpacking
    print(r, s, t)      # What are r, s, and t?
    ```

!!! question "Exercise: Unpacking Patterns"
    Summarize the pattern of `*` in assignments by considering these cases. What are the types and values of the variables after each assignment?
    ```python
    # Case 1
    # *a, b = 1, 2, 3, 4, 5
    # print(f"a: {a}, b: {b}")

    # Case 2
    # a, *b = 1, 2, 3, 4, 5
    # print(f"a: {a}, b: {b}")

    # Case 3
    # *a, = 1, 2, 3, 4, 5 # Note the comma after *a
    # print(f"a: {a}")

    # Case 4
    # a, *b, c = 1, 2, 3, 4, 5
    # print(f"a: {a}, b: {b}, c: {c}")

    # Case 5: What happens if there aren't enough items for non-starred variables?
    # *a, b = 1 # Raises TypeError
    # print(f"a: {a}, b: {b}")
    ```

Note that when `*s` is used on the left side of an assignment, `s` becomes a list. When `*some_sequence` is used in a function call, it unpacks `some_sequence` into individual arguments.

Passing an indefinite number of arguments to a function often involves two steps:
1.  **Packing**: In the function definition, `*args` gathers multiple arguments into a tuple.
2.  **Unpacking**: If you then call another function with these gathered arguments, you might use `*args` again to unpack them.

Here's an updated `call_counter` using `*args`:
```python
def call_counter_with_args(func, *args_for_func, call_state={'count': 0}): # DANGER: mutable default
    call_state['count'] += 1
    print(f"Calling '{func.__name__}' (call #{call_state['count']}) with args: {args_for_func}")
    func(*args_for_func) # Unpacking args_for_func

# Example (using a safer way to handle call_state if this were production code)
# call_counter_with_args(print, "hello", "python", "world")
# call_counter_with_args(print, "Data:", 1, 2, 3, sep="-")
```
In the second call above, `print("Data:", 1, 2, 3, sep="-")` is effectively called.

#### Arbitrary Keyword Arguments: `**kwargs`

Similar to `*args` for positional arguments, `**kwargs` is used for keyword arguments.
*   In a function definition, `**kwargs` collects any keyword arguments that are not explicitly named parameters into a dictionary named `kwargs`.
*   In a function call, `**dictionary` unpacks the key-value pairs from `dictionary` as individual keyword arguments.

These named arguments must be passed to a function with the form `param_name=value`. Unlike `*args` which collects arguments into a tuple, `**kwargs` collects them into a dictionary.
# Advanced Function Arguments: `**kwargs` and Dictionary Unpacking

Continuing our discussion on function arguments, where `*args` collects positional arguments into a tuple, `**kwargs` plays a similar role for keyword arguments, collecting them into a dictionary.

## Keyword Arguments (`**kwargs`)

Keyword arguments are those passed to a function using the `parameter_name=value` syntax. When a function definition includes `**kwargs` as a parameter, it gathers any keyword arguments provided during the function call that do not correspond to other explicitly named parameters. These collected arguments are stored in a dictionary, where `kwargs` becomes the name of this dictionary.

!!! note "Key Concept: `**kwargs`"
    `**kwargs` (keywords arguments) allows a function to accept an arbitrary number of keyword arguments. Inside the function, `kwargs` will be a dictionary where keys are the argument names (as strings) and values are the argument values.

## Unpacking Dictionaries with `**`

Just as the `*` operator unpacks iterables (like lists or tuples) into individual positional arguments, the `**` operator unpacks dictionaries. This is useful for passing the items of a dictionary as keyword arguments to a function, or for merging multiple dictionaries.

While there might be fewer common direct use cases for unpacking a dictionary into function arguments compared to unpacking a list, it is particularly useful for merging dictionaries:

```python
dict1 = {"a": 1, "b": 2, "c": 3}
dict2 = {"d": 4, "e": 5, "f": 6}
combined_dict = {**dict1, **dict2}
# combined_dict will be {'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6}
```

!!! info "Applications of Dictionary Unpacking"
    Dictionary unpacking with `**` is highly effective for:
    *   Passing a pre-defined set of options from a dictionary to a function.
    *   Creating new dictionaries by merging or extending existing ones.
    *   Forwarding keyword arguments from one function to another, especially in decorators or wrapper functions.

## Order of Parameters and Arguments

The sequence in which different types of arguments are passed to a function and parameters are defined is strictly enforced in Python.

!!! quote "Important Rule: Argument Order"
    When calling a function, positional (unnamed) arguments must always precede keyword arguments.

This principle also extends to function definitions:

1.  Standard positional parameters.
2.  `*args` (for arbitrary positional arguments).
3.  Keyword-only parameters (parameters that must be specified by name, typically appearing after `*args` or a bare `*`).
4.  `**kwargs` (for arbitrary keyword arguments).

Additionally, within the parameter list of a function definition:

*   Parameters with default values must always follow parameters that do not have default values.

## In-Class Exercise: Summing Named Arguments

!!! question "Exercise: Sum of `**kwargs` Values"
    Remember that `**kwargs` in a function signature results in `kwargs` being a dictionary within the function. This dictionary holds all keyword arguments passed to the function that weren't explicitly defined in the function's parameter list. Like any dictionary, `kwargs` consists of key-value pairs.

    For more background on dictionary types in Python, you can consult the [official Python documentation on dictionaries](https://docs.python.org/3/library/stdtypes.html#dict).

    **Task:**
    Write a Python function named `sum_of_kwargs` that accepts an arbitrary number of named arguments. Assume the values associated with these named arguments will be numbers. The function should calculate and return the sum of these numeric values.

    For example:
    ```python
    def sum_of_kwargs(???):  # Define the correct parameter(s) here
        # Your implementation to sum the values from kwargs
        pass

    # Example usage (should work after you implement the function):
    # total = sum_of_kwargs(Alice=5, Bob=3, Charlie=4)
    # print(total)  # Expected output: 12
    #
    # total_2 = sum_of_kwargs(apple=10, banana=20, orange=30, grape=5)
    # print(total_2) # Expected output: 65
    ```
    Think about how you would iterate through the values of the `kwargs` dictionary to achieve this.

## A Thought on Tools

!!! quote "The Assembly and Creation of Tools"
    The assembly of tools. The creation of tools.
    
    *Source: Reflections inspired by '2001: A Space Odyssey' as discussed in [NYTimes](https://cn.nytimes.com/culture/20180515/2001-a-space-odyssey-kubrick/)*
