/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: martinnoble cleanup.
 * Selectors from captured DOM of https://www.martinnoble.com/
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.before) {
    // No cookie banners or overlays found in captured DOM
  }
  if (hookName === H.after) {
    // Remove non-authorable content (from captured DOM)
    // Top nav: <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    // Bottom nav: <nav class="navbar navbar-expand navbar-light bg-light fixed-bottom">
    WebImporter.DOMUtils.remove(element, [
      'nav.navbar.fixed-top',
      'nav.navbar.fixed-bottom',
      'noscript',
      'iframe',
      'link',
    ]);
  }
}
