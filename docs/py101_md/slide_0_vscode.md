# Course Introduction and Setup

## Syllabus

### What to Expect
This course will cover:

*   An introduction to basic Python data storage and functions.
*   A basic understanding of data science with NumPy and Pandas.
*   Classic AI/ML algorithms (theory and implementation with scikit-learn).
*   Python classes and objects (if time permits).

### Requirements
*   **Take notes and ask questions!** Active participation is key.
*   **Class attendance:** Occasional roll calls will be taken seriously.
*   **Effective communication:** Especially for questions and clarifications.
    *   !!! quote "Instructor's Note"
        I constantly make mistakes and write bugs... your active participation helps everyone!
*   **Prerequisites:** High school math and some straightforward extensions.
*   **Collaboration:** Please sit with someone with whom you can discuss questions.

### Group Projects
You will have the opportunity to work on group projects, which may include:

*   Kaggle competitions.
*   Hugging Face model exploration and evaluation.
*   Self-selected topics relevant to AI/ML.

### Question Bank
We will try to provide an optional question bank for you to practice what you’ve learned in class. For question-bank related issues, please consult the TA.

### Tentative Schedule
This is an ambitious tentative schedule for our 32 meetings (64 hours):

**Basic (24 meetings)**
*   **Python Basics (6 meetings):** Variables and their construction.
*   **Functions (6 meetings):** Basic, higher-order, algorithms, generators, and coroutines.
*   **NumPy and Pandas (8 meetings):** Essentials for data manipulation.
*   **Data Visualization (2 meetings):** Drawing figures with Matplotlib.
*   **Basic OOP (2 meetings):** Introduction to Object-Oriented Programming.

**Advanced (6 meetings)**
*   **Classic Machine Learning Algorithms (2 meetings).**
*   **Large Language Models and Hugging Face (2 meetings).**
*   **Project Presentations (2 meetings):** 8 groups over two hours.

**Standby (2 meetings)**

!!! note "A Note on Pace"
    Don’t panic! You’ll be fine (refer to score decomposition for details). If you really want to learn something, be prepared to put in the effort.

## About You
We'd like to know a bit about your background:

*   **Courses Taken:** e.g., data analysis/statistics, math, economics.
*   **Programming Experience:** e.g., C/C++, R, SAS, Python.
*   **English Proficiency:** e.g., CET4/CET6, TOEFL/IELTS, English-taught courses.
    *   !!! info "Instructor's Accent"
        You may need to get used to my accent. Please don't hesitate to ask for clarification if anything is unclear.
*   **Data Analysis Contests:** Have you participated in any?
*   **Anything else?** Feel free to share any other relevant experience or expectations.

## Classroom Behavior
To ensure a productive learning environment for everyone:

*   Respect the instructor and fellow students.
*   Use appropriate and considerate language.
*   Mute your devices (QQ/WeChat, etc.) during class to minimize distractions.
*   Obey all applicable laws and institutional rules.

## Why This Path?

### Why Python?
Python is a dominant language in the AI/ML community for several reasons:

*   **Widely Used:** It's the most popular language in AI/ML, boasting a vast ecosystem of libraries and tools.
*   **Beginner-Friendly:** It's one of the easiest coding languages to learn, with a clear and readable syntax.
*   **Versatility:** Python [noun for versatile, capable of doing various things] is capable of handling a wide variety of tasks, from web development to data analysis and machine learning.

### Why This Class?
*   **Focused Learning:** This is a concentrated course targeting data science, machine learning, and AI applications.
*   **Practical Application:** The course is not focused solely on abstract data analysis theory; we aim to foster your understanding through practical application.
    *   !!! quote "Insight"
        Many introductory materials can be too vacuous [empty] to foster deep understanding. We aim for practical insights and hands-on experience.
*   **Background Knowledge:** This course intends to be an informational resource, providing you with essential background knowledge.
    *   !!! info "Design Philosophy"
        Every design feature in a programming language or tool often arises from a specific need or problem. You will learn the key features of Python (what many call "pythonic" style).

## General Concepts of a Programming Language

!!! info "Key Terminology"
    Understanding these basic terms is crucial when learning any programming language:
    *   **Characters, letters, etc.:** The fundamental units (like letters, numbers, symbols) that form code, carrying information.
    *   **Editors (software):** Applications where you write your code (e.g., VS Code, Notepad++, Sublime Text).
    *   **Compiler/Interpreter (software):** Programs that translate your human-readable code into something computers can understand (machine code). Python uses an interpreter.
    *   **Environment:** The specific setup (including the interpreter and necessary libraries) where your code runs.
    *   **Environment Manager (software):** Tools like Anaconda or Python's built-in `venv` that help create, manage, and isolate different Python environments to prevent conflicts.

!!! question "Exercise: Your First Steps"
    1.  List some code editors that you have used or are familiar with.
    2.  Write your first line of Python code (in this class) in an editor. Try this:
        ```python
        print("Hello Python! ")
        ```
    3.  Do you know the general process for installing software on your computer? (This is a general skill check.)  

## Setting Up Your Python Environment

For this course, we'll primarily use:

*   **VS Code:** A lightweight yet powerful and highly extensible code editor.
*   **Anaconda:** A distribution of Python and R for scientific computing and data science. It simplifies package management and deployment.

You can download these tools from their official websites:

*   VS Code: [https://code.visualstudio.com/](https://code.visualstudio.com/)
*   Anaconda: [https://www.anaconda.com/download](https://www.anaconda.com/download) (or anaconda.com and navigate to downloads)

### Working with VS Code
1.  Install VS Code if you haven't already.
2.  Open VS Code and install these essential extensions from the Extensions Marketplace (usually an icon on the left sidebar or accessed via `Ctrl+Shift+X`):
    *   **Python** (by Microsoft): Provides rich support for Python development.
    *   **Jupyter** (by Microsoft): Enables working with Jupyter Notebooks within VS Code.

!!! question "Exercise: VS Code Familiarization"
    1.  Launch VS Code. Take a moment to look at its layout (the arrangement of different panels like the editor, sidebar, terminal panel, etc.). What do you observe?
    2.  Find the icon for managing extensions. How would you search for and install an extension?  

### Working with Anaconda
Anaconda is different from many GUI-based software applications you might have used. A primary way to interact with its environment management features is through its **Command Line Interface (CLI)**.

!!! info "Command Line Interface (CLI)"
    A CLI is a text-based interface where you type commands to interact with your computer or specific software (like Anaconda), rather than clicking buttons in a graphical interface. On Windows, this is often the "Anaconda Prompt." On macOS and Linux, it's your standard terminal after `conda` has been initialized.

!!! question "Exercise: Opening Anaconda Prompt/Terminal"
    1.  How do you open the Anaconda Prompt (if you're on Windows) or a terminal session where `conda` commands are available (macOS/Linux)?
    2.  What do you observe when you open it? What information does the prompt display?  

### Anaconda Environment Management
Managing separate environments is crucial in Python development, especially in data science, to avoid package conflicts and ensure project reproducibility. Here are some basic `conda` commands:

*   **Create a new environment:**
    This command creates a new, isolated environment named `MLPython`. Anaconda will solve for dependencies and create the environment.
    ```bash
    (base) C:\Users\glma>conda create -n MLPython
    ```
    You will likely be prompted to proceed with the installation of default packages (`y/n`). Type `y` and press Enter.

*   **Activate an environment:**
    This command switches your CLI session from the current environment (e.g., `base`) into the `MLPython` environment. The command prompt will usually change to reflect the active environment.
    ```bash
    (base) C:\Users\glma>conda activate MLPython
    (MLPython) C:\Users\glma>
    ```

!!! note "Prompt Change"
    Notice how `(base)` in the command prompt typically changes to `(MLPython)` (or whatever you named your environment). This indicates that the `MLPython` environment is now active, and any Python or package commands will operate within this environment.

### Running Python Scripts
Once your environment is active and Python is installed within it (it usually is by default when creating a conda environment, or you can specify a Python version during creation), you can run Python scripts (`.py` files).

*   **Example:**
    To run a Python script, you use the `python` command followed by the path to your script.
    ```bash
    (MLPython) C:\Users\glma>python "F:\2025S Python\00-introduction\test.txt"
    ```

!!! note "Executing Scripts"
    Typically, Python scripts have a `.py` extension (e.g., `test.py`). If `test.txt` in the example above contains Python code, it's standard practice to rename it to `test.py` for clarity and convention. However, the Python interpreter can technically attempt to execute any file passed to it; whether it runs successfully depends on the file's content being valid Python code.

!!! warning "Common Mistakes When Running Scripts"
    *   **Incorrect Path:** Ensure the file path is accurate and complete. If the path contains spaces, enclose it in double quotes.
    *   **Wrong Environment:** Make sure you are in the correct `conda` environment where Python and any necessary packages for the script are installed.
    *   **File Not Found:** Double-check for typos in the filename or path.

### Installing Packages: `conda` vs. `pip`

When you need to add new libraries (also known as packages) to your Python environment, you'll primarily use either `conda install` or `pip install`.

!!! info "`conda` vs. `pip` for Package Installation"
    *   **`conda install <package-name>`**:
        *   Installs packages from Anaconda repositories (like `pkgs/main`, `conda-forge`, etc.).
        *   Manages not only Python packages but also Python itself and even non-Python dependencies (e.g., C libraries).
        *   Known for its robust dependency resolution, making it very effective at handling complex dependencies and creating consistent environments, especially for data science packages (NumPy, Pandas, SciPy, scikit-learn, etc.).
        *   Generally the recommended way to install packages when working within an Anaconda environment.
    *   **`pip install <package-name>`**:
        *   Installs packages from the Python Package Index (PyPI), which is the official third-party software repository for Python.
        *   `pip` is the standard package installer for Python and is included with most Python installations.
        *   Can be used within conda environments. It's often advisable to try `conda install` first for a package; if it's not available through conda channels or if you need a very specific version from PyPI, then `pip install` is a good alternative.

We will discuss package management in more detail as the course progresses. For now, it's important to be aware that both `conda` and `pip` are common tools for installing packages into your Python environments.
As a reminder, `conda` and `pip` are common tools for installing packages into your Python environments.

# Python for AI: Environment Setup and Applications

## Setting up a Python Environment

### Installing Packages: `conda` vs `pip`

When managing your Python projects, especially in AI and Machine Learning, you'll frequently need to install external libraries. The two most popular package managers are `conda` and `pip`.

!!! info "Choosing Between `conda` and `pip`"
    *   **`conda`** is a package and environment manager. It can install Python packages as well as non-Python software. It's particularly good at handling complex dependencies and creating isolated environments, which is crucial for reproducible research. `conda` often installs pre-compiled binaries, which can be faster and easier for packages with complex build requirements (e.g., NumPy, SciPy).
    *   **`pip`** is the Python Package Installer. It installs packages from the Python Package Index (PyPI) and other indexes. It's generally used for Python-specific packages and is often used within `conda` environments for packages not available through `conda` channels.

For example, to install the `numpy` package using `conda`, you would open your terminal (like Anaconda Prompt or your system terminal if `conda` is in your PATH) and type:

```bash
conda install numpy
```

### Working with VS Code

Once your environment is set up and necessary packages are installed, you can start writing and executing Python code. Visual Studio Code (VS Code) is a popular editor for Python development.

1.  **Write your code:** Open a `.py` file or a Jupyter Notebook within VS Code.
2.  **Run (execute) the code:** VS Code offers several ways to run Python code, including running the entire file or selected lines.

Here's a simple example:

```python
sentence = "Hello Python!"
print(sentence)
```

!!! question "Exercise: Printing a Message"
    1. How did you print “Hello Python!” in your environment?  
    2. If you tried different methods (e.g., running a script file vs. using an interactive Python console), what differences did you observe?  

## What We Can Do with Python: AI Examples

Python's extensive libraries make it a powerful tool for various AI tasks. Let's look at a few examples.

### Example: Speech Recognition

We can use the `whisper` library from OpenAI to transcribe audio files.

!!! note "Installation"
    To use `whisper`, you will likely need to install `ffmpeg` and the `openai-whisper` package. The original course note suggests installing both from `conda-forge`:
    ```bash
    conda install -c conda-forge ffmpeg openai-whisper
    ```
    Alternatively, you can install `ffmpeg` using `conda` and `openai-whisper` using `pip` (which is commonly recommended by OpenAI):
    ```bash
    conda install -c conda-forge ffmpeg
    pip install openai-whisper
    ```

Here's how you can transcribe an audio file:

```python
import whisper

# Load the base model
model = whisper.load_model("base")

# Transcribe an audio file (e.g., audio.m4a)
# Ensure the audio file 'audio.m4a' is in the same directory or provide the full path
result = model.transcribe(audio="audio.m4a", fp16=False)

# Print the transcribed text
# The result is a dictionary; the transcribed text is in the "text" key.
print(result["text"])
```

!!! info "About `fp16=False`"
    The `fp16=False` argument in `model.transcribe` indicates that 16-bit floating-point precision should not be used for the transcription. While `fp16` (half-precision) can speed up inference on compatible GPUs and reduce memory usage, it might not be supported on all hardware (like many CPUs) or could lead to slight differences in precision. Setting it to `False` ensures broader compatibility, especially when running on a CPU.

### Example: Picture Recognition (OCR)

`easyocr` is a Python library that allows you to perform Optical Character Recognition (OCR) on images, extracting printed or handwritten text.

!!! note "Installation"
    You can install `easyocr` using `pip`:
    ```bash
    pip install easyocr
    ```

Here's an example of reading text from an image:

```python
import easyocr

# Initialize the reader for English, specifying to run on CPU
# You can add other languages e.g., ['ch_sim', 'en'] for Chinese and English
reader = easyocr.Reader(['en'], gpu=False)

# Read text from an image file
# Replace 'F:/2025S Python/00 -introduction/good.png' with the actual path to your image
# detail=0 returns only the text, not bounding box coordinates or confidence scores
image_path = 'F:/2025S Python/00 -introduction/good.png'
result = reader.readtext(image_path, detail=0)

# Print the recognized text (result is a list of strings)
print(result)
```

### Example: Picture Generation

We can use the OpenAI API with the `openai` Python package to generate images from text prompts using models like DALL·E.

!!! note "Installation and Setup"
    First, install the `openai` library:
    ```bash
    pip install openai
    ```
    You'll also need an OpenAI API key. It's best practice to set this as an environment variable named `OPENAI_API_KEY`.

```python
from openai import OpenAI
import os

# It's recommended to set your OpenAI API key as an environment variable.
# The OpenAI library will automatically pick it up.
# Example: OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
# If OPENAI_API_KEY is not set in your environment, you must pass it explicitly:
# client = OpenAI(api_key="your_actual_api_key_here")
# However, avoid hardcoding keys in shared scripts.
client = OpenAI() # Assumes OPENAI_API_KEY is set in the environment

response = client.images.generate(
  model="dall-e-2",
  prompt="driving in Ames in autumn",
  size="1024x1024",
  quality="standard",
  n=1
)

image_url = response.data[0].url
print(image_url)
```

!!! warning "API Key Security"
    Never hardcode your API keys directly into your scripts if you plan to share or version control your code. Use environment variables or a dedicated secrets management system.

!!! question "Exercise: AI Task Workflow"
    1. Based on the previous three examples (speech recognition, picture recognition, picture generation), can you summarize the general procedure for working on an AI task in Python?  
    2. Where do the "models" (like `whisper.load_model("base")` or the `dall-e-2` model) typically come from?  
