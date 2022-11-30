import { button, body, cEl, addEv, qSel } from "../../../../utils";

button.remove();

let timerId = -1;
const interval = 25;
let ms = 0;
let seconds = 0;
let minutes = 0;

body.append(
  cEl("div", ["class", "milliseconds"]),
  cEl("div", ["class", "seconds"]),
  cEl("div", ["class", "minutes"]),
  cEl("button", ["id", "start"], "⏵"),
  cEl("button", ["id", "pause"], "⏸︎"),
  cEl("button", ["id", "stop"], "⏹")
);

function startTimer(): void {
  if (timerId === -1) {
    timerId = window.setInterval(turnTimerOn, interval);
  }
}

function pauseTimer(): void {
  window.clearInterval(timerId);
  timerId = -1;
  displayTimer();
}

function stopTimer(): void {
  ms = 0;
  seconds = 0;
  minutes = 0;
  pauseTimer();
}

function turnTimerOn(): void {
  ms += interval;
  if (ms >= 1000) {
    ms = 0;
    seconds += 1;
  }
  if (seconds >= 60) {
    ms = 0;
    seconds = 0;
    minutes += 1;
  }

  displayTimer();
}

function init(idStartBtn: string, idPauseBtn: string, idStop: string): void {
  addEv(qSel(idStartBtn), "click", startTimer);
  addEv(qSel(idPauseBtn), "click", pauseTimer);
  addEv(qSel(idStop), "click", stopTimer);
  displayTimer();
}

function displayTimer(): void {
  qSel(".milliseconds").innerHTML = ms.toString();
  qSel(".seconds").innerHTML = seconds.toString();
  qSel(".minutes").innerHTML = minutes.toString();
}

init("#start", "#pause", "#stop");
