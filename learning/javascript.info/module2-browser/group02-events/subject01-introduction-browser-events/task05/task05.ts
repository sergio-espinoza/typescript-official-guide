// source: https://javascript.info/introduction-browser-events#create-a-sliding-menu

interface ISlidingMenu {
  opened: '▼';
  closed: '▶';
}
type TSlidingMenuValue = ISlidingMenu[keyof ISlidingMenu];
type TSlidingMenuEntry = [keyof ISlidingMenu, TSlidingMenuValue];

class SldingMenu {
  private content: ISlidingMenu = {
    opened: '▼',
    closed: '▶',
  };
  private entries: TSlidingMenuEntry[];
  private values: TSlidingMenuValue[];
  private regex: RegExp;

  constructor() {
    this.entries = Object.entries(this.content) as TSlidingMenuEntry[];
    this.values = this.entries.map(([, value]) => value);
    this.regex = new RegExp(this.values.join('|'), 'g');
  }

  public getContent(): ISlidingMenu {
    return this.content;
  }

  public getEntries(): TSlidingMenuEntry[] {
    return this.entries;
  }

  public getValues(): TSlidingMenuValue[] {
    return this.values;
  }

  public getRegex(): RegExp {
    return this.regex;
  }
}

const slidingMenu = new SldingMenu();
const bodyEl = document.body;
const elToChange = Array.from(bodyEl.childNodes).find((node) =>
  node.textContent?.match(slidingMenu.getRegex())
);
const elToChangeText = elToChange?.textContent;
const elToInsert = document.createElement('span');
let htmlToInsert = '';
slidingMenu
  .getEntries()
  .forEach(
    ([key, value]) => {
      const changedText = (htmlToInsert || elToChangeText)?.replace(
        value,
        `<span class="${key}">${value}</span>`
      );

      htmlToInsert = changedText ?? '';
    }
  );
elToInsert.innerHTML = htmlToInsert;
const ulEl = document.querySelector('ul');
elToChange && bodyEl.removeChild(elToChange);
ulEl?.insertAdjacentElement('beforebegin', elToInsert);
const openedEl = document.querySelector('.opened');
const closedEl = document.querySelector('.closed');

function initState(): void {
  closedEl?.classList.add('active');
}

function changeState(): void {
  closedEl?.classList.toggle('active');
  openedEl?.classList.toggle('active');
  ulEl?.classList.toggle('active');
}

elToInsert.addEventListener('click', changeState);

initState();


// it will work better with ::before { content: '▼' |'▶'; } with css styles.

