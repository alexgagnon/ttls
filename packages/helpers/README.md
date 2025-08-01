# TTL Helpers

A collection of helper methods to support generating valid language strings from JS.

```js
import { spread, toClassString, toStyleString, containers, rules, normalizeBreakpoints } from '@ttls/helpers';
import { html, css } from '@ttls/raw';

// <div id="something" class="one two three" style="z-index: 1; color: red"></div>
console.log(html`<div${spread({ id: 'something', class: toClassString(['one', ['two'], { three: true, four: false }]), style: toStyleString({ 'z-index': 1, color: red })})}</div>`);

const breakpoints = normalizeBreakpoints({
  xs: '576px',
  sm: '768px'
})

// @containers (min-width: 576px) {
//   .m-1-}
console.log(containers(
  (alias, offset, minified) => Array.from({ length: 3 }).map((_, index) => breakpoints.map(({valuerule(`.m-${index + 1}-${alias}`, { margin: `--margin-${index + 1}` }, offset, minified)).join('\n\n'), breakpoints););

```

produces
