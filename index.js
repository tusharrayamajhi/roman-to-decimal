export { toRoman, fromRoman, isValidRoman, isValidNumber } from './src/core.js';
export { add, subtract, multiply, divide } from './src/arithmetic.js';
export { compare, range, sort, batchToRoman, batchFromRoman, breakdown } from './src/utils.js';

// Backward-compatible aliases
export { toRoman as IntToRoman, fromRoman as romanToInt, isValidNumber as isValidInteger } from './src/core.js';

import { toRoman, fromRoman, isValidRoman, isValidNumber } from './src/core.js';
import { add, subtract, multiply, divide } from './src/arithmetic.js';
import { compare, range, sort, batchToRoman, batchFromRoman, breakdown } from './src/utils.js';

export default {
  // Core
  toRoman,
  fromRoman,
  isValidRoman,
  isValidNumber,
  // Arithmetic
  add,
  subtract,
  multiply,
  divide,
  // Utilities
  compare,
  range,
  sort,
  batchToRoman,
  batchFromRoman,
  breakdown,
  // Backward-compatible aliases
  IntToRoman:    toRoman,
  romanToInt:    fromRoman,
  isValidInteger: isValidNumber,
};
