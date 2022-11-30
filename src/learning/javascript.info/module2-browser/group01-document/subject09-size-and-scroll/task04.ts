// source: https://javascript.info/size-and-scroll#the-difference-css-width-versus-clientwidth

const bodyEl = document.body;

const divEl = document.createElement('div');
divEl.classList.add('container');
divEl.style.borderWidth = '2px';
divEl.style.borderStyle = 'solid';
divEl.style.borderColor = 'rgba(25, 125, 43)';
divEl.style.paddingLeft = '2rem';
divEl.style.paddingRight = '2rem';
divEl.style.boxSizing = 'content-box';

divEl.insertAdjacentText(
  'afterbegin',
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque egestas congue quisque egestas diam in. Luctus venenatis lectus magna fringilla urna. Dui nunc mattis enim ut tellus elementum sagittis vitae et. Malesuada bibendum arcu vitae elementum curabitur vitae nunc sed. Fames ac turpis egestas integer eget. Vel quam elementum pulvinar etiam non. Habitant morbi tristique senectus et netus et malesuada. Ut tellus elementum sagittis vitae et. Dictum non consectetur a erat nam at lectus urna. Mattis aliquam faucibus purus in massa tempor nec feugiat nisl. Tincidunt id aliquet risus feugiat in ante metus dictum at. Tempus urna et pharetra pharetra massa massa. Convallis posuere morbi leo urna molestie at elementum eu. Viverra vitae congue eu consequat ac. Dui ut ornare lectus sit amet est placerat. Ipsum faucibus vitae aliquet nec ullamcorper sit. Lectus nulla at volutpat diam ut venenatis. Viverra tellus in hac habitasse platea dictumst vestibulum rhoncus est. Vivamus at augue eget arcu dictum varius.

Sit amet consectetur adipiscing elit ut. Morbi tristique senectus et netus et malesuada fames ac. Aenean sed adipiscing diam donec adipiscing. Volutpat maecenas volutpat blandit aliquam etiam erat velit. Commodo nulla facilisi nullam vehicula ipsum a arcu. Amet est placerat in egestas erat imperdiet. Pharetra convallis posuere morbi leo urna molestie at elementum. Varius duis at consectetur lorem donec. Quam id leo in vitae turpis massa sed elementum. Et tortor consequat id porta. Morbi tempus iaculis urna id volutpat lacus laoreet non curabitur. Tincidunt id aliquet risus feugiat in. In fermentum posuere urna nec tincidunt. Non diam phasellus vestibulum lorem sed risus. Enim sit amet venenatis urna cursus eget nunc. In nibh mauris cursus mattis molestie a iaculis at erat. Ultrices vitae auctor eu augue ut lectus arcu bibendum. Ante metus dictum at tempor commodo ullamcorper a lacus vestibulum.
`
);

bodyEl.append(divEl);

const widthComputedStyle = getComputedStyle(divEl).width;
const clientWidth = divEl.clientWidth;

const ulEl = document.createElement('ol');
ulEl.insertAdjacentHTML(
  'afterbegin',
  `
  <b>Properties</b>
  <li><code>getComputedStyle(el).width</code>: ${widthComputedStyle}</li>
  <li><code>el.clientWidth</code>: ${clientWidth}</li>
`
);

const differencesListEl = document.createElement('ol');
differencesListEl.insertAdjacentHTML(
  'afterbegin',
  `
  <b><i>Differences</i></b>
  <li>(1) is in string with px (2) is a number</li>
  <li>(1) is decimal (2) integer</li>
  <li>(1) shrinks with paddings (2) is same with paddings</li>
`
);

const differencesFromGuideListEl = document.createElement('ol');
differencesFromGuideListEl.insertAdjacentHTML(
  'afterbegin',
  `
  <b><i>Differences by JavaScript.io</i></b>
  <li>
  <code>clientWidth</code> is numeric, while
  <code>getComputedStyle(elem).width</code> returns a string with
  <code>px</code> at the end.
  </li>
  <li>
    <code>getComputedStyle</code> may return non-numeric width like
    <code>"auto"</code> for an inline element.
  </li>
  <li>
    <code>clientWidth</code> is the inner content area of the element plus
    paddings, while CSS width (with standard <code>box-sizing</code>) is the
    inner content area <em>without paddings</em>.
  </li>
  <li>
    If there’s a scrollbar and the browser reserves the space for it, some
    browser substract that space from CSS width (cause it’s not available
    for content any more), and some do not. The
    <code>clientWidth</code> property is always the same: scrollbar size is
    substracted if reserved.
  </li>
`
);

bodyEl.append(ulEl);
bodyEl.append(differencesListEl);
bodyEl.append(differencesFromGuideListEl);
