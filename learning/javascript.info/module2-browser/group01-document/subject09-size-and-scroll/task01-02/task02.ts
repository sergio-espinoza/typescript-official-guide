// source: https://javascript.info/size-and-scroll#what-is-the-scrollbar-width

import "./learning/javascript.info/module2-browser/group01-document/subject09-size-and-scroll/task-01-02/task-01-02.css";

const body = document.body;

interface IExtendedWindow extends Window {
  example?: HTMLDivElement;
}

const {
  clientWidth = 0,
  scrollLeft = 0,
  offsetWidth = 0,
  clientLeft = 0,
} = (window as IExtendedWindow).example || {};

body.insertAdjacentHTML(
  "beforeend",
  `
  <div class="result">offsetWidth: ${offsetWidth}</div>
  <div class"result">clientWidth: ${clientWidth}</div>
  <div class"result">scrollLeft: ${scrollLeft}</div>
  <div class="result">result: ${
    offsetWidth - clientWidth - scrollLeft - clientLeft * 2
  }
  </div>`
);
