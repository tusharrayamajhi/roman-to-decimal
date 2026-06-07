# Roman Numeral Converter

> The most complete Roman numeral library on npm — zero dependencies, full TypeScript support.

[![npm](https://img.shields.io/npm/v/@tushar_rayamajhi/roman_converter)](https://www.npmjs.com/package/@tushar_rayamajhi/roman_converter)
[![license](https://img.shields.io/npm/l/@tushar_rayamajhi/roman_converter)](LICENSE)

## What's inside

| Feature | Functions |
|---|---|
| **Core** | `toRoman`, `fromRoman`, `isValidRoman`, `isValidNumber` |
| **Arithmetic** | `add`, `subtract`, `multiply`, `divide` |
| **Utilities** | `compare`, `range`, `sort`, `batchToRoman`, `batchFromRoman`, `breakdown` |
| **Extended** (up to 3,999,999) | `toExtendedRoman`, `fromExtendedRoman` |
| **Clock / Time** | `toRomanTime`, `fromRomanTime`, `nowInRoman` |
| **Latin Words** | `toWords`, `fromWords` |
| **Fractions** (uncia) | `toUncia`, `fromUncia`, `listUncia` |
| **React Hook** | `useRoman` (separate import) |
| **CLI** | `roman` command |

---

## Installation

```bash
npm install @tushar_rayamajhi/roman_converter
```

```bash
# CLI — global install
npm install -g @tushar_rayamajhi/roman_converter
```

---

## Quick Start

```js
import { toRoman, fromRoman, add, toRomanTime, toWords, toExtendedRoman }
  from '@tushar_rayamajhi/roman_converter';

toRoman(2024);              // "MMXXIV"
fromRoman('XIV');           // 14
add('XIV', 'III');          // "XVII"
toRomanTime('14:30');       // "XIV:XXX"
toWords(42);                // "quadraginta duo"
toExtendedRoman(1000000);   // "(M)"
```

Or use the default export:

```js
import converter from '@tushar_rayamajhi/roman_converter';

converter.toRoman(42);           // "XLII"
converter.fromRoman('XLII');     // 42
```

---

## Core

### `toRoman(num, options?)`

Convert an integer (1–3999) to a Roman numeral string.

```js
import { toRoman } from '@tushar_rayamajhi/roman_converter';

toRoman(1994);                        // "MCMXCIV"
toRoman(2024);                        // "MMXXIV"
toRoman(42, { lowercase: true });     // "xlii"
toRoman(0);                           // throws RangeError
toRoman(4000);                        // throws RangeError
```

### `fromRoman(roman)` — case-insensitive

```js
fromRoman('MCMXCIV');   // 1994
fromRoman('xlii');       // 42
fromRoman('IIII');       // throws RangeError
```

### `isValidRoman(roman)` / `isValidNumber(num)`

```js
isValidRoman('XIV');   // true
isValidRoman('IIII');  // false (use IV)
isValidNumber(42);     // true
isValidNumber(4000);   // false
```

---

## Arithmetic

All functions accept Roman numeral strings **or** integers and return a Roman numeral string.

```js
import { add, subtract, multiply, divide } from '@tushar_rayamajhi/roman_converter';

add('XIV', 'III');          // "XVII"
add(10, 'V');               // "XV"
subtract('X', 'IV');        // "VI"
multiply('V', 'III');       // "XV"
divide('X', 'III');         // "III"  (floor division)

add(3000, 1000);            // throws RangeError (result 4000 out of range)
add('XIV', 'III', { lowercase: true }); // "xvii"
```

---

## Utilities

```js
import { compare, range, sort, batchToRoman, batchFromRoman, breakdown }
  from '@tushar_rayamajhi/roman_converter';

compare('X', 'V');          // 1   (10 > 5)
compare('IV', 4);           // 0   (equal)
compare(1, 'M');            // -1  (1 < 1000)

range(1, 5);                // ["I","II","III","IV","V"]
range(10, 1, -3);           // ["X","VII","IV","I"]

sort(['X','V','I','M']);           // ["I","V","X","M"]
sort(['X','V','I','M'], 'desc');   // ["M","X","V","I"]

batchToRoman([1, 5, 10]);          // ["I","V","X"]
batchFromRoman(['I','V','X']);     // [1, 5, 10]

breakdown('MCMXCIX');
// [
//   { numeral: "M",  value: 1000 },
//   { numeral: "CM", value:  900 },
//   { numeral: "XC", value:   90 },
//   { numeral: "IX", value:    9 }
// ]
```

---

## Extended Numerals (1 – 3,999,999)

Uses parenthetical vinculum notation — the only npm package that supports this.

| Symbol | Value |
|---|---|
| `(V)` | 5,000 |
| `(X)` | 10,000 |
| `(L)` | 50,000 |
| `(C)` | 100,000 |
| `(D)` | 500,000 |
| `(M)` | 1,000,000 |

```js
import { toExtendedRoman, fromExtendedRoman, isValidExtendedNumber }
  from '@tushar_rayamajhi/roman_converter';

toExtendedRoman(4000);       // "(IV)"
toExtendedRoman(9000);       // "(IX)"
toExtendedRoman(1000000);    // "(M)"
toExtendedRoman(1999999);    // "(M)(CM)(XC)(IX)CMXCIX"
toExtendedRoman(3999999);    // "(M)(M)(M)(CM)(XC)(IX)CMXCIX"

fromExtendedRoman('(M)');    // 1000000
fromExtendedRoman('(IV)');   // 4000

isValidExtendedNumber(5000000);  // false (max 3,999,999)
isValidExtendedNumber(1000000);  // true
```

---

## Clock / Time

The only Roman numeral npm package with time support.
Zero minutes are represented with `·` (nulla).

```js
import { toRomanTime, fromRomanTime, nowInRoman }
  from '@tushar_rayamajhi/roman_converter';

toRomanTime('14:30');                    // "XIV:XXX"
toRomanTime('09:05');                    // "IX:V"
toRomanTime('23:59');                    // "XXIII:LIX"
toRomanTime('00:00');                    // "XII:·"  (midnight)
toRomanTime('14:30', { format: '12h' }); // "II:XXX"
toRomanTime(new Date());                 // current time
toRomanTime('14:30', { lowercase: true }); // "xiv:xxx"

fromRomanTime('XIV:XXX');
// { hours: 14, minutes: 30, seconds: 0, formatted: '14:30' }

nowInRoman();                // current time as Roman numerals
nowInRoman({ seconds: true }); // includes seconds
```

---

## Latin Words

The only npm package that converts Roman numerals / integers to classical Latin words.

```js
import { toWords, fromWords } from '@tushar_rayamajhi/roman_converter';

toWords(1);      // "unus"
toWords(12);     // "duodecim"
toWords(18);     // "duodeviginti"
toWords(42);     // "quadraginta duo"
toWords(88);     // "duodenonaginta"
toWords(100);    // "centum"
toWords(500);    // "quingenti"
toWords(1000);   // "mille"
toWords(2000);   // "duo milia"
toWords(3999);   // "tria milia nongenti nonaginta novem"

fromWords('quadraginta duo');  // 42
fromWords('duo milia');        // 2000
```

---

## Fractions (Uncia System)

Roman fractions were base-12. No other npm package implements this.

| Symbol | Name | Value |
|---|---|---|
| `·` | uncia | 1/12 |
| `··` | sextans | 2/12 |
| `···` | quadrans | 3/12 (¼) |
| `····` | triens | 4/12 (⅓) |
| `·····` | quincunx | 5/12 |
| `S` | semis | 6/12 (½) |
| `S·` | septunx | 7/12 |
| `S··` | bes | 8/12 (⅔) |
| `S···` | dodrans | 9/12 (¾) |
| `S····` | dextans | 10/12 |
| `S·····` | deunx | 11/12 |
| `AS` | as | 12/12 (1) |

```js
import { toUncia, fromUncia, isValidUncia, listUncia }
  from '@tushar_rayamajhi/roman_converter';

toUncia(0.5);      // "S"
toUncia(1/4);      // "···"
toUncia(2/3);      // "S··"

fromUncia('S');    // 0.5
fromUncia('···');  // 0.25

isValidUncia('S');   // true
isValidUncia('X');   // false

listUncia();  // array of all 12 entries with symbol, name, twelfths, decimal
```

---

## React Hook

```js
import { useRoman } from '@tushar_rayamajhi/roman_converter/react';

function RomanCounter() {
  const { roman, integer, increment, decrement, set } = useRoman(1);

  return (
    <div>
      <p>{roman} = {integer}</p>
      <button onClick={() => decrement()}>−</button>
      <button onClick={() => increment()}>+</button>
      <button onClick={() => set(1000)}>Jump to M</button>
    </div>
  );
}
```

**Hook API:**

| Property | Type | Description |
|---|---|---|
| `integer` | `number` | Current integer value (1–3999) |
| `roman` | `string` | Current Roman numeral |
| `isValid` | `boolean` | Whether the current value is in range |
| `set(value)` | `fn` | Set by integer or Roman numeral string |
| `setRoman(str)` | `fn` | Set by Roman numeral string |
| `increment(step?)` | `fn` | Increment (default step: 1) |
| `decrement(step?)` | `fn` | Decrement (default step: 1) |
| `reset()` | `fn` | Reset to initial value |

---

## CLI

```
roman 2024              → MMXXIV
roman MCMXCIX           → 1999
roman add XIV III        → XVII
roman sub L V            → XLV
roman mul V III          → XV
roman div X III          → III
roman range 1 5          → I, II, III, IV, V
roman range 10 1 -3      → X, VII, IV, I
roman sort X V I M       → I, V, X, M
roman sort desc X V I M  → M, X, V, I
roman compare XIV X      → XIV > X
roman breakdown MCMXCIX  → M=1000, CM=900, XC=90, IX=9

roman ext 1000000        → (M)
roman ext 3999999        → (M)(M)(M)(CM)(XC)(IX)CMXCIX
roman ext "(M)"          → 1000000

roman time               → current time (e.g. XIV:XXX)
roman time 14:30         → XIV:XXX
roman time 14:30 --12h   → II:XXX
roman time from XIV:XXX  → { hours: 14, minutes: 30, formatted: '14:30' }

roman words 42           → quadraginta duo
roman words 1999         → mille nongenti nonaginta novem
roman words from "duo milia" → 2000

roman uncia 0.5          → S
roman uncia 0.25         → ···
roman uncia from S       → 0.5
roman uncia list         → full symbol table

roman 42 --lowercase     → xlii
roman range 1 3 --json   → ["I","II","III"]
```

---

## TypeScript

Full type definitions included — no `@types/` package needed.

```ts
import {
  toRoman, fromRoman, add, toRomanTime, toExtendedRoman, toWords, toUncia,
  type ToRomanOptions, type BreakdownPart, type ParsedTime, type UnciaEntry,
} from '@tushar_rayamajhi/roman_converter';

const r: string       = toRoman(42);
const n: number       = fromRoman('XLII');
const t: ParsedTime   = fromRomanTime('XIV:XXX');
const u: UnciaEntry[] = listUncia();
```

---

## Migration from v1

| v1 | v2+ |
|---|---|
| `IntToRoman(n)` | `toRoman(n)` *(old name still works)* |
| `romanToInt(r)` | `fromRoman(r)` *(old name still works)* |
| `isValidInteger(n)` | `isValidNumber(n)` *(old name still works)* |
| Silent return on bad input | Now throws `RangeError` / `TypeError` |
| Case-sensitive | Input is now case-insensitive |

---

## License

ISC © [Tushar Rayamajhi](https://github.com/tusharrayamajhi)