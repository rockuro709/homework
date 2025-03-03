//так
let arr = [5, 4, 3, 2, 1];
let inpArr = ['a', 'b', 'c'];
let pos = 4;
arr.splice(pos, 0, ...inpArr);
console.log(arr);


//либо так
let array = [1, 2, 3, 4, 5];

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function putArray() {
    rl.question('Give me your array (без пробелов): ', (inputArray) => {
        rl.question('Give me position: ', (position) => {
            inputArray = inputArray.split('');
            array.splice(position, 0, ...inputArray);
            console.log(array);
            rl.close();
        rl.close();
        });
    });
}
putArray();


