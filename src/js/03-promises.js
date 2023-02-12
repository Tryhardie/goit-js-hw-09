import Notiflix from 'notiflix';

refs = {
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
  createPromiseBtn: document.querySelector('button[type="submit"]'),
};

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}

refs.createPromiseBtn.addEventListener('click', event => {
  event.preventDefault();
  let delayMs = Number(refs.delay.value);
  let stepMs = Number(refs.step.value);
  for (let i = 0; i < refs.amount.value; i += 1) {
    createPromise(i + 1, delayMs + i * stepMs)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});
