// React hooks for Roman numeral conversion.
// Import: import { useRoman, useRomanClock } from '@tushar_rayamajhi/roman_converter/react'
// Requires React >=16.8.0 as a peer dependency.

import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { toRoman, fromRoman, isValidRoman, isValidNumber } from './core.js';
import { toRomanTime } from './clock.js';

/**
 * useRoman — stateful hook that keeps an integer value in sync with its Roman numeral.
 *
 * @param {number|string} initial  Starting value — integer (1–3999) or Roman numeral string.
 * @returns {{ integer, roman, isValid, set, setRoman, increment, decrement, reset }}
 *
 * @example
 *   const { roman, integer, increment, decrement } = useRoman(1);
 */
export function useRoman(initial = 1) {
  const startInt = useMemo(() => {
    if (typeof initial === 'string' && isValidRoman(initial)) return fromRoman(initial);
    if (isValidNumber(initial)) return initial;
    return 1;
  }, []);

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
 * useRomanClock — live Roman numeral clock that ticks every second.
 *
 * @param {{ format?: '12h'|'24h', seconds?: boolean, meridiem?: boolean, lowercase?: boolean }} options
 * @returns {{ time: string, hours: number, minutes: number, seconds: number }}
 *
 * @example
 *   const { time } = useRomanClock();
 *   // time => "XIV:XXX"
 */
export function useRomanClock(options = {}) {
  const optsRef = useRef(options);
  optsRef.current = options;

  const getSnapshot = () => {
    const now = new Date();
    return {
      time:    toRomanTime(now, optsRef.current),
      hours:   now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds(),
    };
  };

  const [state, setState] = useState(getSnapshot);

  useEffect(() => {
    const id = setInterval(() => setState(getSnapshot()), 1000);
    return () => clearInterval(id);
  }, []);

  return state;
}
