import { describe, it, vi } from 'vitest'
import { html, SafeHtml } from './index.js';

describe('html', () => {
  it('should handle purifying HTML', ({ expect }) => {
    const result = html`<div>test</div>`;
    expect(result).toBeInstanceOf(SafeHtml);
    expect(result.value).toBe('<div>test</div>');
  });

  it('should escape HTML special characters', ({ expect }) => {
    const result = html`<script>alert('xss')</script>`;
    expect(result.value).toBe('');
  });

  it('should sanitize malicious HTML', ({ expect }) => {
    const result = html`<img src="x" onerror="alert('xss')">`;
    expect(result.value).toBe('<img src="x">');
  });

  it('should escape HTML special characters from strings in interpolated values', ({ expect }) => {
    const name = '<b>John</b>';
    const result = html`Hello, ${name}!`;
    expect(result.value).toBe('Hello, &lt;b&gt;John&lt;/b&gt;!');
  });

  it('should handle empty input', ({ expect }) => {
    const result = html``;
    expect(result.value).toBe('');
  });

  it('should handle non-string inputs', ({ expect }) => {
    const result = html`${123} and ${true}`;
    expect(result.value).toBe('123 and true');
  });

  it('should handle nested template literals', ({ expect }) => {
    const inner = html`<span>inner</span>`;
    const result = html`<div>${inner}</div>`;
    expect(result.value).toBe('<div><span>inner</span></div>');
  });
});
