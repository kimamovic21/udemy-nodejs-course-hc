const express = require('express');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8000;

const DIARY = {}; console.log(DIARY);
const EMAILS = new Set(); console.log(EMAILS);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  if (EMAILS.has(email)) {
    return res.status(400).json({
      error: `User with ${email} already taken!`
    });
  };

  const token = `${Date.now()}`;

  DIARY[token] = { name, email, password };
  EMAILS.add(email);

  return res.json({ status: `success `, token });
});

app.post('/signin', (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: `Missing token!` });
  };

  if (!(token in DIARY)) {
    return res.status(400).json({ error: `Invalid token!` });
  };

  const entry = DIARY[token];

  return res.json({ data: entry });
});

app.get('/private-data', (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: `Missing token!` });
  };

  if (!(token in DIARY)) {
    return res.status(400).json({ error: `Invalid token!` });
  };

  return res.json({ data: { privateData: 'Access granted!' } });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});