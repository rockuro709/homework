function friday13(yourDate, lastDate) {
    console.log(yourDate); // проверка
    console.log(lastDate); // проверка
    let counter = 0;
    while (yourDate <= lastDate) {  
        if (yourDate.getUTCDay() === 5 && yourDate.getUTCDate() === 13) {
            counter++;
        }
    yourDate.setUTCDate(yourDate.getUTCDate() + 1);
    }
    console.log(counter);
}


friday13(new Date(Date.UTC(2024, 2, 5, 12)), new Date(Date.now())); // поиск пятниц 13-го до текущего дня
//friday13(new Date(Date.UTC(2025, 2, 5, 12)), new Date(Date.UTC(2026, 2, 5, 12))); // поиск пятниц 13-го до даты в будущем