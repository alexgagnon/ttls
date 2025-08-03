# TTLs Helpers

A collection of helper methods to support generating language strings from JS.

```js
import { spread, toClassString, toStyleString, ifDefined, getUniqueId } from 'ttls-helpers';
import { html } from 'ttls-raw';

const niceColor = 'red';

html`<div ${ifDefined('title', 'defined')}${spread({ id: getUniqueId(), class: toClassString(['one', ['two'], { three: true, four: false }]), style: toStyleString({ 'z-index': 1, color: niceColor })})}>
  <span>Hello!</span>
</div>`
```

produces:

```html
<div title="defined" id="mduc8trz" class="one two three" style="z-index: 1; color: red;">
  <span>Hello!</span>
</div>
```

```js
import { atRules, rules } from 'ttls-helpers';

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

produces:

```css
@container sm (min-width: 576px) {
  .d-hidden-sm {
    display: hidden;
  }

  .d-initial-sm {
    display: initial;
  }
}

@container md (min-width: 768px) {
  .d-hidden-md {
    display: hidden;
  }

  .d-initial-md {
    display: initial;
  }
}
```
