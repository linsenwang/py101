# Chapter 1: Python Basics

## Introduction

Welcome to the basics of Python programming for AI. In this chapter, you will learn about:

*   Very elementary Python theory.
*   Fundamental building blocks of Python programs.
*   Commonly used functions: it's important to memorize their names, understand their parameters, and be able to interpret their output.

!!! quote "An Analogy: Programming as Construction"
    If we liken a program to a building, variables are the foundational blocks. The syntax of the programming language then dictates how these blocks are assembled to form walls. Different programs, therefore, are simply different architectural designs for constructing these walls.

## Variables and Names

Programming can be seen as an art of putting mathematical ideas into practice. A core concept in mathematics, and subsequently in programming, is abstraction. The most elementary form of abstraction is the variable.

Think back to your math education:

*   In primary school, you learned to count: 1, 2, 3.
*   In middle school, you were introduced to using symbols like $x$ to represent a generic or representative number. This single letter $x$ could stand for 1, 2, 100, or any other numerical value, showcasing its versatility.

In Python, we often refer to these symbolic representations as **names**. When we create a variable, our goal is for this name to represent a specific value. Python facilitates this by:
1.  Allocating a chunk of memory to store the value.
2.  Binding this value (and its associated memory location) to the name we provide.
(Imagine a visual representation: the name is like a label pointing to a box in memory that holds the actual data.)

### Illustrative Example: Variable Assignment and Memory

Let's look at a quick example of how variables (names) work in Python, particularly concerning their memory addresses.

```python
# Quick verification of variable assignment and identity
a = 1
print(id(a))  # Shows the memory address of the object 'a' refers to

b = a
print(id(b))  # 'b' now refers to the same object as 'a'

# If id(b) doesn't appear as a typical memory address,
# we can format it as a hexadecimal number.
print(f"{id(b):02X}")
```

In the code snippet above, we utilized a few key Python features:

*   **`print()` function**: This function is used to display the content or value of what is passed to it.
*   **`id()` function**: This function returns the unique identifier (often the memory address) of an object.
*   **f-string formatting**: By prefixing a string with `f` (e.g., `f"..."`), we can embed expressions inside string literals by placing them inside curly braces `{}`. Here, `f"{id(b):02X}"` formats the ID as a hexadecimal number.

!!! question "Exercise: Working with Names and Values"
    1.  Create a name-value pair where the name is `person_name` and the value is the string `"Alice"`.
    2.  Print the value associated with `person_name`.
    3.  Re-bind the `person_name` variable to a new string value, `"Bob"`.
    4.  Using an f-string, print a sentence that includes the current value of `person_name`, for example: "The current name is Bob."  

## Names, Objects, and Memory

!!! info "Fundamental Concepts in Python"
    Two crucial ideas in Python are:
    *   "Names refer to objects."
    *   "Everything in Python is an object."

While we won't delve into a formal introduction to Object-Oriented Programming (OOP) concepts just yet, we can understand **objects** as chunks of memory that have specific, defined structures.

What is special about an object? An object comprises its:

*   **Identity**: A unique identifier for the object (e.g., its memory address, obtainable via `id()`).
*   **Type**: Defines the possible values and operations for the object (e.g., integer, string, list; obtainable via `type()`).
*   **Value**: The actual data stored in the object.

!!! question "Exercise: Features of an Object"
    Based on our discussion:
    1.  Can you summarize some key features of an object in Python?
    2.  Hint: We've learned that "everything in Python is an object." What common characteristics do all objects share?  

### Memory Layout

The internal structure of an object, which defines how its data is stored within its allocated chunk of memory, is referred to as its **memory layout**. This layout dictates how the memory is organized to hold the object's data.

To get an idea of the size in memory an object occupies, you can use the `sys` module:

```python
import sys

a = 10
print(sys.getsizeof(a)) # Size of integer object 'a' in bytes

my_list = [1, 2, 3, 4, 5]
print(sys.getsizeof(my_list)) # Size of list object 'my_list' in bytes
```

## Object Types

The concept of "types" in Python is extensive. Each object has a type, which determines what kind of data it can hold and what operations can be performed on it. For comprehensive details, refer to the [official Python documentation on standard types](https://docs.python.org/3/library/stdtypes.html).

Let's look at a few examples of different data types:

```python
a = 1        # Integer
b = 2.0      # Floating-point number
c = 3.14 - 5j # Complex number
cond = True  # Boolean
```

!!! question "Exercise: Checking Object Types"
    Using the variables `a`, `b`, `c`, and `cond` from the example above:
    1.  Use the built-in `type()` function to determine and print the type of each variable.  

### Simple Types: Boolean

The Boolean type (`bool`) is a fundamental simple type in Python. It has two possible values: `True` and `False`.

Let's investigate Booleans, and in doing so, we'll introduce a useful function: `isinstance()`. This function checks if an object is an instance of a particular class or type.

Consider the following:
```python
a = 1
cond = True # From our previous example

# Check if 'a' is an integer
print(isinstance(a, int))

# Check if 'a' is of its own type
print(isinstance(a, type(a)))

# Investigate Boolean's relationship with integers
print(isinstance(cond, bool))
print(isinstance(cond, int)) # Is True also considered an integer?
print(cond + 1)              # What happens if we perform arithmetic?
```

!!! note "Booleans as Integers"
    In Python, `True` is treated as `1` and `False` is treated as `0` in many numerical contexts. This is why `isinstance(True, int)` evaluates to `True` and arithmetic operations like `True + 1` (which results in `2`) are possible.

!!! question "Exercise: Exploring Booleans and `isinstance`"
    1.  We saw that `True` can behave like the integer `1`. Investigate `False`:
        *   What is the result of `isinstance(False, int)`?
        *   What is the result of `False + 1`?
    2.  Experiment with the `isinstance()` function using various other data types (e.g., float, string) and type checks. Do you find any interesting behaviors or relationships between types?
    3.  Search the web for the official Python documentation for the `isinstance()` function and read about its capabilities and parameters.  

### Complex Types (Collection Types)

So far, we've looked at simple types that generally represent a single value (like an integer or a boolean). Python also offers **complex types**, often called collection or container types, which can group multiple values together.

For instance, drawing an analogy from mathematics:

*   `1` is a number.
*   `2` is a number.
*   `{1, 2}` is a set, which is a collection of numbers.

In Python, common categories of types that hold multiple items include:

*   **Sequences**: Ordered collections like lists, tuples, and strings.
*   **Mappings**: Collections of key-value pairs, like dictionaries.
*   (Strings are technically sequences of characters but are often discussed as a fundamental type on their own.)

#### Sequences: Lists and Tuples

Among the most frequently encountered sequence types are **lists** and **tuples**. Both are ordered collections of items. A primary way to create them is by enumerating their elements:

*   **Lists** are created using square brackets `[]` and are mutable (their contents can be changed after creation).
*   **Tuples** are created using parentheses `()` and are immutable (their contents cannot be changed after creation).

```python
# Creating a list
my_list = [1, 2, 3, "hello", 4.5]
print(my_list)

# Creating a tuple
my_tuple = (1, 2, 3, "world", 6.7)
print(my_tuple)
```

!!! question "Exercise: Working with Lists"
    1.  Create a list containing a few items of different types (e.g., numbers, strings). Print the entire list.
    2.  Access and print a single element from the list using its index. (Remember that indexing starts at 0).
    3.  Create a list containing the numbers from 1 to 100.
        *   Hint: You can do this manually for a few numbers, or think if there's a Python function that can help generate a sequence of numbers, which can then be converted to a list (e.g., `range()` and `list()`).  

!!! question "Exercise: Working with Tuples"
    1.  Create a tuple containing a few items. Print the entire tuple.
    2.  Access and print a single element from the tuple using its index.
    3.  Create a tuple containing the numbers from 1 to 100.
        *   Hint: Similar to lists, consider using `range()` and `tuple()`.  
```
# Understanding Python Sequences

This section delves into Python's sequence types, focusing on lists and tuples, their methods, and the powerful slicing mechanism. We'll also briefly touch upon other sequence types like arrays and deques.

## Lists and Tuples: Fundamental Sequences

Lists and tuples are fundamental ordered collections in Python. While both store sequences of items, they have key differences, primarily concerning mutability.

!!! question "Introductory Tuple Exercises"
    1. Try to print one element of a tuple you create.  
    2. Create a tuple containing 100 numbers, from 1 to 100.  

### List and Tuple Methods

Lists and tuples come with built-in operations. For operations specific to an object (like a particular list or tuple), we use "methods". Methods are like functions tied to an object.

!!! warning "Impact of Methods on Callers"
    Many list methods modify the list directly (in-place) because lists are mutable. Tuple methods, since tuples are immutable, will not change the tuple itself but might return new tuples or values.

Key operations and methods include:

*   **`append()` (list only):** Adds a single element to the end of a list.
*   **`extend()` (list only):** Adds all elements from an iterable (like another list or tuple) to the end of a list.
*   **`pop()` (list only):** Removes and returns an element at a given index (default is the last element).
*   **The `+` operator:** Concatenates sequences. For lists, it creates a new list. For tuples, it creates a new tuple.

### Modifying Element Values

A crucial distinction between lists and tuples lies in their mutability. You can change elements in a list after it's created, but you cannot change elements in a tuple.

!!! question "Modifying List vs. Tuple Elements"
    1. Using a list `l` and a tuple `t` that you have created:  
        *   Set the second element of `l` to the value `-1`. Observe that this is possible.  
        *   Attempt to set the second element of `t` to the value `-1`. Observe the error, demonstrating tuple immutability.  
    2. Consider or research how these operations (or lack thereof for tuples) affect the memory layout. (Hint: List modification happens in-place; tuple "modification" would require creating a new tuple).  

### Similarities and Comparisons

Let's explore how lists and tuples behave with common operations:

**Indexing and Assignment:**
Lists are mutable, so you can change their elements. Tuples are immutable.

```python
# Initializing a list and a tuple
l = [1, 2, 3]
t = (4, 5, 6)

# Accessing elements (works for both)
print(l[0])  # Output: 1
print(t[0])  # Output: 4

# Modifying an element
l[0] = 100  # This is ✓ (valid for lists)
print(l)     # Output: [100, 2, 3]

# Attempting to modify a tuple element
# t[0] = 100  # This is ✗ (invalid for tuples - will raise TypeError)
```

**Deletion:**
You can delete elements from a list. This is not possible for tuples.

```python
l = [1, 2, 3]
t = (4, 5, 6)

del l[1]  # ✓ (valid for lists)
print(l)   # Output: [1, 3]

# del t[1]  # ✗ (invalid for tuples - will raise TypeError)
```

**Method Availability:**
Lists have methods that modify them in-place, like `append()`, `reverse()`, `extend()`, `pop()`. Tuples do not have these mutating methods.

```python
l = [1, 2, 3]
t = (10, 20, 30)

l.append(4)    # ✓
print(l)       # Output: [1, 2, 3, 4]
l.reverse()    # ✓
print(l)       # Output: [4, 3, 2, 1]
l.extend([5, 6]) # ✓ (Note: extend takes an iterable, [5,6] or (5,6))
print(l)       # Output: [4, 3, 2, 1, 5, 6]
item = l.pop(0)  # ✓
print(item)    # Output: 4
print(l)       # Output: [3, 2, 1, 5, 6]

# Tuple methods like append, reverse, extend, pop do not exist
# t.append(40)   # ✗ AttributeError
# t.reverse()    # ✗ AttributeError
# t.extend((50)) # ✗ AttributeError (also, (50) is not an iterable of multiple items, (50,) is)
# t.pop()        # ✗ AttributeError
```

**Concatenation with `+=`:**
For lists, `+=` usually modifies the list in-place (its `id` remains the same). For tuples, `+=` creates a new tuple (its `id` changes).

```python
l = [1, 2, 3]
id_l_before = id(l)
l += [6, 7]
id_l_after = id(l)
print(l)  # Output: [1, 2, 3, 6, 7]
print(f"List ID before: {id_l_before}, ID after: {id_l_after}") # Often the same

t = (1, 2, 3)
id_t_before = id(t)
t += (8,)  # Note the comma to make (8,) a tuple
id_t_after = id(t)
print(t)  # Output: (1, 2, 3, 8)
print(f"Tuple ID before: {id_t_before}, ID after: {id_t_after}") # Will be different
```

**Shared Sequence Properties:**
Both lists and tuples support common sequence operations:

```python
l = [10, "list_item", 30]
t = (40, 50, "tuple_item")

# Reading elements by index
print(l[1])  # ✓ Output: list_item
print(t[2])  # ✓ Output: tuple_item

# Modifying list element (already covered, but for context)
l[1] = "new_list_item"  # ✓
print(l)               # Output: [10, 'new_list_item', 30]

# Attempting to modify tuple element (already covered)
# t[2] = "new_tuple_item" # ✗ TypeError

# Checking for membership
print(10 in l)            # ✓ Output: True
print("tuple_item" in t)  # ✓ Output: True

# Both are sequence types and support iteration, len(), etc.
```

## Slices: Accessing Subsequences

Beyond accessing single elements, Python allows you to extract subsequences (parts of a sequence) using "slices".

The slice notation is `<sequence>[<start>:<stop>:<step>]`.

*   `<start>`: The index of the first element to include (default is 0).
*   `<stop>`: The index of the first element *not* to include.
*   `<step>`: The amount to increment the index by (default is 1). A negative step reverses the order.

The colons `:` are essential. `<start>`, `<stop>`, and `<step>` are optional numerical expressions.

### Slice Objects

Alternatively, you can create a `slice` object and use it to index sequences.

```python
my_list = list(range(20))  # A list from 0 to 19

# Using a slice object
s = slice(1, 10, 2)  # Start at 1, stop before 10, step by 2
print(my_list[s])      # Output: [1, 3, 5, 7, 9]

# Equivalent direct slicing
print(my_list[1:10:2]) # Output: [1, 3, 5, 7, 9]
```

!!! question "Understanding Slice and List Nature"
    1. Is `slice` a function or a type (class)?  
    2. Consider a list variable, for example, `my_list = [1, 2, 3]`. Is `my_list` a function or an instance of a type?  

!!! question "Identifying Valid Slice Syntax"
    Determine if the following represent syntactically valid slice notations. Consider if they would work in an expression like `my_sequence[notation]`.  
    1. `1:2:1`  
    2. `2:4:7`  
    3. `9:1:-1`  
    4. `a:b:c` (Assume `a`, `b`, `c` are variables holding integers or `None`)  
    5. `1.5:2.3:3.14` (Note: Slice indices must be integers or `None`)  
    6. `a:2:3` (Assume `a` is a variable holding an integer or `None`)  
    7. `6:7`  
    8. `:-5:-1`  
    9. `::-1`  

## Other Sequence Types

While lists and tuples are very common, Python offers other specialized sequence types.

### Array

The `array` module provides an `array` object that is more memory-efficient for storing sequences of basic numeric types (e.g., integers, floating-point numbers).

*   **Homogeneous Types:** All elements in an array must be of the same C-style data type (e.g., all integers, all floats).
*   **Performance:** Can be faster than lists for numerical operations due to fixed types and direct memory offsets.
*   **Usage:** You need to `import array` before using it.

```python
import array

# 'i' specifies signed integer type
int_array = array.array('i', [1, 2, 3, 4, 5])
print(int_array)
# int_array.append(6.0) # This would cause a TypeError
```

### Deque

The `collections` module offers `deque` (double-ended queue), which is optimized for fast appends and pops from both ends.

*   **Efficient Appends/Pops:** `appendleft()` and `popleft()` are O(1) operations, unlike lists where inserts/deletes at the beginning are O(N).
*   **Use Cases:** Useful for implementing queues, stacks, or keeping a running history of items (e.g., last N items seen).

You can find more information about `deque` in the official Python documentation:
[collections.deque](https://docs.python.org/3/library/collections.html#collections.deque)

!!! info "Further Learning"
    Python provides a rich set of data structures. While we can't cover every function or method for every type in class, you've learned the fundamental "how-to" of exploring and using them. Always refer to the official Python documentation for detailed information on specific types and their capabilities.

## Review: Core Python Concepts

Let's recap some fundamental ideas:

*   **Python Variables as Names:** In Python, variables are essentially names or labels that refer to objects stored in memory.
*   **Object Components:** Every object in Python has three key characteristics:
    1.  **Identity (`id()`):** A unique identifier for the object (often its memory address).
    2.  **Type (`type()`):** The kind of object it is (e.g., `int`, `list`, `str`, `tuple`).
    3.  **Value:** The actual data stored in the object.
*   **Basic Data Types:** Python has several built-in basic types, including:
    *   Boolean (`bool`): `True` or `False`.
    *   Numeric types: `int`, `float`, `complex`.
    *   Sequences: `list`, `tuple`, `str`, `range`, `bytes`, `bytearray`.
    *   Mappings: `dict`.
    *   Sets: `set`, `frozenset`.
