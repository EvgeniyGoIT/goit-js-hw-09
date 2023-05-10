import flatpickr from "flatpickr";
import Notiflix from "notiflix";
import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const refs = {
  datePicker: document.querySelector("#datetime-picker"),
  daysEl: document.querySelector("[data-days]"),
  hoursEl: document.querySelector("[data-hours]"),
  minutesEl: document.querySelector("[data-minutes]"),
  secondsEl: document.querySelector("[data-seconds]"),
  startBtn: document.querySelector('[data-start]'),
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  let days = Math.floor(ms / day);
  let hours = Math.floor((ms % day) / hour);
  let minutes = Math.floor(((ms % day) % hour) / minute);
  let seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function updateTimer() {
  const now = new Date().getTime();
  const selectedDates = refs.datePicker.selectedDates;
  
  if (!selectedDates) {
    return;
  }
  
  const selectedDate = new Date(selectedDates[0]).getTime();
  const timeLeft = selectedDate - now;

  if (timeLeft < 0) {
    refs.daysEl.textContent = "00";
    refs.hoursEl.textContent = "00";
    refs.minutesEl.textContent = "00";
    refs.secondsEl.textContent = "00";
    clearInterval(timerId);
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeLeft);

  refs.daysEl.textContent = addLeadingZero(days);
  refs.hoursEl.textContent = addLeadingZero(hours);
  refs.minutesEl.textContent = addLeadingZero(minutes);
  refs.secondsEl.textContent = addLeadingZero(seconds);
}

let timerId;

flatpickr(refs.datePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      Notiflix.Notify.info("Please choose a date in the future");
    } else {
      refs.startBtn.disabled = false;
      clearInterval(timerId);
      timerId = setInterval(updateTimer, 1000);
    }
  },
});