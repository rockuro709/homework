function getNewObj(strArr, fn) {
    let newObj = {};
    for(let i = 0; i < strArr.length; i++) {
        newObj[strArr[i]] = fn(strArr[i]);
    }
    return newObj;
}


function toNewStr(str) {
    if (!toNewStr.counter) {
        toNewStr.counter = 1;
    }
    return str = `Цитата №${toNewStr.counter++}`;
}


function toInt() {
    if (!toInt.counter) {
        toInt.counter = 1;
    }
    return toInt.counter++;
}


function toObj(str) {
    if (!toObj.counter) {
        toObj.counter = 1;
    }
    return { quote: str, numberOfQuote: toObj.counter++ };
}


const data = [  
    "Каждому из нас дана магия, нужно лишь научиться ей управлять.",
    "Сила дружбы сильнее любого заклинания.",
    "Настоящая храбрость — это идти до конца, даже когда страшно.",
    "Любовь — древнейшая магия, сильнее всех чар.",
    "Темнота не может поглотить тех, кто несет в себе свет.",
    "Те, кто верит в чудеса, чаще всего их находят.",
    "Дом — это место, где тебя любят, а не просто стены вокруг.",
    "Истинная доброта — самое мощное оружие против зла.",
    "Даже самая маленькая сова может нести самые великие вести.",
    "Каждый выбор формирует судьбу — пусть твои выборы будут мудрыми."
];

console.log(getNewObj(data, toObj));
console.log(getNewObj(data, toInt));
console.log(getNewObj(data, toNewStr));