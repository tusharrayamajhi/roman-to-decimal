
function IntToRoman(num) {
    const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const numerals = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];

    let result = '';

    for (let i = 0; i < values.length; i++) {
        while (num >= values[i]) {
            result += numerals[i];
            num -= values[i];
        }
    }

    return result;
}
function romanToInt(roman) {
    const romanNumerals = {
        'I': 1,
        'IV': 4,
        'V': 5,
        'IX': 9,
        'X': 10,
        'XL': 40,
        'L': 50,
        'XC': 90,
        'C': 100,
        'CD': 400,
        'D': 500,
        'CM': 900,
        'M': 1000
    };

    let decimal = 0;
    for (let i = 0; i < roman.length; i++) {
        const currentSymbol = roman[i];
        const nextSymbol = roman[i + 1];

        if (nextSymbol && romanNumerals[nextSymbol] > romanNumerals[currentSymbol]) {
            decimal += romanNumerals[currentSymbol + nextSymbol];
            i++; // Skip the next symbol
        } else {
            decimal += romanNumerals[currentSymbol];
        }
    }

    return decimal ;
}

export default {romanToInt,IntToRoman};