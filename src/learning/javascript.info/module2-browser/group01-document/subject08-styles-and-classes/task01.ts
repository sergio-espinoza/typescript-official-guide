// source: https://javascript.info/styles-and-classes#create-a-notification

import './learning/javascript.info/module2-browser/group01-document/subject08-styles-and-classes/task01.css';

const inputEl = document.createElement('input');

const bodyEl0801 = document.body;

const buttonEl = document.createElement('button');
buttonEl.textContent = 'OPEN NOTIFICATION';
buttonEl.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();

  // shows an element with the text "Hello" near the right-top of the window
  const notificationEl = getNotificationEl({
    top: 10, // 10px from the top of the window (by default 0px)
    right: 10, // 10px from the right edge of the window (by default 0px)
    html: `Value: ${inputEl.value} -> Now(): ${Date.now()}`, // the HTML of notification
    className: 'welcome', // an additional class for the div (optional)
  });

  bodyEl0801.append(notificationEl);

  setTimeout(() => {
    bodyEl0801.removeChild(notificationEl);
  }, 2000);
});

function getNotificationEl({
  top = 0,
  right = 0,
  html = '',
  className = '',
}): HTMLDivElement {
  const notificationEl = document.createElement('div');
  notificationEl.className = 'notification';
  notificationEl.classList.add(className);
  notificationEl.innerHTML = html;

  notificationEl.style.cssText = `top:${top}px;right:${right}px;`;

  return notificationEl;
}

function initElements() {
  bodyEl0801.append(inputEl, buttonEl);
}

initElements();
