import clsx from 'clsx';

/**
 * @param {unknown} value
 * @returns {boolean}
 */
function isEmptyValue(value) {
  return value == null || value === '' || (Array.isArray(value) && value.length === 0);
}

/**
 * @param {Record<string, unknown>} attrs
 * @param {string} [prefix=' ']
 * @returns {string}
 */
export function spread(attrs, prefix = ' ') {
  if (attrs != null && typeof attrs === 'object') {
    const string = Object.entries(attrs).map(([key, value]) => {
      if (isEmptyValue(value)) return '';
      if (value === true) return key;
      return `${key}="${value}"`;
    }).filter(Boolean).join(' ').trim();
    return string ? `${prefix}${string}` : '';
  }

  return '';
}

/**
 * @param {string} key
 * @param {unknown} value
 * @param {string} [prefix=' ']
 * @returns {string}
 */
export function ifDefined(key, value, prefix = ' ') {
  return isEmptyValue(value) ? '' : `${prefix}${key}="${value}"`;
}

/**
 * @typedef {string | number | boolean | null | undefined | ClassValue[] | {[key: string]: any}} ClassValue
 */

/**
 * @param {...ClassValue} anys
 * @returns {string}
 */
export function toClassString(...anys) {
  if (!Array.isArray(anys) || anys.length === 0) return '';
  return clsx(...anys);
}

/**
 * @typedef {string | Record<string, string | number> | null | undefined} StyleValue
 */

/**
 * @param {...StyleValue} styles
 * @returns {string}
 */
export function toStyleString(...styles) {
  if (!styles || styles.length === 0) return '';
  
  const styleStrings = styles.reduce((acc, style) => {
    if (style == null) return acc;
    
    if (typeof style === 'string') {
      const trimmed = style.trim();
      if (trimmed) {
        acc.push(trimmed.endsWith(';') ? trimmed : `${trimmed};`);
      }
    } else if (typeof style === 'object') {
      const entries = Object.entries(style).filter(([, value]) => value != null);
      acc.push(...entries.map(([key, value]) => `${key}: ${value};`));
    }
    
    return acc;
  }, []);
  
  return styleStrings.join(' ').trim();
}

/**
 * @param {HTMLElement} element
 * @param {string} attribute
 * @param {string} type
 */
export function toggleBooleanAttribute(element, attribute, type) {
  let trueValue, falseValue;
  switch (attribute) {
    case 'aria-checked':
    case 'aria-pressed':
    case 'aria-expanded':
      trueValue = 'true';
      falseValue = 'false';
      break;
    case 'disabled':
    case 'hidden':
    case 'open':
      trueValue = '';
      falseValue = undefined;
      break;
    default:
      throw new Error(`Unsupported attribute: ${attribute}`);
  }

  const currentValue = element.getAttribute(attribute);
  if (falseValue == null) {
    if (currentValue === trueValue) {
      element.removeAttribute(attribute);
    }
    else element.setAttribute(attribute, trueValue);
  }
  else if (currentValue === trueValue) {
    element.setAttribute(attribute, falseValue);
  } else {
    element.setAttribute(attribute, trueValue);
  }
}
