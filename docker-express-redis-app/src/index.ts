import { Redis } from 'ioredis';
import http from 'http';
import pg from 'pg';
import app from './app/server';

async function init() {
  try {
    console.log(`Connecting Redis...`);
    const redis = new Redis('redis://redis:6379', { lazyConnect: true });
    await redis.connect();
    console.log(`Redis connection success...`);

    console.log(`Connecting Postgres...`);
    const { Client } = pg;
    const client = new Client({
      host: 'db',
      port: 5432,
      database: 'postgres',
      user: 'postgres',
      password: 'postgres',
    });
    await client.connect();
    console.log(`Postgres connection success...`);

    const PORT = process.env.PORT ?? 8000;
    const server = http.createServer(app);

    server.on('error', (err: NodeJS.ErrnoException) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please choose another port.`);
        process.exit(1);
      } else {
        console.error(`Server error: ${err}`);
        process.exit(1);
      }
    });

    server.listen(PORT, () => {
      console.log(`HTTP server is listening on PORT: ${PORT}`);
    });

  } catch (err) {
    console.error(`Error starting server: ${err}`);
    process.exit(1);
  }
};

init();
