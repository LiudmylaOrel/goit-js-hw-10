import { PREP_TIME } from './js/menu.js';

const form = document.querySelector('.form');
const orderLog = document.querySelector('.order-log');

const makeOrder = (delay, shouldResolve) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
};

const addOrderRow = drink => {
  const li = document.createElement('li');
  li.classList.add('row-pending');
  li.textContent = `⏳ ${drink} · у роботі…`;
  orderLog.append(li);
  return li;
};

form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const drink = formData.get('drink');
  const state = formData.get('state');
  const coffeeTime = PREP_TIME[drink];
  const shouldResolve = state === 'fulfilled';
  const row = addOrderRow(drink);

  makeOrder(coffeeTime, shouldResolve)
    .then(value => {
      row.classList.remove('row-pending');
      row.classList.add('row-ok');
      row.textContent = `✅ ${drink} · готове · ${value} ms`;
    })
    .catch(error => {
      row.classList.remove('row-pending');
      row.classList.add('row-err');
      row.textContent = `❌ ${drink} · скасовано · ${error} ms`;
    })
    .finally(() => {
      row.textContent += ` ${new Date().toLocaleTimeString('uk-UA')}`;
    });
});
