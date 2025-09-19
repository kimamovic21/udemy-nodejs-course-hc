const { Buffer } = require('buffer');

const buf = Buffer.from('Hello world');
console.log(buf);
console.log(buf.toString());

const bufTwo = Buffer.allocUnsafe(10);
console.log(bufTwo);

const bufThree = Buffer.alloc(10);
bufThree.write('Hello');
console.log(bufThree);
console.log(bufThree.toString());

const bufFour = Buffer.from('Chai aur Code');
console.log(bufFour);
console.log(bufFour.toString());
console.log(bufFour.toString('utf8'));
console.log(bufFour.toString('utf8', 0, 4));

const bufFive = Buffer.from('Chai');
bufFive[0] = 0x4A;
console.log(bufFive);
console.log(bufFive.toString());

const bufSix = Buffer.from('Chai aur');
const bufSeven = Buffer.from(' code');
const mergedBuf = Buffer.concat([bufSix, bufSeven]);
console.log(mergedBuf);
console.log(mergedBuf.toString());
console.log(mergedBuf.length);