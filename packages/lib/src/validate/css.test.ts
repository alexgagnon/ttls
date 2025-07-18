import { describe, it } from 'vitest';
import { css } from './css.js';

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