/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-bio.
 * Base: columns.
 * Source: https://www.martinnoble.com/
 * Generated: 2026-03-20
 *
 * Source HTML structure:
 *   <div class="row row-cols-lg-2 row-cols-1">
 *     <div class="body-image col"><img src="..." alt="Martin Avatar" class="img-fluid"></div>
 *     <div class="body-content col"><p>...</p><p>...</p><p>...</p><p>...</p></div>
 *   </div>
 *
 * Target: Columns block with 1 row, 2 columns [image | text content]
 */
export default function parse(element, { document }) {
  // Extract image from left column (from captured DOM: .body-image img)
  const img = element.querySelector('.body-image img, .col:first-child img');

  // Extract text content from right column (from captured DOM: .body-content)
  const textCol = element.querySelector('.body-content, .col:last-child');

  // Build cells: 1 row with 2 columns [image | text paragraphs]
  const imageCell = [];
  if (img) {
    imageCell.push(img);
  }

  const contentCell = [];
  if (textCol) {
    const paragraphs = textCol.querySelectorAll(':scope > p');
    paragraphs.forEach((p) => contentCell.push(p));
  }

  const cells = [
    [imageCell, contentCell],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-bio', cells });
  element.replaceWith(block);
}
