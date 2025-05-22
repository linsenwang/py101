class AIChatPlugin {
  constructor(options = {}) {
    this.containerSelector = options.containerSelector || '.md-container';
    this.headerSelector = options.headerSelector || '.md-header';
    this.headerOptionSelector = options.headerOptionSelector || '.md-header__option';
    this.chatWidth = options.chatWidth || '300px';
    this.aiName = options.aiName || '';

    this.container = document.querySelector(this.containerSelector);
    this.header = document.querySelector(this.headerSelector);
    this.headerOption = document.querySelector(this.headerOptionSelector);

    if (!this.container || !this.header || !this.headerOption) {
      console.error('AI Chat Plugin: Required elements not found. Ensure container, header, and headerOption selectors are correct.');
      return;
    }

    this.isOpen = false;
    this.chatHistory = []; // To store chat messages: { sender: 'user'/'ai', text: 'message' }

    this._initUI();
    this._attachEventListeners();
  }

  _initUI() {
    // 1. Create Chat Div
    this.chatDiv = document.createElement('div');
    // this.chatDiv.addEventListener('wheel', (e) => {
    //   const delta = e.deltaY;
    //   const scrollTop = this.chatDiv.scrollTop;
    //   const scrollHeight = this.chatDiv.scrollHeight;
    //   const clientHeight = this.chatDiv.clientHeight;

    //   const atTop = scrollTop === 0;
    //   const atBottom = scrollTop + clientHeight >= scrollHeight - 1; // 加点容差

    //   const scrollingUp = delta < 0;
    //   const scrollingDown = delta > 0;

    //   const canScrollUp = !atTop;
    //   const canScrollDown = !atBottom;

    //   // 只有当容器本身无法滚动时才阻止默认行为
    //   if ((scrollingUp && !canScrollUp) || (scrollingDown && !canScrollDown)) {
    //     // 在 chatDiv 无法滚动的情况下，才阻止默认行为，防止滚动穿透
    //     e.preventDefault();
    //   }
    // }, { passive: false });

    this.chatDiv.addEventListener('wheel', (e) => {
  const delta = e.deltaY;
  const targetElement = e.target;

  // 确保 this.messagesArea 存在并且是一个有效的 DOM 元素
  // 并且事件目标是 messagesArea 或其内部的元素
  if (this.messagesArea &&
      (this.messagesArea.contains(targetElement) || targetElement === this.messagesArea)) {

    const ma = this.messagesArea;
    const messagesAreaScrollTop = ma.scrollTop;
    const messagesAreaScrollHeight = ma.scrollHeight;
    const messagesAreaClientHeight = ma.clientHeight;

    // 检查 messagesArea 是否可以在当前滚动方向上滚动
    const canMessagesAreaScrollUp = delta < 0 && messagesAreaScrollTop > 0;
    // 使用一个小的容差值 (1) 来处理可能的亚像素渲染问题
    const canMessagesAreaScrollDown = delta > 0 && (messagesAreaScrollHeight - messagesAreaScrollTop - messagesAreaClientHeight) > 1;

    if (canMessagesAreaScrollUp || canMessagesAreaScrollDown) {
      // 如果 messagesArea 可以滚动，则不执行 e.preventDefault()，允许其滚动
      return;
    }
    // 如果 messagesArea 已经到达其滚动边界（对于当前滚动方向），
    // 则事件将“穿透”到 chatDiv，下面的逻辑会处理 chatDiv 的边界。
  }

  // 如果事件不是在 messagesArea 内部，或者 messagesArea 已在其边界：
  // 检查 chatDiv 本身的滚动状态
  const chatDivScrollTop = this.chatDiv.scrollTop;
  const chatDivScrollHeight = this.chatDiv.scrollHeight;
  const chatDivClientHeight = this.chatDiv.clientHeight;

  const atTop = chatDivScrollTop === 0;
  // 使用一个小的容差值 (1) 来处理可能的亚像素渲染问题
  const atBottom = (chatDivScrollHeight - chatDivScrollTop - chatDivClientHeight) < 1;

  if ((delta < 0 && atTop) || (delta > 0 && atBottom)) {
    e.preventDefault(); // 阻止 chatDiv (以及页面) 的默认滚动行为
  }
}, { passive: false });

    this.chatDiv.className = 'md-typeset md-chat-ai-plugin';
    Object.assign(this.chatDiv.style, {
      position: 'fixed',
      // top: '48px',
      right: '0',
      width: '0px', // Initially closed
      height: '100vh',
      paddingTop: '48px',
      backgroundColor: '#fff',
      boxSizing: 'border-box',
      overflow: 'hidden', // Hide overflow initially, then specific parts
      zIndex: '3', // Ensure it's above most things
      transition: 'width 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      fontSize: '.7rem',
      borderLeft: '1px solid var(--md-default-fg-color--lightest)',
    });

    // 1.5 Logo
    this.logo = document.createElement('img');
    this.logo.className = 'md-chat-ai-logo';
    // this.logo.innerHTML = `test`;
    // this.logo.src = 'assets/logo_blue.svg'; 
    // this.logo.src = window.siteBaseUrl + 'assets/logo_blue.svg';
    const baseUrl = document.documentElement.getAttribute('data-site-base-url') || '/';
    // 确保 baseUrl 末尾有一个斜杠，assets 前面没有斜杠
    const finalBaseUrl = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
    const assetPath = 'assets/logo_blue.svg';
    this.logo.src = finalBaseUrl + assetPath;

    this.logo.alt = 'Chat AI Logo'; // Good practice for accessibility

    // Set dimensions for the <img> tag
    this.logo.setAttribute('width', '100'); // No 'px' needed for attributes, but CSS style would
    this.logo.setAttribute('height', '100');
    this.chatDiv.appendChild(this.logo);

    // 2. Chat Header
    this.chatHeader = document.createElement('div');
    this.chatHeader.className = 'md-chat-ai-plugin__header';
    this.chatHeader.textContent = this.aiName;
    Object.assign(this.chatHeader.style, {
      padding: '36px',
      backgroundColor: '#0000',
      fontWeight: 'bold',
      // borderBottom: '1px solid #ccc',
      flexShrink: '0', // Prevent header from shrinking
    });

    // 3. Messages Area
    this.messagesArea = document.createElement('div');
    this.messagesArea.className = 'md-chat-ai-plugin__messages';
    Object.assign(this.messagesArea.style, {
      flexGrow: '1',
      overflowY: 'auto',
      padding: '10px',
      paddingTop: '72px',
      display: 'flex',
      flexDirection: 'column',
    });

    // 4. Input Area
    this.inputArea = document.createElement('div');
    this.inputArea.className = 'md-chat-ai-plugin__input-area';
    Object.assign(this.inputArea.style, {
      display: 'flex',
      padding: '.2rem',
      borderTop: '1px solid var(--md-default-fg-color--lightest)',
      backgroundColor: '#fff',
      flexShrink: '0', // Prevent input area from shrinking
    });

    this.chatInput = document.createElement('input');
    this.chatInput.type = 'text';
    this.chatInput.placeholder = 'Ask anything...';
    this.chatInput.className = 'md-chat-ai-plugin__input';
    Object.assign(this.chatInput.style, {
      flexGrow: '1',
      padding: '8px 10px',
      border: '1px solid var(--md-default-fg-color--lightest)',
      borderRadius: '.1rem',
      marginRight: '.2rem',
    });

    this.sendButton = document.createElement('button');
    this.sendButton.textContent = 'Send';
    this.sendButton.className = 'md-chat-ai-plugin__send-button';
    Object.assign(this.sendButton.style, {
      padding: '8px 15px',
      border: 'none',
      backgroundColor: 'var(--md-primary-fg-color)',
      color: 'white',
      borderRadius: '.1rem',
      cursor: 'pointer',
    });

    this.inputArea.appendChild(this.chatInput);
    this.inputArea.appendChild(this.sendButton);

    // this.chatDiv.appendChild(this.chatHeader);
    this.chatDiv.appendChild(this.messagesArea);
    this.chatDiv.appendChild(this.inputArea);

    // Insert chatDiv after the main container
    this.container.insertAdjacentElement('afterend', this.chatDiv);

    // 5. Create Toggle Button in Header
    this.toggleButton = document.createElement('button');
    this.toggleButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000">
        <path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/>
      </svg>
    `;
    this.toggleButton.classList.add('md-header__button', 'md-icon', 'md-chat-ai-plugin__toggle');
    // Ensure the fill color is more visible if your header is dark, or remove fill if parent sets it.
    // If your .md-icon has a default fill, you might not need to set it in the SVG.
    // I changed fill to #555 for better contrast on typical light headers. Adjust as needed.

    // Style main container for transition
    this.container.style.transition = 'width 0.3s ease';
    // this.header.style.transition = 'width 0.3s ease';
    this.container.style.width = '100%';
    this.container.style.marginRight = '0px';

    // Insert toggle button into the header option
    this.headerOption.appendChild(this.toggleButton);
  }

  _attachEventListeners() {
    this.toggleButton.addEventListener('click', () => this.toggleChat());
    this.sendButton.addEventListener('click', () => this._handleSendMessage());
    this.chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this._handleSendMessage();
      }
    });
    document.addEventListener('keydown', (e) => {
    const isMac = navigator.platform.toUpperCase().includes('MAC');
    const isCmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

    if (isCmdOrCtrl && e.shiftKey && e.key.toLowerCase() === 's') {
      e.preventDefault(); // 阻止浏览器保存网页等默认行为
      this.toggleChat();
    }
  });
  }

  toggleChat() {
    if (this.isOpen) {
      // Close chat
      this.container.style.width = '100%';
      this.container.style.marginRight = '0px'; // Reset margin
      // this.header.style.width = '100%';
      // this.container.style.borderRight = ''; // Optional: remove border
      this.chatDiv.style.width = '0px';
      this.chatDiv.style.padding = '0'; // Avoid padding showing when closed
      this.toggleButton.title = "Open AI Chat";
    } else {
      // Open chat
      this.container.style.width = `calc(100% - ${this.chatWidth})`;
      this.container.style.marginRight = this.chatWidth; // Push container left
      // this.header.style.width = `calc(100% - ${this.chatWidth})`;
      // this.container.style.borderRight = '#eee solid 1px'; // Optional: add border
      this.chatDiv.style.width = this.chatWidth;
      this.chatDiv.style.padding = ''; // Reset padding
      this.toggleButton.title = "Close AI Chat";
      this.chatInput.focus();
    }
    this.isOpen = !this.isOpen;
  }

  _handleSendMessage() {
    const messageText = this.chatInput.value.trim();
    if (messageText === '') return;

    this._addMessageToUI(messageText, 'user');
    this.chatHistory.push({ sender: 'user', text: messageText });
    this.chatInput.value = '';

    // Simulate AI response
    this._getAIResponse(messageText);
  }

  _addMessageToUI(text, sender, returnElement = false) {
    const messageElement = document.createElement('div');

    // Use the specific class names from your desired UI
    messageElement.className = `md-chat-ai-plugin__message md-chat-ai-plugin__message--${sender}`;

    // For placeholders or simple text like errors, textContent is fine.
    // Markdown content might later be set via innerHTML if this element is returned
    // and processed further (e.g., by a function like _getAIResponse).
    messageElement.textContent = text;

    // Apply common styles from your desired UI
    Object.assign(messageElement.style, {
      padding: '6px 10px',
      // margin: '6px 10px',
      borderRadius: '.2rem', // General radius, will be partially overridden below
      marginBottom: '10px',
      maxWidth: '100%',
      wordWrap: 'break-word',
      zIndex: '1',
    });

    // Apply sender-specific styles from your desired UI
    if (sender === 'user') {
      Object.assign(messageElement.style, {
        backgroundColor: 'var(--md-primary-fg-color)', // Make sure this CSS variable is defined
        color: 'white',
        alignSelf: 'flex-end',
        borderBottomRightRadius: '0px', // Specific corner for "speech bubble" tail
      });
    } else { // AI or other senders
      Object.assign(messageElement.style, {
        // backgroundColor: 'var(--md-code-bg-color)', // Make sure this CSS variable is defined
        backgroundColor: '#fff',
        border: '1px solid var(--md-default-fg-color--lightest)',
        color: 'var(--md-typeset-fg-color, #333)', // Using a theme variable for text color if available, else fallback
        alignSelf: 'flex-start',
        borderBottomLeftRadius: '0px', // Specific corner for "speech bubble" tail
      });
    }

    // Ensure this.messagesArea is a valid DOM element (from the first example)
    if (!this.messagesArea || typeof this.messagesArea.appendChild !== 'function') {
      console.error("Error in _addMessageToUI: this.messagesArea is not a valid DOM element.");
      if (returnElement) {
        return null; // If we're supposed to return an element, but can't even append, return null.
      }
      return; // Exit if messagesArea is invalid
    }

    this.messagesArea.appendChild(messageElement);
    this.messagesArea.scrollTop = this.messagesArea.scrollHeight; // Scroll to bottom

    if (returnElement) {
      return messageElement; // <-- CRITICAL: Return the created element (from the first example)
    }
    // If returnElement is false (or default), it implicitly returns undefined
  }

  // async _getAIResponse(userInput) {
  //   // MOCK AI RESPONSE - Replace this with your actual AI API call
  //   this._addMessageToUI('...', 'ai'); // Typing indicator
  //   const typingIndicator = this.messagesArea.lastChild;

  //   // Simulate network delay and AI "thinking"
  //   await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

  //   let aiResponseText = "I'm a mock AI. You said: " + userInput;
  //   if (userInput.toLowerCase().includes("hello") || userInput.toLowerCase().includes("hi")) {
  //     aiResponseText = "Hello there! How can I help you today?";
  //   } else if (userInput.toLowerCase().includes("how are you")) {
  //     aiResponseText = "I'm doing well, thank you for asking! Ready for your questions.";
  //   } else if (userInput.toLowerCase().includes("name")) {
  //       aiResponseText = `My name is ${this.aiName}.`;
  //   }

  //   if (typingIndicator) {
  //       typingIndicator.remove(); // Remove typing indicator
  //   }
  //   this._addMessageToUI(aiResponseText, 'ai');
  //   this.chatHistory.push({ sender: 'ai', text: aiResponseText });
  // }

//   async _getAIResponse(userInput) {
//   this._addMessageToUI('...', 'ai'); // Typing indicator
//   const typingIndicator = this.messagesArea.lastChild;

//   try {
//     const response = await fetch("http://127.0.0.1:5000/chat", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({ message: userInput })
//     });

//     const data = await response.json();
//     const aiResponseText = data.reply || "Sorry, no reply from AI.";

//     if (typingIndicator) typingIndicator.remove();
//     this._addMessageToUI(aiResponseText, 'ai');
//     this.chatHistory.push({ sender: 'ai', text: aiResponseText });

//   } catch (error) {
//     if (typingIndicator) typingIndicator.remove();
//     const errorMessage = "Oops! Something went wrong with the AI response.";
//     this._addMessageToUI(errorMessage, 'ai');
//     console.error("Error:", error);
//   }
// }

async _getAIResponse(userInput) {
  // 1. 添加打字指示器，并获取该DOM元素的引用
  // Let's assume _addMessageToUI can return the element or we get it like before
  // For clarity, let's say _addMessageToUI now *always* returns the element if asked
  const aiMessageElement = this._addMessageToUI('...', 'ai', true); // Pass true to get the element back

  try {
    const response = await fetch("http://127.0.0.1:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: userInput })
    });

    // 2. 检查响应是否成功
    if (!response.ok) {
      let errorText = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        errorText = errorData.error || errorData.message || JSON.stringify(errorData);
      } catch (e) {
        errorText = await response.text() || errorText;
      }
      throw new Error(errorText);
    }

    // 3. 处理流式响应
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let accumulatedText = ""; // This will store the raw Markdown text

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      const chunk = decoder.decode(value, { stream: true });
      accumulatedText += chunk;

      // Convert accumulated Markdown to HTML and render
      // Ensure 'marked' is available in this scope (e.g., window.marked or imported)
      // Basic usage:
      // For security, especially if the Markdown source is not fully trusted,
      // you might want to sanitize the output of marked.parse.
      // For example, using DOMPurify: DOMPurify.sanitize(marked.parse(accumulatedText))
      // For simplicity here, we'll use marked.parse directly.
      if (typeof marked !== 'undefined') {
        aiMessageElement.innerHTML = marked.parse(accumulatedText);
      } else {
        // Fallback if marked is not loaded: show plain text
        console.warn("Marked library not found. Displaying raw text.");
        aiMessageElement.textContent = accumulatedText;
      }
      
      // 自动滚动到消息区域底部
      this.messagesArea.scrollTop = this.messagesArea.scrollHeight;
    }

    // 4. 流处理完毕
    if (accumulatedText) {
      // The content is already rendered in aiMessageElement via innerHTML.
      // Just update chat history with the raw Markdown.
      this.chatHistory.push({ sender: 'ai', text: accumulatedText });
    } else {
      const noReplyMsg = "Sorry, no reply from AI.";
      aiMessageElement.textContent = noReplyMsg; // Use textContent for simple messages
      this.chatHistory.push({ sender: 'ai', text: noReplyMsg });
    }

  } catch (error) {
    console.error("Error fetching AI response:", error);
    const errorMessage = error.message && error.message.includes("HTTP error!") 
      ? `AI Error: ${error.message.replace("HTTP error! status: ", "")}`
      : "Oops! Something went wrong with the AI response.";
    
    // Display error messages as plain text
    if (aiMessageElement) { // aiMessageElement should exist
      aiMessageElement.textContent = errorMessage;
    } else {
      // Fallback if aiMessageElement wasn't created (shouldn't happen with the new _addMessageToUI)
      this._addMessageToUI(errorMessage, 'ai');
    }

    // Ensure error message is in history (raw text)
    // Avoid duplicates if error occurred after some text was already pushed
    const lastAiHistory = this.chatHistory.length > 0 && this.chatHistory[this.chatHistory.length-1].sender === 'ai' ? this.chatHistory[this.chatHistory.length-1] : null;
    if (!lastAiHistory || lastAiHistory.text !== accumulatedText ) { // if error occurred before any text or after different text
        if (!this.chatHistory.find(msg => msg.text === errorMessage && msg.sender === 'ai')) {
             this.chatHistory.push({ sender: 'ai', text: errorMessage });
        }
    } else if (lastAiHistory && lastAiHistory.text === accumulatedText) {
        // If error occurred after the full text was received and pushed,
        // it might be better to update the last message or add a new error message.
        // For simplicity, let's assume the error message replaces the content if it was partial.
        // If the accumulatedText was fully processed and an error happened *after*, this logic might need adjustment.
        // The current history push for success happens *after* the loop.
        // The error handler will ensure the error is logged.
        // Let's ensure the error gets into history if not already the final message.
        if (this.chatHistory.length === 0 || this.chatHistory[this.chatHistory.length-1].text !== errorMessage) {
            this.chatHistory.push({ sender: 'ai', text: errorMessage });
        }
    }
  }
}

// You need to make sure `_addMessageToUI` can return the created element.
// Here's an example of how `_addMessageToUI` might look if it supports returning the element:
/*
_addMessageToUI(text, sender, returnElement = false) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', sender); // e.g., 'message ai' or 'message user'
  
  // If it's the initial '...' placeholder, or an error message, set as textContent.
  // Actual AI responses will be set via innerHTML in _getAIResponse.
  messageElement.textContent = text; 

  this.messagesArea.appendChild(messageElement);
  this.messagesArea.scrollTop = this.messagesArea.scrollHeight;

  if (returnElement) {
    return messageElement;
  }
}
*/

  // Public method to send a message programmatically (e.g., from outside)
  sendMessage(text) {
    if (text && typeof text === 'string' && text.trim() !== '') {
        this._addMessageToUI(text, 'user');
        this.chatHistory.push({ sender: 'user', text: text });
        this._getAIResponse(text);
        if(!this.isOpen) this.toggleChat(); // Open chat if closed
    }
  }

  // Public method to receive a message programmatically (e.g. from AI push)
  receiveMessage(text, sender = 'ai') {
      if (text && typeof text === 'string' && text.trim() !== '') {
          this._addMessageToUI(text, sender);
          this.chatHistory.push({ sender: sender, text: text });
          if(!this.isOpen) this.toggleChat(); // Open chat if closed
      }
  }
}

// --- How to use the plugin ---
document.addEventListener('DOMContentLoaded', () => {
  // Ensure the DOM is fully loaded before trying to find elements
  // You can customize selectors and chat width if needed:
  const chatPlugin = new AIChatPlugin({
    // containerSelector: '.my-custom-main-content',
    // headerOptionSelector: '.my-custom-header-options',
    // chatWidth: '350px',
    // aiName: 'HelpBot'
  });

  // Example: Programmatically send a welcome message after a delay
  // setTimeout(() => {
  //   chatPlugin.receiveMessage("Welcome! Feel free to ask me anything.");
  // }, 2000);
});

// Add some CSS for better presentation (can be in a <style> tag or separate CSS file)
const pluginStyles = `
  .md-chat-ai-plugin__toggle svg {
    fill: #fff; /* Default icon color, adjust if your header buttons have specific styling */
  }
  .md-chat-ai-plugin__toggle:hover svg {
    // fill: var(--md-accent-fg-color--transparent);
    opacity: .7
  }
  .md-chat-ai-plugin__input-area {
    box-shadow: 0 -2px 5px rgba(0,0,0,0.05);
  }
  .md-chat-ai-plugin__send-button:hover {
    background-color: var(--md-accent-fg-color);
  }
  .md-chat-ai-logo {
    position: absolute;
    top: 50%;                      /* 垂直居中 */
    transform: translate(50%, -100%);
    right: 150px;                  /* 距离右边 300px 区域的中点 */
    z-index: 0;                 /* 确保显示在最上层 */
    pointer-events: none;          /* 不阻挡用户操作 */
  }
  .md-chat-ai-plugin__message > :first-child {
    margin-top: 0;
  }

  .md-chat-ai-plugin__message > :last-child {
    margin-bottom: 0;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = pluginStyles;
document.head.appendChild(styleSheet);
