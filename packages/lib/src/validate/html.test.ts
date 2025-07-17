import { describe, it } from 'vitest';
import { html } from './html.js';
import { htmlv } from './htmlv.js';

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

describe('htmlv', () => {
  const validate = (html: string) => {
    if (!html.includes('hello')) {
      throw new Error('Invalid HTML');
    }
  };

  it('should return a string', ({ expect }) => {
    const result = htmlv(validate)`
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
      htmlv(validate)`<div class="there"><span style="color: red;">Hello World</span>`;
    }).toThrow(/Invalid HTML/);
  });
});