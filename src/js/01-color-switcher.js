const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');
let timerId = null;


startBtn.addEventListener('click', getChangeColor )
stopBtn.addEventListener("click", () => {
  clearInterval(timerId);
  startBtn.disabled = false;
});
  

function getChangeColor() {
    timerId = setInterval(() => {
      const setColor = getRandomHexColor();
      bodyEl.style.backgroundColor = setColor;
    }, 1000);

    startBtn.disabled = true;
 }

 function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}


