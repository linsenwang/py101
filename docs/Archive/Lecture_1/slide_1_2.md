# 1.2 Basics

## What You Will Learn

This chapter introduces the foundational elements of Python programming relevant to AI. We will cover:

*   Very elementary Python theory
*   More building blocks and more functions
*   Control flow (for loop and if condition)

!!! quote "Analogy: Programs as Buildings"
    If we liken a program to a building, the variables are blocks, and syntax tells the programmer how to put the blocks together to form walls. Different programs are just different ways to put the walls together.

## Understanding Python Objects

Let’s step back for a moment to understand what constitutes an "object" in Python, as this is crucial before diving into specific data types.

### Core Concepts: ID, Type, and Value

Recall that every object in Python is characterized by three components:

*   **(i) ID:** A unique identifier for the object (its memory address).
*   **(ii) Type:** The kind of object it is (e.g., integer, list, dictionary).
*   **(iii) Contents/Value:** The data stored within the object.

These components determine how an object behaves and interacts within a program.

!!! quote "A Note on Perspective"
    What if “你的打开方式不对 ?” (This translates to "What if your way of approaching/using it is incorrect?"). Understanding an object's type is key to using it correctly.

### Type Casting

Python allows you to change an object's type, a process known as **type casting**. This is typically done by using the target type's name as a function (e.g., `int()`, `str()`, `list()`).
Changing an object's type usually results in a new object being created with a new ID.

### Mutability

What about changing an object's value?
When the value of an object can be changed without altering its ID (i.e., it's modified in-place), the object is called **mutable**. If its value cannot be changed after creation (i.e., any "modification" results in a new object with a new ID), it is **immutable**.

!!! note "Key Concept: Mutability"
    Understanding mutability is vital. Mutable objects are very useful but can sometimes lead to tricky bugs if not handled carefully, especially when multiple variables reference the same mutable object. We’ll explore this more in the next Chapter.

!!! question "Exercise 1.4.1: Mutable Objects"
    What types of objects are mutable? How do you verify it?  

## Python's Data Structures

Now, let's explore some of Python's fundamental data structures.

### Overview of Data Types

Python offers a variety of built-in data types, broadly categorized into simple types (like numbers and booleans) and complex or container types (like lists, dictionaries, etc.).

!!! question "Exercise 1.2.2: Identifying Python Types"
    1.  What simple types have we learned?
    2.  What complex types have we learned?
    3.  How do you tell them apart?  

### 1.2.3 Mapping — Dictionaries

We’ve learned how to take elements from a list or a tuple by subscripting (using their index). The necessary element for subscripting is the *order*. Another way to access elements is by their *names*. This works if the container provides names for its elements.

A **dictionary** is such a container type that allows subscripting by names (called keys).

#### Ways to Create a Dictionary

Here are a few common methods to create dictionaries:

```python
# Method 1: Using curly braces {}
age = {"Alice": 21,
       "Bob": 32,
       "Charlie": 44}

# Method 2: Using the dict() constructor with keyword arguments
name = dict(stu1="Alice",
            stu2="Bob",
            stu3="Charlie")

# Method 3: Using the dict() constructor with a list of key-value pairs
grade = dict([['stu1', 87],
              ['stu2', 99],
              ['stu3', 65]])

# Method 4: Using dict.fromkeys() to create a dictionary with specified keys and a default value
# new_dict = dict.fromkeys(["key1", "key2"], default_value)
```

The names of the elements in a dictionary are known as **keys**, and the associated data are known as **values**. Each key-value pair is an item in the dictionary.

!!! note "Accessing Dictionary Elements: `[]` vs. `get()`"
    You can look up an element (a key-value pair) in a dictionary by passing the key to the dictionary using square brackets (e.g., `my_dict[key]`). However, if the key is not in the dictionary, Python will raise a `KeyError`, and the program will stop.
    
    Alternatively, you can use the `get()` method (e.g., `my_dict.get(key)`). If the key is not found, `get()` returns `None` by default (or a specified default value if provided as a second argument), allowing the program to continue without an error.

!!! question "Exercise 1.2.3.1: Dictionary Keys and Values"
    1.  What are the keys and values in the three dictionaries (`age`, `name`, `grade`) shown in the "Ways to Create a Dictionary" example?  

#### Accessing Elements and Error Handling

Illustrative examples of accessing elements and potential errors:

```python
age = {"Alice": 21, "Bob": 32}
# print(age[Alice])  # Error: NameError - Alice is not defined as a variable. Keys are usually strings.
print(age["Alice"])  # Correct: Accesses the value associated with the key "Alice"

l = [1, 2, 3]
# print(l[3])  # Error: IndexError - list index out of range (valid indices are 0, 1, 2)

# print(age["David"]) # Error: KeyError - "David" is not a key in the age dictionary (if "David" isn't added)
print(age.get("David")) # Returns None, no error
print(age.get("David", "Not Found")) # Returns "Not Found", no error
```

#### Modifying Dictionaries

*   **Adding or Updating Elements:** You can add new key-value pairs or update existing ones using the square bracket `[]` operator:
    ```python
    my_dict = {'a': 1}
    my_dict['b'] = 2  # Adds a new key-value pair
    my_dict['a'] = 10 # Updates the value for key 'a'
    ```

*   **Combining Dictionaries:** The `update()` method can be used to merge one dictionary into another.
    ```python
    dict1 = {'a': 1, 'b': 2}
    dict2 = {'b': 3, 'c': 4}
    dict1.update(dict2) # dict1 is now {'a': 1, 'b': 3, 'c': 4}
    ```
    For more details, refer to the [Python documentation on `dict.update()`](https://python-reference.readthedocs.io/en/latest/docs/dict/update.html).

#### Iterating and Modifying: Potential Pitfalls

Dictionaries are very different from lists or tuples, especially when it comes to modification during iteration.

!!! warning "Caution: Modifying Collections During Iteration"
    Modifying a dictionary (or list) while iterating over it directly can lead to unexpected behavior or runtime errors. It's generally safer to iterate over a copy or collect items to be modified/deleted and perform operations afterward.

**Example 1.2.3.3: Dictionary behavior during modification (problematic)**
The following code attempts to remove items from a dictionary if their values are "empty" (e.g., an empty list). This approach can cause a `RuntimeError` because the dictionary's size changes during iteration.

```python
d = {'a': [1], 'b': [1, 2], 'c': [], 'd': []}
# The following loop is problematic:
# for key in d:
#     if not d[key]: # Checks if the list associated with the key is empty
#         d.pop(key) # Raises RuntimeError: dictionary changed size during iteration

# A safer way (iterate over a copy of keys):
keys_to_remove = []
for key in d:
    if not d[key]:
        keys_to_remove.append(key)
for key in keys_to_remove:
    d.pop(key)
print(d) # Output: {'a': [1], 'b': [1, 2]}
```

**Similar issue with lists (problematic when removing elements while iterating by index):**
The following list example also demonstrates issues when removing elements while iterating using indices that don't adapt to the changing list size.

```python
data_list = [1, 2, 3, 0, 5, 0]
# Problematic approach:
# for i in range(len(data_list)): # len(data_list) is fixed at the start
#     if not data_list[i]: # if element is 0 (or other falsy value)
#         data_list.pop(i) # This shifts indices, leading to skipped elements or errors

# Safer approaches for lists:
# 1. Iterate backwards:
# for i in range(len(data_list) - 1, -1, -1):
#     if not data_list[i]:
#         data_list.pop(i)

# 2. Build a new list:
new_list = [x for x in data_list if x]
print(new_list) # Output: [1, 2, 3, 5]
```

#### Example: Working with JSON Data

Dictionaries are very similar in structure to JSON (JavaScript Object Notation) objects, making them ideal for working with JSON data.

**Example 1.2.3.4: JSON file as a dictionary**

!!! info "Note on `settings.json`"
    The following code assumes you have a file named `settings.json` in the same directory as your Python script, or you provide the correct path. The content of `settings.json` should be valid JSON.
    Example `settings.json`:
    ```json
    {
        "username": "guest",
        "theme": "dark",
        "notifications": true
    }
    ```

```python
import json

# Assuming "settings.json" exists and contains valid JSON data
try:
    with open("settings.json", "r") as f:
        setting_dict = json.load(f)
    
    print(setting_dict)
    print(setting_dict.items()) # Displays key-value pairs
except FileNotFoundError:
    print("Error: settings.json not found.")
```

#### The `zip()` Function

Before we end the discussion of dictionaries, there is one last useful function often used in conjunction with creating or processing dictionary-like data: `zip()`.
The `zip()` function takes iterables (like lists or tuples) and aggregates elements from each of them. `zip` in everyday language means "拉链" (lā liàn - zipper).

As the name suggests, Python's `zip()` works like a zipper, combining corresponding elements from two or more sequences. For example:

```python
account_numbers = ["622848", "600314", "500297"]
balances = (1_000_000, 1_300_500, 500)

# zip() returns a zip object, which is an iterator
z1 = zip(account_numbers, balances)

# You can convert it to a list or iterate over it
# print(list(z1)) 
# Output: [('622848', 1000000), ('600314', 1300500), ('500297', 500)]

# Iterating over the zip object
for acc_num, bal in z1: # z1 was already iterated if list(z1) was called above and not re-assigned
    print(f"Account {acc_num} has a balance of {bal}")

# To create a dictionary from two sequences:
account_data = dict(zip(account_numbers, balances))
print(account_data)
# Output: {'622848': 1000000, '600314': 1300500, '500297': 500}
```

### 1.2.4 Strings

We have seen quotation marks used several times. Words enclosed in quotation marks are **strings**, not variable names. Python generally does not distinguish between single (`'`) and double (`"`) quotation marks for defining strings.

A string is a sequence of characters. While formally known as a "string sequence type," it's a fundamental data type for text.

We introduce three common sets of functions/string methods:

*   **Case conversions:**
    *   `upper()`: Converts string to uppercase.
    *   `lower()`: Converts string to lowercase.
    *   `title()`: Converts string to title case (first letter of each word capitalized).
*   **Whitespace removal:**
    *   `strip()`: Removes leading and trailing whitespace.
    *   `lstrip()`: Removes leading whitespace.
    *   `rstrip()`: Removes trailing whitespace.
*   **Advanced manipulation (using modules like `re`):**
    *   Functions from the `re` module (e.g., `re.sub()` for pattern-based substitutions).

!!! info "What is a Module?"
    A module is a file containing Python definitions and statements. It allows you to logically organize your Python code. Modules can be written by others (part of Python's standard library or third-party packages) or by yourself, and they can be imported and used in other Python scripts.

!!! question "Exercise 1.2.4.1: String Manipulations"
    1.  **Reverse a string.** For example, given `s = "desserts"`, reverse it to get `"stressed"`. Reverse `"drawer"` to get `"reward"`. These are known as anadromes.
    2.  **Remove vowels from a string.** For example, `"drawer"` would become `"drwr"`. (Consider vowels: a, e, i, o, u, case-insensitive).
    3.  **Count the number of words in a string** (using the `split()` method). For example, in `"This is a sample sentence."`, there are 5 words.  

### 1.2.5 Sets — Unordered Non-duplicate Collections

By definition, a **set** object is an unordered collection of distinct, hashable objects.
*   See the official documentation: [Set Types — set, frozenset](https://docs.python.org/3/library/stdtypes.html#set-types-set-frozenset)
*   Python's glossary provides a definition for [hashable](https://docs.python.org/3/glossary.html#term-hashable). Essentially, an object is hashable if it has a hash value that never changes during its lifetime (requires an `__hash__()` method) and can be compared to other objects (requires an `__eq__()` method). Most immutable built-in objects are hashable.

Sets behave much like the mathematical concept of sets. The elements of a set are unique (duplicates are automatically removed) and unordered (their position is not guaranteed). We can perform standard set operations like:

*   `in` (membership test, ∈)
*   `issubset()` (subset test, ⊂)
*   `union()` (∪ or `|` operator)
*   `intersection()` (∩ or `&` operator)
*   `difference()` (− or `-` operator)
*   `symmetric_difference()` (Δ or `^` operator)

!!! question "Exercise 1.2.5.1: Hashable Objects"
    How do you check if an object is hashable? (Hint: try using it as a key in a dictionary or an element in a set.)  

#### Set Creation and Modification

There are several ways to create a set:

*   Using curly braces `{}` (e.g., `{1, 2, 3}`). Note: `{}` creates an empty dictionary, not an empty set. Use `set()` for an empty set.
*   Using the `set()` constructor (e.g., `set([1, 2, 2, 3])` results in `{1, 2, 3}`).
*   Using set comprehension (covered later).

Sets are mutable, meaning you can add or remove elements after creation.

A **frozenset** is an immutable version of a set. It is created using the `frozenset()` constructor. Once created, its elements cannot be changed. Because they are immutable and hashable, frozensets can be used as dictionary keys or as elements of other sets.

!!! question "Exercise 1.2.5.2: Set Operations"
    1.  Create a set containing the numbers 1, 2, 3, 4, and 5.
    2.  Add the number 6 to the set.
    3.  Create two sets: `set_a = {1, 2, 3, 4}` and `set_b = {3, 4, 5, 6}`.
    4.  Find the union of `set_a` and `set_b`.
    5.  Find the intersection of `set_a` and `set_b`.
    6.  Find the difference `set_a - set_b`.
    7.  Find the symmetric difference between `set_a` and `set_b`.
    8.  Given the list `numbers = [1, 2, 2, 3, 4, 4, 4, 5]`, create a set from this list to remove duplicate elements.
    9.  Convert the set (from step 8) back into a list (which will now have fewer elements).  

## Special Topic: Flow Control

Flow control statements dictate the order in which instructions in a program are executed.

### For Loops

How can we access all the elements in a list (or other iterable) one by one? We could take them out manually by index (e.g., `l[0]`, `l[1]`, `l[2]`), but this is tedious and not scalable.

A more convenient way is to use an automated **for-loop**.

```python
my_list = [10, 20, 30]

# Manual access (less flexible)
# i = 0
# print(my_list[i]) # prints 10
# i = 1
# print(my_list[i]) # prints 20
# ...

# Using a for-loop
# The "element" variable takes on the value of each item in the "container"
# one by one during each iteration of the loop.
# The "..." indicates the block of code to be executed for each element.
# for element in container:
#     # Do something with element
#     print(element)
```
The comment `# not I often ignore the print` in the original notes likely means the lecturer often omits explicit `print()` calls in simplified loop examples for brevity.

!!! question "Exercise: Iterating with For Loops"
    1.  Make a list and use a `for` loop to print its elements.
    2.  Make a tuple and use a `for` loop to print its elements.
    3.  Make a dictionary and use a `for` loop to print its values. (Hint: use `.values()`)
    4.  Make a dictionary and use a `for` loop to print its keys. (Hint: iterating directly over a dictionary yields keys)
    5.  Print the key-value pairs of a dictionary in a formatted way using an f-string. (Hint: use `.items()`)  

#### The `range()` Function

We informally introduce a useful function often used with `for` loops: `range()`.
`range()` generates a sequence of numbers, and it's very similar to list slicing.

*   `range(stop)`: Generates numbers from 0 up to (but not including) `stop`.
    *   `range(10)` -> 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
*   `range(start, stop)`: Generates numbers from `start` up to (but not including) `stop`.
    *   `range(1, 11)` -> 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
*   `range(start, stop, step)`: Generates numbers from `start` up to (but not including) `stop`, with an increment of `step`.
    *   `range(0, 30, 5)` -> 0, 5, 10, 15, 20, 25
    *   `range(0, 10, 3)` -> 0, 3, 6, 9
    *   `range(0, -10, -1)` -> 0, -1, -2, ..., -9
*   Edge cases:
    *   `range(0)` -> (empty sequence)
    *   `range(1, 0)` -> (empty sequence, as start is not less than stop with a positive step)

### If Statements

There are circumstances when we only want to execute a block of code if a certain condition is true. For example, given a list of numbers, we might only want to process numbers that are squares of some integer, or only odd numbers.
In other words, we execute code *if* an element satisfies a **condition**. Here we use the `if` control flow statement.

```python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

# Example: print only even numbers
# for element in numbers:
#     if element % 2 == 0:  # This is the condition
#         # This block executes only if the condition is true
#         print(f"{element} is even")
#     # ... (else block could go here)
```

!!! question "Exercise: Conditional Logic with If Statements"
    For the list `numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]`:
    1.  Print elements that are odd.
    2.  Print elements that are perfect squares (e.g., 1, 4, 9).
    3.  Print elements that are perfect cubes (e.g., 1, 8).  

#### Comparison Operators: `==` vs. `is`

In `if` statements, the most commonly used conditions involve comparisons:

*   **Value comparison:** `<` (less than), `>` (greater than), `==` (equal to), `!=` (not equal to), `<=` (less than or equal to), `>=` (greater than or equal to). These compare the *values* of two objects.
*   **Identity comparison:** `is`, `is not`. These compare the *identity* of two objects (i.e., whether they are the same object in memory, pointing to the same ID).

!!! note "The `None` Object"
    `None` is a special singleton object in Python representing the absence of a value. It's often used to indicate that a variable doesn't have a meaningful value yet. You should investigate its properties and usage.

#### Chained Comparisons and Boolean Expressions

Comparison expressions (e.g., `x < 5`, `y == 10`) evaluate to Boolean values (`True` or `False`). By "expression," we refer to Python code that can be evaluated to produce a value. The formal definition is involved, and we will explore it more in future courses.

Python supports chained comparisons, which can make code more readable:
```python
a, b, c, d, e = 1, 4, 3, 3, 5
result = a < b > c == d != e
# This is equivalent to: (a < b) and (b > c) and (c == d) and (d != e)
print(result) # Output: True
```

!!! warning "Comparing with `None`"
    A special note concerns comparisons involving `None`. When checking if an object is `None`, you should always use `is` or `is not` (e.g., `if my_var is None:`). This is because `None` is a singleton object (there's only one `None` object in memory). Using `is` checks for object identity.
    
    For example:
    `a = None`
    `b = None`
    `a is b` returns `True`.
    
    While `a == None` might work in many CPython implementations due to optimizations, `is None` is the more robust and Pythonic way to check for `None`.

## 1.3 Pythonics

"Pythonic" is a loosely defined term that means "being special to Python" or adhering to the idiomatic style of Python programming. It usually refers to syntax or constructs that are particularly elegant, readable, or efficient in Python. We have already seen several examples of Pythonic code:

*   `zip()` for combining iterables.
*   The `with` statement for resource management (e.g., `with open(...)`).
*   The `None` object.
*   The `sorted()` function for creating sorted lists.
*   f-strings for formatted string literals.

There are more. Let’s check out a few others:

*   Comprehensions
*   `enumerate()`

### 1.3.1 Comprehensions

Comprehensions provide a concise way to create lists, sets, and dictionaries.

*   **List comprehension:** `[expression for item in iterable if condition]`
    ```python
    # Creates a list of squares from 0 to 4
    # Usually faster than an explicit for loop for list creation, if not overly complicated.
    squares = [x**2 for x in range(5)] 
    # squares is [0, 1, 4, 9, 16]
    ```
*   **Set comprehension:** `{expression for item in iterable if condition}`
    ```python
    # Creates a set of unique characters from a string
    unique_chars = {c for c in 'abcdcba'}
    # unique_chars is {'a', 'b', 'c', 'd'} (order may vary)
    ```
*   **Dictionary comprehension:** `{key_expr: value_expr for item in iterable if condition}`
    ```python
    # Creates a dictionary mapping numbers to their squares
    num_to_square = {x: x**2 for x in range(5)}
    # num_to_square is {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}
    ```

!!! info "Generator Expressions (Tuple Comprehension?)"
    What about "tuple comprehension"? If you write something like `(x for x in range(3))`, you do not get a tuple directly. Instead, you get a **generator object**.
    ```python
    gen_exp = (i for i in range(3))
    print(gen_exp) # Output: <generator object <genexpr> at 0x...>
    # To get a tuple, you would explicitly use the tuple() constructor:
    my_tuple = tuple(i for i in range(3)) # my_tuple is (0, 1, 2)
    ```
    Generator expressions are memory-efficient as they produce items one at a time and only when needed.

#### Comprehensions with Conditional Logic

We can also add `if` (and `if-else`) control flow to comprehensions:

*   **`if` condition only (filtering):**
    ```python
    # Creates a list of even numbers from 0 to 9
    evens = [x for x in range(10) if x % 2 == 0]
    # evens is [0, 2, 4, 6, 8]
    ```
*   **`if-else` condition (conditional expression):**
    The `if-else` comes *before* the `for` clause.
    ```python
    # If x is even, use x; otherwise, use x + 1
    processed_list = [x if x % 2 == 0 else x + 1 for x in range(10)]
    # processed_list is [0, 2, 2, 4, 4, 6, 6, 8, 8, 10]
    ```

!!! question "Exercise 1.3.1: Comprehensions and Evaluation Time"
    You'll need `import time` for this exercise.
    How long does each of the following code snippets take to run? What does this tell you about when the expressions inside list comprehensions vs. generator expressions are evaluated?
    
    Snippet 1 (List comprehension):
    ```python
    import time
    # list_comp_eval = [time.sleep(1), time.sleep(1), time.sleep(1)][0] 
    # print("List comprehension element accessed.")
    ```
    
    Snippet 2 (Generator expression, then converted to list to force evaluation, or accessed):
    ```python
    import time
    # gen_exp_eval = (time.sleep(1) for _ in range(3))
    # print("Generator expression created.")
    # # Accessing the first element will trigger the first sleep
    # first_element = next(gen_exp_eval) 
    # print("Generator expression first element accessed.")
    # # Or to evaluate all:
    # # list_from_gen = list(gen_exp_eval)
    # # print("Generator expression fully evaluated into a list.")
    ```
    Analyze the behavior of `[time.sleep(1),time.sleep(1),time.sleep(1)][0]` versus accessing an element from `(time.sleep(1),time.sleep(1),time.sleep(1))`.  
    (Note: The original `(time.sleep(1),time.sleep(1),time.sleep(1))[0]` would create a tuple of `None` values after all `sleeps` complete, then access the first `None`. The exercise aims to compare eager vs. lazy evaluation.)

## Further Readings and Watching

*   **Ned Batchelder - Facts and Myths about Python Names and Values:** [https://nedbatchelder.com/text/names.html](https://nedbatchelder.com/text/names.html)
*   **UC Berkeley CS 61A: Structure and Interpretation of Computer Programs:** [https://cs61a.org/](https://cs61a.org/) (A more advanced, academic resource).

## Review

Key topics covered in this chapter:

*   Introduction to Python objects (ID, type, value) and mutability.
*   Core Data Structures:
    *   **Dictionaries:** Key-value mappings, creation, access (`[]` vs `get()`), modification, JSON integration, `zip()`.
    *   **Strings:** Basic properties, common methods.
    *   **Sets:** Unordered collections of unique, hashable items, set operations, `frozenset`.
*   Control Flow:
    *   **`for` loops:** Iterating over sequences, `range()` function.
    *   **`if` statements:** Conditional execution, comparison operators (`==` vs `is`), `None` checking.
*   Pythonic Styles:
    *   Introduction to "Pythonic" code.
    *   **Comprehensions:** List, set, dictionary comprehensions, generator expressions.
    *   Conditional logic in comprehensions.