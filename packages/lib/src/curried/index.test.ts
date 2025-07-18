import { describe, it } from 'vitest';
import { css, html, xml } from './index.js';

const validateCss = (css: string) => {
  if (!css.includes('.hello')) {
    throw new Error('Invalid CSS');
  }
  return css;
};

describe('curried css', () => {
  it('should return a string', ({ expect }) => {
    const result = css(validateCss)`.hello { color: red; }`;
    expect(result).toBe(`.hello { color: red; }`);
  });

  it('should throw on invalid CSS', ({ expect }) => {
    expect(() => {
      css(validateCss)`.there { color: red; }`;
    }).toThrow(/Invalid CSS/);
  });
});

