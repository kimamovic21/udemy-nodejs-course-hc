let teas = ['green tea', 'black tea', 'chai', 'oolong tea'];
let selectedTeas = [];

for (let i = 0; i < teas.length; i++) {
  if (teas[i] === 'chai') {
    break;
  };
  selectedTeas.push(teas[i]);
};
// console.log(selectedTeas);


let cities = ['New York', 'London', 'Tokyo', 'Paris', 'Sydney'];
let visitedCities = [];

for (let i = 0; i < cities.length; i++) {
  if (cities[i] === 'Paris') {
    continue;
  };
  visitedCities.push(cities[i]);
};
// console.log(visitedCities);


let numbers = [1, 2, 3, 4, 5];
let smallNumbers = [];

for (let num of numbers) {
  if (num === 4) {
    break;
  };
  smallNumbers.push(num);
};
// console.log(smallNumbers);


let teaTypes = ['chai', 'green tea', 'herbal tea', 'black tea'];
let preferredTeas = [];

for (let tea of teaTypes) {
  if (tea === 'herbal tea') {
    continue;
  };
  preferredTeas.push(tea);
};
// console.log(preferredTeas);


let citiesPopulation = {
  'New York': 8419000,
  'London': 8982000,
  'Berlin': 3769000,
  'Paris': 2148000
};

let cityNewPopulations = {};
// console.log(Object.keys(citiesPopulation));
// console.log(Object.values(citiesPopulation));

for (const city in citiesPopulation) {
  if (city == 'Berlin') {
    break;
  };
  cityNewPopulations[city] = citiesPopulation[city];
};
// console.log(cityNewPopulations);


let worldCities = {
  'Sydney': 5312000,
  'Tokyo': 13960000,
  'Berlin': 3769000,
  'Paris': 2148000
};

let largeCities = {};

for (const city in worldCities) {
  if (worldCities[city] < 3000000) {
    continue;
  };
  largeCities[city] = worldCities[city];
};
// console.log(largeCities);


let teaCollection = ['earl grey', 'green tea', 'chai', 'oolong tea'];
let availableTeas = [];

teaCollection.forEach((tea) => {
  if (tea === 'chai') {
    return;
  };
  availableTeas.push(tea);
});
// console.log(availableTeas);


let travelCities = ['Berlin', 'Tokyo', 'Sydney', 'Paris'];
let traveledCities = [];

travelCities.forEach((city) => {
  if (city === 'Sydney') {
    return;
  };
  traveledCities.push(city);
});
// console.log(traveledCities);


let myNumbers = [2, 5, 7, 9];
let doubledNumbers = [];

for (let i = 0; i < myNumbers.length; i++) {
  if (myNumbers[i] === 7) {
    continue;
  };
  doubledNumbers.push(myNumbers[i] * 2);
};
// console.log(doubledNumbers);


let myTeas = ['chai', 'green tea', 'black tea', 'jasmine tea', 'herbal tea'];
let shortTeas = [];

for (const tea of myTeas) {
  if (tea.length > 10) {
    break;
  }
  shortTeas.push(tea);
};
// console.log(shortTeas);