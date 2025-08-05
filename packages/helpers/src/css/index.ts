export type Breakpoints = Record<string | number, string>;
export type BreakpointQuery = {
  value: string;
  query: string;
};

/**
 * Convert a map of breakpoints into a normalized format used in other functions.
 * Each breakpoint will have a value and a query string.
 */
export function normalizeBreakpoints(breakpoints: Breakpoints) {
  const keys = Object.keys(breakpoints);
  const values = Object.values(breakpoints);
  const queries = getQueryMinSizes(values);
  const result = keys.reduce((acc, key, i) => {
    acc[key] = {
      value: values[i],
      query: queries[i],
    };
    return acc;
  }, {} as Record<string, BreakpointQuery>);

  return result;
}

/**
 * Returns a query range string for the given start and end values.
 * If start is null, it will not include the lower bound.
 * If end is null, it will not include the upper bound.
 */
export function getQueryRange(start?: string | null, end?: string | null): string {
  return `(${start == null ? '' : `${start} <= `}width${end == null ? '' : ` < ${end}`})`;
}

/**
 * Returns the range (start and end) of a query.
 */
export function getQueryRanges(sizes: (string | null)[]): string[] {
  return sizes.map((size, i) => {
    const start = i === 0 ? undefined : sizes[i - 1];
    const end = size;
    return getQueryRange(start, end);
  });
}

/** 
 * Returns the min-width of a query.
 */
export function getQueryMinWidth(size: string | null): string {
  return `(min-width: ${size})`;
}

/**
 * Returns the min-width of a query.
 */
export function getQueryMinSizes(sizes: (string | null)[]): string[] {
  return sizes.map(size => getQueryMinWidth(size));
}

/**
 * Returns the whitespace configuration for CSS generation.
 */
export function getWhitespace(minified = false, offset = '') {
  return {
    indent: minified ? '' : `${offset}  `,
    sep: minified ? '' : ' ',
    eol: minified ? '' : '\n'
  };
}

/**
 * Generates a CSS variable name.
 * ```js
 * varName('one', 'two')
 * ```
 * will produce:
 * ```css
 * --one-two
 * ```
 */
export function varName(args: string | string[], join: string = '-'): string {
  return `--${(Array.isArray(args) ? args : [args]).join(join)}`;
}

/**
 * Generates a CSS property declaration.
 * ```js
 * declaration('my-property', 'value', true)
 * ```
 * will produce:
 * ```css
 * my-property: value;
 * ```
 */
export function declaration(property: string, value: unknown, minified = false) {
  return `${property}:${minified ? '' : ' '}${value};`;
}

export function declarations(properties: Record<string, unknown>, indent: string = '  ', minified = false): string {
  return Object.entries(properties)
    .map(([property, value]) => `${indent}${declaration(property, value, minified)}`)
    .join(minified ? '' : '\n');
}

/** 
 * Generates a CSS property declaration.
 * ```js
 * property('my-property', 'value', 'syntax', true)
 * ```
 * will produce:
 * ```css
 * @property --my-property {
 *   syntax: "syntax";
 *   inherits: true;
 *   initial-value: value;
 * }
 * ```
 */
export function property(name: string, value: unknown, syntax = '*', inherits = false, minified = false) {
  const { indent, sep, eol } = getWhitespace(minified);
  return `@property --${name} {${eol}${indent}syntax:${sep}"${syntax}";${eol}${indent}inherits:${sep}${inherits};${eol}${value != null ? `${indent}initial-value:${sep}${value};${eol}` : ''}}`;
}

/**
 * @deprecated - use `varName` width `declaration` instead.
 * Generates a CSS variable declaration.
 * ```js
 * variable('my-var', 'red')
 * ```
 * will produce:
 * ```css
 * --my-var: red;
 * ```
 */
export function variable(name: string, value: unknown, minified = false) {
  return declaration(name, value, minified);
}

/**
 * @deprecated - use `blockRule` instead.
 */
export function rule(selectors: string | string[], decls: Record<string, unknown>, offset = '', minified = false) {
  const { indent, sep, eol } = getWhitespace(minified, offset);
  const sels = Array.isArray(selectors) ? selectors.join(`,${sep}`) : selectors;
  const decs = declarations(decls, indent, minified);
  return `${offset}${sels}${sep}{${eol}${decs}${eol}${offset}}`;
}

/**
 * 
 * Generates a CSS rule with the provided selectors and declarations or nested blocks
 * ```js
 * blockRule('.my-class', { 'color': 'red', 'font-size': '16px' })
 * ```
 * will produce:
 * ```css
 * .my-class {
 *   color: red;
 *   font-size: 16px;
 * }
 * ```
 * 
 * Can also be used for nested block rules:
 * ```js
 * blockRule('.my-class', blockRule('.nested', Object.entries({ 'display': 'block' }).map(entry => declaration), '  '))
 * ```
 * will produce:
 * ```css
 * .my-class {
 *   .nested {
 *     display: block;
 *   }
 * }
 * ```
 */
export function blockRule(selectors: string | string[], rules: string | Record<string, unknown> = '', offset = '', minified = false) {
  const { indent, sep, eol } = getWhitespace(minified, offset);
  const sels = Array.isArray(selectors) ? selectors.join(`,${sep}`) : selectors;
  let decs: string;
  if (rules != null && typeof rules === 'object') {
    decs = declarations(rules, indent, minified);
  }
  else if (typeof rules === 'string') {
    decs = rules;
  }
  else throw new Error('`rules` must be "string | Record<string, unknown>');
  return `${offset}${sels}${sep}{${eol}${decs}${eol}${offset}}`;
}

/**
 * Generates a set of rules for a given property and values.
 * ```js
 * rules((value) => `.bc-${value}`, ['red', 'blue'], 'background-color')
 * ```
 * will produce:
 * ```css
 * .bc-red {
 *   background-color: red;
 * }
 * .bc-blue {
 *   background-color: blue;
 * }
 * ```
 */
export function rules(getSelectors: (value: string) => string, values: string[], property: string, offset = '', minified = false) {
  return values.map(value => rule(getSelectors(value), { [property]: value }, offset, minified)).join(minified ? '' : '\n\n');
}

/**
 * @deprecated - use "blockRule"
 * Generates a block at-rule with the provided rule, query, and rules.
 * ```js
 * blockAtRule('media', '(max-width: 600px)', '.d-flex { display: flex; }', '  ', false)
 * ```
 * will produce:
 * ```css
 * @media (max-width: 600px) {
 *   .d-flex {
 *     display: flex;
 *   }
 * }
 * ```
 */
export function blockAtRule(rule: string, block: string, offset = '', minified = false) {
  const { eol } = getWhitespace(minified, offset);
  return `${offset}@${rule} {${eol}${block}${eol}${offset}}`;
}

export type GetRules = (name: string, indent: string, minified: boolean) => string;
export type Rules = Record<string, string>;

/**
 * @deprecated - use `blockRule` instead.
 * Generates a container query block with the provided rules.
 * ```js
 * containers((name) => `.c-${name}`, {
 *   small: { query: '(min-width: 600px)' },
 * }, '  ', false)
 * ```
 * will produce:
 * ```css
 * \@container small {
 *   .c-small {
 *      display: block;
 *  }
 * }
 */
export function atRules(atRule: string, getRules: GetRules, rules: Rules, offset = '', minified = false) {
  const { indent } = getWhitespace(minified, offset);
  return Object.entries(rules).map(([name, rule]) => blockAtRule(atRule, getRules(name, indent, minified), offset, minified)).join(minified ? '' : '\n\n');
}
