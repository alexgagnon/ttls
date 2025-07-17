import { svg as svgttl } from "../index.js";

export function svgv(validate: (string: string) => void): (strings: TemplateStringsArray, ...values: any[]) => string {
  return function (strings: TemplateStringsArray, ...values: any[]): string {
    const result = svgttl(strings, ...values);
    validate(result);
    return result;
  }
}