#!/usr/bin/env node

import { toRoman, fromRoman, isValidRoman, isValidNumber } from './core.js';
import { add, subtract, multiply, divide } from './arithmetic.js';
import { compare, range, sort, batchToRoman, batchFromRoman, breakdown } from './utils.js';
import { toExtendedRoman, fromExtendedRoman, isValidExtendedRoman } from './extended.js';
import { toRomanTime, fromRomanTime, nowInRoman } from './clock.js';
import { toUncia, fromUncia, listUncia, isValidUncia } from './fractions.js';
import { toWords, fromWords } from './words.js';
import { createRequire } from 'module';

const pkg = createRequire(import.meta.url)('../package.json');
const raw = process.argv.slice(2);

function printHelp() {
  console.log(`
Roman Numeral Converter v${pkg.version}

CONVERSION
  roman <number>               Integer → Roman numeral  (e.g. roman 2024)
  roman <ROMAN>                Roman numeral → integer  (e.g. roman XIV)
  roman ext <number>           Extended (up to 3,999,999) integer → Roman
  roman ext <ROMAN>            Extended Roman → integer

ARITHMETIC  (accepts Roman numerals or integers)
  roman add <a> <b>            Add
  roman sub <a> <b>            Subtract
  roman mul <a> <b>            Multiply
  roman div <a> <b>            Integer-divide (floor)

UTILITIES
  roman range <s> <e> [step]   Range of Roman numerals  (e.g. roman range 1 10)
  roman sort [desc] <r1>...    Sort Roman numerals
  roman compare <a> <b>        Compare two values
  roman breakdown <ROMAN>      Decompose into components

CLOCK
  roman time                   Current time in Roman numerals
  roman time <HH:MM>           Convert time  (e.g. roman time 14:30)
  roman time from <ROMAN:ROMAN> Parse Roman time back

FRACTIONS  (uncia / base-12 system)
  roman uncia <decimal>        Decimal → Roman fraction  (e.g. roman uncia 0.5)
  roman uncia from <symbol>    Roman fraction → decimal  (e.g. roman uncia from S)
  roman uncia list             List all uncia symbols

LATIN WORDS
  roman words <number>         Number → Latin word  (e.g. roman words 42)
  roman words from <words>     Latin word → number  (e.g. roman words from viginti)

FLAGS
  --lowercase, -l              Output Roman numerals in lowercase
  --json                       Output as JSON where applicable
  --12h                        Use 12-hour clock (default: 24h)
  --seconds                    Include seconds in clock output
  --version                    Print version
  --help                       Show this help
`);
}

function parseArg(s) {
  const n = Number(s);
  return Number.isInteger(n) && s !== '' ? n : s;
}

const lowercase = raw.includes('--lowercase') || raw.includes('-l');
const json      = raw.includes('--json');
const use12h    = raw.includes('--12h');
const seconds   = raw.includes('--seconds');
const opts      = { lowercase };
const clockOpts = { lowercase, format: use12h ? '12h' : '24h', seconds };
const args      = raw.filter(a => !['--lowercase','-l','--json','--12h','--seconds'].includes(a));

function out(val) {
  if (json) console.log(typeof val === 'object' ? JSON.stringify(val) : val);
  else console.log(val);
}

function main() {
  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') { printHelp(); return; }
  if (args[0] === '--version' || args[0] === '-v') { console.log(pkg.version); return; }

  const [cmd, sub, ...rest] = args;

  try {
    // ── Arithmetic ──────────────────────────────────────────────────
    if (['add','sub','mul','div'].includes(cmd)) {
      if (!sub || !rest[0]) { console.error(`Usage: roman ${cmd} <a> <b>`); process.exit(1); }
      const a = parseArg(sub), b = parseArg(rest[0]);
      const fn = { add, sub: subtract, mul: multiply, div: divide }[cmd];
      out(fn(a, b, opts));
      return;
    }

    // ── Range ────────────────────────────────────────────────────────
    if (cmd === 'range') {
      if (!sub || !rest[0]) { console.error('Usage: roman range <start> <end> [step]'); process.exit(1); }
      const result = range(+sub, +rest[0], rest[1] ? +rest[1] : 1);
      const display = lowercase ? result.map(r => r.toLowerCase()) : result;
      out(json ? display : display.join(', '));
      return;
    }

    // ── Sort ─────────────────────────────────────────────────────────
    if (cmd === 'sort') {
      const dir = sub === 'desc' ? 'desc' : 'asc';
      const items = dir === 'desc' ? rest : [sub, ...rest].filter(Boolean);
      const result = sort(items.map(parseArg), dir);
      const display = result.map(r => typeof r === 'number' ? r : (lowercase ? r.toLowerCase() : r));
      out(json ? display : display.join(', '));
      return;
    }

    // ── Compare ───────────────────────────────────────────────────────
    if (cmd === 'compare') {
      if (!sub || !rest[0]) { console.error('Usage: roman compare <a> <b>'); process.exit(1); }
      const res = compare(parseArg(sub), parseArg(rest[0]));
      if (json) { out(res); return; }
      console.log(`${sub} ${res === -1 ? '<' : res === 1 ? '>' : '='} ${rest[0]}`);
      return;
    }

    // ── Breakdown ─────────────────────────────────────────────────────
    if (cmd === 'breakdown') {
      if (!sub) { console.error('Usage: roman breakdown <ROMAN>'); process.exit(1); }
      const parts = breakdown(sub);
      if (json) { out(parts); return; }
      parts.forEach(p => {
        const n = lowercase ? p.numeral.toLowerCase() : p.numeral;
        console.log(`${n.padEnd(4)} = ${p.value}`);
      });
      return;
    }

    // ── Extended ──────────────────────────────────────────────────────
    if (cmd === 'ext') {
      if (!sub) { console.error('Usage: roman ext <number|ROMAN>'); process.exit(1); }
      if (!isNaN(+sub) && Number.isInteger(+sub)) {
        out(toExtendedRoman(+sub, opts));
      } else if (isValidExtendedRoman(sub)) {
        out(fromExtendedRoman(sub));
      } else {
        console.error(`Invalid input for ext: "${sub}"`);
        process.exit(1);
      }
      return;
    }

    // ── Clock ─────────────────────────────────────────────────────────
    if (cmd === 'time') {
      if (!sub) {
        out(nowInRoman(clockOpts));
      } else if (sub === 'from') {
        if (!rest[0]) { console.error('Usage: roman time from <ROMAN:ROMAN>'); process.exit(1); }
        out(fromRomanTime(rest[0]));
      } else {
        out(toRomanTime(sub, clockOpts));
      }
      return;
    }

    // ── Fractions ─────────────────────────────────────────────────────
    if (cmd === 'uncia') {
      if (sub === 'list') {
        const entries = listUncia();
        if (json) { out(entries); return; }
        entries.forEach(e => console.log(`${e.symbol.padEnd(8)} ${e.name.padEnd(12)} = ${e.twelfths}/12 ≈ ${e.decimal.toFixed(4)}`));
        return;
      }
      if (sub === 'from') {
        if (!rest[0]) { console.error('Usage: roman uncia from <symbol>'); process.exit(1); }
        out(fromUncia(rest[0]));
        return;
      }
      if (sub === undefined) { console.error('Usage: roman uncia <decimal|from|list>'); process.exit(1); }
      out(toUncia(+sub));
      return;
    }

    // ── Latin words ───────────────────────────────────────────────────
    if (cmd === 'words') {
      if (sub === 'from') {
        const phrase = rest.join(' ');
        if (!phrase) { console.error('Usage: roman words from <latin words>'); process.exit(1); }
        out(fromWords(phrase));
        return;
      }
      if (!sub) { console.error('Usage: roman words <number>'); process.exit(1); }
      out(toWords(+sub));
      return;
    }

    // ── Auto-detect convert ───────────────────────────────────────────
    const input = cmd;
    if (!isNaN(+input) && Number.isInteger(+input)) {
      out(toRoman(+input, opts));
    } else if (isValidRoman(input)) {
      out(fromRoman(input));
    } else {
      console.error(`Unknown command or invalid input: "${input}"`);
      console.error('Run "roman --help" for usage.');
      process.exit(1);
    }
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

main();
