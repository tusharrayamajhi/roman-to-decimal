// Extended Roman numerals — supports 1 to 3,999,999
// Uses parenthetical vinculum notation: (V)=5k (X)=10k (C)=100k (M)=1,000,000
// e.g. 1,999,999 → (M)(CM)(XC)IX... → (M)(CM)(XC)(IX)CMXCIX

const EXT_VALUES = [
  1000000, 900000, 500000, 400000,
  100000,   90000,  50000,  40000,
   10000,    9000,   5000,   4000,
    1000,     900,    500,    400,
     100,      90,     50,     40,
      10,       9,      5,      4, 1,
];

const EXT_NUMERALS = [
  '(M)', '(CM)', '(D)', '(CD)',
  '(C)', '(XC)', '(L)', '(XL)',
  '(X)', '(IX)', '(V)', '(IV)',
  'M', 'CM', 'D', 'CD',
  'C', 'XC', 'L', 'XL',
  'X', 'IX', 'V', 'IV', 'I',
];

export function toExtendedRoman(num, options = {}) {
  if (typeof num !== 'number' || !Number.isInteger(num) || num < 1 || num > 3_999_999) {
    throw new RangeError(`Expected an integer between 1 and 3,999,999, got: ${num}`);
  }
  let result = '';
  let n = num;
  for (let i = 0; i < EXT_VALUES.length; i++) {
    while (n >= EXT_VALUES[i]) {
      result += EXT_NUMERALS[i];
      n -= EXT_VALUES[i];
    }
  }
  return options.lowercase ? result.toLowerCase() : result;
}

export function fromExtendedRoman(roman) {
  if (typeof roman !== 'string' || roman.trim() === '') {
    throw new TypeError(`Expected a non-empty string, got: ${typeof roman}`);
  }
  const upper = roman.trim().toUpperCase();
  const valMap = new Map(EXT_NUMERALS.map((n, i) => [n, EXT_VALUES[i]]));

  let i = 0;
  let total = 0;

  while (i < upper.length) {
    if (upper[i] === '(') {
      const close = upper.indexOf(')', i);
      if (close === -1) throw new RangeError(`Unmatched '(' in: "${roman}"`);
      const token = upper.slice(i, close + 1);
      const val = valMap.get(token);
      if (val === undefined) throw new RangeError(`Unknown extended numeral token: "${token}"`);
      total += val;
      i = close + 1;
    } else {
      const two = upper.slice(i, i + 2);
      const one = upper[i];
      if (valMap.has(two)) { total += valMap.get(two); i += 2; }
      else if (valMap.has(one)) { total += valMap.get(one); i += 1; }
      else throw new RangeError(`Unknown numeral: "${one}" in "${roman}"`);
    }
  }

  if (total < 1 || total > 3_999_999) {
    throw new RangeError(`Result ${total} is outside the valid range (1–3,999,999)`);
  }
  return total;
}

export function isValidExtendedRoman(roman) {
  try { fromExtendedRoman(roman); return true; } catch { return false; }
}

export function isValidExtendedNumber(num) {
  return typeof num === 'number' && Number.isInteger(num) && num >= 1 && num <= 3_999_999;
}
