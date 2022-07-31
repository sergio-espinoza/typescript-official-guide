// source: https://javascript.info/modifying-document#create-a-tree-from-the-object

const data = {
  Fish: {
    trout: {},
    salmon: {},
  },

  Tree: {
    Huge: {
      sequoia: {},
      oak: {},
    },
    Flowering: {
      'apple tree': {},
      magnolia: {},
    },
  },
};

function createComplexList(entryObject: Record<string, object>): string {
  return `<ul>${getObjectEntries(entryObject).reduce((acc, [key, value]) => {
    const additionalHTML =
      Object.keys(value).length === 0 ? '' : createComplexList(value as Record<string, object>);

    return `${acc}<li>${key}${additionalHTML}</li>`;
  }, '')}</ul>`;
}

function getObjectEntries(entryObject: Record<string, object>) {
  return Object.keys(entryObject).map((key) => [key, entryObject[key]]);
}

function createComplexEl(entryObject: Record<string, object>): HTMLElement | string {
  const ulEl = document.createElement('ul');

  for (const key in entryObject) {
    const liEl = document.createElement('li');
    liEl.textContent = key;

    const subEl = createComplexEl(entryObject[key] as Record<string, object>);

    subEl && liEl.append(subEl);

    ulEl.append(liEl);
  }

  return ulEl.childElementCount > 0 ? ulEl : '';
}

bodyEl.innerHTML = createComplexList({ 'innerHTML-list': {}, ...data });
bodyEl.append(createComplexEl({ 'append-list': {}, ...data }));
