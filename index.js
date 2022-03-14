const config = {
  pomodoroPeriod: 3,
  shortBreakPeriod: 5,
  longBreakPeriod: 15,
  longBreakAfter: 4,
  autoStartBreak: true,
  pomodoroCounter: 0,
};

const pomodoroMinElement = document.getElementById("min");
const pomodoroSecElement = document.getElementById("sec");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");

let minutes = config.pomodoroPeriod;
let seconds = 0;
let pomodoroStarted = false;
let stopPomodoro = false;

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
      throw new Error("minutes must be Positive number");
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
  timer(minutes, seconds).then(() => {
    //FIXME:reset state to config.pomodoro & btn to start
    //FIXME: variable to detect which stage 'pomodoro or break

    //TODO: convert min & sec to local variables
    //TODO: add banner
    //TODO: add reset icon & recenter start btn
    if (config.autoStartBreak) {
      minutes = config.shortBreakPeriod;
      seconds = 0;
      timer();
    }
  });
};

const reset = () => {
  minutes = config.pomodoroPeriod;
  seconds = 0;
  pomodoroStarted = false;
  startBtn.textContent = "Start";
};

const init = () => {
  render();

  startBtn.addEventListener("click", () => {
    pomodoroStarted = !pomodoroStarted;
    if (pomodoroStarted) {
      startBtn.textContent = "Pause";
      startPomodoro();
    } else {
      startBtn.textContent = "Start";
    }
  });

  stopBtn.addEventListener("click", () => {
    stopPomodoro = true;
    reset();
    render();
    stopPomodoro = false;
  });
};

document.addEventListener("DOMContentLoaded", () => {
  init();
});
