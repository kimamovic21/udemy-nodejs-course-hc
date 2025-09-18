let sum = 0;
let i = 1;
while (i <= 5) {
  sum += i;
  i++;
};
// console.log(sum);


let countDown = [];
let j = 5;
while (j >= 1) {
  countDown.push(j);
  j--;
};
// console.log(countDown);


// let teaCollection = [];
// let tea;

// do {
//   tea = prompt(`Enter your favorite tea (type 'stop to finish)`);

//   if (tea !== 'stop') {
//     teaCollection.push(tea);
//   };
// } while (tea !== stop);
// type code in your browser console


let total = 0;
let k = 1;

do {
  total += k;
  k++;
} while (k <= 3);
// console.log(total);


let multipliedNumbers = [];
let numbers = [2, 4, 6];

for (let l = 0; l < numbers.length; l++) {
  let takeNumber = numbers[l] * 2;
  multipliedNumbers.push(takeNumber);
};
// console.log(multipliedNumbers);


let cities = ['New York', 'London', 'Tokyo', 'Sydney', 'Paris'];
let cityList = [];

for (let city = 0; city < cities.length; city++) {
  const myCity = cities[city];
  cityList.push(myCity)
};
// console.log(cityList);