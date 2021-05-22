const inputEl = document.getElementById("input-el");
const linkEl = document.getElementById("ul-el");
const formEl = document.getElementById("form-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
let myLinks = null;

const renderList = () => {
  myLinks = JSON.parse(localStorage.getItem("myUrls")) || [];
  linkEl.innerHTML = myLinks
    .map((x) => `<li><a href="${x}" target="_blank"> ${x} </a></li>`)
    .join("\n");
};

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  if (inputEl.value) {
    myLinks.push(inputEl.value);
  }
  inputEl.value = "";
  localStorage.setItem("myUrls", JSON.stringify(myLinks));
  renderList();
});

tabBtn.addEventListener("click", () => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    let url = tabs[0].url;
    // use `url` here inside the callback because it's asynchronous!
    myLinks.push(url);
    localStorage.setItem("myUrls", JSON.stringify(myLinks));
    renderList();
  });
});

deleteBtn.addEventListener("dblclick", () => {
  localStorage.clear();
  renderList();
});

renderList();
