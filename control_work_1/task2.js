function deleteFalsy (yourArr) {
    yourArr = yourArr.filter((values) => Boolean(values) == true);
    console.log(yourArr); //проверка

    //сортировка просто по убыванию
    console.log(yourArr.sort((a, b) => b - a));


    //числа перед строками, строки рассортированы лексиграфически, в том числе и числа в виде строк
    //console.log(yourArr.sort((a, b) => ((typeof b === 'number') - (typeof a === 'number')) || (a < b ? 1 : -1)));


    //числа перед строками, строки рассортированы лексиграфически, а числа в виде строк отсортированы арифметически
    //yourArr.sort((a, b) => ((typeof b === 'number') - (typeof a === 'number')) || (a < b ? 1 : -1));
    //console.log(yourArr.sort((a, b) => b - a));
}

deleteFalsy(['aaa', 'baa', 'aba', 'caa', 'dba', undefined, null, 0, -0, NaN, '56', '100', 'as', 'aastr', '123', 1, 2, 5, 600, 0n, '', 'str', 'asdff', { name: 'Anton' }, 53, 100]);