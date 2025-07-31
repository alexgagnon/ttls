import { describe, it } from 'vitest';
import { css as cssttl } from './index.js';

describe('css', () => {
  it('should return a string', ({ expect }) => {
    const result = cssttl`.${ 'hello' } {
  color: ${ 'red' };

  ${ true ? cssttl`.nested::after { font-size: 12px; content: '<👍>'; }` : ''}
}`;
    console.log(result);
    expect(result).toBe(`.hello {
  color: red;

  .nested::after { font-size: 12px; content: '<👍>'; }
}`);
  });

  it('should throw on invalid CSS', ({ expect }) => {
    expect(() => {
      cssttl`.hello color: red; }`;
    }).toThrow(/Invalid CSS/);
  });
});