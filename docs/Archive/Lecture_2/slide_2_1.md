# 2.1 Functions

## What You Will Learn
In this chapter, you will explore:
-   How to define and call simple functions.
-   How functions, as objects (chunks of memory), are stored and what happens internally when you call a function.
-   How functions naturally divide memory into smaller pieces (frames) and how names (variables) exist within these spaces. You'll learn how Python manages these spaces and controls the accessibility of variables.

!!! quote "Central Theme"
    “Functions are first-order objects.”

## 2.1 Simple Functions

!!! question "Exercise 2.1.1: Review (read text file, work with dict)"
    Context: You are managing a database for a training camp. Under the `data` folder, there are students information from 5 classes. Each class has an `age.txt` and `gender.txt`.  
    1. Please read in the `age.txt` and `gender.txt` from class 1.
    2. Make a new `.txt` file to store the information of class 1.
    3. Repeat the steps for the other classes.  

You might notice that for each class in the exercise above, the task is repetitive. This means the same or very similar code is used multiple times. What are the disadvantages of such repetition?
-   Prone to errors (e.g., a mistake in one copy might not be fixed in others).
-   Hard to modify (e.g., if the logic needs to change, it must be changed in many places).
-   Less readable and harder to maintain.

To address these issues, we learn to abstract the procedure and encapsulate it into a **function**.

### Anatomy of a Function
A function is a block of organized, reusable code that is used to perform a single, related action. Functions provide better modularity for your application and a high degree of code reusing.

A function is typically composed of:
-   **Function Name**: A unique identifier for the function.
-   **Parameters (or Arguments)**: Variables that hold values passed to the function when it is called. These allow a function to operate on different data.
-   **Function Body**: The sequence of statements that define the operations the function performs.
-   **Return Value**: The value that the function sends back to the caller after its execution. If no return value is specified, a Python function returns `None`.

### Defining Functions in Python
Here’s the basic syntax for defining a function in Python:

```python
def <name>(<parameters>):
    <body>
    return None # Or some other value
```
-   `def` keyword indicates the start of a function definition.
-   `<name>` is the function's name.
-   `<parameters>` is an optional list of input parameters, enclosed in parentheses.
-   The `<body>` consists of one or more valid Python statements.
-   `return` statement optionally returns a value from the function.

!!! question "Exercise 2.1.2: Assemble the Code"
    Assemble the code from Exercise 2.1.1 to define a function that can process the data for any given class.  

### Functions as Objects
Once defined, a function is stored in memory just like other objects (e.g., numbers, strings, lists). You can, for example, print the function object itself to see how Python represents it:
```python
def my_example_function():
    pass

print(my_example_function)
```

!!! info "Analogy from Mathematics"
    Programming functions are analogous to mathematical functions.
    In mathematics, if we need to repeatedly find the distance between any two points $P_1=(x_1,y_1)$ and $P_2=(x_2,y_2)$, we define a distance function $f(P_1,P_2) = \sqrt{(x_1-x_2)^2 + (y_1-y_2)^2}$.
    We define functions so we can reuse them with different inputs.

### Calling Functions
To use a function, you **call** it. This means executing the function's body.
In mathematics, given two specific points, say $(1,2)$ and $(3,4)$, we evaluate the function $f$ by passing these values to it: $f((1,2), (3,4))$. Similarly, in Python, you call a function by using its name followed by parentheses `()`. If the function accepts parameters, you pass arguments inside the parentheses.

!!! question "Exercise 2.1.3: Call Your Function"
    Call the function you defined in Exercise 2.1.2 and apply it to process the data for class 2.  

!!! question "Exercise 2.1.4: Steps to Define a Function"
    Summarize the steps involved in defining a function in Python.  

!!! question "Exercise 2.1.5: Squaring List Elements"
    1. Define a function that computes the square of all numbers in a list. For example, if the input list is `l = [1, 2, 3]`, the function should produce `[1, 4, 9]`.
    2. Store the new list returned by the function for future use.  

### Special Case I: Default Parameter Values
Sometimes, a function parameter usually takes a common value. Instead of requiring the caller to provide this value every time, you can set a **default parameter value** in the function definition.

For example, if we were writing the Newton's method function (discussed later), we might often use a standard error tolerance. We can set this as a default:
```python
def newtons_method(target_func, initial_guess, tolerance=1e-6):
    # ... implementation ...
    pass
```
Here, `tolerance` will be `1e-6` unless a different value is provided when calling `newtons_method`.

!!! question "Exercise 2.1.6: Default Mutable Arguments"
    Try the code below. What do you find? Can you explain why it behaves this way?  
    ```python
    def append_to(element, to=[]):
        to.append(element)
        return to

    my_list = append_to(12)
    print(my_list)

    my_other_list = append_to(42)
    print(my_other_list)
    ```  

!!! warning "Pitfall: Mutable Default Arguments"
    Default arguments are evaluated only once when the function is *defined*, not each time it's *called*. If a default argument is a mutable object (like a list or dictionary), and you modify it in place within the function (as in `to.append(element)`), that modification will persist across subsequent calls that use the default. This is a common source of unexpected behavior.

    A common idiom to avoid this is to use `None` as the default and create the mutable object inside the function if it's `None`:
    ```python
    def append_to_corrected(element, to=None):
        if to is None:
            to = []
        to.append(element)
        return to
    ```

### Special Case II: Closures and Late Binding in Loops
When defining functions inside loops, especially functions that refer to the loop variable, be aware of how Python handles variable lookup in closures.

!!! question "Exercise 2.1.7: Closures and Late Binding"
    Try the code below. What do you find? Can you explain the output?  
    ```python
    ff = {}
    for i in range(5):
        def f():
            return i  # This 'i' is looked up when f() is called
        ff[i] = f

    # What do you expect ff[3]() to return?
    # What does it actually return?
    print(f"ff[3]() returns: {ff[3]()}") 
    
    # What about other functions in the dictionary?
    # print(f"ff[0]() returns: {ff[0]()}")
    # print(f"ff[1]() returns: {ff[1]()}")
    # All will return the final value of 'i' from the loop.
    ```  

!!! note "Late Binding in Closures"
    The behavior in Exercise 2.1.7 is due to **late binding**. The variable `i` inside the function `f` is not looked up when `f` is *defined*, but when `f` is *called*. By the time any of the functions (e.g., `ff[3]`) are called, the `for` loop has completed, and `i` has its final value from the loop (which is 4, as `range(5)` goes from 0 to 4).

    To capture the value of `i` at the time of function definition, you can use a default argument, which is evaluated at definition time:
    ```python
    # Corrected version using a default argument
    ff_corrected = {}
    for i in range(5):
        def f_corrected(captured_i=i): # 'i' is evaluated here, at definition time
            return captured_i
        ff_corrected[i] = f_corrected
    
    print(f"ff_corrected[3]() returns: {ff_corrected[3]()}") # Expected: 3
    print(f"ff_corrected[0]() returns: {ff_corrected[0]()}") # Expected: 0
    ```

## Special Topic I: The Python Call Stack

!!! info "Understanding Program Execution Flow"
    When your Python program runs, especially when functions call other functions (which may, in turn, call more functions), Python needs a way to keep track of "where it is" and "where to return to." This is managed using a **call stack**. Each time a function is called, a new **frame** is added to the top of the stack. This frame stores information specific to that function call, such as its local variables and the point in the code where the function should resume after an inner function call returns. When a function finishes and returns, its frame is removed from the stack.

### Visualizing the Call Stack
The `inspect` module can be used to get information about the call stack.

```python
import inspect

def innermost_function():
    print("Inside innermost_function. Current stack:")
    stack = inspect.stack()
    for frame_info in stack:
        print(f"  Function: {frame_info.function}, File: {frame_info.filename}, Line: {frame_info.lineno}")
        if frame_info.code_context:
            print(f"    Code context: {frame_info.code_context[0].strip()}")
    print("-" * 80)

def middle_function():
    print("Inside middle_function, calling innermost_function.")
    innermost_function()
    print("Returned to middle_function.")

def outermost_function():
    print("Inside outermost_function, calling middle_function.")
    middle_function()
    print("Returned to outermost_function.")

# Calling the outermost function to see a deeper stack
outermost_function()

# Original example from notes:
# def print_stack():
#     stack = inspect.stack()
#     for frame in stack: # 'frame' is a FrameInfo object
#         print(f"Function : {frame.function}")
#         print(f"Code context: {frame.code_context}")
#         print("-" * 80)
# print_stack() # Calling print_stack directly from the global scope
```

### How Python Executes a Function Call
Here's a summary of what happens during a Python function call:
1.  A new local frame is created and added to the call stack. This frame represents the current function call and forms a new environment for execution.
2.  The function's formal parameters (the names in the `def` statement) are bound to the arguments (the values passed in the call) within this new local frame.
3.  The body of the function is executed in this new environment (using the local frame for local variable storage and lookup).
4.  When the function returns (either explicitly with `return` or implicitly at the end of the body), or if an unhandled exception occurs, its frame is removed from the call stack, and control returns to the caller.

*(Source: Prof. John DeNero, CS61A, UCB)*

!!! question "Exercise Special Topic.1: Distinguishing Function from Function Call"
    How do you distinguish between referring to a function itself (as an object) and actually calling (executing) a function in Python code?  

## Special Topic II: Newton's Method

This section introduces Newton's method, a powerful numerical algorithm for finding roots of real-valued functions.

!!! info "Mathematical Context: Finding Roots"
    Given a differentiable function $f(x)$, a "root" of the function is a value $x_0$ such that $f(x_0) = 0$.
    Newton's method (also known as the Newton-Raphson method) is an iterative technique. It starts with an initial guess $x_n$ for the root and uses the function's derivative $f'(x)$ to find a better approximation $x_{n+1}$:
    $x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}$
    This process is repeated until the desired level of accuracy is achieved.

!!! question "Exercise Special Topic.2: Root Finding with Newton's Method"
    Write a Python function to find a root of the function $f(x) = 0.3x^2 - \sin(x) + x$ near an initial guess of $x_0 = -4.5$.
    Your function should iterate, refining the guess. Stop and report the root when the absolute difference between successive approximations (i.e., $|x_{n+1} - x_n|$) is smaller than a specified tolerance (e.g., $10^{-6}$). You will also need the derivative of $f(x)$, which is $f'(x) = 0.6x - \cos(x) + 1$.  

## 2.2 Namespaces and Scope

We've learned that the Python interpreter binds names (like variable names or function names) to objects (the actual data or code in memory). Objects mostly reside in an area of memory called the heap, while names "live" in namespaces, often associated with frames on the call stack.

### What are Namespaces?
A **namespace** is a mapping from names to objects. Think of it as a dictionary where the keys are the names (strings) and the values are the objects these names refer to. Namespaces are crucial for organizing names and preventing naming conflicts.
Python uses several namespaces, including:
-   **Built-in Namespace**: Contains built-in functions (`len()`, `print()`) and exceptions. It's created when the Python interpreter starts.
-   **Global Namespace**: Pertains to a single module. Names defined at the top level of a module (or script) go into this namespace. It's created when the module definition is read.
-   **Local Namespace**: Created when a function is called. It holds names defined within that function (parameters and local variables). It's deleted when the function returns.
-   **Enclosing Function Locals**: For nested functions, Python also considers the namespaces of any enclosing functions.

A related concept is **scope**, which defines the textual region of a Python program where a namespace can be accessed directly (without a prefix).

!!! question "Exercise 2.2.2.1: Swapping Values and Namespace Analysis"
    1. Write a Python function that attempts to swap the values of two variables passed into it. For example, if you have `x = 10, y = 20` in the calling scope, and you call `swap(x, y)`, does it change `x` and `y` in the calling scope? Why or why not?
    (Note: Python's direct tuple assignment `x, y = y, x` works for swapping in the same scope. This exercise explores function argument passing mechanics.)
    2. Analyze your function: what variable names are introduced? In which namespace(s) (local to the function, global, etc.) do they live? How does this relate to the (im)mutability of the objects being passed?  

### Inspecting Namespaces
You can programmatically inspect the contents of various namespaces.

```python
import builtins

# Built-in namespace
print(f"Type of 'builtins' module: {type(builtins)}")
# print(f"Some contents of 'builtins': {dir(builtins)[:20]}...") # Shows attributes of the module object

# Global namespace (for the current module)
# globals() returns a dictionary representing the current global symbol table.
print(f"\nType of globals(): {type(globals())}")
# print(f"Some global names: {list(globals().keys())[:10]}...")

# Local namespace (within a function)
def example_local_scope():
    local_var = "I am local"
    # locals() returns a dictionary representing the current local symbol table.
    print(f"\nInside example_local_scope:")
    print(f"  Type of locals(): {type(locals())}")
    print(f"  Local names: {list(locals().keys())}")
    print(f"  Value of local_var: {locals()['local_var']}")

example_local_scope()
```

!!! question "Exercise 2.2.2.2: Checking the Local Namespace"
    How do you check the objects (names and their bound values) in the current local namespace from within a Python function?  
    (Hint: Python provides a built-in function for this.)

### Scope of a Variable (LEGB Rule)
When your code uses a name (e.g., `my_variable`), Python needs to find the object that this name refers to. The interpreter searches for the name in a specific order of scopes, known as the **LEGB rule**:

1.  **L**ocal: The current function's local namespace. This is searched first.
2.  **E**nclosing function locals: If the current function is nested within other functions, Python searches the local namespaces of these enclosing functions, from the innermost to the outermost.
3.  **G**lobal: The global namespace of the current module.
4.  **B**uilt-in: The built-in namespace, which contains predefined Python names.

If the name is not found after searching all these scopes, Python raises a `NameError` exception.

**Keywords related to scope modification:**
-   `global name`: Declares that `name` inside a function refers to a name in the global scope.
-   `nonlocal name`: Declares that `name` inside a nested function refers to a name in an enclosing function's scope (but not the global scope).

!!! question "Exercise 2.2.2: Name Shadowing"
    What will the following code output? How can you "fix" it so that the second `print` call uses the built-in `max` function again (assuming the re-assignment was a mistake)?  
    ```python
    print(max(1, 2))  # Uses built-in max

    max = min         # 'max' in the global scope now refers to the built-in 'min' function
    print(max(1, 2))  # What does this call?
    ```  

!!! note "Placeholders"
    The original notes mentioned "A long example" and "A more complicated example" here, but no code was provided. These are omitted.

!!! question "Exercise 2.2.2.3: Purpose of Variable Scopes"
    Consider the following questions about the importance and utility of variable scopes:  
    1. How do scopes influence Python's memory management, particularly reference counting and garbage collection?  
        *   *Guidance: Think about how limiting variable lifetime (e.g., local variables ceasing to exist after a function returns) helps in managing resources. Why is it generally good practice to avoid excessive use of global variables?*
    2. Recall the "Closures and Late Binding" example (Exercise 2.1.7). How could you modify the function factory (the `for` loop creating functions) to correctly capture the loop variable `i` using the `nonlocal` keyword within a helper nested function, instead of the default argument trick?  
        *   *Guidance: This involves defining a nested function that modifies a variable from its enclosing (but non-global) scope.*
    3. How do variable scopes contribute to information hiding and encapsulation, reducing the chances of unintended interactions between different parts of a program?  
        *   *Guidance: Consider how the LEGB rule helps isolate names and prevent accidental modification of, for example, global variables from within functions unless explicitly stated.*  

## 2.3 Functions as First-Class Objects

In Python, functions are **first-class objects**. This is a fundamental concept with significant implications.

### What are First-Class Objects?
An entity is a "first-class object" (or "first-class citizen") in a programming language if it supports all the operations generally available to other entities. For functions, this means they can be:
-   Assigned to a variable or an element in a data structure.
-   Passed as an argument to other functions.
-   Returned as the result of other functions.

Essentially, you can treat functions just like any other data type, such as integers, strings, or lists.

### Higher-Order Functions
Functions that operate on other functions, either by taking them as arguments or by returning them, are called **higher-order functions**.

#### Functions as Return Values
A function can define an inner function and return it. The returned inner function "remembers" the environment in which it was created (this is related to closures).

```python
def make_adder(n):
    # This is the outer function. 'n' is in its local scope.
    def adder(x):
        # This is the inner function. It "closes over" 'n'.
        return x + n
    return adder # Return the inner function object

add_5 = make_adder(5)   # add_5 is now a function that adds 5 to its argument
add_10 = make_adder(10) # add_10 is a function that adds 10

print(f"add_5(100) = {add_5(100)}")  # Output: 105
print(f"add_10(100) = {add_10(100)}") # Output: 110
```
The original example (`intercept_1`, `slope_2`) has been replaced with a more standard `make_adder` example for clarity on returning functions.

#### Functions as Arguments
You can pass function objects as arguments to other functions.

```python
# Original example from notes (with slight modification for clarity of x)
def call_counter(func_to_call, counter_state={'count': 0}): 
    # Using a dictionary for counter_state to make it mutable and shared if needed
    # Note: A mutable default argument like this shares state across all calls
    # that don't provide their own counter_state.
    counter_state['count'] += 1
    print(f"Calling {func_to_call.__name__} (invocation #{counter_state['count']})")
    func_to_call()

def say_hello():
    print("Hello, world!")

def say_goodbye():
    print("Goodbye, world!")

# First call to call_counter, uses default counter_state
call_counter(say_hello) # count becomes 1
call_counter(say_goodbye) # count becomes 2 (shared state)

# If you want independent counters, you'd manage state differently, e.g., pass it in
# or use a class or a factory that creates fresh state.
# The original notes used x=[0], which has similar shared mutable state behavior.
# def call_count (func,x=[0]):
#     print(f"calling {x[0]+1}times")
#     x[0]+=1
#     func()
```

!!! question "Exercise 2.3.1: Modifying Higher-Order Functions"
    1.  Modify the `make_adder` example (or the original `intercept_1`/`slope_2` if you prefer) so that you can specify the value to be added (the "intercept" or `n`) when you *create* the adder function. (The `make_adder(n)` example already does this.)
    2.  Imagine `make_adder` created a function `y = slope*x + n`. Modify it so that both `slope` and `n` can be set when `make_adder` is called.
    3.  Modify the `call_counter` example (or the original `call_count` with `x=[0]`) so that it does *not* rely on a mutable default parameter for counting state. Consider how a closure with `nonlocal`, or a simple class, could achieve independent counting or explicitly managed state.  

### Special Case III: Arbitrary Argument Lists (`*args` and `**kwargs`)

Sometimes, you need to define a function that can accept a variable number of arguments.
-   `*args`: For a variable number of *positional* arguments.
-   `**kwargs`: For a variable number of *keyword* arguments.

Consider the `call_counter` example. What if the function being counted (`func_to_call`) itself requires arguments?

```python
# Original example from notes, slightly adjusted for counter logic
def call_count_with_single_arg(func, arg_for_func, x=[0]): 
    x[0] += 1
    print(f"Calling function (invocation #{x[0]})")
    func(arg_for_func)

call_count_with_single_arg(print, "Hello from call_count_with_single_arg!")
call_count_with_single_arg(print, "Python is flexible.")
call_count_with_single_arg(print, "This is the third call.")
```

If we don't know how many arguments `func` might take, or what their names are, we use `*args` and `**kwargs`.

#### The `*` Operator (Packing/Unpacking Iterables)
In a function definition, `*args` collects any extra positional arguments into a tuple.
In a function call, `*some_iterable` unpacks `some_iterable` into individual positional arguments.

!!! question "Exercise 2.3.2: Understanding Unpacking with *"
    How do the following assignments differ? What are the types and values of the variables in each case?  
    ```python
    a = 1, 2, 3              # What is 'a'? (Tuple packing)
    x, y, z = a              # Standard tuple unpacking
    
    # Extended iterable unpacking (Python 3.x)
    first, *rest, last = [10, 20, 30, 40, 50] 
    # What are 'first', 'rest', and 'last'?
    
    # Example from notes:
    # a, *b, c = 1, 2, 3, 4, 5
    # What are a, b, c here?
    ```  

!!! question "Exercise 2.3.3: Summarizing Unpacking Patterns"
    Explain the general pattern of extended iterable unpacking by considering examples like:  
    ```python
    # head, *tail = [1, 2, 3, 4, 5]
    # *leading, last = [1, 2, 3, 4, 5]
    # first, *middle, penultimate, last = [1, 2, 3, 4, 5, 6]
    
    # Invalid syntax from notes:
    # *a, *b = 1, 2, 3, 4, 5  # Cannot have two starred expressions in an assignment target
    
    # Consider edge cases:
    # *a, b = [1] # What are a and b? (a will be empty list, b will be 1)
    # a, *b = [1] # What are a and b? (a will be 1, b will be empty list)
    ```  

Note that if `my_elements = [10, 20, 30]`, then `*my_elements` used in a function call like `some_function(*my_elements)` is equivalent to `some_function(10, 20, 30)`.

**Using `*args` in function definitions:**

```python
# Adjusted original call_count for *args
def call_count_with_many_pos_args(func_to_call, *args_for_func, counter_list=[0]):
    counter_list[0] += 1
    print(f"Calling function (invocation #{counter_list[0]})")
    # args_for_func is a tuple containing all extra positional arguments
    func_to_call(*args_for_func) # Unpack the tuple when calling func_to_call

call_count_with_many_pos_args(print, "Hello", "Python", "World", sep=", ") # print will receive "Hello", "Python", "World", sep=", "
call_count_with_many_pos_args(print, 1, 2, 3, 4, 5, sep=" - ")
```

#### The `**` Operator (Packing/Unpacking Dictionaries for Keyword Arguments)
In a function definition, `**kwargs` collects any extra keyword arguments into a dictionary.
In a function call, `**some_dictionary` unpacks `some_dictionary` into individual keyword arguments.

A common use case for `**` (unpacking) is merging dictionaries (Python 3.5+):
```python
dict1 = {"a": 1, "b": 2}
dict2 = {"c": 3, "d": 4, "a": 10} # 'a' from dict2 will override 'a' from dict1

# Merging dictionaries
combined_dict = {**dict1, **dict2}
print(combined_dict)  # Output: {'a': 10, 'b': 2, 'c': 3, 'd': 4}

# In Python 3.9+, you can also use the merge operator:
# combined_dict_py39 = dict1 | dict2 
# print(combined_dict_py39)
```

#### Order of Parameters in Function Definitions
When defining a function that uses standard parameters, `*args`, and `**kwargs`, they must appear in this order:
1.  Standard positional parameters.
2.  `*args` (for additional positional arguments).
3.  Keyword-only parameters (if any, these come after `*args` or a bare `*`).
4.  `**kwargs` (for additional keyword arguments).

Example:
```python
def complex_function(pos1, pos2, default_param="default", *args, keyword_only_arg, **kwargs):
    print(f"pos1: {pos1}")
    print(f"pos2: {pos2}")
    print(f"default_param: {default_param}")
    print(f"args: {args}")
    print(f"keyword_only_arg: {keyword_only_arg}")
    print(f"kwargs: {kwargs}")

complex_function(1, 2, "custom_default", 'extra_pos1', 'extra_pos2', 
                 keyword_only_arg="mandatory_kwonly", 
                 key1="val1", key2="val2")
```
Similarly, when calling a function, positional arguments must come before keyword arguments.

!!! question "Exercise 2.3.4: Summing Named Arguments using **kwargs"
    In a function definition, `**kwargs` collects all unmatched keyword arguments into a dictionary.
    You can find more about dictionaries here: [Python `dict` documentation](https://docs.python.org/3/library/stdtypes.html#mapping-types-dict).

    Write a function `sum_of_kwargs` that accepts an arbitrary number of named arguments, all of which are assumed to be numbers. The function should return the sum of the values of these named arguments.
    For example:
    `sum_of_kwargs(Alice=5, Bob=3, Charlie=4)` should return `12`.

    Complete the function definition below:
    ```python
    def sum_of_kwargs(**kwargs): # How should parameters be defined?
        total = 0
        # Iterate through the values in the kwargs dictionary
        for value in kwargs.values():
            if isinstance(value, (int, float)): # Optional: check if value is a number
                total += value
            # else:
                # Optional: handle non-numeric values, e.g., raise error or ignore
        return total

    # Example usage:
    # result = sum_of_kwargs(math=90, physics=85, chemistry=92)
    # print(f"Sum of scores: {result}")
    # result2 = sum_of_kwargs(item1=10.5, item2=20, item3=-5.5)
    # print(f"Sum of items: {result2}")
    ```  

## Concluding Thoughts

!!! quote "The Assembly of Tools, The Creation of Tools"
    This phrase evokes the idea that fundamental programming constructs, like functions, are the "tools" we assemble. With these tools, we can then embark on the "creation" of more complex and sophisticated software solutions.
    *(Source: This seems to be a conceptual reference, possibly inspired by themes like those in Stanley Kubrick's "2001: A Space Odyssey", hinted by a URL in the original raw notes: `https://cn.nytimes.com/culture/20180515/2001 -a-space -odyssey -kubrick/`)*