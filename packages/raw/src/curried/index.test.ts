import { describe, it } from 'vitest';
import ttl from './index.js';

const swapRedForBlue = (css: string) => css.replace('red', 'blue');

const validateCss = (css: string) => {
  if (!css.includes('.hello')) {
    throw new Error('Invalid CSS');
  }
  return css;
};

const css = ttl({preFuncs: swapRedForBlue, postFuncs: validateCss});

describe('curried css', () => {
  it('should return a string', ({ expect }) => {
    const result = css`.hello { color: ${ 'red' }; }`;
    expect(result).toBe(`.hello { color: blue; }`);
  });

  it('should throw on invalid CSS', ({ expect }) => {
    expect(() => {
      css`.there { color: red; }`;
    }).toThrow(/Invalid CSS/);
  });
});

