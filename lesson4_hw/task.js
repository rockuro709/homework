let str = 'string';
let bool = true;
let num = 7;

console.log(`string + boolean = ${str + bool}`);
console.log(`string + number = ${str + num}`);
console.log(`number + boolean = ${num + bool}\n`);

console.log(`string * boolean = ${str * bool}`);
console.log(`string * number = ${str * num}`);
console.log(`number * boolean = ${num * bool}\n`);

console.log(`string / boolean = ${str / bool}`);
console.log(`string / number = ${str / num}`);
console.log(`number / boolean = ${num / bool}\n`);

console.log(`Converted string to boolean: ${Boolean(str)}`);
console.log(`Converted string to number: ${Number(str)}\n`);

console.log(`Converted boolean to string: ${String(bool)}`);
console.log(`Converted boolean to number: ${Number(bool)}\n`);

console.log(`Converted number to string: ${String(num)}`);
console.log(`Converted number to boolean: ${Boolean(num)}`);
