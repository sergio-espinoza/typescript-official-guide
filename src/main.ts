import './style.css';

interface IExtendedWindow extends Window {
  slider?: HTMLInputElement;
}

const sliderEl = (window as IExtendedWindow).slider;
const thumbEl = sliderEl?.querySelector<HTMLDivElement>('.thumb');

thumbEl?.addEventListener('mousedown', (event) => {
  thumbEl?.style.setProperty('position', 'relative');

  const { width, left } = thumbEl.getBoundingClientRect();
  const { width: sliderWidth = 0, left: sliderLeft = 0 } =
    sliderEl?.getBoundingClientRect() || {};

  const shiftX = event.clientX - left;

  function moveAt(clientX: number): void {
    thumbEl?.style.setProperty('left', `${clientX - shiftX - sliderLeft}px`);
  }

  function onMouseMove(event: MouseEvent): void {
    const moveTo = Math.max(
      shiftX + sliderLeft,
      Math.min(event.clientX, sliderWidth + shiftX + sliderLeft - width)
    );

    moveAt(moveTo);
  }

  document.addEventListener('mousemove', onMouseMove);

  document.onmouseup = function () {
    document.removeEventListener('mousemove', onMouseMove);
    document.onmouseup = null;
  };
});

thumbEl &&
  (thumbEl.ondragstart = function () {
    return false;
  });
