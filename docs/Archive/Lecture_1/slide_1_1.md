# 1.1 Basics

The Chow Institute, 2025

## What you will learn

*   Very elementary Python theory
*   Some building blocks (variables, data types)
*   Some functions (built-in functions like `print`, `id`, `type`, `isinstance`)
*   To memorize the names of these building blocks and functions
*   To know the meaning of their parameters
*   To understand and interpret their output

!!! quote "Analogy: Programs as Buildings"
    If we liken a program to a building, then variables are the blocks, and syntax tells the programmer how to put the blocks together to form walls. Different programs are just different ways to put the walls together.

## 1. Variables

Programming is an art of putting mathematical ideas into practice. During your past study of math, you have encountered abstraction several times. Let's consider an example: the most elementary abstraction in math is likely the creation of a **variable**. In primary school, we learned to count 1, 2, 3... Then, in middle school, we learned to use the notation *x* to represent a generic (general, representative) number. So, when we see *x*=1, *x*=2, or *x*=100, we are not surprised that the single letter *x* can be so versatile.

In Python, we refer to these as **names**. When we create a variable, we want that name to represent some **value**. Python manages this by first allocating a chunk of memory to store the value, and then binding that value (i.e., that piece of memory) to the name we provided.

!!! info "Classroom Note"
    Refer to the diagram discussed on the whiteboard regarding memory allocation and name binding.

### Example: Variable Assignment and Identity

Let's look at a quick example to illustrate how Python handles variables and their memory locations.

```python
# quick verification
a = 1
print(id(a))  # Shows the memory address (identity) of the integer object 1

b = a         # 'b' now refers to the same object as 'a'
print(id(b))  # Shows the same memory address as id(a)

# To format the ID as a hexadecimal string (common representation for memory addresses)
print(f"Memory address of b (hex): {id(b):02X}")
```

In the code snippet above, we encountered:

1.  The `print()` function: Used to display the value of its arguments.
2.  The `id()` function: Returns the unique identifier (often the memory address) of an object.
3.  **f-string formatting**: A convenient way to embed expressions inside string literals, prefixed with `f` or `F`. The expression `id(b):02X` formats the ID as a hexadecimal number.

!!! question "In-class exercise 1.1: Working with Names and Values"
    1.  Create a name-value pair where the name is `person_name` and the value is the string `"Alice"`.
    2.  Print the value associated with `person_name`.
    3.  Change the value bound to `person_name` to `"Bob"`.
    4.  Using an f-string, print the current value of `person_name`.  
        For example: `The current name is: Bob`.

## 1.1 Names Refer to Objects

!!! quote "Key Principle"
    "Everything in Python is an object."

While we are not formally introducing object-oriented programming yet, we can loosely define **objects** as chunks of memory with specific structures and associated behaviors.

"Names refer to objects" means that variables in Python are essentially labels pointing to these objects in memory.

What is special about an object? An object comprises three key aspects:

1.  **Identity**: A unique identifier for the object (e.g., its memory address, obtainable via `id()`).
2.  **Type**: Determines the possible values the object can hold and the operations it supports (e.g., integer, string, list, obtainable via `type()`).
3.  **Value**: The actual data stored in the object.

!!! question "In-class exercise 1.1.1: Features of an Object"
    1.  Can you summarize some features of an object in Python?
        *Hint: We have learned that "everything is an object." What do common Python entities like numbers, strings, or lists have in common based on our discussion?*

!!! note "Memory Layout"
    The **memory layout** of an object describes how its chunk of memory is arranged to store its data. This internal structure is determined by the object's type.

You can get an idea of the size of an object in memory (though this can be implementation-dependent) using `sys.getsizeof()`:
```python
import sys
a = 1
print(sys.getsizeof(a))
```

## 1.2 Object Types

The topic of variable types in Python is extensive. For detailed information, refer to the [official Python documentation on standard types](https://docs.python.org/3/library/stdtypes.html).

Let's see a few examples of different types:
```python
a = 1        # Integer
b = 2.0      # Floating-point number
c = 3.14 - 5j # Complex number (note the 'j' for the imaginary part)
cond = True  # Boolean
```

!!! question "In-class exercise 1.2.1: Checking Types"
    Use the `type()` function to determine and print the type of each variable (`a`, `b`, `c`, `cond`) from the examples above.

### 1.2.1 Simple Types

#### Boolean Type

The Boolean type (`bool`) is a fundamental type in Python, representing truth values. Let's investigate its properties.

!!! note "New Function: `isinstance()`"
    The `isinstance()` function is used to check if an object is an instance of a particular class or type (or a subclass thereof).
    Syntax: `isinstance(object, classinfo)`

Let's try it out:
```python
a = 1
print(isinstance(a, int))    # True, as 'a' is an integer

print(isinstance(a, type(a))) # True, checks if 'a' is an instance of its own type

cond = True
print(isinstance(cond, bool))  # True, as 'cond' is a Boolean
print(isinstance(cond, int))   # True! Booleans are a subclass of integers in Python.
print(cond + 1)              # Outputs 2, because True is treated as 1 in arithmetic contexts.
```

!!! question "In-class exercise 1.2.1.1: Exploring Booleans and `isinstance()`"
    1.  If `True` in Python behaves like the integer `1` in some contexts, what about `False`? Verify your hypothesis with an arithmetic operation (e.g., `False + 1`).
    2.  Try using the `isinstance()` function with other types you've encountered (e.g., floats, strings). Do you find any interesting relationships (e.g., are floats instances of integers)?
    3.  Search the web for the official Python documentation of the `isinstance()` function and read about its capabilities, especially how it handles tuples for `classinfo`.

### 1.2.2 Complex Types

All the previous examples (`int`, `float`, `complex`, `bool`) are types that typically represent a single value. Python also allows us to group several values together to create more complex data structures.

For example, in mathematics, `1` is a number, `2` is a number, and `{1, 2}` is a set containing multiple numbers.

In Python, types that consist of several variables (or items) include **sequences** (like lists, tuples, strings), **mappings** (like dictionaries), sets, and more.

#### Sequences: `list` and `tuple`

`list` and `tuple` are two of the most frequently encountered sequence types in Python. They are ordered collections of items.

Creation is typically by enumerating the items:

*   **Lists** are created with square brackets `[]`:
    ```python
    l = [1, 2, 3]
    ```
*   **Tuples** are created with parentheses `()`:
    ```python
    t = (1, 2, 3)
    ```

!!! question "In-class exercise 1.2.2.1 (List)"
    1.  Create a list named `my_list` with a few items (e.g., numbers, strings). Try to print the entire list.
    2.  Access and print a single element from `my_list` (e.g., the first or second element). Remember that Python uses zero-based indexing.
    3.  Create a list containing 100 numbers, from 1 to 100. (Hint: You might find the `range()` function useful, perhaps in combination with the `list()` constructor).

!!! question "In-class exercise 1.2.2.2 (Tuple)"
    1.  Create a tuple named `my_tuple` with a few items. Try to print the entire tuple.
    2.  Access and print a single element from `my_tuple`.
    3.  Create a tuple containing 100 numbers, from 1 to 100. (Hint: Similar to lists, `range()` and the `tuple()` constructor can be helpful).

##### List and Tuple Methods

Lists and tuples have their own functions that are specially designed for them.

!!! note "Methods vs. Functions"
    These special "functions" that are bound to an object (like a specific list or tuple) are called **methods**. They are invoked using dot notation (e.g., `my_list.append(item)`). This distinguishes them from general-purpose functions like `print()` or `len()`.

!!! warning "Mutability with Methods"
    Many list methods **modify the list in-place** (i.e., they change the value of the caller object directly). Tuples, being immutable, do not have methods that modify them in-place.

Some common list methods include:

*   `append(item)`: Adds an item to the end of the list.
*   `extend(iterable)`: Extends the list by appending all the items from an iterable.
*   `pop([index])`: Removes and returns the item at the given index (or the last item if index is not specified).

The `+` operator can be used to concatenate lists or tuples, creating a new list or tuple.

Now, let's consider setting the value of an element. You already know how to get an element (e.g., `my_list[0]`).

!!! question "In-class exercise 1.2.2.3 (Mutability)"
    1.  Using the list `l = [10, 20, 30]` and tuple `t = (10, 20, 30)`:
        a.  Try to set the second element (at index 1) of `l` to `-1`. Print `l` to see the change.
        b.  Try to set the second element (at index 1) of `t` to `-1`. What happens?
    2.  If successful, analyze the memory layout (e.g., using `id()`) before and after the change for the list. Does the list's `id` change? What about the `id` of the elements? (This is more nuanced for elements, but consider the list object itself).

##### Similarities and Differences: List vs. Tuple

Let's compare lists and tuples through examples:

**Mutability (Ability to Change):**
```python
l = [1, 2, 3]
t = (4, 5, 6)

# Item assignment
l[0] = 100   # ✓ Works for lists (lists are mutable)
# t[0] = 100   # ✗ Fails for tuples (tuples are immutable) -> TypeError

# Deleting an item
del l[1]     # ✓ Works for lists
# del t[1]     # ✗ Fails for tuples -> TypeError

print(l)
# print(t)
```

**Available Methods:**
```python
l = [1, 2, 3]
t = (4, 5, 6)

l.append(4)      # ✓ List method
l.reverse()      # ✓ List method (in-place)
l.extend([5])    # ✓ List method (note: extend expects an iterable)
l.pop(0)         # ✓ List method

# Tuples do not have these mutating methods:
# t.append(7)    # ✗ AttributeError
# t.reverse()    # ✗ AttributeError
# t.extend((8,)) # ✗ AttributeError
# t.pop()        # ✗ AttributeError

print(l)
```

**Concatenation and In-place Augmentation:**
```python
l = [1, 2, 3]
id_l_before = id(l)
t = (4, 5, 6)
id_t_before = id(t)

l += [6, 7]  # For lists, '+=' (augmented assignment) usually modifies in-place
print(f"List l: {l}, ID before: {id_l_before}, ID after: {id(l)}, Same ID: {id_l_before == id(l)}")
# Output typically shows 'Same ID: True'

t += (8, 9)  # For tuples, '+=' creates a new tuple and rebinds the name 't'
print(f"Tuple t: {t}, ID before: {id_t_before}, ID after: {id(t)}, Same ID: {id_t_before == id(t)}")
# Output typically shows 'Same ID: False'
```
!!! note
    The `+=` operator behaves differently for lists (often in-place modification) and tuples (always creates a new object).

**Common Operations (that don't mutate):**
```python
l = [1, 2, 3]
t = (4, 5, 6)

# Accessing elements (works for both)
print(l[1])    # ✓ Output: 2
print(t[2])    # ✓ Output: 6

# Checking for membership (works for both)
print(1 in l)  # ✓ Output: True
print(5 in t)  # ✓ Output: True

# Note on assignment example from raw notes:
# l[1] = "list"  # ✓ This is valid for lists
# t[2] = "tuple" # ✗ This is NOT valid for tuples, as they are immutable.
                 #   Attempting this would raise a TypeError.
# Both are sequence types and support many common sequence operations.
```

##### Slices

You know how to access a single element from a list or tuple (e.g., `my_list[0]`). We can also extract a sub-sequence of elements, called a **slice**.

The slice notation uses colons `:` within the square brackets:
`sequence[start:stop:step]`

*   `start`: The index of the first item to include (inclusive). If omitted, defaults to the beginning of the sequence.
*   `stop`: The index of the first item *not* to include (exclusive). If omitted, defaults to the end of the sequence.
*   `step`: The amount to increment the index by after each item. If omitted, defaults to `1`. A negative step reverses the order.

Breakdown of the slicer form: `<start>":"<stop>[" எனப்படும்"<step>]`
*   The colons (`:`) must appear as shown to separate parts.
*   `start`, `stop`, and `step` are typically integer values or can be omitted.
*   The part `[":"<step>]` (the second colon and the step value) is optional. If it appears, it follows the same rules.

**Slice Objects:**

Python also has a built-in `slice()` constructor that creates a slice object. This can be useful for programmatically generating slices.
```python
s = slice(1, 10, 2)  # Creates a slice object representing indices 1, 3, 5, 7, 9
my_list = list(range(20))
print(my_list[s])    # Equivalent to my_list[1:10:2]
```

!!! question "In-class exercise 1.2.2.4 (Slice Objects)"
    1.  Is `slice` a function or a type/class? (Hint: Try `type(slice)` and `type(slice(1, 5))`).
    2.  Consider `l = [0, 1, 2, 3, 4]`. Is `l` a function? What is its type?

!!! question "In-class exercise 1.2.2.5 (Valid Slices)"
    1.  For a list `my_data = list(range(10))`, determine if the following are valid slice notations when used as `my_data[notation_here]`. If valid, what would they produce?
        1.  `1:2:1`
        2.  `2:4:7`
        3.  `9:1:-1`
        4.  `a:b:c` (Assume `a`, `b`, `c` are integer variables defined elsewhere)
        5.  `1.5:2.3:3.14` (Are float literals allowed directly in slice notation?)
        6.  `a:2:3` (Assume `a` is an integer variable)
        7.  `6:7`
        8.  `:-5:-1`
        9.  `::-1` (What does this commonly used slice do?)

#### Sequences: `array` and `deque`

Besides `list` and `tuple`, Python offers other sequence types, such as `array` (from the `array` module) and `deque` (from the `collections` module). We won't cover these in detail, but it's good to be aware of them:

*   **`array.array`**:
    *   Elements in an `array` must all be of the **same numeric type** (e.g., all integers or all floats). This is specified at creation.
    *   This homogeneity can make arrays more memory-efficient and faster for numerical operations compared to lists, as they can store data more compactly and rely on direct offset calculations.
    *   You need to import the `array` module before using it: `import array`.
*   **`collections.deque`** (Double-ended queue):
    *   A `deque` is a list-like container with fast appends and pops from both ends (left and right).
    *   It's particularly useful for implementing queues and stacks.
    *   You can find more information in the [Python documentation for `collections.deque`](https://docs.python.org/3/library/collections.html#collections.deque).

There are many more specialized data structures and their associated functions/methods in Python's standard library and third-party packages. Learning "how to learn" — by reading documentation, experimenting, and understanding core concepts — is key.

## Review

Let's recap the main points from this chapter:

*   **Variables as Names for Objects**: In Python, variables are names that refer to objects stored in memory.
*   **Object Properties**: Every object has an identity (`id`), a type (`type`), and a value.
*   **Basic Types**: We've looked at fundamental types like integers (`int`), floats (`float`), booleans (`bool`), and complex numbers (`complex`).
*   **Sequence Types**: We explored `list` (mutable, ordered collection) and `tuple` (immutable, ordered collection), including:
    *   Creation and access.
    *   Key methods and operations.
    *   Mutability differences.
    *   Slicing for sub-sequence extraction.
*   **Other Sequence Types**: Briefly mentioned `array.array` and `collections.deque` as more specialized sequence types.

!!! info "Source Acknowledgement"
    Some inspirational ideas or phrasings might have been drawn from various sources during lecture preparation. One such informal source mentioned in original notes: `https://miscrave.com/articles/your-name-flavors-youth/` (Note: The relevance of this specific URL to Python programming is unclear from the context of the raw notes.)
