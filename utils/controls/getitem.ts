export function qSel<T extends Element>(selector: string, node = document): T {
  return node.querySelector(selector) as T;
}
