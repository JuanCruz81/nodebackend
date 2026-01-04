var express = require('express');
var router = express.Router();
const pool = require('../config/db'); // Import the shared pool

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
