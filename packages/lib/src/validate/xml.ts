import { XMLValidator } from "fast-xml-parser";
import { xml as xmlttl } from "../index.js";

export function xml(strings: TemplateStringsArray, ...values: any[]): string {
    const result = xmlttl(strings, ...values);
    validate(result);
    return result;
}

function validate(xml: string): void {
  const report = XMLValidator.validate(xml, { allowBooleanAttributes: false });
  if (report !== true) {
    throw new Error(`Invalid XML: ${report}`);
  }
}
