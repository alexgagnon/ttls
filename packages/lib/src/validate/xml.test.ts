import { describe, it } from 'vitest';
import { xml } from './xml.js';

describe('xml', () => {
  it('should return a string', ({ expect }) => {
    const result = xml`
<svg xmlns="http://www.w3.org/2000/svg" width="${100}px" height="${100}px">
  <circle cx="50" cy="50" r="40"></circle>
</svg>`
    expect(result).toBe(`
<svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px">
  <circle cx="50" cy="50" r="40"></circle>
</svg>`);
  });

  it('should throw on invalid XML', ({ expect }) => {
    expect(() => {
      xml`<svg disabled>`;
    }).toThrow(/Invalid XML: /);
  });
});
