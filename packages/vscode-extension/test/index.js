import { css, html, xml } from 'ttls';

console.log(`${something}.html`, 'blah');
console.log(`${something}.css`, 'blah');
console.log(`${something}.xml`, 'blah');

html`<div class="something" ${spread({ class: 'container' })}>
<style>
  ${css`svg { fill: blue; }`}
</style>
${xml`<svg width="100" height="100"><circle cx="50" cy="50" r="40" /></svg>`}
</div>`;

css`
.containers { 
  display: flex;
  flex-direction: column;
  align-items: center;

  ${true ? css`
    background-color: lightblue;
  ` : css`
    background-color: lightcoral;
  `}
}`;
