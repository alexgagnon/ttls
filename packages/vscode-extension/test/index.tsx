import { css, html, xml } from "ttls-raw";

export default function Example() {
  return <>
    <style>{css`
      .example {
        font-family: blue;
        color: red;
      }
    `}
    </style>
    {html`<div class="example">Hello World</div>`}
    {xml`<svg width="100" height="100"><circle cx="50" cy="50" r="40" /></svg>`}
  </>
}