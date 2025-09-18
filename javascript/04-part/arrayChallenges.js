let teaFlavors = ['lemon tea', 'orange tea', 'oolong tea'];
// console.log(teaFlavors);
const firstFlavor = teaFlavors[0];
// console.log(firstFlavor);


const cities = ['London', 'Paris', 'Tokyo', 'New York'];
// console.log(cities);
const favoriteCity = cities[2];
// console.log(favoriteCity);


let teaTypes = ['black tea', 'green tea', 'white tea'];
teaTypes[1] = 'oolong tea';
// console.log(teaTypes);


let citiesVisited = ['London', 'Paris', 'Tokyo', 'New York'];
citiesVisited.push('Berlin');
// console.log(citiesVisited);


let teaOrders = ['lemon tea', 'orange tea', 'oolong tea'];
const lastOrder = teaOrders.pop();
// console.log(lastOrder);
// console.log(teaOrders);


let popularTeas = ['oolong tea', 'green tea', 'black tea'];
let softCopyTeas = popularTeas;
// console.log(popularTea);
// console.log(softCopyTeas);
popularTeas.push('white tea');
// console.log(popularTeas);
// console.log(softCopyTeas);


let topCities = ['London', 'Paris', 'Tokyo', 'New York'];
// let hardCopyCities = [...topCities];
let hardCopyCities = topCities.slice();
topCities.push('Berlin');
// console.log(topCities);
// console.log(hardCopyCities);


let europeanCities = ['London', 'Paris'];
let asianCities = ['Tokyo', 'Seoul'];
let worldCities = [...europeanCities, ...asianCities];
// console.log(worldCities);


let teaMenu = ['lemon tea', 'orange tea', 'oolong tea'];
let menuLength = teaMenu.length;
// console.log(menuLength);


let cityBucketList = ['London', 'Paris', 'Tokyo', 'New York'];
let isLondonInList = cityBucketList.includes('London');
// console.log(isLondonInList);