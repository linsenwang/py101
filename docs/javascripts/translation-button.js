
// 使用一个立即执行函数（IIFE）来避免污染全局作用域
(function() {
    // 确保在DOM加载完成后再执行所有操作
    document.addEventListener('DOMContentLoaded', function () {
        // 1. 创建并注入悬浮窗HTML和样式
        const floatWindowContainer = document.createElement('div');
        floatWindowContainer.id = 'realtime-translation-injected-window';
        floatWindowContainer.style.display = 'none'; // 默认隐藏

        // 注入样式
        const styles = `
            #realtime-translation-injected-window {
                position: fixed; top: 100px; left: 50%; transform: translateX(-50%);
                width: 500px; height: auto; min-width: 300px; min-height: 200px;
                background-color: white; border: 1px solid black; box-shadow: 0 2px 10px rgba(0,0,0,0.2);
                z-index: 1000; overflow: hidden; box-sizing: border-box;
            }
            #realtime-translation-injected-window .window-header {
                cursor: grab; padding: 10px 15px; background-color: #f0f0f0;
                border-bottom: 1px solid black; font-size: 16px; user-select: none;
            }
            #realtime-translation-injected-window .window-content {
                padding: 15px; overflow-y: auto; box-sizing: border-box; display: flex;
                flex-direction: column; height: calc(100% - 40px);
            }
            #realtime-translation-injected-window .content-box {
                white-space: pre-wrap; word-wrap: break-word; min-height: 60px; max-height: 100px;
                overflow-y: auto; border: 1px solid #ccc; padding: 10px; font-size: 1em;
                line-height: 1.4; text-align: left; margin-top: 5px; margin-bottom: 10px;
                flex-grow: 1; display: flex; flex-direction: column;
            }
            #realtime-translation-injected-window .text-section {
                margin-bottom: 8px; display: flex; flex-direction: column; flex-grow: 1;
            }
            #realtime-translation-injected-window .text-section strong {
                display: block; margin-bottom: 3px; font-size: 0.9em;
            }
            #realtime-translation-injected-window .controls {
                margin-bottom: 20px; display: flex; gap: 10px;
            }
            #realtime-translation-injected-window button {
                padding: 8px 15px; font-size: 14px; cursor: pointer; border: 1px solid black;
                background-color: white; color: black; border-radius: 0;
            }
            #realtime-translation-injected-window button:disabled {
                opacity: 0.5; cursor: not-allowed;
            }
            #realtime-translation-injected-window .resizer {
                position: absolute; background: transparent; z-index: 1001;
            }
            #realtime-translation-injected-window .resizer.nw, .resizer.se { width: 10px; height: 10px; cursor: nwse-resize; }
            #realtime-translation-injected-window .resizer.ne, .resizer.sw { width: 10px; height: 10px; cursor: nesw-resize; }
            #realtime-translation-injected-window .resizer.n, .resizer.s { left: 5px; right: 5px; height: 5px; cursor: ns-resize; }
            #realtime-translation-injected-window .resizer.w, .resizer.e { top: 5px; bottom: 5px; width: 5px; cursor: ew-resize; }
            #realtime-translation-injected-window .resizer.nw { top: 0; left: 0; }
            #realtime-translation-injected-window .resizer.ne { top: 0; right: 0; }
            #realtime-translation-injected-window .resizer.sw { bottom: 0; left: 0; }
            #realtime-translation-injected-window .resizer.se { bottom: 0; right: 0; }
            #realtime-translation-injected-window .resizer.n { top: 0; }
            #realtime-translation-injected-window .resizer.s { bottom: 0; }
            #realtime-translation-injected-window .resizer.w { left: 0; }
            #realtime-translation-injected-window .resizer.e { right: 0; }
            body.resizing-n, body.resizing-s { cursor: ns-resize !important; }
            body.resizing-w, body.resizing-e { cursor: ew-resize !important; }
            body.resizing-nw, body.resizing-se { cursor: nwse-resize !important; }
            body.resizing-ne, body.resizing-sw { cursor: nesw-resize !important; }
            body.dragging { cursor: grabbing !important; }
        `;

        // 注入HTML
        const windowHTML = `
            <div class="window-header">实时转写与翻译</div>
            <div class="window-content">
                <div class="controls">
                    <button id="startButton">开始</button>
                    <button id="stopButton" disabled>结束</button>
                </div>
                <div class="text-section">
                    <strong>实时转写 (原语言):</strong>
                    <div id="transcriptionContent" class="content-box">等待语音输入...</div>
                </div>
                <div class="text-section">
                    <strong>实时翻译 (目标语言):</strong>
                    <div id="translationResultContent" class="content-box">等待翻译内容...</div>
                </div>
            </div>
            <div class="resizer nw"></div><div class="resizer ne"></div>
            <div class="resizer sw"></div><div class="resizer se"></div>
            <div class="resizer n"></div><div class="resizer s"></div>
            <div class="resizer w"></div><div class="resizer e"></div>
        `;

        floatWindowContainer.innerHTML = `<style>${styles}</style>${windowHTML}`;
        document.body.appendChild(floatWindowContainer);

        // 2. 在顶部栏创建并注入切换按钮
        const topbar = document.querySelector(".md-header__option");
        if (topbar) {
            const toggleButton = document.createElement("button");
            toggleButton.className = "md-header__button md-icon";
            toggleButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M480-400q-50 0-85-35t-35-85v-240q0-50 35-85t85-35q50 0 85 35t35 85v240q0 50-35 85t-85 35Zm0-240Zm-40 520v-123q-104-14-172-93t-68-184h80q0 83 58.5 141.5T480-320q83 0 141.5-58.5T680-520h80q0 105-68 184t-172 93v123h-80Zm40-360q17 0 28.5-11.5T520-520v-240q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v240q0 17 11.5 28.5T480-480Z"/></svg>'; // 之后可以替换为图标
            toggleButton.title = '打开/关闭实时翻译';

            // 3. 添加切换逻辑
            toggleButton.addEventListener('click', () => {
                const windowEl = document.getElementById('realtime-translation-injected-window');
                windowEl.style.display = (windowEl.style.display === 'none') ? 'block' : 'none';
            });

            topbar.appendChild(toggleButton);
        }

        // 4. 修正后的脚本加载逻辑
        // 定义一个函数来加载脚本，返回一个Promise
        function loadScript(src) {
            return new Promise((resolve, reject) => {
                // 检查脚本是否已存在
                if (document.querySelector(`script[src="${src}"]`)) {
                    resolve(); // 如果已存在，直接成功
                    return;
                }
                const script = document.createElement('script');
                script.src = src;
                script.onload = () => resolve();
                script.onerror = () => reject(new Error(`Script load error for ${src}`));
                document.body.appendChild(script);
            });
        }

        // 链式加载脚本，确保顺序正确
        loadScript('/realtime-translation/frontend/dist2/index.umd.js')
            .then(() => {
                // index.umd.js 加载成功后，再加载 app.js
                return loadScript('/realtime-translation/frontend/app.js');
            })
            .then(() => {
                console.log('实时翻译脚本加载并初始化成功!');
                // 此时 app.js 已经执行，并且能够找到它需要的所有DOM元素
            })
            .catch(error => {
                console.error('加载实时翻译脚本失败:', error);
            });

        // 5. 添加拖动和调整大小的逻辑
        const floatWindow = document.getElementById('realtime-translation-injected-window');
        const header = floatWindow.querySelector('.window-header');
        const resizers = floatWindow.querySelectorAll('.resizer');

        let isDragging = false, isResizing = false;
        let startX, startY, startWidth, startHeight, startLeft, startTop;
        let currentResizer = null;

        header.addEventListener('mousedown', (e) => {
            if (e.target !== header) return;
            isDragging = true;
            document.body.classList.add('dragging');
            startX = e.clientX;
            startY = e.clientY;
            startLeft = floatWindow.offsetLeft;
            startTop = floatWindow.offsetTop;
            e.preventDefault();
        });

        resizers.forEach(resizer => {
            resizer.addEventListener('mousedown', (e) => {
                isResizing = true;
                currentResizer = resizer;
                document.body.classList.add('resizing-' + resizer.classList[1]);
                startX = e.clientX;
                startY = e.clientY;
                startWidth = floatWindow.offsetWidth;
                startHeight = floatWindow.offsetHeight;
                startLeft = floatWindow.offsetLeft;
                startTop = floatWindow.offsetTop;
                e.preventDefault();
            });
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;
                floatWindow.style.left = (startLeft + dx) + 'px';
                floatWindow.style.top = (startTop + dy) + 'px';
                floatWindow.style.transform = 'none';
            } else if (isResizing && currentResizer) {
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;
                let newWidth = startWidth, newHeight = startHeight, newLeft = startLeft, newTop = startTop;
                const classList = currentResizer.classList;

                if (classList.contains('e') || classList.contains('ne') || classList.contains('se')) newWidth = Math.max(300, startWidth + dx);
                if (classList.contains('w') || classList.contains('nw') || classList.contains('sw')) {
                    newWidth = Math.max(300, startWidth - dx);
                    newLeft = startLeft + dx;
                }
                if (classList.contains('s') || classList.contains('se') || classList.contains('sw')) newHeight = Math.max(200, startHeight + dy);
                if (classList.contains('n') || classList.contains('ne') || classList.contains('nw')) {
                    newHeight = Math.max(200, startHeight - dy);
                    newTop = startTop + dy;
                }

                floatWindow.style.width = newWidth + 'px';
                floatWindow.style.height = newHeight + 'px';
                floatWindow.style.left = newLeft + 'px';
                floatWindow.style.top = newTop + 'px';
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            isResizing = false;
            document.body.className = document.body.className.replace(/ (dragging|resizing-..)/g, '');
            currentResizer = null;
        });
    });
})();
