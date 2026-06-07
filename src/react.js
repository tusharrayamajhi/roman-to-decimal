// React hook for Roman numeral conversion.
// Import path: @tushar_rayamajhi/roman_converter/react
//
// Requires React >=16.8.0 as a peer dependency.
// Usage:
//   import { useRoman } from '@tushar_rayamajhi/roman_converter/react';
//   const { roman, integer, set, increment, decrement } = useRoman(42);

import { useState, useCallback, useMemo } from 'react';
import { toRoman, fromRoman, isValidRoman, isValidNumber } from './core.js';

/**
 * useRoman — stateful hook that keeps an integer value in sync with its Roman numeral.
 *
 * @param {number|string} initial  Starting value — integer (1–3999) or Roman numeral string.
 * @returns {{ integer, roman, isValid, set, setRoman, increment, decrement, reset }}
 */
export function useRoman(initial = 1) {
  const startInt = typeof initial === 'string' && isValidRoman(initial)
    ? fromRoman(initial)
    : isValidNumber(initial) ? initial : 1;

  const [integer, setInteger] = useState(startInt);

  const roman   = useMemo(() => isValidNumber(integer) ? toRoman(integer) : '', [integer]);
  const isValid = isValidNumber(integer);

  const set = useCallback((value) => {
    if (typeof value === 'string' && isValidRoman(value)) {
      setInteger(fromRoman(value));
    } else if (typeof value === 'number' && isValidNumber(value)) {
      setInteger(value);
    } else {
      throw new RangeError(`useRoman.set: expected integer 1–3999 or valid Roman numeral, got: ${value}`);
    }
  }, []);

  const setRoman = useCallback((romanStr) => {
    if (!isValidRoman(romanStr)) throw new RangeError(`Invalid Roman numeral: "${romanStr}"`);
    setInteger(fromRoman(romanStr));
  }, []);

  const increment = useCallback((step = 1) => {
    setInteger(prev => Math.min(prev + step, 3999));
  }, []);

  const decrement = useCallback((step = 1) => {
    setInteger(prev => Math.max(prev - step, 1));
  }, []);

  const reset = useCallback(() => setInteger(startInt), [startInt]);

  return { integer, roman, isValid, set, setRoman, increment, decrement, reset };
}

/**
 * useRomanClock — live Roman numeral clock, updates every second.
 *
 * @param {{ format?: '12h'|'24h', seconds?: boolean, meridiem?: boolean }} options
 * @returns {{ time: string, hours: number, minutes: number, seconds: number }}
 */
export function useRomanClock(options = {}) {
  // Lazy import of clock module to avoid circular deps at parse time
  const [time, setTime] = useState(() => {
    const { toRomanTime } = require('./clock.js');
    return toRomanTime(new Date(), options);
  });
  const [raw, setRaw] = useState(() => {
    const now = new Date();
    return { hours: now.getHours(), minutes: now.getMinutes(), seconds: now.getSeconds() };
  });

  // useEffect is not imported here to keep this file React-version-agnostic;
  // consumers must wrap this in a component.
  // Provide a startClock() helper instead.
  const startClock = useCallback(() => {
    const tick = async () => {
      const { toRomanTime } = await import('./clock.js');
      const now = new Date();
      setTime(toRomanTime(now, options));
      setRaw({ hours: now.getHours(), minutes: now.getMinutes(), seconds: now.getSeconds() });
    };
    tick();
    return setInterval(tick, 1000);
  }, []);

  return { time, ...raw, startClock };
}
