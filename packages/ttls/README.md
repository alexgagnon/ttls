# TTLs

Tagged Template Literals

A collection of TTLs for various syntaxes like CSS, HTML, and XML.

> NOTE: The exports from this library do some minimal processing of the inputs to try to prevent injection attacks. The following functions are applied:
> - html: sanitize (DOMPurify)
> - css: escaping (cssesc), validating (lightningcss)
> - xml: validating (fast-xml-parser)

If you don't want your input processed at all, use the [`@ttls/raw` package](https://www.npmjs.org/package/@ttls/raw). Under the hood, this package just uses the `@ttls/raw/curried` exports to sequentially apply the processing.

There is a trade-off between being generalized and offering heightened security. Depending on your needs, you might also look at libraries like `escape-html`, `html-validate`, or other means of ensuring the output of the TTL is "correct" for your use case.

When used with the companion [VS Code extension](https://marketplace.visualstudio.com/items?itemName=alexgagnon.vscode-ttls), it offers syntax highlighting as well.

