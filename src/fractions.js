// Roman fractions — the uncia system (base-12 fractions used in ancient Rome)
//
// Symbol map (twelfths):
//   ·       =  1/12  uncia
//   ··      =  2/12  sextans
//   ···     =  3/12  quadrans  (¼)
//   ····    =  4/12  triens    (⅓)
//   ·····   =  5/12  quincunx
//   S       =  6/12  semis     (½)
//   S·      =  7/12  septunx
//   S··     =  8/12  bes       (⅔)
//   S···    =  9/12  dodrans   (¾)
//   S····   = 10/12  dextans
//   S·····  = 11/12  deunx

const UNCIA_TABLE = [
  { twelfths: 12, symbol: 'AS',    name: 'as',      decimal: 1      },
  { twelfths: 11, symbol: 'S·····',name: 'deunx',   decimal: 11/12  },
  { twelfths: 10, symbol: 'S····', name: 'dextans',  decimal: 10/12  },
  { twelfths:  9, symbol: 'S···',  name: 'dodrans',  decimal:  9/12  },
  { twelfths:  8, symbol: 'S··',   name: 'bes',      decimal:  8/12  },
  { twelfths:  7, symbol: 'S·',    name: 'septunx',  decimal:  7/12  },
  { twelfths:  6, symbol: 'S',     name: 'semis',    decimal:  6/12  },
  { twelfths:  5, symbol: '·····', name: 'quincunx', decimal:  5/12  },
  { twelfths:  4, symbol: '····',  name: 'triens',   decimal:  4/12  },
  { twelfths:  3, symbol: '···',   name: 'quadrans', decimal:  3/12  },
  { twelfths:  2, symbol: '··',    name: 'sextans',  decimal:  2/12  },
  { twelfths:  1, symbol: '·',     name: 'uncia',    decimal:  1/12  },
];

const BY_SYMBOL = new Map(UNCIA_TABLE.map(e => [e.symbol, e]));
const BY_TWELFTHS = new Map(UNCIA_TABLE.map(e => [e.twelfths, e]));

export function toUncia(fraction) {
  if (typeof fraction !== 'number' || fraction <= 0 || fraction > 1) {
    throw new RangeError(`Expected a fraction in (0, 1], got: ${fraction}`);
  }
  // Find the closest uncia entry by twelfths (round to nearest 1/12)
  const twelfths = Math.max(1, Math.min(12, Math.round(fraction * 12)));
  const entry = BY_TWELFTHS.get(twelfths);
  return entry.symbol;
}

export function fromUncia(str) {
  if (typeof str !== 'string') throw new TypeError('Expected a string');
  const entry = BY_SYMBOL.get(str.trim());
  if (!entry) {
    throw new RangeError(`Unknown uncia symbol: "${str}". Valid symbols: ${[...BY_SYMBOL.keys()].join(' | ')}`);
  }
  return entry.decimal;
}

export function unciaInfo(str) {
  if (typeof str !== 'string') throw new TypeError('Expected a string');
  const entry = BY_SYMBOL.get(str.trim());
  if (!entry) throw new RangeError(`Unknown uncia symbol: "${str}"`);
  return { ...entry };
}

export function isValidUncia(str) {
  if (typeof str !== 'string') return false;
  return BY_SYMBOL.has(str.trim());
}

export function listUncia() {
  return UNCIA_TABLE.map(e => ({ ...e }));
}
