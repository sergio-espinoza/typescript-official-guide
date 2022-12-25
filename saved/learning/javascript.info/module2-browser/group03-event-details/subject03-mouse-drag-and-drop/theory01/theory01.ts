
// souce: https://javascript.info/mouse-drag-and-drop#potential-drop-targets-droppables

export declare const gate: HTMLImageElement | undefined;
export declare const ball: HTMLImageElement | undefined;

let currentDroppable: Element | null = null;

ball?.addEventListener('mousedown', (event) => {
  const { left = 0, top = 0 } = ball.getBoundingClientRect();

  const shiftX = event.clientX - left;
  const shiftY = event.clientY - top;

  ball.style.position = 'absolute';
  ball.style.zIndex = '1000';

  document.body.append(ball);

  function moveAt(pageX: number, pageY: number): void {
    if (!ball) {
      return;
    }
    ball.style.left = `${pageX - shiftX}px`;
    ball.style.top = `${pageY - shiftY}px`;
  }

  function onMouseMove(event: MouseEvent): void {
    moveAt(event.pageX, event.pageY);

    if (!ball) {
      return;
    }

    ball.hidden = true;
    let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    ball.hidden = false;

    if (!elemBelow) {
      return;
    }

    let droppableBelow = elemBelow.closest('.droppable');

    if (currentDroppable == droppableBelow) {
      return;
    }

    currentDroppable && leaveDroppable(currentDroppable);

    currentDroppable = droppableBelow;

    currentDroppable && enterDroppable(currentDroppable);
  }

  document.addEventListener('mousemove', onMouseMove);

  ball.onmouseup = function () {
    document.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
  };
});

function enterDroppable(elem: Element): void {
  elem && ((elem as HTMLElement).style.background = 'pink');
}

function leaveDroppable(elem: Element): void {
  elem && ((elem as HTMLElement).style.background = '');
}

ball &&
  (ball.ondragstart = function () {
    return false;
  });
