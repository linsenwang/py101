qwen

# Programming for AI (Python)
## Chapter 1: Basics
### The Chow Institute, 2025

### What You Will Learn
This chapter covers:
- Fundamental Python concepts
- Core programming building blocks
- Essential functions and their parameters
- Program structure fundamentals

> **Note**: If we liken a program to a building, variables are the blocks and syntax tells us how to assemble them. Different programs are simply different ways of organizing these components.

---

## 1. Variables
### 1.1 Names and Objects
In Python, variables are called "names". When we create a variable like `x = 1`, Python:
1. Allocates memory to store the value
2. Binds the name to this memory location

```python
# Example: Memory address verification
a = 1
print(id(a))
b = a
print(id(b))
print(f"{id(b):02X}")  # Format as hexadecimal
```

### 1.2 Key Concepts
!!! note "Variable Fundamentals"
    - Variables act as references to memory locations
    - Multiple names can refer to the same object
    - `id()` shows the memory address of an object

### 1.3 In-Class Exercise
!!! question "Exercise 1.1: Variable Assignment"
    1. Create a name-value pair for person "Alice"  
    2. Print Alice's name  
    3. Rebind the variable to "Bob"  
    4. Use f-string to print the new value  

---

## 1.2 Object Types
### 1.2.1 Built-in Types
Python has several fundamental types:
```python
a = 1        # Integer
b = 2.0      # Float
c = 3.14-5j  # Complex
cond = True  # Boolean
```

### 1.2.2 Type Inspection
```python
# Type checking example
a = 1
isinstance(a, int)        # True
isinstance(a, type(a))    # True
cond = True
isinstance(cond, int)     # True (Booleans inherit from int)
print(cond + 1)           # 2
```

### 1.2.3 In-Class Exercise
!!! question "Exercise 1.2.1"
    1. Use `type()` to verify the types of variables a, b, c  
    2. Investigate if False equals 0  
    3. Test other type combinations with `isinstance()`  

---

## 1.2.2 Sequence Types
### 1.2.2.1 Lists and Tuples
| Feature        | List                  | Tuple                 |
|----------------|-----------------------|-----------------------|
| Mutability     | Mutable               | Immutable             |
| Syntax         | `[]`                  | `()`                  |
| Common Use     | Data modification     | Data protection       |

```python
# Sequence creation
l = [1, 2, 3]     # List
t = (1, 2, 3)     # Tuple
```

### 1.2.2.2 Sequence Operations
```python
# Slice operations
s = slice(1, 10, 2)
l[s]  # Apply slice to list
```

### 1.2.2.3 In-Class Exercises
!!! question "Exercise 1.2.2.1"
    1. Create and print a list of numbers 1-100  
    2. Access specific elements by index  
    3. Compare memory layout before/after modifications  

!!! question "Exercise 1.2.2.3"
    1. Try modifying elements in both list and tuple  
    2. Verify which operations succeed/failed  
    3. Compare memory addresses before/after changes  

---

## 1.2.3 Special Sequence Features
### 1.2.3.1 Slice Notation
Valid slice examples:
```python
1:2:1        # Valid step
2:4:7        # Valid range
9:1:-1       # Valid reverse
::-1         # Complete reverse
```

Invalid slices:
```python
1.5:2.3:3.14   # Float indices
a:2:3          # Mixed types
```

### 1.2.3.2 Performance Considerations
- Arrays (from `array` module) offer faster access than lists
- Deques (from `collections` module) optimize append/pop operations
- All sequence types support:
  ```python
  element in sequence  # Membership test
  sequence[index]      # Access
  ```

---

## Chapter Review
!!! note "Key Concepts"
    - Variables are references to memory objects
    - Objects have three components: identity, type, and value
    - Sequence types share common operations but differ in mutability
    - Type-specific methods modify objects in-place

For more details on sequence types, visit:
- [Python Arrays](https://docs.python.org/3/library/array.html)
- [Python Deques](https://docs.python.org/3/library/collections.html#collections.deque)

Source: [Python Miscrave](https://miscrave.com/articles/your-name-flavors-youth/)