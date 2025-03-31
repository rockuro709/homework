function formatToCurrency(yourStrNumArr) {

    const result = yourStrNumArr.map(str => {
        if (isNaN(str)) {
            return 'Ошибка! Введите строку с числом.';
        } 
        if (typeof str === 'number') {
            return 'Ошибка! Введите строку с числом, а не просто число.';
        }
        if (typeof str !== 'string') {
            return 'Ошибка! Введите строку с числом.';
        }
       
        let number = parseFloat(str);

        if (isNaN(number)) {
            return 'Ошибка! Введите строку с числом.';
        }  
        if (number < 0) {
            return 'Ошибка! Введите строку с числом, большим либо равным нулю.';
        }
        return number.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    });

    console.log(result);
}


formatToCurrency(['1923', '21134.613', 'asf', '', '-2134', 20050, true, false, {}, null, undefined, -1, 'true', NaN, '0']);