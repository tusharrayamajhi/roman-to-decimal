export interface ToRomanOptions {
  /** Output the Roman numeral in lowercase. Default: false */
  lowercase?: boolean;
}

export interface BreakdownPart {
  /** The Roman symbol(s) representing this component (e.g. "CM", "X") */
  numeral: string;
  /** The integer value of this component */
  value: number;
}

// ─── Core ────────────────────────────────────────────────────────────────────

/** Convert an integer (1–3999) to a Roman numeral string. */
export function toRoman(num: number, options?: ToRomanOptions): string;

/** Convert a Roman numeral string to an integer. Case-insensitive. */
export function fromRoman(roman: string): number;

/** Return true if the string is a well-formed Roman numeral (1–3999). Case-insensitive. */
export function isValidRoman(roman: string): boolean;

/** Return true if num is an integer in the range 1–3999. */
export function isValidNumber(num: number): boolean;

// ─── Arithmetic ──────────────────────────────────────────────────────────────

/** Add two values (Roman numeral strings and/or integers). Returns a Roman numeral. */
export function add(a: number | string, b: number | string, options?: ToRomanOptions): string;

/** Subtract b from a. Returns a Roman numeral. */
export function subtract(a: number | string, b: number | string, options?: ToRomanOptions): string;

/** Multiply two values. Returns a Roman numeral. */
export function multiply(a: number | string, b: number | string, options?: ToRomanOptions): string;

/** Integer-divide a by b (floor). Returns a Roman numeral. */
export function divide(a: number | string, b: number | string, options?: ToRomanOptions): string;

// ─── Utilities ───────────────────────────────────────────────────────────────

/**
 * Compare two values (Roman numerals or integers).
 * Returns -1 if a < b, 0 if equal, 1 if a > b.
 */
export function compare(a: number | string, b: number | string): -1 | 0 | 1;

/** Generate an inclusive range of Roman numerals from start to end. */
export function range(start: number, end: number, step?: number): string[];

/** Sort an array of Roman numeral strings and/or integers. */
export function sort(arr: Array<number | string>, direction?: 'asc' | 'desc'): Array<number | string>;

/** Convert an array of integers to Roman numeral strings. */
export function batchToRoman(nums: number[], options?: ToRomanOptions): string[];

/** Convert an array of Roman numeral strings to integers. */
export function batchFromRoman(romans: string[]): number[];

/**
 * Break a Roman numeral into its additive components.
 * e.g. breakdown('XIV') → [{numeral:'X',value:10},{numeral:'IV',value:4}]
 */
export function breakdown(roman: string): BreakdownPart[];

// ─── Backward-compatible aliases ─────────────────────────────────────────────

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
  /** @deprecated Use toRoman() */
  IntToRoman: typeof toRoman;
  /** @deprecated Use fromRoman() */
  romanToInt: typeof fromRoman;
  /** @deprecated Use isValidNumber() */
  isValidInteger: typeof isValidNumber;
};

export default converter;
