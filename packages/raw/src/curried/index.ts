import type { TTL } from '../index.js';

export type CurryFunc = (string: string) => string;
export interface CurriedTTLOptions { preFuncs?: CurryFunc | CurryFunc[], postFuncs?: CurryFunc | CurryFunc[] };
export type CurriedTTL = (options?: CurriedTTLOptions) => TTL;

export default function({preFuncs = [], postFuncs = []}: CurriedTTLOptions): TTL {
  return (strings: TemplateStringsArray, ...values: any[]): string => {
    let result = '';
    for (let i = 0; i < strings.length; i++) {
      result += strings[i];
      if (i < values.length) {
        result += (Array.isArray(preFuncs) ? preFuncs : [preFuncs]).reduce((acc, func) => func(acc), String(values[i]));
      }
    }

    return (Array.isArray(postFuncs) ? postFuncs : [postFuncs]).reduce((acc, func) => func(acc), result);
  }
}