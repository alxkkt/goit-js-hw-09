function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
let intervalId = 0;

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
stopButton.disabled = true;

const onStartBtnClick = () => {
  startButton.disabled = true;
  stopButton.disabled = false;
  document.body.style.backgroundColor = getRandomHexColor();

  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
};

const onStopButtonClick = () => {
  clearInterval(intervalId);

  stopButton.disabled = true;
  startButton.disabled = false;
};

startButton.addEventListener('click', onStartBtnClick);
stopButton.addEventListener('click', onStopButtonClick);
