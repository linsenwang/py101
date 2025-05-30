# Functions

This chapter delves into functions in Python. We will explore their definition, application, and some advanced topics like decorators and generators, reinforced by practical exercises drawn from past examinations.

## Practice Questions from Past Exams

!!! info "Midterm Preparation"
    The questions below are sourced from past midterm exams and are designed to give you a clear idea of the types of problems you can expect in Midterm 1.  

!!! question "Counting Runs of Ones (Midterm 2024 Fall, Question 3)"
    If we toss a coin, it has two possible outcomes: head (represented by 1) and tail (represented by 0). When a head (1) appears, we write a "1" on a piece of paper. If a tail (0) appears, we write a "0". We toss the coin *n* times and record all the outcomes.

    For example, the sequence `1 0 1 1 1 0 1 0 1 1 0 0` is recorded.
    We define consecutive 1s as a "run". So, this example sequence has 4 runs of 1s:
    - The first '1'
    - '1 1 1'
    - The single '1' after '0'
    - '1 1'

    In Python, you can use the following code to generate a random binary sequence:
    ```python
    import random
    n = 10
    s1 = [random.randint(0, 1) for _ in range(n)]
    ```

    Your task is to create a Python function that computes the number of runs of 1s in a given sequence (list of 0s and 1s).  

!!! question "Function Timer Decorator (Midterm 2024 Fall, Question 4)"
    For programmers, code execution speed is a critical concern. It's common practice to experiment with different implementations of a function and measure their performance.

    To simplify this process, create a Python decorator named `timer_100`. This decorator should:
    1.  Run the decorated function 100 times.
    2.  After all runs are complete, print a single line stating the average execution time and the standard deviation of these 100 runs.

    **Sample Usage:**
    ```python
    import random
    import time # Required for timing, not shown in original sample but necessary

    # Assume timer_100 is defined above this
    @timer_100
    def sums():
        numbers = [random.random() for _ in range(10)] # Corrected from for_inrange
        sum(numbers)

    sums()
    ```

    **Sample Output:**
    ```
    The average run time is 0. 000609s; the std is 0. 076s
    ```
    *(Note: Your exact timing values will vary.)*  

## Quasi-Newton's Method

Newton's method is a powerful root-finding algorithm, but it comes with certain restrictions:

*   The starting point needs to be reasonably close to the actual solution.
*   The function must be differentiable, as the method relies on the derivative.

When a function is not differentiable, or its derivative is hard to compute, we must turn to alternative methods. One such method is the **secant method**.

!!! info "The Secant Method"
    The secant method approximates the derivative using a finite difference based on the two preceding points. The recurrence relation for the secant method is:
    $$x_{k+1} = x_k - f(x_k) \frac{x_k - x_{k-1}}{f(x_k) - f(x_k-1)}$$
    where $x_k$ and $x_{k-1}$ are the current and previous estimates of the root.  
    
    !!! note "A Note on the Formula"
        The raw lecture notes presented the formula as `𝑥𝑛+1=𝑥𝑛−𝑓(𝑥𝑛)𝑥𝑛−𝑥𝑛+1. 𝑓𝑥𝑛−𝑓(𝑥𝑛+1)`. This has been interpreted as the standard secant method formula shown above, which uses $x_k$ and $x_{k-1}$ (the previous two iterates) to find $x_{k+1}$. For the exercise, please use this standard interpretation.  

!!! question "Implement the Secant Method"
    Implement the secant method in Python to find a root for the equation:
    $$f(x) = x^{-3} - 1 = 0$$
    You will need to choose suitable starting points $x_0$ and $x_1$, and decide on a convergence criterion (e.g., number of iterations or tolerance for $|f(x_k)|$).  

## Generators

Generators are a special kind of iterator in Python, allowing you to declare a function that behaves like an iterator, i.e., it can be used in a `for` loop. They are useful for creating sequences of results, especially when dealing with large or infinite sequences, as they produce items one at a time and only when requested.

!!! question "Odd/Even Second Generators"
    Your task is to create and use two generators:

    1.  **Generator 1**: This generator should, upon each call:
        *   Print the line: `"it is an odd second."`
        *   Capture the current time (using `time.time()`) and `yield` this timestamp.
    2.  **Generator 2**: This generator should, upon each call:
        *   Print the line: `"it is an even second."`
        *   Capture the current time (using `time.time()`) and `yield` this timestamp.

    Then, write a main function that continuously (or for a set number of iterations):
    *   Checks the integer part of the current time (`time.time()`).
    *   If the integer part is odd, it calls Generator 1 (i.e., advances it and gets the yielded time).
    *   If the integer part is even, it calls Generator 2.
    
    Consider how these generators will maintain their state and what "saves the current time for future use" implies in the context of a generator (hint: `yield`).  

