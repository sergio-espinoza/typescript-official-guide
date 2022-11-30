// source: https://javascript.info/default-browser-action#catch-links-in-the-element

declare const contents: HTMLFieldSetElement | undefined;

contents?.addEventListener('click', (event: MouseEvent) => {
  const targetEl = event.target as HTMLElement;
  const anchorEl = targetEl.closest<HTMLAnchorElement>('a[href]');

  if (!anchorEl || !contents.contains(anchorEl)) {
    return void 0;
  }

  event.preventDefault();

  const currentHref = anchorEl.getAttribute('href');
  const doNavigate = confirm(`Leave for: ${currentHref}?`);

  doNavigate && currentHref && window.open(currentHref, '_blank');

  return void 0;
});

// you can use onclick and return true/false to navigate in this case we're using preventDefault()
