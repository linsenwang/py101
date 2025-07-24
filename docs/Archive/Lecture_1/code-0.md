# Code 0

## Python Fundamentals: Variables, Memory, and Basic Types

This document explores fundamental Python concepts, including variable assignment, object identity, data types, and sequence operations, presented in a way suitable for beginners and for use with MkDocs.

### Variable Assignment and Object Identity

This section delves into how Python manages variable assignments and the concept of object identity, primarily using the built-in `id()` function. The `id()` function returns a unique identifier for an object, which in CPython is typically its memory address.

```python
a = 1
print(id(a))
```
```
140737190570424
```

When `a` is assigned the value `1`, it points to an integer object in memory.

```python
b = a
print(id(b))
```
```
140737190570424
```

Assigning `a` to `b` (`b = a`) makes `b` refer to the *same* object that `a` refers to. This is why their `id()` values are identical, indicating they both point to the same memory location. This demonstrates Python's use of references for variable assignment.

Now, let's consider larger integers:
```python
c = 500
print(id(c))
```
```
1336757401136
```
```python
d = 500
print(id(d))
```
```
1336757399792
```
For `c = 500` and `d = 500`, the `id()` values are different. Python employs an optimization called "interning" for small integers (usually in the range -5 to 256) and some strings, where identical values will point to the same pre-allocated object. Since `500` is outside this common range, Python typically creates two distinct objects for `c` and `d`, even though they hold the same numerical value.

!!! info "Object Identity and `id()`"
    The `id()` function is crucial for understanding Python's memory model. It reveals whether two variables point to the exact same object or to different objects that might happen to have the same value. Keep in mind that the specific ID values shown (e.g., `140737190570424`) are memory addresses and will vary each time the code is run and on different systems.

### Variable Reassignment and String Formatting

Variables in Python are dynamic and can be reassigned to new values or even objects of different types. This section also introduces f-strings, a modern way to format strings in Python.

```python
print("a=1")
```
```
a=1
```
The variable `a` currently holds the value `1`.

```python
a = 2
print(f"a={a}") # formatting f-string
```
```
a=2
```
When `a` is reassigned to `2`, it now points to a new integer object representing `2`. The previous object `1` might be garbage collected if no other references to it exist. F-strings, denoted by an `f` before the opening quote (e.g., `f"a={a}"`), allow embedding expressions directly within string literals by placing them inside curly braces `{}`.

```python
print(f"id of a = {id(a)}")
```
```
id of a = 140737141811672
```
The `id` of `a` has changed, reflecting that `a` now references a different object in memory (the integer `2`).

```python
print(f"id of a = {id(a):02X}")
```
```
id of a = 7FFFEB5829D8
```
F-strings also support format specifiers. Here, `{id(a):02X}` formats the integer ID of `a` as an uppercase hexadecimal string (`X`). The `02` part is a width and padding specifier, though for typical large ID values, its primary effect is just ensuring the hexadecimal representation.

### Naming Conventions and String Variables

Python has established conventions for naming variables, functions, and classes, outlined in PEP 8. Strings are a fundamental and immutable data type.

```python
person_name = "Alice" # _: underscore
print(person_name)
```
```
Alice
```
Variable names like `person_name` use "snake_case" (all lowercase with words separated by underscores), which is the standard convention for variables and functions in Python. Strings can be created using single (`'`) or double (`"`) quotes.

```python
person_name = "Bob"
print(f"{person_name}")
```
```
Bob
```
Strings are immutable, meaning once a string object is created, its content cannot be changed. When `person_name` is reassigned to `"Bob"`, a new string object `"Bob"` is created, and `person_name` now refers to this new object.

## Python Data Types

### Common Numeric Types and Memory Usage

Python offers several built-in data types. The `sys` module can provide insights into their memory consumption.

```python
import sys

## 'a' was 2 from previous examples
sys.getsizeof(a) # bytes
```
```
28
```
The `sys.getsizeof(a)` function returns the size of the object `a` (which is the integer `2`) in bytes. This size includes Python's internal object overhead, not just the raw value. For a small integer on a 64-bit system, 28 bytes is a common size.

Let's look at some fundamental data types:
```python
a = 1       # Integer
b = 2.0     # Float
c = 3.14 - 5j # Complex
cond = True   # Boolean
```
These assignments showcase:
- `int`: Integers of arbitrary precision.
- `float`: Floating-point numbers, representing real numbers.
- `complex`: Complex numbers, with real and imaginary parts (denoted by `j`).
- `bool`: Boolean values, `True` or `False`.

### Type Checking with `type()` and `isinstance()`

Python provides `type()` and `isinstance()` for examining an object's type.

```python
type(a) # a is 1
```
```
int
```
```python
type(b) # b is 2.0
```
```
float
```
```python
type(c) # c is 3.14 - 5j
```
```
complex
```
```python
type(cond) # cond is True
```
```
bool
```
The `type()` function returns the exact type of an object.

```python
## The variable 'a' was set to 1 in the code block above.
isinstance(a, int)
```
```
True
```
`isinstance(object, classinfo)` checks if `object` is an instance of `classinfo` or an instance of a subclass of `classinfo`.

```python
isinstance(cond, int)
```
```
True
```
This result might be surprising. In Python, `bool` is a subclass of `int`. `True` is treated as `1` and `False` as `0` in numeric contexts.

This relationship allows booleans to participate in arithmetic operations:
```python
cond - cond # True - True evaluates as 1 - 1
```
```
0
```
```python
True - 1
```
```
0
```
```python
False + 2
```
```
2
```

!!! note "Key Concept: Booleans as Integers"
    The `bool` type being a subclass of `int` is a specific design choice in Python. `True` effectively equals `1`, and `False` effectively equals `0` when used in arithmetic. This can be handy but is important to remember to avoid confusion.

Python also interns the `True` and `False` objects, meaning all occurrences of `True` refer to the same single object in memory, and likewise for `False`.
```python
cond1 = True
print(id(cond1))
```
```
140737140685696
```
```python
cond2 = True
print(id(cond2))
```
```
140737140685696
```
The identical `id` values for `cond1` and `cond2` confirm they both point to the same `True` object.

```python
isinstance(a, float) # a is the integer 1
```
```
False
```
This correctly shows that the integer `a` is not an instance of the `float` type.

!!! info "Background: `type()` vs. `isinstance()`"
    Generally, `isinstance()` is preferred for type checking over comparing types directly (e.g., `type(obj) == int`). This is because `isinstance()` correctly handles inheritance: an object of a derived class is also an instance of its base class. `type()` only checks for an exact type match.

## Sequence Types: Lists, Tuples, and Ranges

### Introduction to Lists, Tuples, and `range()`

Lists and tuples are core sequence types in Python, used to store ordered collections of items. The `range()` type represents an immutable sequence of numbers, typically used for iteration.

```python
l = [1, 2, 3]  # A list is created with square brackets []
t = (1, 2, 3)  # A tuple is created with parentheses ()
```

```python
type(l)
```
```
list
```
```python
type(t)
```
```
tuple
```
Items in lists and tuples can be accessed by their index (position), which is 0-based.
```python
print(l)
```
```
[1, 2, 3]
```
```python
print(l[0]) # Accessing the first element
```
```
1
```

The `range()` object generates a sequence of numbers. It's memory-efficient as it doesn't store all numbers explicitly.
```python
range(5) # Represents numbers from 0 up to (but not including) 5
```
```
range(0, 5)
```
```python
r = range(5)
print(r)
```
```
range(0, 5)
```
To view the numbers generated by a `range` object, you can convert it to a list:
```pythonå
list(range(5))
```
```
[0, 1, 2, 3, 4]
```
```python
list(range(1, 101)) # Generates numbers from 1 up to (and including) 100
```
```
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100]
```

### Functions vs. Methods for Sequence Operations

Python distinguishes between general-purpose built-in **functions** (like `print()`, `id()`, `list()`, `range()`) that can operate on various objects, and **methods**, which are functions specifically bound to an object and invoked using dot notation (e.g., `my_list.append()`).

Let's explore some common methods for lists and tuples:
```python
## t is (1, 2, 3)
t.count(1) # The count() method returns the number of occurrences of an element.
```
```
1
```
```python
t # Calling t.count(1) does not modify the tuple t itself.
```
```
(1, 2, 3)
```
```python
## l is [1, 2, 3]
l
```
```
[1, 2, 3]
```
```python
## add one element to a list
l.append(4) # The append() method adds an element to the end of a list, modifying it in-place.
```
```python
l
```
```
[1, 2, 3, 4]
```
```python
l2 = [5, 6]
l2
```
```
[5, 6]
```
```python
## add a list to another list
l.extend(l2) # The extend() method appends all items from another iterable (like l2) to the list l, modifying l in-place.
```
```python
l
```
```
[1, 2, 3, 4, 5, 6]
```
```python
l.pop() # The pop() method removes and returns the last item from the list, modifying it in-place.
```
```
6
```
```python
l
```
```
[1, 2, 3, 4, 5]
```

Sequences can be concatenated using the `+` operator. This operation creates a *new* sequence and does not modify the original sequences.
```python
1 + 2 # Basic arithmetic for reference
```
```
3
```
```python
l + l2 # Concatenating l and l2 creates a new list.
```
```
[1, 2, 3, 4, 5, 5, 6]
```
```python
l # The original list l remains unchanged by the + operation.
```
```
[1, 2, 3, 4, 5]
```
```python
## t is (1, 2, 3)
t2 = (5, 6)
t + t2 # Concatenating t and t2 creates a new tuple.
```
```
(1, 2, 3, 5, 6)
```

### Mutability: Lists vs. Tuples

A fundamental distinction between lists and tuples lies in their **mutability**. Lists are mutable, meaning their contents can be changed after creation. Tuples are immutable; once created, their contents cannot be altered.

Modifying an element in a list:
```python
## l is currently [1, 2, 3, 4, 5]
l[1] = -1 # Change the element at index 1 (the second element) to -1.
```
```python
l
```
```
[1, -1, 3, 4, 5]
```
The list `l` is successfully modified in-place.

Attempting to modify an element in a tuple:
```python
## t is currently (1, 2, 3)
t[1] = -1 # Attempt to change the element at index 1.
```
```text
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: 'tuple' object does not support item assignment
```
This attempt raises a `TypeError` because tuples are immutable and do not allow item assignment after creation.

!!! note "Key Concept: Mutability"
    - **Mutable objects** (e.g., lists, dictionaries, sets) can be changed after they are created. Operations on mutable objects can modify them directly.
    - **Immutable objects** (e.g., integers, floats, strings, tuples) cannot be changed after they are created. Any operation that seems to modify an immutable object actually creates and returns a new object.
    This distinction is vital for understanding Python's behavior, especially concerning function arguments and data structures like dictionary keys (which must be immutable).

## Advanced List Concepts

### Self-Referential Lists and Ellipsis

Python lists have the capability to contain references to themselves, leading to self-referential or recursive data structures.

```python
a = []
a.append(a) # The list 'a' now contains a reference to itself as its first element.
```
When Python displays such a list, it uses a special notation:
```python
a
```
```
[[...]]
```
The `[...]` (an ellipsis within brackets) indicates a self-reference to prevent an infinite loop during display.

The `Ellipsis` object (`...`) is a built-in Python constant often used as a placeholder or in array slicing (e.g., in NumPy).
```python
... # Evaluating the Ellipsis object itself
```
```
Ellipsis
```
Accessing the self-referential element:
```python
a[0] # The first element of 'a' is 'a' itself.
```
```
[[...]]
```
This confirms that `a[0]` points back to the list `a`.

If we add more elements to this self-referential list:
```python
a = []
a.append(a) # 'a' contains itself.
a.append(1) # Now add the integer 1 to 'a'.
```
The representation of `a` updates accordingly:
```python
a
```
```
[[...], 1]
```
This shows that `a` is a list containing two elements: the first is `a` itself (which, expanded, is `[[...], 1]`), and the second is the integer `1`.

!!! quote "Insight: Recursive Structures"
    Self-referential data structures can be very useful for modeling complex relationships like those found in graphs or tree structures. However, algorithms processing them must be designed carefully to handle the recursion and avoid infinite loops. Python's `[...]` notation is a helpful way to visualize these structures without falling into such loops during inspection.