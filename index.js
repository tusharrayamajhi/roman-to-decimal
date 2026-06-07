// ─── Core ─────────────────────────────────────────────────────────────────────
export { toRoman, fromRoman, isValidRoman, isValidNumber } from './src/core.js';

// ─── Arithmetic ───────────────────────────────────────────────────────────────
export { add, subtract, multiply, divide } from './src/arithmetic.js';

// ─── Utilities ────────────────────────────────────────────────────────────────
export { compare, range, sort, batchToRoman, batchFromRoman, breakdown } from './src/utils.js';

// ─── Extended numerals (1 – 3,999,999) ───────────────────────────────────────
export { toExtendedRoman, fromExtendedRoman, isValidExtendedRoman, isValidExtendedNumber } from './src/extended.js';

// ─── Clock / Time ─────────────────────────────────────────────────────────────
export { toRomanTime, fromRomanTime, nowInRoman } from './src/clock.js';

// ─── Fractions (uncia system) ─────────────────────────────────────────────────
export { toUncia, fromUncia, unciaInfo, isValidUncia, listUncia } from './src/fractions.js';

// ─── Latin words ──────────────────────────────────────────────────────────────
export { toWords, fromWords } from './src/words.js';

// ─── Backward-compatible aliases ──────────────────────────────────────────────
export { toRoman as IntToRoman, fromRoman as romanToInt, isValidNumber as isValidInteger } from './src/core.js';

// ─── Default export (all functions on one object) ─────────────────────────────
import { toRoman, fromRoman, isValidRoman, isValidNumber } from './src/core.js';
import { add, subtract, multiply, divide } from './src/arithmetic.js';
import { compare, range, sort, batchToRoman, batchFromRoman, breakdown } from './src/utils.js';
import { toExtendedRoman, fromExtendedRoman, isValidExtendedRoman, isValidExtendedNumber } from './src/extended.js';
import { toRomanTime, fromRomanTime, nowInRoman } from './src/clock.js';
import { toUncia, fromUncia, unciaInfo, isValidUncia, listUncia } from './src/fractions.js';
import { toWords, fromWords } from './src/words.js';

export default {
  // Core
  toRoman, fromRoman, isValidRoman, isValidNumber,
  // Arithmetic
  add, subtract, multiply, divide,
  // Utilities
  compare, range, sort, batchToRoman, batchFromRoman, breakdown,
  // Extended
  toExtendedRoman, fromExtendedRoman, isValidExtendedRoman, isValidExtendedNumber,
  // Clock
  toRomanTime, fromRomanTime, nowInRoman,
  // Fractions
  toUncia, fromUncia, unciaInfo, isValidUncia, listUncia,
  // Latin words
  toWords, fromWords,
  // Backward-compatible aliases
  IntToRoman: toRoman,
  romanToInt: fromRoman,
  isValidInteger: isValidNumber,
};
