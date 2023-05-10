const refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
};
const body = document.body;
let intervalId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};

function startColorChanging() {
    if (intervalId !== null) {
        return;
    }
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
    intervalId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);
};

function stopColorChanging() {
    clearInterval(intervalId);
    intervalId = null;
    refs.stopBtn.disabled = true;
    refs.startBtn.disabled = false;
}

refs.startBtn.addEventListener('click', startColorChanging);
refs.stopBtn.addEventListener('click', stopColorChanging);

