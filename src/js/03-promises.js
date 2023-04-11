const form = document.querySelector('.form');
const delay = document.getElementsByName('delay');
const step = document.getElementsByName('step');
const amount = document.getElementsByName('amount');
const btn = document.querySelector('button');

form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();

  const [amountInput] = amount;
  const [delayInput] = delay;
  const [stepInput] = step;
  const amountValue = Number(amountInput.value);
  const initialDelay = Number(delayInput.value);
  const stepValue = Number(stepInput.value);

  for (let i = 0; i < amountValue; i++) {
      const promiseDelay = initialDelay + stepValue * i;
      createPromise(i + 1, promiseDelay)
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = {position, delay};
      if (shouldResolve) {
        resolve(result);
      } else {
        reject(result);
      }
    }, delay);
  });

  return promise;
}
