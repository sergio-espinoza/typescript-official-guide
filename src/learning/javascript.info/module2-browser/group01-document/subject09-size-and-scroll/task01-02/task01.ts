// source: https://javascript.info/size-and-scroll#what-s-the-scroll-from-the-bottom

import "./learning/javascript.info/module2-browser/group01-document/subject09-size-and-scroll/task-01-02/task-01-02.css";

const body = document.body;

interface IExtendedWindow extends Window {
  example?: HTMLDivElement;
}

const {
  clientHeight = 0,
  scrollHeight = 0,
  scrollTop = 0,
} = (window as IExtendedWindow).example || {};

body.insertAdjacentHTML(
  "beforeend",
  `<div class="result">scrollBottom: ${
    scrollHeight - scrollTop - clientHeight
  }</div>`
);
