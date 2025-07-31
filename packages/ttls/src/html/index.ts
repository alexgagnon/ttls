import escape from 'escape-html';
import createDOMPurify, { type WindowLike } from 'dompurify';
import type { DOMWindow } from 'jsdom';
import curry from '@ttls/raw/curried/index.js';

let window: Window | DOMWindow = globalThis.window;

// If running in Node.js, create a JSDOM window
if (process?.release?.name === 'node') {
  const { JSDOM } = await import('jsdom');
  window = new JSDOM('').window;
}

const DOMPurify = createDOMPurify(window as WindowLike);

// TODO: Add configuration options for DOMPurify
const sanitizeConfig = {};

export const html = curry({
  preFuncs: escape,
  postFuncs: (input) => DOMPurify.sanitize(input, sanitizeConfig)
});