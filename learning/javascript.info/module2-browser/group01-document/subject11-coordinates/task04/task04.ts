/* eslint-disable @typescript-eslint/no-unused-vars */

// source: https://javascript.info/coordinates#position-the-note-inside-absolute

type TValidPosition =
  | 'top-out'
  | 'right-out'
  | 'bottom-out'
  | 'top-in'
  | 'right-in'
  | 'bottom-in';
type TPositionOperation = (
  anchorDomRect: DOMRect | undefined,
  elementWidth: number,
  elemHeight: number
) => {
  top: number;
  left: number;
};

const positionOperations: Record<TValidPosition, TPositionOperation> = {
  'top-out'(anchorDomRect, _elemWidth, elemHeight) {
    const { top = 0, left = 0 } = anchorDomRect || {};

    return {
      top: top - elemHeight,
      left,
    };
  },
  'right-out'(anchorDomRect, _elemWidth, _elemHeight) {
    const { top = 0, right = 0 } = anchorDomRect || {};

    return {
      top,
      left: right,
    };
  },
  'bottom-out'(anchorDomRect, _elemWidth, _elemHeight) {
    const { bottom = 0, left = 0 } = anchorDomRect || {};

    return {
      top: bottom,
      left,
    };
  },
  'top-in'(anchorDomRect, _elemWidth, _elemHeight) {
    const { top = 0, left = 0 } = anchorDomRect || {};

    return {
      top,
      left,
    };
  },
  'right-in'(anchorDomRect, elemWidth, _elemHeight) {
    const { top = 0, right = 0 } = anchorDomRect || {};

    return {
      top,
      left: right - elemWidth,
    };
  },
  'bottom-in'(anchorDomRect, _elemWidth, elemHeight) {
    const { bottom = 0, left = 0 } = anchorDomRect || {};

    return {
      top: bottom - elemHeight,
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
    _elem.offsetWidth,
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

showNote(blockquote, 'top-out', 'note above');
showNote(blockquote, 'right-out', 'note at the right');
showNote(blockquote, 'bottom-out', 'note below');
showNote(blockquote, 'top-in', 'note top-in');
showNote(blockquote, 'right-in', 'note right-in');
showNote(blockquote, 'bottom-in', 'note bottom-in');
