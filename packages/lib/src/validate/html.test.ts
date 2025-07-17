import { describe, it } from 'vitest';
import { html } from './html.js';

describe('html', () => {
  it('should return a string', ({ expect }) => {
    const result = html`
<div class="hello">
  <span style="color: red;">Hello World</span>
</div>`;
    expect(result).toBe(`
<div class="hello">
  <span style="color: red;">Hello World</span>
</div>`);
  });

  it('should throw on invalid HTML', ({ expect }) => {
    expect(() => {
      html`<div class=hello"><span style="color: red;">Hello World</span>`;
    }).toThrow(/Invalid HTML: /);
  });
});