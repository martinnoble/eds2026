/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-gallery.
 * Base: cards.
 * Source: https://www.martinnoble.com/blacksmithing
 * Generated: 2026-03-20
 *
 * Source HTML structure:
 *   <div class="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 row-cols-1 g-4">
 *     <div class="col">
 *       <div class="card text-center bg-light">
 *         <img class="card-img-top" src="..." alt="...">
 *         <div class="card-body">
 *           <div class="card-title h5">Title</div>
 *           <p class="card-text">Description<a class="stretched-link" href="#"></a></p>
 *         </div>
 *       </div>
 *     </div>
 *   </div>
 *
 * Target: Cards block with N rows, each [image | title + description]
 */
export default function parse(element, { document }) {
  const cards = element.querySelectorAll('.card');
  const rows = [];

  cards.forEach((card) => {
    const img = card.querySelector('.card-img-top, img');
    const title = card.querySelector('.card-title');
    const text = card.querySelector('.card-text');

    const imageCell = [];
    if (img) {
      imageCell.push(img);
    }

    const contentCell = [];
    if (title) {
      const h5 = document.createElement('p');
      h5.innerHTML = `<strong>${title.textContent.trim()}</strong>`;
      contentCell.push(h5);
    }
    if (text) {
      const p = document.createElement('p');
      // Remove stretched-link anchor from card text
      p.textContent = text.textContent.trim();
      contentCell.push(p);
    }

    rows.push([imageCell, contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-gallery', cells: rows });
  element.replaceWith(block);
}
