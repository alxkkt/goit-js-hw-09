import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', onClick);

function onClick(e) {
  e.preventDefault();

  const DELAY = Number(form.elements.delay.value);
  const STEP = Number(form.elements.step.value);
  const AMOUNT = Number(form.elements.amount.value);

  let counter = 1;

  for (let i = 0; i < AMOUNT; i += 1) {
    createPromise(counter, DELAY + i * STEP)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    counter += 1;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
