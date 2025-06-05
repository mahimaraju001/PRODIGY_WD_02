let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

function updateDisplay() {
  const time = elapsedTime;
  const hours = String(Math.floor(time / 3600000)).padStart(2, '0');
  const minutes = String(Math.floor((time % 3600000) / 60000)).padStart(2, '0');
  const seconds = String(Math.floor((time % 60000) / 1000)).padStart(2, '0');
  const milliseconds = String(time % 1000).padStart(3, '0');

  document.getElementById('display').textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function startPause() {
  const button = document.querySelector('.buttons button:first-child');
  if (!running) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
    running = true;
    button.textContent = 'Pause';
  } else {
    clearInterval(timerInterval);
    running = false;
    button.textContent = 'Start';
  }
}

function reset() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  running = false;
  updateDisplay();
  document.querySelector('.buttons button:first-child').textContent = 'Start';
  document.getElementById('laps').innerHTML = '';
}

function lap() {
  if (!running) return;
  const lapTime = document.getElementById('display').textContent;
  const lapItem = document.createElement('li');
  lapItem.textContent = `Lap: ${lapTime}`;
  document.getElementById('laps').prepend(lapItem);
}

// Initialize
updateDisplay();
