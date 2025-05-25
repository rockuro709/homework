// console.log("Hello!");

let arr = [15, 21, 4, 5, 78, 12, 16, 56, 34];
arr.sort((a, b) => a - b);
// console.log(arr);

let array = [15, 21, 4, 5, 78, 12, 16, 56, 34];
let flag = true;
while (flag === true) {
  flag = false;
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] > array[i + 1]) {
      let temp = array[i];
      array[i] = array[i + 1];
      array[i + 1] = temp;
      flag = true;
    }
  }
}
// console.log(array);
//улучшить сортировку:
//1. чтобы цикл не сравнивал последний
//потому что самое большое число всегда в конце
//2. чтобы цикл запоминал последний индекс перестановки
//и на следующем проходе сортировал до него
//3. сделать остальные виды сортировок

const str1 = "А роза упала на лапу Азора!";
const str2 = "Аргентина манит негра";
const str3 = "Hello, world!";
const str4 = "Step on no pets";
const str5 = "No lemon, no melon";
const str6 = "JavaScript";

function isPalindrom(str) {
  let str1 = str.split(" ").join("").toLowerCase().split("");
  let str2 = [...str1];
  str1.reverse();
  if (str1.join("") === str2.join("")) {
    return true;
  } else {
    return false;
  }
}
//добавить удаление знаков препинания
console.log(isPalindrom(str1));
console.log(isPalindrom(str2));
console.log(isPalindrom(str3));
console.log(isPalindrom(str4));
console.log(isPalindrom(str5));
console.log(isPalindrom(str6));
