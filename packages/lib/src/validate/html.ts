import { HtmlValidate, type ConfigData } from "html-validate";
import { html as htmlttl } from "../index.js";

const validator = new HtmlValidate({
  rules: {
    // Tag and structure validation
    "void-style": "error",
    "close-order": "error",
    "element-required-attributes": "error",
    "no-unknown-elements": "error",
    "no-raw-characters": "error",
    
    // Attribute validation
    "attribute-boolean-style": "error",
    "attribute-empty-style": "error",
    "no-missing-references": "error",
    
    // Content validation
    "no-inline-style": "off", // Allow inline styles for template literals
    "require-sri": "off", // Don't require subresource integrity for templates
    "no-implicit-close": "error",
    "void-content": "error",
    
    // Accessibility (optional but recommended)
    "wcag/h37": "error", // img elements must have alt attribute
    "wcag/h67": "error", // title attribute should not duplicate content
  }
});

export function html(strings: TemplateStringsArray, ...values: any[]): string {
  const result = htmlttl(strings, ...values);
  validate(result, validator);
  return result;
}

function validate(html: string, validator: HtmlValidate): void {
  const report = validator.validateStringSync(html);
  if (!report.valid) {
    const errors = report.results[0]?.messages
      .filter((msg: any) => msg.severity === 2) // Only errors, not warnings
      .join('; ');
    
    if (errors) {
      throw new Error(`Invalid HTML: ${errors}`);
    }
  }
}