import { css, html, xml } from "@ttls/raw";
import { spread } from "@ttls/helpers/html";

console.log(html`<div class="test"${spread({ id: "test-id", 'data-test': 'value' })}>
  <span>Test Content</span>
  <ul>
    ${true ? [1, 2, 3].map(item => html`<li>${item}</li>`).join('') : html`<li>Empty</li>`}
  </ul>
</div>`);

console.log(/*html*/`<div class="test"${spread({ id: "test-id", 'data-test': 'value' })}>
  <span>Test Content</span>
  <ul>
    ${true ? [1, 2, 3].map(item => html`<li>${item}</li>`).join('') : html`<li>Empty</li>`}
  </ul>
</div>`);

console.log(`${`something`}.html`, `blah`);
console.log(`${`something`}.html`, `blah`);

console.log(css`
.containers { 
  display: flex;

  .nested {
    color: red;
  }

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
}`);

console.log(/*css*/`
.containers {
  display: flex;

  .nested {
    color: red;
  }

  ${true 
    ? /*css*/`
    .hello {
      background-color: lightblue;
    }
  ` : /*css*/`
    .something {
      background-color: blue;
    }
  `}
}
`);

console.log(`${`something`}.css`, `blah`);
console.log(`${`something`}.css`, `blah`);

console.log(xml`<node thing="hello">
  <child>World</child>
  ${true ? xml`<child>Conditional Child</child>` : xml`<child>Default Child</child>`}
</node>`);

console.log(/*xml*/`<node thing="hello">
  <child>World</child>
  ${true ? xml`<child>Conditional Child</child>` : xml`<child>Default Child</child>`}
</node>`);

console.log(`${`something`}.xml`, `blah`);
console.log(`${`something`}.xml`, `blah`);