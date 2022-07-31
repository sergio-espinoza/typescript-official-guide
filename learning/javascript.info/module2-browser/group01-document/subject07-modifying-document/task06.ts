// source: https://javascript.info/modifying-document#show-descendants-in-a-tree

const bodyEl0706 = document.body;

const preHTML0706 = `<ul>
<li>Animals
  <ul>
    <li>Mammals
      <ul>
        <li>Cows</li>
        <li>Donkeys</li>
        <li>Dogs</li>
        <li>Tigers</li>
      </ul>
    </li>
    <li>Other
      <ul>
        <li>Snakes</li>
        <li>Birds</li>
        <li>Lizards</li>
      </ul>
    </li>
  </ul>
</li>
<li>Fishes
  <ul>
    <li>Aquarium
      <ul>
        <li>Guppy</li>
        <li>Angelfish</li>
      </ul>
    </li>
    <li>Sea
      <ul>
        <li>Sea trout</li>
      </ul>
    </li>
  </ul>
</li>
</ul>`;

bodyEl0706.innerHTML = preHTML0706;

function addDescendantsQuantity(): void {
  const elList = Array.from(bodyEl0706.querySelectorAll('li'));

  elList.forEach((itemEl) => {
    const liChildrenLength = itemEl.querySelectorAll('li').length;

    if (liChildrenLength === 0 || !itemEl?.firstChild) {
      return;
    }
    itemEl.firstChild.textContent += `[${liChildrenLength}]`;
  });
}

addDescendantsQuantity();
