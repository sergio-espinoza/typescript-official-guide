// source: https://javascript.info/introduction-browser-events#which-handlers-run

interface IExtendedWindow extends Window {
  button?: HTMLButtonElement;
  'removable-button'?: HTMLButtonElement;
}

const buttonEl = (window as IExtendedWindow).button;
const removableButtonEl = (window as IExtendedWindow)["removable-button"];

buttonEl?.addEventListener('click', () => alert(1)); // *1
buttonEl?.removeEventListener('click', () => alert(1)); // *2
buttonEl && (buttonEl.onclick = () => alert(2)); // *3

// *2 won´t work because it's not the same function (in-memory). So script will print on alert 1 and 2.

removableButtonEl?.addEventListener('click', showAlert1);
removableButtonEl?.removeEventListener('click', showAlert1);

removableButtonEl && (removableButtonEl.onclick = () => alert(2));

function showAlert1(): void {
  alert(1);
}
