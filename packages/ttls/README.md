# TTLs

Tagged Template Literals

A collection of TTLs for various syntaxes like CSS, HTML, and XML.

> NOTE: The exports from this library do some minimal processing of the inputs to try to prevent things like XSS. The following functions are applied:
> - html: escaping (escape-html), sanitize (DOMPurify)
> - css: escaping (cssesc), validating (lightningcss)
> - xml: validating (fast-xml-parser)

These are mostly pretty tolerant, however they will throw an error if something is really incorrect.

There is also a companion [VS Code extension](https://marketplace.visualstudio.com/items?itemName=alexgagnon.vscode-ttls), which offers syntax highlighting for the various formats either through a comment like `/*{format}*/`, e.g. `` `/*css*/`.hello { color: red }` ``, or through one of the TTL exports, like `` css`.hello { color: red }` ``.

If you don't want your input processed at all, you can either use the extension above with the comment-based format, or use the [`ttls-raw` package](https://www.npmjs.org/package/ttls-raw). Under the hood, this package just uses the `ttls-raw/curried` export. Depending on your needs, you might look at using the curried function to create your own pipelines using things like `prettier` for formatting and `html-validate` for HTML validation, to make sure the output of the TTL is "correct" for your use case.

## Examples

```js
import { css, html, xml } from 'ttls';

html`<div>${ '< '}</div><img src=x onerror=alert(1)//>`; // => <div>&lt; </div><img src="x">
css`.${ '👍' } { color: red; }` // => .\\1F44D { color: red; }
css`.hello color: red; }` // => will throw


