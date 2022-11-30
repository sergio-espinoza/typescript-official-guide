// src https://javascript.info/event-delegation#tree-menu

interface IExtendedWindow extends Window {
  tree?: HTMLUListElement;
}

const treeEl = (window as IExtendedWindow).tree;

function preLoad(): void {
  const itemList = treeEl?.querySelectorAll<HTMLLIElement>('li');

  itemList?.forEach((item) => {
    const textFirstChild = item.firstChild;
    const spanEl = document.createElement('span');

    textFirstChild && spanEl.append(textFirstChild);
    item.insertAdjacentElement('afterbegin', spanEl);
  });

  onTreeClick();
}

function onTreeClick(): void {
  treeEl?.addEventListener('click', (event) => {
    const targetEl = event.target as HTMLElement;

    if (!treeEl.contains(targetEl) || targetEl.tagName !== 'SPAN') {
      return;
    }

    const ulElSibling = targetEl.nextSibling as HTMLElement;

    if (!ulElSibling || ulElSibling.tagName !== 'UL') {
      return;
    }

    ulElSibling.hidden = !ulElSibling.hidden;
  });
}

preLoad();
