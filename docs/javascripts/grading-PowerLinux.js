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
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFF"><path d="M560-564v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-600q-38 0-73 9.5T560-564Zm0 220v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-380q-38 0-73 9t-67 27Zm0-110v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-490q-38 0-73 9.5T560-454ZM260-320q47 0 91.5 10.5T440-278v-394q-41-24-87-36t-93-12q-36 0-71.5 7T120-692v396q35-12 69.5-18t70.5-6Zm260 42q44-21 88.5-31.5T700-320q36 0 70.5 6t69.5 18v-396q-33-14-68.5-21t-71.5-7q-47 0-93 12t-87 36v394Zm-40 118q-48-38-104-59t-116-21q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q58 0 113.5 15T480-740q51-30 106.5-45T700-800q52 0 102 12t96 36q11 5 16.5 15t5.5 21v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-60 0-116 21t-104 59ZM280-494Z"/></svg>
`;
topbar.appendChild(button);
}