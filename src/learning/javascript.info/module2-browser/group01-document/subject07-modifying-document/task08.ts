// source: https://javascript.info/modifying-document#colored-clock-with-setinterval

import './learning/javascript.info/module2-browser/group01-document/subject07-modifying-document/task08.css';

import { addEv, cEl, qSel } from '../../../../../utils';

let idClockInterval: NodeJS.Timer | number = -1;

const body0708 = document.body;

function preventExtraEvent(e: Event | undefined) {
  e?.stopPropagation();
  e?.stopImmediatePropagation();
  e?.preventDefault();
}

function loadInitialContent() {
  const actionsButtonsDivEl = cEl('div', ['class', 'actions']);
  const playButtonEl = cEl('button', ['class', 'actions__button'], 'PLAY');
  const pauseButtonEl = cEl('button', ['class', 'actions__button'], 'PAUSE');

  addEv(playButtonEl, 'click', (e) => {
    preventExtraEvent(e);
    playClock(
      qSel('.clock__hours'),
      qSel('.clock__minutes'),
      qSel('.clock__seconds')
    );
  });

  addEv(pauseButtonEl, 'click', (e) => {
    preventExtraEvent(e);
    pauseClock();
  });

  actionsButtonsDivEl.append(playButtonEl, pauseButtonEl);

  const clockInnerHTML = `
    <span class="clock__hours">hh</span><span>:</span>
    <span class="clock__minutes">mm</span><span>:</span>
    <span class="clock__seconds">ss</span>`.replace(/  +|\n/g, '');
  const clockDivEl = cEl('div', ['class', 'clock'], clockInnerHTML);

  body0708.append(clockDivEl, actionsButtonsDivEl);
}

function playClock(
  hoursEl: HTMLSpanElement,
  minutesEl: HTMLSpanElement,
  secondsEl: HTMLSpanElement
): void {
  if (idClockInterval !== -1) {
    return void 0;
  }

  idClockInterval = setInterval(() => {
    renderClock(hoursEl, minutesEl, secondsEl);
  }, 1000);

  renderClock(hoursEl, minutesEl, secondsEl);
}

function pauseClock(): void {
  clearInterval(idClockInterval);
  idClockInterval = -1;
}

function renderClock(
  hoursEl: HTMLSpanElement,
  minutesEl: HTMLSpanElement,
  secondsEl: HTMLSpanElement
): void {
  const date = new Date().toLocaleTimeString();
  const [hours, minutes, seconds] = date.split(':');

  hoursEl.textContent = getFormatedTime(hours);
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
}

function getFormatedTime(timeStr: string): string {
  return timeStr.length >= 2 ? timeStr : `0${timeStr}`;
}

loadInitialContent();
