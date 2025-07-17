import { describe, it } from 'vitest';
import { css } from './css.js';
import { cssv } from './cssv.js';

const validate = (css: string) => {
  if (!css.includes('.hello')) {
    throw new Error('Invalid CSS');
  }
};

describe('css', () => {
  it('should return a string', ({ expect }) => {
    const result = css`
.${ 'hello' } {
  color: ${ 'red' };
}`;
    
    expect(result).toBe(`
.hello {
  color: red;
}`);
  });

  it('should throw on invalid CSS', ({ expect }) => {
    expect(() => {
        css`.hello color: red; }`
    }).toThrow();
  });
});

describe('cssv', () => {
  it('should return a string', ({ expect }) => {
    const result = cssv(validate)`.hello { color: red; }`;
    expect(result).toBe(`.hello { color: red; }`);
  });

  it('should throw on invalid CSS', ({ expect }) => {
    expect(() => {
      cssv(validate)`.there { color: red; }`;
    }).toThrow(/Invalid CSS/);
  });
});