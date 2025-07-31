export type TTL = (strings: TemplateStringsArray, ...values: any[]) => string;

export const css: TTL = (...args) => ttl(...args);
export const html: TTL = (...args) => ttl(...args);
export const style: TTL = (...args) => ttl(...args);
export const xml: TTL = (...args) => ttl(...args);

const ttl: TTL = (strings: TemplateStringsArray, ...values: any[]) => {
  let result = '';
  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
    if (i < values.length) {
      result += String(values[i]);
    }
  }
  return result;
}