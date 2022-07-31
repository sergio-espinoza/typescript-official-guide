// source: https://javascript.info/modifying-document#sort-the-table

interface IExtendedWindow extends Window {
  table?: HTMLTableElement;
}

const body0710 = document.body;

const preHTML0710 = `
  <table id="table">
    <thead>
      <tr>
        <th>Name</th><th>Surname</th><th>Age</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>John</td><td>Smith</td><td>10</td>
      </tr>
      <tr>
        <td>Pete</td><td>Brown</td><td>15</td>
      </tr>
      <tr>
        <td>Ann</td><td>Lee</td><td>5</td>
      </tr>
      <tr>
        <td>...</td><td>...</td><td>...</td>
      </tr>
    </tbody>
  </table>
`;

body0710.innerHTML = preHTML0710;

const tableEl = (window as IExtendedWindow)?.table;
const tableBodyEl = tableEl?.tBodies[0];

function getSortedRowsByName(): HTMLTableRowElement[] {
  const formatedRows = Array.from(tableBodyEl?.rows || []);

  return formatedRows.slice().sort((curr, bef) => compareCellTexts(curr, bef));
}

function compareCellTexts(
  curr: HTMLTableRowElement,
  bef: HTMLTableRowElement
) : number {
  const currentText = curr.cells[0].textContent;
  const beforeText = bef.cells[0].textContent;

  if (currentText === '...') {
    return 1;
  }

  return (currentText || '').localeCompare(beforeText || '');
}

tableBodyEl?.append(...getSortedRowsByName());
