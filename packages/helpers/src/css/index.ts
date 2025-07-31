export function normalizeBreakpoints(breakpoints) {
  const keys = Object.keys(breakpoints);
  const values = Object.values(breakpoints);
  const queries = getQueryMinSizes(values);
  const result = keys.reduce((acc, key, i) => {
    acc[key] = {
      value: values[i],
      query: queries[i],
    };
    return acc;
  }, {});

  return result;
}

/**
 * Returns the query ranges for the given breakpoints.
 */
export function getBreakpointQueryRanges(breakpoints) {
  return getQueryRanges(breakpoints.map(b => b.width));
}

/**
 * Returns a query range string for the given start and end values.
 * If start is null, it will not include the lower bound.
 * If end is null, it will not include the upper bound.
 */
export function getQueryRange(start, end) {
  return `(${start == null ? '' : `${start} <= `}width${end == null ? '' : ` < ${end}`})`;
}

/**
 * Returns the range (start and end) of a query.
 */
export function getQueryRanges(sizes) {
  return sizes.map((size, i) => {
    const start = i === 0 ? undefined : sizes[i - 1];
    const end = size;
    return getQueryRange(start, end);
  });
}

/** 
 * Returns the min-width of a query.
 */
export function getQueryMinWidth(size) {
  return `(min-width: ${size})`;
}

/**
 * Returns the min-width of a query.
 */
export function getQueryMinSizes(sizes) {
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
 * Generates a CSS property declaration.
 * ```js
 * declaration('my-property', 'value', true)
 * ```
 * will produce:
 * ```css
 * my-property: value;
 * ```
 */
export function declaration(property, value, minified = false) {
  return `${property}:${minified ? '' : ' '}${value};`;
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
export function property(name, value, syntax = '*', inherits = false, minified = false) {
  const { indent, sep, eol } = getWhitespace(minified);
  return `@property --${name} {${eol}${indent}syntax:${sep}"${syntax}";${eol}${indent}inherits:${sep}${inherits};${eol}${value != null ? `${indent}initial-value:${sep}${value};${eol}` : ''}}`;
}

/**
 * Generates a CSS variable declaration.
 * ```js
 * variable('my-var', 'red')
 * ```
 * will produce:
 * ```css
 * --my-var: red;
 * ```
 */
export function variable(name, value, minified = false) {
  return declaration(`--${name}`, value, minified);
}

/**
 * Generates a CSS rule with the provided selectors and declarations.
 * ```js
 * rule('.my-class', { 'color': 'red', 'font-size': '16px' })
 * ```
 * will produce:
 * ```css
 * .my-class {
 *   color: red;
 *   font-size: 16px;
 * }
 * ```
 */
export function rule(selectors, declarations, offset = '', minified = false) {
  const { indent, sep, eol } = getWhitespace(minified, offset);
  const sels = Array.isArray(selectors) ? selectors.join(`,${sep}`) : selectors;
  const decs = Object.entries(declarations).map(([property, value]) => declaration(property, value, minified)).map(dec => `${indent}${dec}`).join(eol);
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
export function rules(getSelectors, values, property, offset = '', minified = false) {
  return values.map(value => rule(getSelectors(value), { [property]: value }, offset, minified)).join(minified ? '' : '\n\n');
}

/**
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
export function blockAtRule(rule, query, rules, offset = '', minified = false) {
  const { indent, eol } = getWhitespace(minified, offset);
  return `${offset}@${rule} ${query} {${eol}${rules}${eol}${offset}}`;
}

/**
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
export function containers(getRules, queries, offset = '', minified = false) {
  const { indent } = getWhitespace(minified, offset);
  return Object.entries(queries).map(([name, { query }]) => blockAtRule('container', query, getRules(name, indent, minified), offset, minified)).join(minified ? '' : '\n\n');
}