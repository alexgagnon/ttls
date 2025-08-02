# Tagged Template Literals VS Code Extension

Provides syntax highlighting for languages embedded in tagged template literals using either an inline comment like like `` /*{format}*/`stuff.../` ``, e.g. `` `/*css*/`.hello { color: red }` ``, or tagged template literals of the form `` {format}`stuff...` ``, e.g. `` css`.hello { color: red; }` `` (for example, from the [`ttls` package](https://www.npmjs.com/package/ttls)).

```js
// each of these will have format specific syntax highlighting when 
// the extension is active
/*html*/`<div>
<style>
  ${/*css*/`svg { fill: blue; }`}
</style>
${/*xml*/`<svg width="100" height="100"><circle cx="50" cy="50" r="40" /></svg>`}
</div>`;
```

Currently supported syntaxes:

- html
- css, for full css highlighting e.g. `` /*css*/`.hello { color: red }` ``
- style, for css properties outside of a block `` /*style*/`color: red;` ``
- sql: !!!WARNING!!! DO NOT USE THIS TO GENERATE SQL STATEMENTS BASED ON USER INPUT!!! 
- xml

Currently supported file types:

- .html
- .js/ts
- .jsx/tsx
- .hbs
- .cshtml

See [CONTRIBUTING.md](https://github.com/alexgagnon/ttls/CONTRIBUTING.md) for a guide on how you can add additional formats.

