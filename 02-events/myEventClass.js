const EventEmitter = require('events');

class Chat extends EventEmitter {
  sendMessage(msg) {
    console.log(`Message sent: ${msg}`);
    this.emit('Message Received', msg);
  };
};

const chat = new Chat();
chat.on('Message Received', (msg) => {
  console.log(`New Message: ${msg}`);
});

chat.sendMessage('Hello Kerim');