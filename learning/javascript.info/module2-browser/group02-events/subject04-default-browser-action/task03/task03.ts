// source: https://javascript.info/default-browser-action#image-gallery

interface IExtendedWindow extends Window {
  largeImg?: HTMLImageElement;
  thumbs?: HTMLUListElement;
}

const largeImgEl = (window as IExtendedWindow).largeImg;
const thumbsEl = (window as IExtendedWindow).thumbs;

thumbsEl?.addEventListener('click', (event) => {
  const targetEl = event.target as HTMLElement;
  const anchorEl = targetEl.closest('a[href]');

  if (!anchorEl || !thumbsEl.contains(anchorEl)) {
    return void 0;
  }

  event.preventDefault();

  const currentHref = anchorEl.getAttribute('href');
  const currentTitle = anchorEl.getAttribute('title');

  currentHref && largeImgEl?.setAttribute('src', currentHref);
  currentTitle && largeImgEl?.setAttribute('alt', currentTitle);

  return void 0;
});
