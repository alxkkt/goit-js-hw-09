import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const dateInputRef = document.querySelector('#datetime-picker');
const labelRefs = document.querySelectorAll('.value');
const buttonRef = document.querySelector('[data-start]');

let selectedTime = 0;
buttonRef.disabled = true;

flatpickr(dateInputRef, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date().toUTCString(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedTime = selectedDates[0].getTime();

    if (selectedTime < Date.now()) {
      alert('Please choose a date in the future');
      return;
    }

    buttonRef.disabled = false;
    countdownFn(selectedTime, Date.now(), convertMs);
  },
});

function countdownFn(selectedTime, currentTime, convertionFn) {
  const timeLeft = convertionFn(selectedTime - currentTime); // эта запись для лучшей читабельности
  const timeValues = Object.values(timeLeft);

  labelRefs.forEach((label, index) => {
    label.textContent = addLeadingZero(timeValues[index]);
  });
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function onButtonClick() {
  buttonRef.disabled = true;

  setInterval(() => {
    countdownFn(selectedTime, Date.now(), convertMs);
  }, 1000);
}

buttonRef.addEventListener('click', onButtonClick);
