const value = require('./lib/math.js');
const myFullName = require('./lib/string.js');

const { add, subtract, multiply, divide } = value;

console.log(add(2, 5));
console.log(subtract(5, 2));
console.log(multiply(2, 5));
console.log(divide(2, 5));

myFullName('John', 'Doe');