import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    const divs = [...li.children];
    divs.forEach((div, i) => {
      if (div.querySelector('picture') || (div.children.length === 1 && div.querySelector('img'))) {
        div.className = 'cards-certifications-card-image';
      } else if (i === divs.length - 1 && !div.querySelector('a')) {
        div.className = 'cards-certifications-card-footer';
      } else {
        div.className = 'cards-certifications-card-body';
      }
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.textContent = '';
  block.append(ul);
}
