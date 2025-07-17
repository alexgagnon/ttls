import { describe, it } from 'vitest';
import { svg } from './svg.js';

describe('svg', () => {
  it('should return a string', ({ expect }) => {
    const result = svg`
<svg xmlns="http://www.w3.org/2000/svg" width="${100}px" height="${100}px">
  <circle cx="50" cy="50" r="40"></circle>
</svg>`
    expect(result).toBe(`
<svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px">
  <circle cx="50" cy="50" r="40"></circle>
</svg>`);
  });

  it('should throw on invalid SVG', ({ expect }) => {
    expect(() => {
      svg`<svg disabled>`;
    }).toThrow(/Invalid SVG: /);
  });});