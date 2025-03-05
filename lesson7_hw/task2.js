function divideInteger(figure, howManyParts) {
    let originalFigure = figure;
    let arrayOfParts = [];

    for (let i = 1; i <= howManyParts; i++) {
        if (i === howManyParts) {
            arrayOfParts.push(originalFigure);
            break;
        }
        let part = Math.round(Math.random() * originalFigure);
        arrayOfParts.push(part);
        originalFigure -= part;
    }

    console.log(arrayOfParts);
    console.log('Сумма всех получившихся частей: ' + arrayOfParts.reduce((a, b) => a + b, 0));
}

function divideFractional(figure, howManyParts) {
    let originalFigure = figure;
    let arrayOfParts = [];

    for (let i = 1; i <= howManyParts; i++) {
        if (i === howManyParts) {
            arrayOfParts.push(Number((originalFigure).toFixed(2)));
            break;
        }
        let part = Number((Math.random() * originalFigure).toFixed(2));
        arrayOfParts.push(part);
        originalFigure -= part;
    }

    console.log(arrayOfParts);
    console.log('Сумма всех получившихся частей: ' + Math.round(arrayOfParts.reduce((a, b) => a + b, 0)));
}


divideInteger(100, 4);
divideFractional(1, 3);