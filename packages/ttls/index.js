import assert from 'node:assert';
import { css, html, xml } from './dist/index.js';

const validatedHtml = html`<div>${ '< '}</div><img src=x onerror=alert(1)//>`; // => <div>&lt; </div><img src=x />
console.log(validatedHtml);
assert.strictEqual(validatedHtml, '<div>&lt; </div><img src="x">');

const validatedCss = css`.${ '👍' } { color: red; }`; // => .hello { color: red; }
console.log(validatedCss);
assert.strictEqual(validatedCss, '.\\1F44D { color: red; }');