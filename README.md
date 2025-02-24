# Roman Numeral Converter

A lightweight utility for converting between integers and Roman numerals, with validation support.

## Installation

Import the module in your JavaScript project:

```javascript
import converter from './roman-converter.js';

console.log(converter.IntToRoman(2023)); // Output: "MMXXIII"
console.log(converter.IntToRoman(3999)); // Output: "MMMCMXCIX"


console.log(converter.romanToInt("LVIII")); // Output: 58
console.log(converter.romanToInt("MCMXCIV")); // Output: 1994


console.log(converter.isValidRoman("XII")); // true
console.log(converter.isValidRoman("IIII")); // false (Use IV instead)


console.log(converter.isValidInteger(0)); // false
console.log(converter.isValidInteger(42.5)); // false
console.log(converter.isValidInteger(3000)); // true