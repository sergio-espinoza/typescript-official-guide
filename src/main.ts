import './style.css';

// source: https://javascript.info/mousemove-mouseover-mouseout-mouseenter-mouseleave#smart-tooltip

import { HoverIntent } from './hoverIntent';


export const elemEl = (globalThis as any).elem;
export const tooltipEl = (globalThis as any).tooltip;

tooltipEl && (tooltipEl.className = 'tooltip');
tooltipEl && (tooltipEl.innerHTML = 'Tooltip');

new HoverIntent({
  elem: elemEl,
  over() {
    if (!tooltipEl) {
      return;
    }
    
    const { left, bottom } = elemEl?.getBoundingClientRect() || {
      left: 0,
      bottom: 0,
    };
    
    tooltipEl.style.left = left + 5 + 'px';
    tooltipEl.style.bottom = bottom + 5 + 'px';
  },
  out() {
    tooltipEl?.remove();
  },
});



