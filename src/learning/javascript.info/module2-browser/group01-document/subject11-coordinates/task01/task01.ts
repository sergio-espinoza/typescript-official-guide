// source: https://javascript.info/coordinates#find-window-coordinates-of-the-field

import "./learning/javascript.info/module2-browser/group01-document/subject11-coordinates/task01/task01.css";

interface IExtendedWindow extends Window {
  coords?: HTMLDivElement;
  field?: HTMLDivElement;
}

const bodyEl1101 = document.body;
const coordsEl = (window as IExtendedWindow)?.coords;
const fieldEl = (window as IExtendedWindow)?.field;

document.onclick = function (e) {
  // shows click coordinates
  if (!coordsEl) {
    return;
  }

  coordsEl.innerHTML = e.clientX + ":" + e.clientY;
};

if (fieldEl) {
  const { top, left, width, height, right, bottom } =
    fieldEl.getBoundingClientRect();
  const { clientWidth, clientHeight, clientLeft, clientTop } = fieldEl;
  
  const alternativeFourthCoordinates = `
    right - parseInt(getComputedStyle(field).borderRightWidth) = ${
      right - parseInt(getComputedStyle(fieldEl).borderRightWidth)
    },
    bottom - parseInt(getComputedStyle(field).borderBottomWidth) = ${
      bottom - parseInt(getComputedStyle(fieldEl).borderBottomWidth)
    }`;
  
  const borderWidth = (width - clientWidth) / 2;
  const borderHeight = (height - clientHeight) / 2;
  const firstArrowCoordinates = `${left}:${top}`;
  const secondArrowCoordinates = `${left + width}:${
    top + height
  } --- right=${right}:bottom=${bottom}`;
  const thirdArrowCoordinates = `${left + borderWidth}:${
    top + borderHeight
  } -- left+clientLeft=${left + clientLeft}:top+clientTop=${top + clientTop}`;
  const fourthArrowCoordinates = `${left + borderWidth + clientWidth}:${
    top + borderHeight + clientHeight
  } -- ${alternativeFourthCoordinates}`;
  
  const coordinateList = [
    firstArrowCoordinates,
    secondArrowCoordinates,
    thirdArrowCoordinates,
    fourthArrowCoordinates,
  ];
  const coordinatesItems = coordinateList
    .map((item) => `<li>${item}</li>`)
    .join("");
  
  bodyEl1101.insertAdjacentHTML("beforeend", `<ol>${coordinatesItems}</ol>`);

}

