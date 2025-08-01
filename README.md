# TTLs

Supports embedded languages inside tagged template literals.

## Packages

- [`ttls` (`ttls`)](./packages/ttls/) set of tagged template literals, with some basic processing to prevent injection attacks.
- [`raw` (`@ttls/raw`)](./packages/raw/) set of tagged template literals that just return the string with no processing.
- [`helpers` (`@ttls/helpers`)](./packages/helpers/) set of common functions to help generate strings for various languages, e.g. `spread` and `toClassString` for HTML, and generating CSS from JS.
- [`vscode-extension` (`ttls`)](./packages/vscode-extension/) VS Code extension that provides format-specific highlighting to the exports from the above, in addition to template literals prefixed with a comment like `/*{format}*/`, e.g. `` /*css*/`.hello { color: red }` ``

## Prior Art

- es6-string-html
- lit-html
- inline-html