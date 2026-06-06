import { toRoman, fromRoman, isValidRoman, isValidNumber } from './core.js';

function parseInput(x) {
  if (typeof x === 'string' && isValidRoman(x)) return fromRoman(x);
  if (typeof x === 'number') {
    if (!isValidNumber(x)) throw new RangeError(`Value out of range (1–3999): ${x}`);
    return x;
  }
  throw new TypeError(`Expected a Roman numeral string or integer, got: ${JSON.stringify(x)}`);
}

function guardResult(n, op) {
  if (!isValidNumber(n)) {
    throw new RangeError(`${op} result ${n} is outside the valid range (1–3999)`);
  }
  return n;
}

export function add(a, b, options = {}) {
  return toRoman(guardResult(parseInput(a) + parseInput(b), 'Addition'), options);
}

export function subtract(a, b, options = {}) {
  return toRoman(guardResult(parseInput(a) - parseInput(b), 'Subtraction'), options);
}

export function multiply(a, b, options = {}) {
  return toRoman(guardResult(parseInput(a) * parseInput(b), 'Multiplication'), options);
}

export function divide(a, b, options = {}) {
  const divisor = parseInput(b);
  if (divisor === 0) throw new RangeError('Division by zero');
  return toRoman(guardResult(Math.floor(parseInput(a) / divisor), 'Division'), options);
}
