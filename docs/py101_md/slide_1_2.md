# Chapter 1: Python Basics and Control Flow

## Introduction

This chapter covers the elementary theory of Python, introducing fundamental building blocks, functions, and essential control flow mechanisms like `for` loops and `if` conditions. Understanding these concepts is key to constructing effective programs.

!!! quote "An Analogy: Programming as Construction"
    If we liken a program to a building, variables are the blocks, and syntax tells the programmer how to put these blocks together to form walls. Different programs are simply different ways to assemble these walls.

## Mapping: Dictionaries

### What are Dictionaries?

We’ve learned how to access elements from a list or a tuple by subscripting (e.g., `my_list[0]`). This method relies on the order of elements. However, sometimes it's more intuitive to access elements by a specific name or identifier. Dictionaries are Python's built-in mapping type that allows us to store and retrieve items using keys instead of numerical indices.

### Creating Dictionaries

There are several ways to create dictionaries in Python:

1.  **Using curly braces `{}` with key-value pairs:**
    ```python
    age = {"Alice": 21, "Bob": 32, "Charlie": 44}
    ```

2.  **Using the `dict()` constructor with keyword arguments:**
    ```python
    name = dict(stu1="Alice", stu2="Bob", stu3="Charlie")
    ```

3.  **Using the `dict()` constructor with a list of key-value tuples:**
    ```python
    grade = dict([['stu1', 87], ['stu2', 99], ['stu3', 65]])
    ```

4.  **Using `dict.fromkeys()` to create a dictionary with specified keys and a default value (or `None` if no value is provided):**
    ```python
    # Creates {'key1': None, 'key2': None}
    new_dict = dict.fromkeys(["key1", "key2"])
    
    # Creates {'key1': 0, 'key2': 0}
    another_dict = dict.fromkeys(["key1", "key2"], 0)
    ```

### Accessing Elements: Keys and Values

In a dictionary, the "names" used for lookup are called **keys**, and the associated data are called **values**. Each key-value pair is an item in the dictionary.

You can look up an element (a value) by providing its key within square brackets `[]`:
```python
age = {"Alice": 21, "Bob": 32}
print(age["Alice"])  # Output: 21
```

#### Using `get()` for Safe Access

If you try to access a key that is not in the dictionary using square brackets, Python will raise a `KeyError`, and your program will stop. To avoid this, you can use the `get()` method. If the key is not found, `get()` returns `None` by default (or a specified default value), allowing the program to continue.

```python
age = {"Alice": 21, "Bob": 32}
print(age.get("Alice"))    # Output: 21
print(age.get("David"))    # Output: None
print(age.get("David", "Not Found")) # Output: Not Found
```

!!! question "Exercise: Identifying Keys and Values"
    For the three dictionaries `age`, `name`, and `grade` defined in the "Creating Dictionaries" section:
    1. What are the keys in each dictionary?
    2. What are the corresponding values?  
    
### Subscripting and Potential Errors

When taking out elements by subscripting:

*   `age["Alice"]` correctly retrieves the value if "Alice" is a key.
*   Consider a list `l = [1, 2, 3]`. Accessing `l[3]` will result in an `IndexError` because the valid indices are 0, 1, and 2.
*   Accessing `age["David"]` (assuming "David" is not a key in the `age` dictionary) will result in a `KeyError`. This highlights the importance of error handling or using methods like `get()`.

## Flow Control Part I: The `for` Loop

### Iterating Over Sequences

How can we access all the elements in a container like a list, tuple, or dictionary one by one?

### Manual vs. Automated Iteration

We could take them out manually by index:
`l[0]`, `l[1]`, `l[2]`, etc.

Or, we could create an index variable to help us:
```python
l = [1, 2, 3]
i = 0
# print(l[i]) # Accesses l[0]
i = 1
# print(l[i]) # Accesses l[1]
# And so on...
```

!!! note "A Note on `print()`"
    In many code examples, `print()` statements might be omitted for brevity to focus on the logic. In practice, you would use `print()` or other functions to observe or process the `l[i]` values.

A more convenient and Pythonic way is to rely on the automated `for` loop.

### The `for` Loop Syntax

The basic syntax for a `for` loop is:
```python
# for element in container:
    # do something with element
```
This loop iterates over each `element` in the `container` (e.g., a list, tuple, string, or dictionary).

!!! question "Exercise: Iterating with `for` Loops"
    1. Create a list and use a `for` loop to print its elements.
    2. Create a tuple and use a `for` loop to print its elements.
    3. Create a dictionary and use a `for` loop to print its values. (Hint: Use `.values()`)
    4. Create a dictionary and use a `for` loop to print its keys. (Hint: Iterating directly over a dictionary yields keys, or use `.keys()`)
    5. For a dictionary, print its key-value pairs in a formatted way using an f-string. (Hint: Use `.items()`)  
    
### The `range()` Function

We informally introduce a useful function for `for` loops: `range()`. The `range()` function generates a sequence of numbers, which is often used for looping a specific number of times or for generating indices. `range` is very similar to slices.

Here are some examples:

*   `range(10)`: Generates numbers from 0 up to (but not including) 10. (0, 1, ..., 9)
    ```python
    # list(range(10)) would produce [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    ```
*   `range(1, 11)`: Generates numbers from 1 up to (but not including) 11. (1, 2, ..., 10)
    ```python
    # list(range(1, 11)) would produce [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    ```
*   `range(0, 30, 5)`: Generates numbers from 0 up to 30, with a step of 5. (0, 5, 10, 15, 20, 25)
    ```python
    # list(range(0, 30, 5)) would produce [0, 5, 10, 15, 20, 25]
    ```
*   `range(0, 10, 3)`: Generates numbers from 0 up to 10, with a step of 3. (0, 3, 6, 9)
    ```python
    # list(range(0, 10, 3)) would produce [0, 3, 6, 9]
    ```
*   `range(0, -10, -1)`: Generates numbers from 0 down to -10, with a step of -1. (0, -1, ..., -9)
    ```python
    # list(range(0, -10, -1)) would produce [0, -1, -2, -3, -4, -5, -6, -7, -8, -9]
    ```
*   `range(0)`: Generates an empty sequence.
    ```python
    # list(range(0)) would produce []
    ```
*   `range(1, 0)`: Generates an empty sequence (start is greater than stop, and step is positive by default).
    ```python
    # list(range(1, 0)) would produce []
    ```

## Flow Control Part I: The `if` Statement

### Conditional Execution

There are circumstances when we only want to execute a block of code if a certain condition is met. For example, given a list of numbers, we might only want to process:

*   Numbers that are squares of some integer.
*   Numbers that are cubics of some integer.
*   Just the odd numbers.

In other words, we execute code *only if* an element satisfies a particular condition. This is where the `if` statement, a fundamental control flow structure, comes into play.

### The `if` Statement Syntax

Here's an example demonstrating the `if` statement within a `for` loop:
```python
l = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
for element in l:
    if element % 2 == 0:  # Condition: is the element even?
        print(f"{element} is an even number.")
```
In this code, the `print()` statement is executed only for elements that satisfy the condition `element % 2 == 0`.

!!! question "Exercise: Conditional Filtering"
    Using the list `l = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]`:
    1. Print only the elements that are odd.
    2. Print only the elements that are perfect squares (e.g., 1, 4, 9).
    3. Print only the elements that are perfect cubics (e.g., 1, 8).  
    
### Comparison Operators: `==` vs. `is`

In `if` statements, conditions often involve comparisons.

#### Comparing Values
To compare the values of two objects (especially numbers), we use operators like:

*   `<` (less than)
*   `>` (greater than)
*   `==` (equal to)
*   `<=` (less than or equal to)
*   `>=` (greater than or equal to)
*   `!=` (not equal to)

#### Comparing Identity
To compare if two variables refer to the *exact same object* in memory, we use the `is` operator.

#### The `None` Object
`None` is a special singleton object in Python used to represent the absence of a value or a null value. It's important to understand how to test for `None`.

!!! info "Investigating `None`"
    `None` is unique. There's only one `None` object in a Python program. When checking if a variable is `None`, it's conventional and often more correct to use `is None` rather than `== None`.

### Boolean Expressions from Comparisons

Comparison expressions (e.g., `x > 5`, `name == "Alice"`) evaluate to Boolean values: `True` or `False`.

!!! note "What is an Expression?"
    By "expression," we refer to a piece of Python code that can be evaluated to produce a value. The formal definition is more involved and typically covered in detail in advanced programming courses.

Comparison expressions use operators like `<`, `>`, `<=`, `>=`, `==`, `!=`, `is`, and `is not`.

#### Chained Comparisons
Python supports chained comparisons, making some expressions more concise and readable. For example:
```python
a, b, c, d, e = 1, 4, 3, 3, 5
result = a < b > c == d != e
# This is equivalent to: (a < b) and (b > c) and (c == d) and (d != e)
print(result) # Evaluates based on the values
```

!!! warning "Comparing with `None`"
    A special note concerns comparisons involving `None`. When checking if an object is `None`, you should use `is` or `is not`.
    
    For example: `if my_variable is None:`
    
    This is because, unlike other values which can have multiple instances (e.g., the integer `5` can appear many times), `None` is a unique singleton object. In Python, we use `is` to compare the `id` (identity) of objects, so when

# Python Data Structures and Pythonic Code

## `None`: The Null Object

In Python, `None` is a special singleton object representing the absence of a value or a null value. It can be thought of as having `Null` as its conceptual name, though in Python code it is always referred to as `None`.

We use the `is` operator to compare the identity (`id`) of objects. Since `None` is a singleton, all references to `None` point to the same object. Therefore, when we assign `None` to multiple variables:

```python
a = None
b = None
```
Checking `a is b` will return `True`.

## Data Structures

### Mapping: Dictionaries

Dictionaries are a fundamental mapping type in Python. They store data as key-value pairs and are highly optimized for retrieving values when the key is known.

#### Adding and Combining Dictionaries
To add a new key-value pair or update an existing one, you can use the `[]` operator:
```python
my_dict = {'name': 'Alice'}
my_dict['age'] = 30 # Adds 'age': 30
my_dict['name'] = 'Alice Smith' # Updates value for 'name'
```

To merge one dictionary into another, the `update()` method is commonly used:
```python
dict1 = {'a': 1, 'b': 2}
dict2 = {'b': 3, 'c': 4}
dict1.update(dict2) # dict1 becomes {'a': 1, 'b': 3, 'c': 4}
```

!!! info "Further Reading: `dict.update()`"
    For more details on how `update()` handles merging and potential overwrites, refer to the official Python documentation:
    [https://python-reference.readthedocs.io/en/latest/docs/dict/update.html](https://python-reference.readthedocs.io/en/latest/docs/dict/update.html)

Dictionaries are structurally very different from sequence types like lists or tuples.

#### Dictionaries vs. Lists: Modifying in Loops

Care must be taken when modifying collections (like dictionaries or lists) while iterating over them.

**Dictionary Modification Example:**
The following shows an attempt to remove items from a dictionary based on a condition.
```python
d = {'a': [1], 'b': [1, 2], 'c': [], 'd': []}

# To remove items from a dictionary where the value is an empty list:
keys_to_remove = []
for key in d: # Iterates over keys
    if not d[key]: # Checks if the list associated with key is empty
        keys_to_remove.append(key)

for key in keys_to_remove:
    d.pop(key)
# print(d) # Output would be {'a': [1], 'b': [1, 2]}
```

!!! warning "Modifying Collections During Iteration"
    Modifying a dictionary or list directly while iterating over it using a standard `for` loop can lead to unexpected behavior or errors (like `RuntimeError: dictionary changed size during iteration` for dictionaries, or `IndexError` for lists when indices shift). It's generally safer to:
    1. Iterate over a copy of the collection's keys or items (e.g., `for key in list(d.keys()):`).
    2. Create a list of items to add/remove and perform modifications after the loop (as shown in the example above).
    3. Use comprehensions or build a new collection.

**List Modification Example (Illustrating Potential Issues):**
The following code snippet from the raw notes attempts to remove elements from a list using `pop` within a loop indexed by `range`.
```python
my_list_example = [1, 2, 3, 0, 5]
# The original code was:
# for i in range(4):
#     my_list_example.pop(i)
# This loop will result in an IndexError because as elements are popped,
# the list shrinks, and the original range of indices becomes invalid.
```
This example highlights a common pitfall. As elements are popped, the list's size changes, and the indices of subsequent elements shift. This often leads to `IndexError` or not removing the intended elements.

#### Loading JSON as Dictionaries
Python's built-in `json` module provides an easy way to work with JSON (JavaScript Object Notation) data, often converting JSON objects into Python dictionaries and vice-versa.

```python
import json

# Example: Assume "settings.json" contains:
# {
#   "theme": "dark",
#   "font_size": 12,
#   "features": {
#     "spell_check": true,
#     "auto_save": false
#   }
# }

# To load this JSON file into a Python dictionary:
# with open("settings.json", "r") as f:
#     setting_dict = json.load(f)

# print(setting_dict)
# print(setting_dict.items())
```

!!! note "Working with JSON"
    The `json.load()` function is used to read a JSON formatted stream (like a file object) into a Python object (often a dictionary).
    The `json.loads()` (load string) function is used to parse a JSON string into a Python object.
    Conversely, `json.dump()` writes a Python object to a JSON formatted stream, and `json.dumps()` serializes a Python object to a JSON formatted string.

#### The `zip` Function
Before concluding our discussion on dictionaries, let's explore the `zip` function. The name `zip` is analogous to a zipper, which interleaves two sides. In Python, `zip` combines elements from multiple iterables (like lists or tuples) into an iterator of tuples.

For example, to combine account numbers with their balances:
```python
account = ["622848", "600314", "500297"]
balance = (1_000_000, 1_300_500, 500)

z1 = zip(account, balance)

for k, v in z1:
    print(k, "has a balance of", v)
```
The `zip` function returns an iterator. If the iterables are of different lengths, `zip` stops when the shortest iterable is exhausted.
This is very useful for creating dictionaries directly:
```python
# Example: Creating a dictionary from zipped lists
account_balances = dict(zip(account, balance))
# print(account_balances)
# Output: {'622848': 1000000, '600314': 1300500, '500297': 500}
```

### Object Types Review

!!! question "In-class Exercise: Identifying Python Types"  
    1.  What simple (primitive) data types have we learned so far?
    2.  What complex (collection/container) data types have we learned?
    3.  How do you typically distinguish them or determine an object's type in Python?  

### Strings
We have frequently used quotation marks in Python. Text enclosed in quotation marks (single `' '` or double `" "`) creates string objects, not variable names. Python generally treats single and double quotation marks interchangeably for defining strings.

A string is an immutable sequence of characters. It's formally known as a "string sequence type" and is a fundamental data type for handling text.

We will introduce three groups of useful string functionalities:

1.  **Case Conversion Methods**:
    *   `upper()`: Converts all characters to uppercase.
    *   `lower()`: Converts all characters to lowercase.
    *   `title()`: Converts the string to title case (first letter of each word capitalized).
2.  **Trimming Methods**:
    *   `strip()`: Removes leading and trailing whitespace (or specified characters).
    *   `lstrip()`: Removes leading whitespace (or specified characters).
    *   `rstrip()`: Removes trailing whitespace (or specified characters).
3.  **Regular Expression Functions (from the `re` module)**:
    *   `re.sub()`: Substitutes occurrences of a pattern in a string. (Requires `import re`)

!!! info "What is a Module?"
    A module in Python is a file containing Python definitions and statements. It allows you to logically organize your Python code. Modules can be imported and used in other Python scripts or interactive sessions. These can be built-in modules (like `json` or `re`), third-party libraries, or your own custom code.

!!! question "In-class Exercise: String Manipulations"  
    1.  **Reverse a string.** For example, given `s = "desserts"`, reverse it to get `"stressed"`. Reverse `"drawer"` to get `"reward"`. (These are known as anadromes.)
    2.  **Remove vowels from a string.** For example, `"drawer"` would become `"drwr"`.
    3.  **Count the number of words in a string.** (Hint: use the `split()` method).  

### Unordered Non-duplicate: Sets

#### Definition and Properties
By definition, a set object is an unordered collection of distinct hashable objects.

!!! info "Official Definition: Set Types"
    For more details, refer to the Python documentation:
    [https://docs.python.org/3/library/stdtypes.html#set-types-set-frozenset](https://docs.python.org/3/library/stdtypes.html#set-types-set-frozenset)

!!! note "What does 'hashable' mean?"
    An object is hashable if it has a hash value that never changes during its lifetime (it needs a `__hash__()` method) and can be compared to other objects (it needs an `__eq__()` method). Hashable objects that compare as equal must have the same hash value.
    Most immutable built-in objects are hashable (e.g., strings, numbers, tuples containing only hashable elements). Mutable containers (like lists or dictionaries) are not hashable.
    The Python glossary provides a good reference:
    [https://docs.python.org/3/glossary.html#term-hashable](https://docs.python.org/3/glossary.html#term-hashable)

Sets behave much like mathematical sets. The key characteristics are:
-   **Uniqueness:** Elements in a set are unique; duplicates are automatically removed.
-   **Unordered:** Elements in a set do not have a specific order (prior to Python 3.7, iteration order was arbitrary; since 3.7, it's insertion order for CPython, but "unordered" remains a core conceptual property for portability).

We can perform standard mathematical set operations:
-   `in` (membership test, ∈)
-   `issubset()` (⊂, or `<=` operator for sets)
-   `union()` (∪, or `|` operator)
-   `intersection()` (∩, or `&` operator)
-   `difference()` (−, or `-` operator)
-   `symmetric_difference()` (Δ, or `^` operator)

!!! question "In-class Exercise: Checking Hashability"  
    How do you check if an object is hashable in Python?
      For example, can you try to use a list as an element in a set? What happens and why?  

#### Creating Sets
There are several ways to create a set:

1.  **Using curly braces `{}`**:
    ```python
    my_set = {1, 2, 3, 'hello'}
    empty_set = set() # Note: {} creates an empty dictionary, not an empty set
    ```
2.  **Using the `set()` constructor**:
    This is useful for creating sets from other iterables like lists or strings.
    ```python
    another_set = set([1, 2, 2, 3, 'world']) # from a list
    # print(another_set) # Output might be {1, 2, 3, 'world'} (order may vary)
    char_set = set('hello')
    # print(char_set) # Output might be {'h', 'e', 'l', 'o'}
    ```
3.  **Using set comprehension** (similar to list comprehension, discussed later):
    ```python
    comp_set = {x * x for x in range(5)}
    # print(comp_set) # Output might be {0, 1, 4, 9, 16} (order may vary)
    ```

#### Modifying Sets and `frozenset`
Standard sets are mutable, meaning you can add or remove elements after creation (e.g., using `add()`, `remove()`, `discard()`, `pop()`, `update()`). See the exercise below for examples.

If you need an immutable version of a set (one that cannot be changed after creation, and thus can be used as a dictionary key or an element in another set), Python provides `frozenset`.
A `frozenset` is typically created using the `frozenset()` constructor:
```python
frozen = frozenset([1, 2, 3, 3]) # Duplicates are removed
# print(frozen) # frozenset({1, 2, 3})
# frozen.add(4) # This would raise an AttributeError: 'frozenset' object has no attribute 'add'
```

!!! question "In-class Exercise: Working with Sets"  
    1.  Create a set containing the numbers 1, 2, 3, 4, and 5.
    2.  Add the number 6 to the set.
    3.  Create two sets: `set_a = {1, 2, 3, 4}` and `set_b = {3, 4, 5, 6}`.
    4.  Find the union of `set_a` and `set_b`.
    5.  Find the intersection of `set_a` and `set_b`.
    6.  Find the difference between `set_a` and `set_b` (elements in `set_a` but not in `set_b`).
    7.  Find the symmetric difference between `set_a` and `set_b` (elements in either set, but not in both).
    8.  Given the list `numbers = [1, 2, 2, 3, 4, 4, 4, 5]`, create a set to remove duplicate elements.
    9.  Convert the resulting set back into a list (which will now have fewer elements, and its order might not be preserved from the original list).  

## Pythonics

### Introduction to Pythonics
"Pythonic" is a somewhat loosely defined term. It generally refers to code that fits well with the idiomatic style of the Python language – code that is readable, efficient, and leverages Python's unique features effectively. Writing Pythonic code often means choosing the most "natural" or "Python-like" way to express a computation.

We have already encountered several Pythonic constructs and features:
-   `zip()`: For elegantly combining iterables.
-   `with` statement: For robust resource management (e.g., opening files).
-   `None`: As the idiomatic null object.
-   `sorted()`: For flexible sorting, often used with `key` functions.
-   f-strings (formatted string literals): For concise and readable string formatting.

There are many more Pythonic idioms. Let's explore a couple of prominent ones: comprehensions and `enumerate`.

### Comprehensions

Comprehensions provide a concise and often more readable way to create lists, sets, and dictionaries based on existing iterables. They can sometimes be more efficient than using explicit `for` loops with `append` calls or manual assignments.

#### Types of Comprehensions

1.  **List Comprehension**:
    Creates a new list by applying an expression to each item in an iterable.
    ```python
    # Creates a list of squares from 0 to 4
    # Usually faster than equivalent list.append() loops for simple cases.
    squares = [x * x for x in range(5)]
    # print(squares) # Output: [0, 1, 4, 9, 16]
    ```

2.  **Set Comprehension**:
    Similar to list comprehension, but creates a set (automatically handling uniqueness).
    ```python
    # Creates a set of unique characters from a string
    unique_chars = {c for c in 'abcdcba'}
    # print(unique_chars) # Output (order may vary): {'a', 'b', 'c', 'd'}
    ```

3.  **Dictionary Comprehension**:
    Creates a new dictionary from an iterable, specifying key-value pairs.
    ```python
    # Creates a dictionary mapping numbers to their squares
    num_to_square = {x: x ** 2 for x in range(5)}
    # print(num_to_square) # Output: {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}
    ```

!!! note "What about Tuple Comprehension?"
    You might wonder if there's a "tuple comprehension." If you write syntax similar to a list comprehension but with parentheses:
    ```python
    gen_exp = (i for i in range(3))
    ```
    This does *not* create a tuple directly. Instead, it creates a **generator expression**. A generator expression is an iterator that produces values on demand (lazily). To get a tuple from a generator expression, you would pass it to the `tuple()` constructor:
    ```python
    my_tuple = tuple(i for i in range(3))
    # print(my_tuple) # Output: (0, 1, 2)
    # print(gen_exp)  # Output: <generator object <genexpr> at 0x...>
    ```

#### Comprehensions with Conditional Logic
Comprehensions can also include `if` clauses to filter elements during construction, and even `if-else` expressions to conditionally transform elements.
```
# Python: Advanced List Comprehensions and Object Properties

## Conditional Logic in List Comprehensions

List comprehensions are a concise way to create lists. Their power can be further extended by incorporating conditional logic, allowing for both filtering of elements and conditional assignment of values.

*   **Filtering Elements with `if`**:
    An `if` clause can be added at the end of the comprehension to include only those elements that satisfy a specific condition.

    *Example: Create a list of even numbers from 0 to 9.*
    ```python
    [x for x in range(10) if x % 2 == 0]
    ```

*   **Conditional Value Assignment with `if-else`**:
    An `if-else` expression can be used *before* the `for` clause to determine the value assigned to each new element based on a condition.

    *Example: Create a list where even numbers are kept as is, and odd numbers are incremented by 1.*
    ```python
    [x if x % 2 == 0 else x + 1 for x in range(10)]
    ```

!!! question "Exercise 1.3.1: Code Execution Time"
    How long does each of the following code snippets take to run? Consider how Python evaluates expressions within lists and tuples, especially when functions with side effects like `time.sleep()` are involved.
    (Assume `import time` has been executed).

    ```python
    # Snippet A
    [time.sleep(1), time.sleep(1), time.sleep(1)][0]
    ```

    ```python
    # Snippet B
    (time.sleep(1), time.sleep(1), time.sleep(1))[0]
    ```

## Understanding Python Objects and Their Values

Let's step back and revisit the fundamental characteristics of objects in Python. Every object is defined by three key components:

*   **Identity (`id`)**: A unique integer representing the object's memory location. This value is constant for the lifetime of the object.
*   **Type (`type`)**: Defines the nature of the object (e.g., integer, string, list) and the set of operations (methods and functions) that can be applied to it.
*   **Contents (Value)**: The actual data stored by the object.

Understanding these components is crucial for grasping how Python manages data and how variables interact with objects.

### Type Casting

!!! info "A Different Perspective: “你的打开方式不对?”"
    Sometimes, you might have data represented as one type, but you need to work with it as another. This situation can be whimsically described by the Chinese phrase “你的打开方式不对?” (Nǐ de dǎkāi fāngshì bù duì?), meaning "What if your way of opening/approaching it is wrong?" Type casting is the solution to "open" or interpret data with the correct type.

Type casting, or type conversion, is the process of changing an object from one data type to another. This is typically achieved by using the target type's constructor function (e.g., `int()`, `str()`, `list()`).

For example, `str(123)` converts the integer `123` to the string `"123"`.

It's important to remember that type casting generally creates a **new object** of the target type, rather than modifying the original object in place.

### Object Mutability

Consider what happens when we attempt to change an object's value after it has been created.

*   An object is **mutable** if its internal state or the value it holds can be changed after its creation, without altering its identity (`id`). Examples include lists, dictionaries, and sets.
*   An object is **immutable** if its value cannot be changed once it is created. New objects must be created to represent new values. Examples include integers, floats, strings, and tuples.

When the value of a mutable object is modified, its `id` (memory address) usually remains the same. Consequently, all variables referencing that object will reflect the change.

!!! note "The Nature of Mutable Objects"
    Mutable objects are very useful for operations that require in-place modifications, offering efficiency gains. However, they can also introduce complexities, particularly when multiple variables refer to the same mutable object, as changes through one reference affect all others. This behavior will be explored in more detail in later sections.

!!! question "Exercise 1.4.1: Identifying Mutable Types"
    What are some common mutable object types in Python? How can you programmatically verify if a given object or an object of a certain type is mutable?

## Further Resources

For a deeper dive into Python's object model, names, and values, the following resources are highly recommended:

*   **Python Names and Values** by Ned Batchelder: [https://nedbatchelder.com/text/names.html](https://nedbatchelder.com/text/names.html)
    *   An excellent explanation of how Python names (variables) relate to objects and values.
*   **CS 61A (Structure and Interpretation of Computer Programs)**: [https://cs61a.org/](https://cs61a.org/)
    *   Review materials from this course often provide a strong academic foundation for concepts like environments, objects, and mutability.

## Summary of Key Python Concepts

This discussion builds upon and relates to several foundational Python concepts:

*   **Additional Data Types**:
    *   `dict` (Dictionary): Mutable mappings of keys to values.
    *   `str` (String): Immutable sequences of characters.
    *   `set`: Mutable, unordered collections of unique elements.
*   **Control Flow**:
    *   `for`-loops: For iterating over sequences and other iterable objects.
    *   `if-elif-else` statements: For conditional execution of code blocks.
*   **Pythonic Styles**:
    *   Writing code that is clear, concise, and idiomatic to Python, often leveraging built-in features and a readable syntax.

---
*General Source Note: Some lecture material may draw inspiration from various programming discussions and resources. e.g., [source](https://www.thepaper.cn/newsDetail_forward_21329531)*
