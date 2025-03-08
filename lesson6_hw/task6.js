const arr = [3, 4, 1, 2, 7, 30, 50];

function compareNumbers(a, b) {
    return a - b;
}
arr.sort(compareNumbers);
console.log(arr);

//нашёл этот способ в документации. или нужно было циклами? пузырьки там всякие?