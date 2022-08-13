// source: https://javascript.info/introduction-browser-events#hide-self

interface IExtendedWindow extends Window {
  hider?: HTMLButtonElement;
  'hidding-type'?: HTMLSelectElement;
}

type THiddingType = 'hide' | 'display-none' | 'remove';

const hiderEl = (window as IExtendedWindow).hider;
const hiddingTypeEl = (window as IExtendedWindow)['hidding-type'];

hiderEl?.addEventListener('click', onClickHiderEl);

function onClickHiderEl(clickEvent?: MouseEvent): void {
  const target = clickEvent?.currentTarget;
  const selectedHiddingType = (hiddingTypeEl?.value as THiddingType) || 'hide';
  hideOrRemoveTextEl(selectedHiddingType, target as HTMLButtonElement | undefined);
}
// function onClickHiderEl(): void {
//   const selectedHiddingType = (hiddingTypeEl?.value as THiddingType) || 'hide';
//   hideOrRemoveTextEl(selectedHiddingType, this);
// }

function hideOrRemoveTextEl(hiddingType: THiddingType, entryThisEl?: HTMLButtonElement): void {
  hiddingActions[hiddingType](entryThisEl);
}

const hiddingActions: Record<THiddingType, (thisEl?: HTMLButtonElement) => void> = {
  hide(entryThisEl) {
    entryThisEl && (entryThisEl.style.visibility = 'hidden');
  },
  'display-none'(entryThisEl) {
    entryThisEl && (entryThisEl.style.display = 'none');
  },
  remove(entryThisEl) {
    entryThisEl?.remove();
    entryThisEl?.removeEventListener('click', onClickHiderEl);
  },
};
