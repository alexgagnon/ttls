# Contributing

## Add VS Code highlighting for an existing syntax to a new file extension (e.g. .hbs, .cshtml)

- under `vscode-extension`:
  - create a `test/index.{format}` file (see other files in this folder for what might go in it)
  - launch the extension in test mode (hit `F5`), open your file, open "Inspect Editor Tokens and Scopes", and see what the last entry in "textmate scopes" is. For example, for .cshtml, you'll see `text.html.cshtml`
  - add that value to all the `injectTo` arrays in `package.json` 

## Add a new language:

- add it to the `raw` package under `src/index.ts` and `src/curried/index.ts`
- if there are special versions that would be helpful (e.g. escaping, preventing injection attacks, etc.), add it to the `ttls` package under `src/{format}/index.ts`, add it to the `src/index.ts` export file, update the `package.json` `.exports` field to include it
- in `vscode-extension` package, create a `syntaxes/{format}-ttl.tmLanguage.json` file (copy the `example.tmLanguage.json` file and update the `TODO` sections), add a new object in the `contributes.grammars` field in `package.json` the same as the others other than `scopeName`, which should be `source.{format}.ttl`, then follow the "Add VS Code highlighting..." section above
- if there are common, helpful functions, consider adding them to the `helpers` package