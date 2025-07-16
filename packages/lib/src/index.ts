export function css(strings: TemplateStringsArray, ...values: any[]): string {
  return ttl(strings, values);
}

export function html(strings: TemplateStringsArray, ...values: any[]): string {
  return ttl(strings, values);
}

export function svg(strings: TemplateStringsArray, ...values: any[]): string {
  return ttl(strings, values);
}

function ttl(strings: TemplateStringsArray, values: unknown[]): string {
  let result = '';
  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
    if (i < values.length) {
      result += String(values[i]);
    }
  }
  return result;
}