function groupArr(yourArr) {
    const result = {};

    yourArr.forEach(person => {
        if (!result[person.age]) {          
            result[person.age] = [];
        }
        result[person.age].push(person.name);
    });
    console.log(result);
}

groupArr([
    { name: 'Anton', age: 33 },
    { name: 'Denis', age: 33 },
    { name: 'Sveta', age: 20 },
    { name: 'Kirill', age: 17 },
    { name: 'Maria', age: 20 },
    { name: 'Vasya', age: 17 },
    { name: 'Ksenia', age: 29 }
        ]);