import { html as htmlttl } from "../index.js";

export function htmlv(validate: (string: string) => void): (strings: TemplateStringsArray, ...values: never[]) => string {
  return function (strings: TemplateStringsArray, ...values: any[]): string {
    const result = htmlttl(strings, ...values);
    validate(result);
    return result;
  }
}