import { toRoman, fromRoman, isValidRoman, isValidNumber, VALUES, NUMERALS } from './core.js';

function resolveValue(x) {
  if (typeof x === 'number') return x;
  return fromRoman(x);
}

export function compare(a, b) {
  const av = resolveValue(a);
  const bv = resolveValue(b);
  if (av < bv) return -1;
  if (av > bv) return  1;
  return 0;
}

export function range(start, end, step = 1) {
  if (!Number.isInteger(start) || !Number.isInteger(end)) {
    throw new TypeError('start and end must be integers');
  }
  if (!Number.isInteger(step) || step === 0) {
    throw new TypeError('step must be a non-zero integer');
  }
  const result = [];
  if (step > 0) {
    for (let i = start; i <= end && i <= 3999; i += step) {
      if (i >= 1) result.push(toRoman(i));
    }
  } else {
    for (let i = start; i >= end && i >= 1; i += step) {
      if (i <= 3999) result.push(toRoman(i));
    }
  }
  return result;
}

export function sort(arr, direction = 'asc') {
  if (!Array.isArray(arr)) throw new TypeError('Expected an array');
  const sorted = [...arr].sort((a, b) => resolveValue(a) - resolveValue(b));
  return direction === 'desc' ? sorted.reverse() : sorted;
}

export function batchToRoman(nums, options = {}) {
  if (!Array.isArray(nums)) throw new TypeError('Expected an array of numbers');
  return nums.map(n => toRoman(n, options));
}

export function batchFromRoman(romans) {
  if (!Array.isArray(romans)) throw new TypeError('Expected an array of strings');
  return romans.map(r => fromRoman(r));
}

export function breakdown(roman) {
  if (!isValidRoman(roman)) {
    throw new RangeError(`Invalid Roman numeral: "${roman}"`);
  }
  let remaining = fromRoman(roman);
  const parts = [];
  for (let i = 0; i < VALUES.length; i++) {
    while (remaining >= VALUES[i]) {
      parts.push({ numeral: NUMERALS[i], value: VALUES[i] });
      remaining -= VALUES[i];
    }
  }
  return parts;
}
