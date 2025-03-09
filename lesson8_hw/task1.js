function getPromise(reValue) {
    let lat = 0;
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Первым сработал промис №${reValue} с задержкой ${lat} миллисекунд`);
        }, lat = Math.floor(Math.random() * 5 + 1) * 1000);
    });
}

async function getResult() {
    const promise1 = getPromise(1);
    const promise2 = getPromise(2);
    const promise3 = getPromise(3);

    const result = await Promise.race([promise1, promise2, promise3]);
    console.log(result);
}

getResult();




//без async/await
//Promise.race([getPromise(1), getPromise(2), getPromise(3)]).then(data => console.log(data));