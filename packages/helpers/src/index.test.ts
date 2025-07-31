import { spread, ifDefined, toClassString, toStyleString } from './index.js';
import { property, rules } from './index.js';
import { describe, it, expect, vi } from 'vitest';
import { html } from 'ttls/html/index.js';

it('should produce valid HTML', () => {
  const result = `<div${spread({ id: 'test', class: 'example' })}>
    <span${ifDefined('title', 'Hello World')}${ifDefined('uhoh', undefined)}>Hello</span>
    <span class="${toClassString('class1', 'class2')}">World</span>
    <span style="${toStyleString({ color: 'red', 'font-size': '16px' })}">!</span>
  </div>`;
  const expected = `<div id="test" class="example">
    <span title="Hello World">Hello</span>
    <span class="class1 class2">World</span>
    <span style="color: red; font-size: 16px;">!</span>
  </div>`;
  if (result !== expected) {
    throw new Error(`Expected:\n${expected}\n\nGot:\n${result}`);
  }
})

it('should produce valid CSS', () => {
  const cssResult = property('my-property', 'value', 'syntax', true, false);
  const expectedCss = `@property --my-property {
  syntax: "syntax";
  inherits: true;
  initial-value: value;
}`;
  if (cssResult !== expectedCss) {
    throw new Error(`Expected:\n${expectedCss}\n\nGot:\n${cssResult}`);
  }

  const ruleResult = rules((value) => `.bc-${value}`, ['red', 'blue'], 'background-color', '', false);
  const expectedRule = `.bc-red {
  background-color: red;
}

.bc-blue {
  background-color: blue;
}`;
  if (ruleResult !== expectedRule) {
    throw new Error(`Expected:\n${expectedRule}\n\nGot:\n${ruleResult}`);
  }
})