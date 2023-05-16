import flatpickr from "flatpickr";
import Notiflix from "notiflix";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
  datePicker: document.querySelector("#datetime-picker"),
  daysEl: document.querySelector("[data-days]"),
  hoursEl: document.querySelector("[data-hours]"),
  minutesEl: document.querySelector("[data-minutes]"),
  secondsEl: document.querySelector("[data-seconds]"),
  startBtn: document.querySelector('[data-start]'),
};

let intervalId;

const timer = {
  start() {
    const selectedDate = new Date(refs.datePicker.value).getTime();
    
    intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = selectedDate - currentTime;

      if (deltaTime <= 0) {
        timer.stop();
        refs.startBtn.disabled = true;
        return;
      }

      const { days, hours, minutes, seconds } = convertMs(deltaTime);

      refs.daysEl.textContent = days;
      refs.hoursEl.textContent = hours;
      refs.minutesEl.textContent = minutes;
      refs.secondsEl.textContent = seconds;

      console.log(`${days}:${hours}:${minutes}:${seconds}`);
      
    }, 1000);
    
    refs.startBtn.disabled = true;
  },
  
  stop() {
    clearInterval(intervalId);
    intervalId = null;
    refs.startBtn.disabled = false;
  },
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, "0");
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.info("Please choose a date in the future");
      refs.startBtn.disabled = true;
    } else {
      refs.startBtn.disabled = false;
      timer.stop();
    }
  },
};

flatpickr(refs.datePicker, options);

refs.startBtn.addEventListener("click", () => {
  if (!intervalId) {
    timer.start();
  }
});
