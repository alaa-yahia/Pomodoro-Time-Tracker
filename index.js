const config = {
  longBreakAfter: 4,
  shortBreakPeriod: 5,
  longBreakPeriod: 15,
  autoStartBreak: true,
  pomodoroPeriod: 3,
};

const pomodoroInput = document.getElementById("pomodoroInput");
const pomodoroDisplay = document.getElementById("pomodoroDisplay");
let pomodoroPeriod = config.pomodoroPeriod;
pomodoroDisplay.innerHTML = `${pomodoroPeriod}:00`;

pomodoroInput.addEventListener("change", (e) => {
  pomodoroPeriod = e.target.value;
  pomodoroDisplay.innerHTML = `${pomodoroPeriod}:00`;
});

const countDown = (count, elementToUpdate) =>
  new Promise((resolve, reject) => {
    if (count < 0) {
      throw new Error("Count must be Positive number");
    }

    const interval = setInterval(() => {
      count--;
      elementToUpdate.innerHTML = `${count}:00`;
      if (count <= 0) {
        clearInterval(interval);
        elementToUpdate.innerHTML = "EXPIRED";
        resolve();
      }
    }, 1000);
  });

const startPomodoro = () => {
  countDown(pomodoroPeriod, pomodoroDisplay).then(() => {
    countDown(config.shortBreakPeriod, pomodoroDisplay);
  });
};

startPomodoro();
