const container = document.querySelector('.md-container');

const chatDiv = document.createElement('div');
chatDiv.className = 'md-chat';
Object.assign(chatDiv.style, {
  position: 'fixed',
  top: '0',
  right: '0',
  width: '0px',
  height: '100vh',
  backgroundColor: '#f5f5f5',
  boxSizing: 'border-box',
  overflowY: 'auto',
  zIndex: '3',
  transition: 'width 0.3s ease',
});

chatDiv.innerHTML = `

`

container.insertAdjacentElement('afterend', chatDiv);

// 获取 .md-header__option 元素
const headerOption = document.querySelector('.md-header__option');

// 创建按钮
const button = document.createElement('button');
// button.textContent = '设置宽度为600px';
button.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/></svg>
`;

button.classList.add('md-header__button', 'md-icon');
container.style.transition = 'width 0.3s ease';
container.style.width = '100%';


button.addEventListener('click', () => {
  if (container) {
    if (container.style.width === 'calc(100% - 300px)') {
      container.style.width = '100%';
      container.style.borderRight = '';
      chatDiv.style.width = '0px';
    } else {
      container.style.width = 'calc(100% - 300px)';
      container.style.borderRight = '#eee solid 1px';
      chatDiv.style.width = '300px';
    }
  }
});

// 插入按钮到 .md-header__option 元素中
headerOption.appendChild(button);
