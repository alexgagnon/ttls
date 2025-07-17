import { css as cssttl } from '../index.js';

export function cssv(validate: (string: string) => void): (strings: TemplateStringsArray, ...values: never[]) => string {
  return function (strings: TemplateStringsArray, ...values: any[]): string {
    const css = cssttl(strings, ...values);
    validate(css);
    return css;
  }
}