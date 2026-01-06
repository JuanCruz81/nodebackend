var express = require('express');
var router = express.Router();
const pool = require('../config/db'); // Import the shared pool

/* GET login page. */
router.get('/', async function (req, res, next) {
    // res.render('index', { title: 'Express' });

    const loginFormHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Login</title>
            <style>
                body { font-family: Arial; display: flex; justify-content: center; padding: 50px; }
                form { border: 1px solid #ccc; padding: 20px; border-radius: 8px; }
                div { margin-bottom: 10px; }
            </style>
        </head>
        <body>
            <form action="/login" method="POST">
                <h2>Login</h2>
                <div>
                    <label>Username:</label><br>
                    <input type="text" name="username" required>
                </div>
                <div>
                    <label>Password:</label><br>
                    <input type="password" name="password" required>
                </div>
                <button type="submit">Login</button>
            </form>
        </body>
        </html>
    `;
    res.send(loginFormHTML);
});

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    // In 2026, use secure password handling (hashing, salting, etc.)
    //   if (username === 'admin' && password === 'password') {
    //     // On successful login, return a mock token
    //     return res.json({
    //       message: "Login successful",
    //       token: "my-super-secret-token" // In 2026, generate JWTs or similar tokens
    //     });
    //   } 
    //   res.status(401).json({ error: "Invalid credentials" }); 

    try {
        // Use parameterized queries to prevent SQL injection
        const result = await pool.query('SELECT * FROM users WHERE username = $1', 
            [email]);
        const user = result.rows[0];

        if (user && await bcrypt.compare(password, user.password)) {
            req.session.userId = user.id;
            return res.redirect('/dashboard');
        }
        res.status(401).send("Invalid credentials");
    } catch (err) {
        res.status(500).send("Server error");
    }
});

module.exports = router;
