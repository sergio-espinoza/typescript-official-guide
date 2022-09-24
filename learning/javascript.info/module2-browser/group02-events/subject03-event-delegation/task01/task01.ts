// source: https://javascript.info/event-delegation#hide-messages-with-delegation

interface IExtendedWindow extends Window {
  container?: HTMLDivElement;
}

const containerEl = (window as IExtendedWindow).container;
const removeButtonMainClass = 'remove-button';
const panelMainClass = 'pane';

containerEl?.addEventListener('click', e => {
  const targetEl = e.target as HTMLElement;

  if (!targetEl.classList.contains(removeButtonMainClass)) { return; }

  const paneEl = targetEl.closest(`.${panelMainClass}`);

  if (!paneEl || !containerEl.contains(paneEl)) { return; }

  paneEl.remove();
});
