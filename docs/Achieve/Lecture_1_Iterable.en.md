# Chapter 1 Basics: Iterables and Iterators

*Source: Programming for AI (Python), Guoliang Ma, The Chow Institute, 2025*

## Iterables

Loosely speaking, we can think of **Iterables** as if they are a type. But more precisely, Iterables refer to any objects in Python that share some common characteristics allowing them to be iterated over (looped through).

### Key Properties of Iterables

1.  **Usable in `for` loops:**
    The most common use case. All Iterables can be passed to a `for` loop. This directly corresponds to its name: being *ABLE* to be *ITERated*.
    ```python
    my_list = [10, 20, 30] # A list is an Iterable
    for item in my_list:
        print(item)
    ```

2.  **Usable with the `iter()` function:**
    Only Iterables can be passed as an argument to the built-in `iter()` function without causing an error. The `iter()` function returns an *iterator* object from the Iterable.
    ```python
    a = [1, 2, 3]  # list is Iterable
    b = 1          # int is not Iterable

    iterator_a = iter(a) # Correctly gets an iterator object
    print(iterator_a)

    # iter(b)          # This would raise a TypeError: 'int' object is not iterable
    ```

3.  **Contain the `__iter__` method:**
    What technically makes an object an Iterable? It must implement the special method `__iter__`.
    Everything in Python is an object, and objects contain data and methods. You can inspect the contents of an object using `dir()`.
    ```python
    a = [1, 2, 3]
    print(dir(a)) # You will find '__iter__' in the output
    ```
    The defining property of an Iterable is the presence of this `__iter__` method. When you call `iter(a)`, Python internally calls `a.__iter__()`. This only works if the object `a` actually has the `__iter__` method.

4.  **Fallback for `for` loops: `__getitem__` (Less Common):**
    The text notes that sometimes objects *without* `__iter__` might still work in a `for` loop if they implement the `__getitem__` method (used for indexing, like `my_list[0]`). This is primarily for backward compatibility. The standard way to define iteration is via `__iter__`.

## Iterators

Iterators are closely related to Iterables.

*   **Iterators *are* Iterables:** Iterators themselves must also have the `__iter__` method. This means an iterator can also be passed to `iter()`, usually returning itself.
*   **Iterators have `__next__`:** What distinguishes an Iterator from a general Iterable is the presence of the `__next__` method. This method is responsible for producing the *next* item in the sequence and raising a `StopIteration` exception when there are no more items.

```python
my_list = [1, 2]
my_iterator = iter(my_list) # Get an iterator from the list (Iterable)

# Check methods (Illustrative - dir() output is long)
# print(dir(my_iterator)) # Will contain both __iter__ and __next__

# How iterators work (behind the scenes of a for loop)
print(next(my_iterator)) # Output: 1
print(next(my_iterator)) # Output: 2
# print(next(my_iterator)) # Would raise StopIteration exception
```

## Why Distinguish Between Iterables and Iterators?

*   **Iterables:** Think of these as the data *sources* or *containers* (like lists, tuples, strings, dictionaries, files, etc.). Python provides many built-in Iterables. Their primary role in iteration is to provide an *iterator* when asked (via `iter()` or implicitly by a `for` loop).

*   **Iterators:** Think of these as the *workers* that perform the actual iteration, keeping track of the current position and fetching the next item *on demand*. We need iterators for **lazy evaluation**. This means:
    *   Values are generated one by one, only when requested by `next()`.
    *   This is memory efficient, especially for large datasets or potentially infinite sequences, as the entire sequence doesn't need to be stored in memory at once.
    *   It allows computation to happen only when necessary.

In summary: You typically use an **Iterable** (like a list) in a `for` loop. Behind the scenes, Python gets an **Iterator** from the Iterable using `__iter__`, and then repeatedly calls `__next__` on the iterator to get each item until `StopIteration` is raised.