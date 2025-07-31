import { describe, it, vi } from 'vitest'
import { html } from './index.js';

describe('html', () => {
  it('should handle purifying HTML', ({ expect }) => {
    const result = html`<div>test</div>`;
    expect(result).toBe('<div>test</div>');
  });
});
