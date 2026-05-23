import { spread, ifDefined, toClassString, toStyleString, componentize } from './index.js';
import { html } from 'ttls/html';
import { describe, it } from 'vitest';

describe('html', () => {
  it('should produce valid HTML', ({ expect}) => {
    const result = `<div${spread({ id: 'test', class: 'example' })}>
      <span${ifDefined('title', 'Hello World')}${ifDefined('uhoh', undefined)}>Hello</span>
      <span class="${toClassString('class1', 'class2')}">World</span>
      <span style="${toStyleString({ color: 'red', 'font-size': '16px' })}">!</span>
    </div>`;
    const expected = `<div id="test" class="example">
      <span title="Hello World">Hello</span>
      <span class="class1 class2">World</span>
      <span style="color: red; font-size: 16px;">!</span>
    </div>`;
    expect(result).toBe(expected);
  })

  it('should create a component', ({ expect }) => {
    const render = componentize('Content', 'div', { id: 'comp' }, {});
    const result = render();
    const expected = `<div id="comp">Content</div>`;
    expect(result).toBe(expected);
  });

  it('should support nested components', ({ expect }) => {
    const Alert = componentize('Child Content', 'span', { class: 'child' }, {});
    const parentRender = html`<div id="parent">${Alert()}</div>`;
    const expected = `<div id="parent"><span class="child">Child Content</span></div>`;
    expect(parentRender).toBe(expected);
  });
});