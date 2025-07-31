const topbar = document.querySelector(".md-header__option");
if (topbar) {
const button = document.createElement("button");
button.onclick = () => {
      window.open("http://118.31.40.127:8000/", "_blank");
    };
button.className = "md-header__button md-icon";
// button.title = "作业批改"; // 保留 title, 鼠标悬停时显示文字提示

// const icon = document.createElement("img");
// icon.src = "/assets/menu_book.svg"; // 或 "/assets/menu_book_large.png"
// icon.alt = "作业图标"; // alt 文本仍然重要
// icon.style.width = "24px";  // 设置为你希望的大小
// icon.style.height = "24px"; // 设置为你希望的大小

// button.appendChild(icon);
// // 移除了以下关于 label 的代码:
// // const label = document.createElement("span");
// // label.textContent = "作业批改";
// // button.appendChild(label);
button.innerHTML = `
  <svg
   width="19px"
   height="25px"
   viewBox="0 0 38 50"
   version="1.1"
   id="svg12"
   xmlns:xlink="http://www.w3.org/1999/xlink"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
  <g
     id="layer1"
     transform="translate(-75.359322,-0.3104403)">
    <use
       xlink:href="#H"
       fill="#767677"
       x="1669.3"
       y="2093.3101"
       id="use8-9"
       transform="translate(-1563,-2093)"
       style="fill:#ffffff;fill-opacity:1" />
    <g
       fill="#f37726"
       id="g10-3"
       transform="translate(-1563,-2093)"
       style="fill:#ffffff;fill-opacity:1">
      <use
         xlink:href="#I"
         x="1639.74"
         y="2123.98"
         id="use9-8"
         style="fill:#ffffff;fill-opacity:1" />
      <use
         xlink:href="#J"
         x="1639.73"
         y="2097.48"
         id="use10-0"
         style="fill:#ffffff;fill-opacity:1" />
    </g>
    <use
       xlink:href="#K"
       fill="#989798"
       x="1639.8"
       y="2135.8101"
       id="use11-2"
       transform="translate(-1563,-2093)"
       style="fill:#ffffff;fill-opacity:1" />
    <use
       xlink:href="#L"
       fill="#6f7070"
       x="1638.36"
       y="2098.0601"
       id="use12-4"
       transform="translate(-1563,-2093)"
       style="fill:#ffffff;fill-opacity:1" />
  </g>
  <defs
     id="defs12">
    <path
       id="H"
       d="M 5.894,2.844 C 5.919,3.432 5.771,4.014 5.469,4.516 5.167,5.018 4.723,5.42 4.194,5.668 3.665,5.916 3.075,6.001 2.499,5.911 A 2.94,2.94 0 0 1 0.956,5.163 2.98,2.98 0 0 1 0.085,3.677 C -0.053,3.106 -0.02,2.506 0.18,1.953 A 2.97,2.97 0 0 1 1.208,0.574 2.93,2.93 0 0 1 2.823,0.003 C 3.604,-0.03 4.365,0.25 4.941,0.783 5.517,1.316 5.859,2.057 5.893,2.844 Z" />
    <path
       id="I"
       d="M 18.265,7.134 C 10.415,7.134 3.559,4.258 0,0 c 1.325,3.82 3.796,7.131 7.069,9.473 3.273,2.342 7.187,3.6 11.2,3.6 4.013,0 7.927,-1.258 11.2,-3.6 C 32.742,7.131 35.213,3.82 36.538,0 32.971,4.258 26.115,7.134 18.265,7.134 Z" />
    <path
       id="J"
       d="m 18.273,5.939 c 7.85,0 14.706,2.877 18.265,7.134 C 35.213,9.253 32.742,5.942 29.469,3.6 26.196,1.258 22.282,0 18.269,0 14.256,0 10.342,1.258 7.069,3.6 3.796,5.942 1.325,9.253 0,13.073 3.567,8.824 10.423,5.939 18.273,5.939 Z" />
    <path
       id="K"
       d="M 7.428,3.583 A 3.77,3.77 0 0 1 6.892,5.692 C 6.51,6.326 5.951,6.831 5.284,7.144 4.617,7.457 3.874,7.564 3.147,7.45 2.42,7.336 1.743,7.008 1.202,6.506 0.661,6.004 0.279,5.353 0.105,4.632 A 3.78,3.78 0 0 1 0.227,2.459 C 0.48,1.762 0.932,1.157 1.526,0.72 2.12,0.283 2.829,0.033 3.564,0.003 4.547,-0.038 5.505,0.317 6.23,0.988 a 3.76,3.76 0 0 1 1.198,2.596 v 0 z" />
    <path
       id="L"
       d="M 2.275,4.396 C 1.844,4.415 1.417,4.304 1.048,4.078 0.679,3.852 0.385,3.521 0.203,3.126 0.021,2.731 -0.041,2.291 0.025,1.861 0.091,1.431 0.282,1.03 0.574,0.71 0.866,0.39 1.246,0.164 1.665,0.061 2.084,-0.042 2.524,-0.017 2.93,0.133 3.336,0.283 3.687,0.55 3.941,0.902 A 2.21,2.21 0 0 1 3.785,3.686 C 3.394,4.115 2.851,4.37 2.274,4.395 v 0 z" />
  </defs>
</svg>

`;
topbar.appendChild(button);
}