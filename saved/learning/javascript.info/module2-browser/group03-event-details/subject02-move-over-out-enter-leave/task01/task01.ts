// source: https://javascript.info/mousemove-mouseover-mouseout-mouseenter-mouseleave#improved-tooltip-behavior

const bodyEl = document.body;
const tooltipEl = document.createElement('div');
const tooltipGap = 5;
tooltipEl.classList.add('tooltip');

bodyEl.addEventListener('mouseover', (event) => {
  const targetEl = event.target as HTMLElement;
  const tooltipText = targetEl?.dataset?.tooltip;

  if (!tooltipText) {
    tooltipEl?.remove();
    return void 0;
  }

  return showTooltip(tooltipText, targetEl);
});

function showTooltip(tooltipText: string, parentEl: HTMLElement): void {
  tooltipEl.innerHTML = tooltipText;

  bodyEl.append(tooltipEl);

  const { top, left } = getFormatedPosition(parentEl, tooltipEl);

  tooltipEl.style.top = `${top}px`;
  tooltipEl.style.left = `${left}px`;

  return void 0;
}

function getFormatedPosition(
  parentElRef: HTMLElement,
  tooltipElRef: HTMLDivElement
): { top: number; left: number } {
  const { top: parentTop, left: parentLeft } =
    parentElRef.getBoundingClientRect();

  const { width: tooltipWidth, height: tooltipHeight } =
    tooltipElRef.getBoundingClientRect();

  const topToEvaluate = parentTop - tooltipGap - tooltipHeight;
  const leftToEvaluate = parentElRef.offsetWidth - tooltipWidth;

  const allowedTop =
    topToEvaluate > 0
      ? topToEvaluate
      : parentTop + parentElRef.offsetHeight + tooltipGap;
  const allowedLeft =
    leftToEvaluate > 0 ? leftToEvaluate / 2 + parentLeft : parentLeft;

  return { top: allowedTop, left: allowedLeft };
}
