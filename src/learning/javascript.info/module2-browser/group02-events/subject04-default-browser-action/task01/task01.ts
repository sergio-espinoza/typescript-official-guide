// source: https://javascript.info/default-browser-action#why-return-false-doesn-t-work

const anchorEl = document.querySelector<HTMLAnchorElement>('a');

function handler(): boolean {
  alert('...');
  return false;
}

// this is the same as <a href="https://w3.org" onclick="handler()"></a>
// anchorEl && (anchorEl.onclick = function () { handler(); });
// so you must return this function like this: return handler();

anchorEl &&
  (anchorEl.onclick = function () {
    return handler();
  });
