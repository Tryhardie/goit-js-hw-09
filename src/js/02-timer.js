import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('#datetime-picker'),
  timerBtn: document.querySelector('[data-start]'),
  timerDiv: document.querySelector('.timer'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.timerBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      refs.timerBtn.disabled = true;
    } else {
      refs.timerBtn.disabled = false;
    }
  },
};

flatpickr(refs.input, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

refs.timerBtn.addEventListener('click', () => {
  let timerId = setInterval(() => {
    let count = new Date(refs.input.value) - new Date();
    refs.timerBtn.disabled = true;
    if (count >= 0) {
      let timerValue = convertMs(count);
      refs.days.textContent = addLeadingZero(timerValue.days);
      refs.hours.textContent = addLeadingZero(timerValue.hours);
      refs.minutes.textContent = addLeadingZero(timerValue.minutes);
      refs.seconds.textContent = addLeadingZero(timerValue.seconds);
      if (count <= 60000) refs.timerDiv.style.color = '#C2191F';
    } else {
      Notiflix.Notify.success(
        'Thanks to the machine spirit, the timer ran out. To start a new timer select the date and click "Start".'
      );
      refs.timerDiv.style.color = '#212121';
      clearInterval(timerId);
    }
  }, 1000);
});
