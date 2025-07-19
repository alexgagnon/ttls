# TTLs

Tagged Template Literals

A collection of TTLs for various syntaxes like CSS, HTML, and XML.

When used with the companion [VS Code extension](https://marketplace.visualstudio.com/items?itemName=alexgagnon.vscode-ttls), it offers syntax highlighting as well.

There are several variations of the TTLs:

## `ttls`

The default exports just return the raw string.

```js
import { css, html, xml } from 'ttls';

console.log(html`<div>
<style>
  ${css`svg { fill: blue; }`}
</style>
${xml`<svg width="100" height="100"><circle cx="50" cy="50" r="40" /></svg>`}
</div>`);
```

produces

```html
<div>
<style>
  svg { fill: blue; }
</style>
<svg width="100" height="100"><circle cx="50" cy="50" r="40" /></svg>
</div>
```

# `ttls/curry`

Functions that return the TTL with custom processing

```js
import { css as curry } from 'ttls/curry';

const validateCss = (css: string) => {
  if (!css.includes('.hello')) {
    throw new Error('Invalid CSS');
  }
  return css;
};

const css = curry(validateCss);

// this will throw an error
console.log(css`.uh-oh { color: blue }`);
```

## `ttls/validate` 

Will throw errors if the code is invalide. Uses `lightningcss`, `html-validate`, and `fast-xml-parser` for CSS, HTML, and XML, respectively.
