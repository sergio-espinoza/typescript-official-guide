export const addEv = (
  element: Element, 
  name: string, 
  callback: (e?: Event) => void,
  options = false
  ) => {
  return element.addEventListener(
    name, callback, options
  );
};
