const AUTH_TOKEN = "my-super-secret-token"; // In 2026, store this in .env!

const requireAuth = (req, res, next) => {
  const userToken = req.headers['x-api-key']; // Custom header for the secret

  if (userToken && userToken === AUTH_TOKEN) {
    next(); // Token matches, proceed to the endpoint
  } else {
    res.status(401).json({ error: "Unauthorized: Invalid or missing token" });
  }
};

function ensureAuthenticated(req, res, next) {
  // Check for a session (if using express-session) or a token
  if (req.session && req.session.user) {
    return next(); // User is authorized, proceed to the route
  }
  
  // If not authorized, redirect to login
  console.log("Unauthorized access attempt. Redirecting to /login...");
  res.redirect('/login');
}

module.exports = ensureAuthenticated;