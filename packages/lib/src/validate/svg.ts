import { XMLValidator } from "fast-xml-parser";
import { svg as svgttl } from "../index.js";

export function svg(strings: TemplateStringsArray, ...values: any[]): string {
    const result = svgttl(strings, ...values);
    validate(result);
    return result;
}

function validate(svg: string): void {
  const report = XMLValidator.validate(svg, { allowBooleanAttributes: false });
  if (report !== true) {
    throw new Error(`Invalid SVG: ${report}`);
  }
}
