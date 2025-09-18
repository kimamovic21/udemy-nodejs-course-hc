// Objects

const username = {
  firstName: 'Kerim',
  lastName: 'Imamovic',
  isLoggedIn: true,
  'Years old': 28,
};

const myFullName = 'Kerim Imamovic';

username.firstName = 'Mr. Kerim';

// console.log(username);
// console.log(username.firstName);
// console.log(username['Years old']);
// console.log(typeof username);
// console.log(myFullName);


// Dates

let today = new Date();
// console.log(today);
// console.log(today.getDate());
// console.log(today.getMonth());
// console.log(today.getDay());
// console.log(today.getFullYear());


// Arrays

let heroes = ['a', 'b', 'c', true, 1];
// console.log(heroes);

let anotherUser = ['Kerim', 'Imamovic', true];
// console.log(anotherUser[0]);


// Type coercion
let isValue = true;
// console.log(1 + '1');
// console.log('1' + 1);
// console.log(typeof isValue);
// console.log(isValue + 1);
// console.log(Number(isValue) + 1);