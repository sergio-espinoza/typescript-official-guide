// source: https://javascript.info/event-delegation#tooltip-behavior

const bodyEl = document.body;

const tooltipEl = document.createElement('div');
tooltipEl.classList.add('tooltip');

bodyEl.addEventListener('mouseover', (e) => {
  const targetEl = e.target as HTMLElement;
  const tooltipText = targetEl.dataset.tooltip;

  if (!tooltipText) {
    tooltipEl.remove();
    return;
  }

  const { top, left, width, height } = targetEl.getBoundingClientRect();

  tooltipEl.innerHTML = tooltipText;

  bodyEl.append(tooltipEl);

  const { height: tooltipHeight, width: tooltipWidth } =
    tooltipEl.getBoundingClientRect();

  const firstTooltipTopCalculate = top - tooltipHeight - 5;
  const firstTooltipLeftCalculate = left + (width - tooltipWidth) / 2;

  const correctTooltipTop = calculatePosition(
    firstTooltipTopCalculate,
    top + height + 5
  );
  const correctTooltipLeft = calculatePosition(firstTooltipLeftCalculate, left);

  tooltipEl.style.top = `${correctTooltipTop}px`;
  tooltipEl.style.left = `${correctTooltipLeft}px`;
});

function calculatePosition(firstValue: number, fallbackValue: number): number {
  return firstValue > 0 ? firstValue : fallbackValue;
}

// bodyEl.addEventListener('mouseout', e => console.log(e.target));
