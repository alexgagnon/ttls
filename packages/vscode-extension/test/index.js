import { css, html, xml } from 'ttls';

html`<div ${spread({something: 'else'})}>
<style>
  ${css`svg { fill: blue; }`}
</style>
${xml`<svg width="100" height="100"><circle cx="50" cy="50" r="40" /></svg>`}
</div>`;
