import { css, html, xml } from 'ttls';

const padding = '10px';

css`.hello {
  color: #000;

  ${padding && css`.something {
    padding: ${padding};
  }`}

  align-items: center;
}`;

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

html`<!doctype html><head></head><body><h1 style="padding: ${padding}">Hello!</h1></body></html>`;
xml`<svg width="100" height="100"><circle cx="50" cy="50" r="40" fill="green"/></svg>`;
