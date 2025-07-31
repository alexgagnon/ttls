import { css, html, xml } from '@ttls/raw';
import { spread } from '@ttls/helpers/html';

html`<div class="test" ${spread({ id: "test-id", 'data-test': 'value' })}>
  <span>Test Content</span>
  <ul>
    ${true ? [1, 2, 3].map(item => html`<li>${item}</li>`) : html`<li>Empty</li>`}
  </ul>
</div>`

/*html*/`<div class="test" ${spread({ id: "test-id", 'data-test': 'value' })}>
  <span>Test Content</span>
  <ul>
    ${true ? [1, 2, 3].map(item => html`<li>${item}</li>`) : html`<li>Empty</li>`}
  </ul>
</div>`
console.log(`${`something`}.html`, `blah`);
console.log(`${`something`}.html`, `blah`);

css`
.containers { 
  display: flex;

  ${true 
    ? css`
    .hello {
      background-color: lightblue;
    }
  ` : css`
    .something {
      background-color: blue;
    }
  `}
}`;

css`
.containers {
  color: blue;
}`

/*css*/`
.containers {
  display: flex;
  .hello {
    background-color: lightblue;
  }
}
`;

console.log(`${`something`}.css`, `blah`);
console.log(`${`something`}.css`, `blah`);

xml`<node thing="hello">
  <child>World</child>
  ${true ? xml`<child>Conditional Child</child>` : xml`<child>Default Child</child>`}
</node>`;

/*xml*/`<node thing="hello">
  <child>World</child>
  ${true ? xml`<child>Conditional Child</child>` : xml`<child>Default Child</child>`}
</node>`;

console.log(`${`something`}.xml`, `blah`);
console.log(`${`something`}.xml`, `blah`);