// Legacy entry point — kept for backward compatibility.
// Import from the package root (index.js) for the full v2 API.
export { default, toRoman, fromRoman, isValidRoman, isValidNumber,
         IntToRoman, romanToInt, isValidInteger,
         add, subtract, multiply, divide,
         compare, range, sort, batchToRoman, batchFromRoman, breakdown }
  from './index.js';
