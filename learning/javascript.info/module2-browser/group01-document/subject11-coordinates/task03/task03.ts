/* eslint-disable @typescript-eslint/no-unused-vars */

// https://javascript.info/coordinates#show-a-note-near-the-element-absolute

type TValidPosition = 'top' | 'right' | 'bottom';
type TPositionOperation = (
  anchorDomRect: DOMRect | undefined,
  elemHeight: number
) => {
  top: number;
  left: number;
};

const positionOperations: Record<TValidPosition, TPositionOperation> = {
  top(anchorDomRect, elemHeight) {
    const { top = 0, left = 0 } = anchorDomRect || {};

    return {
      top: top - elemHeight,
      left,
    };
  },
  right(anchorDomRect, _elemHeight) {
    const { top = 0, right = 0 } = anchorDomRect || {};

    return {
      top,
      left: right,
    };
  },
  bottom(anchorDomRect, _elemHeight) {
    const { bottom = 0, left = 0 } = anchorDomRect || {};

    return {
      top: bottom,
      left,
    };
  },
};

function positionAt(
  _anchor: HTMLQuoteElement | null,
  _position: TValidPosition,
  _elem: HTMLDivElement
) {
  const { top, left } = positionOperations[_position](
    _anchor?.getBoundingClientRect(),
    _elem.offsetHeight
  );

  _elem.style.cssText = `position:absolute;top:${top + window.scrollY}px;left:${
    left + window.scrollX
  }px`;
}

function showNote(
  anchor: HTMLQuoteElement | null,
  position: TValidPosition,
  html: string
) {
  const note = document.createElement('div');
  note.className = 'note';
  note.innerHTML = html;
  document.body.append(note);

  positionAt(anchor, position, note);
}

// test it
const blockquote = document.querySelector('blockquote');

showNote(blockquote, 'top', 'note above');
showNote(blockquote, 'right', 'note at the right');
showNote(blockquote, 'bottom', 'note below');
