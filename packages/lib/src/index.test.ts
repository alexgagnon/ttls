import { describe, it } from 'vitest';
import { css } from './index.js';

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

  it('should not throw on invalid CSS', ({ expect }) => {
    expect(() => {
        css`.hello color: red; }`
    }).not.toThrow();
  });
});
