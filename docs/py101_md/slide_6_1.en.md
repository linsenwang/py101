# Objects

## What You Will Learn

This chapter delves into the concept of objects in Python. You will learn about:

*   Everything in Python as an **object**.
*   An object's **member attributes** and **member methods**.
*   The `self` keyword and its role in classes.
*   Special "dunder" (double underscore) methods like `__init__` and `__str__`.
*   The `@property` descriptor for controlled attribute access.

## Python Objects

We learned in the first week that "everything in Python is an object." At that time, we briefly mentioned that an object consists of three parts. Now, we'll explore this concept in more detail.

We've seen layers of abstraction in Python:
*   Abstraction of basic Python statements forms **loops**.
*   Abstraction of procedures forms **functions**.

Now, we introduce another layer:
*   Abstraction concerning the **relationships of data and the separation of variables from objects**.

Let's start by defining a few different types of objects:

```python
import pandas as pd

a = int(1.0)
b = pd
c = (lambda x: x + 1)
d = type

def func():
    pass
```

!!! question "Exercise: Object Definition"
    Which of the variables (`a`, `b`, `c`, `d`) and the function `func` defined above are objects?

When we run `type(a)`, Python shows us the type of the variable `a`. If we define another integer, say `x = 2`, `type(x)` will be the same as `type(a)`. This consistency shows that all integers are created (or "instantiated") in the same way. This way of creating objects is summarized under the name `int`. We refer to such "blueprints" for creating objects as **classes**, and the process of creating an object from a class is called **instantiation**.

!!! note "Key Concept: Classes and Instantiation"
    A **class** is a blueprint for creating objects. An **object** is an instance of a class. The process of creating an object from a class is known as **instantiation**.

To instantiate a class, we first need to define the class. The syntax is similar to defining a function, but we use the `class` keyword instead of `def`.

Here's a simple class definition:

```python
class MyInt():
    value = 1
```
This creates a class named `MyInt`. Inside this class, we've defined a class attribute `value` and set it to `1`.

Now, let's create an "integer" (an instance of `MyInt`) according to our own definition.

!!! question "Exercise: Class Instantiation"
    1.  The built-in `int` is a class defined by Python. How would you create an integer (an instance of `int`) from it?
    2.  How would you create an instance of our `MyInt` class?
    3.  How would you create another, different instance of `MyInt`?
    4.  Modify the `value` attribute of one of your `MyInt` instances. Does the `value` change for the other `MyInt` instance? (Hint: access class attributes via the instance, e.g., `my_instance.value`, or via the class, e.g., `MyInt.value`).
    5.  Are the two `MyInt` instances you created the same object? How can you check?

The creation of distinct `MyInt` objects, as explored in the exercise, is known as instantiation.

!!! info "Image Source"
    The concept of a class as a "factory" for objects can be visualized like a manufacturing plant.
    Source: `https://www.istockphoto.com/photos/cartoon-of-the-manufacturing-plant` (conceptual analogy)

## The `__init__` Method

In our previous `MyInt` example, if we define an attribute directly in the class's namespace (like `value = 1`), all instances might share or be affected by changes to this class attribute in certain ways. To give each instance its own distinct attributes and initial state, we need to provide each instance with its own namespace. Because this namespace is specific to the instance itself, we often refer to attributes within it using the `self` keyword.

Consider this modification:
If `value = 1` is a class attribute, to make it an instance attribute, we'd typically do `self.value = 1` within a method.

Simply trying to use `self` without a proper context won't work. Python needs a specific context to understand `self`, which refers to the instance being created or manipulated. The primary method for establishing this context and initializing an instance's state is the `__init__` method.

!!! note "Important: The `__init__` Method"
    The `__init__` method is crucial when programming with classes. It's a special method (a "dunder" method) that Python automatically calls when you create a new instance of a class. Notice that we are defining a function *inside* a class definition. Such functions are called **methods**.

Here's how we can define `MyInt` with an `__init__` method to set an initial value for each instance:

```python
class MyInt():
    def __init__(self, x):
        self.value = x
```

!!! question "Exercise: Calling `__init__`"
    1.  Can you call the `__init__` method directly from the global environment (e.g., `__init__(self, 5)` or `MyInt.__init__(some_instance, 5)`)?
    2.  How is the `__init__` method actually called when you create an instance?

!!! note "Key Concept: Constructor"
    The `__init__` method is often called the **constructor**. Its primary role is to initialize the newly created object's attributes (i.e., set their initial values). When you create an instance of a class, like `a = MyInt(2)`, you are implicitly calling the `__init__` method. Python passes the arguments from the class call (e.g., `2` in `MyInt(2)`) to `__init__` (after `self`).

So, when we write:
```python
a = MyInt(2)
```
Python does something like this behind the scenes:
1. Creates an empty `MyInt` object.
2. Calls `MyInt.__init__(a, 2)`, where `a` (the newly created object) is passed as the `self` argument.
Inside `__init__`, `self.value = x` then sets the `value` attribute on this specific instance `a`.

!!! question "Exercise: Constructor Call Observation"
    1.  When you wrote `a = MyInt(2)`, did you notice anything unusual about the number of arguments you passed to `MyInt()` versus the number of parameters defined in `__init__(self, x)`? What does this imply about the `self` parameter?

!!! question "Exercise: Defining a Dog Class"
    1.  Define a `Dog` class. Each `Dog` instance should have a `name` (string), an `age` (integer), and a `weight` (float). Use the `__init__` method to initialize these attributes.
    2.  Create three `Dog` instances: `Spike`, `Luna`, and `Puppy`. You can choose their ages and weights.
    3.  Define a method called `bark` for the `Dog` class. When this method is called on a `Dog` instance, it should print the dog's name to the screen (e.g., "Spike says Woof!").
    For example: (The example output or further details might be provided by the instructor)

## Some Other Dunder Methods

Python classes can define various special methods, known as "dunder" (double underscore) methods, to integrate with Python's built-in syntax and features. We've already seen `__init__`. Let's explore a few more.

### Example: The `__str__` Method

The `__str__` method is called by the built-in `str()` function and by `print()` to get a user-friendly string representation of an object.

```python
class Cat:
    species = "feline"  # Class attribute

    def __init__(self, name, age):
        self.name = name  # Instance attribute
        self.age = age    # Instance attribute

    def __str__(self):
        return f"A {type(self).__name__} named {self.name}."

tom = Cat('Tom', 3)
print(tom)  # This will implicitly call tom.__str__()
```
Output:
```
A Cat named Tom.
```

### Example: Iterable and Iterator Support (`__iter__` and `__next__`)

To make an object iterable (i.e., usable in a `for` loop), you can implement the `__iter__` method. This method should return an iterator object. An iterator object, in turn, implements the `__next__` method to produce the next item in the sequence and raises `StopIteration` when there are no more items.

First, let's define a class that can be made iterable:
```python
class MyIterable:
    def __init__(self, *args):
        self.data = args

    def __iter__(self):
        # For simplicity, we use Python's built-in iter() on a list.
        # A custom iterator could also be returned.
        return iter(self.data)

# Example usage:
i1 = MyIterable(1, 2, 3, 4, 5)
for item in i1:
    print(item)

# Check if iter(i1) returns an iterator
# (Note: 'Iterator' here usually refers to collections.abc.Iterator)
# from collections.abc import Iterator
# isinstance(iter(i1), Iterator)
isinstance(iter(i1), object) # A more general check if Iterator isn't imported
# The raw notes had: isinstance(iter(i1), Iterator )
# Assuming 'Iterator' was a defined type or from collections.abc
```

Here's a conceptual structure for a custom iterator class. Note that the following `MyIterator` class has some unusual characteristics as presented in the raw notes (e.g., `self.counter = 0` at the class level which is syntactically incorrect, and an unused `i` parameter in `__next__`, and uninitialized `self.data`). This is preserved from the raw notes.

```python
class MyIterator:
    # The following line 'self.counter = 0' is syntactically incorrect if placed here directly.
    # It's preserved from the raw notes, which might imply it belongs in an __init__ or is pseudo-code.
    # If it were `counter = 0`, it would be a class attribute.
    # self.counter = 0 # This would cause a NameError: name 'self' is not defined

    # Assuming the intent was a class attribute or it belongs in __init__
    # For demonstration, let's assume it was intended to be initialized in __init__
    # and self.data was also passed. A more complete example:
    # def __init__(self, data_source):
    #     self.data = data_source
    #     self.counter = 0

    def __next__(self, i): # The 'i' parameter is unusual for a standard __next__ method.
        # This method, as written, would raise an AttributeError
        # because self.data and self.counter are not guaranteed to be initialized.
        if self.counter < len(self.data):
            ans = self.data[self.counter]
            self.counter += 1
            return ans
        else:
            raise StopIteration()
```
!!! warning "Note on `MyIterator` Code"
    The `MyIterator` class example above is based directly on potentially incomplete or pseudo-code snippets from the raw lecture notes. Specifically, initializing `self.counter` at the class level is a syntax error, and `self.data` is used without prior initialization within `MyIterator` itself. A typical iterator would initialize its state (like `counter` and its data source) in its `__init__` method. The `i` parameter in `__next__` is also non-standard.

## The `@property` Descriptor

In the previous Dog class exercise, you might have set the age of a dog directly, e.g., `my_dog.age = 5`. However, some attributes need constraints; for example, a dog's age cannot be negative. To protect attributes from being set to meaningless or invalid values, and to add logic around attribute access, Python provides the `@property` descriptor.

This allows you to define methods that are accessed like attributes.

(Content for `@property` continues from here based on the rest of the lecture notes...)
```
```python
class Dog:
    def __init__(self, age):
        # self._age = age # A common convention for a "private" variable
        self.age = age # This will now use the setter

    @property
    def age(self):
        print("Getting age...")
        return self._age

    @age.setter
    def age(self, value):
        print(f"Setting age to {value}...")
        if value < 0:
            raise ValueError("Age cannot be negative")
        self._age = value

# xiaobai = Dog(2)
# print(xiaobai.age)
# xiaobai.age = 3
# print(xiaobai.age)

# xiaohuang = Dog(-1) # This will now raise a ValueError due to the setter logic
```

(Further explanation of `@property`, `@<attribute>.setter`, and `@<attribute>.deleter` would typically follow here.)
```
```markdown
# Python: Property Descriptors and Object Philosophy

This lecture explores advanced object-oriented programming concepts in Python, focusing on property descriptors for controlled attribute access and the underlying rationale for using objects in Python.

## The Property Descriptor

When defining classes, we often want to control how attributes are accessed or modified. For instance, an `age` attribute for a `Dog` class should ideally not accept negative values.

### The Challenge: Uncontrolled Attribute Access

Consider a simple `Dog` class:

```python
class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age

# We can create instances:
xiaobai = Dog("Xiaobai", 2)
print(f"{xiaobai.name} is {xiaobai.age} years old.")

# But nothing prevents setting invalid values:
xiaohuang = Dog("Xiaohuang", -1) # Age can be negative!
print(f"{xiaohuang.name} is {xiaohuang.age} years old. This is problematic!")

xiaohuang.age = -5 # And can be changed to an invalid value later
print(f"{xiaohuang.name}'s age is now {xiaohuang.age}.")
```

To "protect" the member attribute `age` from such "wild" values, we can use functions to get (access) and set (change) it.

### Solution 1: Getter and Setter Methods

We can introduce specific methods to manage the `age` attribute. By convention, the actual data is often stored in an attribute with a leading underscore (e.g., `_age`) to indicate it's intended for internal use.

```python
class Dog:
    def __init__(self, name, age=0): # Provided a default age
        self.name = name
        self._age = 0 # Initialize internal attribute
        self.set_age(age) # Use the setter to validate initial age

    def get_age(self):
        return self._age

    def set_age(self, age_value):
        if age_value > 0:
            self._age = age_value
        else:
            # The original notes had an inverted condition:
            # if age > 0: raise ValueError("Age must be positive")
            # This has been corrected to reflect the intended logic.
            raise ValueError("Age must be positive and greater than zero.")

# Now, users are encouraged to use these methods:
xiaobai = Dog("Xiaobai")
xiaobai.set_age(2)
print(f"{xiaobai.name}'s age is {xiaobai.get_age()}.")

try:
    xiaohuang = Dog("Xiaohuang")
    xiaohuang.set_age(-1)
except ValueError as e:
    print(f"Error setting {xiaohuang.name}'s age: {e}")

try:
    xiaohei = Dog("Xiaohei", -3) # Validation also occurs at initialization
except ValueError as e:
    print(f"Error initializing {xiaohei.name if 'xiaohei' in locals() else 'dog'}: {e}")
```

!!! note "Encouraging Method Usage"
    The next step is to encourage users to consistently use `get_age()` and `set_age()`. While they *could* still access `_age` directly (e.g., `xiaobai._age = -10`), this violates the intended interface.

### Solution 2: The `property` Descriptor

However, some developers ("mavericks," as the original notes colorfully put it) might still prefer direct attribute access syntax (e.g., `dog.age = 5`) over calling methods. Python provides a built-in `property` descriptor that allows us to use attribute-like access while still routing the operations through our getter and setter methods.

A property turns the attribute into a special kind of object that automatically calls specified functions when its value is accessed or changed.

```python
class Dog:
    def __init__(self, name, initial_age=1):
        self.name = name
        self._age = 0  # Initialize backing field
        self.age = initial_age # This will call the setter

    def get_age_val(self):
        print(f"Getter called for {self.name}'s age.")
        return self._age

    def set_age_val(self, age_value):
        print(f"Setter called for {self.name}'s age with value {age_value}.")
        if age_value > 0:
            self._age = age_value
        else:
            raise ValueError("Age must be positive and greater than zero.")

    # Create the property:
    # Syntax: property(fget=None, fset=None, fdel=None, doc=None)
    age = property(get_age_val, set_age_val)

# Now, accessing or setting 'age' uses the methods:
buddy = Dog("Buddy", 3) # Setter is called during __init__
print(f"{buddy.name}'s age: {buddy.age}") # Getter is called

try:
    print(f"Attempting to set {buddy.name}'s age to -1...")
    buddy.age = -1 # Setter is called, will raise ValueError
except ValueError as e:
    print(f"Error: {e}")

print(f"Current age of {buddy.name}: {buddy.age}") # Getter is called

try:
    print("Attempting to create a dog with invalid age...")
    fluffy = Dog("Fluffy", -2) # Setter is called during __init__, raises ValueError
except ValueError as e:
    print(f"Error: {e}")
```

!!! info "Alternative: `@property` Decorator"
    A more common and Pythonic way to create properties is by using the `@property` decorator for the getter, and `@<attribute_name>.setter` for the setter. This often leads to cleaner code. For example:
    ```python
    class Cat:
        def __init__(self, name, age):
            self.name = name
            self._age = age # Initial direct set or use self.age

        @property
        def age(self):
            # Getter logic
            return self._age

        @age.setter
        def age(self, value):
            # Setter logic
            if value <= 0:
                raise ValueError("Age must be positive.")
            self._age = value
    ```

### Other Descriptors

Python's descriptor protocol is a powerful feature that underlies properties, methods, `staticmethod`, `classmethod`, and more. Descriptors are objects that customize attribute access on other objects.

!!! note "Learn More About Descriptors"
    There are many other useful descriptors beyond `property`. For a deeper understanding, you can consult the official Python documentation on descriptors or other advanced Python resources.

## Understanding Python Objects

Now, let's shift to a more philosophical question: why do we even need classes and objects when much of what they accomplish could, in theory, be done with "normal" Python variables and functions?

### The "Why" of Objects: Encapsulation and Organization

The reasons vary, but a primary motivation is the **convenience and clarity** objects bring, especially for:

*   **Encapsulation**: Bundling data (attributes) and methods (functions that operate on that data) together. This keeps related code organized and reduces complexity.
*   **Namespace Management**: Each object instance has its own namespace, preventing clashes between variables that might occur in a global scope.
*   **Abstraction**: Hiding internal implementation details and exposing a clear, simplified interface.
*   **Reusability**: Classes can be reused to create multiple objects with the same structure and behavior.
*   **Maintainability**: Well-designed objects make code easier to understand, modify, and debug.

Consider managing student profiles for a course. Each student has a name, homework scores, age, and enrolled classes.

!!! question "Exercise: Student Management System Design"
    Imagine you need to build a system to manage student information.
    
    1.  If there are 76 students this semester, how would you structure the data to store their names, homework scores, ages, and classes?
    2.  When new students enroll next semester, how would you automate adding their information to your system?
    3.  Would you prefer to use Python classes or rely on global variables and standalone functions? Why?
    4.  If, due to privacy concerns, you need to ensure that only individual students can access their own scores, how would you modify your code or design?

    Thinking through these questions often highlights the advantages of an object-oriented approach.

### Flexibility: Dynamic Attribute Creation

Python objects are highly flexible. You can even create object attributes on the fly, after an object has been instantiated.

```python
import pandas as pd

# Create a pandas DataFrame
df = pd.DataFrame(
    [[1, 2], [3, 4]],
    columns=["A", "B"],
    index=["a", "b"]
)
print("Original DataFrame:")
print(df)

# Dynamically add a new attribute (which, for a DataFrame, adds a new column)
df.C = [5, 6]

print("\nDataFrame after adding column 'C' dynamically:")
print(df)
print(f"\nAttribute 'C' type: {type(df.C)}")
```

This dynamic nature, while powerful, should be used judiciously to maintain code clarity. However, it demonstrates the inherent flexibility of Python's object system.

!!! quote "Insight"
    The choice to use object-oriented programming often comes down to managing complexity. As programs grow, organizing data and behavior into logical units (objects) becomes crucial for building robust, maintainable, and understandable software.

```
