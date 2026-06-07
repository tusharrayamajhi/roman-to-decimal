// toWords — converts integers (1–3999) to classical Latin number words.
// Uses the standard subtraction forms for x8/x9 (duodeviginti, undeviginti, etc.)

const ONES = [
  '', 'unus', 'duo', 'tres', 'quattuor', 'quinque', 'sex', 'septem', 'octo', 'novem',
  'decem', 'undecim', 'duodecim', 'tredecim', 'quattuordecim', 'quindecim',
  'sedecim', 'septendecim', 'duodeviginti', 'undeviginti',
];

const TENS = [
  '', '', 'viginti', 'triginta', 'quadraginta', 'quinquaginta',
  'sexaginta', 'septuaginta', 'octoginta', 'nonaginta',
];

const HUNDREDS = [
  '', 'centum', 'ducenti', 'trecenti', 'quadringenti', 'quingenti',
  'sescenti', 'septingenti', 'octingenti', 'nongenti',
];

// Classical "two-from-the-next-decad" subtraction forms for x8 & x9
const SPECIAL_SUB100 = {
  28: 'duodetriginta',     29: 'undetriginta',
  38: 'duodequadraginta',  39: 'undequadraginta',
  48: 'duodequinquaginta', 49: 'undequinquaginta',
  58: 'duodesexaginta',    59: 'undesexaginta',
  68: 'duodeseptuaginta',  69: 'undeseptuaginta',
  78: 'duodeoctoginta',    79: 'undeoctoginta',
  88: 'duodenonaginta',    89: 'undenonaginta',
  // 98/99 omitted: 'duodecentum'/'undecentum' are archaic standalone forms;
  // additive 'nonaginta octo' / 'nonaginta novem' are clearer in compounds.
};

function below100(n) {
  if (n === 0) return '';
  if (n < 20) return ONES[n];
  if (SPECIAL_SUB100[n]) return SPECIAL_SUB100[n];
  const t = Math.floor(n / 10);
  const u = n % 10;
  return u === 0 ? TENS[t] : `${TENS[t]} ${ONES[u]}`;
}

function below1000(n) {
  if (n === 0) return '';
  const h = Math.floor(n / 100);
  const sub = n % 100;
  const parts = [];
  if (h > 0) parts.push(HUNDREDS[h]);
  const s = below100(sub);
  if (s) parts.push(s);
  return parts.join(' ');
}

// Neuter nominative forms for 2 and 3 (used with "milia")
const MILIA_PREFIX = { 1: 'mille', 2: 'duo milia', 3: 'tria milia' };

export function toWords(num) {
  if (!Number.isInteger(num) || num < 1 || num > 3999) {
    throw new RangeError(`Expected an integer between 1 and 3999, got: ${num}`);
  }
  const thou = Math.floor(num / 1000);
  const rem  = num % 1000;
  const parts = [];
  if (thou > 0) parts.push(MILIA_PREFIX[thou]);
  const rest = below1000(rem);
  if (rest) parts.push(rest);
  return parts.join(' ');
}

export function fromWords(words) {
  if (typeof words !== 'string') throw new TypeError('Expected a string');
  // Build reverse lookup — try every number 1–3999
  const target = words.trim().toLowerCase();
  for (let i = 1; i <= 3999; i++) {
    if (toWords(i) === target) return i;
  }
  throw new RangeError(`"${words}" is not a recognised Latin number word (1–3999)`);
}
