let array = [1, 2, 3, 4, 5];

function putArray(inputArray, position) {
    array.splice(position, 0, ...inputArray);
    console.log(array);
}

putArray(['a', 'b'], 1);
putArray(['c'], 6);
putArray(['e'], 8);
putArray([1, 2], 9);