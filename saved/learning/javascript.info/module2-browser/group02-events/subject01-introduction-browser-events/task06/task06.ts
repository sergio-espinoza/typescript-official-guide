// source: https://javascript.info/introduction-browser-events#add-a-closing-button

type TNullable<T> = T | null;

function main(): void {
  const paneEls = document.querySelectorAll<HTMLDivElement>('.pane');
  const removerButtonEl = document.querySelector(
    '.remove-button'
  ) as TNullable<HTMLButtonElement>;

  paneEls.forEach((paneEl) => {
    const internalRemoverButtonEl = removerButtonEl?.cloneNode(
      true
    ) as TNullable<HTMLButtonElement>;

    paneEl.style.position = 'relative';
    internalRemoverButtonEl &&
      (internalRemoverButtonEl.style.cssText = `
        position: absolute;
        top: 0;
        padding: 0;`);

    function onClickRemoverButton(): void {
      paneEl?.remove();
      internalRemoverButtonEl?.removeEventListener(
        'click',
        onClickRemoverButton
      );
    }

    internalRemoverButtonEl?.addEventListener('click', onClickRemoverButton);

    paneEl.insertAdjacentElement(
      'afterbegin',
      internalRemoverButtonEl as Element
    );
  });

  removerButtonEl?.remove();
}
main();
