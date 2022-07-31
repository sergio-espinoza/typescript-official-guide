// source: https://javascript.info/modifying-document#create-a-calendar

import './learning/javascript.info/module2-browser/group01-document/subject07-modifying-document/task07.css';

interface ICalendarDay {
  daysQuantity: number;
  firstDayInit: number;
}

const divElement = document.createElement('div');
bodyEl.append(divElement);

const formEl = document.createElement('form');
const inputEl = document.createElement('input');

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  // eslint-disable-next-line no-console
  console.log(e);
  renderData(inputEl.value);
});
formEl.append(inputEl);
bodyEl.append(formEl);

const weekShortDays = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];

function getCalendarDayQuantity(years: number, month: number): ICalendarDay {
  const dateStr = `${years}-${month}-1`;

  const myDate = new Date(dateStr);
  myDate.setDate(1);

  const myMonth = myDate.getMonth();

  const dateAfterAMonth = new Date(dateStr);
  dateAfterAMonth.setDate(1);
  dateAfterAMonth.setMonth(myMonth + 1);

  const millisecondsADay = 1000 * 60 * 60 * 24;

  return {
    daysQuantity:
      (dateAfterAMonth.getTime() - myDate.getTime()) / millisecondsADay,
    firstDayInit: myDate.getDay(),
  };
}

function getColumnNumber(
  daysQuantity: number,
  weekDaysQuantity: number
): number {
  return Math.ceil(daysQuantity / weekDaysQuantity);
}

function getHeader(): string {
  return `<tr>${weekShortDays.map((d) => `<th>${d}</th>`).join('')}</tr>`;
}

function getBody(daysQuantity: number, weekDayInit: number): string {
  const formatedWeekDayInit = (weekDayInit || 7) - 1;

  const calendarRows = getColumnNumber(daysQuantity + formatedWeekDayInit, 7);

  let calendarBody = getHeader();

  for (let currentRow = 1; currentRow <= calendarRows; currentRow++) {
    let rowInnerBody = '';

    for (
      let currentField = (currentRow - 1) * 7 + 1;
      currentField <= currentRow * 7;
      currentField++
    ) {
      const currentDay = currentField - formatedWeekDayInit;
      const condition = currentDay > 0 && currentDay <= daysQuantity;

      rowInnerBody += `<td>${condition ? currentDay : ''}</td>`;
    }

    calendarBody += `<tr>${rowInnerBody}</tr>`;
  }

  return calendarBody;
}

function renderData(dateStr: string) {
  const [year, month] = dateStr.split('-');

  const { daysQuantity, firstDayInit } = getCalendarDayQuantity(+year, +month);

  divElement.innerHTML = `
  <table>
    ${getBody(daysQuantity, firstDayInit)}
  </table>
`;
}
