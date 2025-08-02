import clsx from 'clsx';

function isEmptyValue(value: unknown): boolean {
  return value == null || value === '' || (Array.isArray(value) && value.length === 0);
}

export function spread(attrs: Record<string, unknown>, prefix = ' '): string {
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

export function ifDefined(key: string, value: unknown, prefix = ' '): string {
  return isEmptyValue(value) ? '' : `${prefix}${key}="${value}"`;
}

export type ClassValue = string | number | boolean | null | undefined | ClassValue[] | { [key: string]: any; };

export function toClassString(...anys: ClassValue[]): string {
  if (!Array.isArray(anys) || anys.length === 0) return '';
  return clsx(...anys);
}

export type StyleValue = string | Record<string, string | number> | null | undefined;

export function toStyleString(...styles: StyleValue[]): string {
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
  }, [] as string[]);
  
  return styleStrings.join(' ').trim();
}

// TODO: confirm if this is "unique enough"
export function getUniqueId(prefix: string = ''): string {
  return `${prefix ? `${prefix}-` : ''}${Date.now().toString(36)}`;
}

// TODO
// export function toggleBooleanAttribute(element: HTMLElement, attribute: string, type: string) {
//   let trueValue, falseValue;
//   switch (attribute) {
//     case 'aria-checked':
//     case 'aria-pressed':
//     case 'aria-expanded':
//       trueValue = 'true';
//       falseValue = 'false';
//       break;
//     case 'disabled':
//     case 'hidden':
//     case 'open':
//       trueValue = '';
//       falseValue = undefined;
//       break;
//     default:
//       throw new Error(`Unsupported attribute: ${attribute}`);
//   }

//   const currentValue = element.getAttribute(attribute);
//   if (falseValue == null) {
//     if (currentValue === trueValue) {
//       element.removeAttribute(attribute);
//     }
//     else element.setAttribute(attribute, trueValue);
//   }
//   else if (currentValue === trueValue) {
//     element.setAttribute(attribute, falseValue);
//   } else {
//     element.setAttribute(attribute, trueValue);
//   }
// }
