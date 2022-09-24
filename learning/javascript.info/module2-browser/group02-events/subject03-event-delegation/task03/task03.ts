// source: https://javascript.info/event-delegation#sortable-table

interface IExtendedWindow extends Window {
  grid?: HTMLTableElement;
}

interface ISorter {
  sortByString(tableBody: HTMLTableSectionElement, index: number): void;
  sortByNumber(tableBody: HTMLTableSectionElement, index: number): void;
}

const tableEl = (window as IExtendedWindow).grid;

class Sorter implements ISorter {
  constructor(private table: HTMLTableElement) {
  }

  public sortByString(
    tableBody: HTMLTableSectionElement,
    cellIndex: number
  ): void {
    const rows = [...Array.from(tableBody.rows)];

    const sortedRows = rows.sort((firstRow, secondRow) => {
      const firstNameCell = firstRow.cells[cellIndex];
      const secondNameCell = secondRow.cells[cellIndex];

      return (
        firstNameCell.textContent?.localeCompare(
          secondNameCell.textContent || ''
        ) || 0
      );
    });

    tableBody.append(...sortedRows);
  }

  public sortByNumber(
    tableBody: HTMLTableSectionElement,
    cellIndex: number
  ): void {
    const rows = [...Array.from(tableBody.rows)];

    const sortedRows = rows.sort((firstRow, secondRow) => {
      const firstNumberCell = firstRow.cells[cellIndex];
      const secondNumberCell = secondRow.cells[cellIndex];

      const firstTextContent = firstNumberCell.textContent || 0;
      const secondTextContent = secondNumberCell.textContent || 0;

      return +firstTextContent - +secondTextContent;
    });

    tableBody.append(...sortedRows);
  }

  public initSorterTable() {
    const tableHeader = this.table.tHead;
    const tableBody = this.table.tBodies[0];

    tableHeader?.addEventListener(
      'click',
      this.initHeaderEventListener(tableBody).bind(this)
    );
  }

  private initHeaderEventListener(
    tableBodyEl: HTMLTableSectionElement
  ): (event: MouseEvent) => void {
    return (event) => {
      const targetEl = event.target as HTMLElement;

      const type = targetEl.dataset.type;

      if (!type || targetEl.tagName !== 'TH') {
        return;
      }

      const actionName = `sortBy${this.capitalize(type)}` as keyof ISorter;

      this[actionName]?.(
        tableBodyEl,
        (targetEl as HTMLTableCellElement).cellIndex
      );
    };
  }

  private capitalize(entryText: string): string {
    return entryText.slice(0, 1).toUpperCase() + entryText.slice(1);
  }
}

const sorter = tableEl && new Sorter(tableEl);

sorter?.initSorterTable();
