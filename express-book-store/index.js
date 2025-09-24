require('dotenv/config');
const express = require('express');

const loggerMiddleware = require('./middlewares/logger.js');

const bookRouter = require('./routes/book.routes.js');
const authorRouter = require('./routes/author.routes.js');

const app = express();
const PORT = 8000;

// Middlewares (Plugins)
app.use(express.json());
app.use(loggerMiddleware);

// Routes
app.use('/books', bookRouter);
app.use('/authors', authorRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});