const VALUES   = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
const NUMERALS = ['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I'];
const SINGLE_VALUES = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
const VALID_REGEX = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

export function toRoman(num, options = {}) {
  if (!isValidNumber(num)) {
    throw new RangeError(`Expected an integer between 1 and 3999, got: ${num}`);
  }
  let result = '';
  let n = num;
  for (let i = 0; i < VALUES.length; i++) {
    while (n >= VALUES[i]) {
      result += NUMERALS[i];
      n -= VALUES[i];
    }
  }
  return options.lowercase ? result.toLowerCase() : result;
}

export function fromRoman(roman) {
  if (typeof roman !== 'string' || roman.trim() === '') {
    throw new TypeError(`Expected a non-empty string, got: ${typeof roman}`);
  }
  const upper = roman.trim().toUpperCase();
  if (!VALID_REGEX.test(upper)) {
    throw new RangeError(`Invalid Roman numeral: "${roman}"`);
  }
  let decimal = 0;
  for (let i = 0; i < upper.length; i++) {
    const cur  = SINGLE_VALUES[upper[i]];
    const next = SINGLE_VALUES[upper[i + 1]] || 0;
    decimal += cur < next ? -cur : cur;
  }
  return decimal;
}

export function isValidRoman(roman) {
  if (typeof roman !== 'string' || roman.trim() === '') return false;
  return VALID_REGEX.test(roman.trim().toUpperCase());
}

export function isValidNumber(num) {
  return typeof num === 'number' && Number.isInteger(num) && num >= 1 && num <= 3999;
}

export { VALUES, NUMERALS };
