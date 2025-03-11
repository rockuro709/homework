function deleteFalsy (yourArr) {
    yourArr = yourArr.filter((values) => Boolean(values) == true);

    //сортировка просто по убыванию
    const sort1 = yourArr.sort((a, b) => b - a);
    console.log(sort1);


    //числа перед строками, строки рассортированы лексиграфически, в том числе и числа в виде строк
    const sort2 = yourArr.sort((a, b) => ((typeof b === 'number') - (typeof a === 'number')) || (a < b ? 1 : -1));
    console.log(sort2);


    //числа перед строками, строки рассортированы лексиграфически, а числа в виде строк отсортированы арифметически
    const sort3 = yourArr.sort((a, b) => ((typeof b === 'number') - (typeof a === 'number')) || (a < b ? 1 : -1));
    sort3.sort((a, b) => b - a);
    console.log(sort3);
}

deleteFalsy(['aaa', 'baa', 'aba', 'caa', 'dba', undefined, null, 0, -0, NaN, '56', '100', 'as', 'aastr', '123', 1, 2, 5, 600, 0n, '', 'str', 'asdff', { name: 'Anton' }, 53, 100]);