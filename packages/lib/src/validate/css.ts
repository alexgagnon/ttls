import { transform, type CustomAtRules, type TransformOptions } from 'lightningcss';
import { css as cssttl } from '../index.js';

export function css(strings: TemplateStringsArray, ...values: any[]): string {
  const css = cssttl(strings, ...values);
  validate(css, { filename: '', code: Buffer.from(css) });
  return css;
}

function validate(css: string, options: TransformOptions<CustomAtRules>): void {
  try {
    transform({
      ...options,
      filename: '',
      code: Buffer.from(css),
    });
  } catch (error) {
    throw new Error(`Invalid CSS: ${error instanceof Error ? error.message : String(error)}`);
  }
}