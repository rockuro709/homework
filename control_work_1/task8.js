async function doPromises(num, arrOfFns) {
    const results = await Promise.all(arrOfFns(num).map(fn => fn()));
    console.log(results);
} 


function createArr(num) {
    const arr = [];
    let delay = num * 1000;

    for(let i = 1; i <= num; i++) {
        const currentDelay = delay;
        const fn = () => new Promise(resolve => {
            setTimeout(() => {
                resolve(`Промис №${i} с задержкой ${currentDelay}`);
            }, currentDelay);
        });
        arr.push(fn);
        delay -= 1000;
    }

    return arr;
}


doPromises(4, createArr);