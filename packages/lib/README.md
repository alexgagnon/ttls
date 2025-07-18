# TTLs

Tagged Template Literals

A collection of TTLs for various syntaxes like CSS, HTML, and XML.

When used with the companion [VS Code extension](), it offers syntax highlighting as well.

There are several variations of the TTLs:

- `ttls` - The default exports just return the raw string. 
- `ttls/curry` - Function that returns a TTL with custom processing
- `ttls/validate` - Will throw errors if the code is invalide. Uses `lightningcss`, `html-validate`, and `fast-xml-parser` for CSS, HTML, and XML, respectively.
