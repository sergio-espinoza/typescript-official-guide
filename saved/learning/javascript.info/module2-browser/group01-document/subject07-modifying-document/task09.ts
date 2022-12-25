// source: https://javascript.info/modifying-document#insert-the-html-in-the-list

interface IExtendedWindow extends Window {
  one?: HTMLLIElement;
}

const body0709 = document.body;

const preHTML0709 = `
<ul id="ul">
<li id="one">1</li>
<li id="two">4</li>
</ul>
`;

body0709.innerHTML = preHTML0709;

const htmlToInsert = '<li>2</li><li>3</li>';

(window as IExtendedWindow)?.one?.insertAdjacentHTML('afterend', htmlToInsert);



