# Notes of the Extension

Syntax highlighting is accomplished by providing additional Textmate grammars to VS Code, which are injected when specific RegExps are matched (e.g. `` html`<stuff>` ``, `` css`<stuff>` ``). See the `grammars` and `languages` properties in the `contributes` section of `package.json`

The "standard" textmate grammars used are:

- source.js
  - \#template-substitution-element - ${}
- source.css
- text.html
  - .derative - html that may contain other languages
  - .handlebars - .hbs files
  - .cshtml - .cshtml files
- text.xml

Intellisense and code completion is much more involved... The current approach from Styled Components and Lit HTML extensions is to extend the TypeScript language server. It first detects the presence of a matching tagged template literal, e.g. `` html`<div></div>` ``, creates a virtual document of the contents in memory, hooks in the appropriate Language Server for that type (while extending them to support template literal interpolation syntax, `${}`), extracts the Intellisense results, and injects these back into the original document.

https://github.com/mjbvz/vscode-lit-html
https://github.com/microsoft/typescript-template-language-service-decorator