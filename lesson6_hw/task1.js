const firstStr = '123123';

const arrFromFirstStr = firstStr.split('');

let halfOne = arrFromFirstStr.slice(0, arrFromFirstStr.length/2);
let halfTwo = arrFromFirstStr.slice(arrFromFirstStr.length/2);

halfOne = halfOne.map(Number);
halfTwo = halfTwo.map(Number);


//способ с reduce()
const initialValue = 0;
const sumWithInitialOne = halfOne.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue);
const sumWithInitialTwo = halfTwo.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue);

if (sumWithInitialOne === sumWithInitialTwo) {
    console.log('Yes, сумма первой половины цифр равняется сумме второй половины цифр.');
} else {
    console.log('No, сумма первой половины цифр не равняется сумме второй половины цифр.');
}


//способ с циклами
let sumOne = 0;
for (let i = 0; i < halfOne.length; i++) {
    sumOne = sumOne + halfOne[i];
}

let sumTwo = 0;
for (let i = 0; i < halfTwo.length; i++) {
    sumTwo = sumTwo + halfTwo[i];
}

if (sumOne === sumTwo) {
    console.log('Yes, сумма первой половины цифр равняется сумме второй половины цифр.');
} else {
    console.log('No, сумма первой половины цифр не равняется сумме второй половины цифр.');
}


//проверки
console.log('\nПроверки:');
console.log(halfOne);
console.log(halfTwo);

console.log(sumWithInitialOne);
console.log(sumWithInitialTwo);

console.log(sumOne);
console.log(sumTwo);