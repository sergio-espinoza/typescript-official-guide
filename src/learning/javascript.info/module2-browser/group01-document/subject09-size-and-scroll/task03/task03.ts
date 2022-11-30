// source: https://javascript.info/size-and-scroll#place-the-ball-in-the-field-center

import "././learning/javascript.info/module2-browser/group01-document/subject09-size-and-scroll/task03/task03.css";

interface IExtendedWindow extends Window {
  field?: HTMLDivElement;
  ball?: HTMLImageElement;
}

const bodyEl0903 = document.body;
const fieldEl = (window as IExtendedWindow).field;
const ballEl = (window as IExtendedWindow).ball;

if (fieldEl && ballEl) {
  const {
    clientHeight: fieldCH,
    clientLeft: fieldCL,
    clientTop: fieldCT,
    clientWidth: fieldCW,
    offsetHeight: fieldOH,
    offsetLeft: fieldOL,
    offsetParent: fieldOP,
    offsetTop: fieldOT,
    offsetWidth: fieldOW,
  } = fieldEl;

  const {
    clientHeight: ballCH,
    clientLeft: ballCL,
    clientTop: ballCT,
    clientWidth: ballCW,
    offsetHeight: ballOH,
    offsetLeft: ballOL,
    offsetParent: ballOP,
    offsetTop: ballOT,
    offsetWidth: ballOW,
  } = ballEl;

  const xResult = (fieldCW - ballOW) / 2;
  const yResult = (fieldCH - ballOH) / 2;

  bodyEl0903.insertAdjacentHTML(
    "beforeend",
    `
    <ol>
      <b>Field</b>
      <li><b>clientHeight (R2)</b>: ${fieldCH}px</li>
      <li>clientLeft: ${fieldCL}px</li>
      <li>clientTop: ${fieldCT}px</li>
      <li><b>clientWidth (R1)</b>: ${fieldCW}px</li>
      <li>offsetHeight: ${fieldOH}px</li>
      <li>offsetLeft: ${fieldOL}px</li>
      <li>offsetParent: ${fieldOP}px</li>
      <li>offsetTop: ${fieldOT}px</li>
      <li>offsetWidth: ${fieldOW}px</li>
    </ol>
    <ol>
      <b>Ball</b>
      <li>clientHeight: ${ballCH}px</li>
      <li>clientLeft: ${ballCL}px</li>
      <li>clientTop: ${ballCT}px</li>
      <li>clientWidth: ${ballCW}px</li>
      <li><b>offsetHeight (R2)</b>: ${ballOH}px</li>
      <li>offsetLeft: ${ballOL}px</li>
      <li>offsetParent: ${ballOP}px</li>
      <li>offsetTop: ${ballOT}px</li>
      <li><b>offsetWidth (R1)</b>: ${ballOW}px</li>
    </ol>
    <ol>
      <b><i>RESULT</i><b>
      <li><i><b>xResult: </b>${xResult}px</i></li>
      <li><i><b>yResult: </b>${yResult}px</i></li>
    </ol>
    `
  );
  ballEl.style.left = `${xResult}px`;
  ballEl.style.top = `${yResult}px`;

  // Note: Pitfall:
  // <img width="40" height="40" /> or on css file
  // width: 40px;
  // height: 40px;
  // to make sure when the img is delaying to load.
}
