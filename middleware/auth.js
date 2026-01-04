const AUTH_TOKEN = "my-super-secret-token"; // In 2026, store this in .env!

const requireAuth = (req, res, next) => {
  const userToken = req.headers['x-api-key']; // Custom header for the secret

  if (userToken && userToken === AUTH_TOKEN) {
    next(); // Token matches, proceed to the endpoint
  } else {
    res.status(401).json({ error: "Unauthorized: Invalid or missing token" });
  }
};

module.exports = requireAuth;