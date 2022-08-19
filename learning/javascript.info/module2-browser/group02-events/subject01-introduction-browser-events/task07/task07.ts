// source: https://javascript.info/introduction-browser-events#carousel

const bodyEl = document.body;
const htmlEl = bodyEl.parentElement;
const { left: bodyClientLeft } = bodyEl.getBoundingClientRect();
const carouselEl = bodyEl.querySelector<HTMLUListElement>('.carousel');
const [toLeftArrowEl, toRightArrowEl] =
  bodyEl.querySelectorAll<HTMLLIElement>('.arrow');

const carouselItem = carouselEl?.querySelector<HTMLLIElement>('li');
const carouselItemWidth = carouselItem?.offsetWidth || 0;

const carouselContainerEl = document.createElement('div');
carouselContainerEl.classList.add('carousel-container');

toRightArrowEl?.style.setProperty('position', 'absolute');
toLeftArrowEl?.style.setProperty('position', 'absolute');
toRightArrowEl?.style.setProperty(
  'top',
  `${(bodyEl.offsetHeight - toRightArrowEl.offsetHeight) / 2}px`
);
toLeftArrowEl?.style.setProperty(
  'top',
  `${(bodyEl.offsetHeight - toLeftArrowEl.offsetHeight) / 2}px`
);
carouselEl?.style.setProperty('display', 'flex');

toRightArrowEl.addEventListener('click', () => {
  carouselContainerEl.scrollTo({
    left: carouselContainerEl.scrollLeft + carouselItemWidth * 2,
  });
});
toLeftArrowEl.addEventListener('click', () => {
  carouselContainerEl.scrollTo({
    left: carouselContainerEl.scrollLeft - carouselItemWidth * 2,
  });
});

carouselContainerEl.style.marginLeft = `${toRightArrowEl.offsetWidth}px`;
carouselContainerEl.style.marginRight = `${toLeftArrowEl.offsetWidth}px`;
carouselContainerEl.style.overflowX = 'hidden';
carouselContainerEl.style.display = 'inline-block';
carouselContainerEl.style.width = `${carouselItemWidth * 3}px`;
carouselContainerEl.style.scrollBehavior = 'smooth';

setTimeout(
  () =>
    htmlEl &&
    toRightArrowEl?.style.setProperty(
      'left',
      `${
        bodyClientLeft +
        carouselContainerEl.offsetWidth +
        toLeftArrowEl.offsetWidth
      }px`
    )
);

carouselEl && carouselContainerEl.append(carouselEl);
bodyEl.append(carouselContainerEl);

// you can use marginLeft with a container o even (for perfomance) transform: translateX()...
