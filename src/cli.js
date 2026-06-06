#!/usr/bin/env node

import { toRoman, fromRoman, isValidRoman, isValidNumber } from './core.js';
import { add, subtract, multiply, divide } from './arithmetic.js';
import { compare, range, sort, batchToRoman, batchFromRoman, breakdown } from './utils.js';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = createRequire(import.meta.url)('../package.json');

const raw = process.argv.slice(2);

function printHelp() {
  console.log(`
Roman Numeral Converter v${pkg.version}

USAGE
  roman <number>               Convert integer → Roman numeral
  roman <ROMAN>                Convert Roman numeral → integer
  roman add <a> <b>            Add two values
  roman sub <a> <b>            Subtract (a - b)
  roman mul <a> <b>            Multiply
  roman div <a> <b>            Integer-divide (floor)
  roman range <s> <e> [step]   Emit a range of Roman numerals
  roman sort <r1> <r2> ...     Sort Roman numerals
  roman compare <a> <b>        Compare two values  (-1 | 0 | 1)
  roman breakdown <ROMAN>      Break a numeral into its components
  roman --version              Print version number
  roman --help                 Show this help

FLAGS
  --lowercase, -l              Output Roman numerals in lowercase
  --json                       Output as JSON (where applicable)

EXAMPLES
  roman 2024                   → MMXXIV
  roman XIV                    → 14
  roman add XIV III             → XVII
  roman range 1 5               → I, II, III, IV, V
  roman breakdown MCMXCIX       → M=1000, CM=900, XC=90, IX=9
`);
}

function parseArg(s) {
  const n = Number(s);
  if (Number.isInteger(n)) return n;
  return s;
}

function flag(name) {
  return raw.includes(name);
}

const lowercase = flag('--lowercase') || flag('-l');
const json      = flag('--json');
const opts      = { lowercase };
const args      = raw.filter(a => !['--lowercase', '-l', '--json'].includes(a));

function printRoman(r) {
  console.log(lowercase ? r.toLowerCase() : r);
}

function main() {
  if (args.length === 0 || flag('--help') || flag('-h')) {
    printHelp();
    return;
  }
  if (flag('--version') || flag('-v')) {
    console.log(pkg.version);
    return;
  }

  const [cmd, ...rest] = args;

  try {
    switch (cmd) {
      case 'add':
      case 'sub':
      case 'mul':
      case 'div': {
        if (rest.length < 2) { console.error(`Usage: roman ${cmd} <a> <b>`); process.exit(1); }
        const a = parseArg(rest[0]);
        const b = parseArg(rest[1]);
        const fn = { add, sub: subtract, mul: multiply, div: divide }[cmd];
        printRoman(fn(a, b, opts));
        break;
      }
      case 'range': {
        if (rest.length < 2) { console.error('Usage: roman range <start> <end> [step]'); process.exit(1); }
        const result = range(+rest[0], +rest[1], rest[2] ? +rest[2] : 1);
        const out = lowercase ? result.map(r => r.toLowerCase()) : result;
        console.log(json ? JSON.stringify(out) : out.join(', '));
        break;
      }
      case 'sort': {
        if (rest.length === 0) { console.error('Usage: roman sort <r1> <r2> ...'); process.exit(1); }
        const dir = rest[rest.length - 1] === 'desc' ? 'desc' : 'asc';
        const items = dir === 'desc' ? rest.slice(0, -1) : rest;
        const result = sort(items.map(parseArg), dir);
        const out = result.map(r => typeof r === 'number' ? r : (lowercase ? r.toLowerCase() : r));
        console.log(json ? JSON.stringify(out) : out.join(', '));
        break;
      }
      case 'compare': {
        if (rest.length < 2) { console.error('Usage: roman compare <a> <b>'); process.exit(1); }
        const a = parseArg(rest[0]);
        const b = parseArg(rest[1]);
        const res = compare(a, b);
        if (json) { console.log(res); break; }
        const sym = res === -1 ? '<' : res === 1 ? '>' : '=';
        console.log(`${rest[0]} ${sym} ${rest[1]}`);
        break;
      }
      case 'breakdown': {
        if (rest.length === 0) { console.error('Usage: roman breakdown <ROMAN>'); process.exit(1); }
        const parts = breakdown(rest[0]);
        if (json) { console.log(JSON.stringify(parts)); break; }
        parts.forEach(p => {
          const num = lowercase ? p.numeral.toLowerCase() : p.numeral;
          console.log(`${num.padEnd(4)} = ${p.value}`);
        });
        break;
      }
      default: {
        const input = cmd;
        if (!isNaN(+input) && Number.isInteger(+input)) {
          printRoman(toRoman(+input, opts));
        } else if (isValidRoman(input)) {
          console.log(fromRoman(input));
        } else {
          console.error(`Unknown command or invalid input: "${input}"`);
          console.error('Run "roman --help" for usage.');
          process.exit(1);
        }
      }
    }
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

main();
