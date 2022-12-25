// source: https://javascript.info/introduction-browser-events#move-the-ball-across-the-field

interface IExtendedWindow extends Window {
  field?: HTMLDivElement;
  ball?: HTMLImageElement;
}

interface ICalculatePosition {
  currentPosition: number;
  minLimit: number;
  maxLimit: number;
  itemSize: number;
}

const fieldEl = (window as IExtendedWindow)?.field;
const ballEl = (window as IExtendedWindow)?.ball;

const [internalLeft, internalTop, internalRight, internalBottom] =
  getFieldBoundingCoordinates(fieldEl);

fieldEl?.addEventListener('click', (event?: MouseEvent) => {
  const { clientX = 0, clientY = 0 } = event || {};

  const xPosition = calculatePosition({
    currentPosition: clientX,
    minLimit: internalLeft,
    maxLimit: internalRight,
    itemSize: ballEl?.offsetWidth || 0
  });

  const yPosition = calculatePosition({
    currentPosition: clientY,
    minLimit: internalTop,
    maxLimit: internalBottom,
    itemSize: ballEl?.offsetHeight || 0
  });
  ballEl?.style && (ballEl.style.left = `${xPosition - internalLeft}px`);
  ballEl?.style && (ballEl.style.top = `${yPosition - internalTop}px`);
});

function getFieldBoundingCoordinates(
  entryFieldEl?: HTMLDivElement
): [number, number, number, number] {
  const {
    offsetTop = 0,
    clientTop = 0,
    offsetLeft = 0,
    clientLeft = 0,
    clientHeight = 0,
    clientWidth = 0,
  } = entryFieldEl || {};

  const internalTop = offsetTop + clientTop;
  const internalLeft = offsetLeft + clientLeft;

  return [
    internalLeft,
    internalTop,
    internalLeft + clientWidth,
    internalTop + clientHeight,
  ];
}

function calculatePosition({
  currentPosition,
  minLimit,
  maxLimit,
  itemSize
}: ICalculatePosition): number {
  if (currentPosition + itemSize / 2 > maxLimit) {
    return maxLimit - itemSize;
  }

  if (currentPosition < minLimit + itemSize / 2) {
    return minLimit;
  }

  return currentPosition - itemSize / 2;
}
