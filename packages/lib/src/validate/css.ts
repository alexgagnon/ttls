import { transform } from 'lightningcss';
import { css as curried } from '../curry/index.js';

const cssttl = curried((css: string) => {
  try {
    transform({
      filename: '',
      code: Buffer.from(css),
    });
  } catch (error) {
    throw new Error(`Invalid CSS: ${error instanceof Error ? error.message : String(error)}`);
  }
  return css;
});

export function css(strings: TemplateStringsArray, ...values: any[]): string {
  const css = cssttl(strings, ...values);
  return css;
}