import { css as cssttl, html as htmlttl, xml as xmlttl, type TTL } from '../index.js';

export type CurriedTTL = (func: (string: string) => string) => TTL;

const echo = (string: string) => string;

export const css: CurriedTTL = (func = echo) => (...args) => func(cssttl(...args));
export const html: CurriedTTL = (func = echo) => (...args) => func(htmlttl(...args));
export const xml: CurriedTTL = (func = echo) => (...args) => func(xmlttl(...args));