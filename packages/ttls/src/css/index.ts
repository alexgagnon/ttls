import cssesc from 'cssesc';
import { transform } from 'lightningcss';
import curry from '@ttls/raw/curried/index.js';

export const css = curry({
  preFuncs: cssesc,
  postFuncs: (input) => {
    try {
      transform({
        filename: '',
        code: Buffer.from(input),
      });
    } catch (error) {
      throw new Error(`Invalid CSS: ${error instanceof Error ? error.message : String(error)}`);
    }
    return input;
  }
});