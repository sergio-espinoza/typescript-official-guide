export const cEl= (
  name: keyof HTMLElementTagNameMap,
  attribute: [string, string] = ['class', ''],
  contentHTML = '',
  node = document
) => {
  const el = node.createElement(name);
  el.setAttribute(attribute[0], attribute[1]);
  el.innerHTML = contentHTML;

  return el;
};