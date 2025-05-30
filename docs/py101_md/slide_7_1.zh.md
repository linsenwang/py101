# 第七章 大语言模型 (LLM) 与检索增强生成 (RAG)

本章将带领您学习以下内容：

*   如何使用 Python 与大语言模型 (LLM) 进行交互。
*   LLM 的一些基本工作机制。
*   检索增强生成 (RAG) 技术。
*   RAG 技术的一些应用示例。

## 7.1 调用 LLM API

我们都熟悉在各大语言模型的官方网站上通过对话框与其进行交流。这种方式非常便捷，但在某些场景下存在局限性。

例如，假设我们需要修改一份用于申请学校的个人陈述。这份陈述包含了我们的隐私信息，我们不希望 LLM 推断出我们的个人情况。但通常情况下，我们需要与 LLM 进行多轮“讨论”，以确保我们的陈述既文辞优美又合乎情理。在这种情况下，每次遇到姓名等敏感信息时，我们都需要手动将其替换为虚构的内容。

如果使用 Python，事情就会简单得多。我们可以创建一个变量来替代姓名，然后将处理过的信息传递给模型。那么，具体该如何操作呢？答案就是通过 Python 调用 LLM API。

```python
name = "Tony"
message = "Hello, {name}!"
# print(message.format(name=name))
```

### 7.1.1 环境准备

首先，我们需要配置好 Python 环境。请安装以下模块：`langchain`、`langchain-deepseek`、`textwrap` 和 `dotenv`。

*   `langchain` 是一个框架，能帮助我们更流畅地从 Python 调用 LLM。
*   `langchain-deepseek` 是专门为 DeepSeek API 设计的 Langchain 集成库。
*   `textwrap` 用于更好地格式化输出文本。
*   `dotenv` 用于安全地存储我们的 API 密钥。

!!! info "API 密钥获取与使用"
    1.  创建一个 DeepSeek 账户。
    2.  登录 [https://platform.deepseek.com/usage](https://platform.deepseek.com/usage) 来创建一个 API 密钥。
    3.  在本课程中，您可以使用我提供的密钥。课程结束后，如果您需要练习，可以自行充值，相关费用我可以为您报销。

### 7.1.2 示例：通过 Python 与 DeepSeek 对话

以下示例展示了如何使用 Python 调用 DeepSeek API 进行对话。

```python
from langchain_deepseek import ChatDeepSeek
import textwrap

# 参考 Langchain 官方文档: 
# https://python.langchain.com/docs/integrations/chat/deepseek/

# 初始化 DeepSeek LLM 模型
# 请确保您已设置 DEEPSEEK_API_KEY 环境变量，或者通过 api_key 参数直接传入
llm = ChatDeepSeek(model="deepseek-chat") 

# 构建对话消息
messages = [
    ("system", "你是一位乐于助人的编辑。请帮我润色我的申请文书。"),
    ("human", "我的名字是{myname}。我写这封信是为了申请贵校。"),
]

# 调用 LLM，传入消息
# 注意：实际使用时，应将 {myname} 替换为真实或占位符名称
# 例如： formatted_messages = [
#     (msg_type, content.format(myname="小明")) if msg_type == "human" else (msg_type, content) 
#     for msg_type, content in messages
# ]
# ret_dp_msg = llm.invoke(formatted_messages)

# 假设我们已经处理了占位符
example_myname = "示例名称" # 替换为你想用的名字
formatted_messages = [
    (msg_type, content.format(myname=example_myname)) if "{myname}" in content else (msg_type, content)
    for msg_type, content in messages
]
ret_dp_msg = llm.invoke(formatted_messages)

# 打印 LLM 的回复内容
# 使用 textwrap 格式化输出，使其更易读
print(textwrap.fill(ret_dp_msg.content, width=100))
```

**LLM 返回的润色后文书开场白示例：**

---
**主题：** 入学申请

尊敬的[招生委员会/收件人姓名]：

我的名字是[您的姓名]，我写这封信是为了表达我对申请[大学名称]的[专业名称，如适用]的诚挚兴趣。[可选：添加1-2句话说明您为什么对该大学或专业感兴趣——例如：“我被……”所吸引]。

---

## 7.2 与 LLM 对话

对话与一次性的问答不同，LLM 在对话过程中能够“记住”上下文信息。因此，我们需要创建一个持续的交流流程，并有地方存储对话历史。

### 7.2.1 消息类型

当我们与 LLM 对话时，发送的消息包含不同类型的信息：

*   **System Message (系统消息)**：为 LLM 提供背景知识或设定其角色、行为方式。正如前一个例子中我们看到的："你是一位乐于助人的编辑。请帮我润色我的申请文书。"
*   **Human Message (用户消息)**：我们向 LLM 提出的实际问题或指令。例如："我的名字是{myname}。我写这封信是为了申请贵校。"
*   **AI Message (AI 消息)**：LLM 返回的回复内容。

### 7.2.2 存储对话历史

我们将把所有这些信息存储在一个列表中，以便在多轮讨论中追踪上下文。

```python
# 假设已导入必要的 Langchain 消息类
# from langchain_core.messages import HumanMessage, AIMessage, SystemMessage

chat_history = [] 
```

!!! question "课堂练习 7.2.1: 设计不确定结束轮次的对话"
    如果我们不确定对话何时结束（例如，用户可以随时输入 "quit" 来终止对话），我们该如何编写相应的 Python 代码来实现这种交互式对话循环？

以下是一个实现持续对话直到用户选择退出的代码示例：

```python
from langchain_deepseek import ChatDeepSeek
from langchain_core.messages import HumanMessage, AIMessage # 确保导入

# llm = ChatDeepSeek(model="deepseek-chat") # 假设 llm 已经初始化
# chat_history = [] # 假设 chat_history 用于存储对话

# 如果您在Jupyter Notebook或类似环境中运行，并且没有预设的SystemMessage
# 可以在对话开始前添加一个
# from langchain_core.messages import SystemMessage
# chat_history.append(SystemMessage(content="你是一个乐于助人的助手。"))

while True:
    query = input("You: ")
    if query.lower() == "quit":
        break
    
    chat_history.append(HumanMessage(content=query))
    
    # 调用 LLM 时传入整个对话历史
    result = llm.invoke(chat_history)
    response = result.content
    
    chat_history.append(AIMessage(content=response))
    print(f"AI: {textwrap.fill(response, width=100)}")
```

## 7.3 LLM 的基本原理

根据我们的使用经验，LLM 大多表现得像一个聊天机器人。但 LLM 究竟是如何“理解”人类语言的呢？

!!! question "课堂练习 7.2.2: LLM 分析人类语言的步骤"
    在第二章中，我们学习了计算机如何存储图像。在第六章中，我们看到了如何使用数值型协变量来预测响应变量。结合这些知识，您认为 LLM 分析人类语言可能包含哪些步骤？

### 7.3.1 递归神经网络 (RNN) 结构

LLM 的核心通常基于某种形式的神经网络，例如递归神经网络 (RNN) 或更先进的 Transformer 架构。RNN 的一个特点是其内部的循环结构，使得网络能够处理序列数据（如文本）并保留先前信息的状态。

(原始讲义提及图片来源: https://colah.github.io/posts/2015-08-Understanding-LSTMs/)

### 7.3.2 词嵌入 (Embedding)

!!! note "关键概念: 词嵌入 (Embedding)"
    将语言（单词、短语、句子、段落，乃至整本书籍！）表示为数值向量的过程称为 **词嵌入 (Embedding)**。这是 LLM 中最为核心的概念之一。通过词嵌入，文本信息被转换为机器可以理解和处理的数学形式。

(原始讲义提及图片来源: https://colah.github.io/posts/2015-08-Understanding-LSTMs/)

!!! question "课堂练习 7.3.1: LLM 的技术本质"
    从技术角度来看，LLM 究竟在做什么？（提示：思考输入、处理过程和输出）

## 7.4 检索增强生成 (RAG)

### 7.4.1 LLM 的局限性与 RAG 的提出

正如我们所见，LLM 是接受嵌入式语言输入的大型神经网络。LLM 的回复在很大程度上受到这些输入信息的影响。

通用 LLM 的一个常见问题是它们有时会产生“幻觉” (Hallucinations)，即生成不准确或完全虚构的信息。一个臭名昭著的例子就是 LLM 编造参考文献列表。

为了解决这个问题，**检索增强生成 (Retrieval-Augmented Generation, RAG)** 技术应运而生。

### 7.4.2 RAG 的工作原理

RAG 的目标是在我们向 LLM 提问时，为其提供更多相关的背景信息，从而引导模型生成更准确、更可靠的答案。

采用 RAG 技术后，我们向 LLM 提交的提示 (prompt) 大致会包含以下结构：

1.  **上下文信息 (Context)**：从外部知识库中检索到的与用户问题相关的信息片段。
2.  **用户问题 (Question)**：用户的原始提问。
3.  **指令 (Instruction)**：要求 LLM 基于提供的上下文信息来回答问题。

关键问题在于，如何有效地从海量数据中**挑选出相关的上下文信息**。

### 7.4.3 RAG 提示示例

下面是一个组合了外部文档信息和用户问题的输入示例：

```python
# 假设 doc_info 包含了检索到的文档的元数据或摘要
# relevant_docs 是一个包含相关文档文本内容的列表
doc_info = "以下是一些可能有助于回答问题的文档摘要..." 
relevant_docs = ["文档片段1的文本内容...", "文档片段2的文本内容..."] 

combined_input = (
    f"这里有一些可能有助于回答问题的文档：{doc_info}\n\n"
    "相关文档内容如下：\n"
    + "\n\n".join([doc for doc in relevant_docs])
    + "\n\n请仅根据提供的文档来回答问题。如果答案在文档中找不到，请回复 '我无法在提供的文档中找到答案。'" 
    # 注意：原始文本在此处不完整 "If the . answer is not found in the documents, respond with 'I"
    # 已根据常见做法补全为 "我无法在提供的文档中找到答案。"
)

# print(combined_input) # 这个组合后的输入将传递给 LLM
```
好的，这是根据您的要求转换和整理的 Markdown 格式的课程讲义：

```markdown
# 第七章 LangChain 与大语言模型应用进阶 (续)

## 7.4 增强人机交互：通过上下文提升 LLM 性能

从技术上讲，大型语言模型 (LLM) 是接收嵌入式语言输入的大型神经网络。它们的响应在很大程度上受到输入信息（即提示）的影响。然而，通用 LLM 有时会产生“幻觉”，即生成不准确或虚构的信息，其中一个著名的例子就是生成虚假的参考文献列表。为了解决这个问题，检索增强生成 (Retrieval-Augmented Generation, RAG) 技术应运而生。

### 7.4.1 检索增强生成 (RAG) 概览

RAG 的核心目标是在我们向 LLM 提问时，为其提供更相关、更准确的背景信息。通过这种方式，LLM 可以基于提供的上下文进行回答，从而减少幻觉，提高答案的质量和相关性。

一个典型的 RAG 流程中，我们构建的提示（prompt）会包含检索到的相关信息。其结构大致如下：

```text
"这里有一些可能有助于回答您问题的文档：
{从文档库中检索到的相关信息}

相关文档：
{列出相关文档片段}

请仅根据提供的文档进行回答。如果在文档中找不到答案，请回复‘我不确定’。"
```

这里的关键问题是：如何高效、准确地筛选出与用户提问最相关的文档信息呢？

!!! note "RAG 的核心价值"
    RAG 通过将外部知识库与 LLM 的强大生成能力相结合，使得 LLM 能够访问和利用实时、特定领域的信息，从而生成更准确、更可靠的回答。

### 7.4.2 RAG 实战：以《侠客行》为例

假设我们对中国文学感兴趣，并收集了几部经典小说的文本。例如，我们正在阅读金庸的武侠小说《侠客行》，其文本存储在我们的本地磁盘上。

在小说《侠客行》中，有一个关于主角“石破天”（也被称为“狗杂种”）的著名情节。我们可能了解这个角色，但直接询问 ChatGPT 这类通用 LLM，它可能由于缺乏特定上下文而无法给出满意的答案。相比之下，一些经过专门优化的模型（如 DeepSeek）可能表现更好，但这进一步说明了为 LLM 提供充足背景信息（上下文）的重要性。

我们知道小说的文本在哪里，问题是如何有效地将其传递给 LLM。虽然理论上可以将整个原始文本传递给 LLM，但这不仅效率低下，而且我们也不知道文本的哪些部分与特定问题最相关。因此，我们需要让计算机（或 LLM 本身，通过 RAG 框架）来判断哪些文本片段与我们的问题更相关。

#### 示例 7.2：使用 RAG 查询《侠客行》中的角色信息

以下代码演示了如何使用 RAG 技术处理本地文本文件，并针对特定问题检索相关信息。

**1. 加载与切分文档**

首先，我们加载《侠客行》的文本文件，并将其分割成较小的文本块（chunks）。这样做是为了方便后续的嵌入和检索。

```python
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import CharacterTextSplitter
from langchain_openai import OpenAIEmbeddings

# 定义文件路径和数据库存储目录
file_path = r"E:\courses\2025S Python\data7\侠客行.txt"  # 请替换为您的实际文件路径
db_directory = r"E:\courses\2025S Python\data7\chroma_db" # 请替换为您的实际数据库存储路径

# 加载文档
loader = TextLoader(file_path, encoding="gb18030") # 注意文件编码
documents = loader.load()

# 切分文档
text_splitter = CharacterTextSplitter(chunk_size=250, chunk_overlap=0)
docs = text_splitter.split_documents(documents)

# 初始化嵌入模型 (使用 OpenAI 的 text-embedding-3-small 模型)
# 请确保您已设置 OpenAI API 密钥，并根据需要更新为有效的嵌入模型
embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
```

!!! note "文本嵌入 (Text Embeddings)"
    文本嵌入是将文本转换为数值向量的过程，这些向量能够捕捉文本的语义信息。相似的文本在向量空间中会靠得更近。

**2. 存储嵌入向量**

下一步是将切分并嵌入后的文本块存储到向量数据库中。这里我们使用 Chroma 作为向量存储（vector store）。稍后，我们将从这个向量存储中检索与查询最相关的文本。

```python
from langchain_community.vectorstores import Chroma

# 将文档块及其嵌入向量存入 Chroma 向量数据库
# 如果数据库已存在且包含相同内容，可以考虑加载现有数据库以节省时间
# db = Chroma(persist_directory=db_directory, embedding_function=embeddings)
db = Chroma.from_documents(
    docs,
    embeddings,
    persist_directory=db_directory
)
```

**3. 检索相关文档**

当用户提出查询时，我们使用向量数据库的检索功能，找出与查询内容最相似的文档块。

```python
# 定义用户查询
query = "谁是狗杂种"

# 从数据库中检索相关文档
# search_type="similarity_score_threshold" 表示使用相似度得分阈值进行检索
# search_kwargs={"k": 3, "score_threshold": 0.3} 表示返回最多3个文档，且相似度得分需大于0.3
retriever = db.as_retriever(
    search_type="similarity_score_threshold",
    search_kwargs={"k": 3, "score_threshold": 0.3}
)
relevant_docs = retriever.invoke(query)

# 打印检索到的相关文档内容，以供查阅
for i, doc in enumerate(relevant_docs):
    print(f"--- 相关文档 {i+1} ---\n{doc.page_content}\n")
```

**4. 构建提示并与 LLM 交互**

现在我们已经获得了与查询最相关的文本片段。接下来，我们将这些信息整合到提示中，并将其发送给 LLM 以获得答案。

```python
# 构建包含上下文的提示
# 这里的 prompt_template 可以根据需要进行定制
# 一个更完整的模板可能包含明确的指令，如示例 7.4.1 中所示
prompt_template = """
请根据以下背景信息回答问题：
---
背景信息:
{context}
---
问题: {question}
---
答案:
"""

# 从 relevant_docs 中提取文本内容
context_text = "\n\n".join([doc.page_content for doc in relevant_docs])

# 组合最终的输入
combined_input = prompt_template.format(context=context_text, question=query)

print("--- 构建的最终提示 ---")
print(combined_input)

# 此处省略了与 LLM 实际交互的代码
# 通常，您会使用类似 OpenAI API 的接口将 combined_input 发送给 LLM
# 例如:
# from langchain_openai import ChatOpenAI
# llm = ChatOpenAI(model_name="gpt-3.5-turbo") # 请确保 API Key 已设置
# response = llm.invoke(combined_input)
# print(f"\n--- LLM 的回答 ---\n{response.content}")
```

!!! info "提示工程的重要性"
    构建一个清晰、明确的提示对于引导 LLM 基于提供的上下文生成高质量答案至关重要。可以尝试不同的提示结构，以找到最适合您应用场景的方案。

### 7.4.3 RAG 的进一步探索

我们已经学习了如何通过 RAG 将单个问题与上下文信息结合起来传递给 LLM。RAG 领域还有许多可以深入探索的方向，包括：

*   **更高级的文本切分策略**：例如基于语义的切分、递归切分等。
*   **不同的文本嵌入模型**：探索开源或商业的嵌入模型，以找到最适合特定任务的模型。
*   **多样的信息检索方法**：例如基于关键词的检索、混合检索（结合向量相似度和关键词）等。
*   **集成不同的 LLM**：尝试将 RAG 与各种开源或闭源的 LLM 结合使用。
*   **实现与 LLM 的多轮对话**：在 RAG 框架下构建能够进行持续对话的聊天机器人。

!!! info "推荐阅读"
    对于希望深入了解 RAG 技术的读者，建议查阅 LangChain、LlamaIndex 等框架的官方文档，以及相关的学术论文和技术博客。

## 7.5 核心功能回顾

在本课程的前面部分，我们已经接触过一些基础的 AI 应用，这里我们简单回顾一下。

### 7.5.1 示例 0.6.1：语音识别

使用 OpenAI Whisper 模型进行语音转文字。

```python
import whisper # conda install –c conda-forge ffmpeg openai-whisper

# 加载模型 (例如 "base" 模型)
model = whisper.load_model("base")

# 进行语音转录 (假设音频文件为 audio.m4a)
# result = model.transcribe(audio="audio.m4a", fp16=False) # 请将 "audio.m4a" 替换为您的音频文件路径

# 打印转录结果
# print(result["text"])
```
!!! question "课堂练习：语音识别"
    1. 准备一段简短的英文或中文 `.m4a` 或 `.mp3` 音频文件。
    2. 使用 `whisper` 库，选择合适的模型（如 "tiny", "base", "small"）对其进行转录。
    3. 打印出识别的文本。
    4. （可选）尝试对不同口音或背景噪音的音频进行识别，观察效果。

### 7.5.2 示例 0.6.2：图像文字识别 (OCR)

使用 EasyOCR 从图片中提取文字。

```python
import easyocr # pip install easyocr

# 初始化 EasyOCR 读取器 (例如，识别英文)
reader = easyocr.Reader(['en'], gpu=False) # 如果有 GPU，可以设置 gpu=True

# 读取图片中的文字 (假设图片文件路径如下)
# image_path = 'F:/2025S Python/00 -introduction/good.png' # 请替换为您的图片路径
# result = reader.readtext(image_path, detail=0) # detail=0 表示只返回文本内容

# 打印识别结果
# print(result)
```
!!! question "课堂练习：图像文字识别"
    1. 找到一张包含清晰英文或中文文字的图片（如招牌、文档截图）。
    2. 使用 `easyocr` 库对其进行文字识别。
    3. 打印提取出的文字列表。
    4. （可选）尝试识别不同字体、不同背景复杂度的图片，观察效果。

### 7.5.3 示例 0.6.3：图像生成

使用 OpenAI DALL-E 模型根据文本提示生成图像。

```python
from openai import OpenAI # pip install openai
import os

# client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY")) # 确保 OPENAI_API_KEY 环境变量已设置
# 或者直接提供 API Key (不推荐用于共享代码):
# client = OpenAI(api_key="YOUR_OPENAI_API_KEY")


# response = client.images.generate(
# model="dall-e-2", # 可以尝试 "dall-e-3" 如果可用
# prompt="A futuristic cityscape at sunset with flying cars, digital art",
# size="1024x1024",
# quality="standard", # 可以尝试 "hd"
# n=1, # 生成图片的数量
# )

# 打印生成图像的 URL
# image_url = response.data[0].url
# print(image_url)
```
!!! question "课堂练习：图像生成"
    1. 构思一个有趣的场景或物体描述作为图像生成的提示（prompt）。
    2. 使用 OpenAI DALL-E API (或其他图像生成服务如 Stable Diffusion 的接口) 生成一张图像。
    3. （如果 API 返回 URL）尝试在浏览器中打开并查看生成的图像。
    4. 调整提示词（prompt），尝试生成不同风格或内容的图像。

## 进一步学习资源

想要深入学习相关内容吗？

*   **观看教学视频**：查找相关的在线课程或教程视频。
*   **阅读专业书籍**：选择一本关于人工智能、自然语言处理或特定框架的经典书籍进行研读。

祝您在 AI 编程的学习旅程中不断进步！
