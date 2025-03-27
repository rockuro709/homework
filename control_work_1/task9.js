function generateTable(n) {
    if (isNaN(n) || n < 1 || !Number.isInteger(n)) {
        console.log("Ошибка: Введите целое число больше 0.");
        return;
    }

    const rowSums = [];
    const columnSums = Array(n).fill(0);
    let totalSum = 0;

    console.log("   x | " + Array.from({ length: n }, (_, i) => (i + 1).toString().padStart(4)).join(""));
    console.log("-".repeat(10 + 4 * n));

    for (let i = 1; i <= n; i++) {
        const row = [];
        let rowSum = 0;

        for (let j = 1; j <= n; j++) {
            const value = i * j;
            row.push(value);
            rowSum += value;
            columnSums[j-1] += value;
            totalSum += value;
        }
        rowSums.push(rowSum);

        console.log(i.toString().padStart(4) + " | " + row.map(num => num.toString().padStart(4)).join(''));
    }

    console.log("-".repeat(10 + 4 * n));

    console.log();
    console.log("Суммы строк:" + rowSums.map(num => num.toString().padStart(4)).join(','));
    console.log("Суммы столбцов:" + columnSums.map(num => num.toString().padStart(4)).join(','));
    console.log("Общая сумма таблицы: " + totalSum);
}


generateTable(10);

