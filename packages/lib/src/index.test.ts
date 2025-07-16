import { describe, it } from 'vitest';
import { css, html, svg } from './index.js';

describe('css', () => {
  it('should return a string', ({ expect }) => {
    const result = css`
.${ 'hello' } {
  color: ${ 'red' };
}`;
console.log(result);
    expect(result).toBe(`
.hello {
  color: red;
}`);
  });
});
