# Programming for AI (Python)
## Chapter 1: Basics
### What you will learn
- Very elementary Python theory
- Some building blocks
- Some functions
- Memorize the names
- Know the meaning of their parameters
- Understand and interpret the output

!!! note "Programming Analogy"
    If we liken a program to a building, the variables are blocks and syntax tells the programmer how to put the blocks together to form walls. Different programs are just different ways to put the walls together.

## 1. The boring variables
Programming is an art of putting mathematical ideas into practice. During your past study of math, you must have seen abstraction several times. 

### Variable Abstraction
- In primary schools, we learned to count 1, 2, 3...
- In middle school, we learned to use the notation 𝑥 to represent a generic [general, representative] number
- In Python, we call 𝑥 "names"

!!! note "Variable Creation"
    When we create a variable, Python:
    1. Creates a chunk of memory to store the value
    2. Binds the value (memory) to the name we provided

### Example: Variable Memory
```python
# quick verification
a = 1
print(id(a))
b = a
print(id(b))
# not appearing as an address? format it
print(f"{id(b):02X}")
```

### Key Concepts
1. The `print` function: shows the contents of the printed
2. The `id`: gives you the address of the object in memory
3. f-string for formatting: just "f" and "{}"

!!! question "In-class exercise 1.1"
    1. Create a name-value pair to store the name of a person, who is "Alice"
    2. Print Alice's "name"
    3. Bind the variable to "Bob"
    4. Using f-string to print the contents of "name"

## 1.1 "Names refer to objects"
### Key Principles
1. "Everything in Python is an object"
2. Objects are chunks of memories with specific structures

!!! question "In-class exercise 1.1.1"
    Can you summarise some features of an object?
    Hint: We have learned that everything is an object. What do they have in common?

### Memory Layout
- The contents of the object is referred to as the memory layout
- Memory layout tells us how the chunk of memory is arranged to store the data
- Example: `sys.getsizeof(a)`

## 1.2 Objects' types
The topic of variable types is large. Official documentation: [Python Standard Types](https://docs.python.org/3/library/stdtypes.html)

### Basic Type Examples
```python
a = 1
b = 2.0
c = 3.14 - 5j
cond = True
```

!!! question "In-class exercise 1.2.1"
    Use the `type` function to see what types these variables are.

### 1.2.1 Simple types — Boolean
The Boolean type is special in Python.

```python
a = 1
print(isinstance(a, int))
print(isinstance(a, type(a)))
cond = True
print(isinstance(cond, int))
print(cond + 1)
```

!!! question "In-class exercise 1.2.1.1"
    1. If True in Python is also 1, how about False?
    2. Try other types with the isinstance function. Do you find any interesting things?
    3. Search the web for the document of the isinstance function and read.

## 1.2.2 Complex types
These are types that combine several variables:
- Sequences
- Mappings
- Strings
- etc.

### 1.2.2 Sequences — list & tuple
Most frequently encountered sequence types.

```python
l = [1, 2, 3]  # list
t = (1, 2, 3)  # tuple
```

!!! question "In-class exercise 1.2.2.1 (List)"
    1. Try to print a list
    2. Try to print one element of a list
    3. Create a list containing 100 numbers from 1 to 100

!!! question "In-class exercise 1.2.2.2 (Tuple)"
    1. Try to print a tuple
    2. Try to print one element of a tuple
    3. Create a tuple containing 100 numbers from 1 to 100

### List and Tuple Methods
Special "functions" (methods) that work on specific lists/tuples.

```python
l = [1, 2, 3]
l.append(4)    # ✓
l.reverse()    # ✓
l.extend((5))  # ✓
l.pop(0)       # ✓

t = (4, 5, 6)
# t.append()   ✗ Not allowed
# t.reverse()  ✗ Not allowed
```

### Modifying Elements
```python
l = [1, 2, 3]
t = (4, 5, 6)
l[0] = 1       # ✓ Works
# t[0] = 1     ✗ Fails
```

!!! question "In-class exercise 1.2.2.3"
    1. Use l and t you just created
        1. Set the second element of l to -1
        2. Set the second element of t to -1
    2. Analyze the memory layout of the changes

### 1.2.2.1 Slices
Taking multiple elements from a sequence.

```python
s = slice(1, 10, 2)
l = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
print(l[s])  # Same as l[1:10:2]
```

!!! question "In-class exercise 1.2.2.4"
    1. Is slice a function?
    2. Is l a function?

!!! question "In-class exercise 1.2.2.5"

    Are these valid slices?  
    1. 1:2:1  
    2. 2:4:7  
    3. 9:1:-1  
    4. a:b:c  
    5. 1.5:2.3:3.14  
    6. a:2:3  
    7. 6:7  
    8. :-5:-1  
    9. ::-1


## Review
- Python variables are actually objects with names
- Objects consist of three components: id, type, and value
- Basic types: Boolean, sequences, etc.
