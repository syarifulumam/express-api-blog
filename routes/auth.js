const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

/* GET users listing. */
router.post('/register', authController.register);

module.exports = router;
