const fs = require('node:fs');

const content = fs.readFileSync('notes.txt', 'utf-8');

console.log(content);

fs.writeFileSync('copy.txt', content, 'utf-8');
fs.appendFileSync('copy.txt', `\n${content}`, 'utf-8');
fs.mkdirSync('games', { recursive: true });
// fs.rmdirSync('games/myGames');
// fs.unlinkSync('copy.txt')