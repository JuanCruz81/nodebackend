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

// Mocking the database with a simple array
const db = {
  users: [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'admin' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'user' },
    { id: 3, name: 'Charlie Davis', email: 'charlie@example.com', role: 'user' },
    { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'editor' },
    { id: 5, name: 'Ethan Hunt', email: 'ethan@example.com', role: 'user' }
  ],
  // You can also add other "tables" to mimic a real database
  posts: [
    { id: 101, userId: 1, title: 'Hello World', content: 'My first post!' },
    { id: 102, userId: 2, title: 'Node.js Tips', content: 'Use in-memory arrays for mocking.' }
  ]
};


// Mimic a database query with a Promise to keep your Express code clean
// const queryUsers = async () => {
//   return users;
// };

module.exports = db; // Export the mock database object