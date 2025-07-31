import { describe, expect, it } from 'vitest';
import { xml } from './index.js';

describe('xml', () => {
  it('should handle valid XML', () => {
    const input = `<root><child>Test</child></root>`;
    const result = xml`${input}`;
    const expected = `<root><child>Test</child></root>`;
    expect(result).toBe(expected);
  });

  it('should throw on invalid XML', () => {
    const input = `<root><child>Test</child>`;
    expect(() => xml`${input}`).toThrowError(/Invalid XML/);
  });
})