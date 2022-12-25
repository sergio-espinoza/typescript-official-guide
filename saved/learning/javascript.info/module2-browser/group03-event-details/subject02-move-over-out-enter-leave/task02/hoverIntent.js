'use strict';

// source: https://javascript.info/mousemove-mouseover-mouseout-mouseenter-mouseleave#smart-tooltip

// Here's a brief sketch of the class
// with things that you'll need anyway
class HoverIntent {
  isOver = false;
  currentX = 0;
  currentY = 0;
  currentTimeStamp = 1;
  timeout = -1;

  constructor({
    sensitivity = 0.1, // speed less than 0.1px/ms means "hovering over an element"
    interval = 100, // measure mouse speed once per 100ms: calculate the distance between previous and next points
    elem,
    over,
    out,
  }) {
    this.sensitivity = sensitivity;
    this.interval = interval;
    this.elem = elem;
    this.over = over;
    this.out = out;

    // make sure "this" is the object in event handlers.
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);

    // assign the handlers
    elem.addEventListener('mouseover', this.onMouseOver);
    elem.addEventListener('mouseout', this.onMouseOut);
    elem.addEventListener('mousemove', this.onMouseMove);

    // continue from this point
  }

  onMouseOver(event) {
    /* ... */
    this.isOver = true;
    this.timeoutId = setTimeout(
      () => this.isOver && this.over(),
      this.interval
    );
  }

  onMouseOut(event) {
    /* ... */
    this.isOver = this.elem?.contains(event.relatedTarget);

    if (this.isOver) {
      return;
    }

    clearTimeout(this.timeoutId);
    this.out();
  }

  onMouseMove(event) {
    // if (!this.isOver && event.timeStamp - this.currentNow < this.interval) {
    //   return;
    // }

    const { x = 0, y = 0, timeStamp = 1 } = event || {};

    this.differenceX = x - this.currentX;
    this.differenceY = y - this.currentX;
    this.differenceTimeStamp = timeStamp - this.currentTimeStamp;

    const hypotenuse = Math.sqrt(this.differenceX ** 2 + this.differenceY ** 2);
    this.isOver = hypotenuse / this.differenceTimeStamp < this.sensitivity;

    this.currentNow = timeStamp;
    this.currentX = x;
    this.currentY = y;

    /* ... */
  }

  destroy() {
    /* your code to "disable" the functionality, remove all handlers */
    /* it's needed for the tests to work */
    this.elem.removeEventListener('mouseover', this.onMouseOver);
    this.elem.removeEventListener('mouseout', this.onMouseOut);
    this.elem.removeEventListener('mousemove', this.onMouseMove);
  }
}
