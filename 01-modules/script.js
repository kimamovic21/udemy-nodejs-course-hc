const fs = require('node:fs');

console.log('Start of script');

// [Sync] => Blocking operations
// const content = fs.readFileSync('notes.txt', 'utf-8');
// console.log('Blocking content:', content);

// [Async] => Non blocking
fs.readFile('notes.txt', 'utf-8', function (error, data) {
  if (error) console.log(error);
  else console.log('Non blocking content:', data);
});

console.log('End of script');