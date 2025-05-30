# 环境准备

## 核心依赖库

为了确保课程中的所有代码示例能够顺利运行，我们建议您配置好相应的 Python 环境并安装以下核心依赖库。这些库为后续的 AI 模型调用、文本处理、向量存储等功能提供了基础。

以下是推荐的 Python 依赖库及其版本列表。

```python
chardet==5.2.0
charset-normalizer==3.4.1
chromadb==1.0.8
langchain==0.3.25
langchain-community==0.3.24
langchain-core==0.3.59
langchain-deepseek==0.1.3
langchain-huggingface==0.1.2
langchain-openai==0.3.15
langchain-text-splitters==0.3.8
langsmith==0.1.147
```

!!! note "安装提示"
    您可以将上述列表保存为一个名为 `requirements.txt` 的文件（确保每行一个包名及其版本），然后通过 pip 命令在您的 Python 环境中批量安装：
    ```bash
    pip install -r requirements.txt
    ```
    或者，您也可以逐个使用 `pip install package_name==version` 命令进行安装，例如：
    ```bash
    pip install chardet==5.2.0
    ```
    强烈建议在虚拟环境（如 venv 或 conda）中进行安装，以避免与其他项目的依赖冲突。
