function getNum () {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(Math.floor(Math.random() * 5 + 1));
        }, 3000);
    });
}

async function getResult() {
    const result = await getNum();
    console.log(result * result);
}

getResult();