# Programming for AI (Python) - Chapter 1: Basics

## Introduction

Programming is an art of putting mathematical ideas into practice. In this chapter, we'll cover:

- Very elementary Python theory
- Building blocks of Python programs
- Functions and variables
- Understanding Python objects

If we liken a program to a building:
- Variables are the blocks
- Syntax tells us how to put blocks together to form walls
- Different programs are different ways to assemble these walls

## 1. Variables

### 1.1 Understanding Variables

Variables in Python are names that refer to objects in memory. When we create a variable:

1. Python allocates memory to store the value
2. Binds that memory location to the name we provide

```python
# Example
a = 1
print(id(a))  # Shows memory address
b = a
print(id(b))  # Same address as a
print(f"{id(b):02X}")  # Formatted memory address
```

!!! note "Key points"

    - `print()` shows contents
    - `id()` gives memory address
    - f-strings (`f""`) allow formatting

!!! question "In-class Exercise 1.1"

    1. Create a variable `name` storing "Alice"
    2. Print the name
    3. Reassign to "Bob"
    4. Print using f-string

## 1.1 Python Objects

Key concepts:

- "Names refer to objects"
- "Everything in Python is an object"
- Objects are chunks of memory with specific structures

### Object Features
Objects have:
- Memory layout (how data is arranged)
- Type information
- Methods (for some types)

```python
import sys
a = 1
sys.getsizeof(a)  # Shows memory usage
```

### In-class Exercise 1.1.1
Summarize common features of Python objects.

## 1.2 Object Types

Python has several basic types:

```python
a = 1          # int
b = 2.0        # float
c = 3.14-5j    # complex
cond = True    # bool
```

!!! question "In-class Exercise 1.2.1"
    Use `type()` to examine these variables.

### 1.2.1 Boolean Type

Booleans are special in Python:

```python
a = 1
isinstance(a, int)        # True
isinstance(a, type(a))    # True
cond = True
isinstance(cond, int)     # True (because bool is subclass of int)
print(cond + 1)           # 2
```

!!! question "In-class Exercise 1.2.1.1"
    1. What integer value does False represent?
    2. Experiment with `isinstance()`
    3. Research the `isinstance()` function

## 1.2.2 Sequence Types

Collections of items including:
- Lists (`list`)
- Tuples (`tuple`)
- Strings
- etc.

### Lists and Tuples

Creation:

```python
l = [1, 2, 3]  # list (mutable)
t = (1, 2, 3)  # tuple (immutable)
```

!!! question "In-class Exercises"

    #### 1.2.2.1
    1. Print a list
    2. Print one list element
    3. Create list with numbers 1-100

    #### 1.2.2.2
    1. Print a tuple
    2. Print one tuple element
    3. Create tuple with numbers 1-100

### Methods

Lists and tuples have special methods:

```python
l.append(4)    # Adds to end
l.reverse()    # Reverses in place
l.extend([5])  # Adds multiple items
l.pop(0)       # Removes and returns first item

# Tuples don't have these methods (immutable)
```

### Modifying Sequences

```python
l[0] = 1       # Valid (list is mutable)
t[0] = 1       # Invalid (tuple is immutable)

l += [6, 7]    # Modifies existing list
t += (8,)      # Creates new tuple
```

### 1.2.2.1 Slices

Extract multiple elements:

```python
# Basic slice: [start:stop:step]
nums = list(range(10))
nums[1:5]      # Items 1-4
nums[::2]      # Every other item

# Slice objects
s = slice(1, 10, 2)
nums[s]
```

### In-class Exercise 1.2.2.5
Identify which of these are valid slices.

## Other Sequence Types

- `array`: More efficient for homogeneous data
- `deque`: Double-ended queue from collections module

## Review

Key concepts:

- Python variables are names bound to objects
- Objects have: id, type, and value
- Basic types: Boolean, sequences, etc.
- Sequence types: lists (mutable), tuples (immutable)
