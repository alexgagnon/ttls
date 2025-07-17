import { css, html, svg } from 'ttl-helpers';

const padding = '10px';

console.log(css`.hello {
  color: #000;

  ${padding && css`.something {
    padding: ${padding};
  }`}
}`);

console.log(html`<!doctype html><head></head><body><h1 style="padding: ${padding}">Hello!</h1></body></html>`);

console.log(svg`<svg width="100" height="100"><circle cx="50" cy="50" r="40" fill="green"/></svg>`);