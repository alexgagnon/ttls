import escape from 'escape-html';
import createDOMPurify, { type WindowLike } from 'dompurify';
import type { DOMWindow } from 'jsdom';
import curry from 'ttls-raw/curried/index.js';

let window: Window | DOMWindow = globalThis.window;

// If running in Node.js, create a JSDOM window
if (process?.release?.name === 'node') {
  const { JSDOM } = await import('jsdom');
  window = new JSDOM('').window;
}

const DOMPurify = createDOMPurify(window as WindowLike);

// TODO: Add configuration options for DOMPurify
const sanitizeConfig = {};

// Marker used to identify pre-sanitized SafeHtml content when stringified
const SAFE_MARKER = '\x00SAFE_HTML\x00';

/** Wrapper class to mark HTML as already sanitized (safe for nesting) */
export class SafeHtml extends String {
  constructor(value: string) {
    super(SAFE_MARKER + value + SAFE_MARKER);
  }
  /** Get the actual HTML value without markers */
  get value(): string {
    const str = super.toString();
    return str.slice(SAFE_MARKER.length, -SAFE_MARKER.length);
  }
  /** Returns the clean HTML value */
  toHTML(): string { return this.value; }
  toJSON(): string { return this.value; }
}

/** Escape HTML unless it's marked as already safe */
function safeEscape(value: string): string {
  if (value.startsWith(SAFE_MARKER) && value.endsWith(SAFE_MARKER)) {
    // Strip markers and return the pre-sanitized content as-is
    return value.slice(SAFE_MARKER.length, -SAFE_MARKER.length);
  }
  return escape(value);
}

const htmlTtl = curry({
  preFuncs: safeEscape,
  postFuncs: (input) => DOMPurify.sanitize(input, sanitizeConfig)
});

/** Tagged template literal for safe HTML with support for nesting */
export const html = (strings: TemplateStringsArray, ...values: unknown[]): SafeHtml => {
  return new SafeHtml(htmlTtl(strings, ...values));
};