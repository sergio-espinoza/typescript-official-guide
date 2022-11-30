// source: https://javascript.info/introduction-browser-events#hide-on-click

interface IExtendedWindow extends Window {
  hider?: HTMLInputElement;
  text?: HTMLDivElement;
  'hidding-type'?: HTMLSelectElement;
}

type THiddingType = 'hide' | 'display-none' | 'remove';

const hiderEl = (window as IExtendedWindow).hider;
const textEl = (window as IExtendedWindow).text;
const hiddingTypeEl = (window as IExtendedWindow)['hidding-type'];

hiderEl?.addEventListener('click', onClickHiderEl);

function onClickHiderEl(): void {
  const selectedHiddingType = (hiddingTypeEl?.value as THiddingType) || 'hide';
  hideOrRemoveTextEl(selectedHiddingType);
}

function hideOrRemoveTextEl(hiddingType: THiddingType): void {
  hiddingActions[hiddingType]();
}

const hiddingActions: Record<THiddingType, () => void> = {
  hide() {
    textEl && (textEl.style.visibility = 'hidden');
  },
  'display-none'() {
    textEl && (textEl.style.display = 'none');
  },
  remove() {
    textEl?.remove();
    hiderEl?.removeEventListener('click', onClickHiderEl);
  },
};
