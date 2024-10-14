const minutesLabel = document.getElementById('minutes');
const secondsLabel = document.getElementById('seconds');
const milisecondsLabel = document.getElementById('miliseconds');

const startButton = document.getElementById('startBTN');
const stopButton = document.getElementById('stopBTN');
const pauseButton = document.getElementById('pauseBTN');
const resetButton = document.getElementById('resetBTN');

const lapList = document.getElementById('lapList');

let minutes = 0;
let seconds = 0;
let miliseconds = 0;
let interval;

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

// start button function
function startTimer() {
  interval = setInterval(updateTimer, 10);
  startButton.disabled = true; // click one time
}

function stopTimer() {
  clearInterval(interval);
  addToLapList();
  miliseconds = 0;
  seconds = 0;
  minutes = 0;
  displayTimer();
  startButton.disabled = false;
}

function pauseTimer() {
  clearInterval(interval);
  startButton.disabled = false;
}

function resetTimer() {
  clearInterval(interval);
  miliseconds = 0;
  seconds = 0;
  minutes = 0;
  displayTimer();
  startButton.disabled = false;
}

function updateTimer() {
  miliseconds++;
  if (miliseconds === 100) {
    miliseconds = 0;
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
  }
  displayTimer();
}

function displayTimer() {
  milisecondsLabel.textContent = padTimer(miliseconds);
  secondsLabel.textContent = padTimer(seconds);
  minutesLabel.textContent = padTimer(minutes);
}
// display time with 2 digits
function padTimer(time) {
  return time.toString().padStart(2, '0');
}

function addToLapList() {
  const lapTime = `${padTimer(minutes)} : ${padTimer(seconds)} : ${padTimer(
    miliseconds
  )}`;
  const listItem = document.createElement('li');
  listItem.innerHTML = `<span><strong>Lap ${
    lapList.childElementCount + 1
  }</strong></span>: ${lapTime}`;
  lapList.appendChild(listItem);
}
