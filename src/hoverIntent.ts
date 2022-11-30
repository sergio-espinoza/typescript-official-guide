'use strict';

interface IHoverIntent {
  readonly sensitivity?: number;
  readonly interval?: number;
  readonly elem?: HTMLDivElement;
  readonly over: () => void;
  readonly out: () => void;
  
}

// Here's a brief sketch of the class
// with things that you'll need anyway
export class HoverIntent {
  protected readonly sensitivity: IHoverIntent['sensitivity'];
  protected readonly interval: IHoverIntent['interval'];
  protected readonly elem: IHoverIntent['elem'];
  protected readonly over: IHoverIntent['over'];
  protected readonly out: IHoverIntent['out'];

  constructor({
    sensitivity = 0.1, // speed less than 0.1px/ms means "hovering over an element"
    interval = 100, // measure mouse speed once per 100ms: calculate the distance between previous and next points
    elem,
    over,
    out
  }: IHoverIntent) {
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
    elem?.addEventListener("mouseover", this.onMouseOver);
    elem?.addEventListener("mouseout", this.onMouseOut);

    // continue from this point

  }

  onMouseOver(event: MouseEvent) {
    console.log('event -> ', event);
    // this.over();
    /* ... */
  }

  onMouseOut(event: MouseEvent) {
    console.log('event -> ', event);
    // this.out();
    /* ... */
  }

  onMouseMove(event: MouseEvent) {
    console.log('event -> ', event);
    /* ... */
  }


  destroy() {
    /* your code to "disable" the functionality, remove all handlers */
    /* it's needed for the tests to work */
  }

}