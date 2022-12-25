const baguaTableEl = document.querySelector<HTMLTableElement>('#bagua-table');

baguaTableEl?.addEventListener('click', selectAndHighlight);

let selectedTd: HTMLElement;

function selectAndHighlight(this: HTMLTableElement, event: MouseEvent): void {
  const closestCellEl = (event.target as HTMLElement).closest('td');

  if (!closestCellEl || !baguaTableEl?.contains(closestCellEl)) {
    return void 0;
  }

  highlight(closestCellEl);
}

function highlight(tdElement: HTMLElement): void {
  selectedTd && selectedTd.classList.remove('highlight');

  selectedTd = tdElement;

  selectedTd.classList.add('highlight');
}
