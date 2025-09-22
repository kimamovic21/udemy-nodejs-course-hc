const express = require('express');
const app = express();

const PORT = 8000;

app.get('/', (req, res) => {
  res.end('Homepage');
});

app.get('/contact-us', (req, res) => {
  res.end('You can contact me at my email address');
});

app.get('/tweets', (req, res) => {
  res.end('Here are your tweets');
});

app.post('/tweets', (req, res) => {
  res.status(201).end('Tweet created successfully');
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
