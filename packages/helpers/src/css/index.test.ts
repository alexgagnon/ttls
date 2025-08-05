import { describe, it } from 'vitest';
import { varName, rules, rule, blockAtRule, property, atRules, normalizeBreakpoints, blockRule } from './index.js';

describe('css', () => {
  it.for([
    [['one'], '--one'],
    [[['one', 'two']], '--one-two'],
    [[['one', 'two', 'three']], '--one-two-three'],
    [[['one', 'two'], '_'], '--one_two'],
  ])('%s should generate %s', ([input, output], { expect }) => {
    const result = varName(input[0], input[1] as string);
    expect(result).toBe(output);
  });

  it('should generate a single rule', ({ expect }) => {
    const result = blockRule('.my-class', { 'color': 'red', 'font-size': '16px' });

    expect(result).toBe(`.my-class {
  color: red;
  font-size: 16px;
}`)
  });
  
  it.skip('should generate a nested block rule', ({ expect }) => {
    const result = blockRule('@media (max-width: 600px)', blockRule('.d-flex', { display: 'flex' }, '    '));

    expect(result).toBe(`@media (max-width: 600px) {
  .d-flex {
    display: flex;
  }
}`);
  })

  it('should generate container queries', ({ expect }) => {
    const result = Object.entries({sm: 'sm (min-width: 576px)', md: 'md (min-width: 768px)'}).map(([name, query]) => {
      return blockRule(`@container ${query}`, rules((value) => `.d-${value}-${name}`, ['hidden', 'initial'], 'display', '  '));
    }).join('\n\n');

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


  it('should generate a property', ({ expect }) => {
    const result = property('my-property', 'value', 'syntax', true);

    expect(result).toBe(`@property --my-property {
  syntax: "syntax";
  inherits: true;
  initial-value: value;
}`);
  });

  it('should generate correct breakpoints', ({ expect }) => {
    const breakpoints = {
      xs: '576px',
      sm: '768px',
      md: '992px',
      lg: '1200px',
      xl: '1400px'
    };

    const result = normalizeBreakpoints(breakpoints);

    console.log(result);

    expect(result).toEqual({
      xs: { value: '576px', query: '(min-width: 576px)' },
      sm: { value: '768px', query: '(min-width: 768px)' },
      md: { value: '992px', query: '(min-width: 992px)' },
      lg: { value: '1200px', query: '(min-width: 1200px)' },
      xl: { value: '1400px', query: '(min-width: 1400px)' }
    });
  });
});
