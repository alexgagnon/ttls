import { css, html, xml } from "ttls";

export default function Example() {
  return <>
    <style>{css`
      .example {
        font-family: blue;
        color: red;
      }
    `}</style>
    {html`<ul class="example">${true ? [1, 2, 3].map(item => html`<li>${item}</li>`) : html`<li>Empty</li>`}</ul>`}
    {xml`<node thing="hello">
      <child>World</child>
      ${true ? xml`<child>Conditional Child</child>` : xml`<child>Default Child</child>`}
    </node>`}
  </>
}