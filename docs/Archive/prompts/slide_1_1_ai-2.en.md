# Programming for AI (Python)

## Chapter 1: Basics  
*The Chow Institute, 2025*

### Learning Objectives
- Elementary Python theory
- Fundamental building blocks
- Function concepts
- Memorize key names
- Understand parameter meanings
- Interpret program outputs

!!! note "Programming Analogy"
    If we liken a program to a building:
    - Variables are the blocks
    - Syntax tells how to assemble blocks into walls
    - Different programs = different wall configurations

## 1. Variables: The Foundation

Programming translates mathematical abstraction into practice. The most fundamental abstraction is the **variable** - a symbolic representation of values.

### 1.1 Names and Objects
In Python:
- We call variables **names**
- Creating a variable:
  1. Allocates memory for the value
  2. Binds the name to that memory location

**Example: Memory Verification**
```python
a = 1
print(id(a))  # Memory address
b = a
print(id(b))  # Same address
print(f"{id(b):02X}")  # Formatted hex address
```

Key concepts demonstrated:
1. `print()` function
2. `id()` for memory addresses
3. f-strings for formatting

!!! question "Exercise 1.1: Name Binding"
    1. Create a variable `name` storing "Alice"  
    2. Print the name  
    3. Reassign to "Bob"  
    4. Print using f-string: `f"Name: {name}"`  

### 1.1.1 Object Characteristics
> "Everything in Python is an object"

Objects are memory chunks with specific structures. Key features:
- Memory layout (how data is arranged)
- Type information
- Methods/operations available

```python
import sys
sys.getsizeof(a)  # Check memory usage
```

!!! question "Exercise 1.1.1: Object Features"
    What common features do all Python objects share?  
    Hint: Consider memory, type, and operations.

## 1.2 Data Types

### 1.2.1 Simple Types
Core primitive types:

```python
a = 1          # int
b = 2.0        # float
c = 3.14-5j    # complex
cond = True    # bool
```

!!! question "Exercise 1.2.1: Type Inspection"
    Use `type()` to check each variable's type.

#### Boolean Special Cases
Booleans subclass integers in Python:

```python
isinstance(True, int)  # Returns True
print(True + 1)        # Prints 2
```

!!! question "Exercise 1.2.1.1: Boolean Exploration"
    1. What integer value does `False` represent?  
    2. Test `isinstance()` with other types  
    3. Research `isinstance()` documentation  

### 1.2.2 Sequence Types
Collections of items (e.g., mathematical sets):

#### Lists & Tuples
```python
l = [1, 2, 3]  # Mutable list
t = (1, 2, 3)  # Immutable tuple
```

!!! question "Exercise 1.2.2.1: List Practice"
    1. Print a list  
    2. Print one element  
    3. Create list with numbers 1-100  

!!! question "Exercise 1.2.2.2: Tuple Practice"
    1. Print a tuple  
    2. Print one element  
    3. Create tuple with numbers 1-100  

#### Key Differences
| Operation       | List | Tuple |
|-----------------|------|-------|
| Modify element  | ✓    | ✗     |
| Delete element  | ✓    | ✗     |
| `append()`      | ✓    | ✗     |
| `+=` operation  | Same ID | New ID |

```python
l[0] = 1    # Valid
t[0] = 1    # TypeError
```

#### Slicing
Format: `[start:stop:step]`

```python
s = slice(1, 10, 2)
l[s]  # Equivalent to l[1:10:2]
```

!!! question "Exercise 1.2.2.4: Slice Objects"
    1. Is `slice` a function?  
    2. Is `l` a function?  

!!! question "Exercise 1.2.2.5: Slice Validation"
    Which are valid slices?  
    1. `1:2:1`  
    2. `2:4:7`  
    ...  
    9. `[::-1]`  

### 1.2.2.1 Other Sequence Types
- **array**: Homogeneous, faster than lists
- **deque**: Double-ended queue (from `collections` module)

```python
from array import array
from collections import deque
```

## Chapter Review
- Python variables are named objects
- Objects have: ID, type, and value
- Core types: Boolean, sequences, etc.