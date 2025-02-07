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

        if (nextSymbol && romanNumerals[currentSymbol + nextSymbol]) {
            decimal += romanNumerals[currentSymbol + nextSymbol];
            i++;
        } else {
            decimal += romanNumerals[currentSymbol];
        }
    }

    return decimal;
}

function isValidRoman(roman) {
    if (typeof roman !== 'string' || roman === '') return false;
    const regex = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
    return regex.test(roman);
}

function isValidInteger(num) {
    return typeof num === 'number' && 
           Number.isInteger(num) && 
           num >= 1 && 
           num <= 3999;
}

export default { romanToInt, IntToRoman, isValidRoman, isValidInteger };