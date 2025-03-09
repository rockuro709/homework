function currencyFormat(yourStrNumArr) {
    yourStrNumArr = yourStrNumArr.map(Number);
    for(i = 0; i < yourStrNumArr.length; i++) {
        if (Number.isNaN(yourStrNumArr[i])) {
            yourStrNumArr[i] = 'Ошибка! Введите число.';
        } if (yourStrNumArr[i] < 0) {
            yourStrNumArr[i] = 'Ошибка! Введите число, большее либо равное нулю.'
        }
    }
    yourStrNumArr.forEach((arr) => console.log(arr.toLocaleString('en-US', {minimumFractionDigits: 2, 
        maximumFractionDigits: 2, style: 'currency', currency: 'USD'})));
}


currencyFormat(['1923', '21134.613', '', 'asf', '-2134']);