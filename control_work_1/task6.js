function getLastUniqElems(yourArr, compareFn) {
    let newArr = [];
    for (let i = yourArr.length - 1; i >= 0; i--) {
        if (!newArr.some((obj) => compareFn(obj, yourArr[i]))) {
            newArr.push(yourArr[i]);
        }
    }
    console.log(newArr);
}


function compareFn(a, b) {
    return a.name === b.name && a.age === b.age;
}

const data = [
    { name: 'Anton', age: 33 },
    { name: 'Sveta', age: 20 },
    { name: 'Denis', age: 33 },
    { name: 'Denis', age: 33 },
    { name: 'Sveta', age: 20 },
    { name: 'Kirill', age: 17 },
    { name: 'Maria', age: 20 },
    { name: 'Denis', age: 33 },
    { name: 'Vasya', age: 17 },
    { name: 'Kirill', age: 17 },
    { name: 'Denis', age: 33 },
    { name: 'Ksenia', age: 29 }
];


getLastUniqElems(data, compareFn);