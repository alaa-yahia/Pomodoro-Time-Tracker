const config = {
  pomodoroPeriod: 3,
  shortBreakPeriod: 5,
  longBreakPeriod: 15,
  longBreakAfter: 4,
  autoStartBreak: true,
  pomodoroCounter: 0,
};

const pomodoroMinElement = document.getElementById('min');
const pomodoroSecElement = document.getElementById('sec');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const stateDisplay = document.getElementById('state');

let minutes = 0; //config.pomodoroPeriod;
let seconds = 3;
let pomodoroStarted = false;
let stopPomodoro = false;
let state = 'Pomodoro';

const render = () => {
  let minutesToDisplay = String(minutes);
  let secondsToDisplay = String(seconds);
  minutesToDisplay =
    minutesToDisplay.length < 2 ? `0${minutesToDisplay}` : minutesToDisplay;
  secondsToDisplay =
    secondsToDisplay.length < 2 ? `0${secondsToDisplay}` : secondsToDisplay;
  pomodoroMinElement.innerHTML = minutesToDisplay;
  pomodoroSecElement.innerHTML = secondsToDisplay;
};

const timer = () =>
  new Promise((resolve, reject) => {
    if (minutes < 0) {
      throw new Error('minutes must be Positive number');
    }
    const interval = setInterval(() => {
      if (!pomodoroStarted) {
        clearInterval(interval);
        return;
      }
      if (stopPomodoro) {
        clearInterval(interval);
        return;
      }

      if (seconds !== 0) {
        seconds--;
      } else {
        if (minutes !== 0) {
          seconds = 60;
          minutes--;
          seconds--;
        } else {
          clearInterval(interval);
          resolve();
        }
      }

      render();
    }, 1000);
  });

const startPomodoro = () => {
  timer().then(() => {
    if (state === 'Break') {
      reset();
      render();
      renderBtnState();
      renderGameState();
      return;
    } else {
      state = 'Break';
      renderGameState();
      minutes = 0; //config.shortBreakPeriod;
      seconds = 3;
      render();
      if (config.autoStartBreak) {
        timer();
        renderBtnState();
        renderGameState();
      } else {
        pomodoroStarted = false;
        renderBtnState();
        render();
      }
    }
  });
};

const reset = () => {
  minutes = config.pomodoroPeriod;
  seconds = 0;
  pomodoroStarted = false;
  state = 'Pomodoro';
};

const renderBtnState = () => {
  if (pomodoroStarted) {
    startBtn.textContent = 'Pause';
    startPomodoro();
  } else {
    startBtn.textContent = 'Start';
  }
};

const renderGameState = () => {
  stateDisplay.innerHTML = state;
};

const init = () => {
  render();

  startBtn.addEventListener('click', () => {
    pomodoroStarted = !pomodoroStarted;
    renderBtnState();
  });

  stopBtn.addEventListener('click', () => {
    stopPomodoro = true;
    reset();
    render();
    renderBtnState();
    renderGameState();
    stopPomodoro = false;
  });
};

document.addEventListener('DOMContentLoaded', () => {
  init();
});

//TODO: convert min & sec to local variables
//TODO: add reset icon & recenter start btn
