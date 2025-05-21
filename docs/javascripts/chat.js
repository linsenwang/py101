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

  _addMessageToUI(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `md-chat-ai-plugin__message md-chat-ai-plugin__message--${sender}`;
    messageDiv.textContent = text;

    Object.assign(messageDiv.style, {
      padding: '6px 10px',
      borderRadius: '.2rem',
      marginBottom: '10px',
      maxWidth: '80%',
      wordWrap: 'break-word',
    });

    if (sender === 'user') {
      Object.assign(messageDiv.style, {
        backgroundColor: 'var(--md-primary-fg-color)',
        color: 'white',
        alignSelf: 'flex-end',
        borderBottomRightRadius: '0px',
      });
    } else { // AI
      Object.assign(messageDiv.style, {
        backgroundColor: 'var(--md-code-bg-color)',
        color: '#333',
        alignSelf: 'flex-start',
        borderBottomLeftRadius: '0px',
      });
    }

    this.messagesArea.appendChild(messageDiv);
    this.messagesArea.scrollTop = this.messagesArea.scrollHeight; // Scroll to bottom
  }

  async _getAIResponse(userInput) {
    // MOCK AI RESPONSE - Replace this with your actual AI API call
    this._addMessageToUI('...', 'ai'); // Typing indicator
    const typingIndicator = this.messagesArea.lastChild;

    // Simulate network delay and AI "thinking"
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    let aiResponseText = "I'm a mock AI. You said: " + userInput;
    if (userInput.toLowerCase().includes("hello") || userInput.toLowerCase().includes("hi")) {
      aiResponseText = "Hello there! How can I help you today?";
    } else if (userInput.toLowerCase().includes("how are you")) {
      aiResponseText = "I'm doing well, thank you for asking! Ready for your questions.";
    } else if (userInput.toLowerCase().includes("name")) {
        aiResponseText = `My name is ${this.aiName}.`;
    }

    if (typingIndicator) {
        typingIndicator.remove(); // Remove typing indicator
    }
    this._addMessageToUI(aiResponseText, 'ai');
    this.chatHistory.push({ sender: 'ai', text: aiResponseText });
  }

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
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = pluginStyles;
document.head.appendChild(styleSheet);
