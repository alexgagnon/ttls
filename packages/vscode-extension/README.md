# Tagged Template Literals VS Code Extension

Provides syntax highlighting for languages embedded in tagged template literals (for example, from the [`ttls` package](https://www.npmjs.com/package/ttls)). The extension also highlights comments like `/*{format}*/`, e.g. `` `/*css*/`.hello { color: red }` ``.

```js
import { css, html, xml } from 'ttls';

// each of these will have format specific syntax highlighting when 
// the extension is active
html`<div>
<style>
  ${css`svg { fill: blue; }`}
</style>
${xml`<svg width="100" height="100"><circle cx="50" cy="50" r="40" /></svg>`}
</div>`;
```

Currently supported file types:

- .html
- .js/ts
- .jsx/tsx
- .hbs
- .cshtml

See [CONTRIBUTING.md](https://github.com/alexgagnon/ttls/CONTRIBUTING.md) for a guide on how you can add additional formats.

