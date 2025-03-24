function getNum (firstNum, lastNum, delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(Math.floor(Math.random() * (lastNum - firstNum + 1) + firstNum));
        }, delay);
    });
}

async function getResult() {
    const result1 = await getNum(1, 5, 3000);
    const result2 = await getNum(6, 10, 5000);
    console.log(result1, result2);
    console.log(result1 + result2);
}

getResult();