import { describe, it } from 'vitest';
import { rules, rule, blockAtRule, property, atRules } from './index.js';

describe('css', () => {
  it('should generate container queries', ({ expect }) => {
    const result = atRules(
      'container',
      (name) => rules((value) => `.d-${value}-${name}`, ['hidden', 'initial'], 'display', '  '),
      {
        sm: 'sm (min-width: 576px)',
        md: 'md (min-width: 768px)'
      }
    );

    expect(result).toBe(`@container sm (min-width: 576px) {
  .d-hidden-sm {
    display: hidden;
  }

  .d-initial-sm {
    display: initial;
  }
}

@container md (min-width: 768px) {
  .d-hidden-md {
    display: hidden;
  }

  .d-initial-md {
    display: initial;
  }
}`);

  });

  it('should generate rules for properties', ({ expect }) => {
    const result = rules(
      (value) => `.bc-${value}`,
      ['red', 'blue'],
      'background-color'
    );

    expect(result).toEqual(`.bc-red {
  background-color: red;
}

.bc-blue {
  background-color: blue;
}`);
  });

  it('should generate a single rule', ({ expect }) => {
    const result = rule('.my-class', { 'color': 'red', 'font-size': '16px' });

    expect(result).toBe(`.my-class {
  color: red;
  font-size: 16px;
}`)
  });
  
  it('should generate a block at-rule', ({ expect }) => {
    const result = blockAtRule('media', '(max-width: 600px)', rule('.d-flex', { display: 'flex' }, '  '));

    expect(result).toBe(`@media (max-width: 600px) {
  .d-flex {
    display: flex;
  }
}`);
  })

  it('should generate a property', ({ expect }) => {
    const result = property('my-property', 'value', 'syntax', true);

    expect(result).toBe(`@property --my-property {
  syntax: "syntax";
  inherits: true;
  initial-value: value;
}`);
  });
});
