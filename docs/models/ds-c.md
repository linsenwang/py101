ds-c

# Programming for AI (Python)

## Chapter 1: Basics  
*The Chow Institute, 2025*

### What You Will Learn
- Very elementary Python theory  
- Some building blocks  
- Some functions  
- Memorize the names  
- Know the meaning of their parameters  
- Understand and interpret the output  

!!! quote "Insight"  
    If we liken a program to a building, the variables are blocks and syntax tells the programmer how to put the blocks together to form walls. Different programs are just different ways to arrange the walls.  

---

## 1. Variables  

Programming is an art of putting mathematical ideas into practice. Abstraction is fundamental—just as `𝑥` represents a generic number in math, **names** (variables) in Python represent values.  

!!! note "Key Concept"  
    When a variable is created:  
    1. Python allocates memory to store its value.  
    2. The value (memory chunk) is bound to the provided name.  

**Example:**  
```python
a = 1
print(id(a))          # Memory address of 'a'
b = a
print(id(b))          # Same address as 'a' (shared reference)
print(f"{id(b):02X}") # Formatted as hexadecimal
```

### Observations:  
1. `print()`: Displays content.  
2. `id()`: Returns the memory address of an object.  
3. **f-strings**: Format strings dynamically (e.g., `f"{variable}"`).  

!!! question "Exercise 1.1"  
    1. Create a variable `name` storing `"Alice"`.  
    2. Print the value of `name`.  
    3. Reassign `name` to `"Bob"`.  
    4. Use an f-string to print: `"The name is: {name}"`.  

---

## 1.1 Names Refer to Objects  

!!! info "Background"  
    Everything in Python is an **object**—a structured chunk of memory.  

### Features of Objects:  
- **Memory layout**: How data is arranged in memory.  
- Inspect size with `sys.getsizeof(a)`.  

!!! question "Exercise 1.1.1"  
    Summarize common features of objects.  
    *Hint: What do all Python objects share?*  

---

## 1.2 Object Types  

[Official Documentation](https://docs.python.org/3/library/stdtypes.html)  

**Examples:**  
```python
a = 1          # int
b = 2.0        # float
c = 3.14 - 5j  # complex
cond = True    # bool
```

!!! question "Exercise 1.2.1"  
    Use `type()` to check the types of `a`, `b`, `c`, and `cond`.  

### 1.2.1 Boolean Type  

Booleans (`True`/`False`) are a subtype of integers:  
```python
print(True + 1)  # Output: 2
isinstance(True, int)  # Returns True
```

!!! question "Exercise 1.2.1.1"  
    1. Is `False` equivalent to `0`? Verify.  
    2. Test `isinstance()` with other types (e.g., `float`, `str`).  
    3. Read the `isinstance()` [documentation](https://docs.python.org/3/library/functions.html#isinstance).  

### 1.2.2 Complex Types  

Collections of variables:  

- **Sequences**: Lists, tuples, strings.  
- **Mappings**: Dictionaries.  

#### Lists & Tuples  
**Creation:**  
```python
l = [1, 2, 3]  # Mutable list
t = (1, 2, 3)  # Immutable tuple
```

!!! question "Exercise 1.2.2.1"  
    1. Print `l`.  
    2. Print the second element of `l`.  
    3. Create a list with numbers 1–100.  

!!! question "Exercise 1.2.2.2"  
    Repeat Exercise 1.2.2.1 for tuples.  

#### Methods vs. Functions  
!!! warning  
    Most list methods modify the list in-place (e.g., `append()`, `pop()`).  

**Key Methods:**  
- `append(x)`: Add single element.  
- `extend(iterable)`: Add multiple elements.  
- `pop(index)`: Remove and return item.  

**Operators:**  
- `+`: Concatenates sequences (creates a new object).  

!!! question "Exercise 1.2.2.3"  
    1. Set the second element of `l` to `-1`.  
    2. Attempt the same for `t`. What happens?  

#### Mutability Comparison  

| Operation       | List (`l`) | Tuple (`t`) |
|-----------------|------------|-------------|
| `l[0] = 1`      | ✓          | ✗           |
| `del l[1]`      | ✓          | ✗           |
| `l.append(4)`   | ✓          | ✗           |
| `l += [6, 7]`   | ✓ (same ID)| ✗ (new ID)  |

#### 1.2.2.1 Slices  
Extract sub-sequences with `start:stop:step`:  

```python
s = slice(1, 10, 2)  # Slice object
l[s]  # Equivalent to l[1:10:2]
```

!!! question "Exercise 1.2.2.4"  
    1. Is `slice` a function?  
    2. Is `l` a function?  

!!! question "Exercise 1.2.2.5"  
    Identify valid slices:  
    1. `1:2:1`  
    2. `a:b:c`  
    3. `::-1`  

---

## Other Sequence Types  

- **Arrays**: Homogeneous elements (faster than lists).  
- **Deque**: Double-ended queue ([docs](https://docs.python.org/3/library/collections.html#collections.deque)).  

---

## Review  

1. Variables are **named references** to objects.  
2. Objects have:  
   - `id`: Memory address.  
   - `type`: Data structure.  
   - `value`: Stored data.  
3. Basic types: Boolean, sequences (lists, tuples), etc.  
``` 

This version adheres to MkDocs formatting, uses clear headings, and organizes exercises/key concepts with appropriate admonitions. Let me know if you'd like any refinements!