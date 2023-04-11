import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const btnStart = document.querySelector('[data-start]');
btnStart.disabled = true;
btnStart.addEventListener('click', onCount);

const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

let selectedDateUTC;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentTime = Date.now();

    selectedDateUTC = selectedDate.getTime();
    if (selectedDateUTC < currentTime) {
      btnStart.disabled = true;
      Notiflix.Notify.warning('Please choose a date in the future');
    } else {
      btnStart.disabled = false;
    }
  },
};

const calendar = document.querySelector('#datetime-picker');
flatpickr(calendar, options);

function onCount() {
  const intervalId = setInterval(() => {
    const currentTime = Date.now();

    const diff = selectedDateUTC - currentTime;
    if (diff <= 0) {
      clearInterval(intervalId);
      return;
    } else {
      const { days, hours, minutes, seconds } = convertMs(diff);
      console.log({ days, hours, minutes, seconds });

      daysSpan.textContent = `${days}`;
      hoursSpan.textContent = `${hours}`;
      minutesSpan.textContent = `${minutes}`;
      secondsSpan.textContent = `${seconds}`;
    }
  }, 1000);
}

function pad(value) {
    return String(value).padStart(2, '0');
}

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
