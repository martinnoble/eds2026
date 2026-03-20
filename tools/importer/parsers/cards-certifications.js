/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-certifications.
 * Source: https://www.martinnoble.com/certifications
 * Generated: 2026-03-20
 *
 * Source HTML structure:
 *   <div class="row row-cols-xl-4 row-cols-lg-3 ...">
 *     <div class="col">
 *       <div class="card text-center bg-light">
 *         <img class="card-img-top" src="..." alt="...">
 *         <div class="card-body">
 *           <div class="card-title h5">Title</div>
 *           <div class="card-subtitle h6">Subtitle</div>
 *         </div>
 *         <div class="card-body">
 *           <a class="btn btn-success" href="...">View Certification</a>
 *         </div>
 *         <div class="card-footer text-muted">Date Range</div>
 *       </div>
 *     </div>
 *   </div>
 *
 * Target: Cards block with N rows, each [image | title + subtitle + link | date]
 */
export default function parse(element, { document }) {
  const cards = element.querySelectorAll('.card');
  const rows = [];

  cards.forEach((card) => {
    const img = card.querySelector('.card-img-top, img');
    const title = card.querySelector('.card-title');
    const subtitle = card.querySelector('.card-subtitle');
    const btn = card.querySelector('.btn, a[role="button"]');
    const footer = card.querySelector('.card-footer');

    // Image cell
    const imageCell = [];
    if (img) {
      imageCell.push(img);
    }

    // Content cell: title, subtitle, button link
    const contentCell = [];
    if (title) {
      const p = document.createElement('p');
      p.innerHTML = `<strong>${title.textContent.trim()}</strong>`;
      contentCell.push(p);
    }
    if (subtitle) {
      const p = document.createElement('p');
      p.innerHTML = `<em>${subtitle.textContent.trim()}</em>`;
      contentCell.push(p);
    }
    if (btn) {
      const p = document.createElement('p');
      const a = document.createElement('a');
      a.href = btn.href || btn.closest('a')?.href || '#';
      a.textContent = btn.textContent.trim();
      p.append(a);
      contentCell.push(p);
    }

    // Footer cell: date range
    const footerCell = [];
    if (footer) {
      const p = document.createElement('p');
      p.textContent = footer.textContent.trim();
      footerCell.push(p);
    }

    rows.push([imageCell, contentCell, footerCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-certifications', cells: rows });
  element.replaceWith(block);
}
