# Chapter 6: Python Objects and Classes

This chapter explores the fundamental concept of objects in Python. Everything you interact with in Python is an object, and understanding how to define your own objects using classes is crucial for building complex and well-structured programs.

You will learn about:

*   The nature of Python objects
*   Member attributes and methods
*   The `self` keyword in class methods
*   Special "dunder" (double underscore) methods like `__init__` and `__str__`
*   Using the `@property` descriptor for attribute management

## Python Objects

We learned early on that "everything in Python is an object." An object encapsulates data (attributes) and behavior (methods). Let's delve deeper into this concept.

We've seen how abstraction simplifies programming:

*   Abstraction of basic Python statements forms **loops**.
*   Abstraction of procedures forms **functions**.
*   Now, we introduce another layer: abstraction that helps manage **relationships between data and the operations** on that data, distinguishing variables from the objects they refer to.

Let's consider a few examples of objects we've already encountered:

```python
import pandas as pd

a = int(1.0)  # An integer object
b = pd        # A module object
c = lambda x: x + 1  # A function object (lambdas are functions)
d = type      # A type object (classes are objects too!)
def func():   # A function definition
    pass
```

!!! question "Exercise: Identifying Objects"
    Which of the variables `a`, `b`, `c`, `d`, and `func` in the code above refer to objects?
    <br>
    <br>
    (Hint: The answer might surprise you!)

When you run `type(a)`, Python tells you the type (or class) of the object `a`. If you create another integer, say `num = 100`, `type(num)` will also be `int`. This consistency shows that all integers are created (instantiated) from the same blueprint, the `int` class. This process of creating objects from a class is called **instantiation**.

To create our own types of objects, we first define a **class**. A class definition is similar to a function definition, but we use the `class` keyword instead of `def`. The details within the class body, however, introduce significant new capabilities.

Consider this simple class definition:
```python
class MyInt:
    value = 1  # This is a class attribute
```
Here, `value` is an attribute associated with the `MyInt` class itself.

Now, let's create, or **instantiate**, objects from our custom `MyInt` class.

!!! question "Exercise: Instantiating Classes"
    1.  The built-in `int` is a class. How would you create an integer object from it?
    2.  How would you create an integer-like object using our `MyInt` class definition?
    3.  How would you create another distinct object from our `MyInt` class?
    4.  Modify the `value` of one self-defined integer instance (e.g., `my_int_instance.value = 5`). Does this affect other instances or `MyInt.value`? What if you modify `MyInt.value` directly?
    5.  Are the two self-defined integer objects the same? How can you verify this?

!!! note "Instantiation"
    The creation of distinct objects from a class (e.g., two different `MyInt` objects) is known as **instantiation**. Each object is an **instance** of its class.

## The `__init__` Method: Initializing Instances

In the previous example with `MyInt`, `value = 1` was a **class attribute**. If you define an attribute directly in the class body like this, it's shared among all instances (unless an instance specifically overrides it). Often, we need each instance to have its own separate set of attributes.

To give each instance its own namespace for attributes, we use **instance attributes**. These are typically set within a special method called `__init__`. The `self` keyword is crucial here: it refers to the instance being created.

Instead of a class attribute:
```python
# class MyInt:
#     value = 1 # Class attribute shared by all instances
```
We use `__init__` to create instance attributes:
```python
# class MyInt:
#     def __init__(self, initial_value):
#         self.value = initial_value # Instance attribute, unique to each instance
```

Attempting to use `self` outside of a method context won't work as expected for initializing instances. Python needs the context of a method call to know what `self` refers to.

!!! info "The `self` Keyword"
    `self` is a conventional name for the first parameter of instance methods in Python. It refers to the instance of the class that the method is being called on. When you call a method on an instance (e.g., `my_object.my_method(arg)`), Python automatically passes `my_object` as the `self` argument to `my_method`.

The `__init__` method is a special "dunder" (double underscore) method. It's invoked automatically when you create a new instance of a class.

```python
class MyInt:
    def __init__(self, x):
        # 'self' refers to the new instance being created
        # 'x' is the argument passed during instantiation (e.g., MyInt(5))
        self.value = x  # 'self.value' becomes an instance attribute
```

!!! warning "Importance of `__init__`"
    The `__init__` method is fundamental for object-oriented programming in Python. It initializes the state (attributes) of each new object (instance). Note that `__init__` is a method defined *within* the class.

!!! question "Exercise: Calling `__init__`"
    1.  Can you call the `__init__` method directly from the global environment like a regular function (e.g., `MyInt.__init__(some_instance, value)`)?
    2.  How is the `__init__` method actually invoked when you create an object like `a = MyInt(2)`?

The `__init__` method is often called the **constructor** (though more precisely, `__new__` is responsible for creating the instance, and `__init__` is responsible for initializing it). Its primary role is to set the initial state (attributes) for an instance. It's called when you instantiate the class, using the class name as if it were a function:

```python
# When you write this:
a = MyInt(2)

# Python effectively does something like this:
# 1. Create a new instance of MyInt (let's call it new_instance internally)
# 2. Call MyInt.__init__(new_instance, 2)
# 3. Assign new_instance to 'a'

print(a.value) # Accesses the instance attribute 'value' of object 'a'
```

!!! question "Exercise: The `self` Parameter"
    When we called `a = MyInt(2)`, we only provided one argument (`2`), but the `__init__` method is defined as `def __init__(self, x)`. What happened to the `self` parameter? Did you notice anything unusual about how it's handled?

!!! question "Exercise: Dog Class"
    1.  Define a `Dog` class. Each dog instance should have a `name` (string), an `age` (integer), and a `weight` (float). These should be initialized when a `Dog` object is created using the `__init__` method.
    2.  Create three `Dog` instances:
        *   Spike (age 5, weight 12.5)
        *   Luna (age 3, weight 8.2)
        *   Puppy (age 1, weight 3.1)
    3.  Define a method called `bark` for the `Dog` class. When `bark` is called on a dog instance, it should print the dog's name followed by "says Woof!". For example, if an instance named `spike` calls `bark()`, it should print: `Spike says Woof!`.

## Other Dunder Methods

Python classes come with a variety of special methods, often called "dunder" methods (due to the double underscores surrounding their names), that allow you to customize the behavior of your objects. We've already seen `__init__`. Let's look at a few more.

### `__str__`: String Representation

The `__str__` method defines how an instance of your class should be represented as a string. This is what `print()` and the `str()` built-in function use.

```python
class Cat:
    species = "feline"  # Class attribute

    def __init__(self, name, age):
        self.name = name  # Instance attribute
        self.age = age    # Instance attribute

    def __str__(self):
        # Returns a user-friendly string representation of the Cat instance
        return f"A {type(self).__name__} named {self.name}, aged {self.age}."

# Example usage:
tom = Cat('Tom', 3)
print(tom)  # This calls tom.__str__() implicitly
# Output: A Cat named Tom, aged 3.

s = str(tom) # This also calls tom.__str__()
print(s)
# Output: A Cat named Tom, aged 3.
```

### `__iter__` and `__next__`: Making Objects Iterable

To make your object iterable (i.e., usable in a `for` loop or with other iteration contexts), you typically need to implement `__iter__` and `__next__`.
*   `__iter__(self)` should return an iterator object. This is often `self` if the class itself is designed to be its own iterator, or it could be a separate iterator object.
*   `__next__(self)` (if the class is its own iterator) should return the next item in the sequence. When there are no more items, it should raise the `StopIteration` exception.

Here's an example of a class that is iterable because its `__iter__` method returns an iterator for its internal data:
```python
from collections.abc import Iterator # Used for isinstance check

class MyIterable:
    def __init__(self, *args):
        self.data = args  # Stores the data to be iterated over

    def __iter__(self):
        # This __iter__ method returns a standard iterator for the tuple self.data
        # It does not make MyIterable instances themselves iterators,
        # but it makes them iterable.
        print("MyIterable.__iter__ called, returning an iterator for self.data")
        return iter(self.data) 

# Example usage:
i1 = MyIterable(1, 2, 3, 4, 5)

# Get an iterator from our iterable object
my_iterator = iter(i1) # This calls i1.__iter__()

print(f"Is the result of iter(i1) an Iterator? {isinstance(my_iterator, Iterator)}")

# Iterate using a for loop (which implicitly calls iter() then next())
print("\nIterating through MyIterable using a for loop:")
for item in i1:
    print(item)
```

The following is a conceptual illustration of how a `__next__` method would function, typically as part of an iterator class (which `__iter__` would return).
Note: The original raw notes presented `__next__(self, i)`, which is non-standard. `__next__` only takes `self`.

```python
class MyIteratorConcept:
    # This class is intended to be an iterator itself.
    # It would need an __init__ method to receive data and initialize self.counter.
    # For example:
    # def __init__(self, data_collection):
    #     self.data = data_collection
    #     self.counter = 0
    #
    # def __iter__(self):
    #     return self # An iterator returns itself from __iter__

    # The __next__ method as described in the raw notes, adapted for typical use:
    # (Original raw notes had 'def __next__(self, i):')
    def __next__(self): 
        # Assume self.data and self.counter are initialized in __init__
        if not hasattr(self, 'data') or not hasattr(self, 'counter'):
             raise TypeError("MyIteratorConcept not properly initialized with data and counter.")

        if self.counter < len(self.data):
            ans = self.data[self.counter]
            self.counter += 1
            return ans
        else:
            # No more items, signal completion
            raise StopIteration()
```

!!! note "Standard `__next__` Signature"
    The standard signature for the `__next__` method is `def __next__(self):`. The parameter `i` seen in the original raw notes for `__next__(self, i)` is not standard and would typically not be present. The logic of `__next__` is to return the subsequent item from the collection it iterates over or raise `StopIteration`.

## The `@property` Descriptor

In previous exercises, such as setting a dog's age, you might have set attributes by direct assignment:
```python
# Hypothetical simple Dog class
# class Dog:
#     def __init__(self, name, age):
#         self.name = name
#         self.age = age # Age can be set to anything directly

# my_dog = Dog("Buddy", 5)
# my_dog.age = -2 # Problem: Age can be set to an invalid value!
```
However, many attributes have inherent constraints or require computation when accessed or modified. For example, a dog's age cannot be negative. To protect attributes from being set to meaningless or invalid values, and to add custom logic around getting, setting, or deleting attributes while maintaining a simple attribute-access syntax, Python provides the `@property` descriptor.

Let's consider a `Dog` class where we want to control how the `age` attribute is handled. The raw lecture notes provided the following starting point, which illustrates the problem:
```python
class Dog:
    def __init__(self, initial_age):
        # For now, let's directly assign it, even if potentially negative.
        # We will see how @property helps manage this.
        self.age = initial_age 
        print(f"Dog instance created with age: {self.age}")

# Example demonstrating the issue without @property:
xiaobai = Dog(2)      # Output: Dog instance created with age: 2
xiaohuang = Dog(-1)   # Output: Dog instance created with age: -1 
                      # This is undesirable, as age shouldn't be negative.
```
The `@property` decorator allows us to define methods that are accessed like attributes (e.g., `my_dog.age`) but trigger custom code for getting, setting, and deleting their values. This provides a way to implement validation, computation, or side-effects when attributes are manipulated.

*(The lecture notes would typically continue here to show how to implement `@property` with its associated setter and deleter methods to manage the `age` attribute correctly.)*
1ERROR
