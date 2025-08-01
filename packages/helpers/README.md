# TTLs Helpers

A collection of helper methods to support generating language strings from JS.

```js
import { spread, toClassString, toStyleString, ifDefined, atRules, rules, normalizeBreakpoints } from 'ttls-helpers';
import { html, css } from 'ttls-raw';

// <div title="title" id="something" class="one two three" style="z-index: 1; color: red"></div>
console.log(html`<div${ifDefined('title', 'title')}${spread({ id: 'something', class: toClassString(['one', ['two'], { three: true, four: false }]), style: toStyleString({ 'z-index': 1, color: red })})}</div>`);

const breakpoints = normalizeBreakpoints({
  xs: '576px',
  sm: '768px'
})

// @container sm (min-width: 576px) {
//   .d-hidden-sm {
//     display: hidden;
//   }

//   .d-initial-sm {
//     display: initial;
//   }
// }

// @container md (min-width: 768px) {
//   .d-hidden-md {
//     display: hidden;
//   }

//   .d-initial-md {
//     display: initial;
//   }
// }
atRules(
  'container',
  (name) => rules(
    (value) => `.d-${value}-${name}`, ['hidden', 'initial'], 'display', '  '
  ),
  {
    sm: 'sm (min-width: 576px)',
    md: 'md (min-width: 768px)'
  }
);

```
