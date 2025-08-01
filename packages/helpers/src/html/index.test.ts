import { spread, ifDefined, toClassString, toStyleString } from './index.js';
import { describe, it } from 'vitest';

describe('html', () => {
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
});