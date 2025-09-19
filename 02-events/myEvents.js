const EventEmitter = require('events');

const eventEmitter = new EventEmitter();

eventEmitter.on('greet', (username) => {
  console.log(`Hello ${username} and welcome to events in Node.js`);
});

eventEmitter.on('greet', (username) => {
  console.log(`Hey ${username} !!!`);
});

eventEmitter.once('pushnotify', () => {
  console.log('This event will run only once');
});

const myListener = () => console.log('I am a test listener');

eventEmitter.on('test', myListener);
eventEmitter.emit('greet', 'kimamovic21');
eventEmitter.emit('greet', 'chai');
eventEmitter.emit('pushnotify');
eventEmitter.emit('pushnotify');
eventEmitter.emit('test');
eventEmitter.removeListener('test', myListener);
eventEmitter.emit('test');

console.log(eventEmitter.listeners('greet'));