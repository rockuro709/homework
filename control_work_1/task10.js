//без async/await
/* function doThreePromises(num) {
    const promise1 = Promise.resolve(num);

    const promise2 = promise1.then(value1 => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(value1 * value1);
            }, 3000);
        })

    });

    const promise3 = promise2.then(value2 => {
        return new Promise(resolve => {
            setTimeout(() => {
                console.log(value2 * value2);
                resolve();
            }, 3000);
        });
    });

    return promise3;
}

doThreePromises(3);    */                           
                                                        

//с async/await
async function doThreePromises(num) {
    const value1 = await Promise.resolve(num);

    const value2 = await new Promise(resolve => {
        setTimeout(() => {
            resolve(value1 * value1);
        }, 3000);
    });

    const value3 = await new Promise(resolve => {
        setTimeout(() => {
            resolve(value2 * value2);
        }, 3000);
    });

    console.log(value3);
}

doThreePromises(3);