/* The `// db.js` file is a JavaScript file that contains code related to database connections and
operations. Here's a breakdown of what the code in `db.js` is doing: */
/* The `// db.js` file is a JavaScript file that contains code related to database connections and
operations. Here's a breakdown of what the code in `db.js` is doing: */
// db.js
// const mysql = require('mysql2/promise');

// // Create a pool to be shared by all modules
// const pool = mysql.createPool({
//   host: '127.0.0.1',
//   user: 'root',
//   password: 'yourpassword',
//   database: 'test_db',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// module.exports = pool; // Export the pool for use in other files

// to test the connection
// with the above code, do a description of what it does

const { Pool } = require('pg');
require('dotenv').config(); // Loads credentials from .env

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
  max: 20,                   // Max number of concurrent connections
  idleTimeoutMillis: 30000,  // Close idle connections after 30s
  connectionTimeoutMillis: 2000, // Error if connection takes > 2s
});

// Log pool errors to prevent application crashes
pool.on('error', (err) => {
  console.error('Unexpected error on idle database client', err);
  process.exit(-1);
});


// Mocking the database with a simple array
// const db = {
//   users: [
//   { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'admin' },
//    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'user' },
//    { id: 3, name: 'Charlie Davis', email: 'charlie@example.com', role: 'user' },
//    { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'editor' },
//    { id: 5, name: 'Ethan Hunt', email: 'ethan@example.com', role: 'user' }
//  ],
  // You can also add other "tables" to mimic a real database
//  posts: [
//    { id: 101, userId: 1, title: 'Hello World', content: 'My first post!' },
//    { id: 102, userId: 2, title: 'Node.js Tips', content: 'Use in-memory array for mociking.' }
//  ]
// };


// Mimic a database query with a Promise to keep your Express code clean
/* The commented out line `// const queryUsers = async () => {` is defining an asynchronous function
named `queryUsers`. This function is likely intended to query the database for users, but it is
currently commented out and not being used in the code. */
// const queryUsers = async () => {
//   return users;
// };

module.exports = {
  query: (text, params) => pool.query(text, params),
}; // Export the mock database object