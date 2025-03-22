function getSum(yourArr) {
    let sum = 0;
    for (let i = 0; i < yourArr.length; i++) {
        if (Array.isArray(yourArr[i])) {
            sum += getSum(yourArr[i]) 
        } else if (typeof yourArr[i] === 'number' && !Number.isNaN(yourArr[i])) {
            sum += yourArr[i];
        }
    }
    return sum;
}

const result = getSum([1, 1, null, NaN, 1, [1, 1], [1, 1, [1, 1, undefined, [1]]]]);
console.log(result);
