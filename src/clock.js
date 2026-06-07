// Roman numeral clock — converts between time and Roman numeral notation.
// Zero minutes are represented with · (nulla).
// Both 12h and 24h modes supported; Roman numerals are inherently 12h (1–12).

import { toRoman, fromRoman } from './core.js';

const NULLA = '·'; // middle dot '·'

function parseTimeInput(input) {
  if (input instanceof Date) {
    return { hours: input.getHours(), minutes: input.getMinutes(), seconds: input.getSeconds() };
  }
  if (typeof input === 'string') {
    const m = input.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
    if (!m) throw new TypeError(`Expected "HH:MM" or "HH:MM:SS", got: "${input}"`);
    return { hours: +m[1], minutes: +m[2], seconds: m[3] ? +m[3] : 0 };
  }
  if (typeof input === 'object' && input !== null && 'hours' in input) {
    return { hours: input.hours ?? 0, minutes: input.minutes ?? 0, seconds: input.seconds ?? 0 };
  }
  throw new TypeError('Expected a Date, "HH:MM" string, or { hours, minutes } object');
}

export function toRomanTime(input, options = {}) {
  const { hours, minutes, seconds } = parseTimeInput(input);

  if (hours < 0 || hours > 23) throw new RangeError(`Hours must be 0–23, got: ${hours}`);
  if (minutes < 0 || minutes > 59) throw new RangeError(`Minutes must be 0–59, got: ${minutes}`);
  if (seconds < 0 || seconds > 59) throw new RangeError(`Seconds must be 0–59, got: ${seconds}`);

  // 12h mode maps hours to 1–12; 24h mode keeps 1–23 (0 → XII for midnight)
  const use12 = options.format === '12h';
  const hDisplay = use12 ? (hours % 12 || 12) : (hours === 0 ? 12 : hours);
  const hRoman = toRoman(hDisplay);
  const mRoman = minutes === 0 ? NULLA : toRoman(minutes);
  const sRoman = seconds === 0 ? NULLA : toRoman(seconds);

  let result;
  if (options.seconds) {
    result = `${hRoman}:${mRoman}:${sRoman}`;
  } else {
    result = `${hRoman}:${mRoman}`;
  }

  // Optional AM/PM suffix in Latin
  if (options.meridiem) {
    const suffix = hours < 12 ? ' AM' : ' PM'; // ante/post merīdiem
    result += suffix;
  }

  return options.lowercase ? result.toLowerCase() : result;
}

export function fromRomanTime(roman) {
  if (typeof roman !== 'string') throw new TypeError('Expected a string');

  const upper = roman.trim().toUpperCase().replace(/·/g, NULLA);
  const parts = upper.split(':');
  if (parts.length < 2 || parts.length > 3) {
    throw new TypeError(`Expected "H:M" or "H:M:S" format, got: "${roman}"`);
  }

  const parseRomanPart = (s, label) => {
    const clean = s.replace(' AM', '').replace(' PM', '').trim();
    if (clean === NULLA || clean === '·' || clean === 'N') return 0;
    return fromRoman(clean);
  };

  const hours   = parseRomanPart(parts[0], 'hours');
  const minutes = parseRomanPart(parts[1], 'minutes');
  const seconds = parts[2] ? parseRomanPart(parts[2], 'seconds') : 0;

  return {
    hours,
    minutes,
    seconds,
    formatted: `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}${seconds ? ':' + String(seconds).padStart(2, '0') : ''}`,
  };
}

export function nowInRoman(options = {}) {
  return toRomanTime(new Date(), options);
}
