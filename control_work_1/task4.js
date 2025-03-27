function isPalindrome(yourStr) {
    let cleanStr = yourStr.toLowerCase().replace(/[^a-zA-Zа-яА-ЯёЁ]/g, '');
    if (cleanStr === cleanStr.split('').reverse().join('')) {
        console.log(`Да, строка "${yourStr}" - палиндром.`);
    } else {
        console.log(`Нет, строка "${yourStr}" - не палиндром.`);
    }
}

isPalindrome('Pa! lindrome');
isPalindrome('MAma341! MAmaM ');
isPalindrome('А роза упала на лапу Азора.');
isPalindrome('a');
isPalindrome('Я иду с мечем судия!');
isPalindrome('Обычная строка');