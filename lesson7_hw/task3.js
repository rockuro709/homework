function friday13(firstYear, firstMonth, firstDayOfMonth, lastYear, lastMonth, lastDayOfMonth) {
    firstDate = new Date(Date.UTC(firstYear, firstMonth, firstDayOfMonth));
    lastDate = new Date(Date.UTC(lastYear, lastMonth, lastDayOfMonth));
    console.log(firstDate); // проверка
    console.log(lastDate); // проверка
    let counter = 0;
    while (firstDate <= lastDate) {  
        if (firstDate.getUTCDay() === 5 && firstDate.getUTCDate() === 13) {
            counter++;
        }
    firstDate.setUTCDate(firstDate.getUTCDate() + 1);
    }
    console.log(counter);
}


//введите год-месяц-день, с которых начинать поиск пятниц 13-го, и год-месяц-день, до которых вести поиск
friday13(2024, 2, 5, 2026, 2, 5); 


