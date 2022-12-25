// source: https://javascript.info/mouse-events-basics#selectable-list

export {};

interface IExtendedWindow extends Window {
  ul?: HTMLUListElement;
}

const selectedClassName = 'selected';

const ulEl = (window as IExtendedWindow).ul;

ulEl?.addEventListener('click', (event) => {
  const targetEl = event.target as HTMLLIElement | undefined;

  if (!targetEl || targetEl.tagName !== 'LI' || !ulEl.contains(targetEl)) {
    return void 0;
  }

  selectItem(targetEl, !event.ctrlKey && !event.metaKey);

  return void 0;
});

function selectItem(itemEl: HTMLLIElement, onlyClick: boolean): void {
  onlyClick && deselectItems(getSelectedItems(ulEl));

  itemEl?.classList.toggle(selectedClassName);
}

function deselectItems(itemEls?: NodeListOf<HTMLLIElement>): void {
  itemEls?.forEach((itemEl) => itemEl.classList.remove(selectedClassName));
}

function getSelectedItems(
  ulEl?: HTMLUListElement
): NodeListOf<HTMLLIElement> | undefined {
  return ulEl?.querySelectorAll<HTMLLIElement>(`.${selectedClassName}`);
}
