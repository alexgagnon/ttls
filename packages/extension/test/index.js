import { css, html, svg } from 'ttl-helpers';

const padding = '10px';

console.log(css`.hello {
  color: #000;

  ${padding && css`.something {
    padding: ${padding};
  }`}

  align-items: center;
}`);

css`@media screen (max-width: 600px) {
  .hello {
    color: red;
    line-height: 1.5;
    
  }

  @container {
    .hello {
      color: blue;
    }
  }
}`

console.log(html`<!doctype html><head></head><body><h1 style="padding: ${padding}">Hello!</h1></body></html>`);

console.log(svg`<svg width="100" height="100"><circle cx="50" cy="50" r="40" fill="green"/></svg>`);
html`<div style="color: red; padding: ${padding}">Hello World</div>`;
html`<div></div>`;

// make this a tagged template literal
function echo(strings, ...values) {
  let result = '';
  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
    if (i < values.length) {
      result += String(values[i]);
    }
  }
  return result;
}