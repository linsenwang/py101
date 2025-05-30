# 课程大纲与环境准备

## 0.1 课程大纲

### 期望学习内容
*   Python 基础数据存储与函数简介
*   使用 `numpy` 和 `pandas` 进行数据科学基础知识
*   经典人工智能/机器学习算法 (理论与 `scikit-learn` 实现)
*   (若时间允许) Python 类与对象

### 学习要求
*   认真听讲，勤做笔记，积极提问！
*   保证课程出席率 (偶尔会进行点名，请务必重视)。
*   有效沟通 (尤其是在提问与寻求解释时)。
    *   !!! info "温馨提示"
        我也会经常犯错和写出 bug，欢迎随时指出！
*   具备高中数学基础，并能理解一些直接的扩展知识。
*   请与可以讨论问题的同学坐在一起。

### 小组项目
*   Kaggle 竞赛
*   Hugging Face 模型探索与评估
*   自选主题

### 题库
*   我们将尝试提供一个可选的题库，供大家练习课堂所学知识。
*   有关题库相关问题，请咨询助教。

### 暂定课程安排 (共32次课/64学时)

!!! info "课程规划概览"
    这是一个富有挑战性的时间表，请大家努力跟上！最终的学习成果与个人投入密切相关。

*   **基础部分 (24次课)**
    *   Python 基础 (6次课): 变量及其构建
    *   函数 (6次课): 基本函数、高阶函数、算法、生成器与协程
    *   `numpy` 与 `pandas` (8次课)
    *   使用 `matplotlib` 绘制图表 (2次课)
    *   面向对象编程 (OOP) 基础 (2次课)
*   **进阶部分 (6次课)**
    *   经典机器学习算法 (2次课)
    *   大型语言模型与 Hugging Face (2次课)
    *   项目展示 (2次课，预计8个小组)
*   **预留 (2次课)**

!!! note "关于学习进度"
    别担心！你会顺利完成的 (具体可参考成绩构成)。如果你真的想学到东西，请务必投入时间和精力。

## 0.2 关于你 (学员背景调查)
*   曾修读课程？
    *   数据分析/统计学、数学、经济学等
*   编程经验？
    *   C/C++、R、SAS、Python 等
*   英语水平？
    *   大学英语四/六级 (CET4/CET6)、托福/雅思、英语授课课程等
    *   !!! info "温馨提示"
        请逐步适应我的口音。
*   数据分析竞赛经历？
*   其他？

## 0.3 课堂行为规范
*   尊重教师和同学。
*   使用恰当言辞。
*   将你的设备 (QQ/微信等) 静音。
*   遵守法律法规。

## 0.4 出发前的思考：为什么选择 Python？

*   **为什么是 Python？**
    *   人工智能/机器学习领域使用最广泛的语言。
    *   对初学者最友好的编程语言之一。
    *   多功能性 (Versatility)：指其能够胜任多种不同类型的任务。
*   **为什么选择这门课？**
    *   一门专注于数据/机器学习/人工智能的集中式课程 (希望如此)。
    *   并非侧重于纯粹的数据分析，市面上许多此类课程过于空洞 (vacuous)，难以促进深层理解。
    *   一门提供背景知识的信息型课程 (希望如此)。
        *   !!! quote "设计哲学"
            Python 的每一个设计和特性都源于实际需求。通过本课程，你将了解 Python 的核心特性 (即许多人所说的“Pythonic”风格)。

## 0.5 编程语言的一些通用概念与环境搭建

### 0.5.1 编程语言通用概念

!!! note "关键概念：代码与编程工具"
    *   **代码 (Code):** 字符、字母等，是承载信息的一种形式。
    *   **编辑器 (Editor):** 用于编写代码的软件。
    *   **编译器 (Compiler) / 解释器 (Interpreter):** 将我们编写的代码翻译成计算机能够理解的内容的软件。
    *   **环境 (Environment):** 解释器运行的“家园”。
    *   **环境管理器 (Environment Manager):** 用于管理不同项目所需的不同环境的软件。

!!! question "课堂练习 0.5.1.1"
    1.  列举一些你使用过的代码编辑器。
    2.  在编辑器中写下你（在本课程中）的第一行代码。
    3.  你了解如何安装软件吗？
        ```python
        print("Hello Python! ")
        ```

### 0.5.2 搭建 Python 开发环境

!!! info "推荐工具"
    我们将使用 VS Code 和 Anaconda。
    *   **VS Code:** 一款轻量级的代码编辑器。
    *   **Anaconda:** 一款轻量级的 Python 环境管理器。

请从它们的官方网站下载这两个软件：
*   VS Code: [https://code.visualstudio.com/](https://code.visualstudio.com/)
*   Anaconda: [https://www.anaconda.com/](https://www.anaconda.com/)

#### 1. VS Code 初识与配置
首先，我们来熟悉 VS Code。

!!! note "VS Code 扩展"
    安装以下两个重要的 VS Code 扩展：
    1.  Python
    2.  Jupyter

!!! question "课堂练习 0.5.2.1：VS Code 探索"
    1.  启动 VS Code 并观察其布局 (layout, 指元素的排列方式)。你观察到了什么？
    2.  找到这个图标 (通常指 VS Code 界面中的某个特定功能图标，请同学们自行在软件中探索)。

#### 2. Anaconda 环境管理入门
接下来，我们来了解 Anaconda。

!!! info "Anaconda 的特点"
    Anaconda 与你可能使用过的许多软件非常不同。它提供了一个“黑盒子”让你输入代码。这种纯文本/代码交互的界面 (interface, 你与计算机交流的地方) 被称为**命令行界面 (Command Line Interface, CLI)**。你需要通过在 CLI 中输入命令来使用它。

!!! question "课堂练习 0.5.2.2：Anaconda CLI 初体验"
    1.  你如何打开 Anaconda Prompt (或终端中的 conda 环境)？
    2.  打开后你观察到了什么？

#### 3. Anaconda 命令行操作

以下是一些常用的 Anaconda CLI 环境管理命令：

*   **创建新环境**
    假设你当前在 `(base)` 环境下，想创建一个名为 `MLPython` 的新环境：
    ```bash
    (base) C:\Users\glma> conda create -n MLPython
    ```

*   **激活环境**
    进入（激活）你刚创建的 `MLPython` 环境：
    ```bash
    (base) C:\Users\glma> conda activate MLPython
    ```
    激活后，命令行提示符会变为 `(MLPython) C:\Users\glma>`。

*   **运行 Python 脚本**
    在激活的 `MLPython` 环境中运行一个 Python 脚本文件 (例如 `test.py`)：
    ```bash
    (MLPython) C:\Users\glma> python "F:\2025S Python\00-introduction\test.py"
    ```
    !!! warning "常见错误"
        请确保文件路径正确，并且文件名后缀为 `.py` 而不是 `.txt`。例如，以下命令尝试运行 `.txt` 文件，会导致错误：
        ```bash
        (MLPython) C:\Users\glma> python "F:\2025S Python\00-introduction\test.txt" 
        ```
        正确的应该是（假设脚本名为 `test.py`）：
        ```bash
        (MLPython) C:\Users\glma> python F:\2025S Python\00-introduction\test.py
        ```

*   **安装包 (Package)**
    在当前激活的环境中安装一个 Python 包，例如 `numpy`：
    ```bash
    (MLPython) C:\Users\glma> conda install numpy
    ```
    !!! note "conda vs pip"
        `conda` 和 `pip` 都是包管理器。`conda` 主要用于管理 Anaconda 环境中的包和环境本身，而 `pip` 是 Python 官方的包安装工具。在 Anaconda 环境中，推荐优先使用 `conda install`。如果 `conda` 无法找到某个包，可以尝试使用 `pip install`。

#### 4. VS Code 与 Anaconda 环境的配合

现在，让我们回到 VS Code。

1.  **在 VS Code 中编写代码**
    在 VS Code 编辑器中输入以下 Python 代码：
    ```python
    sentence = "Hello Python! "
    print(sentence)
    ```
2.  **运行代码**
    你可以通过 VS Code 提供的功能 (例如，右键点击选择 "Run Python File in Terminal"，或使用快捷键) 来执行 (execute) 这段代码。VS Code 会自动检测并使用你当前激活的 Anaconda 环境 (如果配置正确)。

!!! question "课堂练习 0.5.2.3：回顾与思考"
    1.  你是如何成功打印出 "Hello Python!" 的？(例如，通过 VS Code 的运行按钮，还是在 Anaconda Prompt 中直接运行脚本？)
    2.  对比直接在 Anaconda Prompt 中使用 `python <文件名>.py` 和在 VS Code 中运行代码，你观察到了哪些异同点？

## 0.6 Python 的应用示例

Python 功能强大，应用广泛。以下是两个简单的示例：

### 示例 0.6.1: 语音识别

```python
import whisper # 安装命令: conda install -c conda-forge ffmpeg openai-whisper
model = whisper.load_model("base")
# 假设你有一个名为 audio.m4a 的音频文件在当前目录，或提供完整路径
result = model.transcribe(audio="audio.m4a", fp16=False) 
print(result["text"]) # 通常结果是一个字典，文本在 'text' 键中
```

!!! note "依赖说明"
    运行此代码前，你需要安装 `whisper` 包及其依赖 `ffmpeg`。推荐使用 `conda` 进行安装: `conda install -c conda-forge ffmpeg openai-whisper`。
    音频文件 `audio.m4a` 需要放置在 Python 脚本运行的相同目录下，或者在代码中提供完整的文件路径。`fp16=False` 表示不使用半精度浮点数，在某些无兼容GPU的设备上更稳定。

### 示例 0.6.2: 图像文字识别 (OCR)

```python
import easyocr # 安装命令: pip install easyocr
# 初始化 OCR 读取器，指定语言为英文，不使用 GPU
reader = easyocr.Reader(['en'], gpu=False) 
# 读取图片中的文字
# 请将 'F:/2025S Python/00-introduction/good.png' 替换为你的图片实际路径
result = reader.readtext('F:/2025S Python/00-introduction/good.png', detail=0) 
print(result)
```

!!! note "依赖说明"
    运行此代码前，你需要安装 `easyocr` 包。可以使用 `pip` 进行安装: `pip install easyocr`。
    请确保图片路径 `'F:/2025S Python/00-introduction/good.png'` 是正确的，或者将图片放在脚本的同一目录下并使用相对路径。 `detail=0` 参数表示只返回识别出的文本列表，不包含位置等详细信息。
好的，这是根据您的要求转换和整理后的 Markdown 格式的课程讲义：

---

## 0.5 Python 环境配置与基础操作

### 0.5.2 配置 Python 环境

在进行 Python 编程之前，搭建一个稳定且易于管理的 Python 环境至关重要。这通常涉及到安装 Python 解释器本身，以及后续用于项目开发的各种库（Packages）。

#### 安装包：`conda` 还是 `pip`？

当我们需要为 Python 安装新的库时，通常会遇到 `conda` 和 `pip` 这两个工具。它们都是包管理器，但各有侧重：

*   **`pip`**：是 Python 官方推荐的包安装器，主要用于安装 PyPI (Python Package Index) 上的包。它通常随 Python一同安装。
*   **`conda`**：是一个跨平台的包管理器和环境管理器。它可以安装 Python 包，也可以安装非 Python 的软件。`conda` 特别适合于数据科学和机器学习领域，因为它能很好地处理复杂的依赖关系和创建隔离的环境。Anaconda 或 Miniconda 发行版中包含了 `conda`。

!!! info "选择建议"
    对于初学者，尤其是在进行机器学习项目时，推荐使用 `conda` 来管理环境和包，因为它可以更好地处理复杂的依赖项。对于纯 Python 项目或只需要 Python 包的情况，`pip` 也是一个很好的选择。

例如，使用 `conda` 安装 `numpy`（一个强大的科学计算库）的命令如下：

```bash
conda install numpy
```

这条命令会在您当前的 `conda` 环境中安装 `numpy` 包。

### 0.5.3 在 VS Code 中编写和运行 Python 代码

配置好环境后，我们通常会使用集成开发环境（IDE）或代码编辑器来编写和运行代码。VS Code 是一个流行的选择。

1.  **编写代码 (Write some code here)**：
    在 VS Code 中打开一个 Python 文件（`.py` 后缀）或创建一个新的，然后输入您的 Python 代码。
2.  **运行代码 (Run [execute] the code)**：
    VS Code 提供了多种运行 Python 代码的方式，例如通过右上角的运行按钮、右键菜单或终端命令。

让我们看一个简单的例子：

```python
sentence = "Hello Python! "
print(sentence)
```

执行这段代码后，您会在输出或终端窗口看到 "Hello Python! "。

!!! question "课堂练习 0.5.2.3.1"
    1.  你是如何成功打印出 “Hello Python!” 的？（例如，你使用了哪个编辑器，点击了什么按钮，或者输入了什么命令？）
    2.  如果你尝试了多种方法来运行代码，它们之间有什么主要区别？（例如，便捷性、是否能看到详细输出等。）

## 0.6 Python 的应用领域概览

Python 以其简洁的语法、丰富的库和广泛的社区支持，在众多领域都有出色的应用。下面我们将通过几个具体的例子，快速了解 Python 能做些什么。

### 示例 0.6.1：语音识别

语音识别技术可以将人的语音转换为文本。Python 通过 `whisper` 等库，可以方便地实现这一功能。

```python
import whisper # 您可能需要先安装: conda install –c conda-forge ffmpeg openai-whisper
model = whisper.load_model("base") # 加载预训练的基础模型
# 确保您有一个名为 audio.m4a 的音频文件在脚本同目录下，或提供完整路径
result = model.transcribe(audio="audio.m4a", fp16=False) 
print(result["text"]) # 通常我们关心识别出的文本内容
```

!!! note "关于模型和依赖"
    *   `whisper.load_model("base")` 会下载并加载一个预训练模型。`"base"` 是一个较小的模型，还有其他更大更精确的模型如 `"small"`, `"medium"`, `"large"`。
    *   `ffmpeg` 是一个处理音视频的依赖库，`whisper` 可能需要它来处理音频文件。
    *   `fp16=False` 参数用于指定是否使用半精度浮点数进行计算，在没有兼容 GPU 时通常设为 `False`。

### 示例 0.6.2：图像文字识别 (OCR)

图像文字识别（Optical Character Recognition, OCR）技术可以从图片中提取文字信息。`easyocr` 是一个流行的 Python OCR 库。

```python
import easyocr # 您可能需要先安装: pip install easyocr

# 初始化 Reader 对象，指定识别语言为英文 ('en')，并禁用 GPU (gpu=False)
# 如果您有兼容的 GPU 并已配置好 CUDA，可以设为 True 以加速
reader = easyocr.Reader(['en'], gpu=False) 

# 读取图片中的文字
# 请确保图片路径正确，或者将图片放在脚本同目录下
image_path = 'F:/2025S Python/00-introduction/good.png' 
result = reader.readtext(image_path, detail=0)

print(result) # result 是一个包含识别出的文本字符串的列表
```

!!! note "关于图像路径和 `detail` 参数"
    *   请确保示例中的图片路径 `'F:/2025S Python/00-introduction/good.png'` 是正确的。如果图片与您的 Python 脚本在同一目录下，可以直接使用图片文件名（例如 `'good.png'`）作为相对路径。
    *   `detail=0` 参数表示 `readtext` 方法只返回识别出的文本列表。如果设置为 `1`，则会返回更详细的信息，包括文本位置坐标和置信度。

### 示例 0.6.3：图像生成

借助强大的深度学习模型，Python 还可以用于生成全新的图像。OpenAI 的 DALL-E 模型就是一个例子。

```python
from openai import OpenAI # 您可能需要先安装: pip install openai

# !! 重要: 
# 1. 请确保您已设置 OPENAI_API_KEY 环境变量。
# 2. 或者，直接在代码中用您的真实 API 密钥替换 "YOUR_OPENAI_API_KEY"。
#    例如: client = OpenAI(api_key="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxx")
#    原始代码中使用了 OPENAI_API_KEY 变量，您需要确保此变量已定义并包含有效密钥。
client = OpenAI(api_key="YOUR_OPENAI_API_KEY") 

try:
    response = client.images.generate(
        model="dall-e-2",  # 指定使用的模型
        prompt="driving in Ames in autumn", # 描述想要生成的图像内容
        size="1024x1024", # 指定生成图像的尺寸
        quality="standard", # 指定图像质量，可以是 "standard" 或 "hd"
        n=1 # 指定生成图像的数量
    )
    image_url = response.data[0].url
    print(f"图像已生成，URL: {image_url}")
except Exception as e:
    print(f"图像生成失败: {e}")
    print("请检查您的 API 密钥是否有效、账户余额是否充足以及 OpenAI 服务是否可用。")

```

!!! note "API 密钥和模型使用"
    *   使用 OpenAI API 需要一个有效的 API 密钥 (`OPENAI_API_KEY`)。您需要从 OpenAI 官网获取，并确保您的账户有足够配额。
    *   `model="dall-e-2"` 指定了使用的图像生成模型。OpenAI 还提供了其他模型如 `dall-e-3`。
    *   `prompt` 参数是图像内容的文本描述，它的好坏直接影响生成图像的质量和相关性。
    *   生成的图像会有一个临时的 URL，您可以访问该 URL 查看或下载图像。

!!! question "课堂练习 0.6.1"
    1.  根据前面的三个示例（语音识别、图像文字识别、图像生成），你能总结出在 Python 中借助这些高级库完成一个特定任务（如AI任务）时，通常包含哪些基本步骤吗？
    2.  在这些示例中，我们都用到了“模型（model）”（例如 `whisper.load_model("base")`，DALL-E 模型）。这些模型通常是从哪里来的？它们是如何被创建和提供的？
