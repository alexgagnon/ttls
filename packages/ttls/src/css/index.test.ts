import { describe, it } from 'vitest';
import { css as cssttl } from './index.js';

describe('css', () => {
  it('should escape content', ({ expect }) => {
    const result = cssttl`.${ 'hello' } {
  color: ${ 'red' };

  ${ true ? /*css*/`.nested::after { font-size: 12px; content: '<👍>'; }` : ''}
}`;
    console.log(result);
    expect(result).toBe(`.hello {
  color: red;

  .nested::after { font-size: 12px; content: \\'<\\1F44D>\\'; }
}`);
  });

  it('should throw on invalid CSS', ({ expect }) => {
    expect(() => {
      cssttl`.hello color: red; }`;
    }).toThrow(/Invalid CSS/);
  });
});