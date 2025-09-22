const express = require('express');

const bookRouter = require('./routes/book.routes.js');
const loggerMiddleware = require('./middlewares/logger.js');

const app = express();
const PORT = 8000;

// Middlewares (Plugins)
app.use(express.json());
app.use(loggerMiddleware);

// Routes
app.use('/books', bookRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});