function greet(name) {
  console.log(`Hello, ${name}`);
};
// greet('Kerim');


function makeTea(typeOfTea) {
  return `Making ${typeOfTea}...`;
};

// let teaOrder = makeTea('green tea');
// let teaOrder = makeTea('lemon tea');

// console.log(teaOrder);


function orderTea(teaType) {
  function confirmOrder() {
    return `Order confirmed for ${teaType}`;
  };
  return confirmOrder();
};

let orderConfirmation = orderTea('green tea');
// console.log(orderConfirmation);


const calculateTotal = (price, quantity) => price * quantity;

const totalCost = calculateTotal(499, 10);
// console.log(totalCost);


function testOne() {
  console.log(this);
};
// testOne();

const testTwo = () => console.log(this);
// testTwo();