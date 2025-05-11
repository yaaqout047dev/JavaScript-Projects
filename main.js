// ------------------------------------ #Light and Dark mode   ---------------------

const themeBtn = document.querySelector("[data-theme-btn]");
const $HTML = document.documentElement;
let isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if(sessionStorage.getItem("theme")){
  $HTML.dataset.theme = sessionStorage.getItem("theme");
}else{
  $HTML.dataset.theme = isDark ? "dark" : "light";
}


const changeTheme = ()=>{
  $HTML.dataset.theme = sessionStorage.getItem("theme") === "light" ? "dark" : "light";
  sessionStorage.setItem("theme", $HTML.dataset.theme);
}

themeBtn.addEventListener("click", changeTheme);

// ------------------------------ #Animation ------------------------------ 
function getCenterPosition(el) {
  const container = document.querySelector(".beam-container");
  const containerRect = container.getBoundingClientRect();
  const rect = el.getBoundingClientRect();

  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  const offsetX = containerRect.left + scrollLeft;
  const offsetY = containerRect.top + scrollTop;

  const x = rect.left + rect.width / 2 - offsetX;
  const y = rect.top + rect.height / 2 - offsetY;

  return { x, y };
}

function drawBeams() {
  const svg = document.getElementById("beam-canvas");

  if (!document.querySelector('linearGradient')) {
    svg.innerHTML = `
      <defs>
        <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#00f"/>
          <stop offset="100%" stop-color="#0ff"/>
        </linearGradient>
      </defs>
    `;
  }

  const sourceEl = document.querySelector("#sources .circle");
  const centerEl = document.getElementById("center");

  const targets = Array.from(document.querySelectorAll("#targets .circle")).filter(el => {
    return window.getComputedStyle(el).display !== "none";
  });

  if (!sourceEl || !centerEl) return;

  const sourcePos = getCenterPosition(sourceEl);
  const centerPos = getCenterPosition(centerEl);


  Array.from(svg.querySelectorAll("line")).forEach(line => line.remove());


  const lineSourceToCenter = document.createElementNS("http://www.w3.org/2000/svg", "line");
  lineSourceToCenter.setAttribute("x1", sourcePos.x);
  lineSourceToCenter.setAttribute("y1", sourcePos.y);
  lineSourceToCenter.setAttribute("x2", centerPos.x);
  lineSourceToCenter.setAttribute("y2", centerPos.y);
  lineSourceToCenter.setAttribute("class", "beam-line-source");
  svg.appendChild(lineSourceToCenter);


  targets.forEach(target => {
    const targetPos = getCenterPosition(target);
    const lineTarget = document.createElementNS("http://www.w3.org/2000/svg", "line");
    lineTarget.setAttribute("x1", centerPos.x);
    lineTarget.setAttribute("y1", centerPos.y);
    lineTarget.setAttribute("x2", targetPos.x);
    lineTarget.setAttribute("y2", targetPos.y);
    lineTarget.setAttribute("class", "beam-line-target");
    svg.appendChild(lineTarget);
  });
}


window.addEventListener("load", drawBeams);
window.addEventListener("resize", drawBeams);