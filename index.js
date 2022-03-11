const config = {
  pomodoroPeriod: 1,
  shortBreakPeriod: 5,
  longBreakPeriod: 15,
  longBreakAfter: 4,
  autoStartBreak: true,
  pomodoroCounter: 0,
};

let pomodoroPeriod = config.pomodoroPeriod;
let minutes = pomodoroPeriod;
let seconds = 0;
const pomodoroMinElement = document.getElementById("pomodoroMin");
const pomodoroSecElement = document.getElementById("pomodoroSec");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const stopBtn = document.getElementById("stop");

const render = (min, sec) => {
  let minutesToDisplay = String(min);
  let secondsToDisplay = String(sec);
  minutesToDisplay =
    minutesToDisplay.length < 2 ? `0${minutesToDisplay}` : minutesToDisplay;
  secondsToDisplay =
    secondsToDisplay.length < 2 ? `0${secondsToDisplay}` : secondsToDisplay;
  pomodoroMinElement.innerHTML = minutesToDisplay;
  pomodoroSecElement.innerHTML = secondsToDisplay;
};

const timer = (min, sec) => {
  return new Promise((resolve, reject) => {
    if (min < 0) {
      throw new Error("minute must be Positive number");
    }
    const interval = setInterval(() => {
      console.log(seconds);
      if (sec !== 0) {
        sec--;
      } else {
        if (min !== 0) {
          sec = 60;
          min--;
          sec--;
        } else {
          clearInterval(interval);
          resolve();
        }
      }
      render(min, sec);
    }, 1000);
  });
};

const startPomodoro = () => {
  timer(minutes, seconds).then(() => {
    timer(minutes, seconds);
  });
};

const init = () => {
  render(minutes, seconds);
  startPomodoro();
};

document.addEventListener("DOMContentLoaded", () => {
  init();
});
