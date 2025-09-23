const db = require('./db/index.js');
const { usersTable } = require('./drizzle/schema.js');
const dotenv = require('dotenv');

dotenv.config();

async function getAllUsers() {
  const users = await db.select().from(usersTable);
  console.log(`Users in DB: ${users}`);
  console.table(users);
  return users;
};

async function createUser({ id, name, email }) {
  await db.insert(usersTable).values({
    id,
    name,
    email
  })
};

getAllUsers();
// createUser({ id: 1, name: 'Kerim', email: 'imamovic.kerim@email.com ' });
// createUser({ id: 2, name: 'John', email: 'john.doe@email.com ' });