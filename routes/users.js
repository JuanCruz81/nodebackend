var express = require('express');
var router = express.Router();
const { queryUsers } = require('../config/db'); // Import the shared query function
const db = require('../config/db');
// const requireAuth = require('../middleware/auth');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  // res.send('respond with a resource');
  // const users = await queryUsers();
  // res.json(db.users);
  
  // 1. Capture the 'role' from the request query: /users?role=admin
  const requestedRole = req.query.role;

  // 2. Logic: If a role is provided, filter the list; otherwise, show everyone
  if (requestedRole) {
    const filteredUsers = db.users.filter(user => user.role === requestedRole);
    
    return res.json({
      message: `Showing users with role: ${requestedRole}`,
      count: filteredUsers.length,
      data: filteredUsers
    });
  }

  // 3. Default response if no 'role' is provided
  res.json({
    message: "Showing all users",
    count: db.users.length,
    data: db.users
  });
});

// POST /users - Create a new user in the in-memory array
router.post('/', (req, res) => {
  const { name, email, role } = req.body;

  // 1. Basic Validation (Critical for 2026 security best practices)
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  // 2. Create the user object
  const newUser = {
    id: db.users.length + 1, // Mimicking an auto-increment ID
    name,
    email,
    role: role || 'user'     // Default role if not provided
  };

  // 3. Save to the in-memory array
  db.users.push(newUser);

  // 4. Return success response
  res.status(201).json({
    message: "User created successfully",
    user: newUser
  });
});

module.exports = router;
