ds-r

# Programming for AI (Python)

## Chapter 1: Basics

### Learning Objectives
- Understand elementary Python theory
- Master core building blocks and functions
- Memorize key names, parameters, and output interpretations
- Recognize variables as foundational program components

!!! quote "Program Structure Analogy"
    "If we liken a program to a building, variables are blocks and syntax defines how to assemble them into walls. Different programs are unique combinations of these walls."

---

## 1. Variables: The Fundamental Abstraction

### 1.1 Variables in Mathematics vs. Python
- **Mathematical Abstraction**: Use of `𝑥` to represent generic numbers
- **Python Implementation**:
  ```python
  a = 1
  print(id(a))  # Display memory address
  b = a
  print(f"{id(b):02X}")  # Formatted hexadecimal address
  ```

!!! note "Key Concept: Name-Value Binding"
    Python creates memory to store a value and binds it to a variable name. Identical values share memory addresses until modified.

---

### 1.2 Objects and Memory
#### 1.2.1 Core Principles
- **"Names refer to objects"**: All Python entities are objects
- **Object Composition**:
  - Memory layout (data storage structure)
  - Type (classification of data)
  - Identity (unique memory address)

!!! info "Object Characteristics"
    - Immutable vs. mutable states
    - Memory allocation with `sys.getsizeof()`
    - Type-specific methods

---

## 2. Data Types

### 2.1 Basic Types
```python
a = 1          # int
b = 2.0        # float
c = 3.14 -5j   # complex
cond = True    # bool
```

#### 2.1.1 Boolean Type Nuances
```python
print(isinstance(True, int))  # Returns True
print(True + 1)               # Returns 2
```

!!! question "Exercise 1.2.1: Type Investigation"
    Use `type()` to determine variable types:
    ```python
    print(type(a), type(b), type(c), type(cond))
    ```

---

### 2.2 Sequence Types

#### 2.2.1 Lists vs. Tuples
| Feature               | List          | Tuple         |
|-----------------------|---------------|---------------|
| Mutability            | Mutable       | Immutable     |
| Syntax                | `[ ]`         | `( )`         |
| Common Methods        | append, pop   | count, index  |

```python
l = [1, 2, 3]  # Mutable list
t = (4, 5, 6)  # Immutable tuple
```

!!! question "Exercise 1.2.2.1: Sequence Manipulation"
    1. Create a list with numbers 1-100
    2. Attempt to modify tuple elements
    3. Compare memory IDs after modifications

---

#### 2.2.2 Slicing Operations
```python
s = slice(1, 10, 2)
print(l[s])  # Returns [2, 4, 6, 8, 10]
```

!!! question "Exercise 1.2.2.5: Slice Validation"
    Determine validity of these slices:
    ```python
    1:2:1, 9:1:-1, ::-1
    ```

---

## 3. Advanced Sequence Types

### 3.1 Array vs Deque
- **Array**: Homogeneous elements, C-like efficiency (`import array`)
- **Deque**: Double-ended queue from `collections` module

!!! info "Performance Note"
    Arrays use memory offsets for faster access compared to lists.

---

## Review: Core Concepts
- Python variables are **object references**
- Object components: 
  1. Identity (`id()`)
  2. Type (`type()`)
  3. Value
- Essential types: Boolean, numeric, sequences
- Sequence manipulation through slicing and methods

```python
# Memory verification example
x = [10, 20, 30]
y = x
print(id(x) == id(y))  # True (same object)
```


!!! quote "Final Insight"
    "Understanding variables as object references is fundamental to mastering Python's memory management and data manipulation capabilities."