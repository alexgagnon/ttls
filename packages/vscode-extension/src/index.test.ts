import { describe, it } from 'vitest';

/**
 * Use this to test various RegExp patterns.
 * KNOWN CONFLICTS:
 * - 'something.css`' => can't tell if it's a valid (e.g. an import) or not (e.g. a filename in a template string)
 */

const pattern = /(\/\*+\s*css\s*\*+\/|\bcss)\s*(`)/;

describe('RegExp matches', () => {
  it.for([
    '/*css*/`',
    'css`',
  ])('%s should match', (str, { expect }) => {
    expect(pattern.test(str)).toBe(true);
  });

  it.for([
    '/css/`',
  ])('%s should not match', (str, { expect }) => {
    expect(pattern.test(str)).toBe(false);
  });
});