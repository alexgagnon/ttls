# TTLs

Tagged Template Literals

A collection of TTLs for various syntaxes like CSS, HTML, and XML.

> [!WARNING]
> The exports are raw and do not do any parsing or processing of arguments, so they are vulnerable to injection attacks. DO NOT use them if there will be any user generated content, and instead use the [`ttls` package](https://npmjs.org/alexgagnon/ttls), which does offer sanitizing of arguments.

There is also the [`@ttls/helpers` package](https://npmjs.org/alexgagnon/ttls/helpers), which has common functions for various languages, like spreading an object into HTML attributes and generating CSS strings from JavaScript.

When used with the companion [VS Code extension](https://marketplace.visualstudio.com/items?itemName=alexgagnon.vscode-ttls), it offers syntax highlighting as well.

There are two versions:

## `@ttls/raw`

The default exports just return the raw string.

```js
import { css, html, xml } from '@ttls/raw';

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

# `ttls/curried`

Functions that return the TTL with a pipeline of functions. The functions should either return a string, or an error should be thrown. 'preFuncs' are applied only to the interpolated values while the string is being built. This is useful for things like escaping characters. 'postFuncs' are applied to the complete string, and can be used for things like sanitization, transformation, validation, etc.

```js
import { css as curry } from '@ttls/raw/curried';

const swapRedForBlue = (css: string) => return css.replace('red', 'blue');
const validateCss = (css: string) => {
  if (!css.includes('.hello')) {
    throw new Error('Invalid CSS');
  }
  return css;
};

const css = curry(preFuncs: [swapRedForBlue], postFuncs: [validateCss]);

console.log(css`.hello { color: red; }`); // => .hello { color: red; }
console.log(css`.hello { color: ${ 'red' }; }`); // => .hello { color: blue; }
console.log(css`.uh-oh { color: red }`); // => invalid since no '.hello', throws.
```