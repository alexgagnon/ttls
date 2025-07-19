# TTLs VS Code Extension

Provides syntax highlighting for the tagged template literal exports from the [`ttls` package](https://www.npmjs.com/package/ttls).

```js
import { css, html, xml } from 'ttls';

// each of these will have syntax specific highlighting
html`<div>
<style>
  ${css`svg { fill: blue; }`}
</style>
${xml`<svg width="100" height="100"><circle cx="50" cy="50" r="40" /></svg>`}
</div>`;
```