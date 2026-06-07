// ─── Shared options ───────────────────────────────────────────────────────────

export interface ToRomanOptions {
  /** Output the Roman numeral in lowercase. Default: false */
  lowercase?: boolean;
}

// ─── Core ─────────────────────────────────────────────────────────────────────

export function toRoman(num: number, options?: ToRomanOptions): string;
export function fromRoman(roman: string): number;
export function isValidRoman(roman: string): boolean;
export function isValidNumber(num: number): boolean;

// ─── Arithmetic ───────────────────────────────────────────────────────────────

export function add(a: number | string, b: number | string, options?: ToRomanOptions): string;
export function subtract(a: number | string, b: number | string, options?: ToRomanOptions): string;
export function multiply(a: number | string, b: number | string, options?: ToRomanOptions): string;
export function divide(a: number | string, b: number | string, options?: ToRomanOptions): string;

// ─── Utilities ────────────────────────────────────────────────────────────────

export interface BreakdownPart {
  numeral: string;
  value: number;
}

export function compare(a: number | string, b: number | string): -1 | 0 | 1;
export function range(start: number, end: number, step?: number): string[];
export function sort(arr: Array<number | string>, direction?: 'asc' | 'desc'): Array<number | string>;
export function batchToRoman(nums: number[], options?: ToRomanOptions): string[];
export function batchFromRoman(romans: string[]): number[];
export function breakdown(roman: string): BreakdownPart[];

// ─── Extended numerals (1 – 3,999,999) ───────────────────────────────────────

export function toExtendedRoman(num: number, options?: ToRomanOptions): string;
export function fromExtendedRoman(roman: string): number;
export function isValidExtendedRoman(roman: string): boolean;
export function isValidExtendedNumber(num: number): boolean;

// ─── Clock / Time ─────────────────────────────────────────────────────────────

export interface RomanTimeOptions {
  /** '12h' maps hours to 1–12; '24h' (default) keeps 1–23. */
  format?: '12h' | '24h';
  /** Include seconds in the output. Default: false */
  seconds?: boolean;
  /** Append AM/PM suffix. Default: false */
  meridiem?: boolean;
  lowercase?: boolean;
}

export interface TimeObject {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface ParsedTime {
  hours: number;
  minutes: number;
  seconds: number;
  /** Zero-padded "HH:MM" or "HH:MM:SS" string */
  formatted: string;
}

export function toRomanTime(input: Date | string | TimeObject, options?: RomanTimeOptions): string;
export function fromRomanTime(roman: string): ParsedTime;
export function nowInRoman(options?: RomanTimeOptions): string;

// ─── Fractions (uncia system) ─────────────────────────────────────────────────

export interface UnciaEntry {
  twelfths: number;
  symbol: string;
  name: string;
  decimal: number;
}

export function toUncia(fraction: number): string;
export function fromUncia(symbol: string): number;
export function unciaInfo(symbol: string): UnciaEntry;
export function isValidUncia(symbol: string): boolean;
export function listUncia(): UnciaEntry[];

// ─── Latin words ──────────────────────────────────────────────────────────────

export function toWords(num: number): string;
export function fromWords(words: string): number;

// ─── Backward-compatible aliases ──────────────────────────────────────────────

export { toRoman as IntToRoman };
export { fromRoman as romanToInt };
export { isValidNumber as isValidInteger };

// ─── Default export ───────────────────────────────────────────────────────────

declare const converter: {
  toRoman: typeof toRoman;
  fromRoman: typeof fromRoman;
  isValidRoman: typeof isValidRoman;
  isValidNumber: typeof isValidNumber;
  add: typeof add;
  subtract: typeof subtract;
  multiply: typeof multiply;
  divide: typeof divide;
  compare: typeof compare;
  range: typeof range;
  sort: typeof sort;
  batchToRoman: typeof batchToRoman;
  batchFromRoman: typeof batchFromRoman;
  breakdown: typeof breakdown;
  toExtendedRoman: typeof toExtendedRoman;
  fromExtendedRoman: typeof fromExtendedRoman;
  isValidExtendedRoman: typeof isValidExtendedRoman;
  isValidExtendedNumber: typeof isValidExtendedNumber;
  toRomanTime: typeof toRomanTime;
  fromRomanTime: typeof fromRomanTime;
  nowInRoman: typeof nowInRoman;
  toUncia: typeof toUncia;
  fromUncia: typeof fromUncia;
  unciaInfo: typeof unciaInfo;
  isValidUncia: typeof isValidUncia;
  listUncia: typeof listUncia;
  toWords: typeof toWords;
  fromWords: typeof fromWords;
  /** @deprecated Use toRoman() */
  IntToRoman: typeof toRoman;
  /** @deprecated Use fromRoman() */
  romanToInt: typeof fromRoman;
  /** @deprecated Use isValidNumber() */
  isValidInteger: typeof isValidNumber;
};

export default converter;
